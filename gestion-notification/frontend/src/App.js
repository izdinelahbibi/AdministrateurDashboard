// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/auth admin/Login'; 
import Register from './component/auth admin/Register'; 
import AdminDashboard from './component/AdminDashboard'; 
import FileUpload from './component/FileUpload'; 
import ProfilSetting from './component/ProfilSetting'; // Make sure this import path is correct

function App() {
    return (
        <Router>
            <div> {/* Wrapper div for the Router */}
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/AdminDashboard" element={<AdminDashboard />} />
                    <Route path="/FileUpload" element={<FileUpload />} />
                    <Route path="/profil/:id" element={<ProfilSetting />} />  {/* Route for Profile Editing */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
