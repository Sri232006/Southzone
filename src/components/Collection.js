import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

import hoodie from "../assets/hoodie.jpg";
import shirt from "../assets/shirt.jpg";
import dhoti from "../assets/dhoti.jpg";
import pants from "../assets/pants.jpg";

function Collection() {
  const navigate = useNavigate();

  const collections = [
    {
      img: hoodie,
      title: "HOODY",
      category: "hoodies",
    },
    {
      img: shirt,
      title: "SHIRT",
      category: "shirts",
    },
    {
      img: dhoti,
      title: "DHOTIS",
      category: "dhotis",
    },
    {
      img: pants,
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