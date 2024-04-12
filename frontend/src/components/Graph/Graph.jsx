/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
  Button, Checkbox, Typography, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import { getRandomInt } from '../../util';
import graphAlgorithms from '../../algorithms/graphAlgorithms';
import SplitButton from '../SplitButton/SplitButton';
import Confirm from '../Confirm/Confirm';

const INIT_MIN_DIMENSION = 300;
const INIT_MAX_DIMENSION = 500;
function Graph() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [algorithm, setAlgorithm] = useState(graphAlgorithms[0]);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [directed, setDirected] = useState(true);
  const [openClearDialog, setOpenClearDialog] = useState(false);

  const handleClear = () => {
    setOpenClearDialog(true);
  };

  const handleConfirmClear = () => {
    setNodes([]);
    setLinks([]);
    setSelectedNode(null);
    setSelectedEdge(null);
    setVisitedNodes(new Set());
    setOpenClearDialog(false);
  };

  const handleCancelClear = () => {
    setOpenClearDialog(false);
  };

  const confirmProps = {
    handleConfirm: handleConfirmClear,
    handleCancel: handleCancelClear,
    openDialog: openClearDialog,
    dialogTitle: 'Clear Graph?',
    dialogDescr: 'Are you sure you want to clear the graph?',
  };

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

  const handleClearNode = () => {
    const updatedNodes = nodes.filter((node) => node !== selectedNode);
    const updatedLinks = links.filter((link) => (
      (link.target !== selectedNode) && (link.source !== selectedNode)));
    setNodes(updatedNodes);
    setLinks(updatedLinks);
    if (selectedEdge
      && (selectedEdge.source === selectedNode || selectedEdge.target === selectedNode)) {
      setSelectedEdge(null);
    }
    setSelectedNode(null);
  };

  const handleClearEdge = () => {
    const updatedLinks = links.filter((link) => link !== selectedEdge);
    setLinks(updatedLinks);
    setSelectedEdge(null);
  };

  const handleNodeClick = (node) => {
    if (selectedNode && node.index !== selectedNode.index) {
      addEdge(selectedNode, node);
      setSelectedNode(null);
    } else {
      setSelectedNode(node === selectedNode ? null : node);
    }
  };

  const handleEdgeClick = (event, edge) => {
    if (!selectedEdge) {
      setSelectedEdge(edge);
    } else {
      setSelectedEdge(null);
    }
  };

  const handleRunAlgorithm = (selectedOption) => {
    setAlgorithm(selectedOption);
    setVisitedNodes((prevVisited) => new Set()); // clear past execution;
    selectedOption.action(nodes, links, setVisitedNodes, setLinks, directed);
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

    const linkEnter = svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('stroke', (d) => (d.visited ? 'green' : '#999'))
      .on('click', (event, d) => handleEdgeClick(event, d))
      .attr('stroke-opacity', (d) => (d.visited ? 3 : 1.5));

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
      .text((d) => `${d.index}`);
    // Handle hover
    nodeEnter.on('mouseover', function onMouseOver() {
      d3.select(this).attr('fill', 'red');
    }).on('mouseout', function onMouseOut() {
      d3.select(this).attr('fill', (d) => (selectedNode === d ? 'red' : 'blue'));
    });

    linkEnter.on('mouseover', function onMouseOver() {
      d3.select(this).attr('stroke', 'red');
    }).on('mouseout', function onMouseOut() {
      d3.select(this).attr('stroke', (d) => (selectedEdge === d ? 'red' : '#999'));
    });
  }, [nodes, links, selectedNode, selectedEdge, visitedNodes, directed]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="h-[70vh] w-full max-w-screen-lg">
        <div className="flex justify-center mb-4">
          <Button
            onClick={addNode}
            className="shadow-md"
          >
            {' '}
            Add Node
          </Button>
          <Button variant="contained" disabled={!selectedNode} onClick={handleClearNode}> Delete Node </Button>
          <Button onClick={handleClearEdge} disabled={!selectedEdge} className="shadow-md"> Delete Edge </Button>
          <Button variant="contained" onClick={handleClear}> Clear</Button>
          <SplitButton
            selectedOption={algorithm}
            options={graphAlgorithms}
            onClick={handleRunAlgorithm}
            contained
          />
          <Typography
            sx={{ fontSize: '14px' }}
            className="px-4 py-2 text-white bg-gray-400 rounded-l-md shadow-md cursor-pointer focus:outline-none focus:ring focus:ring-blue-300"
          >
            <Checkbox
              checked={directed}
              onChange={(e) => setDirected(e.target.checked)}
              color="default"
            />
            DIRECTED
          </Typography>
          <Confirm {...confirmProps} />

        </div>
        <svg ref={svgRef} className="w-full h-full bg-gray-100 rounded-lg border-2 border-solid border-gray-500 " />
      </div>
    </div>
  );
}

export default Graph;
