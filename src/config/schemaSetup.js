const pool = require('./database');
const {promisify} = require("util")

const query = promisify(pool.query).bind(pool)

async function setupSchema() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

    await query(`
        CREATE TABLE IF NOT EXISTS graph_states (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            graph_name VARCHAR(255) NOT NULL UNIQUE, 
            nodes JSON,
            links JSON,
            directed BOOL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `)

    console.log('Database schema setup completed');
  } catch (error) {
    console.error('Error setting up database schema:', error);
    throw error;
  }
}

module.exports = setupSchema;
