// src/component/Navbar.js
import React from 'react';

const Navbar = ({ toggleSidebar }) => {
    return (
        <div className="navbar">
            <span className="menu-icon" onClick={toggleSidebar}>&#9776;</span>
            <h1>Admin Dashboard</h1>
        </div>
    );
};

export default Navbar;
