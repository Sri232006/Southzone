import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/AdminDashboard.css";
import {
  AlertTriangle,
  TrendingUp,
  Box
} from "lucide-react";

function AdminDashboard() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();

        setProducts(data);

      } catch (error) {

        console.error("Dashboard Error:", error);

      }

    };

    fetchProducts();

  }, []);

  const totalProducts = products.length;

  const totalInventoryValue = products.reduce(
    (sum, product) => sum + (product.price || 0),
    0
  );

  const lowStockItems = products.filter(
    (product) => product.stock && product.stock < 5
  ).length;

  const recentProducts = [...products].slice(-5).reverse();

  return (
    <div className="admin-container">

      <Sidebar />

      <div className="main-content">

        <h1>Dashboard</h1>

        <div className="stats">

          <div className="card">
            <div>
              <p>Total Products</p>
              <h2>{totalProducts}</h2>
            </div>
            <div className="icon-box green">
              <Box size={22} />
            </div>
          </div>

          <div className="card">
            <div>
              <p>Total Inventory Value</p>
              <h2>₹{totalInventoryValue}</h2>
            </div>
            <div className="icon-box green">
              <TrendingUp size={22} />
            </div>
          </div>

          <div className="card">
            <div>
              <p>Low Stock Items</p>
              <h2>{lowStockItems}</h2>
            </div>
            <div className="icon-box red">
              <AlertTriangle size={22} />
            </div>
          </div>

        </div>

        <div className="table-card">

          <h3>Recent Products</h3>

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>

              {recentProducts.map((product) => (

                <tr key={product.id}>

                  <td>#{product.id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td className="stock">
                    {product.stock ? product.stock : "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;