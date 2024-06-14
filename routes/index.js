var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Book Catalogue" });
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
