'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        allowNull: true,
        type: DataTypes.STRING,        
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phoneNumber: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      pictureUrl: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      address: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      age: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      gender: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: true,
        type: DataTypes.ENUM('User', 'Admin'),
        defaultValue: 'User',
      },
      accountStatus: {
        allowNull: true,
        type: DataTypes.ENUM('Active', 'Suspended'),
        defaultValue: 'Active',
      },
    },
  );
  User.associate = function(models){};
  return User;
};