import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/AdminDashboard.css";
import {
  AlertTriangle,
  TrendingUp,
  Box
} from "lucide-react";

function AdminDashboard() {
  return (
    <div className="admin-container">
      
      <Sidebar />

      <div className="main-content">
        <h1>Dashboard</h1>

        <div className="stats">

          <div className="card">
            <div>
              <p>Total Products</p>
              <h2>4</h2>
            </div>
            <div className="icon-box green">
              <Box size={22} />
            </div>
          </div>

          <div className="card">
            <div>
              <p>Total Inventory Value</p>
              <h2>₹54,700</h2>
            </div>
            <div className="icon-box green">
              <TrendingUp size={22} />
            </div>
          </div>

          <div className="card">
            <div>
              <p>Low Stock Items</p>
              <h2>0</h2>
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
              <tr>
                <td>#1767423415648</td>
                <td>Dhoti</td>
                <td>₹679</td>
                <td className="stock">10</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;