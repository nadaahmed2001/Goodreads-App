const express = require("express");
const passport = require("../../config/passport");

const router = express.Router();

// Route to start Google authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route for Google authentication
router.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
      if (!req.user) {
        return res.status(401).json({ message: "Google authentication failed" });
      }
  
      // Redirect to frontend with token as a query parameter
      res.redirect(`http://localhost:5173/redirect?token=${req.user.token}`);
    }
  );
  
module.exports = router;
