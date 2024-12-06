const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database('./database.db');

// POST endpoint to store survey results
app.post('/survey/store-results', (req, res) => {
  console.log('Received request:', req.body);

  const { assignment_id, answer } = req.body;

  // Ensure both fields are provided
  if (!assignment_id || !answer) {
    console.error('Validation error: Missing assignment_id or answer');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = 'INSERT INTO survey_results (assignment_id, answer) VALUES (?, ?)';

  db.run(query, [assignment_id, answer], function (err) {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to store results' });
    }

    console.log('Survey results inserted into DB');
    res.status(200).json({ message: 'Results stored successfully' });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
