import React, { useEffect, useState } from "react";
import "../styles/Home.css";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";
import hero5 from "../assets/hero5.jpg";
import hero6 from "../assets/hero6.jpg";

function Hero() {
  const slides = [
    { image: hero1, title: "REDEFINE FASHION" },
    { image: hero2, title: "MODERN STREETWEAR" },
    { image: hero3, title: "TRENDING NOW" },
    { image: hero4, title: "URBAN CLASSICS" },
    { image: hero5, title: "SOUTHZONE STYLE" },
    { image: hero6, title: "ELEVATE YOUR LOOK" },
  ];

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="hero">
      
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${slides[current].image})` }}
      ></div>

      
      <div className={`hero-content ${fade ? "fade-in" : "fade-out"}`}>
        <img
          src={slides[current].image}
          alt="Hero"
          className="hero-main-image"
        />

        <h1>{slides[current].title}</h1>
        <button className="hero-btn">SHOP NOW</button>

        <div className="hero-dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;