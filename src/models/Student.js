const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  rollNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  course: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Student;
