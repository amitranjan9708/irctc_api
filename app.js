const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authenticateToken, checkAdminApiKey } = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
// const bookingdetailsRoutes = require('./routes/bookingDetailsRoutes');
const trainRoutes = require('./routes/trainRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000  // Avoid port 3306

app.use(bodyParser.json());
app.use(cors());

// Define routes
app.use('/api', userRoutes);
app.use('/api/admin', checkAdminApiKey, adminRoutes);
app.use('/api', authenticateToken, bookingRoutes);
// app.use('/api', authenticateToken, bookingdetailsRoutes);
app.use('/api', trainRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
