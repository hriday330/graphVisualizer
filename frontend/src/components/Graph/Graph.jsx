/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Graph() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const svgRef = useRef();

  const addNode = () => {
    const newNode = { id: nodes.length.toString(), x: 50, y: 50 };
    setNodes([...nodes, newNode]);
    setSelectedNode(null);
  };

  const addEdge = (source, target) => {
    const newLink = { source, target };
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

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('center', d3.forceCenter(200, 200))
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

    // Draw links
    svg.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6);

    // Draw nodes
    const nodeEnter = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 10)
      .attr('fill', (d) => (selectedNode === d ? 'yellow' : 'blue'))
      .attr('cursor', 'pointer')
      .on('click', (event, d) => handleNodeClick(d))
      .call(drag);

    // Add hover effect
    nodeEnter.on('mouseover', function onMouseOver() {
      d3.select(this).attr('fill', 'red');
    }).on('mouseout', function onMouseOut() {
      d3.select(this).attr('fill', (d) => (selectedNode === d ? 'red' : 'blue'));
    });
  }, [nodes, links, selectedNode]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="h-[70vh] w-full max-w-screen-lg">
        <div className="flex justify-center mb-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full border border-blue-500 hover:border-blue-600 focus:outline-none focus:shadow-outline" type="submit" onClick={addNode}>Add Node</button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full border border-green-500 hover:border-green-600 focus:outline-none focus:shadow-outline" type="submit" onClick={handleAddEdge}>Add Edge</button>
        </div>
        <svg ref={svgRef} className="w-full h-full bg-gray-100 rounded-lg border-2 border-solid border-gray-500" />
      </div>
    </div>
  );
}

export default Graph;
