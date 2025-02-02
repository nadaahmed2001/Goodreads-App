require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());

// Session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// File to store user data
const USERS_FILE = "./data/users.json";

// Load users from file
function loadUsers() {
    try {
        const data = fs.readFileSync(USERS_FILE, "utf8");
        console.log("📂 Loaded users:", data);  // Debugging line
        return JSON.parse(data);
    } catch (err) {
        console.log("❌ No users.json found, creating a new one.");
        return [];
    }
}
// Save users to file

function saveUsers(users) {
    console.log("💾 Saving users:", users);  // Debugging line
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}
// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
    let users = loadUsers();
    let user = users.find(u => u.email === profile.emails[0].value);

    if (!user) {
        user = {
            email: profile.emails[0].value,
            name: profile.displayName,
            provider: "google",
        };
        users.push(user);
        saveUsers(users);
    }

    return done(null, user);
}));

// Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
    prompt: "select_account"
}));

app.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "/login",
}), (req, res) => {
    res.redirect("http://localhost:5173/logged-in");
});

// Serialize & Deserialize User
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
