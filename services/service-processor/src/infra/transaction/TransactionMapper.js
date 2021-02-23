import Transaction from 'src/domain/transaction/Transaction'
/**
 * Maps a account to domain layer and to database object
 * @namespace TransactionMapper
 * */
const TransactionMapper = {
  /**
   * return a domain layer Transaction
   *
   * @param {Object} input The input object
   * @param {string} input.token the token address
   * @param {string} input.sender the sender address
   * @param {string} input.recipient the recipient address
   * @param {number} input.value the value sent
   * @param {number} input.timestamp the timestamp of the transaction
   * @return {module:domain.Transaction}
   * @method toEntity
   * @memberof TransactionMapper
   * */
  toEntity (key) {
    const {
      token,
      sender,
      recipient,
      value,
      timestamp
    } = key
    return new Transaction({
      token,
      sender,
      recipient,
      value,
      timestamp
    })
  }
}

export default TransactionMapper
