import { useState } from 'react';
import TaskOptions from './TaskOptions';
import '../../styles/components/task-card.css';

const TaskCard = ({ task, filter, onClick }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionsToggle = (e) => {
    e.stopPropagation(); // Prevent card click when clicking options
    setShowOptions(!showOptions);
  };

  const handleCardClick = () => {
    if (typeof onClick === 'function') {
      onClick(task);
    }
  };

  return (
    <div 
      className="task-card">
      <div className="task-card-header">
        <div className="task-date-time">
          {task.dateSet && task.date ? (
            <div className="task-date">{task.date}</div>
          ) : (
            <div className="task-date date-not-set">Date not set</div>
          )}
          <div className="task-time">{task.time}</div>
        </div>
        
        <button 
          className="more-button"
          onClick={handleOptionsToggle}
          aria-label="Task options"
        >
          <div className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </button>
        
        {showOptions && (
          <TaskOptions 
            task={task} 
            filter={filter} 
            onClose={() => setShowOptions(false)} 
            onView={() => {
              setShowOptions(false);
              if (typeof onClick === 'function') {
                onClick(task); // Open task viewer from options menu too
              }
            }}
          />
        )}
      </div>
      
      <h2 className="task-title">{task.title}</h2>
      <p className="task-description">{task.description}</p>
    </div>
  );
};

export default TaskCard;