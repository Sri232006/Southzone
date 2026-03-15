import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Offers.css";

function Offers() {

  const [showForm, setShowForm] = useState(false);
  const [offers, setOffers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    discount: "",
    image: ""
  });

  useEffect(() => {

    fetch("http://localhost:5000/offers")
      .then(res => res.json())
      .then(data => setOffers(data))
      .catch(err => console.log(err));

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {

      setFormData({
        ...formData,
        image: `/images/${file.name}`
      });

    }

  };

  const createOffer = () => {

    if (!formData.title || !formData.discount) return;

    const newOffer = {
      ...formData,
      id: Date.now().toString()
    };

    fetch("http://localhost:5000/offers", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(newOffer)

    })
      .then(res => res.json())
      .then(data => {

        setOffers([...offers, data]);

        setFormData({
          title: "",
          desc: "",
          discount: "",
          image: ""
        });

        setShowForm(false);

      });

  };

  const deleteOffer = (id) => {

    fetch(`http://localhost:5000/offers/${id}`, {

      method: "DELETE"

    }).then(() => {

      setOffers(offers.filter(o => o.id !== id));

    });

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

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

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

        <div className="admin-offers-grid">

          {offers.map((offer) => (

            <div className="admin-offer-card" key={offer.id}>

              <img src={offer.image} alt={offer.title} />

              <div className="admin-offer-info">

                <h3>{offer.title}</h3>
                <p>{offer.desc}</p>

                <span className="admin-offer-badge">
                  {offer.discount}% OFF
                </span>

                <button
                  className="admin-delete-offer-btn"
                  onClick={() => deleteOffer(offer.id)}
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