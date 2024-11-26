import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import UserNavbar from './components/UserNavbar';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import UserDashboard from './components/UserDashboard';
import Profile from './components/Profile';
import './App.css';
import ManagerDashboard from './components/ManagerDashboard';
import  ManagerNavbar from './components/ManagerNavbar'
import Task from './components/Task';
import Task1 from './components/Task1';


const App = () => {
  const [userRole, setUserRole] = useState(null); 
  const navigate = useNavigate(); 

  // This effect will run once when the component is mounted
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  // Function to update user role
  const updateRole = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  // Function to log out and clear the role
  const logout = () => {
    setUserRole(null); // Clear userRole from state
    localStorage.removeItem('userRole'); // Clear userRole from localStorage
    navigate('/'); // Navigate to the Home page after logout
  };

  // Conditionally render Navbar based on userRole
  const renderNavbar = () => {
    if (userRole === 'admin') {
      return <AdminNavbar logout={logout} />;
    } else if (userRole === 'user') {
      return <UserNavbar logout={logout} />;
    } else if (userRole === 'manager') {
      return <ManagerNavbar logout={logout} />;
    } else {
      return <Navbar/>; // Default Navbar for unauthenticated users
    }
  };

  return (
    <div>
      {/* Conditionally render Navbar based on the user's role */}
      {renderNavbar()}

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login updateRole={updateRole} />} />
          <Route path="/register" element={<Register />} />

          {/* Admin dashboard routes */}
          {userRole === 'admin' && (
            <>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin-dashboard/users" element={<UserManagement />} />
            
                </>
          )}
             {userRole === 'user' && (
            <>
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/task" element={<Task/>} />
            </>
            
          )}
          {userRole === 'manager' && (
            <>
              <Route path="/manager-dashboard" element={<ManagerDashboard />} />
              <Route path="/task1" element={<Task1/>} />
              <Route path="/addtask" element={<RoleManagement />} />
            </>
            
          )}
         
        </Routes>
      </div>
    </div>
  );
};

export default App;
