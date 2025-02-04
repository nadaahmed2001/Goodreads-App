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
    const author = await Author.findById(authorId).populate("books");
    // Fetch the author with the books populated
   

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json(author);  // Return the author with the populated books
    res.json(author); // Send back the single author object, not an array
    res.json(author);  // Return the author with the populated books
    console.log("Author fetched successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



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

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",  // You can use another SMTP service, Gmail is just an example
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


//register and login 
// Middleware to verify token
function verifyToken(req, res, next) {

  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }
  // Handle case where token might or might not have "Bearer "
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });

}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          // Issue JWT Token
          const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ message: "success", token });
        } else {
          res.json({ message: "Incorrect password" });
        }
      } else {
        res.json({ message: "User not found" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

   
   app.post('/register', (req, res) => {
       // Check if user already exists (by email in this case)
       UserModel.findOne({ email: req.body.email })
         .then(existingUser => {
           if (existingUser) {
             // If user exists, return an error message
             return res.json("Email Already Exist");
           }
           // If user doesn't exist, create a new user
        
      UserModel.create(req.body) // Create user in the database
        .then((user) => {
          // Send the welcome email after user is created
          sendWelcomeEmail(user.email);

          res.json(user);  // Respond with the created user object
        })
             .catch(err => res.status(500).json({ error: err.message }));  // Handle any errors
         })
         .catch(err => res.status(500).json({ error: err.message }));  // Handle errors in finding the user
     });
     
      
     //retreive the user data by verifying its token 
     app.get('/profile', verifyToken, (req, res) => {
      // Access the user ID from the decoded JWT token
      UserModel.findById(req.user.id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: err.message }));
    });
    
 

// Start the server
// ================ Admin Operations ================

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

// Add Book through Admin Panel
app.post("/book", (req, res) => {
  Book.create(req.body)
    .then((book) => {
      console.log("Book added:", book); // Log full book details
      res.json(book); // Send full book object to frontend
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/temp", (req, res) => {
  // console.log("Request Body:", req.body);
  TempBooks.create(req.body)
    .then((book) => {
      console.log("Book added:", book); // Log full book details
      res.json(book); // Send full book object to frontend
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Add Author through Admin Panel
app.post("/author", (req, res) => {
  Author.create(req.body)
    .then((author) => {
      console.log("Author added:", author); // Log full book details
      res.json(author); // Send full book object to frontend
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`➡ Local: http://localhost:${PORT}`);
});
