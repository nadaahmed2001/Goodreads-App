const express = require("express");

const router = express.Router();

// Get All Books

// Get Featured Books
// router.get("/featured", async (req, res) => {
//   try {
//     const books = await Book.find({ featured: true }).limit(10);
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get Trending Books
// router.get("/trending", async (req, res) => {
//   try {
//     const books = await Book.find({ trending: true }).limit(10);
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get Books by Category
// router.get("/category/:categoryId", async (req, res) => {
//   try {
//     const books = await Book.find({ category: req.params.categoryId });
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
