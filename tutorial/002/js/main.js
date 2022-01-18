/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */
const svg = d3.select("#d3-chart-wrapper")
  .append('svg')
  .attr('width', 800)
  .attr('height', 500)
  .style('background', '#f7f8fa');

// rect
svg.append('rect')
  .attr('x', 300)
  .attr('y', 60)
  .attr('width', 233)
  .attr('height', 100)
  .attr('fill', '#78c7e7');

// circle
svg.append('circle')
  .attr('cx', 200)
  .attr('cy', 380)
  .attr('r', 100)
  .attr('stroke', '#36a2eb')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

// ellipse
svg.append('ellipse')
  .attr('cx', 580)
  .attr('cy', 380)
  .attr('rx', 144)
  .attr('ry', 89)
  .attr('stroke', '#36a2eb')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

// circle example
d3.select("#circle-example")
  .append('svg')
  .attr('width', 500)
  .attr('height', 309)
  .style('background', '#0099ff')
  .append('circle')
  .attr('cx', 210)
  .attr('cy', 150)
  .attr('r', 90)
  .attr('fill', '#ffff00');


/**
 * Reference
 */
const svgReference = d3.select("#d3-chart-reference")
  .append('svg')
  .attr('width', 800)
  .attr('height', 500)
  .style('background', '#f7f8fa');

// rect
svgReference.append('rect')
  .attr('x', 300)
  .attr('y', 60)
  .attr('width', 233)
  .attr('height', 100)
  .attr('fill', '#78c7e7');

// circle
svgReference.append('circle')
  .attr('cx', 200)
  .attr('cy', 380)
  .attr('r', 100)
  .attr('stroke', '#36a2eb')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

// ellipse
svgReference.append('ellipse')
  .attr('cx', 580)
  .attr('cy', 380)
  .attr('rx', 144)
  .attr('ry', 89)
  .attr('stroke', '#36a2eb')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

/**
 * SVG elements
 */
const dataset = [
  {
    'name': 'x,y',
    'type': 'circle',
    'xAxis': 300,
    'yAxis': 60
  },
  {
    'name': 'cx,cy',
    'type': 'circle',
    'xAxis': 200,
    'yAxis': 380
  },
  {
    'name': 'cx,cy',
    'type': 'circle',
    'xAxis': 580,
    'yAxis': 380
  },
  {
    'name': 'width',
    'type': 'line',
    'xAxis': 420,
    'yAxis': 45,
    'x1': 400,
    'x2': 525,
    'y1': 43,
    'y2': 43
  },
  {
    'name': '',
    'type': 'line',
    'xAxis': 420,
    'yAxis': 45,
    'x1': 400,
    'x2': 305,
    'y1': 43,
    'y2': 43
  },
  {
    'name': 'height',
    'type': 'line',
    'xAxis': 575,
    'yAxis': 120,
    'x1': 550,
    'x2': 550,
    'y1': 100,
    'y2': 155
  },
  {
    'name': '',
    'type': 'line',
    'xAxis': 575,
    'yAxis': 120,
    'x1': 550,
    'x2': 550,
    'y1': 100,
    'y2': 65
  },
  {
    'name': 'r(radius)',
    'type': 'line',
    'xAxis': 260,
    'yAxis': 420,
    'x1': 200,
    'x2': 270,
    'y1': 380,
    'y2': 445
  },
  {
    'name': 'ry(radius y)',
    'type': 'line',
    'xAxis': 605,
    'yAxis': 450,
    'x1': 580,
    'x2': 580,
    'y1': 380,
    'y2': 463
  },
  {
    'name': 'rx(radius x)',
    'type': 'line',
    'xAxis': 705,
    'yAxis': 380,
    'x1': 580,
    'x2': 717,
    'y1': 380,
    'y2': 380
  },
];

const datasetCircle = dataset.filter(function(d) {
  return d.type == 'circle';
});

const datasetLine = dataset.filter(function(d) {
  return d.type == 'line';
});

// Append the circle
svgReference.append('g')
  .selectAll('circle')
  .data(datasetCircle)
  .enter()
  .append('circle')
  .attr('r', 5)
  .attr('transform', function(d, i){
    return 'translate(' + d.xAxis + ',' + d.yAxis + ')'
  })
  .attr('fill', '#ff9f33')
  .attr("r", 5);

// Append text for circle
svgReference.append('g')
  .selectAll('text')
  .data(datasetCircle)
  .enter()
  .append('text')
  .attr('transform', function(d, i){
    return 'translate(' + (d.xAxis - 20) + ',' + (d.yAxis - 7) + ')'
  })
  .text(function(d, i) {
    return d.name;
  });

// Append text for circle
svgReference.append('g')
  .selectAll('text')
  .data(datasetLine)
  .enter()
  .append('text')
  .attr('transform', function(d, i){
    return 'translate(' + (d.xAxis - 20) + ',' + (d.yAxis - 6) + ')'
  })
  .text(function(d, i) {
    return d.name;
  });

// Define the arrow head marker
const markerBoxWidth = 6;
const markerBoxHeight = 6;
const refX = markerBoxWidth / 2;
const refY = markerBoxHeight / 2;
const markerWidth = markerBoxWidth / 2;
const markerHeight = markerBoxHeight / 2;
const arrowPoints = [[0, 0], [0, 6], [6, 3]];

// Create a marker element
svgReference.append('defs')
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

svgReference.append('g')
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
