import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import googleLogo from "../assets/google.png";

function Signup({ switchToLogin }) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (firstName && lastName && email && password) {
      const authToken = "user-auth-token";

      localStorage.setItem("authToken", authToken);
      localStorage.setItem(
        "user",
        JSON.stringify({ email, role: "user" })
      );

      alert("Account created successfully!");
      navigate("/");
    } else {
      alert("Please fill all fields");
    }
  };

  const handleGoogleSignup = () => {
    const authToken = "google-auth-token";

    localStorage.setItem("authToken", authToken);
    localStorage.setItem(
      "user",
      JSON.stringify({ email: "googleuser@gmail.com", role: "user" })
    );

    navigate("/home");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); 
  };

  return (
    <div className="auth-container">
      <h1>CREATE ACCOUNT</h1>
      <p>Please enter your details:</p>

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="primary-btn" onClick={handleSignup}>
        CREATE
      </button>

      <p className="or-text">OR</p>

      <button className="google-btn" onClick={handleGoogleSignup}>
        <img src={googleLogo} alt="Google" />
        Sign up with Google
      </button>

      {/*  Forgot Password */}
      <p className="link-text" onClick={handleForgotPassword}>
        Forgot Password?
      </p>

      {/*  Switch to Login */}
      <p className="link-text" onClick={switchToLogin}>
        Already have an account? Login
      </p>
    </div>
  );
}

export default Signup;