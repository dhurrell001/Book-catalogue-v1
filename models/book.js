// Create book model, this will be synced as a table in database
const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Book = sequelize.define("Book", {
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Book;
