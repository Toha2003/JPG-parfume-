import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchFeaturedProducts, fetchDiscountedProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const [featured, discounted] = await Promise.all([
          fetchFeaturedProducts(),
          fetchDiscountedProducts()
        ]);

        setFeaturedProducts(featured.data.data);
        setDiscountedProducts(discounted.data.data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.16 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <div className="home">
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-glow hero-glow-one"></div>
          <div className="hero-glow hero-glow-two"></div>
          <motion.svg
            className="hero-decoration"
            viewBox="0 0 200 200"
            initial={{ rotate: 0, opacity: 0.08 }}
            animate={{ rotate: 360, opacity: 0.18 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
          </motion.svg>
        </div>

        <div className="container hero-shell">
          <motion.div
            className="hero-content"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="hero-label">
              Luxury Fragrances
            </motion.div>

            <motion.h3 variants={itemVariants} className="hero-title">
              Yorqin hidlar, nafis taqdimot, oson xarid.
            </motion.h3>

            <motion.p variants={itemVariants} className="hero-description">
              Ish stolida nafis, mobil telefonda esa silliq his qilish uchun mo'ljallangan, saralangan kolleksiyalar va ajoyib takliflar bilan jihozlangan premium atirlar do'konini kashf eting.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-buttons">
              <motion.a
                href="#featured"
                className="btn btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Hoziroq xarid qiling
              </motion.a>
              <motion.a
                href="#about"
                className="btn btn-secondary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Ko'proq ma'lumot
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-metrics">
              <div className="hero-metric">
                <strong>30+</strong>
                <span>Mahsus taqdimot</span>
              </div>
              <div className="hero-metric">
                <strong>Tez</strong>
                <span>Mobil qurilmalarda birinchi bo'lib ko'rish</span>
              </div>
              <div className="hero-metric">
                <strong>Premium</strong>
                <span>Luxury visual yondashuv</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.aside
            className="hero-showcase"
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="showcase-card">
              <div className="showcase-badge">Muharrir tanlovi</div>
              <h3>Le Male Elixir</h3>
              <p>Vitrinangiz uchun kehribar rangdagi iliqlik, sayqallangan chuqurlik va boyroq qahramonona taqdimot.</p>
              <div className="showcase-price-row">
                <span className="showcase-price">$109.99</span>
                <span className="showcase-discount">-25%</span>
              </div>
              <Link to="/product/5" className="showcase-link">Ajoyib taklifni ko'ring</Link>
            </div>
            <div className="showcase-mini-card">
              <span>Bu hafta trendda</span>
              <strong>Mahsus takliflar</strong>
            </div>
          </motion.aside>
        </div>
      </motion.section>

      <motion.section
        id="featured"
        className="featured-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-kicker">Featured</span>
            <h2>Featured Collection</h2>
            <p>Handpicked luxury fragrances with a cleaner catalog layout and stronger visual hierarchy.</p>
          </motion.div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <motion.div
              className="products-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      <motion.section
        className="promo-banner"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="container">
          <motion.div
            className="promo-content"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260 }}
          >
            <span className="section-kicker promo-kicker">Limited Offer</span>
            <h2>Exclusive Offer</h2>
            <p>Get up to 30% off on selected fragrances with a more polished banner and stronger contrast.</p>
            <motion.a
              href="#discounted"
              className="btn btn-outline"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View Discounted
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="discounted"
        className="discounted-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-kicker">Offers</span>
            <h2>Special Offers</h2>
            <p>Limited-time discounts surfaced in a roomier grid that holds together better on smaller screens.</p>
          </motion.div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <motion.div
              className="products-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {discountedProducts.slice(0, 6).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      <motion.section
        id="about"
        className="about-preview"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container">
          <div className="about-grid">
            <motion.div
              className="about-content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="section-kicker">Story</span>
              <h2>About JPG Perfumes</h2>
              <p>
                Jean Paul Gaultier perfumes represent the pinnacle of luxury fragrance craftsmanship. With over three decades of excellence, our collections showcase artistry, innovation, and a more editorial storefront presentation.
              </p>
              <p>
                Each fragrance tells a story, blending exquisite notes to create unforgettable olfactory experiences. From bold masculinity to elegant femininity, discover the scent that expresses your individuality.
              </p>
              <Link to="/about" className="btn btn-primary">
                Read More
              </Link>
            </motion.div>

            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="image-placeholder">
                <div className="image-copy">
                  <span>Crafted Identity</span>
                  <strong>Luxury that feels intentional on every screen size.</strong>
                </div>
                <svg viewBox="0 0 300 400" fill="none">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f1d27a', stopOpacity: 0.6 }} />
                      <stop offset="100%" style={{ stopColor: '#131313', stopOpacity: 0.2 }} />
                    </linearGradient>
                  </defs>
                  <rect width="300" height="400" fill="url(#grad1)" />
                  <path d="M 100 50 L 150 20 L 200 50 L 200 150 Q 150 180 100 150 L 100 50 Z" stroke="#d4af37" strokeWidth="2" fill="none" />
                  <circle cx="220" cy="88" r="26" stroke="#d4af37" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
