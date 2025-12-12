import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

// Images
import earring1 from "../assets/luxury-earring1.jpg"; // Heart & Circle Drop-out, Pearl
import earring2 from "../assets/luxury-earring2.jpg"; // Blue stone in center, diamond covered
import earring3 from "../assets/luxury-earring3.jpg"; // Golden & White Diamond Loop

const LuxuryEarrings = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const earrings = [
    { 
      name: "Heart & Circle Drop-Out Earrings", 
      img: earring1,
      desc: "Elegant earrings featuring heart and circle drop-out design adorned with pearls.",
      price: "₹55,000"
    },
    { 
      name: "Blue Stone Diamond Earrings", 
      img: earring2,
      desc: "Stunning earrings with a blue stone centerpiece surrounded by sparkling diamonds.",
      price: "₹70,000"
    },
    { 
      name: "Golden White Diamond Loop Earrings", 
      img: earring3,
      desc: "Luxury golden earrings featuring a loop design embellished with white diamonds.",
      price: "₹85,000"
    },
  ];

  const filtered = earrings.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add to Cart
  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    alert(`${item.name} added to Cart!`);
  };

  // Buy Now → add to Orders
  const handleBuyNow = (item) => {
    const orders = JSON.parse(localStorage.getItem("ordersPlaced")) || [];
    orders.push({ ...item, placed: false });
    localStorage.setItem("ordersPlaced", JSON.stringify(orders));
    alert(`${item.name} added to Orders!`);
    navigate("/orders");
  };

  // Add to Wishlist
  const handleWishlist = (item) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
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
          placeholder="Search Earrings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px 20px", borderRadius: "25px", border: "2px solid #d6336c", width: "260px" }}
        />
      </div>

      {/* Earrings Grid */}
      <div className="collections-grid">
        {filtered.map((item, index) => (
          <div key={index} className="collection-card">
            <img src={item.img} alt={item.name} />
            <div className="card-panel">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>{item.price}</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  style={{ backgroundColor: "#d6336c", color: "#fff", padding: "8px 15px", borderRadius: "20px", border: "none", cursor: "pointer" }}
                  onClick={() => handleBuyNow(item)}
                >
                  Buy Now
                </button>
                <button
                  style={{ backgroundColor: "#d6336c", color: "#fff", padding: "8px 15px", borderRadius: "20px", border: "none", cursor: "pointer" }}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
                <button
                  style={{ backgroundColor: "#d6336c", color: "#fff", padding: "8px 15px", borderRadius: "20px", border: "none", cursor: "pointer" }}
                  onClick={() => handleWishlist(item)}
                >
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: "#000", color: "#fff", textAlign: "center", padding: "20px 0", marginTop: "50px" }}>
        <p>© 2025 Elegant Jewelry. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LuxuryEarrings;
