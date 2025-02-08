const Book = require("../../models/Book");
const Author = require("../../models/Author");
const Category = require("../../models/Category");

const search = async (req, res) => {
  const searchString = req.query.q; 

  if (!searchString) {
    return res.status(400).json({ message: "Search string is required" });
  }

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: searchString, $options: "i" } },
        { description: { $regex: searchString, $options: "i" } },
      ]
    }).populate("author category"); 
    const authors = await Author.find({
      name: { $regex: searchString, $options: "i" }
    });
    const categories = await Category.find({
      name: { $regex: searchString, $options: "i" }
    });

    return res.json({
      books,
      authors,
      categories,
    });

  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: "Error performing search" });
  }
};

module.exports = {
  search,
};