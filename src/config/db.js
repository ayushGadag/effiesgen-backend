// src/config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,    // effiesgen
  process.env.DB_USER,    // root
  process.env.DB_PASS,    // student123
  {
    host: process.env.DB_HOST || "localhost", // अगर .env missing है तो default localhost
    dialect: "mysql",
    logging: false, // SQL queries console में spam नहीं करेंगी
  }
);

module.exports = sequelize;
