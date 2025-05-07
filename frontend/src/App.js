import React, { useState, useEffect } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import { getAllNotes, createNote } from './services/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await getAllNotes();
      setNotes(data);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    try {
      await createNote({ content: newNote });
      setNewNote('');
      loadNotes();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notes Application</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note..."
          />
          <button type="submit">Add Note</button>
        </form>
        <NoteList notes={notes} />
      </main>
    </div>
  );
}

export default App;
