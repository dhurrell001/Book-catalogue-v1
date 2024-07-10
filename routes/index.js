const express = require("express");
const router = express.Router();
const Book = require("../models/book"); // Import the Book model
const { Op, Sequelize, fn, col } = require("sequelize"); // Import necessary Sequelize functions

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Book Catalogue" });
});

/* GET list of books. */
router.get("/list", async function (req, res, next) {
  try {
    const books = await Book.findAll(); // Fetch all books
    res.render("listBook", { title: "List of Books", books: books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Error fetching books");
  }
});

/* POST add a new book. */
router.post("/add", async (req, res) => {
  const { author, title } = req.body;
  try {
    await Book.create({ author, title }); // Create a new book record
    res.send("Book added");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send("Error adding book");
  }
});
router.get("/search", async (req, res) => {
  // Extract author and titl from passed url Query. If eithr is not present assign null.
  const author = req.query.author ? req.query.author.toLowerCase() : null;
  const title = req.query.title ? req.query.title.toLowerCase() : null;
  console.log(`Searching for author: ${author}, title: ${title}`);

  try {
    let books = [];

    if (author && title) {
      // if both author and title are not null, Search by both author and title
      books = await Book.findAll({
        where: {
          [Op.and]: [
            // use sequalize lower function to change results to lower case. like function helps to find in-exact
            // search queries
            Sequelize.where(fn("lower", col("author")), {
              [Op.like]: `%${author}%`,
            }),
            Sequelize.where(fn("lower", col("title")), {
              [Op.like]: `%${title}%`,
            }),
          ],
        },
      });
    } else if (author) {
      // If title is null, Search by author only
      books = await Book.findAll({
        where: Sequelize.where(fn("lower", col("author")), {
          [Op.like]: `%${author}%`,
        }),
      });
    } else if (title) {
      //  if author is null, Search by title only
      books = await Book.findAll({
        where: Sequelize.where(fn("lower", col("title")), {
          [Op.like]: `%${title}%`,
        }),
      });
    } else {
      // No search parameters provided
      books = await Book.findAll();
    }
    // check if books contains any search results, and return message if empty
    if (books.length === 0) {
      console.log("No books found");
    }
    // render books to listBook page
    res.render("listBook", { title: "Search Results", books: books });
  } catch (error) {
    console.error("Error searching for books:", error);
    res.status(500).json({ error: "Error searching for books" });
  }
});
/* DELETE remove a book. Searches for book by author and title, removes book from database
if found */
router.delete("/delete", async (req, res) => {
  const { author, title } = req.body;
  try {
    const result = await Book.destroy({
      where: {
        author: author,
        title: title,
      },
    });
    if (result === 0) {
      res.status(404).send("Book not found");
    } else {
      res.send("Book removed");
    }
  } catch (error) {
    console.error("Error removing book:", error);
    res.status(500).send("Error removing book");
  }
});

module.exports = router;
