const mongoose = require("mongoose");

const userBookListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  shelf: { type: String, enum: ["read", "currently_reading", "want_to_read"] },
});

const UserBookList = mongoose.model("UserBookList", userBookListSchema);
module.exports = UserBookList;
