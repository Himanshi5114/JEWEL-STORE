import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Order = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cartItems")) || []);
  const [ordersPlaced, setOrdersPlaced] = useState(() => JSON.parse(localStorage.getItem("ordersPlaced")) || []);

  // Sync localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("ordersPlaced", JSON.stringify(ordersPlaced));
  }, [cartItems, ordersPlaced]);

  // Move Cart → Orders
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return alert("No items in cart.");
    const newOrders = [...ordersPlaced, ...cartItems.map(item => ({ ...item, placed: false }))];
    setOrdersPlaced(newOrders);
    setCartItems([]);
    alert("Cart items moved to Orders ✅");
  };

  const handleConfirmOrder = (index) => {
    const updated = [...ordersPlaced];
    updated[index].placed = true;
    setOrdersPlaced(updated);
  };

  const handleRemoveOrder = (index) => {
    const updated = [...ordersPlaced];
    updated.splice(index, 1);
    setOrdersPlaced(updated);
  };

  const handleRemoveCartItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f9f9f9" }}>
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
          <li><a href="/orders" style={{ textDecoration: "none", color: "#d6336c", fontWeight: "bold" }}>Orders</a></li>
          <li><a href="/wishlist" style={{ textDecoration: "none", color: "#000" }}>Wishlist</a></li>
          <li><a href="/contact" style={{ textDecoration: "none", color: "#000" }}>Contact</a></li>
        </ul>
      </header>

      {/* Cart Section */}
      <div style={{ flex: 1, padding: "40px" }}>
        <h2>Cart Items</h2>
        {cartItems.length === 0 ? <p>No items in cart.</p> : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {cartItems.map((item, index) => (
              <div key={index} style={{ border: "1px solid #ddd", borderRadius: "12px", width: "240px", padding: "12px", backgroundColor: "#fff" }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px" }} />
                <h4>{item.name}</h4>
                <p style={{ fontWeight: "bold" }}>₹{item.price}</p>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button 
                    onClick={() => handleRemoveCartItem(index)} 
                    style={{ padding: "6px 12px", backgroundColor: "#d6336c", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && <button onClick={handlePlaceOrder} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>Place Order</button>}

        {/* Orders Section */}
        <h2 style={{ marginTop: "50px" }}>Orders</h2>
        {ordersPlaced.length === 0 ? <p>No orders yet.</p> : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {ordersPlaced.map((item, index) => (
              <div key={index} style={{ border: "1px solid #ddd", borderRadius: "12px", width: "240px", padding: "12px", backgroundColor: "#fff" }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px" }} />
                <h4>{item.name}</h4>
                <p style={{ fontWeight: "bold" }}>₹{item.price}</p>

                <div style={{ display: "flex", gap: "5px" }}>
                  {!item.placed ? (
                    <>
                      <button onClick={() => handleConfirmOrder(index)} style={{ padding: "6px 12px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Confirm</button>
                      <button onClick={() => handleRemoveOrder(index)} style={{ padding: "6px 12px", backgroundColor: "#d6336c", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Remove</button>
                    </>
                  ) : (
                    <>
                      <p style={{ color: "green", fontWeight: "bold", margin: 0 }}>Placed ✅</p>
                      <button onClick={() => handleRemoveOrder(index)} style={{ padding: "6px 12px", backgroundColor: "#d6336c", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "5px" }}>Remove</button>
                    </>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{ backgroundColor: "#000", color: "#fff", textAlign: "center", padding: "25px 0", marginTop: "auto" }}>
        © 2025 Elegant Jewelry. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Order;

