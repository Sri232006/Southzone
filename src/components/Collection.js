import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Collection() {
  const navigate = useNavigate();

  const collections = [
    {
      img: "/images/hoodie.jpg",
      title: "HOODY",
      category: "hoodies",
    },
    {
      img: "/images/shirt.jpg",
      title: "SHIRT",
      category: "shirts",
    },
    {
      img: "/images/dhoti.jpg",
      title: "DHOTIS",
      category: "dhotis",
    },
    {
      img: "/images/pants.jpg",
      title: "PANTS",
      category: "pants",
    },
  ];

  const handleNavigate = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <section className="collection-section">
      <h2 className="section-title">OUR COLLECTION</h2>

      <div className="collection-grid">
        {collections.map((item, index) => (
          <div
            key={index}
            className="collection-card"
            onClick={() => handleNavigate(item.category)}
            style={{ cursor: "pointer" }}
          >
            <img src={item.img} alt={item.title} />

            <div className="collection-overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Collection;