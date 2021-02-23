'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('Ledgers', {
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
        account: {
          allowNull: true,
          type: Sequelize.STRING,
          defaultValue: null
        },
        value: {
          allowNull: true,
          type: Sequelize.NUMERIC,
          defaultValue: null
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
      await queryInterface.addIndex('Ledgers', ['token'], { transaction })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ledgers')
  }
}
