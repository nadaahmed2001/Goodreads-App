const express = require("express");
const router = express.Router();
const Review = require("../../models/Review");
const Book = require("../../models/Book");

router.post("/books/:bookId/reviews", async (req, res) => {
  try {
    const { bookId } = req.params;
    const { user, rating, comment } = req.body;

    const review = new Review({
      book: bookId,
      user,
      rating,
      comment,
    });

    await review.save();
    await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
});

router.get("/books/:bookId/reviews", async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.find({ book: bookId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
});

module.exports = router;
