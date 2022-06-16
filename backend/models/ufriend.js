'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UFriend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      //,GroupMember,ExpenseMember
      this.belongsTo(models.User,{foreignKey : 'fid'})
    //  this.hasOne(GroupMember,{foreignKey : 'memberid'})
    //  this.hasOne(ExpenseMember,{foreignKey : 'memberid'})
    }

    toJSON()
    {
      return {...this.get(),id : undefined , userid : undefined,}
    }
  }
  UFriend.init({
    //friend
    fid: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    //logged user
    userid: 
    {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  }, {
    sequelize,
    tableName : 'ufriends',
    modelName: 'UFriend',
  });
  return UFriend;
};