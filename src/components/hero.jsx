import React, { useState } from 'react';
import './hero.css';
import Modal from './modal';

const Hero = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);

  const addNote = (newNote) => {
    if (currentNote !== null) {
      // Edit existing note
      const updatedNotes = [...notes];
      updatedNotes[currentNote] = newNote;
      setNotes(updatedNotes);
      setCurrentNote(null);
    } else {
      // Add new note
      setNotes([...notes, newNote]);
    }
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setCurrentNote(index);
    setShowModal(true);
    setDropdownIndex(null);
  };

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setDropdownIndex(null);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div className="container">
      <div className="title">
        TODO-LIST
      </div>
      <div className="card-container">
        {notes.map((note, index) => (
          <div key={index} className="card">
            <div className="ellipsis" onClick={() => toggleDropdown(index)}>
              ⋯
            </div>

            {dropdownIndex === index && (
              <div className="dropdown-menu">
                <div className="menu-item" onClick={() => handleEdit(index)}>
                  Open
                </div>
                <div className="menu-item" onClick={() => handleDelete(index)}>
                  Delete
                </div>
              </div>
            )}

            <div className="date-time">
              <strong>{note.date}</strong> <br />
              {note.time}
            </div>
            <div className="note-title">{note.title}</div>
            <div className="note-text">{note.text}</div>
          </div>
        ))}

        <div className="card add-card" onClick={() => setShowModal(true)}>
          <div className="plus">+</div>
        </div>
      </div>

      {showModal && (
        <Modal 
          onClose={() => {
            setShowModal(false);
            setCurrentNote(null);
          }} 
          onSave={addNote} 
          initialData={currentNote !== null ? notes[currentNote] : null} 
        />
      )}
    </div>
  );
};

export default Hero;