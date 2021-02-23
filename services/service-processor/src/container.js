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
import standardError from 'src/interfaces/http/errors/standardError'
import logger from 'src/infra/logging/logger'

import models from 'src/infra/database/models'
import TransactionsRepository from 'src/infra/transaction/TransactionsRepository'
import LedgersRepository from 'src/infra/ledger/LedgersRepository'

import {
  GetAccountBalance,
  GetAccountHighestBalance,
  GetAccountWithMostTransfers
} from 'src/app/accounts'

import {
  GetTokenStats
} from 'src/app/tokens'

export default function ({ configVars }) {
  // Database needs to be initialized with the config vars, this is why it is imported here
  const {
    database,
    Transaction,
    Ledger
  } = models({
    configVars
  })
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

  // Database
  container.register({
    database: asValue(database),
    TransactionModel: asValue(Transaction),
    LedgerModel: asValue(Ledger)
  })

  // Repositories
  container.register({
    transactionsRepository: asClass(TransactionsRepository).singleton(),
    ledgersRepository: asClass(LedgersRepository).singleton()
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
      standardError: asValue(standardError)
    })

  // Operations
  container.register({
    // Accounts
    getAccountBalance: asClass(GetAccountBalance),
    // highest balance
    getAccountHighestBalance: asClass(GetAccountHighestBalance),
    // most transfers
    getAccountWithMostTransfers: asClass(GetAccountWithMostTransfers),
    // Tokens
    getTokenStats: asClass(GetTokenStats)

  })
  return container
}
