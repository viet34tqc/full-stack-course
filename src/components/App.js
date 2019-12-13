import React, { useState, useEffect } from "react";
import Note from "./Note";
import noteService from "../services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then(noteObjects => {
      setNotes(noteObjects);
    });
  }, []);

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const toggleImportance = id => {
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(noteObject => {
        setNotes(notes.map(note => (note.id !== id ? note : noteObject)));
      })
      .catch(error => {
        alert(`the note '${note.content}' was already deleted from server`);
        // remove error notes
        setNotes(notes.filter(note => note.id !== id));
      });
  };

  const rows = () =>
    notesToShow.map(note => (
      <Note
        toggleImportance={() => toggleImportance(note.id)}
        key={note.id}
        note={note}
      />
    ));

  const handleNoteChange = event => {
    setNewNote(event.target.value);
  };

  const addNote = event => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    };

    noteService.create(noteObject).then(noteObject => {
      setNotes(notes.concat(noteObject));
      setNewNote("");
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>{rows()}</ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
