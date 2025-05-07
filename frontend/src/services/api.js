const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const getAllNotes = async () => {
  const response = await fetch(`${API_URL}/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return response.json();
};

export const createNote = async (note) => {
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create note');
  }
  
  return response.json();
};
