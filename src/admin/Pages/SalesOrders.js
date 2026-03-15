import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/SalesOrders.css";

import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Search
} from "lucide-react";

function SalesOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/orders")
      .then(res => res.json())
      .then(data => {

        const formatted = data.map(order => ({

          id: order.id,

          date: new Date(order.createdAt).toLocaleDateString(),

          customer: order.shipping?.name || order.userEmail,

          phone: order.shipping?.phone || "-",

          location: order.shipping?.city || "-",

          items: order.items
            .map(i => `${i.quantity}x ${i.name}`)
            .join(", "),

          total: order.total,

          status: order.status

        }));

        setOrders(formatted);

      })
      .catch(err => console.log(err));

  }, []);

  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total),
    0
  );

  const totalOrders = orders.length;

  const avgOrderValue =
    totalOrders > 0
      ? (totalRevenue / totalOrders).toFixed(2)
      : "0.00";

  return (
    <div className="so-layout">

      <Sidebar />

      <div className="so-container">

        <h1>Sales & Orders</h1>
        <p className="so-subtitle">
          Track customer orders and revenue
        </p>

        <div className="so-stats">

          <div className="so-card">
            <div>
              <p>Total Revenue</p>
              <h2>Rs. {totalRevenue}</h2>
            </div>
            <div className="so-icon so-blue">
              <DollarSign size={22} />
            </div>
          </div>

          <div className="so-card">
            <div>
              <p>Total Orders</p>
              <h2>{totalOrders}</h2>
            </div>
            <div className="so-icon so-orange">
              <ShoppingBag size={22} />
            </div>
          </div>

          <div className="so-card">
            <div>
              <p>Avg. Order Value</p>
              <h2>Rs. {avgOrderValue}</h2>
            </div>
            <div className="so-icon so-green">
              <TrendingUp size={22} />
            </div>
          </div>

        </div>

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