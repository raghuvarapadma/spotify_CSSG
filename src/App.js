import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useAuthState } from "react-firebase-hooks/auth";

import { app_background } from "./data/markdown";

import Button from "react-bootstrap/Button";

import db from "./data/services/database";
import fb from "./data/services/firebase_config";

import Note from "./Note";
import Login from "./Login";

const App = () => {
  const [edit, setEdit] = useState(false);
  const [notes, setNotes] = useState(null);
  const [currNoteId, setCurrNoteId] = useState("");
  const [user] = useAuthState(fb.auth);

  const login = (email, password) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .catch((e) => console.log(e));
  };
  const logout = () => {
    fb.auth.signOut();
  };

  const changeEditStatus = (id) => {
    setCurrNoteId(id);
    if (id !== currNoteId) {
      setEdit(!edit);
    }
  };

  const saveNote = (id, note) => {
    setEdit(!edit);
    if (id) {
      db.updateNote(id, note, new Date().getTime());
    } else {
      const date = new Date().getTime();
      const savedNote = { note, date: date };
      const key = db.createNote(savedNote);
      if (notes) {
        setNotes([...notes, { id: key, note: note, date }]);
      } else {
        setNotes([{ id: key, note: note, date }]);
      }
    }
  };

  const addNote = () => {
    saveNote(null, "");
  };

  useEffect(() => {
    if (!notes) {
      // grab notes from firebase
      db.getAllNotes(setNotes);
    }
  }, [notes]);

  return (
    <div className="home">
      <div id="content">
        <ReactMarkdown className="background" source={app_background} />
        <div className="container">
          <div className="justify-content-md-center">
            {user ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Login onLogin={login} />
            )}
          </div>
          <div className="row justify-content-md-center">
            {notes &&
              notes.map(({ id, note, date }) => (
                <Note
                  key={id}
                  id={id}
                  note={note}
                  currNoteId={currNoteId}
                  date={new Date(date)}
                  changeEditStatus={changeEditStatus}
                  edit={edit}
                  saveNote={saveNote}
                  disabled={!user}
                />
              ))}
          </div>
          {user && <Button onClick={addNote}>Add note!</Button>}
        </div>
      </div>
    </div>
  );
};

export default App;
