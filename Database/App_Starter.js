const express = require('express');
const mysql = require('mysql2/promise'); // Use promise-based MySQL
const app = express();

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pim',
  waitForConnections: true,
  connectionLimit: 10, // Limit the number of concurrent connections
  queueLimit: 0,
});

// Route to fetch students
app.get('/students', async (req, res) => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    try {
      // Query the database
      const [rows] = await connection.query('SELECT * FROM users');
      // result is an array: ต้องทำการ destructure !! เอาแค่ rows
        // result[0] -> rows (query results)
        // result[1] -> fields (metadata)
      res.json(rows);
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000!');
});