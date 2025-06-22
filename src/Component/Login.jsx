import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post(
        "https://tnp-recruitment-challenge.manitvig.live/login",
        formData
      );
      const { accessToken,refreshToken} = login.data;

      if (
        formData.username === "admin" &&
        formData.password === "admin" &&
        accessToken
      ) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("admin", "true");
        localStorage.setItem("refreshToken",refreshToken)
        localStorage.setItem("username", formData.username);
        navigate("/AdminPanelPage");
      } else {
        alert("Only admin can enter this protected route.");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
      setFormData({ username: "", password: "" });

    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          name="username"
          className="auth-ip"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          name="password"
          className="auth-ip"
          type="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
