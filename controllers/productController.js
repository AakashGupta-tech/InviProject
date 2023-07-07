const Product = require("../models/product");

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    console.log("everything is fine");
    res.json(products);
  } catch (err) {
    console.error("Failed to get products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get product details by ID
async function getProductDetails(req, res) {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Failed to get product details:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create a new product
async function createProduct(req, res) {
  const { name, price, description } = req.body;

  try {
    // Create a new product instance
    const product = new Product({ name, price, description });

    // Save the product to the database
    await product.save();

    res.json({ message: "Product created successfully", product });
  } catch (err) {
    console.error("Failed to create product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getAllProducts, getProductDetails, createProduct };
