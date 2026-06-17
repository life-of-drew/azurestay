// =====================================================
//  AzureStay — Database Connection
//  config/db.js
// =====================================================

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || 'supernatural26!',
  database: process.env.DB_NAME     || 'hotel_reservation_db',
  waitForConnections: true,
  connectionLimit:    10,
});

module.exports = pool;