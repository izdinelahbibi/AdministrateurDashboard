// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/home'; // Importer la page Home
import Login from './component/Login'; // Importer la page Login
import Register from './component/Register'; // Importer la page Register

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
      </Routes>
    </Router>
  );
}

export default App;
