import TaskCard from './TaskCard';
import '../../styles/components/task-list.css';

const TaskList = ({ tasks, filter, emptyMessage }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard 
          key={task.id}
          task={task}
          filter={filter}
        />
      ))}
    </div>
  );
};

export default TaskList;