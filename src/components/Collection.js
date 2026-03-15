import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Collection() {

  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/collections")
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => console.log(err));

  }, []);

  const handleNavigate = (category) => {

    navigate(`/products/${category}`);

  };

  return (
    <section className="collection-section">

      <h2 className="section-title">OUR COLLECTION</h2>

      <div className="collection-grid">

        {collections.map((item) => (

          <div
            key={item.id}
            className="collection-card"
            onClick={() => handleNavigate(item.category)}
            style={{ cursor: "pointer" }}
          >

            <img src={item.image} alt={item.title} />

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