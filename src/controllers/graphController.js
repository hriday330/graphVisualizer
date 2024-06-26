const GraphState = require('../models/graphState');

const graphController = {
  async save(req, res) {
    const {userId, graphName, nodes, links } = req.body;
    try {
      await GraphState.create(userId, graphName, nodes, links);
      res.status(201).json({ message: 'Graph state saved successfully' });
    } catch (error) {
      console.error('Error saving graph state:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getByUserId(req, res) {
    const userId = req.params.userId;
    console.log(userId)
    try {
      const graphStates = await GraphState.findByUserId(userId);
      res.status(200).json(graphStates);
    } catch (error) {
      console.error('Error retrieving graph states:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = graphController;