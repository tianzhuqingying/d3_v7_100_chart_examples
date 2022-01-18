/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */
const svg = d3.select("#d3-chart-wrapper")
  .append('svg')
  .attr('width', 600)
  .attr('height', 380)
  .style('background', '#f7f8fa');

svg.append('circle')
  .attr('cx', 330)
  .attr('cy', 80)
  .attr('r', 3)
  .attr('stroke', '#36a2eb')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

svg.append('circle')
  .attr('cx', 500)
  .attr('cy', 180)
  .attr('r', 3)
  .attr('stroke', '#36a2eb')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

// line
svg.append('line')
  .attr('x1', 330)
  .attr('y1', 80)
  .attr('x2', 500)
  .attr('y2', 180)
  .attr('stroke', '#36a2eb')
  .attr('stroke-width', 2);

// polyline
svg.append('polyline')
  .attr('points', '8,34 55,144 89,55 144,89')
  .attr('stroke', '#36a2eb')
  .attr('stroke-width', 2)
  .style('fill', 'none');

// polygon
svg.append('polygon')
  .attr('points', [[100,100],[150,150],[150,200],[100,250],[50,200],[50,150]])
  .attr('stroke', '#36a2eb')
  .attr('stroke-width', 2)
  .style('fill', '#eb7636')
  .attr('transform', 'translate(150, 100)');
