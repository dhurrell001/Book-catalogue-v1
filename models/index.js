// Create connection to database
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite", // This is the path to the SQLite database file
});

module.exports = sequelize;
