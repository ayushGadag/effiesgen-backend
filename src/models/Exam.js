const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Exam = sequelize.define("Exam", {
  title: { type: DataTypes.STRING, allowNull: false },
  course: { type: DataTypes.STRING, allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false }, // "HH:mm"
  durationMinutes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 120 },
  venue: { type: DataTypes.STRING, allowNull: true },
  invigilatorId: { type: DataTypes.INTEGER, allowNull: true },
});

module.exports = Exam;
