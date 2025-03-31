import { useState } from 'react';
import TaskCard from './TaskCard';
import TaskViewer from './TaskViewer';
import TaskEditor from './TaskEditor';
import '../../styles/components/task-list.css';

const TaskList = ({ tasks, filter, emptyMessage }) => {
  const [viewTask, setViewTask] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const handleViewTask = (task) => {
    setViewTask(task);
  };

  const handleEditTask = (task) => {
    setViewTask(null); // Close viewer if open
    setEditTask(task);
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            filter={filter}
            onClick={() => handleViewTask(task)} // This triggers the task view when clicked
          />
        ))}
      </div>

      {/* Task Viewer Modal */}
      {viewTask && (
        <TaskViewer 
          task={viewTask} 
          onClose={() => setViewTask(null)}
          onEdit={handleEditTask}
        />
      )}
      
      {/* Task Editor Modal */}
      {editTask && (
        <TaskEditor 
          task={editTask} 
          onClose={() => setEditTask(null)}
        />
      )}
    </>
  );
};

export default TaskList;