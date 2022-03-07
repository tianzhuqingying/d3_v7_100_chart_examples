/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

// https://github.com/d3/d3-shape#arcs

/**
 * Basic Settings
 */
const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", 800)
  .attr("height", 500)
  .style('background', '#f7f9fa');

/**
 * Draw a arc shape
 */
const arcGenerator = d3.arc()
  .innerRadius(120)
  .outerRadius(80)      // Pie is 0, Doughnut is more than 0
  .startAngle(0)      // It's in radian, so Pi = 3.14 = bottom.
  .endAngle(3.14);       // 2*Pi = 6.28 = top;
  // .endAngle(Math.PI);       // 2*Pi = 6.28 = top;

svg
  .append("path")
  .attr("transform", "translate(300, 250)")
  .attr("d", arcGenerator)
  .attr('stroke', '#f7f7f7')
  .attr('fill', '#36a2eb');

/**
 * Draw circle based on the center of arc shape
 */
const center = arcGenerator.centroid();
console.log(center);

svg.append('circle')
  .attr("transform", "translate(300, 250)")
  .attr('cx', center[0] * 1)
  .attr('cy', center[1] * 1)
  .attr('r', 5)
  .attr('fill', '#ff6384');
