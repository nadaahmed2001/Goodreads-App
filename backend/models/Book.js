const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    description: String,
    coverImage: String,
    demo: String,
    fullBook: String,
    rating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "book",
});

bookSchema.virtual("averageRating").get(function () {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const total = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return total / this.reviews.length;
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
