require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Book = require("../models/Book");
const Author = require("../models/Author");
const Category = require("../models/Category");

mongoose.connect(
  "mongodb+srv://nadafcai:Nme55a6WJbMV8rS1@goodreads.rhixw.mongodb.net/?retryWrites=true&w=majority&appName=Goodreads",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const seedData = async () => {
  try {
    await Category.create([
      { name: "Drama" },
      { name: "Fiction" },
      { name: "Science Fiction" },
      { name: "Fantasy" },
      { name: "Mystery" },
      { name: "Horror" },
      { name: "Thriller" },
      { name: "Romance" },
      { name: "Poetry" },
      { name: "Biography" },
    ]);

    const dramacategory = await Category.findOne({ name: "Drama" });
    const fictioncategory = await Category.findOne({ name: "Fiction" });

    await Category.create([
      {
        name: "Action",
        description:
          "Action is the specific mode of fiction represented in performance.",
      },
    ]);

    await Book.create([
      {
        title: "Hamlet",
        author: "William Shakespeare",
        coverImage:
          "https://images-na.ssl-images-amazon.com/images/I/51L8YwJ0yPL._SX331_BO1,204,203,200_.jpg",
        category: dramacategory._id,
        author: williamShakespeare._id,
        description: "A tragedy about two young star-crossed lovers.",
        coverImage:
          "https://upload.wikimedia.org/wikipedia/commons/4/49/Romeo_and_juliet_title_page.jpg",
        price: 10,
        rating: 5,
        featured: true,
        trending: true,
        description:
          "The Tragedy of Hamlet, Prince of Denmark, often shortened to Hamlet, is a tragedy written by William Shakespeare sometime between 1599 and 1601.",
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        coverImage:
          "https://images-na.ssl-images-amazon.com/images/I/51b-JoVjFRL._SX331_BO1,204,203,200_.jpg",
        category: fictioncategory._id,
        author: janeAusten._id,
        description: "A romantic novel of manners.",
        coverImage:
          "https://upload.wikimedia.org/wikipedia/commons/8/89/PrideAndPrejudiceTitlePage.jpg",
        price: 15,
        rating: 4,
        featured: true,
        trending: true,
        description:
          "Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813.",
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        coverImage:
          "https://images-na.ssl-images-amazon.com/images/I/51b-JoVjFRL._SX331_BO1,204,203,200_.jpg",
        category: fictioncategory._id,
        author: fScottFitzgerald._id,
        description: "A novel set in the Jazz Age.",
        coverImage:
          "https://upload.wikimedia.org/wikipedia/commons/4/42/Gatsby_1925_jacket.gif",
        price: 20,
        rating: 4,
        featured: true,
        trending: true,
        description:
          "The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby.",
      },
      {
        title: "1984",
        author: "George Orwell",
        coverImage:
          "https://images-na.ssl-images-amazon.com/images/I/51b-JoVjFRL._SX331_BO1,204,203,200_.jpg",
        category: fictioncategory._id,
        author: georgeOrwell._id,
        description: "A dystopian social science fiction novel.",
        coverImage:
          "https://upload.wikimedia.org/wikipedia/commons/c/c3/1984first.jpg",
        price: 18,
        rating: 5,
        featured: true,
        trending: true,
        description:
          "Nineteen Eighty-Four: A Novel, often referred to as 1984, is a dystopian social science fiction novel by English novelist George Orwell.",
      },
    ]);

    console.log("✅ Data inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
