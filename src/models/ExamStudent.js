const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ExamStudent = sequelize.define("ExamStudent", {
  // through table (no extra fields needed now)
}, { timestamps: false });

module.exports = ExamStudent;
