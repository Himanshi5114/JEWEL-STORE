import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState(
    () => JSON.parse(localStorage.getItem("wishlistItems")) || []
  );
  const [ordersPlaced, setOrdersPlaced] = useState(
    () => JSON.parse(localStorage.getItem("ordersPlaced")) || []
  );

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    localStorage.setItem("ordersPlaced", JSON.stringify(ordersPlaced));
  }, [wishlistItems, ordersPlaced]);

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (!cart.find((i) => i.name === item.name)) {
      cart.push(item);
      localStorage.setItem("cartItems", JSON.stringify(cart));
      alert(`${item.name} added to Cart 🛒`);
    } else {
      alert(`${item.name} is already in your Cart.`);
    }
  };

  const handleShopNow = (item) => {
    const updatedOrders = [...ordersPlaced, { ...item, placed: false }];
    setOrdersPlaced(updatedOrders);
    localStorage.setItem("ordersPlaced", JSON.stringify(updatedOrders));

    const updatedWishlist = wishlistItems.filter((i) => i.name !== item.name);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));

    alert(`${item.name} moved to Orders ✅`);
    navigate("/orders");
  };

  const handleRemove = (itemName) => {
    const updatedWishlist = wishlistItems.filter((i) => i.name !== itemName);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#fffaf5" }}>
      {/* Navbar */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", backgroundColor: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ height: "55px", marginRight: "12px" }} />
          <span style={{ fontWeight: "bold", fontSize: "24px", color: "#d6336c" }}>Elegant Jewelry</span>
        </div>
        <ul style={{ display: "flex", gap: "25px", listStyle: "none", fontWeight: 500, margin: 0, padding: 0 }}>
          <li><a href="/" style={{ textDecoration: "none", color: "#000" }}>Home</a></li>
          <li><a href="/about" style={{ textDecoration: "none", color: "#000" }}>About</a></li>
          <li><a href="/collections" style={{ textDecoration: "none", color: "#000" }}>Collections</a></li>
          <li><a href="/orders" style={{ textDecoration: "none", color: "#000" }}>Orders</a></li>
          <li><a href="/wishlist" style={{ textDecoration: "none", color: "#d6336c", fontWeight: "bold" }}>Wishlist</a></li>
          <li><a href="/contact" style={{ textDecoration: "none", color: "#000" }}>Contact</a></li>
        </ul>
      </header>

      {/* Wishlist Section */}
      <div style={{ flex: 1, padding: "50px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "25px", color: "#333" }}>💖 Your Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p>No items in your Wishlist.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "25px" }}>
            {wishlistItems.map((item, index) => (
              <div key={index} style={{ border: "1px solid #ddd", borderRadius: "12px", width: "250px", padding: "12px", backgroundColor: "#fff", boxShadow: "0 3px 8px rgba(0,0,0,0.08)" }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }} />
                <h4>{item.name}</h4>
                <p style={{ fontWeight: "bold", color: "#555" }}>₹{item.price}</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "5px", flexWrap: "wrap" }}>
                  <button onClick={() => handleShopNow(item)} style={{ backgroundColor: "#d6336c", color: "#fff", padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer" }}>Shop Now</button>
                  <button onClick={() => handleAddToCart(item)} style={{ backgroundColor: "#6c757d", color: "#fff", padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer" }}>Add to Cart</button>
                  <button onClick={() => handleRemove(item.name)} style={{ backgroundColor: "#ff4d4d", color: "#fff", padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer" }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: "#000", color: "#fff", textAlign: "center", padding: "25px 0", marginTop: "auto" }}>
        © 2025 Elegant Jewelry. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Wishlist;
