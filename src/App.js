import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Search from "./pages/Search";

import AdminDashboard from "./admin/Pages/AdminDashboard";
import AdminProducts from "./admin/Pages/Products";
import Offers from "./admin/Pages/Offers";
import HeroSlider from "./admin/Pages/HeroSlider";
import Collections from "./admin/Pages/Collections";
import SalesOrders from "./admin/Pages/SalesOrders";
//  Admin Context
import { ProductProvider } from "./admin/context/ProductContext";

function App() {
  return (
    <ProductProvider> 
      <Router>

        <Header />

        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* PRODUCTS */}
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* CART */}
          <Route path="/cart" element={<Cart />} />

          {/* CHECKOUT */}
          <Route path="/checkout" element={<Checkout />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/offers" element={<Offers />} />
          <Route path="/admin/hero-slider" element={<HeroSlider />} />
          <Route path="/admin/collections" element={<Collections />} />
          <Route path="/admin/sales-orders" element={<SalesOrders />} />
          

          {/* EXTRA */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />

          {/* 404 */}
          <Route path="*" element={<h2>Page Not Found</h2>} />

        </Routes>

        <Footer />

      </Router>
    </ProductProvider>
  );
}

export default App;