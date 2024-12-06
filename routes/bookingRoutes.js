const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { promisePool } = require('../db/config'); 

// Route to handle seat booking
router.post('/book', async (req, res) => {
  const { trainId } = req.body;

  
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('Authentication required');
  
  jwt.verify(token, 'your_jwt_secret', async (err, user) => {
    if (err) return res.status(403).send(err);

    const userId = user.id;

    // Start a transaction to ensure atomicity
    const connection = await promisePool.getConnection();

    try {
      await connection.beginTransaction();

      // Lock the train row for update
      const [rows] = await connection.query('SELECT available_seats FROM trains WHERE id = ? FOR UPDATE', [trainId]);
      const availableSeats = rows[0]?.available_seats;

      if (!availableSeats || availableSeats <= 0) {
        await connection.rollback();
        return res.status(400).send('No seats available.');
      }

      
      await connection.query('UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?', [trainId]);

      await connection.query('INSERT INTO bookigss (user_id, train_id) VALUES (?, ?)', [userId, trainId]);

      
      await connection.commit();
      res.send('Seat booked successfully.');
    } catch (err) {
      await connection.rollback();
      console.error('Error during booking process:', err);
      res.status(500).send('Error during booking process.');
    } finally {
      connection.release(); 
    }
  });
});

module.exports = router;
