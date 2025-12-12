import React, { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";
import "../App.css";

const Order = () => {
  // ✅ use same key as Home.js → "cart"
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [ordersPlaced, setOrdersPlaced] = useState(() => JSON.parse(localStorage.getItem("ordersPlaced")) || []);
  const [buyNowItems, setBuyNowItems] = useState(() => JSON.parse(localStorage.getItem("buyNowItems")) || []);

  // ✅ Sync localStorage automatically when any change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("ordersPlaced", JSON.stringify(ordersPlaced));
    localStorage.setItem("buyNowItems", JSON.stringify(buyNowItems));
  }, [cartItems, ordersPlaced, buyNowItems]);

  // ✅ Move Cart Items → Orders
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return alert("No items in cart.");
    const newOrders = [
      ...ordersPlaced,
      ...cartItems.map((item) => ({ ...item, placed: false })),
    ];
    setOrdersPlaced(newOrders);
    setCartItems([]);
    alert("Your cart items have been moved to Orders ✅");
  };

  // ✅ Handle direct Buy Now
  const handleBuyNow = (item) => {
    const newOrders = [...ordersPlaced, { ...item, placed: false }];
    setOrdersPlaced(newOrders);
    const updatedBuyNow = buyNowItems.filter((i) => i.name !== item.name);
    setBuyNowItems(updatedBuyNow);
    alert(`${item.name} added directly to Orders ✅`);
  };

  // ✅ Confirm Order
  const handleConfirmOrder = (index) => {
    const updated = [...ordersPlaced];
    updated[index].placed = true;
    setOrdersPlaced(updated);
  };

  // ✅ Remove Order
  const handleRemoveOrder = (index) => {
    const updated = [...ordersPlaced];
    updated.splice(index, 1);
    setOrdersPlaced(updated);
  };

  // ✅ Remove item from Cart
  const handleRemoveCartItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  // ✅ Styling
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px",
    width: "240px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  };

  const imgStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  };

  const btnStyle = {
    backgroundColor: "#d6336c",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
    fontSize: "14px",
  };

  const placeOrderBtn = {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 22px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div className="order-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* ✅ Header */}
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="Elegant Jewelry Logo" className="logo-img" />
          <h1 className="brand-name">Elegant Jewelry</h1>
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/collections">Collections</a></li>
          <li><a href="/orders" className="active">Orders</a></li>
          <li><a href="/wishlist">Wishlist</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </header>

      {/* ✅ Main Content */}
      <main style={{ flex: "1", padding: "40px 60px", backgroundColor: "#f9f9f9" }}>
        {/* 🛒 Cart Section */}
        <h2>Cart Items</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {cartItems.map((item, index) => (
              <div key={index} style={cardStyle}>
                <img src={item.image || item.img} alt={item.name} style={imgStyle} />
                <h4>{item.name}</h4>
                <p style={{ fontWeight: "bold" }}>₹{item.price}</p>
                <div>
                  <button style={btnStyle} onClick={() => handleRemoveCartItem(index)}>Remove</button>
                  <button style={btnStyle} onClick={() => handleBuyNow(item)}>Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div style={{ marginTop: "25px" }}>
            <button style={placeOrderBtn} onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        )}

        {/* 🛍️ Buy Now Section */}
        {buyNowItems.length > 0 && (
          <>
            <h2 style={{ marginTop: "50px" }}>Buy Now Items</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {buyNowItems.map((item, index) => (
                <div key={index} style={cardStyle}>
                  <img src={item.image || item.img} alt={item.name} style={imgStyle} />
                  <h4>{item.name}</h4>
                  <p style={{ fontWeight: "bold" }}>₹{item.price}</p>
                  <button style={btnStyle} onClick={() => handleBuyNow(item)}>Confirm Order</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 📦 Orders Section */}
        <h2 style={{ marginTop: "50px" }}>Orders</h2>
        {ordersPlaced.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {ordersPlaced.map((item, index) => (
              <div key={index} style={cardStyle}>
                <img src={item.image || item.img} alt={item.name} style={imgStyle} />
                <h4>{item.name}</h4>
                <p style={{ fontWeight: "bold" }}>₹{item.price}</p>

                {!item.placed ? (
                  <>
                    <button style={btnStyle} onClick={() => handleConfirmOrder(index)}>Confirm</button>
                    <button style={btnStyle} onClick={() => handleRemoveOrder(index)}>Remove</button>
                  </>
                ) : (
                  <>
                    <p style={{ color: "green", fontWeight: "bold" }}>Placed ✅</p>
                    <button style={btnStyle} onClick={() => handleRemoveOrder(index)}>Remove</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ✅ Footer */}
      <footer className="site-footer">
        <p>© 2025 Elegant Jewelry. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Order;
