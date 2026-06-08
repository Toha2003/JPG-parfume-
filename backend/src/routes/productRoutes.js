import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getDiscountedProducts,
  searchProducts,
  sortProducts,
  getFeaturedProducts
} from "../controllers/productController.js";

const router = express.Router();

/**
 * Product Routes
 * Base URL: /api/products
 */

// Get featured products (8 best products)
router.get("/featured", getFeaturedProducts);

// Get all discounted products
router.get("/discounted", getDiscountedProducts);

// Search products by query
router.get("/search", searchProducts);

// Sort products by price
router.get("/sort", sortProducts);

// Get products by category
router.get("/category/:category", getProductsByCategory);

// Get all products with filters
router.get("/", getAllProducts);

// Get single product by ID
router.get("/:id", getProductById);

export default router;
