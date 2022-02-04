/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

/**
 * Basic Settings
 */
const dataset = [21, 34, 55, 89, 144];
// const dataset = [21, 34, 55, 89, 144, 189];

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
// const dataRange = [0, 1, 2, 3, 4];
const dataRange = Array.from(dataset.keys());
const xScale = d3.scaleBand()
  .domain(dataRange)
  .range([0, canvasWidth - chartPadding - chartPadding]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset) * 1.2])
  .range([canvasHeight - chartPadding, 0 + chartPadding]);

// const monthIndex = ["January", "February", "March", "April", "May", "June"];
const monthIndex = ["January", "February", "March", "April", "May"];
const xScaleMonth = d3.scaleBand()
  .domain(monthIndex)
  .range([0, canvasWidth - chartPadding - chartPadding]);

// Color Scale
const colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range(["#78c7e7", "#ff6384"]);
const colorPlatte =["#7fc97f","#beaed4"];

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
  // .attr("fill", "#36a2eb")
  .attr("fill", function(d, i) {
    // return colorPlatte[i];
    return colorScale(d);
  });

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
    return xScale(i) + (xScale.bandwidth() / 2);
  })
  .attr("y", function(d) {
    return yScale(d) + 17;
  })
  .text(function(d) {
    return d;
  })
  .attr("text-anchor", "middle")
  .attr("fill", "#fcfcfc");

/**
 * Legend title
 */
svg.append("text")
  .attr("x", 250)
  .attr("y", 60)
  .text("Sales 2022 Year")
  .attr("fill", "#78c7e7");

svg.append('rect')
  .attr('x', 600)
  .attr('y', 46)
  .attr('width', 30)
  .attr('height', 18)
  .attr('fill', '#ff6384');
svg.append("text")
  .attr("x", 634)
  .attr("y", 60)
  .text("Max");

svg.append('rect')
  .attr('x', 600)
  .attr('y', 26)
  .attr('width', 30)
  .attr('height', 18)
  .attr('fill', '#78c7e7');
svg.append("text")
  .attr("x", 634)
  .attr("y", 40)
  .text("Min");

/**
 * Moving average
 */
const meanValue = d3.mean(dataset);
const meanNum = chartPadding + yScale(meanValue);
svg.append('line')
  .attr("x1", chartPadding)
  .attr("y1", meanNum - chartPadding)
  .attr("x2", (canvasWidth - chartPadding))
  .attr("y2", meanNum - chartPadding)
  .attr("stroke", "#eb7636");
