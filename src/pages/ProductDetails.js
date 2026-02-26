import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/Products";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === parseInt(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  if (!product) return <h2>Product not found</h2>;

  const handleAddToCart = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === size
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity,
        size
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // ✅🔥 CRITICAL LINE (badge update)
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Added to cart!");
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    const checkoutItem = {
      ...product,
      quantity,
      size
    };

    localStorage.setItem("checkoutItem", JSON.stringify(checkoutItem));

    navigate("/checkout");
  };

  return (
    <div className="product-details-container">
      <div className="product-image-section">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info-section">
        <h1>{product.name}</h1>
        <h2 className="price">₹{product.price}</h2>

        <div className="size-section">
          <p>Select Size:</p>
          <div className="sizes">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                className={size === s ? "size-btn active" : "size-btn"}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="quantity-section">
          <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>
            +
          </button>
        </div>

        <div className="button-section">
          <button className="add-cart" onClick={handleAddToCart}>
            ADD TO CART
          </button>

          <button className="buy-now" onClick={handleBuyNow}>
            BUY IT NOW
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;