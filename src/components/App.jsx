import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import ErrorModal from "./ErrorModal";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchNotes = async () => {
    // setIsloading(true);
    const response = await fetch(
      "https://hypernote-eafe7-default-rtdb.firebaseio.com/notes.json"
    );

    const data = await response.json();

    const loadedNotes = [];

    for (const noteKey in data) {
      loadedNotes.push({
        id: noteKey,
        title: data[noteKey].title,
        content: data[noteKey].content,
      });
    }
    setNotes(loadedNotes);
    // setIsloading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (newNote) => {
    setIsloading(true);
    const response = await fetch(
      "https://hypernote-eafe7-default-rtdb.firebaseio.com/notes.json",
      {
        method: "POST",
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await fetchNotes();
    setIsloading(false);
  };

  const deleteNote = async (id) => {
    setIsloading(true);
    const response = await fetch(
      "https://hypernote-eafe7-default-rtdb.firebaseio.com/notes/" +
        id +
        ".json",
      {
        method: "DELETE",
      }
    );
    await fetchNotes();
    setIsloading(false);
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} onFetch={fetchNotes} />
      {!isLoading &&
        notes.map((note, index) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              onDelete={deleteNote}
            />
          );
        })}
      {isLoading && <ErrorModal>Loading...</ErrorModal>}
      <Footer />
    </div>
  );
};

export default App;
