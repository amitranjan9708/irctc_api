const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authenticateToken, checkAdminApiKey } = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const bookingdetailsRoutes = require('./routes/bookingDetailsRoutes');
const trainRoutes = require('./routes/trainRoutes');
// const mysql = require('mysql2')
const app = express();
const PORT = 3000;




app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api/admin', checkAdminApiKey, adminRoutes);
app.use('/api', authenticateToken, bookingRoutes);
app.use('/api', authenticateToken, bookingdetailsRoutes);
app.use('/api', trainRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
