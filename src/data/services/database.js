import firebase from "./firebase_config";

const db = firebase.db.ref("notes");

const getAllNotes = (setNotes) => {
  return db.on("value", function (snapshot) {
    const dto = snapshot.val();
    if (!dto) {
      setNotes([]);
      return;
    }
    const result = Object.keys(dto).map((id) => ({
      id,
      note: dto[id].note,
      date: dto[id].date,
    }));
    setNotes(Object.values(result));
  });
};

const createNote = (data) => {
  const newNote = db.push();
  newNote.set(data);
  return newNote.key;
};

const updateNote = (id, note, date) => {
  return db.child(id).update({ note, date });
};

const removeNote = (id) => {
  return db.child(id).remove();
};

const removeAllNotes = () => {
  return db.remove();
};

const methods = {
  getAllNotes,
  createNote,
  updateNote,
  removeNote,
  removeAllNotes,
};

export default methods;
