import React, { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");

  const handleChange = event => {
    setNewNote(event.target.value);
  };

  const addNote = event => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: Math.random() > 0.5,
      date: new Date().toISOString()
    });
    setNewNote("");
  };

  return (
    <div>
      <h2>Create new note</h2>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} />
        <button>save</button>
      </form>
    </div>
  );
};

export default NoteForm;
