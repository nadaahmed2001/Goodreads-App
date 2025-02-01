const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  description: String,
  coverImage: String,
  price: Number,
  rating: Number,
  featured: Boolean,
  trending: Boolean,
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
