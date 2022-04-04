/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

/**
 * @References
 * https://www.d3-graph-gallery.com/graph/line_basic.htmld3.
 * https://stackoverflow.com/questions/64454322/
 * https://observablehq.com/@d3/styled-axes
 */
/**
 * Basic Settings
 */
const canvasWidth = 1200;
const canvasHeight = 700;
const padding = 50;

const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", canvasWidth)
  .attr("height", canvasHeight)
  .style('background', '#f7f9fa');

const colorPlatte = ['#78c7e7', '#ff9f33'];

const csvUrlAmd = "../../csv/amd_stock.csv";
const csvUrlIntel = "../../csv/intel_stock.csv";

/**
 * Include axios
 */
const requestAmd = axios.get(csvUrlAmd);
const requestIntel = axios.get(csvUrlIntel);

Promise.all([requestAmd, requestIntel]).then((response) => {

  const dataCollection = [];
  var maxValue = 0;
  response.forEach(function(element) {
    dataset = d3.csvParse(element.data);

    // Convert string to number
    var maxClose = d3.max(dataset, function(d) {
      return parseFloat(d.Close);
    });

    maxValue = Math.max(maxValue, maxClose);
    dataCollection.push(dataset);
  });

  dataCollection.forEach(function(element, index) {
    drawLineChart(element, maxValue, index, colorPlatte[index]);
  });
}).catch((err) => {
   console.log(err)
});

/**
 * Draw Time Series Line Chart
 */
function drawLineChart(dataset, maxValue = 100, index = 0, color = "#78c7e7") {
  const minDate = d3.min(dataset, function(d) {
    return d3.timeParse("%Y-%m-%d")(d.Date);
  });
  const maxDate = d3.max(dataset, function(d) {
    return d3.timeParse("%Y-%m-%d")(d.Date);
  });
  const dateExtent = d3.extent(dataset, function(d) {
    return d3.timeParse("%Y-%m-%d")(d.Date);
  });

  // Add X axis
  const xAxis = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([padding, canvasWidth - padding]);
  if (index > 0) {
    svg.append("g")
      .attr("transform", "translate(" + 0 + "," + (canvasHeight - padding) + ")")
      .call(d3.axisBottom(xAxis));
  }

  // Add Y axis and grid
  const yAxis = d3.scaleLinear()
    .domain([0, (maxValue * 1.1)])
    .range([canvasHeight - padding, padding]);

  if (index > 0) {
    const yAxisGrid = d3.axisLeft(yAxis)
      .tickSizeInner(padding + padding - canvasWidth)
      // .tickValues([1, 2, 3, 5, 8, 13, 21, 31])
      // .tickSizeOuter(-100)
      // .tickSize(10)
      // .tickPadding(50);

    svg.append("g")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxisGrid)
      .call(g => g.selectAll(".tick:not(:first-of-type) line")
        .attr("class", "axis_y_tick")
        .attr("stroke", "#c9cbcf"));
  }

  // Add the line
  svg.append("path")
    .datum(dataset)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 1.5)
    .attr("d",
      d3.line().x(function(d) {
        return xAxis(d3.timeParse("%Y-%m-%d")(d.Date))
      })
      .y(function(d) {
        return yAxis(d.Close)
      })
    )
}
