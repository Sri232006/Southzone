import React, { useEffect, useState } from "react";
import "../styles/Home.css";

function Offers() {

  const [offers, setOffers] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/offers")
      .then(res => res.json())
      .then(data => setOffers(data))
      .catch(err => console.log(err));

  }, []);

  return (
    <section className="offers-section">

      <h2 className="section-title">EXCLUSIVE OFFERS</h2>

      <div className="offers-container">

        {offers.map((offer) => (

          <div className="offer-card" key={offer.id}>

            <img src={offer.image} alt={offer.title} />

            <div className="offer-overlay">

              <span className="offer-discount">
                {offer.discount}% OFF
              </span>

              <h3>{offer.title}</h3>

              <p>{offer.desc}</p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Offers;