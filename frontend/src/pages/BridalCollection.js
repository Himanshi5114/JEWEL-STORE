import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Images
import logo from "../assets/logo.jpg";
import necklaceImg from "../assets/bridal-set1.jpg";
import earringImg from "../assets/bridal-earring1.jpg";
import ringImg from "../assets/bridal-ring1.jpg";
import braceletImg from "../assets/bridal-bracelet1.jpg";

const BridalCollection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const items = [
    { name: "Necklace", img: necklaceImg, path: "/collections/bridal/necklace" },
    { name: "Earring", img: earringImg, path: "/collections/bridal/earring" },
    { name: "Ring", img: ringImg, path: "/collections/bridal/ring" },
    { name: "Bracelet", img: braceletImg, path: "/collections/bridal/bracelet" },
  ];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="collection-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="Elegant Jewelry Logo" className="logo-img" />
          <span className="brand-name">Elegant Jewelry</span>
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/collections" className="active">Collections</a></li>
          <li><a href="/orders">Orders</a></li>
          <li><a href="/wishlist">Wishlist</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </header>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search Bridal Items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm("")}>Clear</button>
      </div>

      {/* Page Header */}
      <div className="hero-panel">
        <h1 className="hero-title">Bridal Collection</h1>
        <p className="hero-subtitle">
          Explore stunning bridal jewelry — necklaces, earrings, rings, bracelets.
        </p>
      </div>

      {/* Bridal Items */}
      <section className="collections-section">
        <div className="collections-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.name} className="collection-card">
                <img src={item.img} alt={item.name} />
                <div className="card-panel">
                  <h3 className="collection-name">{item.name}</h3>
                  <button
                    className="card-btn"
                    onClick={() => navigate(item.path)}
                  >
                    Explore
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%" }}>
              No items found.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>© 2025 Elegant Jewelry. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BridalCollection;
