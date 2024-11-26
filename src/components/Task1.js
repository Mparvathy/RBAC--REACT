import React, { useState, useEffect } from 'react';
import './Task.css';

const AssignedTasks = () => {
  const [userTasks, setUserTasks] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); 

  useEffect(() => {
    if (loggedInUser) {
      const fetchAssignedTasks = () => {
        // Retrieve the assigned tasks for the logged-in user from localStorage
        const allTasks = JSON.parse(localStorage.getItem('assignedTasks')) || [];
        const userTasks = allTasks.filter(task => task.userId === loggedInUser.id);

        // Update state with tasks specific to the logged-in user
        setUserTasks(userTasks);
      };

      fetchAssignedTasks();
    }
  }, [loggedInUser]);

  const handleMarkCompleted = (taskId) => {
    // Mark the task as completed
    const updatedTasks = userTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    // Update localStorage with the updated tasks
    const allTasks = JSON.parse(localStorage.getItem('assignedTasks')) || [];
    const updatedAllTasks = allTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem('assignedTasks', JSON.stringify(updatedAllTasks));

    // Update state with the new task list
    setUserTasks(updatedTasks);
  };

  return (
    <div className="assigned-tasks-container">
      <h3>Assigned Tasks</h3>
      {userTasks.length > 0 ? (
        <table className="assigned-tasks-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Date Assigned</th>
              <th>Mark Completed</th> {/* New column for completion status */}
              <th>Status</th> {/* New column for status */}
            </tr>
          </thead>
          <tbody>
            {userTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.task}</td>
                <td>{task.date}</td>
                <td>
                  {/* Checkbox to mark the task as completed */}
                  <input
                    type="checkbox"
                    checked={task.completed || false}
                    onChange={() => handleMarkCompleted(task.id)}
                  />
                </td>
                <td>{task.completed ? 'Completed' : 'Not Completed'}</td> {/* Display status */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks assigned yet.</p>
      )}
    </div>
  );
};

export default AssignedTasks;
