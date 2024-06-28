const express = require("express");
const router = express.Router();
const Book = require("../models/book"); // Import the Book model

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
  const author = req.query;
  res.send(`this is in the server route, search for book ${author}`);
});
/* DELETE remove a book. */
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
