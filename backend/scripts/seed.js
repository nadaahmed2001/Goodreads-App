require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Book = require("../models/Book");
const Author = require("../models/Author");
const Category = require("../models/Category");

mongoose.connect("mongodb+srv://nadafcai:Nme55a6WJbMV8rS1@goodreads.rhixw.mongodb.net/?retryWrites=true&w=majority&appName=Goodreads", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
      { name: "Biography" }
    ]);

    const dramacategory = await Category.findOne({ name: "Drama" });
    const fictioncategory = await Category.findOne({ name: "Fiction" });
    const sciencefictioncategory = await Category.findOne({ name: "Science Fiction" });

    if (!dramacategory || !fictioncategory) {
      console.error("❌ Category not found! Check database.");
      return;
    }

    console.log("✅ Categories found:", dramacategory, fictioncategory);

    const williamShakespeare = await Author.findOne({ name: "William Shakespeare" });
    const janeAusten = await Author.findOne({ name: "Jane Austen" });
    const fScottFitzgerald = await Author.findOne({ name: "F. Scott Fitzgerald" });
    const georgeOrwell = await Author.findOne({ name: "George Orwell" });

    if (!williamShakespeare) console.error("❌ William Shakespeare not found!");
    if (!janeAusten) console.error("❌ Jane Austen not found!");
    if (!fScottFitzgerald) console.error("❌ F. Scott Fitzgerald not found!");
    if (!georgeOrwell) console.error("❌ George Orwell not found!");

    if (!williamShakespeare || !janeAusten || !fScottFitzgerald || !georgeOrwell) {
      console.error("❌ One or more authors are missing. Stopping script.");
      return;
    }

    console.log("✅ Authors found:", williamShakespeare, janeAusten, fScottFitzgerald, georgeOrwell);

    await Book.create([
      {
        title: "Romeo and Juliet",
        category: dramacategory._id,
        author: williamShakespeare._id,
        description: "A tragedy about two young star-crossed lovers.",
        coverImage: "https://upload.wikimedia.org/wikipedia/commons/4/49/Romeo_and_juliet_title_page.jpg",
        price: 10,
        rating: 5,
        featured: true,
        trending: true,
      },
      {
        title: "Pride and Prejudice",
        category: fictioncategory._id,
        author: janeAusten._id,
        description: "A romantic novel of manners.",
        coverImage: "https://upload.wikimedia.org/wikipedia/commons/8/89/PrideAndPrejudiceTitlePage.jpg",
        price: 15,
        rating: 4,
        featured: true,
        trending: true,
      },
      {
        title: "The Great Gatsby",
        category: fictioncategory._id,
        author: fScottFitzgerald._id,
        description: "A novel set in the Jazz Age.",
        coverImage: "https://upload.wikimedia.org/wikipedia/commons/4/42/Gatsby_1925_jacket.gif",
        price: 20,
        rating: 4,
        featured: true,
        trending: true,
      },
      {
        title: "1984",
        category: fictioncategory._id,
        author: georgeOrwell._id,
        description: "A dystopian social science fiction novel.",
        coverImage: "https://upload.wikimedia.org/wikipedia/commons/c/c3/1984first.jpg",
        price: 18,
        rating: 5,
        featured: true,
        trending: true,
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
