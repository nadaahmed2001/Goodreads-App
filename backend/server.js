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
const categoriesControllers = require("./controllers/categories/categoriesControllers");
const searchController = require("./controllers/search/SearchController");
const passport = require('./config/passport');
const GoogleAuth = require("./controllers/authencation/GoogleAuth");
const session = require("express-session");
const chatbotController = require("./controllers/chatbot/chatbotController");
const UserList= require("./controllers/UserListsController/UserLists");


const {
  verifyToken,
} = require("./controllers/authorization/authorizationMiddleware"); // Import verifyToken middleware
const userProfileController = require("./controllers/userProfileController/userProfile");
const UserBookList = require("./models/UserBookList");

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["https://goodreads-app.vercel.app", "http://localhost:5173"], // Allow both production and local development
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
const previewBookId = require("./controllers/books/previewBook");

// Connect to MongoDB
connectDB();
app.get("/BookPreview/:bookId", previewBookId); // ✅ Register route

// Home page
app.get("/", async (req, res) => {
  // console.log("I entered the server.js file to fetch books");
  try {
    // const books = await Book.find();
    const books = await Book.find().populate("author", "name"); //Populate the author field with the name field from the Author model

    // return just the first 6 books
    // books=books.slice(0, 6);
    res.json(books);
    // console.log("Books fetched successfully from server.js" + books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Chatbot
app.post("/chatbot", chatbotController.chatbot);


// Author endpoint to get all authors in books
app.get("/authors", BookAuthor.getAuthors);
app.get("/authors/:authorId", BookAuthor.getBooksByAuthId);
app.get("/search", searchController.search);
//register and login & profile
app.post("/login", authController.login); // Use the controller for the /login route
app.post("/register", authController.register); // Use the controller for the /register route
app.post("/verify-otp", authController.verifyOTP); // New route
app.get("/profile", verifyToken, userProfileController.profile);
app.put("/profile", verifyToken, userProfileController.updateProfile);

app.post("/forgot-password", authController.forgotPassword);
app.post("/reset-password", authController.resetPassword);
//////////////// google sign in ////////////////////
// Setup session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "secret",
//     resave: false,
//     saveUninitialized: true, // Ensures session is saved even if uninitialized
//   })
// );
app.use(passport.initialize());
// app.use(passport.session());
app.use(GoogleAuth);

//Categories
app.get("/categories-home", categoriesControllers.getCategoriesHome);
app.get(
  "/categories-home/:categoryId",
  categoriesControllers.getCategoryDetails
);

// ======================================= User Book Lists ====================================================
// Add book to list
app.post("/add-to-list", verifyToken,  UserList.addToList);

// Get user's book list by shelf
app.get("/get-list/:shelf", verifyToken, UserList.getList);

//Remove book from list
app.delete("/remove-from-list/:bookId/:shelf", verifyToken, UserList.removeFromList);

// ======== Category ========

// Post Category through Admin Panel
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
