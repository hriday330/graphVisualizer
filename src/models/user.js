const pool = require('../config/database');

const {promisify} = require("util")
const execute = promisify(pool.execute).bind(pool)

const User = {
  async findByEmail(email) {
    try {
      const rows = await execute('SELECT * FROM users WHERE email = ?', [email]);
      return (rows ?? []).length > 0 ? rows[0] : null; // Return the first row or null
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null; // Return null in case of an error
    }
  },

  async create(email, password) {
    try {
      await execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
      return true; // Return true to indicate successful creation
    } catch (error) {
      console.error('Error creating user:', error);
      return false; // Return false in case of an error
    }
  }
};

module.exports = User;
