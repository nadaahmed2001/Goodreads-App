const express = require("express");
// import Categories from './../frontend/src/Pages/Admin/Categories';
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // Load environment variables from .env file
const Book = require("./models/Book");
const Author = require("./models/Author");
const UserModel = require("./models/User");
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
const {allbooks} = require("./controllers/admin/crud"); 

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

const { getBookById } = require("./controllers/getBookbyID/bookID");

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
  console.log("I entered the server.js file to fetch books");
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
app.get("/authors",BookAuthor.getAuthors);

app.get("/authors/:authorId", BookAuthor.getBooksByAuthId);

app.get("/books/:bookId", bookID.getBookById);

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use another SMTP service, Gmail is just an example
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendWelcomeEmail = (userEmail) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: userEmail,
    subject: "Welcome to Shelf-Sphere!",
    text: `Hello,

    Your account has been successfully created at Shelf-Sphere!

    You can now log in to your account by clicking the link below:
    http://localhost:5173/sign-in

    Best regards,
    Shelf-Sphere Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

//register and login & profile

app.post("/login", authController.login); // Use the controller for the /login route
app.post("/register", authController.register); // Use the controller for the /register route
app.get("/profile", verifyToken, userProfileController.profile);

//retreive the user data by verifying its token

// ======================================= User Book Lists ====================================================
app.post("/add-to-list", verifyToken, async (req, res) => {
  const { bookId, shelf } = req.body;
  const userId = req.user.id; // Extract user ID from JWT
  console.log("Adding book", bookId, "to list", shelf, "for user", userId);

  try {
    const bookExists = await UserBookList.findOne({
      user: userId,
      book: bookId,
    });
    if (bookExists) {
      return res
        .status(400)
        .json({ success: false, message: "Book already exists in the list." });
    }

    await UserBookList.create({ user: userId, book: bookId, shelf });
    res.json({ success: true, message: "Book added to the list." });
  } catch (error) {
    console.error("Error adding book to list:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Get user's book list by shelf
app.get("/get-list/:shelf", verifyToken, async (req, res) => {
  const { shelf } = req.params;
  const userId = req.user.id; // Extract user ID from JWT

  try {
    const books = await UserBookList.find({ user: userId, shelf }).populate(
      "book"
    );
    res.json({ success: true, books });
  } catch (error) {
    console.error("Error fetching list:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

//Remove book from list
app.delete("/remove-from-list/:bookId", verifyToken, async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user.id;

  try {
    await UserBookList.deleteOne({ user: userId, book: bookId });
    res.json({ success: true, message: "Book removed from the list." });
  } catch (error) {
    console.error("Error removing book:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// ================ Admin Operations ================

// ======== Category ========

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

// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`➡ Local: http://localhost:${PORT}`);
});
