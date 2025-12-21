require("dotenv").config(); // ✅ IMPORTANT

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "nodeuser",
  password: process.env.DB_PASSWORD || "node123",
  database: process.env.DB_NAME || "book",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const testConnection = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✓ MySQL connected successfully");
    return true;
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return false;
  }
};

module.exports = { pool, testConnection };
