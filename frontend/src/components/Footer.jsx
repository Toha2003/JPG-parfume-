import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';
import InstagramIcon from './images/instagram-logo-facebook-2-svgrepo-com.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <motion.div
        className="footer-content container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="footer-grid">
          <div className="footer-section footer-brand">
            <span className="footer-kicker">Signature House</span>
            <h3 className="footer-title">JPG Perfumes</h3>
            <p className="footer-description">
              Tanlangan kolleksiyalar, nafis taqdimot va yanada ravon mobil tajriba bilan premium atirlar xarid qilish.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                <img src={InstagramIcon} alt="Instagram" className="social-icon" />
              </a>
              <a href="#" aria-label="Pinterest">PI</a>
              <a href="#" aria-label="TikTok">TT</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Collections</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/mens">Men&apos;s Fragrances</Link></li>
              <li><Link to="/womens">Women&apos;s Fragrances</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/about">Craftsmanship</Link></li>
              <li><Link to="/contact">Support</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Stay Updated</h4>
            <p className="footer-newsletter-text">
              Receive offers, new arrivals, and styling inspiration straight to your inbox.
            </p>
            <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                required
              />
              <button type="submit">Join</button>
            </form>
            <div className="footer-note">
              Fast support, secure checkout, premium presentation.
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {currentYear} JPG Perfumes. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <Link to="/contact">Privacy</Link>
            <span className="separator">•</span>
            <Link to="/contact">Terms</Link>
            <span className="separator">•</span>
            <Link to="/contact">Cookies</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
