import { Router } from 'express'
import { inject } from 'awilix-express'
import validate from '../errors/validateErrors'

import { getAccountBalance, getAccountHighestBalance, getAccountWithMostTransfers } from './controllerFunctions'
import { getAccountBalanceValidator, getAccountHighestBalanceValidator } from './AccountValidator'

const TransactionsController = {
  get router () {
    const router = Router()

    router.use(inject('logger'))
    router.use(inject('config'))
    router.get(
      '/:account/balance',
      getAccountBalanceValidator(),
      validate,
      inject('getAccountBalance'),
      getAccountBalance
    )
    router.get(
      '/highestBalance',
      getAccountHighestBalanceValidator(),
      validate,
      inject('getAccountHighestBalance'),
      getAccountHighestBalance
    )
    router.get(
      '/mostTransfers',
      getAccountHighestBalanceValidator(),
      validate,
      inject('getAccountWithMostTransfers'),
      getAccountWithMostTransfers
    )
    return router
  }
}

module.exports = TransactionsController
