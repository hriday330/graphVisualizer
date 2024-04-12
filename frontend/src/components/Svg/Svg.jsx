/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

function Svg({
  nodes, links, selectedNode, selectedEdge, visitedNodes, directed,
  handleNodeClick, handleEdgeClick,
}) {
  const svgRef = useRef();

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
    return () => {
      svg.selectAll('.node').on('.drag', null);
      svg.selectAll('.link').on('.click', null);
    };
  }, [nodes, links, selectedNode, selectedEdge, visitedNodes, directed]);

  return (
    <svg ref={svgRef} className="w-full h-full bg-gray-100 rounded-lg border-2 border-solid border-gray-500 " />
  );
}

Svg.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.shape({
      id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    target: PropTypes.shape({
      id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
  selectedNode: PropTypes.oneOfType(PropTypes.shape({
    id: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }), PropTypes.oneOf([null])),
  selectedEdge: PropTypes.oneOfType(PropTypes.shape({
    source: PropTypes.shape({
      id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    target: PropTypes.shape({
      id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  }), PropTypes.oneOf([null])),
  visitedNodes: PropTypes.instanceOf(Set).isRequired,
  directed: PropTypes.bool.isRequired,
  handleNodeClick: PropTypes.func.isRequired,
  handleEdgeClick: PropTypes.func.isRequired,
};

export default Svg;
