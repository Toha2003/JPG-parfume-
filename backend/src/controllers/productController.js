import { products } from "../data/products.js";
import { formatProducts, formatProduct } from "../utils/productUtils.js";

/**
 * Get all products with filtering, searching, and sorting
 * Query parameters:
 * - category: filter by 'men' or 'women'
 * - search: search in name and description
 * - sort: 'asc' or 'desc' for price sorting
 * - discount: 'true' to show only discounted products
 * - page: pagination page number
 * - limit: items per page
 */
export const getAllProducts = (req, res) => {
  try {
    const {
      category,
      search,
      sort,
      discount,
      page = 1,
      limit = 12,
    } = req.query;

    let filteredProducts = [...products];

    // Filter by category
    if (category && (category === "men" || category === "women")) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category,
      );
    }

    // Search functionality
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm),
      );
    }

    // Filter by discount
    if (discount === "true") {
      filteredProducts = filteredProducts.filter((p) => p.discount > 0);
    }

    // Sort by price
    if (sort === "asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Format products with discounted prices
    const formattedProducts = formatProducts(paginatedProducts);

    res.status(200).json({
      success: true,
      data: formattedProducts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "Error fetching products",
      },
    });
  }
};

/**
 * Get single product by ID
 */

export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          status: 404,
          message: "Product not found",
        },
      });
    }

    res.status(200).json({
      success: true,
      data: formatProduct(product),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "Error fetching product",
      },
    });
  }
};

/**
 * Get products by category (men or women)
 */
export const getProductsByCategory = (req, res) => {
  try {
    const { category } = req.params;

    if (category !== "men" && category !== "women") {
      return res.status(400).json({
        success: false,
        error: {
          status: 400,
          message: "Invalid category. Use 'men' or 'women'",
        },
      });
    }

    const categoryProducts = products.filter((p) => p.category === category);

    res.status(200).json({
      success: true,
      data: formatProducts(categoryProducts),
      count: categoryProducts.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "Error fetching category products",
      },
    });
  }
};

/**
 * Get all discounted products
 */
export const getDiscountedProducts = (req, res) => {
  try {
    const discountedProducts = products.filter((p) => p.discount > 0);

    res.status(200).json({
      success: true,
      data: formatProducts(discountedProducts),
      count: discountedProducts.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "Error fetching discounted products",
      },
    });
  }
};

/**
 * Search products by query
 */
export const searchProducts = (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        error: {
          status: 400,
          message: "Search query is required",
        },
      });
    }

    const searchTerm = q.toLowerCase();
    const searchResults = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm),
    );

    res.status(200).json({
      success: true,
      data: formatProducts(searchResults),
      count: searchResults.length,
      query: q,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "Error searching products",
      },
    });
  }
};

/**
 * Sort products by price
 */
export const sortProducts = (req, res) => {
  try {
    const { price, category, page = 1, limit = 12 } = req.query;

    if (!price || (price !== "asc" && price !== "desc")) {
      return res.status(400).json({
        success: false,
        error: {
          status: 400,
          message: "Price parameter must be 'asc' or 'desc'",
        },
      });
    }

    let sortedProducts = [...products];

    // Filter by category if provided
    if (category && (category === "men" || category === "women")) {
      sortedProducts = sortedProducts.filter((p) => p.category === category);
    }

    // Sort by price
    if (price === "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: formatProducts(paginatedProducts),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: sortedProducts.length,
        totalPages: Math.ceil(sortedProducts.length / limitNum),
      },
      sortedBy: price === "asc" ? "price_low_to_high" : "price_high_to_low",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "Error sorting products",
      },
    });
  }
};

/**
 * Get featured products (best sellers, new arrivals, etc.)
 */
export const getFeaturedProducts = (req, res) => {
  try {
    // Return products with highest discount + newest arrivals
    const featured = products
      .sort((a, b) => {
        if (b.discount !== a.discount) {
          return b.discount - a.discount;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .slice(0, 8);

    res.status(200).json({
      success: true,
      data: formatProducts(featured),
      count: featured.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "Error fetching featured products",
      },
    });
  }
};
