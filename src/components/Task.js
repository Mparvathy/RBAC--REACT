import React, { useState, useEffect } from 'react';
import './Task.css';

const AssignedTasks = () => {
  const [userTasks, setUserTasks] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));  // Get logged-in user from localStorage

  useEffect(() => {
    if (loggedInUser) {
      const fetchAssignedTasks = () => {
        // Fetch all tasks from localStorage (tasks assigned by both manager and admin)
        const allTasks = JSON.parse(localStorage.getItem('assignedTasks')) || [];

        // Filter tasks assigned to the logged-in user
        const userAssignedTasks = allTasks.filter(task => task.userId === loggedInUser.id);

        // Update the state with tasks for the logged-in user
        setUserTasks(userAssignedTasks);
      };

      fetchAssignedTasks();
    }
  }, [loggedInUser]);

  // Handle task completion toggle
  const handleMarkCompleted = (taskId) => {
    const updatedTasks = userTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    // Update the tasks in localStorage (for all users)
    const allTasks = JSON.parse(localStorage.getItem('assignedTasks')) || [];
    const updatedAllTasks = allTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    // Save the updated tasks back to localStorage
    localStorage.setItem('assignedTasks', JSON.stringify(updatedAllTasks));

    // Update local state
    setUserTasks(updatedTasks);
  };

  return (
    <div className="task-container">
      <h2>Your Tasks</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userTasks.length > 0 ? (
            userTasks.map(task => (
              <tr key={task.id}>
                <td>{task.task}</td>
                <td>{task.date}</td>
                <td>
                  <button onClick={() => handleMarkCompleted(task.id)}>
                    {task.completed ? '✔ Completed' : '✘ Not Completed'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No tasks assigned yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedTasks;
