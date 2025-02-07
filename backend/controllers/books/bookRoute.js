const Book = require("../../models/Book");

const getBookById = async (req, res) => {
  const bookId = req.params.bookId;
  console.log(`Looking for book with ID: ${bookId}`);

  try {
    const book = await Book.findById(bookId)
      .populate("author", "name")
      .populate("category", "name")
      .populate("reviews");
    res.json(book);
    console.log("Book fetched successfully from server.js");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBookById };
