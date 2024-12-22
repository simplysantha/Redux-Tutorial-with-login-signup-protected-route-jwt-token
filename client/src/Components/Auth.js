import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../Redux/Action/AuthActions";
import "./CSS/Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!email || !password || (!isLogin && (!confirmPassword || !name))) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      if (isLogin) {
        // Dispatch login action
        dispatch(loginUser({ email, password }, navigate, toast));
      } else {
        // Dispatch register action
        dispatch(
          registerUser({ name, email, password }, toast, () => {
            setIsLogin(true);
          })
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? "Login" : "Signup"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          <button type="submit" className="btn-submit">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
        <button onClick={switchMode} className="btn-switch">
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
