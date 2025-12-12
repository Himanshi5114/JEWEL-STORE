import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

// Images
import bracelet1 from "../assets/luxury-bracelet1.jpg"; // Pink golden-ish
import bracelet2 from "../assets/luxury-bracelet2.jpg"; // Golden lock, bee-hive
import bracelet3 from "../assets/luxury-bracelet3.jpg"; // Red ruby + diamond golden chain

const LuxuryBracelets = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const bracelets = [
    { 
      name: "Pink Golden Luxury Bracelet", 
      img: bracelet1,
      desc: "Elegant bracelet with pink golden hues, adding a luxurious touch to your ensemble.",
      price: "₹1,25,000"
    },
    { 
      name: "Golden Lock Bee-Hive Bracelet", 
      img: bracelet2,
      desc: "Unique golden bracelet with a lock and bee-hive inspired design, perfect for statement elegance.",
      price: "₹95,000"
    },
    { 
      name: "Red Ruby & Diamond Golden Bracelet", 
      img: bracelet3,
      desc: "Luxury golden bracelet adorned with sparkling diamonds and a vibrant red ruby centerpiece.",
      price: "₹1,50,000"
    },
  ];

  const filtered = bracelets.filter((item) =>
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
          placeholder="Search Bracelets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px 20px", borderRadius: "25px", border: "2px solid #d6336c", width: "260px" }}
        />
      </div>

      {/* Luxury Bracelet Grid */}
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

export default LuxuryBracelets;
