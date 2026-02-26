import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package as PackageIcon,
  Tag,
  Image,
  Layers,
  ShoppingCart,
  Settings
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="logo">SOUTH ZONE</h2>
      <span className="admin-text">ADMIN</span>

      <ul className="menu">
        <li onClick={() => navigate("/admin")}>
          <LayoutDashboard size={18}/> Dashboard
        </li>

        <li onClick={() => navigate("/admin/products")}>
          <PackageIcon size={18}/> Products
        </li>

        <li onClick={() => navigate("/admin/offers")}>
          <Tag size={18}/> Offers
        </li>

        <li onClick={() => navigate("/admin/hero-slider")}>
          <Image size={18}/> Hero Slider
        </li>

        <li onClick={() => navigate("/admin/collections")}>
          <Layers size={18}/> Collections
        </li>

        {/* ✅ SALES & ORDERS ROUTE */}
        <li onClick={() => navigate("/admin/sales-orders")}>
          <ShoppingCart size={18}/> Sales & Orders
        </li>

        <li onClick={() => navigate("/admin/settings")}>
          <Settings size={18}/> Settings
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;