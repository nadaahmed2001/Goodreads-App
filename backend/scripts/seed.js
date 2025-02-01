require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Book = require("../models/Book");
const Category = require("../models/Category");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    const dramacategory = await Category.findOne({ name: "Drama" });
    const fictioncategory = await Category.findOne({ name: "Fiction" });

    // await Category.create([
    //   {
    //     name: "Drama",
    //     description: "Drama is the specific mode of fiction represented in performance."
    //   },
    //   {
    //     name: "Fiction",
    //     description: "Fiction is any creative work, including novels, short stories, plays, films, and television shows."
    //   }
    // ]);
    
    await Book.create([
      {
        title: "Hamlet",
        author: "William Shakespeare",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/51L8YwJ0yPL._SX331_BO1,204,203,200_.jpg",
        category: dramacategory._id,
        price: 10.99,
        rating: 4.5,
        featured: true,
        trending: true,
        description: "The Tragedy of Hamlet, Prince of Denmark, often shortened to Hamlet, is a tragedy written by William Shakespeare sometime between 1599 and 1601.",
      
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/51b-JoVjFRL._SX331_BO1,204,203,200_.jpg",
        category: fictioncategory._id,
        price: 12.99,
        rating: 4.7,
        featured: true,
        trending: true,
        description: "Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813."
      
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/51b-JoVjFRL._SX331_BO1,204,203,200_.jpg",
        category: fictioncategory._id,
        price: 9.99,
        rating: 4.2,
        featured: true,
        trending: true,
        description: "The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby."
      },
      {
        title: "1984",
        author: "George Orwell",
        coverImage: "https://images-na.ssl-images-amazon.com/images/I/51b-JoVjFRL._SX331_BO1,204,203,200_.jpg",
        category: fictioncategory._id,
        price: 11.99,
        rating: 4.4,
        featured: true,
        trending: true,
        description: "Nineteen Eighty-Four: A Novel, often referred to as 1984, is a dystopian social science fiction novel by English novelist George Orwell."
      }
    ]);
    console.log("✅ Data inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    mongoose.connection.close();
  }
};

seedData();
