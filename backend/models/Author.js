// author: { 
//     id: { type: Number, unique: true },
//     name: String,
//     image: String,
//     aboutAuthor: String,
//     birthDate: Date
//   },

const mongoose = require("mongoose");
// const mongooseSequence = require("mongoose-sequence")(mongoose);

const authorSchema = new mongoose.Schema({
    name: String,
    image: String,
    aboutAuthor: String,
    birthDate: Date
});

// authorSchema.plugin(mongooseSequence, { inc_field: 'author.id' });

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
