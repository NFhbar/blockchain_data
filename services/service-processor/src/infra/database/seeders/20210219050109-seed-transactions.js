const { v4: uuid } = require('uuid')

const transactions = require('../../helpers/token_transfers.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Transactions',
      transactions.map(transaction => ({ id: uuid(), ...transaction })),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {})
  }
}
