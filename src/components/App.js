import React, { useState } from "react";
import Note from "./Note";

const App = props => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const rows = () =>
    notesToShow.map(note => <Note key={note.id} note={note} />);

  const addNote = event => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    };

    setNotes([...notes, noteObject]); // setNotes(notes.concat(noteObject))
    setNewNote("");
  };

  const handleNewNote = e => {
    setNewNote(e.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>{rows()}</ul>

      <form action="" onSubmit={addNote}>
        <input onChange={handleNewNote} type="text" value={newNote} />
        <button type="submit">Submit</button>
      </form>

      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
    </div>
  );
};

export default App;
