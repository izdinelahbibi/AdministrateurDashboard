import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    if (!email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      // Mise à jour de l'URL pour correspondre à la route backendddd
      const response = await axios.post('http://localhost:3001/admin/login', { email, password });

      if (response.data.token) { // Vérification si un token est retourné
        // Sauvegarde du token dans localStorage/sessionStorage ou state
        localStorage.setItem('token', response.data.token);
        
        // Redirection vers le Dashboard de l'Admin
        navigate('/AdminDashboard');
      } else {
        alert(response.data.error || 'Email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      alert(error.response?.data?.error || 'Une erreur est survenue. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Connexion</h1>

      <input
        type="email"
        placeholder="Adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="login-button"
      >
        {loading ? <span className="loading-spinner"></span> : "Se connecter"}
      </button>

      <button
        onClick={() => navigate('/register')}
        className="login-link"
      >
        Pas de compte ? Inscrivez-vous
      </button>
    </div>
  );
};

export default Login;
