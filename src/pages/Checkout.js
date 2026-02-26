import React, { useState, useEffect } from "react";
import "../styles/Checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBuyNow = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.reload();
  };

  return (
    <div className="checkout-page">
      <h1>CHECKOUT</h1>

      <div className="checkout-container">
        {/* LEFT SIDE */}
        <div className="checkout-form">
          <h3>Shipping Details</h3>

          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <label>Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <div className="row">
            <div>
              <label>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Zip Code</label>
              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="buy-btn" onClick={handleBuyNow}>
            BUY NOW
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          {cart.map((item, index) => (
            <div key={index} className="summary-item">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <div className="summary-total">
            <span>Total To Pay</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;