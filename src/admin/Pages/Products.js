import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import Sidebar from "../components/Sidebar";
import "../styles/Products.css";

function Products() {
  const { products, addProduct } = useContext(ProductContext);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    originalPrice: "",
    discount: 0,
    finalPrice: 0,
    category: "",
    description: "",
    stock: 0,
    sizes: [],
    image: null,
  });

  useEffect(() => {
    const price = Number(formData.originalPrice);
    const discount = Number(formData.discount);

    if (price > 0) {
      const final = price - (price * discount) / 100;
      setFormData((prev) => ({ ...prev, finalPrice: final.toFixed(0) }));
    }
  }, [formData.originalPrice, formData.discount]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (size) => {
    if (formData.sizes.includes(size)) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((s) => s !== size),
      });
    } else {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, size],
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const newProduct = {
    id: formData.id || Date.now(),
    name: formData.name,
    price: Number(formData.finalPrice),
    category: formData.category,
    image: formData.image,
    stock: Number(formData.stock),
  };

  fetch("http://localhost:5000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((res) => res.json())
    .then((data) => {
      addProduct(data);
      setShowForm(false);
      alert("Product added successfully");
    })
    .catch((err) => console.log(err));
};
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="products-container">
        {!showForm ? (
          <>
            <div className="products-header">
              <h2>All Products</h2>
              <button
                className="add-btn"
                onClick={() => setShowForm(true)}
              >
                + Add New Product
              </button>
            </div>

            <div className="table-card">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={item.image}
                          alt=""
                          className="table-img"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>₹{item.price}</td>
                      <td>{item.stock}</td>
                      <td>
                        <button className="edit-btn">✏</button>
                        <button className="delete-btn">🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="back-link" onClick={() => setShowForm(false)}>
              ← Back to Products
            </div>

            <div className="add-product-card">
              <h2>Add New Product</h2>

              <form onSubmit={handleSubmit}>
                <label>Product ID (Optional)</label>
                <input
                  type="text"
                  name="id"
                  placeholder="Auto-generated if left blank"
                  onChange={handleChange}
                />

                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                />

                <div className="row">
                  <div>
                    <label>Original Price</label>
                    <input
                      type="number"
                      name="originalPrice"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Discount %</label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label>Final Price (Calculated)</label>
                    <input
                      type="text"
                      value={formData.finalPrice}
                      readOnly
                    />
                  </div>
                </div>

                <label>Category</label>
                <select
                  name="category"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="shirts">Shirts</option>
                  <option value="t-shirts">T-Shirts</option>
                  <option value="hoodie">Hoodie</option>
                  <option value="dhoti">Dhoti</option>
                </select>

                <label>Description</label>
                <textarea
                  name="description"
                  rows="4"
                  onChange={handleChange}
                ></textarea>

                <label>Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                <label>Available Sizes</label>
                <div className="sizes">
                  {["S", "M", "L", "XL", "XXL", "30", "32", "34", "36"].map(
                    (size) => (
                      <label key={size}>
                        <input
                          type="checkbox"
                          onChange={() => handleSizeChange(size)}
                        />
                        {size}
                      </label>
                    )
                  )}
                </div>

                <label>Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  onChange={handleChange}
                />

                <button type="submit" className="create-btn">
                  CREATE PRODUCT
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Products;