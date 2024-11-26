import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css'; // Import the CSS for the AdminNavbar

const AdminNavbar = ({logout}) => {
  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <Link to="/admin-dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin-dashboard/users">Manage Users</Link>
        </li>
            {/* Logout Link */}
        <li>
        <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
