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
const rectPadding = 20;

const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", canvasWidth)
  .attr("height", canvasHeight)
  .style("background", "#f7f9fa");

/**
 * Scale
 */
const dataRange = Array.from(dataset.keys());

const xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset) * 1.2])
  .range([0, canvasWidth - chartPadding- chartPadding]);

const yScale = d3.scaleBand()
  .domain(dataRange)
  .range([canvasHeight - chartPadding + rectPadding / 4, chartPadding])
  .padding(0.2);

const monthIndex = ["January", "February", "March", "April", "May"];
const yScaleMonth = d3.scaleBand()
  .domain(monthIndex)
  .range([chartPadding + rectPadding / 2, canvasHeight - chartPadding]);

/**
 * Draw Rect
 */
svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("transform", "translate(" + chartPadding + ", " + chartPadding * 2 + ")")
  .attr("x", function(d, i) {
    return 0;
  })
  .attr("y", function(d, i) {
    return yScale(i) - chartPadding - chartPadding + rectPadding / 2;
  })
  .attr("width", function(d) {
    return xScale(d);
  })
  .attr("height", function(d) {
    return (yScale.bandwidth() - rectPadding);
  })
  .attr("fill", "#36a2eb");

/**
 * Axis
 */
const xAxis = d3.axisBottom()
  .scale(xScale);

svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(" + chartPadding + ", " + (canvasHeight - chartPadding) + ")")
  .call(xAxis);

const yAxis = d3.axisLeft()
  .scale(yScaleMonth);

svg.append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate(" + chartPadding + ", " + 0 + ")")
  .call(yAxis);

/**
 * Data labels
 */
svg.selectAll(".bar-chart-label")
  .data(dataset)
  .enter()
  .append("text")
  .attr("class", "bar-chart-label")
  .attr("transform", `translate(${chartPadding}, 0)`)
  .attr("x", function(d, i) {
    return xScale(d) - 20;
  })
  .attr("y", function(d, i) {
    return yScale(i) + 35;
  })
  .text(function(d) {
    return d;
  })
  .attr("text-anchor", "middle")
  .attr("fill", "#fcfcfc");
