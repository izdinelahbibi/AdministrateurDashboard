// ProfileForm.js
import React, { useState } from 'react';

const ProfileForm = () => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated data to backend
    fetch('http://localhost:3000/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newEmail, password: newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUpdateMessage('Profile updated successfully');
        } else {
          setUpdateMessage(data.error || 'Failed to update profile');
        }
      })
      .catch((err) => {
        setUpdateMessage('An error occurred');
        console.error(err);
      });
  };

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit}>
        <h3>Update Profile</h3>
        <label>Email:</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="New email"
        />
        
        <label>Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
        />

        <button type="submit">Update</button>
        {updateMessage && <p>{updateMessage}</p>}
      </form>
    </div>
  );
};

export default ProfileForm;
