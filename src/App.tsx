import React from "react";
import { useState } from "react";
import "./App.css";

interface Note {
  id: number;
  title: string;
  content: string;
  image: string | null;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "test note 1",
      content: "bla bla note1",
      image: null,
    },
    {
      id: 2,
      title: "test note 2 ",
      content: "bla bla note2",
      image: null,
    },
    {
      id: 3,
      title: "test note 3",
      content: "bla bla note3",
      image: null,
    },
    {
      id: 4,
      title: "test note 4 ",
      content: "bla bla note4",
      image: null,
    },
    {
      id: 5,
      title: "test note 5",
      content: "bla bla note5",
      image: null,
    },
    {
      id: 6,
      title: "test note 6",
      content: "bla bla note6",
      image: null,
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [image, setImage] = useState<File | null>(null);

  //TODO: change this function
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
      image: image ? URL.createObjectURL(image) : null,
    };
    
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setImage(null);
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!selectedNote) {
      return;
    }
  
    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
      image: image ? URL.createObjectURL(image) : selectedNote.image,
    };
  
    const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));
  
    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setImage(null);
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setSelectedNote(null);
  };

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();
  
    const updatedNotes = notes.filter((note) => note.id !== noteId);
  
    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <form 
        className="note-form" 
        onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}
      >
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        required
      ></input>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        ></textarea>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
            <button onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            {note.image && <img src={note.image} alt={note.title} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;