const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM attendance ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark attendance
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  try {
    const result = await pool.query(
      'INSERT INTO attendance (name, created_at) VALUES ($1, NOW()) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
