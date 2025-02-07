const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");

router.get("/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  console.log(`Looking for book with ID: ${bookId}`);
  try {
    const book = await Book.findById(bookId)
      .populate("author", "name")
      .populate("category", "name")
      .populate("reviews");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
    console.log("Book fetched successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
