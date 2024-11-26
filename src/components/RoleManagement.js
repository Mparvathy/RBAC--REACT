import React, { useState, useEffect } from 'react';
import './RoleManagement.css';

const loggedInUser = 'manager';  // Assuming the logged-in user is a manager

const RoleManagement = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    return storedUsers;
  });
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [taskInputs, setTaskInputs] = useState({});
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskValue, setEditingTaskValue] = useState('');  // For task editing

  const usersForTable = users.filter(user => user.role === 'user');

  const handleTaskSubmit = (userId, task) => {
    if (task?.trim()) {
      const newTask = { userId, task, date: new Date().toLocaleString(), completed: false, id: Date.now() };
      const updatedTasks = [...assignedTasks, newTask];

      // Update assigned tasks in localStorage
      localStorage.setItem('assignedTasks', JSON.stringify(updatedTasks));
      setAssignedTasks(updatedTasks);

      assignTaskToUser(userId, task);
      setTaskInputs(prevInputs => ({ ...prevInputs, [userId]: '' }));
    }
  };

  const handleTaskInputChange = (userId, value) => {
    setTaskInputs(prevInputs => ({ ...prevInputs, [userId]: value }));
  };

  const assignTaskToUser = (userId, task) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, task: task || 'No task assigned' } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleTaskRemove = (taskId) => {
    const updatedTasks = assignedTasks.filter(task => task.id !== taskId);
    setAssignedTasks(updatedTasks);
    localStorage.setItem('assignedTasks', JSON.stringify(updatedTasks));
  };

  const handleTaskEdit = (taskId) => {
    const taskToEdit = assignedTasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setEditingTaskId(taskId);
      setEditingTaskValue(taskToEdit.task);  // Set the current task value to the input
    }
  };

  const handleTaskUpdate = () => {
    if (editingTaskValue.trim() === '') return; // Ensure the updated task is not empty

    const updatedTasks = assignedTasks.map(task =>
      task.id === editingTaskId ? { ...task, task: editingTaskValue } : task
    );

    setAssignedTasks(updatedTasks);
    localStorage.setItem('assignedTasks', JSON.stringify(updatedTasks));
    setEditingTaskId(null);  // Clear editing mode
    setEditingTaskValue('');  // Clear the input field
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
    const storedTasks = JSON.parse(localStorage.getItem('assignedTasks')) || [];
    setAssignedTasks(storedTasks);
  }, []);

  const filteredAssignedTasks = assignedTasks.filter(task =>
    users.some(user => user.id === task.userId) && task.task && task.task.trim() !== ''
  );

  return (
    <div className="role-management">
      <h2>Role Management</h2>

      {/* User Table */}
      <div className="card">
        <h3>Users with 'user' or 'manager' roles</h3>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Assigned Task(s)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersForTable.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <ul>
                    {assignedTasks.filter(task => task.userId === user.id).map(task => (
                      <li key={task.id}>
                        {editingTaskId === task.id ? (
                          <div>
                            <input
                              type="text"
                              value={editingTaskValue}
                              onChange={(e) => setEditingTaskValue(e.target.value)}
                            />
                            <button onClick={handleTaskUpdate}>Save</button>
                          </div>
                        ) : (
                          <span>{task.task}</span>
                        )}
                        <button onClick={() => handleTaskEdit(task.id)}>Edit</button>
                        <button onClick={() => handleTaskRemove(task.id)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button onClick={() => {
                    setEditingTaskId(user.id);
                    setTaskInputs(prev => ({ ...prev, [user.id]: '' }));
                  }}>Add New Task</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Cards */}
      <div className="user-cards-container">
        {usersForTable.map(user => (
          <div className="user-card" key={user.id}>
            <p>Name: {user.name}</p>
            <p>Role: {user.role}</p>
            {loggedInUser === 'manager' && (
              <>
                <div className="task-assignment">
                  <label>ASSIGN Task</label>
                  <input
                    type="text"
                    placeholder={`Assign task to ${user.role}`}
                    value={taskInputs[user.id] || ''}
                    onChange={(e) => handleTaskInputChange(user.id, e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    if (taskInputs[user.id]?.trim() !== '') {
                      handleTaskSubmit(user.id, taskInputs[user.id]);
                    }
                  }}
                >
                  ADD TASK
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Assigned Tasks Table */}
      <div className="assigned-tasks-card">
        <h3>Assigned Tasks</h3>
        <table className="assigned-tasks-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Assigned Task</th>
              <th>Date Assigned</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignedTasks.length > 0 ? (
              filteredAssignedTasks.map((task, index) => {
                const user = users.find(user => user.id === task.userId);
                return (
                  <tr key={index}>
                    <td>{user?.name}</td>
                    <td>{user?.role}</td>
                    <td>
                      {editingTaskId === task.id ? (
                        <div>
                          <input
                            type="text"
                            value={editingTaskValue}
                            onChange={(e) => setEditingTaskValue(e.target.value)}
                          />
                          <button onClick={handleTaskUpdate}>Save</button>
                        </div>
                      ) : (
                        <span>{task.task}</span>
                      )}
                    </td>
                    <td>{task.date}</td>
                    <td>{task.completed ? 'Completed' : 'Not Completed'}</td>
                    <td>
                      {task.completed ? (
                        <span>Completed</span>
                      ) : (
                        <>
                          <button onClick={() => handleTaskEdit(task.id)}>Edit</button>
                          <button onClick={() => handleTaskRemove(task.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">No tasks assigned.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManagement;
