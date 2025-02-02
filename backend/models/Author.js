const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  image: String,
  bio: String,
  birthDate: Date,
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
