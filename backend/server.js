const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // Load environment variables from .env file
const Book = require("./models/Book"); // Ensure the correct path to the Book model

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
    const books = await Book.find();
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
    const books = await Book.find();

    const authors = books.map(book => book.author);
    const uniqueAuthors = authors.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id === value.id 
      ))
    );
    res.json(uniqueAuthors); 
    console.log("Authors fetched successfully from server.js");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Endpoint to get all books by a specific author ID
app.get("/authors/:authorId", async (req, res) => {
  const authorId = parseInt(req.params.authorId); 
  console.log(`Looking for author with ID: ${authorId}`);
  
  try {
    const books = await Book.find({ "author.id": authorId });
    if (books.length === 0) {
      return res.status(404).json({ message: "Author not found" });
    }
    const author = books[0].author;
    res.json(author);
    console.log("Author fetched successfully from server.js");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Start the server
// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));