const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all origins

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'userdb'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Registration endpoint
app.post('/register', (req, res) => {
  const { name, email, password } = req.body; // Removed confirmPassword

  // Validate request
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if the user already exists
  db.query('SELECT email FROM users WHERE email = ?', [email], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert the new user into the database
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, result) => {
      if (err) throw err;

      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if the user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = result[0];

    // Compare the password with the hashed password
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful!' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
