import React, { useEffect, useState } from "react";
import "../styles/Home.css";

function Hero() {

  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {

    fetch("http://localhost:5000/heroslides")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.log(err));

  }, []);

  useEffect(() => {

    if (slides.length === 0) return;

    const interval = setInterval(() => {

      setFade(false);

      setTimeout(() => {

        setCurrent((prev) => (prev + 1) % slides.length);

        setFade(true);

      }, 300);

    }, 3500);

    return () => clearInterval(interval);

  }, [slides]);

  if (slides.length === 0) return null;

  return (
    <div className="sz-hero">

      <div
        className="sz-hero-bg"
        style={{ backgroundImage: `url(${slides[current].image})` }}
      ></div>

      <div className={`sz-hero-content ${fade ? "fade-in" : "fade-out"}`}>

        <img
          src={slides[current].image}
          alt="Hero"
          className="sz-hero-main-image"
        />

        <h1>{slides[current].title}</h1>

        <button className="sz-hero-btn">SHOP NOW</button>

        <div className="sz-hero-dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`sz-dot ${i === current ? "active" : ""}`}
            ></span>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Hero;