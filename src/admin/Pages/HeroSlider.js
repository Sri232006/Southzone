import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/HeroSlider.css";

import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("heroSlides"));
    if (saved) setSlides(saved);
  }, []);

  
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  
  const addToList = () => {
    if (!newImage) return;

    const newSlide = {
      image: newImage,
      text: caption || "New Slide",
    };

    setSlides([...slides, newSlide]);
    setNewImage(null);
    setCaption("");
  };

  
  const removeImage = (index) => {
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
  };

  
  const startEdit = (index) => {
    setEditingIndex(index);
    setCaption(slides[index].text);
  };

  
  const saveEdit = (index) => {
    const updated = [...slides];
    updated[index].text = caption;
    setSlides(updated);
    setEditingIndex(null);
    setCaption("");
  };

  
  const savePreset = () => {
    localStorage.setItem("heroSlides", JSON.stringify(slides));
    alert("Preset Saved Successfully!");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <div className="admin-hero-container">

          {/* HEADER */}
          <div className="admin-hero-header">
            <h2>Hero Slider Management</h2>

            <button className="admin-save-btn" onClick={savePreset}>
              💾 SAVE PRESET
            </button>
          </div>

          {/* UPLOAD BOX */}
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

          {/* IMAGE LIST */}
          {slides.map((slide, index) => (
            <div key={index} className="admin-image-card">

              <img src={slide.image} alt="hero" />

              <div className="admin-image-actions">

                {/* Caption / Edit Mode */}
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
                    <span>{slide.text}</span>

                    <div className="action-buttons">

                      {/* Edit */}
                      <button onClick={() => startEdit(index)}>
                        <FaEdit />
                      </button>

                      {/* Remove */}
                      <button onClick={() => removeImage(index)}>
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
