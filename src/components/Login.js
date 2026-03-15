import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const executePendingAction = () => {
    const pendingAction = JSON.parse(localStorage.getItem("pendingAction"));
    if (!pendingAction) return;

    localStorage.removeItem("pendingAction");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === pendingAction.productId &&
        item.size === pendingAction.size
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += pendingAction.quantity;
    } else {
      cart.push({
        productId: pendingAction.productId,
        name: pendingAction.name,
        price: pendingAction.price,
        image: pendingAction.image,
        size: pendingAction.size,
        quantity: pendingAction.quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    if (pendingAction.type === "buyNow") {
      navigate("/cart");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    try {

      const res = await fetch("http://localhost:5000/users");
      const users = await res.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert("Invalid email or password");
        return;
      }

      localStorage.setItem("authToken", "user-auth-token");
      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, role: user.role })
      );

      executePendingAction();

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = () => {
    localStorage.setItem("authToken", "google-auth-token");
    localStorage.setItem(
      "user",
      JSON.stringify({ email: "googleuser@gmail.com", role: "user" })
    );

    executePendingAction();
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h1>LOGIN</h1>
      <p>Please enter your e-mail/phone and password:</p>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Phone Number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" type="submit">
          LOGIN
        </button>
      </form>

      <p className="or-text">OR</p>

      <button className="google-btn" onClick={handleGoogleLogin}>
        <img src="/images/google.png" alt="Google" />
        Sign in with Google
      </button>

      <div className="auth-links">
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>
            Create one
          </span>
        </p>

        <p>
          <span onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;