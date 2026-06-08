import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/mens", label: "Erkaklar uchun" },
  { path: "/womens", label: "Ayollar uchun" },
  { path: "/about", label: "Qo'shimcha" },
  { path: "/contact", label: "Aloqa" }
];

const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 768);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    if (isMobile) {
      setIsMenuOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsMenuOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("search") || "");
  }, [location.search]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);

    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <motion.div
        className="navbar-container container"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/" className="logo">
          <span className="logo-text">JPG</span>
          <span className="logo-subtext">Perfumes</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Atirni izlang"
            aria-label="Search fragrances"
          />
          <button type="submit" className="navbar-search-btn" aria-label="Search">
            Izlash
          </button>
        </form>

        <button
          className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <motion.ul
          className={`nav-links ${isMenuOpen ? "active" : ""}`}
          initial={false}
          animate={
            isMobile
              ? isMenuOpen
                ? { x: 0, opacity: 1 }
                : { x: "100%", opacity: 0 }
              : { x: 0, opacity: 1 }
          }
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => {
                  if (isMobile) {
                    setIsMenuOpen(false);
                  }
                }}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </motion.ul>

        <Link to="/cart" className="cart-icon" aria-label="Shopping cart">
          <span className="cart-label">Savat</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="m2 2 2 2h16l2-2"></path>
            <path d="M5 6h14l1 12H4L5 6z"></path>
          </svg>

          {cartCount > 0 && (
            <motion.span
              className="cart-count"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {cartCount}
            </motion.span>
          )}
        </Link>
      </motion.div>
    </nav>
  );
};

export default Navbar;
