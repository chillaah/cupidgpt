const storeResults = async (req, res) => {
    try {
      const { assignment_id, answer } = req.body;
  
      // Ensure both fields are provided
      if (!assignment_id || !answer) {
        return res.status(400).json({ error: 'Missing assignment_id or answer' });
      }
  
      const query = 'INSERT INTO responses (assignment_id, answer) VALUES (?, ?)';
      const db = require('../database/database'); // Ensure you're importing your DB instance correctly
  
      // Execute the query to insert the data
      db.run(query, [assignment_id, answer], function (err) {
        if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ error: 'Failed to store results' });
        }
  
        return res.status(200).json({ message: 'Results stored successfully' });
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Failed to store results' });
    }
  };
  
  module.exports = {
    storeResults
  };
  