import { useState } from 'react'
import { X } from 'lucide-react'
import { useTasks } from '../../context/TaskContext'
import { formatCurrentDate } from '../../utils/dateUtils'
import '../../styles/components/AddTaskForm.css'

/**
 * AddTaskForm component for creating new tasks
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to close the form
 */
const AddTaskForm = ({ onClose }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { addTask } = useTasks()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (title.trim() === '') return
    
    const { date, time } = formatCurrentDate()
    
    const newTask = {
      id: Date.now(),
      title: title.toUpperCase(),
      description: description || 'No description provided',
      date,
      time,
      completed: false,
      deleted: false
    }
    
    addTask(newTask)
    setTitle('')
    setDescription('')
    onClose()
  }

  return (
    <div className="add-task-form">
      <div className="form-header">
        <h3 className="form-title">Add New Task</h3>
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Close form"
        >
          <X size={18} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskTitle" className="form-label">Task Title</label>
          <input
            id="taskTitle"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskDescription" className="form-label">Task Description</label>
          <textarea
            id="taskDescription"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            rows={3}
          />
        </div>
        <div className="form-actions">
          <button 
            type="submit"
            className="submit-button"
          >
            Add Task
          </button>
          <button 
            type="button"
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTaskForm