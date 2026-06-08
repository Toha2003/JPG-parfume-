import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { submitOrder } from '../utils/api';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalDiscount } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [locationUser, setLocationUser] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const subtotal = getTotalPrice();
  const discount = getTotalDiscount();
  const total = subtotal+discount;

  const handleCheckout = async (e) => {
    e.preventDefault();
    const outOfStockItems = cart.filter(item => item.stock === 0);
    if (outOfStockItems.length > 0) {
      setError('Ba\'zi mahsulotlar tugagan. Iltimos, ularni savatdan olib tashlang.');
      setSubmitting(false);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await submitOrder({
        customerName,
        customerPhone,
        locationUser,
        items: cart
      });
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to submit order');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="cart-empty">
        <motion.div
          className="empty-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="empty-icon">Success</div>
          <h2>Buyurtma muvaffaqiyatli joylashtirildi!</h2>
          <p>Xaridingiz uchun tashakkur. Tez orada siz bilan bog'lanamiz.</p>
          <Link to="/" className="btn btn-primary">
            Xarid qilishni davom ettirish
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <motion.div
          className="empty-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="empty-icon">Cart</div>
          <h2>Sizning savatingiz bo'sh</h2>
          <p>Start adding some luxury fragrances to your cart</p>
          <Link to="/" className="btn btn-primary">
            Xarid qilishni davom ettirish
          </Link>
        </motion.div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="cart-page">
        <motion.div
          className="cart-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container">
            <h1>Buyurtmani rasmiylashtirish</h1>
          </div>
        </motion.div>

        <div className="cart-content container">
          <motion.div
            className="checkout-form-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className="checkout-form" onSubmit={handleCheckout}>
              <div className="form-group">
                <label htmlFor="name">Ism familiyangiz</label>
                <input
                  id="name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ism familiyangizni kiriting"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefon nomeringiz</label>
                <input
                  id="phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Telefon raqamingizni kiriting"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Manzilingiz?</label>
                <input
                  id="locationUser"
                  type="text"
                  value={locationUser}
                  onChange={(e) => setLocationUser(e.target.value)}
                  placeholder="Manzilingizni kiriting"
                  required
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <div className="checkout-actions">
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitting ? 'Processing...' : 'buyurtmani tasdiqlash'}
                </motion.button>
                <motion.button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCheckout(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Savat bo'limiga qaytish
                </motion.button>
              </div>
            </form>

            <div className="checkout-summary">
              <h3>Buyurtma xulosasi</h3>
              <div className="summary-row">
                <span>Elementlar</span>
                <span>{cart.length}</span>
              </div>
              <div className="summary-row">
                <span>Jami</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <motion.div
        className="cart-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h1>Xarid savati</h1>
          <p>{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</p>
        </div>
      </motion.div>

      <div className="cart-content container">
        <motion.div
          className="cart-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="cart-items-section">
            <motion.button
              className="btn-clear-cart"
              onClick={clearCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Savatni tozalash
            </motion.button>

            <div className="cart-items-list">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="item-details">
                    <Link to={`/product/${item.id}`} className="item-name">
                      {item.name}
                    </Link>
                    <p className="item-category">{item.category}</p>
                    {item.discount > 0 && (
                      <span className="item-discount">Save -{item.discount}%</span>
                    )}
                    {item.stock > 0 && item.stock <= 5 && (
                      <span className="item-stock-warning">Atigi {item.stock} dona qoldi</span>
                    )}
                    {item.stock === 0 && (
                      <span className="item-stock-out">Mahsulot tugagan</span>
                    )}
                  </div>

                  <div className="item-controls">
                    <div className="quantity-group">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, Number.parseInt(event.target.value, 10), item.stock)}
                        className="qty-input"
                        disabled={item.stock === 0}
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock)}
                        className="qty-btn"
                        disabled={item.stock > 0 && item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>

                    <div className="item-price">
                      <span className="price">
                        ${((item.discountedPrice || item.price) * item.quantity).toFixed(2)}
                      </span>
                      {item.discount > 0 && (
                        <span className="original">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.button
                    className="btn-remove"
                    onClick={() => removeFromCart(item.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Savatdan olib tashlash"
                  >
                    x
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="order-summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Buyurtma xulosasi</h2>

            <div className="summary-section">
              <div className="summary-row">
                <span>Jami</span>
                <span className="amount">${total.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Chegirma</span>
                  <span className="amount">-${discount.toFixed(2)}</span>
                </div>
              )}


              <div className="summary-row shipping">
                <span>Yetkazib berish</span>
                <span className="amount free">FREE</span>
              </div>
            </div>

            <motion.div className="summary-total" whileHover={{ scale: 1.02 }}>
              <span>Narxi</span>
              <span className="total-amount">${subtotal.toFixed(2)}</span>
            </motion.div>

            {cart.some(item => item.stock === 0) && (
              <div className="stock-error-banner">
                Ba\'zi mahsulotlar tugagan. Iltimos, ularni savatdan olib tashlang.
              </div>
            )}

            <motion.button
              className={`btn-checkout ${cart.some(item => item.stock === 0) ? 'btn-disabled' : ''}`}
              onClick={cart.some(item => item.stock === 0) ? undefined : () => setShowCheckout(true)}
              whileHover={cart.some(item => item.stock === 0) ? undefined : { scale: 1.02 }}
              whileTap={cart.some(item => item.stock === 0) ? undefined : { scale: 0.98 }}
              disabled={cart.some(item => item.stock === 0)}
            >
              Buyurtma qilish
            </motion.button>

            <motion.button
              className="btn-continue-shopping"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Xarid qilishni davom ettirish
            </motion.button>

            <div className="benefits">
              <div className="benefit">
                <span className="icon">OK</span>
                <span>Xavfsiz to'lov</span>
              </div>
              <div className="benefit">
                <span className="icon">OK</span>
                <span>Bepul qaytarishlar</span>
              </div>
              <div className="benefit">
                <span className="icon">OK</span>
                <span>Tez yetkazib berish</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
