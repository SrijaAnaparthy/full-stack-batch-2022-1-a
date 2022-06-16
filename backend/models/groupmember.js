'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Group,{foreignKey:"grpid"})
    }
  }
  GroupMember.init({
    grpid: 
    {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    memberid: 
    {
      type : DataTypes.INTEGER,
      allowNull : false 
    }
  }, {
    sequelize,
    tableName : 'groupmembers',
    modelName: 'GroupMember',
  });
  return GroupMember;
};