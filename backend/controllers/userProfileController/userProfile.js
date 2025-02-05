// controllers/userProfile.js
const UserModel = require("../../models/User");
function profile(req, res) {
  // Access the user ID from the decoded JWT token
  UserModel.findById(req.user.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json({ message: err.message }));
}

module.exports = { profile };
