const pool = require('../config/database');
const {promisify} = require("util")

const execute = promisify(pool.execute).bind(pool)

const GraphState = {
  async create(userId, graphName, nodes, links, directed) {
    try {
      await execute('INSERT INTO graph_states (user_id, graph_name, nodes, links, directed) VALUES (?, ?, ?, ?, ?)', [userId, graphName, JSON.stringify(nodes), JSON.stringify(links), directed]);
    } catch(err) {
      console.log(err)
    }
  },

  async update(graphName, nodes, links, directed) {
    try{
      await execute('UPDATE graph_states SET nodes = ?, links = ?, directed = ? WHERE graph_name = ?', [nodes, links, directed, graphName])
    } catch(err) {
      console.log(err)
    }
  },

  async findByUserId(userId) {
    try {
      const rows = await execute('SELECT * FROM graph_states WHERE user_id= ?', [userId]);
      return rows;
    } catch(err) {
      console.log(err)
    }
  },

  async findByName(graphName) {
    try {
      const rows = await execute('SELECT * FROM graph_states WHERE graph_name= ?', [graphName]);
      return rows;
    } catch(err) {
      console.log(err)
    }
  }
};

module.exports = GraphState;