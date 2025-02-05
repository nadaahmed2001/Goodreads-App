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
const  {verifyToken}  = require("./controllers/authorization/authorizationMiddleware"); // Import verifyToken middleware
const userProfileController = require("./controllers/userProfileController/userProfile");
const UserBookList = require("./models/UserBookList");
const {allbooks} = require("./controllers/admin/crud"); 
const {getBookById} = require("./controllers/getBookbyID/bookID");
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
app.get("/authors", async (req, res) => {
  console.log("I entered the server.js file to fetch authors");
  try {
    const books = await Author.find();
    res.json(books);
    console.log("Authors fetched successfully from server.js");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/authors/:authorId", async (req, res) => {
  const authorId = req.params.authorId;
  console.log(`Looking for author with ID: ${authorId}`);

  try {
    // Fetch the author with the books populated
    const author = await Author.findOne({ _id: authorId });
    // Fetch the author with the books populated

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json(author); // Return the author with the populated books
    console.log("Auther-------------------", author);

    res.json(author); // Return the author with the populated books
    res.json(author); // Send back the single author object, not an array
    res.json(author); // Return the author with the populated books
    console.log("Author fetched successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/books/:bookId", getBookById);

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
app.get("/books",allbooks);

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
