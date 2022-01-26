/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

const dataset = [21, 34, 55, 89, 144];

const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", 800)
  .attr("height", 300)
  .style("background", "#f7f9fa");

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return i * 30 + 50;
  })
  .attr("y", function(d, i) {
    return 300 - d;
  })
  .attr("width", 20)
  .attr("height", function(d, i) {
    return d;
  })
  .attr("fill", "#36a2eb");

