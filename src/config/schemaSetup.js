const pool = require('./database');
const {promisify} = require("util")

const query = promisify(pool.query).bind(pool)

async function setupSchema() {
  try {
    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

    console.log('Database schema setup completed');
  } catch (error) {
    console.error('Error setting up database schema:', error);
    throw error;
  }
}

module.exports = setupSchema;
