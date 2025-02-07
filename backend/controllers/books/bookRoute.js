const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");

router.get("/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate(
      "category author reviews"
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
});

module.exports = router;
