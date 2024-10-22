import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'; // Optionally include this for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    // Send login data to the backend
    fetch('http://localhost:3000/login', { // Adjust this URL based on your backend setup
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Reset errors and redirect to home page after successful login
          setError('');
          navigate('/home'); // Adjust this path based on your routing
        }
      })
      .catch((err) => {
        setError('An error occurred during login');
        console.error(err);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Login</button>

        {/* Link to register page */}
        <p className="register-link">
          Don't have an account? <a href="/register">Sign up here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
