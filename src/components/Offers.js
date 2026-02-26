import React from "react";
import "../styles/Home.css";

import pongal from "../assets/pongal-offer.jpg";
import summer from "../assets/summer-offer.jpg";

function Offers() {
  return (
    <section className="offers-section">
      <h2 className="section-title">EXCLUSIVE OFFERS</h2>

      <div className="offers-container">
        {/* Pongal Offer */}
        <div className="offer-card">
          <img src={pongal} alt="Pongal Offer" />
          <div className="offer-overlay">
            <span className="offer-discount">34% OFF</span>
            <h3>Pongal Sale!</h3>
            <p>7th Jan - 17th Jan</p>
          </div>
        </div>

        {/* Summer Offer */}
        <div className="offer-card">
          <img src={summer} alt="Summer Offer" />
          <div className="offer-overlay">
            <span className="offer-discount">31% OFF</span>
            <h3>Summer Sale</h3>
            <p>3rd Mar - 25th May</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Offers;