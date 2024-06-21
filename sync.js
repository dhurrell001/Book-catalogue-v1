// sync.js
const sequelize = require("./models"); // Import the Sequelize instance
const Book = require("./models/book"); // Import the Book model

// IIFE (Immediately Invoked Function Expression) to run the sync process
(async () => {
  try {
    await sequelize.sync({ force: true }); // Sync all defined models to the DB. 'force: true' drops the table if it already exists
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error syncing database:", error);
  } finally {
    await sequelize.close(); // Close the database connection
  }
})();
