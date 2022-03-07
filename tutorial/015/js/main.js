/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

/**
 * Basic Settings
 */
const colorPlatte = ['#ff6384', '#ff9f33', '#ffce57', '#4bc0c0', '#78c7e7']

const dataset = [5, 8, 13, 21, 34];
const canvasWidth = 800;
const canvasHeight = 500;
const radius = 180;

const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", canvasWidth)
  .attr("height", canvasHeight)
  .style('background', '#f7f9fa');

const gGroup = svg.append("g")
  .attr("transform", "translate(" + (canvasWidth / 2) + ", " + (canvasHeight / 2) + ")");

/**
 * Draw Doughnut Chart
 */
const pieChart = d3.pie()
  .sort(null)
  .value(function(d) {
    return d;
  });

const piedData = pieChart(dataset);

const arcGenerator = d3.arc()
  .outerRadius(radius - 50)
  .innerRadius(radius + 50);

const arcAngle = function(startAngleValue, endAngleValue) {
  const arcText = d3.arc()
    .outerRadius(radius - 50)
    .startAngle(startAngleValue)
    .endAngle(endAngleValue)
    .innerRadius(radius + 50);
// console.log(startAngleValue);
// console.log(endAngleValue);
// console.log(arcText.centroid());
// console.log(" -- - - - ");
  return arcText.centroid();
}

const arcs = gGroup.selectAll(".arc")
  .data(piedData)
  .enter()
  .append("path")
  .attr("class", "arc-class")
  .attr("d", arcGenerator)
  .attr("fill", function(d, i) {
    return colorPlatte[i];
  })
  .style("stroke", "white");

//
console.log({arcs});

const legend = svg.selectAll('.legend')
  .data(dataset)
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    const startAngleValue = arcs._groups[0][i].__data__.startAngle;
    const endAngleValue = arcs._groups[0][i].__data__.endAngle;

    const arcAnglePair = arcAngle(startAngleValue, endAngleValue);
    const horz = arcAnglePair[0] * 1.5;
    const vert = arcAnglePair[1];

    return 'translate(' + arcAngle(startAngleValue, endAngleValue) + ')';
  });

legend.append('text')
  .attr('x', function(d, i) {
    const startAngleValue = arcs._groups[0][i].__data__.startAngle;
    const endAngleValue = arcs._groups[0][i].__data__.endAngle;

    const arcAnglePair = arcAngle(startAngleValue, endAngleValue);
    const horz = arcAnglePair[0];
    const vert = arcAnglePair[1];
    return 400;
  })
  .attr('y', function(d, i) {
    const startAngleValue = arcs._groups[0][i].__data__.startAngle;
    const endAngleValue = arcs._groups[0][i].__data__.endAngle;

    const arcAnglePair = arcAngle(startAngleValue, endAngleValue);
    const horz = arcAnglePair[0];
    const vert = arcAnglePair[1];
    // return vert;
    return 250;
  })
  .attr('dy', function(d) {
    return '0.63em';
  })
  .style("fill", "#fafafa")
  .text(function(d) {
    return d;
  });

/**
 * Center text
 */
gGroup.append("text")
  .attr("text-anchor", "middle")
  .attr('font-size', '3em')
  .attr('x', 0)
  .attr('y', 20)
  .text("D3");
