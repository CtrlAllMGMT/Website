const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// API routes

// Get all parts
app.get('/api/parts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM parts');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new part
app.post('/api/parts', async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const { rows } = await pool.query(
      'INSERT INTO parts (name, description, price) VALUES ($1, $2, $3) RETURNING *',
      [name, description, price]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a part
app.delete('/api/parts/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const { rows } = await pool.query('DELETE FROM parts WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Part not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});