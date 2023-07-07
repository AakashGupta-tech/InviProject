const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");
const authenticateToken = require("../middlewares/authenticateToken");

// Create a new order
router.post("/", authenticateToken, createOrder);

module.exports = router;
