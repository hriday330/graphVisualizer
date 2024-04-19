const pool = require('../config/database');

const GraphState = {
  async create(userId, nodes, links) {
    await pool.execute('INSERT INTO graph_states (user_id, nodes, links) VALUES (?, ?, ?)', [userId, JSON.stringify(nodes), JSON.stringify(links)]);
  },

  async findByUserId(userId) {
    const [rows] = await pool.execute('SELECT * FROM graph_states WHERE user_id = ?', [userId]);
    return rows;
  }
};

module.exports = GraphState;