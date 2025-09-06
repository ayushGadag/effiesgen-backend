// src/models/Invigilator.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Invigilator = sequelize.define("Invigilator", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Invigilator;
