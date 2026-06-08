// Utility functions for product calculations

/**
 * Calculate discounted price
 * @param {number} price - Original price
 * @param {number} discount - Discount percentage
 * @returns {number} Discounted price
 */
export const calculateDiscountedPrice = (price, discount) => {
  if (!discount || discount === 0) return price;
  return parseFloat((price - (price * discount) / 100).toFixed(2));
};

/**
 * Format product with calculated discounted price
 * @param {object} product - Product object
 * @returns {object} Product with discountedPrice added
 */
const IMAGE_BASE_URL = process.env.API_URL || "http://localhost:5000";

const resolveImage = (image) => {
  if (!image || image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${IMAGE_BASE_URL}${image}`;
};

export const formatProduct = (product) => {
  return {
    ...product,
    image: resolveImage(product.image),
    discountedPrice: calculateDiscountedPrice(product.price, product.discount)
  };
};

/**
 * Format array of products
 * @param {array} products - Array of products
 * @returns {array} Formatted products array
 */
export const formatProducts = (products) => {
  return products.map(formatProduct);
};
