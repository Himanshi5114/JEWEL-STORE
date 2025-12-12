import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

// Images
import earring1 from "../assets/everyday-earring1.jpg";
import earring2 from "../assets/everyday-earring2.jpg";
import earring3 from "../assets/everyday-earring3.jpg";

const EverydayEarrings = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const earrings = [
    { 
      name: "Simple Gold Earrings", 
      img: earring1,
      desc: "Classic gold studs suitable for everyday wear.",
      price: "₹2,500"
    },
    { 
      name: "Pearl Drop Earrings", 
      img: earring2,
      desc: "Elegant pearl drop earrings, perfect for casual or office style.",
      price: "₹3,200"
    },
    { 
      name: "Silver Hoop Earrings", 
      img: earring3,
      desc: "Minimalist silver hoops for a chic everyday look.",
      price: "₹1,800"
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
              <p style={{ fontWeight: "bold" }}>{item.price}</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  style={{ backgroundColor: "#d6336c", color: "#fff", padding: "8px 15px", borderRadius: "20px", border: "none" }}
                  onClick={() => handleBuyNow(item)}
                >
                  Buy Now
                </button>
                <button
                  style={{ backgroundColor: "#d6336c", color: "#fff", padding: "8px 15px", borderRadius: "20px", border: "none" }}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
                <button
                  style={{ backgroundColor: "#d6336c", color: "#fff", padding: "8px 15px", borderRadius: "20px", border: "none" }}
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

export default EverydayEarrings;
