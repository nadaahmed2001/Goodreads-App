const mongoose = require("mongoose");

//the schema must be exactly as the req from front end first_name must be passed as first_name from react
const User = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  role: String,
  subscription: { type: String, default: "InActive" },
  created_at: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("user", User);
module.exports = UserModel;
