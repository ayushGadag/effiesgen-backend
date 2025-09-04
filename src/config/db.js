// src/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,    // DB_NAME = effiesgen
  process.env.DB_USER,    // DB_USER = root
  process.env.DB_PASS,    // DB_PASS = तेरा mysql password
  {
    host: process.env.DB_HOST,   // localhost
    dialect: 'mysql'
  }
);

module.exports = sequelize;
