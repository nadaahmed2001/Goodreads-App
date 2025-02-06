const Category = require("../../models/Category");

// Get Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const postCategory = (req, res) => {
  Category.create(req.body)
    .then((cat) => {
      console.log("category added:", cat); // Log full book details
      res.json(cat); // Send full book object to frontend
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

const updateCategory = (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body, { new: true }) //first parameter is ID , second parameter is the updated changes , third parameter `new: true` returns updated doc
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      console.log("Category updated:", updatedCategory);
      res.json(updatedCategory);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};

module.exports = {
  getCategories,
  postCategory,
  updateCategory,
  deleteCategory,
};
