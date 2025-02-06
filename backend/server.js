const express = require("express");
// import Categories from './../frontend/src/Pages/Admin/Categories';
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // Load environment variables from .env file
const Book = require("./models/Book");
const Author = require("./models/Author");
const Category = require("./models/Category");
const jwt = require("jsonwebtoken");
const TempBooks = require("./models/TempBooks");
const nodemailer = require("nodemailer");
const authController = require("./controllers/authencation/authController"); // Import the controller
const BookAuthor = require("./controllers/authorBookController/BookAuthor");
const bookID = require("./controllers/getBookbyID/bookID");
const {
  verifyToken,
} = require("./controllers/authorization/authorizationMiddleware"); // Import verifyToken middleware
const userProfileController = require("./controllers/userProfileController/userProfile");
const UserBookList = require("./models/UserBookList");
// const {allbooks} = require("./controllers/admin/crud");
const { getBooks } = require("./controllers/admin/Book");
const { getBookById } = require("./controllers/getBookbyID/bookID");

/*reviews fatma*/
const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api", reviewRoutes);
/*reviews fatma*/

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes

// Home page
app.get("/", async (req, res) => {
  // console.log("I entered the server.js file to fetch books");
  try {
    // const books = await Book.find();
    const books = await Book.find().populate("author", "name"); //Populate the author field with the name field from the Author model

    // return just the first 6 books
    // books=books.slice(0, 6);
    res.json(books);
    console.log("Books fetched successfully from server.js" + books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Author endpoint to get all authors in books
app.get("/authors", BookAuthor.getAuthors);

app.get("/authors/:authorId", BookAuthor.getBooksByAuthId);

app.get("/books/:bookId", bookID.getBookById);

//register and login & profile
app.post("/login", authController.login); // Use the controller for the /login route
app.post("/register", authController.register); // Use the controller for the /register route
app.get("/profile", verifyToken, userProfileController.profile);

//retreive the user data by verifying its token

// ======================================= User Book Lists ====================================================
app.post("/add-to-list", verifyToken, async (req, res) => {
  const { bookId, shelf } = req.body;
  const userId = req.user.id; // Extract user ID from JWT

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "You must be logged in to add books to your list.",
    });
  }

  if (!bookId || !shelf) {
    return res
      .status(400)
      .json({ success: false, message: "Book ID and shelf are required." });
  }

  try {
    // Check if the book is already in the user's list
    const existingEntry = await UserBookList.findOne({
      user: userId,
      book: bookId,
    });

    console.log("existingEntry: ------------ ", existingEntry);

    if (existingEntry) {
      // Instead of rejecting, update the existing entry's shelf
      existingEntry.shelf = shelf;
      await existingEntry.save();
      return res.json({
        success: true,
        message: `Book moved to ${shelf} list.`,
      });
    }

    try {
      // If the book is not in any list, add it
      const newEntry = await UserBookList.create({
        user: userId,
        book: bookId,
        shelf,
      });
      return res.json({
        success: true,
        message: `Book successfully added to your list: ${shelf}`,
      });
    } catch (error) {
      console.error("Error adding book to list:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  } catch (error) {
    console.error("Error checking existing entry:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

// Get user's book list by shelf
app.get("/get-list/:shelf", verifyToken, async (req, res) => {
  const { shelf } = req.params;
  const userId = req.user.id; // Extract user ID from JWT

  try {
    console.log("Fetching books from server --> get-list");
    const books = await UserBookList.find({ user: userId, shelf })
      .populate("book")
      .exec();
    console.log(
      "------------------Fetchedbooks from server --> get-list",
      books
    );
    res.json({ success: true, books });
  } catch (error) {
    console.error("Error fetching list:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

//Remove book from list
app.delete(
  "/remove-from-list/:bookId/:shelf",
  verifyToken,
  async (req, res) => {
    const { bookId, shelf } = req.params;
    const userId = req.user.id;

    try {
      console.log(
        "(server.js) Removing book with ID:",
        bookId + "from shelf: " + shelf
      );
      await UserBookList.deleteOne({ user: userId, book: bookId, shelf });
      res.json({ success: true, message: "Book removed from the list." });
    } catch (error) {
      console.error("Error removing book:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  }
);

// ================ Admin Operations ================

// ======== Category ========

// Post Category through Admin Panel
app.post("/category", (req, res) => {
  Category.create(req.body)
    .then((cat) => {
      console.log("category added:", cat); // Log full book details
      res.json(cat); // Send full book object to frontend
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Get Category through Admin Panel
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});
// Delete Category through Admin Panel
app.delete("/category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

// Put Category through Admin Panel

app.put("/category/:id", (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body, { new: true }) //first parameter is ID , second parameter is the updated changes , third parameter `new: true` returns updated doc
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      console.log("Category updated:", updatedCategory);
      res.json(updatedCategory);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// ======== Book ========
// Post Book through Admin Panel

app.post("/book", (req, res) => {
  Book.create(req.body)
    .then((book) => {
      console.log("Book added:", book); // Log full book details
      res.json(book); // Send full book object to frontend
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Get Book through Admin Panel
app.get("/books", getBooks);

// Delete Book through Admin Panel

app.delete("/book/:id", async (req, res) => {
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
});

app.put("/book/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true }) //first parameter is ID , second parameter is the updated changes , third parameter `new: true` returns updated doc
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).json({ error: "Bood not found" });
      }
      console.log("Book updated:", updatedBook);
      res.json(updatedBook);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// ======== Author ========

// Add Author through Admin Panel
app.post("/author", (req, res) => {
  Author.create(req.body)
    .then((author) => {
      console.log("Author added:", author); // Log full book details
      res.json(author); // Send full book object to frontend
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Get Author through Admin Panel
app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch authors" });
  }
});

// Delete Author through Admin Panel

app.delete("/authorsAdmin/:id", async (req, res) => {
  try {
    const authorId = req.params.id;
    const deletedAuthor = await Author.findByIdAndDelete(authorId);
    if (!deletedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json({
      message: "Author deleted successfully",
      category: deletedAuthor,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete author" });
  }
});

app.put("/authorsAdmin/:id", async (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedAuthor) => {
      if (!updatedAuthor) {
        return res.status(404).json({ error: "Author not found" });
      }
      console.log("Author updated:", updatedAuthor);
      res.json(updatedAuthor);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`➡ Local: http://localhost:${PORT}`);
});
