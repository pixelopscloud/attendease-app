const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');
const attendanceRoutes = require('./routes/attendance');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )
`).then(() => console.log('Table ready'))
  .catch(err => console.error('Table error:', err));

// Routes
app.use('/api/attendance', attendanceRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'attendease-backend' });
});

app.listen(PORT, () => {
  console.log(`AttendEase Backend running on port ${PORT}`);
});
