'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      firstName: {
        allowNull: true,
        type: Sequelize.STRING,        
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phoneNumber: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      pictureUrl: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      age: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: true,
        type: Sequelize.ENUM('User', 'Admin'),
        defaultValue: 'User',
      },
      accountStatus: {
        allowNull: true,
        type: Sequelize.ENUM('Active', 'Suspended'),
        defaultValue: 'Active',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};