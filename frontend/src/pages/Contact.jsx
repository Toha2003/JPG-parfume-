import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactMethods = [
    { icon: 'Email', title: 'Email', content: 'contact@jpgperfumes.com' },
    { icon: 'Phone', title: 'Phone', content: '+1 (800) 123-4567' },
    { icon: 'Visit', title: 'Address', content: '123 Luxury Ave, New York, NY 10001' },
    { icon: 'Hours', title: 'Hours', content: 'Mon-Fri: 9AM-6PM EST' }
  ];

  return (
    <div className="contact-page">
      <motion.section
        className="contact-hero"
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
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have questions? We&apos;d love to hear from you
          </motion.p>
        </div>
      </motion.section>

      <div className="contact-content container">
        <motion.div
          className="contact-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Send us a Message</h2>

            {submitted && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Thank you! We&apos;ll get back to you soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="How can we help?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us more..."
                  rows="5"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="btn-submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Contact Information</h2>
            <p>Reach out to us through any of these channels</p>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="contact-method"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8 }}
                >
                  <div className="method-icon">{method.icon}</div>
                  <div>
                    <h4>{method.title}</h4>
                    <p>{method.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="faq-section">
              <h3>Frequently Asked Questions</h3>
              <motion.div
                className="faq-items"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="faq-item">
                  <h4>What is your return policy?</h4>
                  <p>We offer a 30-day money-back guarantee on all purchases.</p>
                </div>
                <div className="faq-item">
                  <h4>How long does shipping take?</h4>
                  <p>Standard shipping takes 5-7 business days. Express options available.</p>
                </div>
                <div className="faq-item">
                  <h4>Are your fragrances authentic?</h4>
                  <p>Yes! All our perfumes are 100% authentic and directly sourced.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.section
        className="contact-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container">
          <h2>Visit Our Showroom</h2>
          <p>Experience our collection in person at our flagship store in New York</p>
          <div className="map-placeholder">
            <p>Interactive map coming soon</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
