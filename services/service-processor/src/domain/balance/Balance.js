import { attributes } from 'structure'

/**
 * A domain type module
 * @module domain
 */

/**
 * Creates an domain layer Balance
 * @class Balance
 * @memberof module:domain
 * @param {Object} input The input object
 * @param {string} input.account
 * @param {string} input.token
 * @param {number} input.balance
 */
const Balance = attributes(
  {
    account: {
      type: String,
      required: false,
      nullable: true,
      default: null
    },
    token: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      required: false,
      nullable: true,
      default: null
    },
    average: {
      type: Number,
      required: false,
      nullable: true,
      default: null
    },
    median: {
      type: Number,
      required: false,
      nullable: true,
      default: null
    }
  },
  {}
)(
  class Balance { }
)

export default Balance
