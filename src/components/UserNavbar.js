import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css'; // Import the CSS for the AdminNavbar

const UserNavbar = ({logout}) => {
  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <Link to="/user-dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/task">My Task</Link>
        </li>
        <li>
        <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
