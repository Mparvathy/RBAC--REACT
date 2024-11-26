import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Fetch existing users from localStorage or initialize an empty array if none exists
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Create new user object with status set to "active"
    const newUser = { 
      id: users.length + 1,  // Generate a unique ID
      username, 
      email, 
      password, 
      name,  // Store name
      phone,  // Store phone
      role, 
      status: role === 'user' ? 'active' : 'inactive' // Set status based on role
    };

    // Add the new user to the existing users array
    users.push(newUser);

    // Save updated users list back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Store the logged-in user in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));

    console.log('Registered successfully');
    navigate('/login'); // Navigate to the login page after registration
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone No:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
