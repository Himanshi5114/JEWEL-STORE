import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DEV_EMAIL = "user@jewel.com";
const DEV_PASSWORD = "user1234";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 💎 Local developer login
    if (email === DEV_EMAIL && password === DEV_PASSWORD) {
      alert("✅ Logged in successfully!");
      const user = { email: DEV_EMAIL, name: "User" };
      sessionStorage.setItem("user", JSON.stringify(user)); // temporary login
      if (setIsLoggedIn) setIsLoggedIn(true);
      navigate("/");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ " + (data.message || "Login successful"));
        sessionStorage.setItem("user", JSON.stringify({ email })); // temporary login
        if (setIsLoggedIn) setIsLoggedIn(true);
        navigate("/");
      } else {
        alert("❌ " + (data.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server not reachable. Try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.registerText}>
          Don’t have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "25px",
    color: "#333",
    fontFamily: "Poppins, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    background: "#c79a55",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    transition: "0.3s",
  },
  registerText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#333",
  },
  link: {
    color: "#c79a55",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Login;
