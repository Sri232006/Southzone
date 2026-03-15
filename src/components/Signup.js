import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Signup({ switchToLogin }) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (firstName && lastName && email && password) {

      const newUser = {
        firstName,
        lastName,
        email,
        password,
        role: "user"
      };

      try {

        await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
        });

        const authToken = "user-auth-token";

        localStorage.setItem("authToken", authToken);
        localStorage.setItem(
          "user",
          JSON.stringify({ email, role: "user" })
        );

        alert("Account created successfully!");
        navigate("/");

      } catch (error) {
        console.error(error);
      }

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
        <img src="/images/google.png" alt="Google" />
        Sign up with Google
      </button>

      <p className="link-text" onClick={handleForgotPassword}>
        Forgot Password?
      </p>

      <p className="link-text" onClick={switchToLogin}>
        Already have an account? Login
      </p>
    </div>
  );
}

export default Signup;