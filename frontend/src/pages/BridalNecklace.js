import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import necklace1 from "../assets/bridal-set1.jpg"; // Red & Gold
import necklace2 from "../assets/bridal-set2.jpg"; // White & Green
import necklace3 from "../assets/bridal-set3.jpg"; // Pearl

const BridalNecklace = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const necklaces = [
    { 
      name: "Royal Red & Gold Necklace", 
      img: necklace1,
      desc: "Intricately designed golden necklace adorned with deep red stones, perfect for a regal bridal look.",
      price: "₹45,000"
    },
    { 
      name: "Emerald & Pearl White Necklace", 
      img: necklace2,
      desc: "Elegant white beads with green accents, combining purity and tradition for your special day.",
      price: "₹38,000"
    },
    { 
      name: "Classic Pearl Bridal Necklace", 
      img: necklace3,
      desc: "Timeless pearl necklace with a sophisticated design, ideal for a graceful bridal appearance.",
      price: "₹50,000"
    },
  ];

  const filtered = necklaces.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    alert(`${item.name} added to Cart!`);
  };

  const handleBuyNow = (item) => {
    const orders = JSON.parse(localStorage.getItem("ordersPlaced")) || [];
    orders.push(item);
    localStorage.setItem("ordersPlaced", JSON.stringify(orders));
    alert(`${item.name} added to Orders!`);
    navigate("/orders");
  };

  const handleWishlist = (item) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    if (!wishlist.find(i => i.name === item.name)) {
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

      {/* Search Bar */}
      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <input
          type="text"
          placeholder="Search Necklaces..."
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

      {/* Product Cards */}
      <section className="collections-section">
        <h2 className="collections-title" style={{ textAlign: "center", marginBottom: "30px" }}>
          Bridal Necklaces
        </h2>
        <div className="collections-grid" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "25px", paddingBottom: "40px" }}>
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
                transition: "transform 0.3s",
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "230px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
              <div style={{ marginTop: "10px" }}>
                <h3>{item.name}</h3>
                <p style={{ fontSize: "14px", color: "#555" }}>{item.desc}</p>
                <p style={{ fontWeight: "bold", color: "#d6336c" }}>{item.price}</p>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "15px" }}>
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
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#000", color: "#fff", textAlign: "center", padding: "20px 0", marginTop: "auto" }}>
        <p>© 2025 Elegant Jewelry. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BridalNecklace;
