import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState(''); // New state for mobile number
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/admin/register', { 
        name, email, password, mobile_number: mobileNumber 
      });

      // Handle server response
      if (response.data.message) {
        navigate('/'); // Redirect to login page after successful registration
      } else {
        alert(response.data.error || 'Une erreur est survenue lors de l’inscription.');
      }
    } catch (error) {
      console.error('Erreur d’inscription:', error);
      alert(error.response?.data?.error || 'Une erreur est survenue. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Inscription</h1>

      <input
        type="text"
        placeholder="Nom d'administrateur"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="register-input"
      />

      <input
        type="email"
        placeholder="Adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="register-input"
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="register-input"
      />

      <input
        type="text"
        placeholder="Numéro de téléphone (facultatif)"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        className="register-input"
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        className="register-button"
      >
        {loading ? <span className="loading-spinner"></span> : "S'inscrire"}
      </button>

      <button
        onClick={() => navigate('/')}
        className="register-link"
      >
        Déjà un compte ? Connectez-vous
      </button>
    </div>
  );
};

export default Register;
