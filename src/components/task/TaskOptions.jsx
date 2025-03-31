import { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import Overlay from '../ui/Overlay';
import '../../styles/components/task-options.css';

const TaskOptions = ({ task, filter, onClose, onEdit, onView }) => {
  const { toggleTaskCompleted, moveToTrash, restoreTask, deleteTask } = useTasks();
  
  const handleToggleStatus = () => {
    toggleTaskCompleted(task.id);
    onClose();
  };
  
  const handleMoveToTrash = () => {
    moveToTrash(task.id);
    onClose();
  };
  
  const handleRestore = () => {
    restoreTask(task.id);
    onClose();
  };
  
  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };
  
  const handleEdit = () => {
    onEdit(task);
    onClose();
  };
  
  const handleView = () => {
    onView(task);
    onClose();
  };

  return (
    <>
      <div className="options-dropdown">
        <button 
          className="option-item"
          onClick={handleView}
        >
          <span>View Details</span>
        </button>
        
        <button 
          className="option-item"
          onClick={handleEdit}
        >
          <span>Edit Task</span>
        </button>
        
        {filter !== 'trash' ? (
          <>
            <button 
              className="option-item"
              onClick={handleToggleStatus}
            >
              <span>{task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}</span>
            </button>
            <button 
              className="option-item delete"
              onClick={handleMoveToTrash}
            >
              <span>Delete</span>
            </button>
          </>
        ) : (
          <>
            <button 
              className="option-item"
              onClick={handleRestore}
            >
              <span>Restore</span>
            </button>
            <button 
              className="option-item delete"
              onClick={handleDelete}
            >
              <span>Delete Permanently</span>
            </button>
          </>
        )}
      </div>
      <Overlay onClick={onClose} />
    </>
  );
};

export default TaskOptions;