import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";   
import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();   
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += delta;

    if (updatedCart[index].quantity < 1) {
      updatedCart[index].quantity = 1;
    }

    updateCart(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 100 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0)
    return <h2 className="empty-cart">Your cart is empty</h2>;

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h1>Shopping Bag ({cart.length})</h1>

        {cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.name} />

            <div className="cart-details">
              <div className="cart-top">
                <h3>{item.name}</h3>
                <span
                  className="remove"
                  onClick={() => handleRemove(index)}
                >
                  ✕
                </span>
              </div>

              <p>Size: {item.size}</p>

              <div className="quantity">
                <button onClick={() => handleQuantityChange(index, -1)}>
                  –
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(index, 1)}>
                  +
                </button>
              </div>
            </div>

            <div className="cart-price">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-right">
        <h2>Order Summary</h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span>₹{shipping.toFixed(2)}</span>
        </div>

        <div className="summary-total">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}   
        >
          PROCEED TO CHECKOUT →
        </button>
      </div>
    </div>
  );
}

export default Cart;