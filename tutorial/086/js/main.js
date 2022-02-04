/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

// npm i d3-cloud
// https://github.com/jasondavies/d3-cloud
// https://en.wikipedia.org/wiki/All-time_Olympic_Games_medal_table
// https://en.wikipedia.org/wiki/Tag_cloud

/**
 * Basic Settings
 */
const canvasWidth = 800;
const canvasHeight = 500;

const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", canvasWidth)
  .attr("height", canvasHeight)
  .style("background", "#f7f9fa");

d3.json("../../json/all_time_olympic_medal.json").then(function(data) {
  drawCloudLayout(data);
});

function drawCloudLayout(dataset) {
  const maxValue = d3.max(dataset, function(d, i) {
    return parseInt(d.summer_gold);
  });

  const wordScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([10, 100]);

  d3.layout.cloud()
    .size([800, 500])
    .rotate(0)
    .words(dataset)
    .fontSize( function(d) {
      return wordScale(parseInt(d.summer_gold));
    })
    .on("end", drawWordCloud)
    .start();
}

function drawWordCloud(words) {
  svg.append("g")
    .attr("transform", "translate(380, 280)")
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
      .style("font-size", d => d.size + "px")
      .style("fill", "#7f7f7f")
      .attr("text-anchor", "middle")
      .attr("transform", d =>
        `translate(${[d.x, d.y]}) rotate(${d.rotate})`)
      .text(d => d.team);
}
