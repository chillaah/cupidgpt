const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');  // Change this path to your actual database file

// Create the table if it doesn't already exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS survey_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assignment_id TEXT,
    answer TEXT
  )`);
});

module.exports = db;
