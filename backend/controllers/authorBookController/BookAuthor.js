const Author = require("../../models/Author");
const Book = require("../../models/Book");
const mongoose = require("mongoose");

const getAuthors = async (req, res) => {
    // console.log("I entered the server.js file to fetch authors");
    try {
      const authors = await Author.find();
      res.json(authors);
      // console.log("Authors fetched successfully from server.js");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getAuthById = async (req, res) => {
    const authorId = req.params.authorId;
    console.log(`Looking for author with ID: ${authorId}`);
  
    try {
      // Fetch the author with the books populated
      const author = await Author.findOne({ _id: authorId });
      // Fetch the author with the books populated
  
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
      console.log("Author fetched successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getBooksByAuthId = async (req, res) => {
    const authorId = req.params.authorId;
    // console.log(`Looking for Books with author ID: ${authorId}`);
  
    try {
      
      const books = await Book.find({ author: authorId }).populate('author');
      if (!books || books.length === 0){
        if (!mongoose.isValidObjectId(authorId)) {
          return res.status(400).json({ message: "Invalid author ID format" });
        }
        const author = await Author.findById(authorId);
        return res.json({ author, books: [] }); 
      }else{
        const author = books[0].author; 
        return res.json({ author, books });
      }
      
     
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
 
  module.exports = {
    getAuthors,
    getAuthById,
    getBooksByAuthId
  };