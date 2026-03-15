import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  useEffect(() => {

    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log(err));

  }, [id]);

  if (!product) return <div className="product-details-container">Loading...</div>;

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
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Added to cart!");
  };

  // 🔥 BUY NOW FUNCTION
  const handleBuyNow = () => {

    const checkoutItem = {
      ...product,
      quantity,
      size
    };

    localStorage.setItem("cart", JSON.stringify([checkoutItem]));

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

            {["S","M","L","XL"].map((s) => (

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

          <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>

          <span>{quantity}</span>

          <button onClick={() => setQuantity(quantity + 1)}>+</button>

        </div>

        <button className="add-cart" onClick={handleAddToCart}>
          ADD TO CART
        </button>

        {/* 🔥 BUY NOW BUTTON */}
        <button className="buy-now" onClick={handleBuyNow}>
          BUY NOW
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;