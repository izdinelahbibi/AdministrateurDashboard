import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login.js';
import Register from './component/Register.js';
import Home from './component/home.js';  // Importer le composant Home
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />  {/* Route pour la page Home */}
                  
                    {/* Redirigez l'utilisateur par défaut vers la page de connexion */}
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
