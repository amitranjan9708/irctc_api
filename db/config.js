const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool with retry logic
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 seconds timeout
});

// Create a promise pool for async/await handling
const promisePool = pool.promise();

module.exports = { pool, promisePool };
