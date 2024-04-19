const pool = require('../config/database');

const User = {
  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async create(email, password) {
    await pool.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
  }
};

module.exports = User;