import controller from './utils/createControllerRoutes'
import express, { Router } from 'express'
import statusMonitor from 'express-status-monitor'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import methodOverride from 'method-override'
import pathfinderUI from 'pathfinder-ui'

export default ({
  config,
  containerMiddleware,
  loggerMiddleware,
  errorHandler,
  notFoundErrorHandler,
  rateLimiterMiddleware
}) => {
  const app = express()

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

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(helmet())
    .use(cors())
    .use(compression())
    .use(containerMiddleware)

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  apiRouter.use('/accounts', controller('accounts/AccountsController'))
  apiRouter.use('/tokens', controller('tokens/TokensController'))
  apiRouter.use('/health', controller('health/HealthController'))

  app.use(apiRouter)
  app.enable('trust proxy')

  // ERROR HANDLING
  app.use(errorHandler)
  apiRouter.use(notFoundErrorHandler)
  app.use(notFoundErrorHandler)

  return app
}
