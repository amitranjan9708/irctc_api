const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
// Create a connection pool
const pool = mysql.createPool({
  host: "b2euns8lye9n2kcctpsy-mysql.services.clever-cloud.com",
  user: "ushpd6epywlvfjbh",
  password: "jTKeioAmo517hwkMI5DR",
  database: "b2euns8lye9n2kcctpsy",
port:"3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create a promise pool (used for async/await handling)
const promisePool = pool.promise();

module.exports = { pool, promisePool };
