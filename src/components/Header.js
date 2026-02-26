import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";
import logo from "../assets/southzone_logo_final.jpg";

import {
  FaHome,
  FaShoppingBag,
  FaHeadphones,
  FaQuestionCircle,
  FaEnvelope,
  FaUser,
  FaSearch,
  FaShoppingCart,
  FaTimes
} from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const checkLoginState = () => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    checkLoginState();
    updateCartCount();
  }, []);

  useEffect(() => {
    checkLoginState();
    updateCartCount();
  }, [location]);

  useEffect(() => {
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleUserClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCartCount(0);
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${searchTerm}`);
      setShowSearch(false);
      setSearchTerm("");
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <FaHome onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
          <FaShoppingBag />
          <FaHeadphones />
          <FaQuestionCircle onClick={() => navigate("/faq")} style={{ cursor: "pointer" }} />
          <FaEnvelope onClick={() => navigate("/contact")} style={{ cursor: "pointer" }} />
        </div>

        <div className="header-center">
          <img
            src={logo}
            alt="South Zone"
            className="logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>

        <div className="header-right">
          <FaUser
            style={{
              cursor: "pointer",
              color: isLoggedIn ? "red" : "white",
            }}
            onClick={handleUserClick}
            title={isLoggedIn ? "Logout" : "Login"}
          />

          {/*  Search Icon */}
          <FaSearch
            style={{ cursor: "pointer" }}
            onClick={() => setShowSearch(true)}
          />

          {/* 🛒 Cart */}
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  background: "red",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 🔎 Full Screen Search Overlay */}
      {showSearch && (
        <div className="search-overlay">
          <div className="search-box">
            <FaTimes
              className="close-icon"
              onClick={() => setShowSearch(false)}
            />

            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;