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
const rectPadding = 60;

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
const drawRect = svg.selectAll("rect")
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
  .attr("fill", "#36a2eb")
  // Mouse Events
  .on('mouseover', mouseoverHandler)
  .on('mouseout', mouseoutHandler);

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
  .attr("x", 330)
  .attr("y", 60)
  .text("Sales 2022 Year")
  .attr("fill", "#78c7e7");

/**
 * Mouse Event Information
 */
const chartInfo = d3.select(".legend-info")
  .style("visibility", "hidden")
  .text("");

/**
 * Mouseover
 */
function mouseoverHandler(event, datum) {
  chartInfo.html("Value: " + datum + "<br /> Percentage: " + calcPercentage(datum))
    .style('visibility', 'visible');

  d3.select(this)
    .transition()
    .attr("fill", "#ff6384");

  var hoverValue = d3.select(this).data()[0];
  svg.append("text")
    .attr("class", "hover-text")
    .attr("x", event.layerX + 5)
    .attr("y", event.layerY)
    .text(calcPercentage(hoverValue))
    .attr("fill", "#3c3c3c");
}

/**
 * Mouseout
 */
function mouseoutHandler(event, datum) {
  chartInfo.style('visibility', 'hidden');

  d3.selectAll(".hover-text").remove();

  d3.select(this)
    .transition()
    // .duration(100)
    .attr("fill", "#36a2eb");
}

/**
 * Mouseout
 */
function calcPercentage(partial) {
  const total = d3.sum(dataset);
  return (partial / total * 100).toFixed(2) + "%";
}

