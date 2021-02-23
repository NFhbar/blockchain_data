import { createContainer, asClass, asFunction, asValue } from 'awilix'
import { scopePerRequest } from 'awilix-express'

import config from 'config'
import Application from 'src/app/Application'

import Server from 'src/interfaces/http/Server'
import router from 'src/interfaces/http/router'
import loggerMiddleware from 'src/interfaces/http/logging/loggerMiddleware'
import rateLimiterMiddleware from 'src/interfaces/http/redis/redisMiddleware'
import errorHandler from 'src/interfaces/http/errors/errorHandler'
import devErrorHandler from 'src/interfaces/http/errors/devErrorHandler'
import notFoundErrorHandler from 'src/interfaces/http/errors/notFoundErrorHandler'
import deviceMiddleware from 'src/interfaces/http/redis/deviceMiddleware'
import logger from 'src/infra/logging/logger'
export default function ({ configVars }) {
  const container = createContainer()

  // System
  container
    .register({
      app: asClass(Application).singleton(),
      server: asClass(Server).singleton()
    })
    .register({
      router: asFunction(router).singleton(),
      logger: asFunction(logger).singleton()
    })
    .register({
      config: asValue(config(configVars))
    })

  // Middlewares
  container
    .register({
      loggerMiddleware: asFunction(loggerMiddleware).singleton()
    })
    .register({
      containerMiddleware: asValue(scopePerRequest(container)),
      rateLimiterMiddleware: asValue(rateLimiterMiddleware),
      errorHandler: asValue(
        config.production ? errorHandler : devErrorHandler
      ),
      notFoundErrorHandler: asValue(notFoundErrorHandler),
      deviceMiddleware: asValue(deviceMiddleware)
    })

  return container
}
