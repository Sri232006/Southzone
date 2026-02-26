import React from "react";
import "../styles/StaticPages.css";

function FAQ() {
  return (
    <div className="static-page">
      <h1>FAQ</h1>

      <div className="faq-item">
        <h3>How long does shipping take?</h3>
        <p>
          Orders are typically processed within 1-2 business days.
          Standard shipping takes 3-5 business days within India.
        </p>
      </div>

      <div className="faq-item">
        <h3>What is your return policy?</h3>
        <p>
          We accept returns within 7 days of delivery.
          Items must be unworn and with original tags.
        </p>
      </div>

      <div className="faq-item">
        <h3>Do you offer international shipping?</h3>
        <p>
          Currently, we only ship within India.
        </p>
      </div>
    </div>
  );
}

export default FAQ;