
import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); // Utiliser useNavigate

  // Fonction pour rediriger vers la page de login
  const handleLogin = () => {
    navigate("/Login");
  };

  // Fonction pour rediriger vers la page d'enregistrement
  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <div className="home">
      <nav className="navbar">
        {/* Ajout du logo ISET KEBILI */}
        <div className="navbar-logo">
          <span>ISET KEBILI</span>
        </div>

        <div className="navbar-login-register">
          {/* Bouton pour rediriger vers la page de login */}
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          {/* Bouton pour rediriger vers la page de register */}
          <button className="register-btn" onClick={handleRegister}>
            Register
          </button>
        </div>
      </nav>

      <div className="student-space">
        <h1>BIENVENUE CHEZ ISET KEBILI</h1>
      </div>
    </div>
  );
}

export default Home;

