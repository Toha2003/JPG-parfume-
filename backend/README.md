# JPG Perfume E-commerce Backend API

A modern, RESTful API built with Node.js and Express for the Jean Paul Gaultier perfume e-commerce platform.

## 🚀 Features

- RESTful API architecture
- Product filtering by category (men/women)
- Advanced search functionality
- Price sorting (low to high, high to low)
- Discount filtering
- Pagination support
- Server-side price calculation
- CORS enabled for frontend integration
- Comprehensive error handling
- Request logging middleware

## 📋 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Business logic
│   ├── routes/          # API routes
│   ├── data/            # Product database
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   └── index.js         # Server entry point
├── package.json
├── .env
└── README.md
```

## 🛠️ Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev      # Development mode with auto-reload
npm start        # Production mode
```

The API will be available at `http://localhost:5000`

## 📡 API Endpoints

### Get All Products
```
GET /api/products
Query Parameters:
  - category: 'men' | 'women'
  - search: search term
  - sort: 'asc' | 'desc' (price)
  - discount: 'true' (only discounted)
  - page: page number (default: 1)
  - limit: items per page (default: 12)

Example: GET /api/products?category=men&sort=asc&page=1&limit=12
```

### Get Single Product
```
GET /api/products/:id
Example: GET /api/products/1
```

### Get Products by Category
```
GET /api/products/category/:category
Example: GET /api/products/category/men
Example: GET /api/products/category/women
```

### Get Discounted Products
```
GET /api/products/discounted
```

### Search Products
```
GET /api/products/search?q=query
Example: GET /api/products/search?q=male
```

### Sort Products
```
GET /api/products/sort?price=asc|desc
Query Parameters:
  - price: 'asc' | 'desc' (required)
  - category: 'men' | 'women' (optional)
  - page: page number (optional)
  - limit: items per page (optional)

Example: GET /api/products/sort?price=desc&category=women&page=1
```

### Get Featured Products
```
GET /api/products/featured
Returns 8 best products (highest discount + newest)
```

### Health Check
```
GET /health
```

## 📦 Response Format

All responses follow a consistent JSON format:

**Success Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 50,
    "totalPages": 5
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "status": 400,
    "message": "Error message"
  }
}
```

## 🗂️ Product Schema

```javascript
{
  id: Number,
  name: String,
  category: String ('men' | 'women'),
  price: Number,
  discount: Number (percentage 0-100),
  discountedPrice: Number (calculated server-side),
  image: String (URL),
  description: String,
  createdAt: Date
}
```

## 🔧 Environment Variables

Create a `.env` file in the root:
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 🎯 Key Features

### Product Filtering
- Filter by gender (men/women)
- Filter by discount status
- Search in name and description
- Sort by price (ascending/descending)
- Pagination support

### Server-Side Calculations
- Discounted price calculated automatically
- Applied across all endpoints
- Accurate financial calculations

### Error Handling
- Proper HTTP status codes
- Detailed error messages
- 404 handling for missing routes
- Centralized error middleware

### CORS Configuration
- Enabled for frontend integration
- Configurable origin via environment
- Supports all HTTP methods

## 📝 Example Requests

### Get men's products sorted by price (low to high)
```
GET /api/products?category=men&sort=asc
```

### Search for perfumes with "male" in the name
```
GET /api/products/search?q=male
```

### Get all discounted products
```
GET /api/products/discounted
```

### Get women's products, page 2, 8 items per page
```
GET /api/products?category=women&page=2&limit=8
```

## 🚀 Performance Optimizations

- Efficient array filtering
- Server-side pagination to reduce data transfer
- Minimal database queries
- Clean code structure for easy scaling

## 📚 Technologies Used

- **Express.js** - Web framework
- **CORS** - Cross-origin requests
- **dotenv** - Environment configuration
- **Node.js** - JavaScript runtime

## 📄 License

MIT License - feel free to use this project as a foundation for your e-commerce platform.

---

**Frontend Port:** 5173 (Vite)  
**Backend Port:** 5000 (Express)
