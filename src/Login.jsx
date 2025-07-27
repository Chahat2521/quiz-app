import React, { useState, useContext } from "react";
import './App.css';
import './index.css';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaFacebookF, FaTwitter } from "react-icons/fa";
import { AuthContext } from "./AuthContext"; // ✅ Correct


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();
  setError('');
  axios.post('http://localhost:5000/api/login', { email, password })
    .then(result => {
      setUser(result.data.user); // ✅ updates AuthContext
      localStorage.setItem("user", JSON.stringify(result.data.user)); // ✅ store once
      navigate('/');
    })
    .catch(err => {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    });
};


  return (
    <div className="page-container">
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 rounded-t-full"></div>
      <div className="page-card">
        <h1 className="text-blue-900 text-center text-2xl mb-6 font-extrabold tracking-wide">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              name="email"
              className="input-field"
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && <span className="absolute right-4 top-4 text-green-500">✔</span>}
          </div>
          <div className="relative">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button-primary">Login</button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <p className="text-center text-blue-700 mt-4 text-sm cursor-pointer hover:underline">Forgot your password?</p>
        <p className="text-center text-blue-700 mt-8 mb-4 text-sm">or connect with</p>
        <div className="flex justify-center space-x-4">
          <button className="social-button social-facebook">
            <FaFacebookF /> <span>Facebook</span>
          </button>
          <button className="social-button social-twitter">
            <FaTwitter /> <span>Twitter</span>
          </button>
        </div>
        <p className="text-center text-blue-700 mt-6 text-sm">
          Don't have account? <Link to="/register" className="page-footer-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
