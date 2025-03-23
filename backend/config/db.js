const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Database host (e.g., 'localhost')
  user: process.env.DB_USER,       // Database username (e.g., 'root')
  password: process.env.DB_PASS,   // Database password (e.g., 'password')
  database: process.env.DB_NAME,   // Database name (e.g., 'support_ticket_system')
  waitForConnections: true,        // Wait for a connection to become available
  connectionLimit: 10,             // Maximum number of connections to allow at once
  queueLimit: 0                    // No limit on queued connection requests
});

// Log connection status
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected!");
  connection.release();  // Release the connection back to the pool
});

// Export the pool to be used in other parts of the application
module.exports = pool;
