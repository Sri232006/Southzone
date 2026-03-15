import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Auth.css";

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

  const [showUserMenu, setShowUserMenu] = useState(false);

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
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCartCount(0);
    setShowUserMenu(false);
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
            src="/images/southzone_logo_final.jpg"
            alt="South Zone"
            className="logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>

        <div className="header-right">

          {/* USER ICON */}
          <div style={{ position: "relative" }}>
            <FaUser
              style={{
                cursor: "pointer",
                color: isLoggedIn ? "red" : "white",
              }}
              onClick={handleUserClick}
            />

            {showUserMenu && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "30px",
                  background: "#111",
                  border: "1px solid #333",
                  borderRadius: "6px",
                  padding: "10px",
                  width: "120px",
                  zIndex: 1000
                }}
              >
                {!isLoggedIn && (
                  <div
                    style={{ padding: "8px", cursor: "pointer" }}
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate("/login");
                    }}
                  >
                    Login
                  </div>
                )}

                {isLoggedIn && (
                  <>
                    <div
                      style={{ padding: "8px", cursor: "pointer" }}
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </div>

                    <div
                      style={{ padding: "8px", cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <FaSearch
            style={{ cursor: "pointer" }}
            onClick={() => setShowSearch(true)}
          />

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