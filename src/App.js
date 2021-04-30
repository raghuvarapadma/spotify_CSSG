import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useAuthState } from "react-firebase-hooks/auth";

import { app_background } from "./data/markdown";

import Button from "react-bootstrap/Button";

import db from "./data/services/database";
import fb from "./data/services/firebase_config";

import Note from "./Note";
import Login from "./Login";

import playlist from "./list"


const App = () => {
  const [edit, setEdit] = useState(false);
  const [notes, setNotes] = useState(null);
  const [currNoteId, setCurrNoteId] = useState("");
  const [user] = useAuthState(fb.auth);
  
  /* Spotify stuff */
  const fakeData = 
  [{id: 0, url: "https://open.spotify.com/embed/track/6MdqqkQ8sSC0WB4i8PyRuQ", songName: "No Diggity", artist: "Blackstreet"},
  {id: 1, url: "https://open.spotify.com/embed/track/0RnDu3eYJqbFKz6MHv2ajd", songName: "Poison", artist: "Bell Biv DeVoe"},
  {id: 2, url: "https://open.spotify.com/embed/track/6zsk6uF3MxfIeHPlubKBvR", songName: "Get Ur Freak On", artist: "Missy Elliot"},
  {id: 3, url: "https://open.spotify.com/embed/track/2PpruBYCo4H7WOBJ7Q2EwM", songName: "Hey Ya!", artist: "Outkast"},
  {id: 4, url: "https://open.spotify.com/embed/track/3SwlakM6VX47IwG0Wll5ek", songName: "Promiscuous", artist: "Nelly Furtado"}]

  const mapper = (songs) => {
    return (
      <div>
      {songs.map(({id, url, songName, artist}) => {
        return (
          <div>
          <iframe id={id} src={url} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <div>
          <Button id={id} onClick={filterer}>Delete Song</Button></div>
          </div>
        )})}
      </div>
    )};

  const [songs, setSongs] = useState(fakeData);

  const filterer = (event) => {
    var eventId = event.target.id;
    var id = document.getElementById(eventId).id;
    const newData = songs.filter(function isId(song) {
      return song.id != id; 
    });
    setSongs(newData);
    console.log(songs);
    mapper(songs);
  }

  /* Spotify stuff */
  
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
      // a.k.a if this note already exists in the database & it's being edited
      // TODO: using the "db" variable, call the updateNote function
      // pass it id, note, and a new date object like so: new Date().getTime()
    } else {
      // a.k.a a completely new note
      const date = new Date().getTime();
      const savedNote = { note, date };
      const key = db.createNote(savedNote); // returns the key from our createNote function
      if (notes) {
        // a.k.a if this is not the first note ever created in the database
        // TODO: using the spread operator, call setNotes & pass it an array
        // containing what was already in notes as well as an object containing
        // an id (with the value of the key variable), note and date
      } else {
        // a.k.a if this is the first note ever made
        // TODO: pass setNotes an array with a single object, containing the same info
        // as the object described in the if block above
      }
    }
  };

  const addNote = () => {
    // TODO: call saveNote passing in a null id & empty string
  };

  useEffect(() => {
    // TODO: check if notes is null. if so, call the getAllNotes method using the variable "db"
    // make sure to pass the setter function for the notes state variable to getAllNotes
  }, [notes]);

  return (
    <div className="home">
      <div id="content">
        <ReactMarkdown className="background" source={app_background} />
        {playlist(songs)}
        <div className="container">
          <div className="justify-content-md-center">
            {user ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              // TODO: pass the login function as prop called "onLogin" to the Login component
              <Login onLogin={login} />
            )}
          </div>
          <div className="row justify-content-md-center">
            {notes &&
              notes.map(({ id, note, date }) => (
                /** TODO: pass a whole lot of props to the Note component
                 * pass the value of id to the key & id prop
                 * pass the value of note, currNoteId, changeEditStatus, edit, saveNote
                 * the disabled prop will turn off editing when the user isn't logged in
                 */
                <Note date={new Date(date)} disabled={!user} />
              ))}
          </div>
          {/**TODO: use the double amperstand (&&) to show a button only if the user variable is not null
           * pass the addNote function to the Button when clicked
           * This is the Add Note button :)
           * TIP: there's an example of how to do this on line 85
           */}
        </div>
      </div>
    </div>
  );
};

export default App;
