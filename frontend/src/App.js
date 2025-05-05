import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import { fetchNotes, createNote } from './services/api';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await fetchNotes();
      setNotes(data);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
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
        <h1>Notes App</h1>
      </header>
      <main>
        <form onSubmit={handleAddNote}>
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note..."
          />
          <button type="submit">Add Note</button>
        </form>
        
        {loading ? (
          <p>Loading notes...</p>
        ) : (
          <NoteList notes={notes} />
        )}
      </main>
    </div>
  );
}

export default App;
