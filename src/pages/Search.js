import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Products.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {

  const query = useQuery();
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchText = query.get("q")?.toLowerCase() || "";

  useEffect(() => {

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data);
        setLoading(false);
      });

  }, []);

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchText)
  );

  if (loading) return <div className="products-page">Loading...</div>;

  return (
    <div className="products-page">

      <div className="products-header">
        <h2>Search Results for "{searchText}"</h2>
        <span className="product-count">
          {filteredProducts.length} products found
        </span>
      </div>

      <div className="products-grid">

        {filteredProducts.map((item) => (

          <div
            className="product-card"
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
          >

            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>

            <div className="product-price">₹{item.price}</div>

          </div>

        ))}

      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          No products found
        </div>
      )}

    </div>
  );
}

export default Search;