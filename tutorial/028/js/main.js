/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

// https://www.d3-graph-gallery.com/graph/dendrogram_basic.html
// https://www.javascript.fun/
/**
 * Basic Settings
 */
const dataset = [21, 34, 55, 89, 144];

const canvasWidth = 800;
const canvasHeight = 500;

const chartPadding = 50;

const treeData = {
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

/**
 * Draw Chart
 */
const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", canvasWidth)
  .attr("height", canvasHeight)
  .style("background", "#f7f9fa")
  .append("g")
  .attr("transform", "translate(100, 20)");

const cluster = d3.cluster()
  .size([canvasHeight - chartPadding, canvasWidth - chartPadding * 4]);

// Give the data to this cluster layout:
const root = d3.hierarchy(treeData, function(d) {
  return d.children;
});
cluster(root);

/**
 * Draw links between nodes.
 */
svg.selectAll('path')
  .data( root.descendants().slice(1) )
  .join('path')
  .attr("d", function(d) {
    return "M" + d.y + "," + d.x
      + "C" + (d.parent.y + 50) + "," + d.x
      + " " + (d.parent.y + 150) + "," + d.parent.x
      + " " + d.parent.y + "," + d.parent.x;
    })
  .style("fill", 'none')
  .attr("stroke", '#7f7f7f')

/**
 * Draw circle node and label.
 */
const circleNode = svg.selectAll("g")
  .data(root.descendants())
  .join("g")
  .attr("transform", function(d) {
    return `translate(${d.y}, ${d.x})`
  });

circleNode.append("circle")
  .attr("r", 7)
  .style("fill", function(d) {
    return "#78c7e7";
  })
  .attr("stroke", "#c9cbcf")
  .style("stroke-width", 1);

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
