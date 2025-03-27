import React, { useState } from 'react';
import './hero.css';
import Modal from './modal';

const Hero = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  
  const addNote = (newNote) => {
    if (currentNote !== null) {
      // Edit existing note
      const updatedNotes = [...notes];
      updatedNotes[currentNote] = {
        ...newNote,
        completed: updatedNotes[currentNote].completed || false
      };
      setNotes(updatedNotes);
      setCurrentNote(null);
    } else {
      // Add new note
      setNotes([...notes, { ...newNote, completed: false }]);
    }
    setShowModal(false);
    setViewMode(false);
  };
  
  const handleView = (index) => {
    setCurrentNote(index);
    setViewMode(true);
    setShowModal(true);
    setDropdownIndex(null);
  };
  
  const handleEdit = (index) => {
    setCurrentNote(index);
    setViewMode(false);
    setShowModal(true);
    setDropdownIndex(null);
  };
  
  const toggleCompleted = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = {
      ...updatedNotes[index],
      completed: !updatedNotes[index].completed
    };
    setNotes(updatedNotes);
    setDropdownIndex(null);
  };
  
  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setDropdownIndex(null);
  };
  
  const toggleDropdown = (index, event) => {
    event.stopPropagation(); // Prevent card click when clicking on dots
    setDropdownIndex(dropdownIndex === index ? null : index);
  };
  
  const handleCardClick = (index) => {
    handleView(index);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setCurrentNote(null);
    setViewMode(false);
  };
  
  return (
    <div className="container">
      <div className="title">TODO-LIST</div>
      <div className="card-container">
        {notes.map((note, index) => (
          <div 
            key={index} 
            className={`card ${note.completed ? 'card-completed' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="date-time">
              {note.date ? (
                <>
                  <strong>{note.date}</strong> <br />
                  {note.time || "Time not set"}
                </>
              ) : (
                <>
                  <strong>Date not set</strong> <br />
                  {note.time || "Time not set"}
                </>
              )}
            </div>
            <div className="card-actions">
              <div className="ellipsis" onClick={(e) => toggleDropdown(index, e)}>
                <span>•</span><span>•</span><span>•</span>
              </div>
              {dropdownIndex === index && (
                <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                  <div className="menu-item" onClick={() => handleEdit(index)}>
                    Edit
                  </div>
                  <div className="menu-item" onClick={() => handleDelete(index)}>
                    Delete
                  </div>
                </div>
              )}
            </div>
            {note.completed && (
              <div className="completed-badge">
                ✓
              </div>
            )}
            <div className="note-details">
              <div className="note-title">{note.title}</div>
            </div>
          </div>
        ))}
        <div className="card add-card" onClick={() => setShowModal(true)}>
          <div className="plus">+</div>
        </div>
      </div>
      {showModal && (
        <Modal
          onClose={closeModal}
          onSave={addNote}
          initialData={currentNote !== null ? notes[currentNote] : null}
          viewOnly={viewMode}
          onToggleComplete={currentNote !== null ? 
            () => toggleCompleted(currentNote) : 
            null}
        />
      )}
    </div>
  );
};

export default Hero;