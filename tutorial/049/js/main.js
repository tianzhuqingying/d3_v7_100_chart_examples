/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

/**
 * @References
 * https://www.d3indepth.com/shapes/#stack-generator
 */
/**
 * Basic Settings
 */
const colorPlatte = ['#ff6384', '#c9cbcf', '#ffce57'];
const margin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 60
};
const canvasWidth = 600;
const canvasHeight = 500;

const svg = d3.select("#d3-chart-wrapper")
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const dataset = [
  {
    "team": "Canada",
    "summer_participated": "27",
    "summer_gold": "71",
    "summer_sliver": "109",
    "summer_bronze": "146",
    "summer_total": "326",
  },
  {
    "team": "China",
    "summer_participated": "11",
    "summer_gold": "262",
    "summer_sliver": "199",
    "summer_bronze": "173",
    "summer_total": "634",
  },
  {
    "team": "France",
    "summer_participated": "29",
    "summer_gold": "223",
    "summer_sliver": "251",
    "summer_bronze": "277",
    "summer_total": "751",
  },
  {
    "team": "Spain",
    "summer_participated": "24",
    "summer_gold": "48",
    "summer_sliver": "72",
    "summer_bronze": "49",
    "summer_total": "169",
  },
  {
    "team": "United States",
    "summer_participated": "28",
    "summer_gold": "1060",
    "summer_sliver": "831",
    "summer_bronze": "738",
    "summer_total": "2629",
  },
];

/**
 * Draw stack
 */
const stack = d3.stack()
  .keys(['summer_gold', 'summer_sliver', 'summer_bronze']);

const stackedSeries = stack(dataset);

// Create a g element for each series
const g = d3.select('g')
  .selectAll('g.series')
  .data(stackedSeries)
  .enter()
  .append('g')
  .classed('series', true)
  .style('fill', function(d, i) {
    return colorPlatte[i];
  });

// For each series create a rect element for each day
g.selectAll('rect')
  .data(function(d) {
    return d;
  })
  .join('rect')
  .attr('width', function(d) {
    return d[1] - d[0];
  })
  .attr('x', function(d) {
    return d[0];
  })
  .attr('y', function(d, i) {
    return i * 20;
  })
  .attr('height', 19);
