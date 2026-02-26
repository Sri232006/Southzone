import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Offers.css";

function Offers() {
  const [showForm, setShowForm] = useState(false);

  const [offers, setOffers] = useState([
    {
      title: "Pongal Sale..!",
      desc: "(7th Jan - 17th Jan)",
      discount: 34,
      image: "https://via.placeholder.com/500x250"
    },
    {
      title: "Summer Sale",
      desc: "(3rd Mar - 25th May)",
      discount: 31,
      image: "https://via.placeholder.com/500x250"
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    discount: "",
    image: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const createOffer = () => {
    if (!formData.title || !formData.discount) return;

    const newOffer = {
      ...formData,
      image:
        formData.image ||
        "https://via.placeholder.com/500x250?text=No+Image"
    };

    setOffers([...offers, newOffer]);

    setFormData({
      title: "",
      desc: "",
      discount: "",
      image: null
    });

    setShowForm(false);
  };

  const deleteOffer = (index) => {
    setOffers(offers.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-offers-layout">

      <Sidebar />

      <div className="admin-offers-container">

        <h1>Offers & Banners</h1>
        <p>Manage store-wide offers and promotional banners</p>

        <button
          className="admin-add-offer-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "+ CANCEL" : "+ ADD NEW OFFER"}
        </button>

        {showForm && (
          <div className="admin-offer-form">

            <h3>Create New Offer</h3>

            <div className="admin-offer-row">
              <input
                name="title"
                placeholder="Offer Title"
                value={formData.title}
                onChange={handleChange}
              />

              <input
                name="discount"
                type="number"
                placeholder="Discount %"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>

            <textarea
              name="desc"
              placeholder="Description"
              value={formData.desc}
              onChange={handleChange}
            />

            <input type="file" accept="image/*" onChange={handleImage} />

            {formData.image && (
              <img
                src={formData.image}
                alt="preview"
                className="admin-offer-preview"
              />
            )}

            <button
              className="admin-create-offer-btn"
              onClick={createOffer}
            >
              CREATE OFFER
            </button>

          </div>
        )}

        {/* OFFERS GRID */}
        <div className="admin-offers-grid">
          {offers.map((offer, index) => (
            <div className="admin-offer-card" key={index}>

              <img src={offer.image} alt={offer.title} />

              <div className="admin-offer-info">

                <h3>{offer.title}</h3>
                <p>{offer.desc}</p>

                <span className="admin-offer-badge">
                  {offer.discount}% OFF
                </span>

                <button
                  className="admin-delete-offer-btn"
                  onClick={() => deleteOffer(index)}
                >
                  🗑 Delete Offer
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Offers;