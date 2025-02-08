const express = require("express");
// import Categories from './../frontend/src/Pages/Admin/Categories';
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // Load environment variables from .env file
const Book = require("./models/Book");
const Review = require("./models/Review");
const Author = require("./models/Author");
const Category = require("./models/Category");
const jwt = require("jsonwebtoken");
const TempBooks = require("./models/TempBooks");
const nodemailer = require("nodemailer");
const authController = require("./controllers/authencation/authController"); // Import the controller
const BookAuthor = require("./controllers/authorBookController/BookAuthor");
const categoriesControllers= require("./controllers/categories/categoriesControllers");
const searchController = require("./controllers/search/SearchController");


const {
  verifyToken,
} = require("./controllers/authorization/authorizationMiddleware"); // Import verifyToken middleware
const userProfileController = require("./controllers/userProfileController/userProfile");
const UserBookList = require("./models/UserBookList");
// const {allbooks} = require("./controllers/admin/crud");
// const { getBooks } = require("./controllers/admin/Book");
const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json());

/*Fatma*/
const booksRoutes = require("./controllers/books/bookRoute");
const reviewsRoutes = require("./controllers/reviews/reviewRoute");
app.use("/books", booksRoutes);
app.use("/reviews", reviewsRoutes);
/*Fatma*/

const {
  getBooks,
  postBook,
  updateBook,
  deleteBook,
} = require("./controllers/admin/Book");

const {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("./controllers/admin/Category");

const {
  getAuthors,
  postAuthor,
  updateAuthor,
  deleteAuthor,
} = require("./controllers/admin/Author");

const {
  CreateCheckout,
  VerifyPayment,
} = require("./controllers/Payment/Payment");

// Connect to MongoDB
connectDB();

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
app.get("/search", searchController.search);
//register and login & profile
app.post("/login", authController.login); // Use the controller for the /login route
app.post("/register", authController.register); // Use the controller for the /register route
app.post("/verify-otp", authController.verifyOTP); // New route
app.get("/profile", verifyToken, userProfileController.profile);
app.post("/forgot-password", authController.forgotPassword);
app.post("/reset-password", authController.resetPassword);

//Categories
app.get("/categories-home", categoriesControllers.getCategoriesHome);
app.get("/categories-home/:categoryId", categoriesControllers.getCategoryDetails);

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
// Post Category through Admin Panel  ^T Execute
app.post("/category", postCategory);

// Get Category through Admin Panel
app.get("/categories", getCategories);
// Delete Category through Admin Panel
app.delete("/category/:id", deleteCategory);

// Put Category through Admin Panel

app.put("/category/:id", updateCategory);

// ======== Book ========

// Get Book through Admin Panel
app.get("/books", getBooks);

// Post Book through Admin Panel
app.post("/book", postBook);

// Put Book through Admin Panel
app.put("/book/:id", updateBook);

// Delete Book through Admin Panel
app.delete("/book/:id", deleteBook);

// ======== Author ========

// Add Author through Admin Panel
app.post("/author", postAuthor);

// Get Author through Admin Panel
app.get("/authors", getAuthors);

// Delete Author through Admin Panel

app.delete("/authorsAdmin/:id", deleteAuthor);

app.put("/authorsAdmin/:id", updateAuthor);

// ============= Payment ==================
app.post("/create-checkout-session", CreateCheckout);

app.get("/verify-payment", VerifyPayment);

// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`➡ Local: http://localhost:${PORT}`);
});
