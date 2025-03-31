import { useTasks } from '../context/TaskContext';
import Header from '../components/layout/Header';
import TaskList from '../components/task/TaskList';
import '../styles/pages/completed-page.css';

const CompletedPage = ({ searchQuery }) => {
  const { getFilteredTasks } = useTasks();
  
  const tasks = getFilteredTasks('completed', searchQuery);
  
  const emptyMessage = searchQuery 
    ? "No matching completed tasks found."
    : "No completed tasks yet. Tasks marked as complete will appear here.";

  return (
    <div className="page-container">
      <Header title="COMPLETED TASKS" />
      
      <div className="page-content">
        <TaskList 
          tasks={tasks} 
          filter="completed" 
          emptyMessage={emptyMessage} 
        />
      </div>
    </div>
  );
};

export default CompletedPage;