import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Fetch all products with optional filters
 */
export const fetchProducts = (params = {}) => {
  return api.get('/products', { params });
};

/**
 * Fetch single product by ID
 */
export const fetchProductById = (id) => {
  return api.get(`/products/${id}`);
};

/**
 * Fetch products by category
 */
export const fetchProductsByCategory = (category) => {
  return api.get(`/products/category/${category}`);
};

/**
 * Fetch discounted products
 */
export const fetchDiscountedProducts = () => {
  return api.get('/products/discounted');
};

/**
 * Search products
 */
export const searchProducts = (query) => {
  return api.get('/products/search', { params: { q: query } });
};

/**
 * Sort products by price
 */
export const sortProducts = (params = {}) => {
  return api.get('/products/sort', { params });
};

/**
 * Fetch featured products
 */
export const fetchFeaturedProducts = () => {
  return api.get('/products/featured');
};

export const submitOrder = (orderData) => {
  return api.post('/orders', orderData);
};

export const fetchOrders = () => {
  return api.get('/orders');
};

export const updateOrderStatus = (id) => {
  return api.patch(`/orders/${id}/status`);
};

export default api;
