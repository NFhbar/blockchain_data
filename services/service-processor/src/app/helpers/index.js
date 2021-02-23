/**
 * calculates the balance for an address given an array of
 * transactions
 *
 * @param {module:domain.Transaction[]} transactions
 * @param {string} account the account address
 * @returns {number}
 */
export const balanceCalculator = (transactions = [], account) => {
  let runningBalance = 0
  transactions.forEach(t => {
    if (t.sender === account && t.recipient !== account) {
      runningBalance -= t.value
    } else if (t.recipient === account && t.sender !== account) {
      runningBalance += t.value
    } else if (t.recipient === account && t.sender === account) {
      console.log('sending to itself - no balance change')
    } else {
      console.log('account not in any field - ignoring')
    }
  })
  return runningBalance
}

/**
 * calculates average token transfer
 * O(n)
 *
 * @param {module:domain.Transaction[]} transactions
 * @returns {number}
 */
export const averageCalculator = async (transactions = []) => {
  let runningBalance = 0
  transactions.forEach(t => {
    runningBalance += t.value
  })
  return runningBalance / transactions.length
}

/**
 * calculates median token transfer
 * O(logn)
 * @param {module:domain.Transaction[]} transactions
 * @returns {number}
 */
export const medianCalculator = async (transactions = []) => {
  const mid = Math.floor(transactions.length / 2)
  const nums = [...transactions].sort((a, b) => a - b)
  return transactions.length % 2 !== 0 ? nums[mid].value : (nums[mid - 1].value + nums[mid].value) / 2
}

/**
 * finds the account with the highest balance
 * this function is not optimized (very slow).
 * A better solution would be to do a SQL query
 * to get unique accounts and then calculate the highest balance
 * @param {module:domain.Transaction[]} transactions
 * @returns {object}
 */
export const accountWithHighestBalance = (transactions = []) => {
  const tracker = {}
  transactions.forEach(t => {
    let value
    if (tracker[t.account] === undefined) {
      value = t.value
    } else {
      value = tracker[t.account] + t.value
    }
    tracker[t.account] = value
  })
  const result = objectLooper(tracker)
  return { account: result.index, balance: result.max }
}

/**
 * finds the account with most transfers
 * @param {module:domain.Transaction[]} transactions
 * @returns {object}
 */
export const accountWithMostTransfers = (transactions = []) => {
  const tracker = {}
  transactions.forEach(t => {
    if (t.value < 0) {
      let value
      if (tracker[t.account] === undefined) {
        value = 1
      } else {
        value = tracker[t.account] + 1
      }
      tracker[t.account] = value
    }
  })
  const result = objectLooper(tracker)
  return { account: result.index, transfers: result.max }
}
/**
 * loops over an object to get the key with the highest value
 * @param {obejct} tracker
 * @returns {object}
 */
const objectLooper = (tracker) => {
  let max = 0
  let index = 0
  for (const [key, value] of Object.entries(tracker)) {
    if (value > max) {
      max = value
      index = key
    }
  }
  return { index, max }
}
