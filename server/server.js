const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const corsOptions = {
    origin : ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());

const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);


db.run(`CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  book_id TEXT NOT NULL,
  rating INTEGER CHECK(rating >= 1 AND rating <= 5),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, book_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;
  
  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    function(err) {
      if (err) {
        console.error('Signup error:', err); // Logga felet först
        return res.status(400).json({ error: "Username already exists" });
      }
      res.json({ 
        message: "User created! Please log in.", 
        user: { id: this.lastID, username } 
      });
    }
  );
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  
  db.get(
    'SELECT id, username FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, row) => {
      if (err || !row) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      res.json({ 
        message: "Welcome, " + row.username, 
        user: { id: row.id, username: row.username } 
      });
    }
  );
});

app.post("/api/vote", (req, res) => {
  const { userId, bookId, rating } = req.body;
  
  db.run(
    `INSERT INTO votes (user_id, book_id, rating) VALUES (?, ?, ?)
     ON CONFLICT(user_id, book_id) DO UPDATE SET rating = ?, created_at = CURRENT_TIMESTAMP`,
    [userId, bookId, rating, rating],
    function(err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ message: "Rating saved!", rating });
    }
  );
});

app.get("/api/user-votes/:userId", (req, res) => {
  const { userId } = req.params;
  
  db.all(
    'SELECT book_id, rating, created_at FROM votes WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ votes: rows });
    }
  );
});

app.delete("/api/remove", (req, res) =>{
  const {userId, bookId} = req.body;
  console.log("user id är: " + userId + " och book id: " +  bookId);

  db.run(
    'DELETE FROM votes WHERE user_id = ? AND book_id = ?', [userId, bookId], function(err){
      if (err){
        return res.status(500).json({error: err.message});
      }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Ingen röst hittades att ta bort." });
    }
    res.json({ message: "Removed successfully!", deletedCount: this.changes });
    }
  )
});



app.listen(8080, () =>{
    console.log("Server started at 8080");
});