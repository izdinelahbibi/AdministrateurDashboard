// src/component/Sidebar.js
import React from 'react';

const Sidebar = ({ isOpen, handleShowUsers, handleShowUpload, handleLogout }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <h2>Panneau d'administration</h2>
            <ul>
                <li onClick={handleShowUsers}>Utilisateur</li>
                <li onClick={handleShowUpload}>Upload</li>
                <li>Analytics</li>
                <li onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>Logout</li>
            </ul>
        </div>
    );
};

export default Sidebar;
