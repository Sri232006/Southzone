import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/AdminCollections.css";

function Collections() {
  const [collections, setCollections] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    textPosition: "center",
    textColor: "#ffffff",
    image: null,
  });

  // Handle inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Add collection
  const handleAdd = () => {
    if (!formData.title || !formData.image) return;

    setCollections([...collections, { ...formData, id: Date.now() }]);

    setFormData({
      title: "",
      textPosition: "center",
      textColor: "#ffffff",
      image: null,
    });

    setShowForm(false);
  };

  // Delete
  const handleDelete = (id) => {
    setCollections(collections.filter((item) => item.id !== id));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="admin-collections-container">
        <h1>Collections Management</h1>
        <p>Manage "Our Collection" section on homepage</p>

        {/* ADD NEW BUTTON */}
        {!showForm && (
          <button
            className="admin-add-new-btn"
            onClick={() => setShowForm(true)}
          >
            + ADD NEW COLLECTION
          </button>
        )}

        {/* FORM */}
        {showForm && (
          <div className="admin-collection-form">

            <button
              className="admin-cancel-btn"
              onClick={() => setShowForm(false)}
            >
              CANCEL
            </button>

            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., WINTER JACKETS"
              value={formData.title}
              onChange={handleChange}
            />

            <label>Text Position</label>
            <select
              name="textPosition"
              value={formData.textPosition}
              onChange={handleChange}
            >
              <option value="left">Left</option>
              <option value="center">Middle (Default)</option>
              <option value="right">Right</option>
            </select>

            <label>Text Color</label>
            <input
              type="color"
              name="textColor"
              value={formData.textColor}
              onChange={handleChange}
            />

            <label>Collection Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

            <button className="admin-add-btn" onClick={handleAdd}>
              ADD COLLECTION
            </button>

          </div>
        )}

        {/* COLLECTION LIST */}
        <div className="admin-collections-list">
          {collections.map((item) => (
            <div key={item.id} className="admin-collection-card">

              <img src={item.image} alt="" />

              <div
                className={`admin-collection-text ${item.textPosition}`}
                style={{ color: item.textColor }}
              >
                {item.title}
              </div>

              <div className="admin-collection-info">
                <p>
                  Link: /shop?category={item.title.toLowerCase()}
                </p>

                <button
                  className="admin-delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Collections;