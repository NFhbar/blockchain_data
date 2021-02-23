import { Router } from 'express'
import { inject } from 'awilix-express'
import validate from '../errors/validateErrors'

import { getTokenStats } from './controllerFunctions'
import { getTokenStatsValidator } from './TokenValidator'

const TransactionsController = {
  get router () {
    const router = Router()

    router.use(inject('logger'))
    router.use(inject('config'))
    router.get(
      '/:token',
      getTokenStatsValidator(),
      validate,
      inject('getTokenStats'),
      getTokenStats
    )
    return router
  }
}

module.exports = TransactionsController
