const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/passwordHelper");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// User registration
async function registerUser(req, res) {
  const { email, password } = req.body;

  // Validate input data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("User registration failed:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// User login
async function loginUser(req, res) {
  const { email, password } = req.body;

  // Validate input data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      "ad165b11320bc91501ab08613cc3a48a62a6caca4d5c8b14ca82cc313b3b96cd"
    );

    res.json({ token });
  } catch (err) {
    console.error("User login failed:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get order history for a user
async function getOrderHistory(req, res) {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId).populate("orderHistory");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.orderHistory);
  } catch (err) {
    console.error("Failed to get order history:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { registerUser, loginUser, getOrderHistory };
