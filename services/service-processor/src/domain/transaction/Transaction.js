import { attributes } from 'structure'

/**
 * A domain type module
 * @module domain
 */

/**
* Creates an domain layer Transaction
* @class Transaction
* @memberof module:domain
* @param {Object} input The input object
* @param {string} input.id the uuid of the transactions
* @param {string} input.token
* @param {string} input.sender
* @param {string} input.recipient
* @param {number} input.value
* @param {number} input.timestamp
 */
const Transaction = attributes(
  {
    id: {
      type: String,
      required: true
    },
    ken: {
      type: String,
      required: true
    },
    sender: {
      type: String,
      required: true
    },
    recipient: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Number,
      required: true
    }
  },
  {}
)(class Transaction { })

export default Transaction
