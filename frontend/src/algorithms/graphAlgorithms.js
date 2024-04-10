import { sleep } from '../util';
// eslint-disable-next-line no-unused-vars

const computeNeighbors = (edges) => {
  const neighbors = {};
  edges.forEach((edge) => {
    const endPoint1 = edge.source.index;
    const endPoint2 = edge.target.index;
    if (!neighbors[endPoint1]) {
      neighbors[endPoint1] = [edge.target];
    } else {
      neighbors[endPoint1] = [...neighbors[endPoint1], edge.target];
    }

    if (!neighbors[endPoint2]) {
      neighbors[endPoint2] = [edge.source];
    } else {
      neighbors[endPoint2] = [...neighbors[endPoint2], edge.source];
    }
  });

  return neighbors;
};

const runBFS = async (nodes, links, setVisitedNodes, delay = 250) => {
  const visited = new Set();
  const queue = [];

  const startNode = nodes[0];
  queue.push(startNode);
  visited.add(startNode);
  const neighbors = computeNeighbors(links);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    // eslint-disable-next-line no-await-in-loop
    await sleep(delay);
    visited.add(currentNode);
    setVisitedNodes((prevVisitedNodes) => (new Set([...prevVisitedNodes, currentNode])));
    const currentNeighbors = neighbors[currentNode.index];
    currentNeighbors.forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    });
  }
};

const runDFS = async (nodes, links, setVisitedNodes, delay = 250) => {
  const visited = new Set();
  const neighbors = computeNeighbors(links);
  const stack = [];
  const startNode = nodes[0];
  stack.push(startNode);
  while (stack.length > 0) {
    const currentNode = stack.pop();
    // eslint-disable-next-line no-await-in-loop
    await sleep(delay);
    visited.add(currentNode);
    setVisitedNodes((prevVisitedNodes) => (new Set([...prevVisitedNodes, currentNode])));
    const currentNeighbors = neighbors[currentNode.index];
    currentNeighbors.forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    });
  }
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
