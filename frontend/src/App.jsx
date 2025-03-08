import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auction from "./pages/Auction";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Categories from "./pages/Categories";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import LiveAuctions from "./pages/LiveAuctions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/liveauctions" element={isAuthenticated ? <LiveAuctions /> : <Navigate to="/login" />} />
        
        {/* 🔥 Fix: Add Missing Seller and Buyer Dashboard Routes */}
        <Route path="/seller-dashboard" element={isAuthenticated ? <SellerDashboard /> : <Navigate to="/login" />} />
        <Route path="/buyer-dashboard" element={isAuthenticated ? <BuyerDashboard /> : <Navigate to="/login" />} />

        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
