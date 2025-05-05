-- Create database if it doesn't exist
-- Note: PostgreSQL doesn't support CREATE DATABASE IF NOT EXISTS
-- This is handled by Docker/Kubernetes setup

-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add some sample data
INSERT INTO notes (content) VALUES
  ('Welcome to the Notes application!'),
  ('This is a sample note to get you started.'),
  ('You can add, view, and delete notes.');
