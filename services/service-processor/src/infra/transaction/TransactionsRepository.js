import { Op } from 'sequelize'
import TransactionMapper from './TransactionMapper'

class TransactionsRepository {
  /**
   * Creates an instance of AccountRepository.
   * @memberof module:repository
   * @param {Object} input The input object as injected in src/container.js
   * @param {Object} input.TransactionModel The transaction db model as defined in the seed json file
   * @param {Object} input.config The config object with configuration parameters
   * @param {Object} input.logger The logger middleware
   * @param {module:interface.standardError}input.standardError The standard error generator
   */
  constructor ({ TransactionModel, config, logger, standardError }) {
    this.TransactionModel = TransactionModel
    this.standardError = standardError
    this.logger = logger
    this.logmsg = config.logmsg
  }

  /**
 * gets all transactions with account address in either sender or receiver
 * for the given token address
 *
 * @param {string} address the account address
 * @param {string} token the token address
 * @returns {Promise<module:domain.Transaction[]>}
 * @throws {module:interface.standardError}
 * @memberof module:repository.AccountsRepository
 */
  async getTransactionsForAddressAndToken ({ address, token }) {
    try {
      const transactions = await this.TransactionModel.findAll({
        where: {
          token,
          [Op.or]: [
            { sender: address },
            { recipient: address }
          ]
        }
      })
      return transactions.map(t => {
        return TransactionMapper.toEntity(t.toJSON())
      })
    } catch (error) {
      this.logger.error({
        event: this.logmsg.event.get,
        info: this.logmsg.errors.transactions.getTransactions,
        meta: JSON.stringify(error)
      })
      throw this._dbError()
    }
  }

  /**
  * gets all transactions for the given token address
  * exluding null transactions
  *
  * @param {string} token the token address
  * @returns {Promise<module:domain.Transaction[]>}
  * @throws {module:interface.standardError}
  * @memberof module:repository.AccountsRepository
  */
  async getTransactionsForToken ({ token }) {
    try {
      const transactions = await this.TransactionModel.findAll({
        where: {
          token,
          [Op.and]: [
            {
              sender: {
                [Op.not]: null
              }
            }
          ]
        }
      })
      return transactions.map(t => {
        return TransactionMapper.toEntity(t.toJSON())
      })
    } catch (error) {
      this.logger.error({
        event: this.logmsg.event.get,
        info: this.logmsg.errors.transactions.getTransactions,
        meta: JSON.stringify(error)
      })
      throw this._dbError()
    }
  }

  /**
* gets all transactions for the given token address
* including null transactions
*
* @param {string} token the token address
* @returns {Promise<module:domain.Transaction[]>}
* @throws {module:interface.standardError}
* @memberof module:repository.AccountsRepository
*/
  async getTransactionsForTokenIncludeAll ({ token }) {
    try {
      const transactions = await this.TransactionModel.findAll({
        where: {
          token
        }
      })
      return transactions.map(t => {
        return TransactionMapper.toEntity(t.toJSON())
      })
    } catch (error) {
      this.logger.error({
        event: this.logmsg.event.get,
        info: this.logmsg.errors.transactions.getTransactions,
        meta: JSON.stringify(error)
      })
      throw this._dbError()
    }
  }

  _dbError () {
    return this.standardError({
      type: this.logmsg.errors.validationError,
      message: this.logmsg.errors.dbError,
      errors: [
        {
          param: 'ledger',
          msg: this.logmsg.errors.dbError,
          location: 'ledger'
        }
      ]
    })
  }
}

export default TransactionsRepository
