import React, { useState } from "react";
import "../styles/StaticPages.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields!");
      return;
    }

    alert("Message sent successfully ✅");

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="static-page">
      <h1>CONTACT US</h1>

      <div className="contact-grid">
        <div>
          <h3>Customer Support</h3>
          <p>Email: support@southzone.com</p>
          <p>Phone: +91 73971 33781</p>
          <p>Hours: Mon - Sun | 10:00 AM - 9:30 PM</p>

          <h3>Store Location</h3>
          <p>
            Kadambanagar, Pattinamkattan, <br />
            Ramanathapuram, Tamil Nadu - 623503
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;