import React, { useState, useEffect } from 'react';
import './modal.css';

const Modal = ({ onClose, onSave, initialData, viewOnly = false, onToggleComplete }) => {
  const [noteText, setNoteText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDate, setNoteDate] = useState('');
  const [completed, setCompleted] = useState(false);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [noteTime, setNoteTime] = useState(getCurrentTime());

  useEffect(() => {
    if (initialData) {
      setNoteText(initialData.text || '');
      setNoteTitle(initialData.title || '');
      setNoteDate(initialData.date || '');
      setNoteTime(initialData.time || getCurrentTime());
      setCompleted(initialData.completed || false);
    } else {
      
      setNoteTime(getCurrentTime());
      setCompleted(false);
    }
  }, [initialData]);

  const handleSave = () => {
    const newNote = {
      title: noteTitle,
      text: noteText,
      date: noteDate,
      time: noteTime, 
      completed: completed
    };
    onSave(newNote);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className={`modal ${viewOnly ? 'modal-view' : ''} ${completed ? 'modal-completed' : ''}`}>
        <div className="modal-header">
          <h2 className="modal-title">
            {viewOnly ? 'View Task' : initialData ? 'Edit Task' : 'New Task'}
            {completed && <span className="modal-completed-badge">Completed</span>}
          </h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="date-container">
            <input
              type="date"
              value={noteDate}
              onChange={(e) => setNoteDate(e.target.value)}
              className="input-date"
              disabled={viewOnly}
            />
          </div>

          <div className="time-container">
            <input
              type="time"
              value={noteTime}
              onChange={(e) => setNoteTime(e.target.value)}
              className="input-time"
              disabled={viewOnly}
            />
          </div>

          <input
            type="text"
            placeholder="Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="input-title"
            disabled={viewOnly}
          />

          <textarea
            placeholder="Write your note here..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="note-input"
            disabled={viewOnly}
          />

          {!viewOnly && (
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          )}
          
          {viewOnly && (
            <div className="modal-view-actions">
              <button className="toggle-complete-button" onClick={onToggleComplete}>
                {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
              <button className="close-view-button" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;