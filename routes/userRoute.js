const express = require("express");
const router = express.Router();
const {
  registrationValidator,
  loginValidator,
} = require("../validators/userValidator");
const {
  registerUser,
  loginUser,
  getOrderHistory,
} = require("../controllers/userController");
const authenticateToken = require("../middlewares/authenticateToken");

// User registration route
router.post("/register", registrationValidator, registerUser);

// User login route
router.post("/login", loginValidator, loginUser);

// Get order history for a user
router.get("/order-history", authenticateToken, getOrderHistory);

// Protected route for testing authentication
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

module.exports = router;
