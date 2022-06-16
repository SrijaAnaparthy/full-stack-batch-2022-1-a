'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('expensemembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expenseid: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      memberid: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      divamount: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      grpid :
      {
        type : Sequelize.INTEGER
      },
      settleamount :
      {
        type : Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('expensemembers');
  }
};