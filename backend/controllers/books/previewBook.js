const Book = require("../../models/Book");

const previewBookId = async (req, res) => {
  const bookId = req.params.bookId;
  console.log(`Looking for book with ID: ${bookId}`);

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json({ fullBook: book.fullBook }); // ✅ Send only necessary data
    console.log("Book fetched successfully:", book.fullBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = previewBookId;
