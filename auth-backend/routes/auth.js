const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();
const usersFilePath = path.join(__dirname, "../data/users.json");

// Load users from JSON
const loadUsers = () => {
  if (!fs.existsSync(usersFilePath)) return [];
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Save users to JSON
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate and send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const users = loadUsers();
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  // Check if user exists
  let user = users.find((u) => u.email === email);
  if (user) {
    user.otp = otp;
  } else {
    user = { email, otp };
    users.push(user);
  }
  saveUsers(users);

  // Send OTP via email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
});

// Verify OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

  const users = loadUsers();
  const user = users.find((u) => u.email === email && u.otp == otp);

  if (user) {
    user.otp = null; // Clear OTP after verification
    saveUsers(users);
    res.json({ message: "OTP verified successfully!" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

module.exports = router;
