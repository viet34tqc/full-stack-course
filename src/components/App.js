import React, { useState, useEffect } from "react";
import Note from "./Note";
import Notification from "./Notification";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import NoteForm from "./NoteForm";
import Togglable from "./Togglable";
import noteService from "../services/notes";
import loginService from "../services/login";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Dấu [] ở cuối useEffect là chỉ chạy 1 lần
  useEffect(() => {
    noteService.getAll().then(noteObjects => {
      setNotes(noteObjects);
    });
  }, []);

  // Check nếu có user trong local storage thì lấy ra
  // Dấu [] ở cuối useEffect là chỉ chạy 1 lần
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
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
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
    noteService.setToken(user.token);
    try {
      noteService.create(noteObject).then(noteObject => {
        setNotes(notes.concat(noteObject));
        setNewNote("");
      });
    } catch (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note">
        <NoteForm
          onSubmit={addNote}
          value={newNote}
          handleChange={handleNoteChange}
        />
      </Togglable>
    );
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  return (
    <div>
      <h1>Notes</h1>

      {errorMessage ? <Notification message={errorMessage} /> : ""}

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>{rows()}</ul>

      <Footer />
    </div>
  );
};

export default App;
