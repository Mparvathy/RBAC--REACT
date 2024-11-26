import React from 'react';
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Role-Based Access Control UI</h1>
      <h2 className="home-description">
        Role-Based Access Control (RBAC) is a method for restricting network access based on the roles of individual users. RBAC allows employees to access only the information they need to do their job. Employee roles in an organization determine the privileges granted to individuals and prevent lower-level employees from accessing sensitive information or performing higher-level tasks.
      </h2>
      <h2>
        In the role-based access control data model, roles are based on several factors, including authorizations, responsibilities, and job competency. This model allows businesses to specify whether individuals are end-users, administrators, or expert users. Additionally, a user’s access to computing resources may be restricted to certain operations, such as viewing, creating, or modifying files.
      </h2>
     
      <p>How Role-Based Access Control Works :</p>
      <p>Before implementing RBAC in an enterprise, the organization should define the permissions for each role as thoroughly as possible. This includes precisely defining permissions in the following areas:</p>
      <li>Permissions to modify data (e.g., read, write, full access)</li>
      <li>Permission to access company applications</li>
      <li>Permissions inside an application</li>
    </div>
    
  );
}

export default Home;
