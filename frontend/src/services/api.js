import axios from 'axios';

// Get API URL from environment variable or default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fetch all notes
export const fetchNotes = async () => {
  try {
    const response = await api.get('/notes');
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Create a new note
export const createNote = async (noteData) => {
  try {
    const response = await api.post('/notes', noteData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    await api.delete(`/notes/${id}`);
  } catch (error) {
    console.error(`Error deleting note with id ${id}:`, error);
    throw error;
  }
};

export default api;
