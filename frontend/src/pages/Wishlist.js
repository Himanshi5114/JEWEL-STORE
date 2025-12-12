import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Wishlist = () => {
  const navigate = useNavigate();

  // ✅ Get wishlist & orders from localStorage
  const [wishlistItems, setWishlistItems] = useState(() =>
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [ordersPlaced, setOrdersPlaced] = useState(() =>
    JSON.parse(localStorage.getItem("ordersPlaced")) || []
  );

  // ✅ Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    localStorage.setItem("ordersPlaced", JSON.stringify(ordersPlaced));
  }, [wishlistItems, ordersPlaced]);

  // ✅ Add item to cart
  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyInCart = cart.some((i) => i.name === item.name);
    if (!alreadyInCart) {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${item.name} added to Cart 🛒`);
    } else {
      alert(`${item.name} is already in your Cart.`);
    }
  };

  // ✅ Move directly to Orders
  const handleShopNow = (item) => {
    const currentOrders = JSON.parse(localStorage.getItem("ordersPlaced")) || [];
    const updatedOrders = [...currentOrders, { ...item, placed: false }];
    localStorage.setItem("ordersPlaced", JSON.stringify(updatedOrders));
    setOrdersPlaced(updatedOrders);

    const updatedWishlist = wishlistItems.filter((i) => i.name !== item.name);
    setWishlistItems(updatedWishlist);

    alert(`${item.name} moved to Orders ✅`);
    navigate("/orders");
  };

  // ✅ Remove from Wishlist
  const handleRemove = (index) => {
    const updated = [...wishlistItems];
    updated.splice(index, 1);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // 💅 Styles
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "12px",
    width: "250px",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const imgStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  };

  const btnStyle = {
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "5px 4px",
    fontSize: "14px",
    transition: "all 0.3s",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#fffaf5",
      }}
    >
      {/* ✅ Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Elegant Jewelry Logo"
            style={{ height: "55px", marginRight: "12px" }}
          />
          <span
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              color: "#d6336c",
            }}
          >
            Elegant Jewelry
          </span>
        </div>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "25px",
            fontWeight: "500",
          }}
        >
          <li><a href="/" style={{ textDecoration: "none", color: "#000" }}>Home</a></li>
          <li><a href="/about" style={{ textDecoration: "none", color: "#000" }}>About</a></li>
          <li><a href="/collections" style={{ textDecoration: "none", color: "#000" }}>Collections</a></li>
          <li><a href="/orders" style={{ textDecoration: "none", color: "#000" }}>Orders</a></li>
          <li><a href="/wishlist" style={{ textDecoration: "none", color: "#d6336c", fontWeight: "bold" }}>Wishlist</a></li>
          <li><a href="/contact" style={{ textDecoration: "none", color: "#000" }}>Contact</a></li>
        </ul>
      </header>

      {/* ✅ Wishlist Section */}
      <div style={{ flex: 1, padding: "50px 40px" }}>
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "25px",
            color: "#333",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          💖 Your Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            No items in your Wishlist.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "25px",
              justifyContent: "center",
            }}
          >
            {wishlistItems.map((item, index) => (
              <div
                key={index}
                style={cardStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.08)";
                }}
              >
                <img
                  src={item.image || item.img}
                  alt={item.name}
                  style={imgStyle}
                />
                <h4 style={{ margin: "10px 0 5px", color: "#222" }}>{item.name}</h4>
                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#555",
                  }}
                >
                  ₹{item.price}
                </p>

                <div>
                  <button
                    style={{ ...btnStyle, backgroundColor: "#d6336c" }}
                    onClick={() => handleShopNow(item)}
                  >
                    Shop Now
                  </button>
                  <button
                    style={{ ...btnStyle, backgroundColor: "#6c757d" }}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    style={{ ...btnStyle, backgroundColor: "#ff4d4d" }}
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Footer */}
      <footer
        style={{
          backgroundColor: "#000",
          color: "#fff",
          textAlign: "center",
          padding: "25px 0",
          marginTop: "auto",
        }}
      >
        <p style={{ margin: 0, fontSize: "16px" }}>
          © 2025 Elegant Jewelry. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Wishlist;
