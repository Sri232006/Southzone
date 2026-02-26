import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    if (!email.trim()) {
      alert("Enter your email");
      return;
    }

    alert("Password reset link sent to your email (Demo only)");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="primary-btn" onClick={handleReset}>
        Send Reset Link
      </button>
    </div>
  );
}

export default ForgotPassword;