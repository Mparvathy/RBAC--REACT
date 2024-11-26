import React, { useState, useEffect } from 'react';
import './UserManagement.css'; // Import the CSS file

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'user', status: 'active', username: '', password: '' });
  const [formError, setFormError] = useState('');
  const [activeCard, setActiveCard] = useState('add');
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const addUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.username || !newUser.password) {
      setFormError('All fields are required.');
      return;
    }

    // Add new user to the list
    const updatedUsers = [...users, { ...newUser, id: users.length + 1 }];
    setUsers(updatedUsers);

    // Update localStorage with the new list of users
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Reset the form after adding the user
    setNewUser({ name: '', email: '', phone: '', role: 'user', status: 'active', username: '', password: '' });
    setFormError('');

    // Switch to User List view after adding a user
    setActiveCard('list');
  };

  const deleteUser = (id) => {
    // Filter out the user to be deleted
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);

    // Update localStorage with the updated list of users
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const startEditingUser = (user) => {
    // Set the user data to be edited
    setEditingUser(user);
    setNewUser({ ...user });  // Populate the form with the current user's details
    setActiveCard('add'); // Switch to the "Add User" card to reuse the form
  };

  const saveEditedUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.username || !newUser.password) {
      setFormError('All fields are required.');
      return;
    }

    // Update the user in the list without adding a new one
    const updatedUsers = users.map(user =>
      user.id === editingUser.id ? { ...newUser } : user
    );
    setUsers(updatedUsers);

    // Update localStorage with the updated list of users
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Reset the form after saving the user
    setNewUser({ name: '', email: '', phone: '', role: 'user', status: 'active', username: '', password: '' });
    setFormError('');

    // Switch to User List view after saving the user
    setActiveCard('list');
    setEditingUser(null);  // Reset the editing state
  };

  const toggleStatus = (id) => {
    // Toggle the status between active and inactive
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    );
    setUsers(updatedUsers);

    // Update localStorage with the updated list of users
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>

      {/* Toggle Buttons */}
      <div className="card-toggle">
        <div
          className={`card-header ${activeCard === 'add' ? 'active' : ''}`}
          onClick={() => {
            setActiveCard('add');
            setNewUser({ name: '', email: '', phone: '', role: 'user', status: 'active', username: '', password: '' });  // Reset the form for a new user
          }}
        >
          Add User
        </div>
        <div
          className={`card-header ${activeCard === 'list' ? 'active' : ''}`}
          onClick={() => setActiveCard('list')}
        >
          User List
        </div>
      </div>

      {/* Add/Edit User Card */}
      <div className={`card ${activeCard === 'add' ? 'active' : ''}`}>
        <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
        <form onSubmit={editingUser ? saveEditedUser : addUser} className="form">
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleNewUserChange}
              placeholder="Enter name"
            />
          </div>
          <div className="input-group">
            <label>UserName:</label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleNewUserChange}
              placeholder="Enter Username"
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleNewUserChange}
              placeholder="Enter password"
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleNewUserChange}
              placeholder="Enter email"
            />
          </div>
          <div className="input-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={newUser.phone}
              onChange={handleNewUserChange}
              placeholder="Enter phone number"
            />
          </div>
          <div className="input-group">
            <label>Role:</label>
            <select name="role" value={newUser.role} onChange={handleNewUserChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div className="input-group">
            <label>Status:</label>
            <select name="status" value={newUser.status} onChange={handleNewUserChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn">
            {editingUser ? 'Save Changes' : 'Add User'}
          </button>
        </form>
        {formError && <p className="error">{formError}</p>}
      </div>

      {/* User List Card */}
      <div className={`card ${activeCard === 'list' ? 'active' : ''}`}>
        <h3>User List</h3>
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render only users with role "manager" or "user" */}
              {users.filter(user => user.role === 'manager' || user.role === 'user').map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
                  <td>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</td>
                  <td>
                    <button onClick={() => startEditingUser(user)} className="btn btn-edit">Edit</button>
                    <button onClick={() => deleteUser(user.id)} className="btn btn-delete">Delete</button>
                    <button onClick={() => toggleStatus(user.id)} className="btn btn-toggle">
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
