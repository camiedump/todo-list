import { useTasks } from '../context/TaskContext';
import Header from '../components/layout/Header';
import TaskList from '../components/task/TaskList';
import '../styles/pages/trash-page.css';

const TrashPage = ({ searchQuery }) => {
  const { getFilteredTasks } = useTasks();
  
  const tasks = getFilteredTasks('trash', searchQuery);
  
  const emptyMessage = searchQuery 
    ? "No matching deleted tasks found."
    : "Trash is empty. Deleted tasks will appear here.";

  return (
    <div className="page-container">
      <Header title="TRASH" />
      
      <div className="page-content">
        <TaskList 
          tasks={tasks} 
          filter="trash" 
          emptyMessage={emptyMessage} 
        />
      </div>
    </div>
  );
};

export default TrashPage;