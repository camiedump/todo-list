import { useState } from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import DateTimePicker from './DateTimePicker';
import Button from '../ui/Button';
import Overlay from '../ui/Overlay';
import '../../styles/components/add-task-form.css';

const AddTaskForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [customDate, setCustomDate] = useState('');
  const [useCustomTime, setUseCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState('');
  
  const { addTask } = useTasks();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim() === '') return;
    
    const currentDate = new Date();
    
    // Format date
    let dateFormatted;
    let dateSet = useCustomDate;
    
    if (useCustomDate && customDate) {
      const date = new Date(customDate);
      dateFormatted = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } else {
      dateFormatted = null;
    }
    
    // Format time
    let timeFormatted;
    
    if (useCustomTime && customTime) {
      const [hours, minutes] = customTime.split(':');
      const date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      
      timeFormatted = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toLowerCase();
    } else {
      timeFormatted = currentDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toLowerCase();
    }
    
    const newTask = {
      id: Date.now(),
      title: title.toUpperCase(),
      description: description || 'No description provided',
      date: dateFormatted,
      time: timeFormatted,
      completed: false,
      deleted: false,
      dateSet
    };
    
    addTask(newTask);
    
    // Reset form
    setTitle('');
    setDescription('');
    setUseCustomDate(false);
    setCustomDate('');
    setUseCustomTime(false);
    setCustomTime('');
    
    onClose();
  };
  
  return (
    <>
      <Overlay onClick={onClose} />
      <div className="add-task-dropdown" onClick={(e) => e.stopPropagation()}>
        <div className="dropdown-header">
          <h3 className="dropdown-title">Add New Task</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="task-title">Title</label>
            <input
              id="task-title"
              type="text"
              className="form-input"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              className="form-textarea"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          
          <DateTimePicker 
            useCustomDate={useCustomDate}
            setUseCustomDate={setUseCustomDate}
            customDate={customDate}
            setCustomDate={setCustomDate}
            useCustomTime={useCustomTime}
            setUseCustomTime={setUseCustomTime}
            customTime={customTime}
            setCustomTime={setCustomTime}
          />
          
          <div className="form-buttons">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTaskForm;