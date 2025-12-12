import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

// Images for rings
import ring1 from "../assets/luxury-ring1.jpg";
import ring2 from "../assets/luxury-ring2.jpg";
import ring3 from "../assets/luxury-ring3.jpg";

const LuxuryRings = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Rings data (static, like your necklaces)
  const rings = [
    {
      name: "Red Ruby Gold Ring",
      img: ring1,
      desc: "Elegant gold ring set with vibrant red rubies and diamonds.",
      price: "₹80,000",
    },
    {
      name: "Emerald Diamond Ring",
      img: ring2,
      desc: "Luxurious ring with green emerald and sparkling diamonds.",
      price: "₹95,000",
    },
    {
      name: "White Diamond & Sapphire Ring",
      img: ring3,
      desc: "Exquisite white diamond ring with a stunning sapphire centerpiece.",
      price: "₹1,10,000",
    },
  ];

  // Filter by search
  const filtered = rings.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Safe localStorage helper
  const safeGet = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      localStorage.removeItem(key);
      return [];
    }
  };

  // Cart / Wishlist / Buy Now functions
  const handleAddToCart = (item) => {
    const cart = safeGet("cartItems");
    if (!cart.find((i) => i.name === item.name)) {
      cart.push(item);
      localStorage.setItem("cartItems", JSON.stringify(cart));
      alert(`${item.name} added to Cart!`);
    } else {
      alert(`${item.name} is already in Cart!`);
    }
  };

  const handleBuyNow = (item) => {
    const orders = safeGet("ordersPlaced");
    if (!orders.find((i) => i.name === item.name)) {
      orders.push({ ...item, placed: false });
      localStorage.setItem("ordersPlaced", JSON.stringify(orders));
    }
    alert(`${item.name} added to Orders!`);
    navigate("/orders");
  };

  const handleWishlist = (item) => {
    const wishlist = safeGet("wishlistItems");
    if (!wishlist.find((i) => i.name === item.name)) {
      wishlist.push(item);
      localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
      alert(`${item.name} added to Wishlist!`);
    } else {
      alert(`${item.name} is already in Wishlist!`);
    }
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="Elegant Jewelry Logo" className="logo-img" />
          <span className="brand-name">Elegant Jewelry</span>
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/collections">Collections</a></li>
          <li><a href="/orders">Orders</a></li>
          <li><a href="/wishlist">Wishlist</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </header>

      {/* Search */}
      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <input
          type="text"
          placeholder="Search Rings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 20px",
            borderRadius: "25px",
            border: "2px solid #d6336c",
            width: "260px",
          }}
        />
      </div>

      {/* Rings Grid */}
      <div
        className="collections-grid"
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "25px" }}
      >
        {filtered.map((item, index) => (
          <div
            key={index}
            className="collection-card"
            style={{
              border: "1px solid #ddd",
              borderRadius: "15px",
              width: "270px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={item.img}
              alt={item.name}
              style={{ width: "100%", height: "230px", borderRadius: "12px", objectFit: "cover" }}
            />
            <h3>{item.name}</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>{item.desc}</p>
            <p style={{ fontWeight: "bold", color: "#d6336c" }}>{item.price}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => handleBuyNow(item)}
                style={{ backgroundColor: "#d6336c", color: "#fff", padding: "8px 15px", borderRadius: "20px", border: "none", cursor: "pointer" }}
              >
                Buy Now
              </button>
              <button
                onClick={() => handleAddToCart(item)}
                style={{ backgroundColor: "#d6336c", color: "#fff", padding: "8px 15px", borderRadius: "20px", border: "none", cursor: "pointer" }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleWishlist(item)}
                style={{ backgroundColor: "#d6336c", color: "#fff", padding: "8px 15px", borderRadius: "20px", border: "none", cursor: "pointer" }}
              >
                Wishlist
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ textAlign: "center" }}>No rings found!</p>}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: "#000", color: "#fff", textAlign: "center", padding: "20px 0", marginTop: "50px" }}>
        <p>© 2025 Elegant Jewelry. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LuxuryRings;
