import React from 'react';

const NoteList = ({ notes }) => {
  if (notes.length === 0) {
    return <p>No notes yet. Add your first note!</p>;
  }

  return (
    <div className="note-list">
      <h2>Your Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            <p>{note.content}</p>
            <small>Created: {new Date(note.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
