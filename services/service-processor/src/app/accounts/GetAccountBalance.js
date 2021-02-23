import Operation from 'src/app/Operation'
import { balanceCalculator } from 'src/app/helpers'
import Balance from 'src/domain/balance/Balance'
class GetAccountBalance extends Operation {
  /**
   * gets the balance for a given account and token
   *
   * @constructor GetAccountBalance
   * @extends {module:app.Operation}
   * @param {Object} input - The input object as injected by src/container.js
   * @param {module:repository.TransactionsRepository} input.TransactionsRepository - The repository (infra layer) for Transactions
   */
  constructor ({ transactionsRepository }) {
    super()
    this.transactionsRepository = transactionsRepository
  }

  /**
   * gets the balance for an account address for the given token
   *
   * @param {Object} input - The input object
   * @param {string} input.account
   * @param {string} input.token
   * @fires GetAccountBalance#[getAccountBalance]SUCCESS
   * @fires GetAccountBalance#[getAccountBalance]ERROR
   * @fires GetAccountBalance#[getAccountBalance]VALIDATION_ERROR
   * @returns {void}
   * @memberof GetAccountBalance
   */
  async execute ({ account, token }) {
    const { SUCCESS, VALIDATION_ERROR, ERROR } = this.outputs
    try {
      const transactions = await this.transactionsRepository.getTransactionsForAddressAndToken({
        address: account, token
      })
      const balance = balanceCalculator(transactions, account)
      const accountBalance = new Balance({
        account,
        token,
        balance
      })
      this.emit(SUCCESS, accountBalance)
    } catch (error) {
      switch (error.message) {
        case 'ValidationError':
          return this.emit(VALIDATION_ERROR, error)
        default:
          this.emit(ERROR, error)
      }
    }
  }
}

GetAccountBalance.setOutputs([
  'SUCCESS',
  'ERROR',
  'VALIDATION_ERROR'
])
/**
 * SUCCESS response event.
 *
 * @event GetAccountBalance#[getAccountBalance]SUCCESS
 * @type {object}
 * @property {module:domain.Balance} accountBalance
 */

/**
 * ERROR response event.
 *
 * @event GetAccountBalance#[getAccountBalance]ERROR
 * @type {module:interface.standardError}
 */

/**
 * VALIDATION_ERROR response event.
 *
 * @event GetAccountBalance#[getAccountBalance]VALIDATION_ERROR
 * @type {module:interface.standardError}
 */

export default GetAccountBalance
