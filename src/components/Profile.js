import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // The updated CSS file for styling

const Profile = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const navigate = useNavigate();
  
  if (!loggedInUser) {
    navigate('/login');
    return null; 
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>
        <div className="profile-details">
          <p><strong>Username:</strong> {loggedInUser.username}</p>
          <p><strong>Name:</strong> {loggedInUser.name}</p>
          <p><strong>Email:</strong> {loggedInUser.email}</p>
          <p><strong>Phone:</strong> {loggedInUser.phone}</p>
          <p><strong>Role:</strong> {loggedInUser.role}</p>
          <p><strong>Status:</strong> {loggedInUser.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
