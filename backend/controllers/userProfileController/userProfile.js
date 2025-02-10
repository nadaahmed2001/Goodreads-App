// controllers/userProfile.js
const UserModel = require("../../models/User");

async function profile(req, res) {
  try {
    const user = await UserModel.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateProfile(req, res) {
  try {
    if (req.body.email) {
      const existingUser = await UserModel.findOne({ email: req.body.email });

      // If email exists and does not belong to the current user, return error
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { $set: req.body }, // This now includes profileImage
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { profile, updateProfile };
