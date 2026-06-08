import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const Products = ({ category: categoryProp }) => {
  const { category: categoryFromRoute } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";
  const currentCategory = categoryProp || categoryFromRoute || "";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState(urlSearchQuery);

  const categoryTitle = currentCategory
    ? currentCategory === "mens"
      ? "For Men"
      : currentCategory === "womens"
        ? "For Women"
        : "All Products"
    : "All Products";

  const categoryParam =
    currentCategory === "mens"
      ? "men"
      : currentCategory === "womens"
        ? "women"
        : "";

  useEffect(() => {
    setSearchQuery(urlSearchQuery);
    setDebouncedSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();
      setDebouncedSearchQuery(trimmedQuery);

      const nextParams = new URLSearchParams(window.location.search);

      if (trimmedQuery) {
        nextParams.set("search", trimmedQuery);
      } else {
        nextParams.delete("search");
      }

      setSearchParams(nextParams, { replace: true });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, setSearchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const params = {};

        if (categoryParam) {
          params.category = categoryParam;
        }

        if (debouncedSearchQuery) {
          params.search = debouncedSearchQuery;
        }

        const response = await fetchProducts(params);
        const data = response.data.data;

        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryParam, debouncedSearchQuery]);

  useEffect(() => {
    let filtered = [...products];

    if (showOnSaleOnly) {
      filtered = filtered.filter((product) => product.discount > 0);
    }

    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  }, [products, sortBy, showOnSaleOnly]);

  return (
    <div className="products-page">
      <motion.div
        className="products-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h1>{categoryTitle}</h1>
          <p>Bizning hashamatli atirlar to'plamimiz bilan tanishing</p>
        </div>
      </motion.div>

      <section className="products-section">
        <div className="container">
          <motion.div
            className="products-controls"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="controls-left">
              <label className="search-control">
                <span>Qidiruv</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={
                    currentCategory === "mens"
                      ? "Search men fragrances"
                      : currentCategory === "womens"
                        ? "Search women fragrances"
                        : "Search fragrances"
                  }
                />
              </label>

              <label className="checkbox-control">
                <input
                  type="checkbox"
                  checked={showOnSaleOnly}
                  onChange={(event) => setShowOnSaleOnly(event.target.checked)}
                />
                <span>Sotuvda</span>
              </label>
            </div>

            <div className="controls-right">
              <label className="sort-control">
                <span>saralash turi:</span>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="featured">Tavsiya etilgan</option>
                  <option value="newest">Yangi</option>
                  <option value="price-asc">Narx: Pastdan Yuqoriga</option>
                  <option value="price-desc">Narx: Yuqoridan Pastga</option>
                </select>
              </label>
            </div>
          </motion.div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div
              className="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="no-products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                Mahsulotlar topilmadi. Boshqa qidiruv yoki filterlarni sinab ko'ring.
              </p>
            </motion.div>
          )}

          <motion.div
            className="results-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p> Mahsulot{filteredProducts.length}  topildi </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
