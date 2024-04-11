import { sleep } from '../util';
// eslint-disable-next-line no-unused-vars
const getUpdatedEdges = (links, parentMap) => links.map((edge) => {
  const sourceVisited = parentMap[edge.target.index] !== undefined
      && parentMap[edge.target.index] === edge.source;
  const targetVisited = parentMap[edge.source.index] !== undefined
      && parentMap[edge.source.index] === edge.target;
  if (sourceVisited || targetVisited) {
    return { ...edge, visited: true };
  }
  return { ...edge, visited: false };
});
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

const runBFS = async (nodes, links, setVisitedNodes, setLinks, delay = 500) => {
  const visited = new Set();
  const queue = [];
  const startNode = nodes[0];
  queue.push(startNode);
  visited.add(startNode);
  const neighbors = computeNeighbors(links);
  const parentMap = {};
  const clearedEdges = links.map((edge) => ({ ...edge, visited: false }));
  setLinks(clearedEdges);
  while (queue.length > 0) {
    const currentNode = queue.shift();
    // eslint-disable-next-line no-await-in-loop
    await sleep(delay);
    visited.add(currentNode);
    setVisitedNodes((prevVisitedNodes) => (new Set([...prevVisitedNodes, currentNode])));
    const currentNeighbors = neighbors[currentNode.index];
    currentNeighbors.forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        parentMap[neighbor.index] = currentNode;
        queue.push(neighbor);
        visited.add(neighbor);
      }
    });
  }
  // mark tree edges from traversal
  const updatedEdges = getUpdatedEdges(links, parentMap);

  setLinks(updatedEdges);
};

const runDFS = async (nodes, links, setVisitedNodes, setLinks, delay = 500) => {
  const visited = new Set();
  const neighbors = computeNeighbors(links);
  const stack = [];
  const startNode = nodes[0];
  const parentMap = {};
  stack.push(startNode);
  const clearedEdges = links.map((edge) => ({ ...edge, visited: false }));
  setLinks(clearedEdges);
  while (stack.length > 0) {
    const currentNode = stack.pop();
    // eslint-disable-next-line no-await-in-loop
    await sleep(delay);
    visited.add(currentNode);
    setVisitedNodes((prevVisitedNodes) => (new Set([...prevVisitedNodes, currentNode])));
    const currentNeighbors = neighbors[currentNode.index];
    currentNeighbors.forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        parentMap[neighbor.index] = currentNode;
        stack.push(neighbor);
      }
    });
  }

  const updatedEdges = getUpdatedEdges(links, parentMap);
  setLinks(updatedEdges);
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
