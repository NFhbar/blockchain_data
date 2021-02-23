import controller from './utils/createControllerRoutes'
// import { onProxyReq, onProxyReqOrigin } from 'src/interfaces/http/helpers'
import express, { Router } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import statusMonitor from 'express-status-monitor'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import methodOverride from 'method-override'
import pathfinderUI from 'pathfinder-ui'

export default ({
  config,
  containerMiddleware,
  errorHandler,
  notFoundErrorHandler,
  rateLimiterMiddleware,
  loggerMiddleware,
  deviceMiddleware
}) => {
  const app = express()
  const version = `/v${config.web.version}`

  if (config.env === 'development') {
    app.use(statusMonitor())
    app.use(
      '/pathfinder',
      function (req, res, next) {
        pathfinderUI(app)
        next()
      },
      pathfinderUI.router
    )
  }

  const apiRouter = Router()
  const healthCheck = Router()

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(helmet())
    .use(cors())
    .use(compression())
    .use(containerMiddleware)
    .use(rateLimiterMiddleware)

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/folder', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */
  /*
    SERVICE PROCESSOR
  */
  apiRouter.use(
    '/processor',
    deviceMiddleware,
    createProxyMiddleware({
      target: config.web.serviceProcessor,
      secure: config.web.secure,
      changeOrigin: true,
      pathRewrite: {
        [`^${version}/processor`]: '/' // rewrite path
      }
    })
  )

  // Health Check
  healthCheck.use(
    '/health',
    controller('health/HealthController')
  )
  app.use(healthCheck)

  // VERSIONING
  app.use(version, apiRouter)
  app.enable('trust proxy')

  // ERROR HANDLING
  app.use(errorHandler)
  apiRouter.use(notFoundErrorHandler)
  app.use(notFoundErrorHandler)

  return app
}
