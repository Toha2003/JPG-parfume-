import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchOrders, updateOrderStatus } from '../utils/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetchOrders();
        setOrders(
          res.data.data.map((o) => ({ ...o, status: o.status || 'topshirilmagan' }))
        );
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Admin2003' && password === 'Toxir203.') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Login yoki parol noto\'g\'ri');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="orders-page">
        <div className="container">
          <motion.div
            className="login-form-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className="login-form" onSubmit={handleLogin}>
              <h2>Admin Login</h2>
              <div className="login-field">
                <label>Login</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Login"
                />
              </div>
              <div className="login-field">
                <label>Parol</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parol"
                />
              </div>
              {loginError && <p className="login-error">{loginError}</p>}
              <button type="submit" className="btn btn-primary login-btn">Kirish</button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <p className="orders-loading">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="container">
          <p className="orders-error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <motion.div
        className="orders-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h1>Orders</h1>
          <p>{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
        </div>
      </motion.div>

      <div className="container">
        {orders.length === 0 ? (
          <motion.div
            className="orders-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here</p>
            <Link to="/" className="btn btn-primary">Browse Products</Link>
          </motion.div>
        ) : (
          <div className="orders-list">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                className="order-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="order-header">
                  <div>
                    <span className="order-id">Order #{order.id}</span>
                    <span className="order-date">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="order-total">${order.total.toFixed(2)}</div>
                </div>

                <div className="order-status-row">
                  <span className={`order-status-badge ${order.status === 'topshirildi' ? 'delivered' : 'pending'}`}>
                    {order.status === 'topshirildi' ? 'Topshirildi' : 'Topshirilmagan'}
                  </span>
                  {order.status !== 'topshirildi' && (
                    <button
                      className="btn-deliver"
                      onClick={async () => {
                        try {
                          await updateOrderStatus(order.id);
                          setOrders((prev) =>
                            prev.map((o) =>
                              o.id === order.id ? { ...o, status: 'topshirildi' } : o
                            )
                          );
                        } catch (err) {
                          console.error('Failed to update status', err);
                        }
                      }}
                    >
                      Topshirildi
                    </button>
                  )}
                </div>

                <div className="order-customer">
                  <span>Name: {order.customerName}</span>
                  <span>Phone: {order.customerPhone}</span>
                  <span>Location: {order.locationUser}</span>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="order-item-info">
                        <span className="order-item-name">{item.name}</span>
                        <span className="order-item-qty">Qty: {item.quantity}</span>
                      </div>
                      <div className="order-item-prices">
                        <span className="order-item-price">
                          ${(item.discountedPrice || item.price).toFixed(2)}
                        </span>
                        {item.discount > 0 && (
                          <span className="order-item-original">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
