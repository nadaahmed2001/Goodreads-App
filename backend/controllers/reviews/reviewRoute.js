const express = require("express");
const router = express.Router();
const Review = require("../../models/Review");
const Book = require("../../models/Book");

router.post("/books/:bookId/reviews", async (req, res) => {
  const { bookId } = req.params;
  const { user, rating, comment } = req.body;

  try {
    const review = new Review({
      book: bookId,
      user,
      rating: Number(rating),
      comment,
    });
    await review.save();

    await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

    const reviewsData = await Review.find({ book: bookId });
    const total = reviewsData.reduce((acc, r) => acc + r.rating, 0);
    const avgRating = reviewsData.length > 0 ? total / reviewsData.length : 0;

    await Book.findByIdAndUpdate(bookId, { averageRating: avgRating });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to submit review", error });
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
