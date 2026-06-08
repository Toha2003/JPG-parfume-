# 🎯 JPG PERFUME - INSTALLATION & SETUP GUIDE

## ✅ Complete Installation Instructions

### ⚙️ SYSTEM REQUIREMENTS

- **Node.js**: v14.0 or higher
- **npm**: v6.0 or higher (or yarn)
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **RAM**: Minimum 2GB
- **Disk Space**: At least 500MB

---

## 📥 INSTALLATION STEPS

### STEP 1: Download the Project

```bash
# Navigate to your desired directory
cd path/to/your/projects

# Clone or download the project
# The project folder is: "onlayn do'kon"
```

### STEP 2: Install Backend Dependencies

```bash
# Navigate to backend folder
cd "onlayn do'kon"
cd backend

# Install all dependencies
npm install

# This installs:
# - express (web framework)
# - cors (cross-origin support)
# - dotenv (environment variables)
```

**Installation time**: ~1-2 minutes

### STEP 3: Configure Backend Environment

```bash
# The .env file is already created with default values:
# PORT=5000
# NODE_ENV=development
# CORS_ORIGIN=http://localhost:5173

# No changes needed for local development!
```

### STEP 4: Install Frontend Dependencies

```bash
# Navigate to frontend folder (from project root)
cd ../frontend

# Install all dependencies
npm install

# This installs:
# - react (UI library)
# - react-router-dom (routing)
# - framer-motion (animations)
# - axios (HTTP client)
# - vite (build tool)
# - @vitejs/plugin-react (vite plugin)
```

**Installation time**: ~2-3 minutes

---

## 🚀 RUNNING THE APPLICATION

### Terminal Setup (Two terminals needed)

**Terminal 1: Backend Server**

```bash
# Navigate to backend
cd "onlayn do'kon"/backend

# Start the development server
npm run dev

# Expected output:
# ╔════════════════════════════════════════════════════════════╗
# ║  JPG Perfume E-commerce Backend API                        ║
# ║  Server running on http://localhost:5000                   ║
# ║  Environment: development                                   ║
# ║  CORS enabled for: http://localhost:5173                   ║
# ╚════════════════════════════════════════════════════════════╝
```

**Terminal 2: Frontend Application**

```bash
# Navigate to frontend
cd "onlayn do'kon"/frontend

# Start the development server
npm run dev

# Expected output:
# VITE v5.0.8  ready in XXX ms
# 
# ➜  Local:   http://localhost:5173/
# ➜  Press q to quit
```

### Access the Application

1. **Open your browser**
2. **Navigate to**: http://localhost:5173
3. **Start exploring the JPG Perfume store!**

---

## ✨ VERIFY INSTALLATION

### Check Backend Connection

```bash
# In your browser, visit:
http://localhost:5000/health

# Should return:
{
  "success": true,
  "message": "JPG Perfume Backend API is running",
  "timestamp": "2026-03-01T..."
}
```

### Check Frontend Loading

```bash
# The frontend should load at:
http://localhost:5173

# You should see:
- Navigation bar with JPG logo
- Hero section with beautiful animation
- Featured products
- Smooth scrolling
```

### Test API Connection

1. Open Developer Tools (F12)
2. Go to Console tab
3. The page should load without errors
4. Cart icon should be visible in navbar

---

## 🎯 FIRST TIME USER GUIDE

### Explore the Store

1. **Home Page** - View featured and discounted products
2. **For Men** - Browse men's fragrances
3. **For Women** - Browse women's fragrances
4. **Product Details** - Click any product to see full details
5. **Add to Cart** - Click "Add to Cart" button
6. **View Cart** - Click cart icon in navbar
7. **Browse Other Pages** - About, Contact

### Try Filtering

1. Go to **For Men** or **For Women**
2. Use the **Sort** dropdown (Low to High, High to Low)
3. Toggle **On Sale** checkbox for discounted items
4. See results update in real-time

### Add to Cart

1. Click on any product
2. Adjust quantity (default is 1)
3. Click "Add to Cart"
4. Cart count updates automatically
5. Add more products
6. Click cart icon to view cart

### View Order Summary

1. Open your cart
2. See total price calculation
3. See discount savings
4. See tax (10%)
5. See shipping (FREE)
6. See final total

---

## 🛠️ TROUBLESHOOTING

### Issue: "Port 5000 is already in use"

**Solution**:
```bash
# Use a different port
# Edit backend/.env
PORT=5001

# Restart backend
npm run dev
```

### Issue: "Port 5173 is already in use"

**Solution**:
```bash
# Vite will automatically use the next available port
# It will show you the new URL in terminal
```

### Issue: "Cannot GET /api/products"

**Solution**:
1. Ensure backend is running (Terminal 1)
2. Check terminal for error messages
3. Verify CORS_ORIGIN in backend/.env
4. Reload the page

### Issue: "Images not loading"

**Solution**:
1. Check browser console for errors
2. Images use placeholder URLs from unsplash.com
3. Ensure internet connection is active

### Issue: "Cart data not persisting"

**Solution**:
1. Check browser localStorage is enabled
2. Check Developer Tools > Application > Local Storage
3. Clear cache and try again
4. Check browser console for errors

### Issue: "Styling looks broken"

**Solution**:
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Check browser developer tools console
4. Restart frontend server

---

## 📁 FOLDER NAVIGATION

### Windows Users
```
Click Start Menu
Type: "cmd"
Copy paste:
cd C:\Users\YourUsername\Desktop\onlayn do'kon\backend
npm install
```

### macOS/Linux Users
```bash
cd ~/Desktop/"onlayn do'kon"/backend
npm install
```

---

## 📊 FILE STRUCTURE REMINDER

```
onlayn do'kon/
├── backend/
│   ├── package.json
│   ├── .env              ← Configuration
│   └── src/
│       ├── index.js      ← Server starts here
│       └── ... other files
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx      ← App starts here
│       └── ... other files
└── README.md             ← Main documentation
```

---

## 🌐 WHAT WORKS OUT OF THE BOX

✅ **Immediate Features**:
- Browse 12 luxury perfumes
- Search and filter products
- Add items to cart
- View cart with totals
- Responsive design
- Smooth animations
- Professional design
- Complete product details
- About and Contact pages

✅ **Ready for**:
- Customization
- Adding more products
- Integrating payment gateway
- Adding user authentication
- Connecting to real database
- Deploying to production

---

## 💡 NEXT STEPS

### After Installation

1. **Explore the Code** - Understand the structure
2. **Customize Colors** - Edit CSS variables
3. **Add More Products** - Edit products.js
4. **Modify Content** - Update text and images
5. **Test All Features** - Try every page
6. **Read Documentation** - Check README files

### For Development

1. **Backend**: `backend/src/` folder
2. **Frontend**: `frontend/src/` folder
3. **Styles**: `frontend/src/styles/global.css`
4. **Data**: `backend/src/data/products.js`

### For Deployment

1. Build frontend: `npm run build`
2. Deploy to Vercel/Netlify
3. Deploy backend to Heroku/Railway
4. Update API URL in frontend
5. Configure environment variables

---

## 🔑 COMMON COMMANDS

### Backend Commands
```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

### Frontend Commands
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📞 QUICK REFERENCE

| Component | Port | URL |
|-----------|------|-----|
| Backend | 5000 | http://localhost:5000 |
| Frontend | 5173 | http://localhost:5173 |
| API Health | 5000 | http://localhost:5000/health |
| Products API | 5000 | http://localhost:5000/api/products |

---

## ✅ INSTALLATION CHECKLIST

- [ ] Node.js installed
- [ ] Project folder copied/downloaded
- [ ] Backend npm install completed
- [ ] Frontend npm install completed
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Browser shows home page
- [ ] Cart works
- [ ] Search works
- [ ] API responding

---

## 🎓 LEARNING TIPS

1. **Explore the code** - Read comments
2. **Check the console** - See API responses
3. **Use DevTools** - Inspect elements
4. **Read the README** - Full documentation
5. **Try customizing** - Change colors, text

---

## 🚀 YOU'RE ALL SET!

**Congratulations! 🎉**

Your JPG Perfume E-commerce Platform is now running!

### Quick Links
- 📖 Main README: Read `README.md`
- ⚡ Quick Start: Read `QUICKSTART.md`
- 📋 API Docs: Check `backend/README.md`
- 🎨 Design Guide: Check global.css

### Need Help?
1. Check the documentation files
2. Review browser console for errors
3. Read the TROUBLESHOOTING section above
4. Check individual README files

---

**Happy Coding! Build something amazing! 🚀**

---

*Installation Guide v1.0 | March 2026*
