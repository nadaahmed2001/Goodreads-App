const Book = require('../../models/Book');
const Category = require('../../models/Category');


const getCategoriesHome = async (req, res) => {
    try {
        const categories = await Category.find();
        const categoriesWithBooks = await Promise.all(
            categories.map(async (category) => {
                const books = await Book.find({ category: category._id })
                    .limit(4) // Limit to 4 books per category
                return { ...category.toObject(), books };//return category with books, category.toObject() converts Mongoose document to plain JS object
            })
        );

        res.status(200).json(categoriesWithBooks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getCategoryDetails = async (req, res) => {
    // console.log("Route Params:", req.params);

    const { categoryId } = req.params;
    // console.log("Category id: ", categoryId);
    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const books = await Book.find({ category: categoryId });

        // console.log("Category Name:", category.name);
        // console.log("Books in this category:", books);

        res.status(200).json({
            books: books || [], // ✅ Always return an array
            categoryName: category.name || "Unknown Category",
        });

    } catch (error) {
        console.error("Error in getCategoryDetails:", error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getCategoriesHome, getCategoryDetails };