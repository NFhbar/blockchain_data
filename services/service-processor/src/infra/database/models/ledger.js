'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ledger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  Ledger.init({
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
    account: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null
    },
    value: {
      allowNull: true,
      type: DataTypes.NUMERIC,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Ledger'
  })
  return Ledger
}
