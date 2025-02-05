const Book = require("../../models/Book");

const allbooks =  async (req, res) => {

    try {
      const books = await Book.find().populate("author", "name");
      console.log("side seerver", books);
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  }

  module.exports = {
    allbooks,
  };