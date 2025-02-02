const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  description: String,
  coverImage: String,
  price: Number,
  rating: Number,
  featured: Boolean,
  trending: Boolean,
});

const Book = mongoose.model("Book", bookSchema);//table
module.exports = Book;
