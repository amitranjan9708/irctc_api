const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_jwt_secret";
const ADMIN_API_KEY = 'admin_api_key';

exports.checkAdminApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  console.log("Checking Admin API Key...");
  if (apiKey !== ADMIN_API_KEY) {
    return res.status(403).json({ error: "Unauthorized: Invalid Admin API Key" });
  }
  next();
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token
  
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No Token Provided" });
  }
  
  console.log('Received Token:', token);
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json(err);
    }
    req.user = user;
    next();
  });
};
