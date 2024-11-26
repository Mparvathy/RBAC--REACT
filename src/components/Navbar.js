// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">RBAC</Link>
                <div className="navbar-links">
                    <Link to="/login" className="navbar-link">LOGIN</Link>
                    <Link to="/register" className="navbar-link">REGISTER</Link>
                    <li>
        </li>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
