import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Products.css";

function Products() {

  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(5000);

  useEffect(() => {

    const url = category
      ? `http://localhost:5000/products?category=${category}`
      : `http://localhost:5000/products`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });

  }, [category]);

  const filteredProducts = products.filter(
    (product) => product.price <= maxPrice
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  if (loading) return <div className="products-page">Loading...</div>;

  return (
    <div className="products-page">

      <div className="products-header">
        <h2>{category?.toUpperCase()}</h2>

        <div className="products-actions">
          <span>Showing {sortedProducts.length} products</span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

        </div>
      </div>

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

      {sortedProducts.length > 0 ? (

        <div className="products-grid">

          {sortedProducts.map((item) => (

            <div
              key={item.id}
              className="product-card"
              onClick={() => navigate(`/product/${item.id}`)}
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
        </div>

      )}

    </div>
  );
}

export default Products;