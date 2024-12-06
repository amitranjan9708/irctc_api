const express = require('express');
const router = express.Router();
const { promisePool } = require('../db/config');  

router.get('/trains', async (req, res) => {
  const { source, destination } = req.body;  
  
  if (!source || !destination) {
    return res.status(400).json({ error: 'Source and destination are required.' });
  }

  const sql = 'SELECT * FROM trains WHERE source = ? AND destination = ?';

  try {
    
    const [data] = await promisePool.execute(sql, [source, destination]);

    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.status(404).json({ message: 'No trains found for the given route.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
