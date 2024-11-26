import React from 'react';
import './AdminNavbar.css'; // Assuming there's a CSS file for styling

const AdminDashboard = () => {
  return (
    <div className="user-dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-description">
          Welcome to the Admin dashboard. Here you can manage your profile and view user-specific information.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
