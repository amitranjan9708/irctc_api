const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '9708195932@Aa',
  database: 'irctc3',
  waitForConnections: true,
  connectionLimit: 10, // Set the max number of simultaneous connections
  queueLimit: 0 // No limit on the number of waiting connections
});

// Create a promise pool (used for async/await handling)
const promisePool = pool.promise();

module.exports = { pool, promisePool };
