import { attributes } from 'structure'

/**
 * A domain type module
 * @module domain
 */

/**
 * Creates an domain layer Ledger
 * @class Ledger
 * @memberof module:domain
 * @param {Object} input The input object
 * @param {string} input.id the uuid of the Ledger
 * @param {string} input.token
 * @param {string} input.account
 * @param {string} input.value
 */
const Ledger = attributes(
  {
    id: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    account: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  {}
)(class Ledger { })

export default Ledger
