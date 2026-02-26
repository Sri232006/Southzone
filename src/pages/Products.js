import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Products.css";
import productsData from "../data/Products";

function Products() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(5000);

  // CATEGORY FILTER
  const filteredProducts = productsData.filter(
    (product) =>
      product.category === category && product.price <= maxPrice
  );

  // SORTING
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="products-page">

      {/* ===== HEADER ===== */}
      <div className="products-header">
        <h2>{category.toUpperCase()}</h2>

        <div className="products-actions">
          <span className="product-count">
            Showing {sortedProducts.length} products
          </span>

          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* ===== FILTER BAR ===== */}
      <div className="filter-bar">
        <label>Filter by price:</label>
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <span>₹{maxPrice}</span>
      </div>

      {/* ===== PRODUCTS GRID ===== */}
      {sortedProducts.length > 0 ? (
        <div className="products-grid">
          {sortedProducts.map((item) => (
            <div
              className="product-card"
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <div className="product-price">₹{item.price}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          Products will be available soon
          <span>Stay tuned </span>
        </div>
      )}
    </div>
  );
}

export default Products;