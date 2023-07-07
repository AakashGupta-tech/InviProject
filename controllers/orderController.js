const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

// Create a new order
async function createOrder(req, res) {
  const { productId, quantity } = req.body;
  const { userId } = req.user;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate the total price
    const totalPrice = product.price * quantity;

    // Create a new order
    const order = new Order({ userId, productId, quantity, totalPrice });
    await order.save();

    // Update user's order history
    await User.findByIdAndUpdate(userId, {
      $push: { orderHistory: order._id },
    });

    res.json({ message: "Order created successfully", order });
  } catch (err) {
    console.error("Failed to create order:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createOrder };
