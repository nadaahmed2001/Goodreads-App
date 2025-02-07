const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  image: String,
  bio: String,
  birthDate: String,
  // fake:fake,
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
