const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory data storage
let items = [];
let nextId = 1; // Auto-increment ID

// CREATE: Add a new item
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newItem = { id: nextId++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// READ: Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// READ: Get a single item by ID
app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.params)
  const item = items.find(i => i.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// UPDATE: Update an item by ID
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.find(i => i.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  item.name = name;
  res.json(item);
});

// DELETE: Remove an item by ID
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(i => i.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items.splice(index, 1);
  res.status(204).send(); // No content
});


// GET: Read lat, lon based on current ISS location
console.log("Setting up /iss-location route");
app.get('/iss-location', async (req, res) => {
    console.log("Received request for /iss-location");
    try {
        const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');
        const { latitude, longitude } = response.data;
        res.json({ latitude, longitude });
    } catch (error) {
        console.error("Error fetching ISS location:", error.message);
        res.status(500).json({ error: 'Unable to fetch ISS location' });
    }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});