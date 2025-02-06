// controllers/authController.js
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); // Import nodemailer for email functionality
const UserModel = require("../../models/User");

const login = (req, res) => {
  const { email, password, role } = req.body;

  // Find the user by email
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        // Check if the password matches
        if (user.password === password) {
          // Check if the user's role matches the requested role
          if (user.role === role) {
            // Issue JWT Token
            const token = jwt.sign(
              { id: user._id, email: user.email, role: user.role }, // Include role in the token payload
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            res.json({ message: "success", token });
          } else {
            res.status(403).json({ message: `You Are Not : ${role}`  });
          }
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
// Send welcome email
const sendWelcomeEmail = (userEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use another SMTP service, Gmail is just an example
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Use environment variable for email address
    to: userEmail,
    subject: "Welcome to Shelf-Sphere!",
    text: `Hello,

Your account has been successfully created at Shelf-Sphere!

You can now log in to your account by clicking the link below:
http://localhost:5173/sign-in

Best regards,
Shelf-Sphere Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Register user
const register = (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        // If user exists, return an error message
        return res.json("Email Already Exist");
      }
      // If user doesn't exist, create a new user
      UserModel.create(req.body) // Create user in the database
        .then((user) => {
          // Send the welcome email after user is created
          sendWelcomeEmail(user.email);
          res.json(user); // Respond with the created user object
        })
        .catch((err) => res.status(500).json({ error: err.message })); // Handle any errors
    })
    .catch((err) => res.status(500).json({ error: err.message })); // Handle errors in finding the user
};

module.exports = {
  login,
  register,
};
