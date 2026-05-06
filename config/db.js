/**
 * config/db.js
 * MySQL database connection pool using mysql2/promise
 * Uses connection pooling for scalability and performance
 */

const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "school_management",
  port: parseInt(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

/**
 * Test DB connection on startup
 */
const testConnection = async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL Database connected successfully");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = { pool, testConnection };
