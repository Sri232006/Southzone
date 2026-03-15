import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/AdminCollections.css";

function Collections() {

  const [collections, setCollections] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    textPosition: "center",
    textColor: "#ffffff",
    image: ""
  });

  // FETCH COLLECTIONS FROM DB
  useEffect(() => {

    fetch("http://localhost:5000/collections")
      .then(res => res.json())
      .then(data => setCollections(data))
      .catch(err => console.log(err));

  }, []);

  // Handle inputs
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // IMAGE PATH SAVE (NO BASE64)
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      setFormData({
        ...formData,
        image: `/images/${file.name}`
      });

    }

  };

  // ADD COLLECTION
  const handleAdd = () => {

    if (!formData.title || !formData.image) return;

    const newCollection = {
      ...formData,
      id: Date.now().toString()
    };

    fetch("http://localhost:5000/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCollection)
    })
      .then(res => res.json())
      .then(data => {

        setCollections([...collections, data]);

        setFormData({
          title: "",
          textPosition: "center",
          textColor: "#ffffff",
          image: ""
        });

        setShowForm(false);

      })
      .catch(err => console.log(err));

  };

  // DELETE COLLECTION
  const handleDelete = (id) => {

    fetch(`http://localhost:5000/collections/${id}`, {
      method: "DELETE"
    })
      .then(() => {

        setCollections(collections.filter((item) => item.id !== id));

      })
      .catch(err => console.log(err));

  };

  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

      <div className="admin-collections-container">

        <h1>Collections Management</h1>
        <p>Manage "Our Collection" section on homepage</p>

        {!showForm && (
          <button
            className="admin-add-new-btn"
            onClick={() => setShowForm(true)}
          >
            + ADD NEW COLLECTION
          </button>
        )}

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

            <button
              className="admin-add-btn"
              onClick={handleAdd}
            >
              ADD COLLECTION
            </button>

          </div>
        )}

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