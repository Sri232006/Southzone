import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/HeroSlider.css";

import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

function HeroSlider() {

  const [slides, setSlides] = useState([]);
  const [caption, setCaption] = useState("");
  const [newImage, setNewImage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {

    fetch("http://localhost:5000/heroslides")
      .then(res => res.json())
      .then(data => setSlides(data))
      .catch(err => console.log(err));

  }, []);

  const handleUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      setNewImage(`/images/${file.name}`);

    }

  };

  const addToList = () => {

    if (!newImage) return;

    const newSlide = {
      image: newImage,
      title: caption || "New Slide"
    };

    fetch("http://localhost:5000/heroslides", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(newSlide)

    })
      .then(res => res.json())
      .then(data => {

        setSlides([...slides, data]);

        setCaption("");
        setNewImage("");

      });

  };

  const removeImage = (id) => {

    fetch(`http://localhost:5000/heroslides/${id}`, {
      method: "DELETE"
    })
      .then(() => {

        setSlides(slides.filter((slide) => slide.id !== id));

      });

  };

  const startEdit = (index) => {

    setEditingIndex(index);

    setCaption(slides[index].title);

  };

  const saveEdit = (index) => {

    const slide = slides[index];

    const updatedSlide = {
      ...slide,
      title: caption
    };

    fetch(`http://localhost:5000/heroslides/${slide.id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(updatedSlide)

    })
      .then(res => res.json())
      .then(data => {

        const updated = [...slides];

        updated[index] = data;

        setSlides(updated);

        setEditingIndex(null);

        setCaption("");

      });

  };

  return (

    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <div className="admin-hero-container">

          <div className="admin-hero-header">

            <h2>Hero Slider Management</h2>

          </div>

          <div className="admin-upload-box">

            <label>Add New Image</label>

            <div className="admin-upload-row">

              <input type="file" onChange={handleUpload} />

              <input
                type="text"
                placeholder="Enter caption text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />

              <button onClick={addToList}>
                + ADD TO LIST
              </button>

            </div>

          </div>

          {slides.map((slide, index) => (

            <div key={slide.id} className="admin-image-card">

              <img src={slide.image} alt="hero" />

              <div className="admin-image-actions">

                {editingIndex === index ? (
                  <>
                    <input
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />

                    <button onClick={() => saveEdit(index)}>
                      <FaSave /> Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{slide.title}</span>

                    <div className="action-buttons">

                      <button onClick={() => startEdit(index)}>
                        <FaEdit />
                      </button>

                      <button onClick={() => removeImage(slide.id)}>
                        <FaTrash />
                      </button>

                    </div>
                  </>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default HeroSlider;