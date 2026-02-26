import React from "react";
import "../styles/Auth.css";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      {/* TOP INSTAGRAM TEXT */}
      <div className="footer-top">
        <h3>@SOUTHZONE_CLOTHING</h3>
        <p>Follow us on Instagram for daily inspiration.</p>
      </div>

      {/* MAIN FOOTER CONTENT */}
      <div className="footer-content">
        {/* BRAND INFO */}
        <div className="footer-box">
          <h4>SOUTHZONE</h4>
          <p>
            Defining modern fashion with a touch of elegance. Premium
            clothing for the contemporary individual.
          </p>

          <div className="social-icons">
            <FaInstagram />
            <FaFacebookF />
            <FaTwitter />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-box">
          <h4>QUICK LINKS</h4>
          <p>Shop Collection</p>
          <p>About Us</p>
          <p>Contact</p>
          <p>FAQ</p>
        </div>

        {/* CONTACT US */}
        <div className="footer-box">
          <h4>CONTACT US</h4>

          <p className="contact-item">
            <FaMapMarkerAlt />
            Kadambanagar, Pattinakkattan, Ramanathapuram, Tamil Nadu – 623503
          </p>

          <p className="contact-item">
            <FaPhoneAlt />
            +91 73971 33761
          </p>

          <p className="contact-item">
            <FaClock />
            Mon – Sun | 10:00 AM – 9:30 PM
          </p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        © 2024 SouthZone Clothing. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;