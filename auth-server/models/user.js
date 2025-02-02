const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
})

const UserModel = mongoose.model("user",User)
module.exports = UserModel