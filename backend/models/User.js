// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   first_name: String,
//   last_name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ["user", "admin"], default: "user" },
//   created_at: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

//the schema must be exactly as the req from front end first_name must be passed as first_name from react
const User = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  address:String,
  country:String,
  profileImage: String,
  role: String,
  mobile:String,
  subscription: { type: String, default: "InActive" },
  // Add reset token fields
  resetPasswordToken: String, // Store hashed token
  resetPasswordExpires: Date, // Store expiration time
  created_at: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("user", User);
module.exports = UserModel;
