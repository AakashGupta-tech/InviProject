const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductDetails,
  createProduct,
} = require("../controllers/productController");

// Get all products
router.get("/", getAllProducts);
router.post("/", createProduct);

// Get product details by ID
router.get("/:productId", getProductDetails);

module.exports = router;
