const { v4: uuid } = require('uuid')

const transactions = require('../../helpers/token_transfers.json')

const ledgers = []
transactions.forEach(t => {
  if (!t.sender && t.recipient) {
    ledgers.push(
      {
        token: t.token,
        account: t.recipient,
        value: t.value
      }
    )
  } else if (t.sender && !t.recipient) {
    ledgers.push(
      {
        token: t.token,
        account: t.sender,
        value: -t.value
      }
    )
  } else if (t.sender && t.recipient) {
    ledgers.push(
      {
        token: t.token,
        account: t.sender,
        value: -t.value
      },
      {
        token: t.token,
        account: t.recipient,
        value: t.value
      }
    )
  } else {
    console.log('nothing to be done')
  }
})
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Ledgers',
      ledgers.map(l => ({ id: uuid(), ...l })),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ledgers', null, {})
  }
}
