const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Collaboration = sequelize.define("Collaboration", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Collaboration;
