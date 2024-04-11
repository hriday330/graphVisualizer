/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
  Button,
} from '@mui/material';
import { getRandomInt } from '../../util';
import graphAlgorithms from '../../algorithms/graphAlgorithms';
import SplitButton from '../SplitButton/SplitButton';

const INIT_MIN_DIMENSION = 300;
const INIT_MAX_DIMENSION = 500;

function Graph() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [algorithm, setAlgorithm] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [directed, setDirected] = useState(true);

  const svgRef = useRef();
  const addNode = () => {
    const newNode = {
      id: nodes.length.toString(),
      x: getRandomInt(INIT_MIN_DIMENSION, INIT_MAX_DIMENSION),
      y: getRandomInt(INIT_MIN_DIMENSION, INIT_MAX_DIMENSION),
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(null);
  };

  const addEdge = (source, target) => {
    const newLink = { source, target, visited: false };
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  const handleAddEdge = () => {
    setSelectedNode(null);
  };

  const handleNodeClick = (node) => {
    if (selectedNode && node.index !== selectedNode.index) {
      addEdge(selectedNode, node);
      setSelectedNode(null);
    } else {
      setSelectedNode(node === selectedNode ? null : node);
    }
  };

  const handleRunAlgorithm = (selectedOption) => {
    setAlgorithm(selectedOption);
    setVisitedNodes((prevVisited) => new Set()); // clear past execution;
    selectedOption.action(nodes, links, setVisitedNodes, setLinks);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 13)
      .attr('markerHeight', 13)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#999');

    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-20))
      .force('link', d3.forceLink(links).distance(50))
      .on('tick', () => {
        svg.selectAll('.link')
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);

        svg.selectAll('.node')
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y);

        svg.selectAll('.node-text')
          .attr('x', (d) => d.x)
          .attr('y', (d) => d.y);
      });

    const drag = d3.drag()
      .on('start', (event) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      })
      .on('drag', (event) => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      })
      .on('end', (event) => {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      });

    svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('stroke', (d) => (d.visited ? 'red' : '#999'))
      .attr('stroke-opacity', (d) => (d.visited ? 1 : 0.6));

    if (directed) svg.selectAll('.link').attr('marker-end', 'url(#arrowhead)'); // Add arrowhead marker
    const nodeEnter = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 15) // TODO: extract into constant
      .attr('fill', (d) => (visitedNodes.has(d) ? 'green' : 'blue')) // Update fill based on visitedNodes
      .attr('cursor', 'pointer')
      .on('click', (event, d) => handleNodeClick(d))
      .call(drag);

    svg.selectAll('.node-text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('class', 'node-text')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.id);
    // Handle hover
    nodeEnter.on('mouseover', function onMouseOver() {
      d3.select(this).attr('fill', 'red');
    }).on('mouseout', function onMouseOut() {
      d3.select(this).attr('fill', (d) => (selectedNode === d ? 'red' : 'blue'));
    });
  }, [nodes, links, selectedNode, visitedNodes]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="h-[70vh] w-full max-w-screen-lg">
        <div className="flex justify-center mb-4">
          <Button onClick={addNode}> Add Node </Button>
          <Button variant="contained" onClick={handleAddEdge}> Add Edge </Button>
          <SplitButton
            selectedOption={algorithm}
            options={graphAlgorithms}
            onClick={handleRunAlgorithm}
          />
        </div>
        <svg ref={svgRef} className="w-full h-full bg-gray-100 rounded-lg border-2 border-solid border-gray-500 " />
      </div>
    </div>
  );
}

export default Graph;
