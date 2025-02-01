const mongoose = require("mongoose");
const mongooseSequence = require("mongoose-sequence")(mongoose);

const bookSchema = new mongoose.Schema({
  title: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  author: { 
    id: { type: Number, unique: true },
    name: String,
    image: String,
    aboutAuthor: String,
    birthDate: Date
  },
  description: String,
  coverImage: String,
  price: Number,
  rating: Number,
  featured: Boolean,
  trending: Boolean,
});

bookSchema.plugin(mongooseSequence, { inc_field: 'author.id' });

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
