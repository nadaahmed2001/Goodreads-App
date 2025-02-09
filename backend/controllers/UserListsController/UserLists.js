const Books = require('../../models/Book');
const UserBookList = require('../../models/UserBookList');

const addToList = async (req, res) => {
    const { bookId, shelf } = req.body;
    const userId = req.user.id; // Extract user ID from JWT
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "You must be logged in to add books to your list." });
    }
  
    if (!bookId || !shelf) { 
      return res.status(400).json({ success: false, message: "Book ID and shelf are required." });
    }
  
    try {
      // Check if the book is already in the user's list
      const existingEntry = await UserBookList.findOne({ user: userId, book: bookId });
  
      console.log("existingEntry: ------------ ", existingEntry);
      
      if (existingEntry) {
        // Instead of rejecting, update the existing entry's shelf
        existingEntry.shelf = shelf;
        await existingEntry.save();
        return res.json({ success: true, message: `Book moved to ${shelf} list.` });
      }
  
      try {
        // If the book is not in any list, add it
        const newEntry = await UserBookList.create({ user: userId, book: bookId, shelf });
        return res.json({ success: true, message: `Book successfully added to your list: ${shelf}` });
      } catch (error) {
        console.error("Error adding book to list:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
      }
    } catch (error) {
      console.error("Error checking existing entry:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

const getList = async (req, res) => {
    const { shelf } = req.params;
    const userId = req.user.id; // Extract user ID from JWT
  
    try {
      console.log("-------------------Fetching books from server --> get-list");


      //Send the books from the user's list along with the author of the book
        const books = await UserBookList.find({ user: userId, shelf })
            .populate({
                path: "book",
                populate: { 
                    path: "author", 
                    select: "name" // Ensure only the 'name' field is selected
                }
            });

      console.log("------------------Fetchedbooks from server --> get-list", books);
      res.json({ success: true, books });
    } catch (error) {
      console.error("Error fetching list:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
    };
  


const removeFromList = async (req, res) => {
    const { bookId, shelf } = req.params;
    const userId = req.user.id;
  
    try {
      console.log("(server.js) Removing book with ID:", bookId + "from shelf: " + shelf);
      await UserBookList.deleteOne({ user: userId, book: bookId , shelf});
      res.json({ success: true, message: "Book removed from the list." });
    } catch (error) {
      console.error("Error removing book:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
};


module.exports = {
    addToList,
    getList,
    removeFromList
}; // Export the functions to be used in routes