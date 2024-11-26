import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ updateRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      console.log('Logged in as:', user.role);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      updateRole(user.role); 
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'user') {
        navigate('/user-dashboard');
      } else if (user.role === 'manager') {
        navigate('/manager-dashboard');
      }
    } else {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
