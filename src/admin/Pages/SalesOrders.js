import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/SalesOrders.css";

import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Search
} from "lucide-react";

function SalesOrders() {

  const orders = [
    {
      id: "ORD-1767424770027",
      date: "1/3/2026",
      customer: "company",
      phone: "6374169846",
      location: "Ramanathapuram",
      items: "1x green hoody",
      total: 675,
      status: "Success"
    }
  ];

  return (
    <div className="so-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="so-container">

        <h1>Sales & Orders</h1>
        <p className="so-subtitle">
          Track customer orders and revenue
        </p>

        {/* Stats */}
        <div className="so-stats">

          <div className="so-card">
            <div>
              <p>Total Revenue</p>
              <h2>Rs. 0</h2>
            </div>
            <div className="so-icon so-blue">
              <DollarSign size={22} />
            </div>
          </div>

          <div className="so-card">
            <div>
              <p>Total Orders</p>
              <h2>20</h2>
            </div>
            <div className="so-icon so-orange">
              <ShoppingBag size={22} />
            </div>
          </div>

          <div className="so-card">
            <div>
              <p>Avg. Order Value</p>
              <h2>Rs. 0.00</h2>
            </div>
            <div className="so-icon so-green">
              <TrendingUp size={22} />
            </div>
          </div>

        </div>

        {/* Orders Table */}
        <div className="so-table-card">

          <div className="so-header">
            <h3>Recent Orders</h3>

            <div className="so-search">
              <Search size={18} />
              <input placeholder="Search Customer or Order" />
            </div>
          </div>

          <table className="so-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer Info</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o, i) => (
                <tr key={i}>
                  <td>{o.id}</td>
                  <td>{o.date}</td>
                  <td>
                    <strong>{o.customer}</strong><br />
                    {o.phone}<br />
                    {o.location}
                  </td>
                  <td>{o.items}</td>
                  <td>Rs. {o.total}</td>
                  <td>
                    <span className="so-status so-success">
                      {o.status}
                    </span>
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

export default SalesOrders;