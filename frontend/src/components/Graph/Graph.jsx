import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Graph() {
  const [nodes, setNodes] = useState([]);
  const svgRef = useRef();

  const addNode = () => {
    const newNode = { id: nodes.length.toString(), x: 50, y: 50 };
    setNodes([...nodes, newNode]);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    const drag = d3.drag()
      .on('start', (event) => {
        d3.select(event.sourceEvent.target).raise().classed('active', true);
      })
      .on('drag', (event, d) => {
        // eslint-disable-next-line no-param-reassign
        d.x = event.x;
        // eslint-disable-next-line no-param-reassign
        d.y = event.y;
        d3.select(event.sourceEvent.target)
          .attr('cx', d.x)
          .attr('cy', d.y);
      })
      .on('end', (event) => {
        d3.select(event.sourceEvent.target).classed('active', false);
      });

    svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', 10)
      .attr('fill', 'blue')
      .attr('cursor', 'pointer')
      .call(drag);
  }, [nodes]);

  return (
    <div>
      <button type="submit" onClick={addNode}>Add Node</button>
      <svg ref={svgRef} width={400} height={400} style={{ border: '1px solid black' }} />
    </div>
  );
}

export default Graph;
