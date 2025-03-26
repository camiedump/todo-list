import React, { useState, useEffect } from 'react';
import './modal.css';

const Modal = ({ onClose, onSave, initialData }) => {
  const [noteText, setNoteText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDate, setNoteDate] = useState('');


  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [noteTime, setNoteTime] = useState(getCurrentTime());

  useEffect(() => {
    if (initialData) {
      setNoteText(initialData.text);
      setNoteTitle(initialData.title);
      setNoteDate(initialData.date);
      setNoteTime(getCurrentTime());
    }
  }, [initialData]);

  const handleSave = () => {
    const newNote = {
      title: noteTitle,
      text: noteText,
      date: noteDate,
      time: getCurrentTime(), // Always get new time on save
    };
    onSave(newNote);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>{initialData ? 'Your Note' : 'New Note'}</h2>
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
          />
        </div>

        <div className="time">Time: {noteTime}</div>

        <input
          type="text"
          placeholder="Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          className="input-title"
        />

        <textarea
          placeholder="Write your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="note-input"
        />

        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
