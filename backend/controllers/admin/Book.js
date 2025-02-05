const Book = require("../../models/Book");

// Get Books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author", "name");
    console.log("side seerver", books);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({
      message: "Book deleted successfully",
      category: deletedBook,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};

const updateBook = (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true }) //first parameter is ID , second parameter is the updated changes , third parameter `new: true` returns updated doc
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).json({ error: "Bood not found" });
      }
      console.log("Book updated:", updatedBook);
      res.json(updatedBook);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Post Book
const postBook = (req, res) => {
  Book.create(req.body)
    .then((book) => {
      console.log("Book added:", book); // Log full book details
      res.json(book); // Send full book object to frontend
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports = {
  getBooks,
  postBook,
  updateBook,
  deleteBook,
};
