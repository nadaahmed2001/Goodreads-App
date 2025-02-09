// controllers/authController.js
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); // Import nodemailer for email functionality
const UserModel = require("../../models/User");
const crypto = require("crypto"); // To generate OTP
const OTPModel = require("../../models/OTP"); // Create a new model for OTPs
const bcrypt = require("bcrypt");

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

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Function to send OTP email
const sendOTPEmail = (userEmail, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Your OTP Code for Registration",
    text: `Your OTP code for Shelf-Sphere registration is: ${otp}. This OTP is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending OTP email:", error);
    } else {
      console.log("OTP email sent: " + info.response);
    }
  });
};

// Step 1: Register and send OTP
const register = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
    console.log("Generated OTP for", email, ":", otp);

    // Save OTP in the database
    await OTPModel.create({ email, otp, expiresAt: otpExpiry });

    // Send OTP to user's email
    sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find OTP record
    const otpRecord = await OTPModel.findOne({ email, otp });

    if (!otpRecord ) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({ message: "OTP expired" });
    }
    // console.log("Received email:", req.body.email);
    // console.log("Received OTP:", req.body.otp);
    // console.log("Stored OTP:", otpRecord.otp);

    // Create the user
    const newUser = await UserModel.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email,
      password: req.body.password, // In production, hash this password
      role: "user", 
      created_at: new Date(),
    });

    // Delete OTP record after successful verification
    await OTPModel.deleteOne({ email });

    // Generate JWT token for the user
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "OTP Verified", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cleanExpiredOTPs = async () => {
  await OTPModel.deleteMany({ expiresAt: { $lt: new Date() } }); //lt less than
};

// Run cleanup every 10 minutes
setInterval(cleanExpiredOTPs, 10 * 60 * 1000);
///////////////////////////////////////////////////////////////// ForgotPassword ////////////////////////


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a plain text reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // Token expires in 15 mins

    // Store plain text token in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();

    // Send email with the reset link
    const resetLink = `https://goodreads-app.vercel.app/reset-password?token=${resetToken}&email=${email}`;
    sendResetEmail(email, resetLink);

    res.status(200).json({ message: "Password reset email sent", token: resetToken }); // Include token for testing
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const sendResetEmail = (userEmail, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Password Reset Request",
    text: `Click the link to reset your password: ${resetLink} \nThis link is valid for 15 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending reset email:", error);
    } else {
      console.log("Reset email sent: " + info.response);
    }
  });
};
//////////////////////////////// Reset Password //////////////////////////////////////////////////////////////////
const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user || !user.resetPasswordToken || !user.resetPasswordExpires) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Check if the token is expired
    if (new Date() > user.resetPasswordExpires) {
      return res.status(400).json({ message: "Token expired" });
    }


    if (token !== user.resetPasswordToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    user.password = newPassword;

    // Clear the reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  login,
  register,
  verifyOTP,
  forgotPassword,
  resetPassword,
};
