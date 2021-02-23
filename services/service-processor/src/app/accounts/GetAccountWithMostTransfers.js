import Operation from 'src/app/Operation'
import { accountWithMostTransfers } from 'src/app/helpers'
import Balance from 'src/domain/balance/Balance'
class GetAccountWithMostTransfers extends Operation {
  /**
   * gets the account with the highest balance for the given token
   *
   * @constructor GetAccountWithMostTransfers
   * @extends {module:app.Operation}
   * @param {Object} input - The input object as injected by src/container.js
   * @param {module:repository.LedgersRepository} input.LedgersRepository - The repository (infra layer) for Ledgers
   */
  constructor ({ ledgersRepository }) {
    super()
    this.ledgersRepository = ledgersRepository
  }

  /**
   * gets the balance for an account address for the given token
   *
   * @param {Object} input - The input object
   * @param {string} input.token
   * @fires GetAccountWithMostTransfers#[getAccountWithMostTransfers]SUCCESS
   * @fires GetAccountWithMostTransfers#[getAccountWithMostTransfers]ERROR
   * @fires GetAccountWithMostTransfers#[getAccountWithMostTransfers]VALIDATION_ERROR
   * @returns {void}
   * @memberof GetAccountWithMostTransfers
   */
  async execute ({ token }) {
    const { SUCCESS, VALIDATION_ERROR, ERROR } = this.outputs
    try {
      const transactions = await this.ledgersRepository.getLedgersForToken({
        token
      })
      const account = accountWithMostTransfers(transactions)
      this.emit(SUCCESS, account)
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

GetAccountWithMostTransfers.setOutputs([
  'SUCCESS',
  'ERROR',
  'VALIDATION_ERROR'
])
/**
 * SUCCESS response event.
 *
 * @event GetAccountWithMostTransfers#[getAccountWithMostTransfers]SUCCESS
 * @type {object}
 * @property {module:domain.Balance} accountBalance
 */

/**
 * ERROR response event.
 *
 * @event GetAccountWithMostTransfers#[getAccountWithMostTransfers]ERROR
 * @type {module:interface.standardError}
 */

/**
 * VALIDATION_ERROR response event.
 *
 * @event GetAccountWithMostTransfers#[getAccountWithMostTransfers]VALIDATION_ERROR
 * @type {module:interface.standardError}
 */

export default GetAccountWithMostTransfers
