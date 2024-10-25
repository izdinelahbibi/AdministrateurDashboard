// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/home'; // Importer la page Home
import Login from './component/Login'; // Importer la page Login
import Register from './component/Register'; // Importer la page Register
import EspaceEtudiant from './component/EspaceEtudiant'; // Importer la page Espace Etudiant

function App() {
  return (
    <Router>
      <Routes>
        {/* Route principale pour afficher Home par défaut */}
        <Route path="/" element={<Home />} />
        {/* Routes pour l'authentification */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {/* Route pour l'Espace Étudiant */}
        <Route path="/EspaceEtudiant" element={<EspaceEtudiant />} />
      </Routes>
    </Router>
  );
}

export default App;
