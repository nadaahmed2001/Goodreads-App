const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating: Number,
    comment: String,
    user: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
    book: {type: mongoose.Schema.Types.ObjectId,ref: "Product"},
    createdat: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
