import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import UserProfile from "./pages/UserProfile";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Search from "./pages/Search";

import AdminRoute from "./admin/AdminRoute";
import AdminDashboard from "./admin/Pages/AdminDashboard";
import AdminProducts from "./admin/Pages/Products";
import Offers from "./admin/Pages/Offers";
import HeroSlider from "./admin/Pages/HeroSlider";
import Collections from "./admin/Pages/Collections";
import SalesOrders from "./admin/Pages/SalesOrders";

import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

import { ProductProvider } from "./admin/context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <Router>

        <Header />

        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* GUEST ROUTES */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <GuestRoute>
                <ForgotPassword />
              </GuestRoute>
            }
          />

          {/* USER PROFILE ROUTE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* USER PROTECTED ROUTES */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* PRODUCTS */}
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/offers"
            element={
              <AdminRoute>
                <Offers />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/hero-slider"
            element={
              <AdminRoute>
                <HeroSlider />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/collections"
            element={
              <AdminRoute>
                <Collections />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/sales-orders"
            element={
              <AdminRoute>
                <SalesOrders />
              </AdminRoute>
            }
          />

          {/* STATIC PAGES */}
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