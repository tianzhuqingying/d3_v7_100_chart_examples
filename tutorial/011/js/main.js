/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

/**
 * Basic Settings
 */
const dataset = [21, 34, 89, 55, 144];

const canvasWidth = 800;
const canvasHeight = 500;

const chartPadding = 50;
const ciclePadding = 20;

const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", canvasWidth)
  .attr("height", canvasHeight)
  .style("background", "#f7f9fa");

/**
 * Scale
 */
const dataRange = Array.from(dataset.keys());
const xScale = d3.scaleBand()
  .domain(dataRange)
  .range([0, canvasWidth - chartPadding - chartPadding]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset) * 1.2])
  .range([canvasHeight - chartPadding, 0 + chartPadding]);

const monthIndex = ["January", "February", "March", "April", "May"];
const xScaleMonth = d3.scaleBand()
  .domain(monthIndex)
  .range([0, canvasWidth - chartPadding - chartPadding]);

/**
 * 演示用
 */
// svg.append('line')
//   .attr('x1', 120)
//   .attr('y1', 400)
//   .attr('x2', 260)
//   .attr('y2', 370)
//   .attr('stroke', '#36a2eb')
//   .attr('stroke-width', 2);
/**
 * 演示用
 */
// svg.append('path')
//   .attr('d', 'M120,400 L260,370 L400,245')
//   .style('fill', 'none')
//   .style('stroke', '#1f77b4')
//   .style('stroke-width', 2);

var lineGenerator = d3.line();
var points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 80]
];
var pathData = lineGenerator(points);

console.log({pathData});
/**
 * https://observablehq.com/@d3/d3-line
 * line generator
 */
const lineShape = d3.line()
// const lineShape = d3.area()
  .x(function(d, i) {
    return xScale(i);
  })
  .y(function(d) {
    return yScale(d);   // top of area
  })
  // .y0(yScale(0))    // bottom of area
  // .curve(d3.curveMonotoneX);

svg.append("g")
  .append("path")
  .datum(dataset)
  .attr("transform", "translate(" + 120 + "," + 0 + ")")
  .attr("d", lineShape)
  // .style("fill", "#78c7e7")
  .style("fill", "none")
  .style("opacity", "0.6")
  .style("stroke", "#ff6384")
  .style("stroke-width", "2");

/**
 * Draw circle
 */
svg.append('g')
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("transform", "translate(" + (chartPadding * 2 + ciclePadding) + ", " + 0 + ")")
  .attr("r", function(d, i) {
    return 5;
  })
  .attr("cx", function(d, i) {
    return xScale(i);
  })
  .attr("cy", function(d, i) {
    return yScale(d);
  })
  // .attr("fill", "none")
  .attr("fill", "#36a2eb")
  .attr("stroke", "#36a2eb")
  .style("stroke-width", 2)
  // Mouse Events
  .on('mouseover', mouseoverHandler)
  .on('mouseout', mouseoutHandler);

/**
 * Mouseover
 */
function mouseoverHandler(event, datum) {
  d3.select(this)
    .transition()
    .attr("fill", "#ff6384");

  const hoverValue = d3.select(this).data()[0];
  svg.append("text")
    .attr("class", "hover-text")
    .attr("x", event.layerX + 10)
    .attr("y", event.layerY)
    .text(datum)
    .attr("fill", "#3c3c3c");
}

/**
 * Mouseout
 */
function mouseoutHandler(event, datum) {
  d3.selectAll(".hover-text").remove();

  d3.select(this)
    .transition()
    .attr("fill", "none");
}

/**
 * Axis
 */
const xAxis = d3.axisBottom()
  .scale(xScaleMonth);

svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(" + chartPadding + ", " + (canvasHeight - chartPadding) + ")")
  .call(xAxis);

const yAxis = d3.axisLeft()
  .scale(yScale);

svg.append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate(" + chartPadding + ", " + 0 + ")")
  .call(yAxis);
