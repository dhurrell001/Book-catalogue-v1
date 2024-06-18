var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Book Catalogue" });
});

router.get("/listBooks", function (req, res, next) {
  res.render("listBook", { title: "Book Catalogue" });
});
module.exports = router;

router.post("/add", (req, res) => {
  const book = req.body;
  fs.readFile("books.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("error reading books file");
    }
    const books = JSON.parse(data || "[]");
    books.push(book);
    fs.writeFile("books.json", JSON.stringify(books), (err) => {
      if (err) {
        return res.status(500).send("error saving book");
      }
      res.send("Book added");
    });
  });
});
router.get("/list", (req, res) => {
  fs.readFile("books.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading books file:", err);
      return res.status(500).send("Error reading books file");
    }
    const books = JSON.parse(data || "[]");
    res.render("listBook", { title: "List of Books", books: books });
  });
});

router.delete("/delete", (req, res) => {
  const { author, title } = req.body;
  fs.readFile("books.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("error reading books file");
    }
    let books = JSON.parse(data || "[]");
    books = books.filter(
      (book) => book.author !== author || book.title !== title
    );
    fs.writeFile("books.json", JSON.stringify(books), (err) => {
      if (err) {
        return res.status(500).send("error saving book");
      }
      res.send("Book removed");
    });
  });
});
