const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Settings = sequelize.define('Settings', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  theme: { type: DataTypes.STRING, defaultValue: 'light' },
  notifications: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = Settings;
