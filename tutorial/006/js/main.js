/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

/**
 * Basic Settings
 */
const dataset = [21, 34, 55, 89, 144];

const canvasWidth = 800;
const canvasHeight = 500;

const chartPadding = 50;
const rectPadding = 55;

const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", canvasWidth)
  .attr("height", canvasHeight)
  .style("background", "#f7f9fa");

/**
 * Scale
 */
const dataRange = [0, 1, 2, 3, 4];
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
 * Draw Rect
 */
svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("transform", "translate(" + chartPadding + ", " + 0 + ")")
  .attr("x", function(d, i) {
    return xScale(i) + rectPadding / 2;
  })
  .attr("y", function(d, i) {
    return yScale(d);
  })
  .attr("width", (xScale.bandwidth() - rectPadding))
  .attr("height", function(d, i) {
    return canvasHeight - yScale(d) - chartPadding;
  })
  .attr("fill", "#36a2eb");

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
