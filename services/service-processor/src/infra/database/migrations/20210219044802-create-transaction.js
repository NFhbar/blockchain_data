'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('Transactions', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        token: {
          allowNull: false,
          type: Sequelize.STRING
        },
        sender: {
          allowNull: true,
          type: Sequelize.STRING,
          defaultValue: null
        },
        recipient: {
          allowNull: true,
          type: Sequelize.STRING,
          defaultValue: null
        },
        value: {
          allowNull: false,
          type: Sequelize.NUMERIC
        },
        timestamp: {
          allowNull: false,
          type: Sequelize.BIGINT
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('now()')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('now()')
        }
      }, { transaction })
      await queryInterface.addIndex('Transactions', ['token'], { transaction })
      await queryInterface.addIndex('Transactions', ['token', 'recipient', 'sender'], { transaction })
      await queryInterface.addIndex('Transactions', ['token', 'sender'], { transaction })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions')
  }
}
