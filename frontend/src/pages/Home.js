import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Images
import logo from "../assets/logo.jpg";
import hero from "../assets/hero.jpg";
import bridalImg from "../assets/bridal1.jpg";
import everydayImg from "../assets/everyday1.jpg";
import luxuryImg from "../assets/luxury1.jpg";
import ringImg from "../assets/ring.jpg"; // Diamond Ring
import earringImg from "../assets/earring.jpg"; // Diamond Earring

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const unique = data.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.name === item.name)
        );
        setProducts(unique);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Add to Cart
  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    alert(`${item.name} added to cart 🛍️`);
  };

  // Add or Remove from Wishlist
  const toggleWishlist = (item) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isWishlisted = existingWishlist.find((p) => p.name === item.name);

    let updatedWishlist;
    if (isWishlisted) {
      updatedWishlist = existingWishlist.filter((p) => p.name !== item.name);
    } else {
      updatedWishlist = [...existingWishlist, item];
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  const isInWishlist = (name) =>
    wishlist.some((item) => item.name === name);

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="Elegant Jewelry Logo" className="logo-img" />
          <span className="brand-name">Elegant Jewelry</span>
        </div>
        <ul className="nav-links">
          <li><a href="/" className="active">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/collections">Collections</a></li>
          <li><a href="/orders">Orders</a></li>
          <li><a href="/wishlist">Wishlist</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img src={hero} alt="Hero Jewelry" className="hero-img" />
      </section>

      {/* Hero Panel */}
      <div className="hero-panel">
        <h1 className="hero-title">Elegant Jewelry</h1>
        <p className="hero-subtitle">Where timeless elegance meets modern design ✨</p>
        <p className="hero-subtitle">Discover our handpicked jewelry crafted for every occasion ✨</p>
        <button className="shop-btn" onClick={() => navigate("/collections")}>
          Explore Collection
        </button>
      </div>

      {/* Our Collections */}
      <section className="collections-section">
        <h2 className="collections-title">Our Collections</h2>
        <div className="collections-grid">
          <div className="collection-card">
            <img src={bridalImg} alt="Bridal Collection" />
            <div className="card-panel">
              <h3 className="collection-name">Bridal Collection</h3>
              <p className="collection-desc">
                Stunning jewelry for your special day — earrings, necklaces, rings, bracelets.
              </p>
              <button className="card-btn" onClick={() => navigate("/collections/bridal")}>
                Shop Now
              </button>
            </div>
          </div>

          <div className="collection-card">
            <img src={everydayImg} alt="Everyday Collection" />
            <div className="card-panel">
              <h3 className="collection-name">Everyday Collection</h3>
              <p className="collection-desc">
                Stylish and versatile pieces perfect for daily wear — lightweight, elegant, and timeless.
              </p>
              <button className="card-btn" onClick={() => navigate("/collections/everyday")}>
                Shop Now
              </button>
            </div>
          </div>

          <div className="collection-card">
            <img src={luxuryImg} alt="Luxury Collection" />
            <div className="card-panel">
              <h3 className="collection-name">Luxury Collection</h3>
              <p className="collection-desc">
                Exclusive and opulent jewelry for special occasions — crafted with premium materials and intricate designs.
              </p>
              <button className="card-btn" onClick={() => navigate("/collections/luxury")}>
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section
        className="collections-section"
        style={{ backgroundColor: "#fffaf5", padding: "40px 0" }}
      >
        <h2 className="collections-title">New Arrivals</h2>
        <div
          className="collections-grid"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* Diamond Ring */}
          <div
            className="collection-card"
            style={{ width: "320px", backgroundColor: "#fff", borderRadius: "16px", position: "relative" }}
          >
            {/* Heart icon */}
            <span
              onClick={() =>
                toggleWishlist({ name: "Diamond Ring", price: 18999, image: ringImg })
              }
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                fontSize: "26px",
                cursor: "pointer",
                color: isInWishlist("Diamond Ring") ? "red" : "#aaa",
                userSelect: "none",
              }}
            >
              ♥
            </span>
            <img
              src={ringImg}
              alt="Diamond Ring"
              style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "12px 12px 0 0" }}
            />
            <div className="card-panel">
              <h3 className="collection-name">Diamond Ring</h3>
              <p className="collection-desc">
                Elegant handcrafted diamond ring with luxurious shine and timeless beauty.
              </p>
              <p className="collection-price">₹18,999</p>
              <button
                className="card-btn"
                onClick={() =>
                  addToCart({ name: "Diamond Ring", price: 18999, image: ringImg })
                }
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Diamond Earring */}
          <div
            className="collection-card"
            style={{ width: "320px", backgroundColor: "#fff", borderRadius: "16px", position: "relative" }}
          >
            {/* Heart icon */}
            <span
              onClick={() =>
                toggleWishlist({ name: "Diamond Earring", price: 14499, image: earringImg })
              }
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                fontSize: "26px",
                cursor: "pointer",
                color: isInWishlist("Diamond Earring") ? "red" : "#aaa",
                userSelect: "none",
              }}
            >
              ♥
            </span>
            <img
              src={earringImg}
              alt="Diamond Earring"
              style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "12px 12px 0 0" }}
            />
            <div className="card-panel">
              <h3 className="collection-name">Diamond Earring</h3>
              <p className="collection-desc">
                Sparkling diamond earrings perfect for adding elegance to any look.
              </p>
              <p className="collection-price">₹14,499</p>
              <button
                className="card-btn"
                onClick={() =>
                  addToCart({ name: "Diamond Earring", price: 14499, image: earringImg })
                }
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>© 2025 Elegant Jewelry. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
