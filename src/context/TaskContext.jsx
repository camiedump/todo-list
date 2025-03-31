import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create context
const TaskContext = createContext();

// Action types
const ACTIONS = {
  SET_TASKS: 'set_tasks',
  ADD_TASK: 'add_task',
  UPDATE_TASK: 'update_task',
  TOGGLE_COMPLETED: 'toggle_completed',
  MOVE_TO_TRASH: 'move_to_trash',
  RESTORE_TASK: 'restore_task',
  DELETE_TASK: 'delete_task',
  CLEAR_COMPLETED: 'clear_completed',
  CLEAR_TRASH: 'clear_trash'
};

// Initial state
const initialState = {
  tasks: [],
  isLoading: true
};

// Reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        isLoading: false
      };
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id 
            ? { ...task, ...action.payload.updates } 
            : task
        )
      };
    case ACTIONS.TOGGLE_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload 
            ? { ...task, completed: !task.completed } 
            : task
        )
      };
    case ACTIONS.MOVE_TO_TRASH:
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload 
            ? { ...task, deleted: true } 
            : task
        )
      };
    case ACTIONS.RESTORE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload 
            ? { ...task, deleted: false } 
            : task
        )
      };
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.filter(task => !task.completed || task.deleted)
      };
    case ACTIONS.CLEAR_TRASH:
      return {
        ...state,
        tasks: state.tasks.filter(task => !task.deleted)
      };
    default:
      return state;
  }
};

// Provider component
export const TaskProvider = ({ children }) => {
  const [storedTasks, setStoredTasks] = useLocalStorage('tasks', []);
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from localStorage
  useEffect(() => {
    if (storedTasks && storedTasks.length > 0) {
      dispatch({ type: ACTIONS.SET_TASKS, payload: storedTasks });
    } else {
      // Initialize with empty tasks array
      dispatch({ type: ACTIONS.SET_TASKS, payload: [] });
      setStoredTasks([]);
    }
  }, []);

  // Save tasks to localStorage when they change
  useEffect(() => {
    if (!state.isLoading) {
      setStoredTasks(state.tasks);
    }
  }, [state.tasks, setStoredTasks, state.isLoading]);

  // Generate a unique ID for new tasks
  const generateId = useCallback(() => {
    const existingIds = state.tasks.map(task => task.id);
    return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  }, [state.tasks]);

  // Action creators
  const addTask = useCallback((task) => {
    const newTask = {
      ...task,
      id: task.id || generateId(),
      completed: false,
      deleted: false
    };
    dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
  }, [generateId]);

  const updateTask = useCallback((id, updates) => {
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: { id, updates } });
  }, []);

  const toggleTaskCompleted = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE_COMPLETED, payload: id });
  }, []);

  const moveToTrash = useCallback((id) => {
    dispatch({ type: ACTIONS.MOVE_TO_TRASH, payload: id });
  }, []);

  const restoreTask = useCallback((id) => {
    dispatch({ type: ACTIONS.RESTORE_TASK, payload: id });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_COMPLETED });
  }, []);

  const clearTrash = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_TRASH });
  }, []);

  // Filter tasks based on criteria (active, completed, trash) and search query
  const getFilteredTasks = useCallback((filter, searchQuery = '', sortBy = 'date') => {
    const query = searchQuery.toLowerCase().trim();
    
    let filteredTasks = state.tasks;
    
    // First apply category filter
    if (filter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.completed && !task.deleted);
    } else if (filter === 'trash') {
      filteredTasks = filteredTasks.filter(task => task.deleted);
    } else {
      // Home - show active tasks
      filteredTasks = filteredTasks.filter(task => !task.completed && !task.deleted);
    }
    
    // Then apply search filter if needed
    if (query !== '') {
      filteredTasks = filteredTasks.filter(task => 
        task.title?.toLowerCase().includes(query) || 
        task.description?.toLowerCase().includes(query)
      );
    }
    
    // Sort tasks
    return sortTasks(filteredTasks, sortBy);
  }, [state.tasks]);

  // Sort tasks based on different criteria
  const sortTasks = useCallback((tasks, sortBy) => {
    switch (sortBy) {
      case 'date':
        return [...tasks].sort((a, b) => {
          if (!a.dateSet && !b.dateSet) return 0;
          if (!a.dateSet) return 1;
          if (!b.dateSet) return -1;
          return new Date(a.date) - new Date(b.date);
        });
      case 'priority':
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return [...tasks].sort((a, b) => 
          (priorityOrder[a.priority] || 999) - (priorityOrder[b.priority] || 999)
        );
      case 'title':
        return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return tasks;
    }
  }, []);

  // Get tasks by date for calendar view
  const getTasksByDate = useCallback((date) => {
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    return state.tasks.filter(task => 
      task.date === formattedDate && !task.deleted
    );
  }, [state.tasks]);

  // Context value
  const value = {
    tasks: state.tasks,
    isLoading: state.isLoading,
    addTask,
    updateTask,
    toggleTaskCompleted,
    moveToTrash,
    restoreTask,
    deleteTask,
    clearCompleted,
    clearTrash,
    getFilteredTasks,
    getTasksByDate
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Custom hook for using the TaskContext
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};