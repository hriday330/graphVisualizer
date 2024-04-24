const pool = require('../config/database');
const {promisify} = require("util")

const execute = promisify(pool.execute).bind(pool)

const GraphState = {
  async create(userId,graphName, nodes, links) {
    try {
      //const connection = await pool.getConnection()
      await execute('INSERT INTO graph_states (user_id, graph_name, nodes, links) VALUES (?, ?, ?, ?)', [userId, graphName, JSON.stringify(nodes), JSON.stringify(links)]);
      console.log('done')
    } catch(e) {
      console.log(e)
    }
  },

  async findByUserId(userId) {
    try {
      const rows = await execute('SELECT * FROM graph_states WHERE user_id= ?', [userId]);
      return rows;
    } catch(err) {
      console.log(err)
    }
  }
};

module.exports = GraphState;