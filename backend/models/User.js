const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: String,
    created_at: { type: Date, default: Date.now },
    
    // Add reset token fields
    resetPasswordToken: String,  // Store hashed token
    resetPasswordExpires: Date   // Store expiration time
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
