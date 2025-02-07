const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  image: String,
  bio: String,
  birthDate: String,
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
