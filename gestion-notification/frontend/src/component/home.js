import React, { useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom"; // Utiliser useNavigate au lieu de useHistory

function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Utiliser useNavigate

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    // Appel à une API pour gérer la déconnexion
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include' // Assure l'envoi des cookies pour la session (si sessions sont utilisées)
    })
      .then((response) => {
        if (response.ok) {
          // Suppression des informations utilisateur locales (si elles sont stockées)
          // Redirection vers la page de login ou d'accueil
          navigate('/login'); // Utiliser navigate pour la redirection
        } else {
          console.error('Failed to logout');
        }
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <div className="home">
      <nav className="navbar">
        <div
          className="navbar-item"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Accueil
          {showDropdown && (
            <div className="dropdown">
              <button>Choix 1</button>
              <button>Choix 2</button>
              <button>Choix 3</button>
              <button>Choix 4</button>
            </div>
          )}
        </div>

        <div className="navbar-profile">
          <button className="profile-btn">Profil</button>
        </div>

        <div className="navbar-logout">
          {/* Ajout de la fonction de déconnexion */}
          <button className="logout-btn" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="student-space">
        <h1>Espace Étudiant</h1>
      </div>
    </div>
  );
}

export default Home;
