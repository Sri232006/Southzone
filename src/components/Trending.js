import React from "react";
import "../styles/Home.css";

/* Products data */
const products = [
  {
    id: 1,
    name: "Green Hoody",
    image: "/images/hoody.jpg",
    price: 675,
    oldPrice: 1499,
  },
  {
    id: 2,
    name: "Merun Shirt",
    image: "/images/white-hoody.jpg",
    price: 1319,
    oldPrice: 1999,
  },
  {
    id: 3,
    name: "Bottle Green Shirt",
    image: "/images/red-hoody.jpg",
    price: 1125,
    oldPrice: 1500,
  },
  {
    id: 4,
    name: "Dhoti",
    image: "/images/pongal-offer.jpg",
    price: 679,
    oldPrice: 999,
  },
];

const Trending = () => {
  return (
    <section className="trending-section">
      <div className="trending-header">
        <h2>Trending Now</h2>
        <span className="view-all">VIEW ALL PRODUCTS</span>
      </div>

      <div className="trending-grid">
        {products.map((item) => (
          <div className="trending-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <div className="price">
              <span className="new">₹{item.price}</span>
              <span className="old">₹{item.oldPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;