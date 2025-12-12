import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 📦 Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Collections from "./pages/Collection";
import BridalCollection from "./pages/BridalCollection";
import EverydayCollection from "./pages/EverydayCollection";
import LuxuryCollection from "./pages/LuxuryCollection";
import BridalNecklace from "./pages/BridalNecklace";
import BridalEarring from "./pages/BridalEarring";
import BridalRing from "./pages/BridalRing";
import BridalBracelet from "./pages/BridalBracelet";
import EverydayNecklace from "./pages/EverydayNecklace";
import EverydayEarring from "./pages/EverydayEarring";
import EverydayRing from "./pages/EverydayRing";
import EverydayBracelet from "./pages/EverydayBracelet";
import LuxuryNecklace from "./pages/LuxuryNecklace";
import LuxuryEarring from "./pages/LuxuryEarring";
import LuxuryRing from "./pages/LuxuryRing";
import LuxuryBracelet from "./pages/LuxuryBracelet";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Contact from "./pages/Contact";

// 🆕 Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// 🔐 Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  // ❌ localStorage check hata diya, ab har refresh pe login chahiye
  const isAuthenticated = sessionStorage.getItem("user"); // temporary login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔐 Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🏠 Protected Main Pages */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections"
          element={
            <PrivateRoute>
              <Collections />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/bridal"
          element={
            <PrivateRoute>
              <BridalCollection />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/everyday"
          element={
            <PrivateRoute>
              <EverydayCollection />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/luxury"
          element={
            <PrivateRoute>
              <LuxuryCollection />
            </PrivateRoute>
          }
        />

        {/* 💍 Bridal */}
        <Route
          path="/collections/bridal/necklace"
          element={
            <PrivateRoute>
              <BridalNecklace />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/bridal/earring"
          element={
            <PrivateRoute>
              <BridalEarring />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/bridal/ring"
          element={
            <PrivateRoute>
              <BridalRing />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/bridal/bracelet"
          element={
            <PrivateRoute>
              <BridalBracelet />
            </PrivateRoute>
          }
        />

        {/* 🌸 Everyday */}
        <Route
          path="/collections/everyday/necklace"
          element={
            <PrivateRoute>
              <EverydayNecklace />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/everyday/earring"
          element={
            <PrivateRoute>
              <EverydayEarring />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/everyday/ring"
          element={
            <PrivateRoute>
              <EverydayRing />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/everyday/bracelet"
          element={
            <PrivateRoute>
              <EverydayBracelet />
            </PrivateRoute>
          }
        />

        {/* 💎 Luxury */}
        <Route
          path="/collections/luxury/necklace"
          element={
            <PrivateRoute>
              <LuxuryNecklace />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/luxury/earring"
          element={
            <PrivateRoute>
              <LuxuryEarring />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/luxury/ring"
          element={
            <PrivateRoute>
              <LuxuryRing />
            </PrivateRoute>
          }
        />
        <Route
          path="/collections/luxury/bracelet"
          element={
            <PrivateRoute>
              <LuxuryBracelet />
            </PrivateRoute>
          }
        />

        {/* 🛍️ Other Pages */}
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />

        {/* 🔁 Default route redirects to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
