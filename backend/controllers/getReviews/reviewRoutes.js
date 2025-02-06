// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const authMiddleware = require("../middleware/authMiddleware");

// Get reviews for a book
router.get("/books/:bookId/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate(
      "user",
      "first_name last_name"
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

// Add new review
router.post("/books/:bookId/reviews", authMiddleware, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const newReview = new Review({
      user: req.user.id,
      book: req.params.bookId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    const populatedReview = await Review.findById(savedReview._id).populate(
      "user",
      "first_name last_name"
    );

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(400).json({ message: "Error creating review", error });
  }
});

module.exports = router;
