'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Expense,{foreignKey:"expenseid"})
    }
  }
  ExpenseMember.init({
    expenseid: 
    {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    memberid: 
    {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    divamount:
    {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    grpid:
    {
      type : DataTypes.INTEGER
    },
    settleamount:
    {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    }
  }, {
    sequelize,
    tableName : 'expensemembers',
    modelName: 'ExpenseMember',
  });
  return ExpenseMember;
};