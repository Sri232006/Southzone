import React, { useState, useEffect } from "react";
import "../styles/Checkout.css";

function Checkout() {

  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

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

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handlePlaceOrder = async () => {

    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const orderData = {
      userEmail: user?.email || "guest",
      items: cart,
      shipping: form,
      paymentMethod: paymentMethod,
      total: totalPrice,
      status: paymentMethod === "cod" ? "Pending (COD)" : "Paid",
      createdAt: new Date().toISOString()
    };

    try {

      await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (paymentMethod === "cod") {
        alert("Order placed with Cash on Delivery");
      } else {
        alert("Redirecting to Razorpay payment...");
      }

      localStorage.removeItem("cart");

      window.dispatchEvent(new Event("cartUpdated"));

      window.location.reload();

    } catch (error) {

      console.error("Order Error:", error);

    }

  };

  return (
    <div className="checkout-page">

      <h1>CHECKOUT</h1>

      <div className="checkout-container">

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

          <h3 className="payment-title">Payment Method</h3>

          <div className="payment-method">

            <label>
              <input
                type="radio"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Razorpay (UPI / Card / Netbanking)
            </label>

            <label>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

          </div>

          <button className="buy-btn" onClick={handlePlaceOrder}>
            PLACE ORDER
          </button>

        </div>

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