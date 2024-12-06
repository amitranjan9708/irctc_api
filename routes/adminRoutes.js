const express = require('express');
const router = express.Router();
const { promisePool } = require('../db/config'); // Import the promise pool from config.js

// Route to add train
router.post('/trains', async (req, res) => {
  const { name, source, destination, total_seats, available_seats } = req.body;

  const sql = "INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)";
  const values = [name, source, destination, total_seats, available_seats];

  try {
    // Use the promise pool to execute the query
    const [result] = await promisePool.execute(sql, values);

    if (result.affectedRows > 0) {
      return res.status(201).json({ message: "Train added successfully", trainId: result.insertId });
    } else {
      return res.status(400).json({ error: "Failed to add train data" });
    }
  } catch (err) {
    console.error("Error inserting train data:", err);
    return res.status(500).json({ error: "Error inserting train data", details: err });
  }
});

module.exports = router;
