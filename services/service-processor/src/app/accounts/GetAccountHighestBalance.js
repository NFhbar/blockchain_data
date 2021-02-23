import Operation from 'src/app/Operation'
import { accountWithHighestBalance } from 'src/app/helpers'
import Balance from 'src/domain/balance/Balance'
class GetAccountHighestBalance extends Operation {
  /**
   * gets the account with the highest balance for the given token
   *
   * @constructor GetAccountHighestBalance
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
   * @fires GetAccountHighestBalance#[getAccountHighestBalance]SUCCESS
   * @fires GetAccountHighestBalance#[getAccountHighestBalance]ERROR
   * @fires GetAccountHighestBalance#[getAccountHighestBalance]VALIDATION_ERROR
   * @returns {void}
   * @memberof GetAccountHighestBalance
   */
  async execute ({ token }) {
    const { SUCCESS, VALIDATION_ERROR, ERROR } = this.outputs
    try {
      const ledger = await this.ledgersRepository.getLedgersForToken({
        token
      })
      const result = accountWithHighestBalance(ledger)
      const accountBalance = new Balance({
        ...result,
        token
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

GetAccountHighestBalance.setOutputs([
  'SUCCESS',
  'ERROR',
  'VALIDATION_ERROR'
])
/**
 * SUCCESS response event.
 *
 * @event GetAccountHighestBalance#[getAccountHighestBalance]SUCCESS
 * @type {object}
 * @property {module:domain.Balance} accountBalance
 */

/**
 * ERROR response event.
 *
 * @event GetAccountHighestBalance#[getAccountHighestBalance]ERROR
 * @type {module:interface.standardError}
 */

/**
 * VALIDATION_ERROR response event.
 *
 * @event GetAccountHighestBalance#[getAccountHighestBalance]VALIDATION_ERROR
 * @type {module:interface.standardError}
 */

export default GetAccountHighestBalance
