const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Exam = sequelize.define('Exam', {
  examName: { type: DataTypes.STRING, allowNull: false },
  course: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  duration: { type: DataTypes.STRING },
  venue: { type: DataTypes.STRING },
  invigilatorId: { type: DataTypes.INTEGER }
});

module.exports = Exam;
