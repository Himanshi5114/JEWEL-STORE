import React, { useState } from "react";
import logo from "../assets/logo.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been received.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container" style={{ fontFamily: "sans-serif" }}>
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

      {/* Contact Section */}
      <section style={{ maxWidth: "700px", margin: "50px auto", padding: "20px" }}>
        <h2 style={{ textAlign: "center", color: "#d6336c", marginBottom: "30px" }}>Contact Us</h2>

        {/* Company Info */}
        <div style={{ marginBottom: "40px", textAlign: "center", color: "#555" }}>
          <p><strong>Address:</strong> Elegant Jewelry, 123 Luxury Lane, New Delhi, India</p>
          <p><strong>Phone:</strong> +91 99944 33219</p>
          <p><strong>Email:</strong> support@elegantjewelry.com</p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            style={{ padding: "10px 15px", borderRadius: "8px", border: "1px solid #d6336c", outline: "none" }}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            style={{ padding: "10px 15px", borderRadius: "8px", border: "1px solid #d6336c", outline: "none" }}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows="5"
            style={{ padding: "10px 15px", borderRadius: "8px", border: "1px solid #d6336c", outline: "none" }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#d6336c",
              color: "#fff",
              padding: "12px 25px",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#000", color: "#fff", textAlign: "center", padding: "20px 0", marginTop: "50px" }}>
        <p>© 2025 Elegant Jewelry. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
