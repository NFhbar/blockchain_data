import Ledger from 'src/domain/ledger/Ledger'
/**
 * Maps a Ledger to domain layer and to database object
 * @namespace LedgerMapper
 * */
const LedgerMapper = {
  /**
   * return a domain layer Ledger
   *
   * @param {Object} input The input object
   * @param {string} input.token the token address
   * @param {string} input.sender the sender address
   * @param {string} input.recipient the recipient address
   * @param {number} input.value the value sent
   * @param {number} input.timestamp the timestamp of the transaction
   * @return {module:domain.Ledger}
   * @method toEntity
   * @memberof LedgerMapper
   * */
  toEntity(key) {
    const {
      token,
      account,
      value
    } = key
    return new Ledger({
      token,
      account,
      value
    })
  }
}

export default LedgerMapper
