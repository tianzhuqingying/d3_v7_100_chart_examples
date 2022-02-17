/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

// https://www.d3-graph-gallery.com/graph/dendrogram_basic.html
// https://www.javascript.fun/
/**
 * Basic Settings
 */
const canvasWidth = 800;
const canvasHeight = 500;

const chartPadding = 50;

const dataset = {
  "name": "Front End",
  "color": "#ff6384",
  "children": [
    {
      "name": "JavaScript",
      "color": "#78c7e7"
    },
    {
      "name": "Framework",
      "color": "#78c7e7",
      "children": [
        {
         "name": "vue",
         "color": "#7f7f7f"
        },
        {
         "name": "react",
         "color": "#7f7f7f"
        },
        {
         "name": "angular",
         "color": "#7f7f7f"
        }
      ]
    },
    {
      "name": "Charting",
      "color": "#78c7e7",
      "children": [
        {
          "name": "d3",
          "color": "#7f7f7f"
        },
        {
          "name": "Chart.js",
          "color": "#7f7f7f"
        },
        {
          "name": "ECharts",
          "color": "#7f7f7f"
        }
      ]
    }
  ]
};

const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", canvasWidth)
  .attr("height", canvasHeight)
  .style("background", "#f7f9fa")
  .append("g")
  .attr("transform", "translate(100, 20)");

/**
 * Draw Chart
 */
const treeChart = d3.tree()
  .size([canvasHeight, canvasWidth - chartPadding * 4]);

// tree
const root = d3.hierarchy(dataset, function(d) {
  return d.children;
});

let nodeData = treeChart(root).descendants();

/**
 *
 */
function updateChart() {
  svg.selectAll('g').remove();
  drawChart();
}

/**
 *
 */
function drawChart() {
  //
  nodeData = treeChart(root).descendants();

  /**
   * Draw links between nodes.
   */
  svg.selectAll('path')
    .data(nodeData.slice(1))
    .join('path')
    .attr("d", function(d) {
      return "M" + d.y + "," + d.x
        + "C" + (d.parent.y + 50) + "," + d.x
        + " " + (d.parent.y + 150) + "," + d.parent.x
        + " " + d.parent.y + "," + d.parent.x;
      })
    .style("fill", 'none')
    .attr("stroke", '#7f7f7f');

  /**
   * Draw circle node and label.
   */
  const circleNode = svg.selectAll("g")
    .data(nodeData)
    .join("g")
    .attr("transform", function(d) {
      return `translate(${d.y}, ${d.x})`
    });

  circleNode.append("circle")
    .attr("r", 7)
    .style("fill", function(d) {

      return d.children_copy ? "#78c7e7" : "#f7f9fa";
    })
    .attr("stroke", "#c9cbcf")
    .style("stroke-width", 1)
    .on("click", clickEvent);

  circleNode.append("text")
    .attr("x", function(d) {
      return d.children ? -8 : 12;
    })
    .attr("dy", function(d) {
      return d.children ? -5 : 5;
    })
    .style("text-anchor", function(d) {
      return d.children ? "end" : "start";
    })
    .text(function(d) {
      return d.data.name;
    });
}

// Toggle children on click.
function clickEvent(event, datum) {
  collapseOneChildren(datum);
  updateChart();
}

function collapseOneChildren(datum) {
  if (datum.children) {
    datum.children_copy = datum.children;
    datum.children = null;
  }
  else {
    datum.children = datum.children_copy;
    datum.children_copy = null;
  }
}

/**
 *
 */
drawChart();
