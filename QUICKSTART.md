# JPG Perfume E-commerce - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### Step 2: Start the Servers

#### Terminal 1 - Start Backend
```bash
cd backend
npm run dev
```
Server will run on: **http://localhost:5000**

#### Terminal 2 - Start Frontend
```bash
cd frontend
npm run dev
```
Application will run on: **http://localhost:5173**

### Step 3: Open in Browser
Navigate to: **http://localhost:5173**

---

## 📦 What's Included

### Backend Features
✅ 12 luxury perfume products (6 men's, 6 women's)
✅ Complete RESTful API
✅ Search & filtering
✅ Price sorting
✅ Discount calculations
✅ Pagination support

### Frontend Features
✅ Modern, premium design
✅ Fully responsive layout
✅ Shopping cart with localStorage
✅ Product search and filtering
✅ Smooth animations
✅ Complete product pages
✅ Contact form
✅ About page

---

## 🛒 How to Use

### Browsing Products
1. Click "For Men" or "For Women" in the navbar
2. Use filters: Sort, Discount filter
3. Search for specific fragrances

### Adding to Cart
1. Click on a product to view details
2. Select quantity
3. Click "Add to Cart"
4. Cart count updates in navbar

### Viewing Cart
1. Click the cart icon in navbar
2. Adjust quantities or remove items
3. See order summary with taxes
4. Click "Proceed to Checkout" (placeholder)

### Exploring Features
- **Home**: Featured products & special offers
- **For Men/Women**: Browse by category
- **About**: Learn about the brand
- **Contact**: Send inquiries

---

## 🎨 Design Highlights

- **Color Scheme**: Black, White, and Gold (luxury palette)
- **Animations**: Smooth fade-ins, hover effects, transitions
- **Responsive**: Perfect on mobile, tablet, and desktop
- **Modern**: Clean typography and professional layout

---

## 📊 Sample Data

12 premium fragrances included:
- Le Male (men's) - 15% discount
- Classique (women's) - 18% discount
- Noir Extreme (men's) - 20% discount
- La Belle (women's) - 22% discount
- And 8 more premium options...

---

## 🔧 Customization

### Change Colors
Edit `frontend/src/styles/global.css`:
```css
--luxury-gold: #d4af37;
--primary-black: #1a1a1a;
```

### Add Products
Edit `backend/src/data/products.js`:
```javascript
{
  id: 13,
  name: "New Fragrance",
  category: "men",
  price: 99.99,
  discount: 10,
  image: "url",
  description: "...",
  createdAt: new Date()
}
```

### Change API URL
Edit `frontend/src/utils/api.js`:
```javascript
const API_BASE_URL = 'http://your-api-url/api';
```

---

## 📱 Responsive Design

- **Desktop**: Full featured experience
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly interface

---

## 🔐 Security Notes

- CORS enabled for development
- Update CORS_ORIGIN for production
- Input validation on forms
- Secure payment integration (placeholder)

---

## 🐛 Troubleshooting

### Backend not connecting
- Check backend is running on port 5000
- Verify CORS_ORIGIN in .env file
- Check console for errors

### Cart not persisting
- Clear browser localStorage if needed
- Check browser console for errors
- Ensure JavaScript is enabled

### Styling issues
- Clear browser cache
- Restart development server
- Check CSS file imports

---

## 📚 Key Files

### Backend
- `src/index.js` - Server setup
- `src/controllers/productController.js` - Product logic
- `src/routes/productRoutes.js` - API endpoints
- `src/data/products.js` - Product database

### Frontend
- `src/App.jsx` - Main app component
- `src/context/CartContext.jsx` - Cart state management
- `src/pages/` - Page components
- `src/components/` - Reusable components
- `src/styles/global.css` - Global styles

---

## 🎯 Next Steps

1. ✅ Run both servers
2. ✅ Test all pages and features
3. ✅ Customize branding/colors
4. ✅ Add more products
5. ✅ Integrate payment gateway
6. ✅ Deploy to production

---

## 📞 Need Help?

- Check console for errors
- Review backend/frontend README files
- Verify all dependencies installed
- Ensure Node.js version is compatible

---

**Happy coding! Build something amazing! 🚀**
