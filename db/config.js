const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create a promise pool (used for async/await handling)
const promisePool = pool.promise();

module.exports = { pool, promisePool };
