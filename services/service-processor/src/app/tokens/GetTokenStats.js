import Operation from 'src/app/Operation'
import Balance from 'src/domain/balance/Balance'
import { averageCalculator, medianCalculator } from 'src/app/helpers'
class GetTokenStats extends Operation {
  /**
   * gets the average token transfer amount for the given token
   *
   * @constructor GetTokenStats
   * @extends {module:app.Operation}
   * @param {Object} input - The input object as injected by src/container.js
   * @param {module:repository.TransactionsRepository} input.TransactionsRepository - The repository (infra layer) for Transactions
   */
  constructor({ transactionsRepository }) {
    super()
    this.transactionsRepository = transactionsRepository
    this.average = 'average'
    this.median = 'median'
  }

  /**
   * gets the average token transfer amoun given
   * a token address
   *
   * @param {Object} input - The input object
   * @param {string} input.token
   * @fires GetTokenStats#[getTokenStats]SUCCESS
   * @fires GetTokenStats#[getTokenStats]ERROR
   * @fires GetTokenStats#[getTokenStats]VALIDATION_ERROR
   * @returns {void}
   * @memberof GetTokenStats
   */
  async execute({ token, type }) {
    const { SUCCESS, VALIDATION_ERROR, ERROR } = this.outputs
    try {
      const transactions = await this.transactionsRepository.getTransactionsForToken({
        token
      })
      let result
      if (type === this.average) {
        result = await averageCalculator(transactions)
      } else if (type === this.median) {
        result = await medianCalculator(transactions)
      } else {
        // sanity check
        result = await averageCalculator(transactions)
      }
      const average = new Balance({
        token,
        [type]: result
      })
      this.emit(SUCCESS, average)
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

GetTokenStats.setOutputs([
  'SUCCESS',
  'ERROR',
  'VALIDATION_ERROR'
])
/**
 * SUCCESS response event.
 *
 * @event GetTokenStats#[getTokenStats]SUCCESS
 * @type {object}
 * @property {module:domain.average} average
 */

/**
 * ERROR response event.
 *
 * @event GetTokenStats#[getTokenStats]ERROR
 * @type {module:interface.standardError}
 */

/**
 * VALIDATION_ERROR response event.
 *
 * @event GetTokenStats#[getTokenStats]VALIDATION_ERROR
 * @type {module:interface.standardError}
 */

export default GetTokenStats
