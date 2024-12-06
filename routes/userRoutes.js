const express = require('express');
const router = express.Router();
const { promisePool } = require('../db/config');  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

// Route to register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users(name, email, password) VALUES(?, ?, ?)";
    const values = [name, email, hashedPassword];

   
    const [result] = await promisePool.execute(sql, values);

    if (result.affectedRows > 0) {
      return res.status(201).json({ message: "User registered successfully." });
    } else {
      return res.status(400).json({ error: "Failed to register user." });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [users] = await promisePool.execute(sql, [email]);

    if (users.length > 0) {
      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      } else {
        return res.status(403).json({ error: "Invalid email or password." });
      }
    } else {
      return res.status(403).json({ error: "Invalid email or password." });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Database error." });
  }
});

module.exports = router;
