const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });

    res.json({ msg: "Registered successfully" });
  } catch (err) {
    console.error("Register error:", err); // Add this line for debugging
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error("Login error:", err); // Add this line for debugging
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
