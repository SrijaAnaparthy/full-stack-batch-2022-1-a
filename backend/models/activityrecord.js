'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:"createdby"})
    }
  }
  ActivityRecord.init({
    taskname: 
    {
      type : DataTypes.STRING,
      allowNull : false
    },
    date: 
    {
      type : DataTypes.DATE,
      allowNull : false
    },
    createdby:
    {
      type :  DataTypes.INTEGER,
      allowNull : false
    }
  }, {
    sequelize,
    tableName : 'activityrecords',
    modelName: 'ActivityRecord',
  });
  return ActivityRecord;
};