require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const winston = require('winston');

// Create express app
const app = express();
const port = process.env.PORT || 3001;

// Create logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    // Add other transports as needed for production
  ],
});

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'database', // This should be the Kubernetes service name
  database: process.env.DB_NAME || 'notesdb',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Connect to database and create table if not exists
const initializeDatabase = async () => {
  try {
    // Wait for database to be ready before connecting
    await pool.query('SELECT NOW()');
    logger.info('Database connection established successfully.');
    
    // Create notes table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    logger.info('Database initialized successfully.');
  } catch (err) {
    logger.error('Database initialization failed:', err);
    // Retry connection in production
    setTimeout(initializeDatabase, 5000);
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Notes API is running');
});

// Health check endpoint for Kubernetes
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// API routes
app.use('/api/notes', require('./routes/notes'));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, async () => {
  logger.info(`Server running on port ${port}`);
  await initializeDatabase();
});

// Export for testing
module.exports = app;
