import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/user/sign-up", formData);

      if (response.data.status === "ERR") {
        setError(response.data.message);
        setSuccess("");
        toast.error(response.data.message); // Display error message with react-toastify
      } else {
        setSuccess("Đăng ký thành công!");
        setError("");
        toast.success("Đăng ký thành công!"); // Display success message with react-toastify
        setTimeout(() => {
          window.location.href = "/Login";
        }, 2000);
      }
    } catch (error) {
      setError("Lỗi đăng ký: " + error.message);
      setSuccess("");
      toast.error("Lỗi đăng ký: " + error.message); // Display error message with react-toastify
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
      <div className="card-left">
        <h1>TIBOX</h1>
        <p>Our redundancies other necessaries.</p>
        <span>Don't have an account?</span>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <ToastContainer /> {/* Include the ToastContainer component */}
    </div>
  );
};

export default Register;
