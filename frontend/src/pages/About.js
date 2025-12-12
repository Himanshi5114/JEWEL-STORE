import React from "react";
import { Link, useNavigate } from "react-router-dom";
import aboutImg from "../assets/about.jpg";
import logoImg from "../assets/logo.jpg"; // Square logo

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Header */}
      <header className="site-header">
        <div className="logo">
          <img src={logoImg} alt="Elegant Jewelry Logo" />
          <span>Elegant Jewelry</span>
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about" className="active">About</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      {/* Main About Container */}
      <div className="about-container">
        <section className="about-section">
          <div className="about-image">
            <img src={aboutImg} alt="Elegant Jewelry" />
          </div>
          <div className="about-content">
            <h1>About Elegant Jewelry</h1>
            <p>
              Welcome to <strong>Elegant Jewelry</strong>, where beauty meets craftsmanship. 
              We create timeless pieces that tell stories of love, joy, and elegance.
            </p>
            <p>
              From Bridal to Everyday to Luxury collections, every jewel is crafted with precision and care.
            </p>
            <p>
              Our skilled artisans combine traditional techniques with modern designs, 
              ensuring every jewel is a masterpiece. Experience the luxury of elegance and style with our unique collections.
            </p>
            <p>
              Join our community of jewelry lovers and discover pieces that will become cherished heirlooms for generations.
            </p>

            {/* Explore Collections Button */}
            <button
              className="shop-btn"
              onClick={() => navigate("/collections")}
            >
              Explore Collections
            </button>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="extra-section">
          <h2>Why Choose Us?</h2>
          <p>
            At Elegant Jewelry, we believe in quality, authenticity, and uniqueness. 
            Every piece is ethically sourced, crafted with love, and designed to reflect your personal style.
          </p>
        </section>

        {/* Our Vision Section */}
        <section className="extra-section">
          <h2>Our Vision</h2>
          <p>
            Our vision is to redefine elegance in jewelry by creating timeless pieces that resonate with every generation. 
            We aim to bring sophistication, joy, and artistry to every customer experience.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="extra-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide exceptional jewelry that inspires confidence and beauty in every wearer. 
            We strive to innovate designs, maintain the highest quality standards, and create memorable experiences for our customers worldwide.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p>&copy; 2025 Elegant Jewelry. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default About;
