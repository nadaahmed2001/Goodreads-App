const Author = require("../../models/Author");

const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch authors" });
  }
};

const postAuthor = (req, res) => {
  Author.create(req.body)
    .then((author) => {
      console.log("Author added:", author); // Log full book details
      res.json(author); // Send full book object to frontend
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const deletedAuthor = await Author.findByIdAndDelete(authorId);
    if (!deletedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json({
      message: "Author deleted successfully",
      category: deletedAuthor,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete author" });
  }
};

const updateAuthor = async (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedAuthor) => {
      if (!updatedAuthor) {
        return res.status(404).json({ error: "Author not found" });
      }
      console.log("Author updated:", updatedAuthor);
      res.json(updatedAuthor);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports = {
  getAuthors,
  postAuthor,
  updateAuthor,
  deleteAuthor,
};
