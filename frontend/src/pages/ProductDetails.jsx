import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProductById } from '../utils/api';
import { CartContext } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchProductById(id);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let count = 0; count < quantity; count += 1) {
      addToCart(product);
    }
  };

  const handleQuantityChange = (value) => {
    const nextQuantity = Number.parseInt(value, 10);
    if (nextQuantity > 0 && (!product?.stock || nextQuantity <= product.stock)) {
      setQuantity(nextQuantity);
    }
  };

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Mahsulot topilmadi</h2>
        <button onClick={() => navigate('/')}>Bosh sahifaga qaytish</button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <motion.button className="btn-back" onClick={() => navigate(-1)} whileHover={{ x: -5 }}>
        Orqaga
      </motion.button>

      <div className="container">
        <motion.div
          className="details-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="details-image"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="image-container">
              <img src={product.image} alt={product.name} />
              {product.discount > 0 && (
                <div className="discount-badge">-{product.discount}%</div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="details-info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="product-header">
              <p className="product-category">{product.category}</p>
              <h1 className="product-title">{product.name}</h1>
            </div>

            <div className="product-rating-section">
              <div className="stars">★★★★★</div>
              <span className="reviews">(48 reviews)</span>
            </div>

            <motion.div
              className="price-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {product.discount > 0 ? (
                <>
                  <div className="original-price">${product.price.toFixed(2)}</div>
                  <div className="discounted-price">
                    ${product.discountedPrice?.toFixed(2) || product.price.toFixed(2)}
                  </div>
                  <div className="savings">
                    Saqlab qolishingiz mumkin: ${(product.price - product.discountedPrice).toFixed(2)}
                  </div>
                </>
              ) : (
                <div className="price">${product.price.toFixed(2)}</div>
              )}
              <div className={`stock-info ${product.stock === 0 ? 'out-of-stock' : product.stock <= 5 ? 'low-stock' : ''}`}>
                {product.stock === 0 ? (
                  'Mahsulot tugagan'
                ) : (
                  <>Omborda: <strong>{product.stock} dona</strong></>
                )}
              </div>
            </motion.div>

            <motion.div
              className="description-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3>Tavsif</h3>
              <p>{product.description}</p>
            </motion.div>

            <motion.div
              className="features-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3>Asosiy xususiyatlar</h3>
              <ul className="features-list">
                <li>Haqiqiy Jean Paul Gaultier atirlari</li>
                <li>Premium sifatli ingredientlar</li>
                <li>Uzun davom etuvchi xususiyat</li>
                <li>Eleganta paketlash</li>
                <li>Mukammal sotib olish uchun</li>
              </ul>
            </motion.div>

            <motion.div
              className="actions-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="quantity-control">
                <label htmlFor="quantity">Miqdor:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock || 1}
                  value={quantity}
                  onChange={(event) => handleQuantityChange(event.target.value)}
                  disabled={product.stock === 0}
                />
                {product.stock > 0 && (
                  <span className="stock-hint">Maks: {product.stock}</span>
                )}
              </div>

              <motion.button
                className={`btn-add-to-cart ${product.stock === 0 ? 'btn-disabled' : ''}`}
                onClick={product.stock > 0 ? handleAddToCart : undefined}
                whileHover={product.stock > 0 ? { scale: 1.02 } : undefined}
                whileTap={product.stock > 0 ? { scale: 0.98 } : undefined}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Tugagan' : 'Savatga qo\'shish'}
              </motion.button>

              <motion.button
                className="btn-wishlist"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Xohlanuvchilarga qo'shish
              </motion.button>
            </motion.div>

            <motion.div
              className="shipping-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="shipping-item">
                <span className="icon">Quti</span>
                <span>Buyurtmalar bo'yicha bepul yetkazib berish $100</span>
              </div>
              <div className="shipping-item">
                <span className="icon">Qaytish</span>
                <span>30-kun ichida pul qaytish kafolati</span>
              </div>
              <div className="shipping-item">
                <span className="icon">Xavfsiz</span>
                <span>Xavfsiz va shifrlangan to'lovlar</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.section
        className="related-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container">
          <h2>Sizga yoqishi mumkin</h2>
          <div className="related-placeholder">
            <p>
              Ko'proq variantlar uchun <Link to="/mens">men&apos;s</Link> va <Link to="/womens">women&apos;s</Link> to'plamlarini ko'ring.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ProductDetails;