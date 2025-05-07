import React from 'react';

const NoteList = ({ notes }) => {
  if (!notes || notes.length === 0) {
    return <p>No notes available.</p>;
  }

  return (
    <div className="note-list">
      <h2>Your Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}
            <span className="note-date">
              {new Date(note.created_at).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
