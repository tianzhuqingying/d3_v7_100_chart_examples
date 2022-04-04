/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

/**
 * @References
 * https://www.d3-graph-gallery.com/graph/dendrogram_basic.html
 * https://www.javascript.fun/
 */
/**
 * Basic Settings
 */
const canvasWidth = 800;
const canvasHeight = 800;

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
  .attr("transform", "translate(20, 60)");

/**
 * Draw Chart
 */

// cluster
// 初始化一个树布局，并设定其宽高
const clusterChart = d3.cluster()
  .size([canvasHeight - chartPadding, canvasWidth - chartPadding * 4]);

// 生成d3.tree能够处理的层次结构的数据
const root = d3.hierarchy(dataset, function(d) {
  return d.children;
});

// 计算树布局中各节点的位置，计算得到的默认布局是垂直的
const nodeData = clusterChart(root).descendants();

// root.descendants() 所有节点的数组


/**
 * Draw links between nodes.
 */
// svg.selectAll('line')
//   .data(nodeData.slice(1))
//   .join('line')
//   .attr('x1', d => d.x)
//   .attr('y1', d => d.y)
//   .attr('x2', d => d.parent.x)
//   .attr('y2', d => d.parent.y)
//   .attr("stroke", '#7f7f7f');

svg.selectAll('path')
  .data(nodeData.slice(1))
  .join('path')
  .attr("d", function(d) {
    return "M" + d.x + "," + d.y
      + "C" + ((d.parent.x + d.x) / 2) + "," + (d.y - 0)
      + " " + ((d.parent.x + d.x) / 2) + "," + (d.parent.y)
      + " " + (d.parent.x + 0) + "," + d.parent.y;
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
    return `translate(${d.x}, ${d.y})`
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
