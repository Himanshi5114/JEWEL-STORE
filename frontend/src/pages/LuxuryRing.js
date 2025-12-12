import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.jpg";

const LuxuryRings = () => {
  const navigate = useNavigate();
  const [rings, setRings] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setRings(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        alert("Failed to load products from server!");
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter by name
  const filtered = rings.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Cart / Wishlist logic (localStorage)
  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    alert(`${item.name} added to Cart!`);
  };

  const handleBuyNow = (item) => {
    const orders = JSON.parse(localStorage.getItem("ordersPlaced")) || [];
    orders.push({ ...item, placed: false });
    localStorage.setItem("ordersPlaced", JSON.stringify(orders));
    alert(`${item.name} added to Orders!`);
    navigate("/orders");
  };

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

      {/* Search Bar */}
      <div className="search-bar" style={{ textAlign: "center", margin: "40px 0 20px 0" }}>
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
            outline: "none",
            fontSize: "15px",
          }}
        />
      </div>

      {/* Rings Section */}
      <section className="collections-section">
        <h2 className="collections-title" style={{ textAlign: "center", marginBottom: "30px" }}>
          Luxury Rings
        </h2>
        <div
          className="collections-grid"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "25px",
            paddingBottom: "40px",
          }}
        >
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
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
                  src={item.image}
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
                  <p style={{ fontSize: "14px", color: "#555" }}>{item.desc || "Beautiful handcrafted luxury ring."}</p>
                  <p style={{ fontWeight: "bold", color: "#d6336c" }}>₹{item.price}</p>
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "15px" }}>
                  <button
                    style={{
                      backgroundColor: "#d6336c",
                      color: "#fff",
                      padding: "8px 15px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>
                  <button
                    style={{
                      backgroundColor: "#d6336c",
                      color: "#fff",
                      padding: "8px 15px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    style={{
                      backgroundColor: "#d6336c",
                      color: "#fff",
                      padding: "8px 15px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleWishlist(item)}
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", fontSize: "16px" }}>No rings found!</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#000",
          color: "#fff",
          textAlign: "center",
          padding: "20px 0",
          marginTop: "50px",
        }}
      >
        <p>© 2025 Elegant Jewelry. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LuxuryRings;
