import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import bridalImg from "../assets/bridal1.jpg";
import everydayImg from "../assets/everyday1.jpg";
import luxuryImg from "../assets/luxury1.jpg";

const Collections = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const collections = [
    {
      name: "Bridal Collection",
      img: bridalImg,
      desc: "Stunning jewelry for your special day — earrings, necklaces, and sets that capture love and elegance.",
      route: "/collections/bridal",
    },
    {
      name: "Everyday Collection",
      img: everydayImg,
      desc: "Stylish and versatile pieces perfect for daily wear — lightweight, elegant, and timeless.",
      route: "/collections/everyday",
    },
    {
      name: "Luxury Collection",
      img: luxuryImg,
      desc: "Exclusive and opulent jewelry for special occasions — crafted with premium materials and intricate designs.",
      route: "/collections/luxury",
    },
  ];

  const filteredCollections = collections.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="collections-page">
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

      {/* Collections Section */}
      <section className="collections-section">
        <h2 className="collections-title">Our Collections</h2>
        <p style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>
          Discover our curated collections — Bridal, Everyday, and Luxury — each crafted to reflect elegance, style, and timeless beauty.
        </p>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">Search</button>
        </div>

        <div className="collections-grid">
          {filteredCollections.map((c) => (
            <div className="collection-card" key={c.name}>
              <img src={c.img} alt={c.name} />
              <div className="card-panel">
                <h3 className="collection-name">{c.name}</h3>
                <p className="collection-desc">{c.desc}</p>
                <button className="card-btn" onClick={() => navigate(c.route)}>
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/orders">Orders</a>
          <a href="/wishlist">Wishlist</a>
          <a href="/contact">Contact</a>
        </div>
        <p>© 2025 Elegant Jewelry. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Collections;
