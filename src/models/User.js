// src/models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // खाली string allow नहीं होगा
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // एक ही email दो बार नहीं होगा
    validate: {
      isEmail: true, // proper email format होना चाहिए
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("ExamUnit", "Student", "Invigilator"), // roles fix
    allowNull: false,
  },
});

module.exports = User;
