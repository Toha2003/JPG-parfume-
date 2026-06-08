import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (event) => {
    event.preventDefault();
    addToCart(product);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      className="product-card"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />

          {product.stock === 0 && (
            <motion.div
              className="stock-badge out-of-stock"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Tugagan
            </motion.div>
          )}

          {product.stock > 0 && product.stock <= 5 && (
            <motion.div
              className="stock-badge low-stock"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {product.stock} dona qoldi
            </motion.div>
          )}

          {product.discount > 0 && (
            <motion.div
              className="discount-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              -{product.discount}%
            </motion.div>
          )}

          <div className="product-overlay">
            <button className="btn-view-details">Tafsilotlarni ko'rish</button>
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>

          <div className="product-price">
            {product.discount > 0 ? (
              <>
                <span className="original-price">${product.price.toFixed(2)}</span>
                <span className="discounted-price">
                  ${product.discountedPrice?.toFixed(2) || product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="price">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="reviews">(48)</span>
          </div>
        </div>
      </Link>

      <motion.button
        className={`btn-add-cart ${product.stock === 0 ? 'btn-disabled' : ''}`}
        onClick={product.stock > 0 ? handleAddToCart : undefined}
        whileHover={product.stock > 0 ? { scale: 1.02 } : undefined}
        whileTap={product.stock > 0 ? { scale: 0.98 } : undefined}
        disabled={product.stock === 0}
      >
        <svg className="cart-icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 2L6 6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6H18L15 2M9 2H15M9 2L10 6H14L15 2" />
        </svg>
        {product.stock === 0 ? 'Tugagan' : 'Savatga qo\'shish'}
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;
