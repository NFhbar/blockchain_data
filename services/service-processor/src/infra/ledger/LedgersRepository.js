import { Op } from 'sequelize'
import LedgerMapper from './LedgerMapper'

class LedgersRepository {
  /**
   * Creates an instance of AccountRepository.
   * @memberof module:repository
   * @param {Object} input The input object as injected in src/container.js
   * @param {Object} input.LedgerModel The ledger db model as defined in the seed json file
   * @param {Object} input.config The config object with configuration parameters
   * @param {Object} input.logger The logger middleware
   * @param {module:interface.standardError}input.standardError The standard error generator
   */
  constructor ({ LedgerModel, config, logger, standardError }) {
    this.LedgerModel = LedgerModel
    this.standardError = standardError
    this.logger = logger
    this.logmsg = config.logmsg
  }

  /**
 * gets all ledgers with account address in either sender or receiver
 * for the given token address
 *
 * @param {string} address the account address
 * @param {string} token the token address
 * @returns {Promise<module:domain.Ledger[]>}
 * @throws {module:interface.standardError}
 * @memberof module:repository.AccountsRepository
 */
  async getLedgersForToken ({ token }) {
    try {
      const ledgers = await this.LedgerModel.findAll({
        where: {
          token
        }
      })
      return ledgers.map(t => {
        return LedgerMapper.toEntity(t.toJSON())
      })
    } catch (error) {
      this.logger.error({
        event: this.logmsg.event.get,
        info: this.logmsg.errors.ledgers.getLedgers,
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

export default LedgersRepository
