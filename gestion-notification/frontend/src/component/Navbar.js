// Navbar.js
import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import './Navbar.css';

const Navbar = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="navbar">
      <h2>My Application</h2>
      <div className="profile-icon" onClick={toggleFormVisibility}>
        <img src="path_to_profile_icon.png" alt="Profile" />
      </div>
      {isFormVisible && (
        <div className="profile-form-container">
          <ProfileForm />
        </div>
      )}
    </div>
  );
};

export default Navbar;
