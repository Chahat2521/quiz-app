import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    axios.post(`${apiUrl}/api/register`, { name, email, password })
      .then(result => {
        setSuccess('Registration successful! Redirecting to Quiz...');
        setTimeout(() => {
          navigate('/login'); // Redirect to quiz page after signup
        }, 1500);
      })
      .catch(err => {
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Registration failed. Please try again.');
        }
      });
  };

  return (
    <div className="page-container">
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 rounded-t-full"></div>
      <div className="page-card">
        <h1 className="text-blue-900 text-center text-2xl mb-6 font-extrabold tracking-wide">Register</h1>
        {error && <p className="message-error">{error}</p>}
        {success && <p className="message-success">{success}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Name"
              autoComplete="off"
              name="name"
              className="input-field"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button type="submit" className="button-primary">
            Register
          </button>
        </form>

        <p className="text-center text-blue-700 mt-4 text-sm cursor-pointer hover:underline">
          Already have an account?
        </p>
        <p className="text-center text-blue-700 mt-2 text-sm">
          <Link to="/login" className="page-footer-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
