const express = require("express");
// import Categories from './../frontend/src/Pages/Admin/Categories';
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // Load environment variables from .env file
const Book = require("./models/Book");
const Author = require("./models/Author");
const UserModel = require("./models/User");
const Category = require("./models/Category");
const TempBooks = require("./models/TempBooks");

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

// Endpoint to get all books by a specific author ID
// app.get("/authors/:authorId", async (req, res) => {
//   const authorId = req.params.authorId;
//   console.log(`Looking for author with ID: ${authorId}`);

//   try {
//     const author = await Author.find({ _id: authorId });
//     res.json(author);
//     console.log("Author fetched successfully from server.js");
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
app.get("/authors/:authorId", async (req, res) => {
  const authorId = req.params.authorId;
  console.log(`Looking for author with ID: ${authorId}`);

  try {
    const author = await Author.findById(authorId); // findById should return a single author object

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json(author); // Send back the single author object, not an array
    console.log("Author fetched successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.get("/authors/:authorId", async (req, res) => {
//   const authorId = req.params.authorId;
//   console.log(`Looking for author with ID: ${authorId}`);

//   try {
//     const author = await Author.findById(authorId); // Use findById instead of find
//     if (!author) {
//       return res.status(404).json({ message: "Author not found" });
//     }
//     res.json(author);
//     console.log("Author fetched successfully from server.js");
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.get("/books/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  console.log(`Looking for book with ID: ${bookId}`);

  try {
    // Populate the author field with the name field from the Author model and populate categoru name
    const book = await Book.findById(bookId)
      .populate("author", "name")
      .populate("category", "name");
    res.json(book);
    console.log("Book fetched successfully from server.js");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//register and login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("Incorrect password");
      }
    } else {
      res.json("User not found");
    }
  });
});

app.post("/register", (req, res) => {
  // Check if user already exists (by email in this case)
  UserModel.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        // If user exists, return an error message
        return res.json("Email Already Exist");
      }

      // If user doesn't exist, create a new user
      UserModel.create(req.body) //creation in database
        .then((user) => res.json(user)) // Respond with the created user to the frontend
        .catch((err) => res.status(500).json({ error: err.message })); // Handle any errors
    })
    .catch((err) => res.status(500).json({ error: err.message })); // Handle errors in finding the user
});

// ================ Admin Operations ================

// ======== Category ========

// Add Category through Admin Panel
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
  Category.findByIdAndUpdate(req.params.id, req.body, { new: true }) // `new: true` returns updated doc
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).json({ error: "Book not found" });
      }
      console.log("Book updated:", updatedBook);
      res.json(updatedBook);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// ======== Book ========
// Add Book through Admin Panel
app.post("/book", (req, res) => {
  Book.create(req.body)
    .then((book) => {
      console.log("Book added:", book); // Log full book details
      res.json(book); // Send full book object to frontend
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Get Book through Admin Panel
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

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

// app.post("/temp", (req, res) => {
//   // console.log("Request Body:", req.body);
//   TempBooks.create(req.body)
//     .then((book) => {
//       console.log("Book added:", book); // Log full book details
//       res.json(book); // Send full book object to frontend
//     })
//     .catch((err) => res.status(500).json({ error: err.message }));
// });

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

app.delete("/author/:id", async (req, res) => {
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

// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`➡ Local: http://localhost:${PORT}`);
});
