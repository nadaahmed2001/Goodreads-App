const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  description: String,
  coverImage: String,
  demo: String,
  fullBook: String,
  rating: { type: Number, default: 0 },
  rating: { type: String, default: 0 },
  featured: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
});

const Book = mongoose.model("Book", bookSchema); //table
module.exports = Book;
