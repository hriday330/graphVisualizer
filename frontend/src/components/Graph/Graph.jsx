/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useMemo } from 'react';
import {
  Button, Checkbox, Typography, Stack,
} from '@mui/material';
import { getRandomInt } from '../../util';
import graphAlgorithms from '../../algorithms/graphAlgorithms';
import SplitButton from '../SplitButton/SplitButton';
import Confirm from '../Confirm/Confirm';
import Svg from '../Svg/Svg';

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

  const addNode = useCallback(() => {
    const newNode = {
      id: nodes.length.toString(),
      x: getRandomInt(INIT_MIN_DIMENSION, INIT_MAX_DIMENSION),
      y: getRandomInt(INIT_MIN_DIMENSION, INIT_MAX_DIMENSION),
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(null);
  }, [nodes]);

  const addEdge = useCallback((source, target) => {
    const newLink = { source, target, visited: false };
    setLinks((prevLinks) => [...prevLinks, newLink]);
  }, [links]);

  const handleClearNode = useCallback(() => {
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
  }, [nodes, links, selectedNode, selectedEdge]);

  const handleClearEdge = useCallback(() => {
    const updatedLinks = links.filter((link) => link !== selectedEdge);
    setLinks(updatedLinks);
    setSelectedEdge(null);
  }, [links, selectedEdge]);

  const handleNodeClick = useCallback((node) => {
    if (selectedNode && node.index !== selectedNode.index) {
      addEdge(selectedNode, node);
      setSelectedNode(null);
    } else {
      setSelectedNode(node === selectedNode ? null : node);
    }
  }, [selectedNode]);

  const handleEdgeClick = useCallback((event, edge) => {
    if (!selectedEdge) {
      setSelectedEdge(edge);
    } else {
      setSelectedEdge(null);
    }
  }, [selectedEdge]);

  const handleRunAlgorithm = useCallback((selectedOption) => {
    setAlgorithm(selectedOption);
    // eslint-disable-next-line no-unused-vars
    setVisitedNodes((prevVisited) => new Set()); // clear past execution;
    selectedOption.action(nodes, links, setVisitedNodes, setLinks, directed);
  }, [nodes, links, directed]);

  const confirmProps = useMemo(() => ({
    handleConfirm: handleConfirmClear,
    handleCancel: handleCancelClear,
    openDialog: openClearDialog,
    dialogTitle: 'Clear Graph?',
    dialogDesc: 'Are you sure you want to clear the graph?',
  }), [handleConfirmClear, handleCancelClear, openClearDialog]);

  const svgProps = useMemo(() => ({
    nodes,
    links,
    selectedNode,
    selectedEdge,
    visitedNodes,
    directed,
    handleNodeClick,
    handleEdgeClick,
  }), [nodes, links, selectedNode, selectedEdge, visitedNodes, directed]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="h-[70vh] w-full max-w-screen-lg">
        <div className="ml-1 mr-1 mb-4">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} justifyContent="center">
            <Button
              onClick={addNode}
              className="shadow-md"
            >
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
          </Stack>
          <Confirm {...confirmProps} />
        </div>
        <Svg {...svgProps} />
      </div>
    </div>
  );
}

export default Graph;
