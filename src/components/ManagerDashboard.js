import React from 'react';
import './AdminNavbar.css'; // Assuming there's a CSS file for styling

const ManagerDashboard = () => {
  return (
    <div className="user-dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Manager Dashboard</h1>
        <p className="dashboard-description">
          Welcome to the Manager dashboard. Here you can manage your profile and view user-specific information.
        </p>
      </div>
    </div>
  );
};

export default ManagerDashboard;
