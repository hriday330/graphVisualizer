/* eslint-disable no-unused-vars */
const runBFS = (nodes, links, setVisitedNodes) => {
  // TODO: BFS algorithm implementation
};

const runDFS = (nodes, links, setVisitedNodes) => {
  // TODO: DFS algorithm implementation

};

const graphAlgorithms = [
  { name: 'Breadth-First Search', description: 'Traverse the graph using BFS', action: runBFS },
  { name: 'Depth-First Search', description: 'Traverse the graph using DFS', action: runDFS },
  // Add more graph algorithms here
];

export default graphAlgorithms;
