'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sender: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    recipient: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    value: {
      allowNull: false,
      type: DataTypes.NUMERIC
    },
    timestamp: {
      allowNull: false,
      type: DataTypes.BIGINT
    }
  }, {
    sequelize,
    modelName: 'Transaction'
  })
  return Transaction
}
