/* eslint-disable no-unused-vars */
const runBFS = (nodes, links, setVisitedNodes) => {
  // TODO: BFS algorithm implementation
};

const runDFS = (nodes, links, setVisitedNodes) => {
  // TODO: DFS algorithm implementation

};

const graphAlgorithms = [
  {
    name: 'Breadth-First Search', id: 1, description: 'Traverse the graph using BFS', action: runBFS,
  },
  {
    name: 'Depth-First Search', id: 2, description: 'Traverse the graph using DFS', action: runDFS,
  },
  // Add more graph algorithms here
];

export default graphAlgorithms;
