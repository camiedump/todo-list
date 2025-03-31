import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import Header from '../components/layout/Header';
import TaskList from '../components/task/TaskList';
import CreateNewButton from '../components/ui/CreateNewButton';
import AddTaskForm from '../components/form/AddTaskForm';
import '../styles/pages/home-page.css';

const HomePage = ({ searchQuery }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { getFilteredTasks } = useTasks();
  
  const tasks = getFilteredTasks('home', searchQuery);
  
  const emptyMessage = searchQuery 
    ? "No matching tasks found. Try a different search term."
    : "No active tasks. Create a new task to get started!";

  return (
    <div className="page-container">
      <Header title="TASK" />
      
      <div className="page-content">
        <CreateNewButton onClick={() => setShowAddTask(true)} />
        
        {showAddTask && (
          <AddTaskForm onClose={() => setShowAddTask(false)} />
        )}
        
        <TaskList 
          tasks={tasks} 
          filter="home" 
          emptyMessage={emptyMessage} 
        />
      </div>
    </div>
  );
};

export default HomePage;