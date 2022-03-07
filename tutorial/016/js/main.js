/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

// https://bl.ocks.org/mbostock/4163057
/**
 * Basic Settings
 */
const canvasWidth = 800;
const canvasHeight = 500;

const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", canvasWidth)
  .attr("height", canvasHeight)
  .style('background', '#f7f9fa');

const colorPlatte1 = ['#ff6384', '#78c7e7'];

/**
 * Draw a arc shape
 */

const pi = Math.PI;
var radiusOutside = 160;
var radiusinside = 110;
var angleOffset = Math.PI / 2;
var circleCenter = {
  x: 380,
  y: 250,
};
var oneDegree = pi / 180;

let dataset = d3.range(180).map(function(d, i) {
  var angleSet = {
    start: i * oneDegree - angleOffset,
    end: (i + 1) * oneDegree - angleOffset,
    fill: d3.hsl(i * 0.7, 1.1, 0.6).toString()
  };

  return angleSet;
});

var arcGenerator = d3.arc()
  .innerRadius(radiusOutside)
  .outerRadius(radiusinside)
  .startAngle(function(d, i) {
    return d.start;
  })
  .endAngle(function(d, i) {
    return d.end;
  });

svg.selectAll('path')
  .data(dataset)
  .enter()
  .append("path")
  .attr("transform", "translate(" + circleCenter.x + ", " + circleCenter.y + ")")
  .attr("d", arcGenerator)
  .attr('stroke', '#f7f7f7')
  .style('fill', function(d, i) {
    return d.fill;
  });

/**
 * Define the arrow head marker
 */
drawArrow(160);

function drawArrow(angle = 15) {
  const markerBoxWidth = 6;
  const markerBoxHeight = 6;
  const refX = markerBoxWidth / 2;
  const refY = markerBoxHeight / 2;
  const arrowPoints = [[0, 0], [0, 6], [6, 3]];
  const datasetLine = [{
    'x1': circleCenter.x,
    'y1': circleCenter.y,
    'x2': getCos(angle),
    'y2': getSin(angle)
  }];

  /**
   * r * cos(angle * PI / 180)
   */
  function getCos(angle) {
    return circleCenter.x - radiusinside * Math.cos(angle * Math.PI / 180);
  }

  /**
   * r * sin(angle * PI /180)
   */
  function getSin(angle) {
    return circleCenter.y - radiusinside * Math.sin(angle * Math.PI / 180);
  }

  // Create a marker element
  svg.append('defs')
    .append('marker')
    .attr('id', 'arrow-marker')
    .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
    .attr('refX', refX)
    .attr('refY', refY)
    .attr('markerWidth', markerBoxWidth)
    .attr('markerHeight', markerBoxHeight)
    .attr('orient', 'auto-start-reverse')
    .append('path')
    .attr('d', d3.line()(arrowPoints))
    .attr('fill', '#ff9f33');

  svg.append('g')
    .selectAll('line')
    .data(datasetLine)
    .enter()
    .append('line')
    .attr('x1', d => d.x1)
    .attr('y1', d => d.y1)
    .attr('x2', d => d.x2)
    .attr('y2', d => d.y2)
    .attr('stroke', '#ff9f33')
    .attr('stroke-width', 2)
    .attr('marker-end', 'url(#arrow-marker)');
}
