require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
// const Book = require("../models/Book");
const Author = require("../models/Author");
const Category = require("../models/Category");

mongoose.connect("mongodb+srv://nadafcai:Nme55a6WJbMV8rS1@goodreads.rhixw.mongodb.net/?retryWrites=true&w=majority&appName=Goodreads", {
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
    
    // await Book.create([
    //   {
    //     title: "Hamlet",
    //     author:"William Shakespeare", 
    //     coverImage: "https://images-na.ssl-images-amazon.com/images/I/51L8YwJ0yPL._SX331_BO1,204,203,200_.jpg",
    //     category: dramacategory._id,
    //     price: 10.99,
    //     rating: 4.5,
    //     featured: true,
    //     trending: true,
    //     description: "The Tragedy of Hamlet, Prince of Denmark, often shortened to Hamlet, is a tragedy written by William Shakespeare sometime between 1599 and 1601.",
    //   },
    //   {
    //     title: "Pride and Prejudice",
    //     author: "Jane Austen",
    //     coverImage: "https://images-na.ssl-images-amazon.com/images/I/51b-JoVjFRL._SX331_BO1,204,203,200_.jpg",
    //     category: fictioncategory._id,
    //     price: 12.99,
    //     rating: 4.7,
    //     featured: true,
    //     trending: true,
    //     description: "Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813."
    //   },
    //   {
    //     title: "The Great Gatsby",
    //     author:"F. Scott Fitzgerald",
    //     coverImage: "https://images-na.ssl-images-amazon.com/images/I/51b-JoVjFRL._SX331_BO1,204,203,200_.jpg",
    //     category: fictioncategory._id,
    //     price: 9.99,
    //     rating: 4.2,
    //     featured: true,
    //     trending: true,
    //     description: "The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby."
    //   },
    //   {
    //     title: "1984",
    //     author:"George Orwell" ,
    //     coverImage: "https://images-na.ssl-images-amazon.com/images/I/51b-JoVjFRL._SX331_BO1,204,203,200_.jpg",
    //     category: fictioncategory._id,
    //     price: 11.99,
    //     rating: 4.4,
    //     featured: true,
    //     trending: true,
    //     description: "Nineteen Eighty-Four: A Novel, often referred to as 1984, is a dystopian social science fiction novel by English novelist George Orwell."
    //   }
    // ]);
    

    await Author.create([
      {
        
          name: "William Shakespeare",
          image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg",
          aboutAuthor: "William Shakespeare was an English playwright, poet, and actor, widely regarded as the greatest writer in the English language and the world's greatest dramatist.",
          birthDate: "1564-04-23"
       
      },
      {
       
          name: "Jane Austen",
          image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Jane_Austen_cropped_version.jpg",
          aboutAuthor: "Jane Austen was an English novelist known for her six major novels, which comment on the British landed gentry at the end of the 18th century.",
          birthDate: "1775-12-16"
        },
       
      {
        
       
          name: "F. Scott Fitzgerald",
          image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/F._Scott_Fitzgerald_1921.jpg",
          aboutAuthor: "F. Scott Fitzgerald was an American novelist and short story writer, widely regarded as one of the greatest American writers of the 20th century.",
          birthDate: "1896-09-24"
        },
       
      {
        
          name: "George Orwell",
          image: "https://upload.wikimedia.org/wikipedia/commons/6/64/George_Orwell_press_photo.jpg",
          aboutAuthor: "George Orwell was an English novelist, essayist, journalist, and critic, famous for his dystopian novel '1984' and allegorical novella 'Animal Farm'.",
          birthDate: "1903-06-25"
        },
        
    ]);




    console.log("✅ Data inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    mongoose.connection.close();
  }
};

seedData();
