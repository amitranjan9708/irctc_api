// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '9708195932@Aa',
//   database: 'irctc3',
// });

// router.get('/bookingdetails', (req, res) => {
//     const { userId } = req.query;  
//     console.log(userId);

//     const sql = `
//     SELECT 
//       b.id AS booking_id,
//       b.booking_date,
//       t.name AS train_name,
//       t.source,
//       t.destination,
//       t.total_seats,
//       t.available_seats
//     FROM 
//       bookigss b
//     JOIN 
//       trains t ON b.train_id = t.id
//     WHERE 
//       b.user_id = ?
//   `;

//   db.query(sql, [userId], (err, data) => {
//     if (err) {
//       console.error('Error fetching booking details:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }   
//     if (data.length === 0) {
//       return res.status(404).json({ message: 'No bookings found for the given user ID' });
//     }
//     return res.status(200).json(data);
//   });
// });

// module.exports = router;
