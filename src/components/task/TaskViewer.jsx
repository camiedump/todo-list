import { useState } from 'react';
import '../../styles/components/task-viewer.css';

const TaskViewer = ({ task, onClose, onEdit }) => {
  if (!task) return null;
  
  return (
    <>
      <div className="task-viewer-container">
        <div className="task-viewer">
          <div className="task-viewer-header">
            <div className="task-date-time">
              {task.date ? (
                <div className="task-date">{task.date}</div>
              ) : (
                <div className="task-date date-not-set">Date not set</div>
              )}
              <div className="task-time">{task.time}</div>
            </div>
            
            <button 
              className="close-button"
              onClick={onClose}
              aria-label="Close task details"
            >
              <div className="close-icon">×</div>
            </button>
          </div>
          
          <h2 className="task-title">{task.title}</h2>
          
          <div className="task-metadata">
            <div className="task-status">
              Status: <span className={task.completed ? "completed-status" : "pending-status"}>
                {task.completed ? "Completed" : "Pending"}
              </span>
            </div>
            

          </div>
          
          <div className="task-full-description">
            <h3>Description</h3>
            <p>{task.description || "No description provided."}</p>
          </div>
          
          <div className="task-viewer-actions">
            <button 
              className="edit-button action-button"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button 
              className="close-button action-button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="overlay" onClick={onClose}></div>
    </>
  );
};

export default TaskViewer;