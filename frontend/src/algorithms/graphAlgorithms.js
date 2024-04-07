const runBFS = (nodes, links, setVisitedNodes) => {
  const visited = new Set();
  const queue = [];

  const startNode = nodes[0];
  queue.push(startNode);
  visited.add(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    visited.add(currentNode);
    setVisitedNodes(visited);
    const neighbors = links.filter((link) => (link.source === currentNode))
      .map((link) => link.target);
    neighbors.forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        visited.add(neighbor);
      }
    });
  }
};

const runDFS = (nodes, links, setVisitedNodes) => {
  const visited = new Set();
  // DFS helper
  const dfsHelper = (currentNode) => {
    setVisitedNodes((prevVisitedNodes) => new Set([...prevVisitedNodes, currentNode]));
    visited.add(currentNode);
    const neighbors = links.filter((link) => link.source === currentNode)
      .map((link) => link.target);
    neighbors.forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        dfsHelper(neighbor);
      }
    });
  };

  const startNode = nodes[0];

  dfsHelper(startNode);
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
