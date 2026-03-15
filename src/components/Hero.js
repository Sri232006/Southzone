import React, { useEffect, useState } from "react";
import "../styles/Home.css";

function Hero() {
  const slides = [
    { image: "/images/hero1.jpg", title: "REDEFINE FASHION" },
    { image: "/images/hero2.jpg", title: "MODERN STREETWEAR" },
    { image: "/images/hero3.jpg", title: "TRENDING NOW" },
    { image: "/images/hero4.jpg", title: "URBAN CLASSICS" },
    { image: "/images/hero5.jpg", title: "SOUTHZONE STYLE" },
    { image: "/images/hero6.jpg", title: "ELEVATE YOUR LOOK" },
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