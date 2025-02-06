// const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema({
//   rating: Number,
//   comment: String,
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
//   createdat: { type: Date, default: Date.now },
// });

// const Review = mongoose.model("Review", reviewSchema);
// module.exports = Review;

// models/Review.js

// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
