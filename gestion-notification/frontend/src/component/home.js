import React, { useState } from "react";
import "./home.css";

function Home() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
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
      </nav>

      <div className="student-space">
        <h1>Espace Étudiant</h1>
      </div>
    </div>
  );
}

export default Home;
