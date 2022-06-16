'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      //,Group,Expense
      this.hasMany(models.UFriend, {foreignKey : 'fid'})
      this.hasMany(models.Group,{foreignKey : 'createdby'})
      this.hasMany(models.Expense, {foreignKey : 'createdby'})
      this.hasMany(models.ActivityRecord, {foreignKey : 'createdby'})
    }

    toJSON()
    {
      return {...this.get(),id : undefined, password : undefined}
    }
  }
  User.init({
    firstname: 
    {
      type : DataTypes.STRING,
      allowNull : false,
      validate :
      {
        notNull : {msg : 'User must have the FirstName'},
        notEmpty : {msg : 'User FirstName must not be empty'}
      }
    },
    lastname: 
    {
      type : DataTypes.STRING,
      allowNull : false,
      validate :
      {
        notNull : {msg : 'User must have the LastName'},
        notEmpty : {msg : 'User LastName must not be empty'}
      }
    },
    email: 
    {
      type : DataTypes.STRING,
      allowNull : false,
      validate :
      {
        notNull : {msg : 'User must have an Email'},
        notEmpty : {msg : 'User Email must not be empty'},
        isEmail : {msg : 'Must be a valid email address'}
      }
    },
    password: 
    {
      type : DataTypes.STRING,
      allowNull : false,
      validate :
      {
        notNull : {msg : 'User must have a password'},
        notEmpty : {msg : 'User password must not be empty'}
      }
    },
    phno :
    {
      type : DataTypes.TEXT,
      allowNull : false
    }
  }, {
    sequelize,
    tableName : 'users',
    modelName: 'User',
  });
  return User;
};