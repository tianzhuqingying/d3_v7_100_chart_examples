/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

/**
 * @References
 * https://www.d3-graph-gallery.com/graph/line_basic.htmld3.
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

const csvUrl = "../../csv/amd_stock.csv";

/**
 * Include axios
 */
axios.get(csvUrl)
  .then(function (response) {
    // d3.csvParse("foo,bar\n1,2");
    // parser and formatter [{foo: "1", bar: "2"}, columns: ["foo", "bar"]]
    const dataset = d3.csvParse(response.data)
    drawLineChart(dataset);
  })
  .catch(function (error) {
    console.log(error);
  });

/**
 * Draw Time Series Line Chart
 */
function drawLineChart(dataset) {
  const minDate = d3.min(dataset, function(d) {
    return d3.timeParse("%Y-%m-%d")(d.Date);
  });
  const maxDate = d3.max(dataset, function(d) {
    return d3.timeParse("%Y-%m-%d")(d.Date);
  });
  const dateExtent = d3.extent(dataset, function(d) {
    return d3.timeParse("%Y-%m-%d")(d.Date);
  });

  console.log(dataset[0]);
  console.log({minDate});

  // Add X axis
  const xAxis = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([padding, canvasWidth - padding]);

  svg.append("g")
    .attr("transform", "translate(" + 0 + "," + (canvasHeight - padding) + ")")
    .call(d3.axisBottom(xAxis));

  // Convert string to number
  const maxValue = d3.max(dataset, function(d) {
    return parseFloat(d.Close);
  });

  // Add Y axis
  const yAxis = d3.scaleLinear()
    .domain([0, maxValue])
    .range([canvasHeight - padding, padding]);

  svg.append("g")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(d3.axisLeft(yAxis));

  // Add the line
  svg.append("path")
    .datum(dataset)
    .attr("fill", "none")
    .attr("stroke", "#78c7e7")
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
