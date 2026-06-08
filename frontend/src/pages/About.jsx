import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const values = [
    { icon: 'Ex', title: 'Excellence', description: 'Crafted with the finest ingredients and meticulous attention to detail' },
    { icon: 'Ar', title: 'Artistry', description: 'Each fragrance is a masterpiece of olfactory art and innovation' },
    { icon: 'Lu', title: 'Luxury', description: 'Premium quality that defines the art of fine fragrance' },
    { icon: 'Su', title: 'Sustainability', description: 'Committed to ethical practices and environmental responsibility' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="about-page">
      <motion.section
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About JPG Perfumes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Three decades of luxury fragrance craftsmanship
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        className="story-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container">
          <motion.div
            className="story-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="story-text" variants={itemVariants}>
              <h2>Our Story</h2>
              <p>
                Founded with a vision to create exceptional fragrances that transcend time and trends, Jean Paul Gaultier has become synonymous with luxury and innovation in the world of perfumery.
              </p>
              <p>
                Each scent is carefully crafted to tell a story, combining the finest raw materials from around the globe with cutting-edge fragrance technology. Our master perfumers dedicate themselves to creating olfactory experiences that resonate with the soul.
              </p>
              <p>
                From the iconic Le Male to the elegant Classique, every fragrance in our collection represents a commitment to excellence and a celebration of individuality.
              </p>
            </motion.div>

            <motion.div className="story-stats" variants={itemVariants}>
              <div className="stat">
                <h3>30+</h3>
                <p>Years of Excellence</p>
              </div>
              <div className="stat">
                <h3>50M+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat">
                <h3>100+</h3>
                <p>Fragrances Created</p>
              </div>
              <div className="stat">
                <h3>150+</h3>
                <p>Countries Worldwide</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="values-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>

          <motion.div
            className="values-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                variants={itemVariants}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="process-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Craft
          </motion.h2>

          <motion.div
            className="process-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="process-step" variants={itemVariants}>
              <div className="step-number">1</div>
              <h3>Selection</h3>
              <p>Sourcing the finest raw materials from master growers around the world</p>
            </motion.div>

            <motion.div className="process-step" variants={itemVariants}>
              <div className="step-number">2</div>
              <h3>Creation</h3>
              <p>Master perfumers blend and refine ingredients to create unique compositions</p>
            </motion.div>

            <motion.div className="process-step" variants={itemVariants}>
              <div className="step-number">3</div>
              <h3>Testing</h3>
              <p>Rigorous quality control ensures every bottle meets our exacting standards</p>
            </motion.div>

            <motion.div className="process-step" variants={itemVariants}>
              <div className="step-number">4</div>
              <h3>Bottling</h3>
              <p>Elegant packaging preserves the fragrance and delivers luxury to your door</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Discover Your Signature Fragrance</h2>
            <p>Explore our complete collection and find the scent that expresses your unique style</p>
            <Link to="/" className="btn btn-primary">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
