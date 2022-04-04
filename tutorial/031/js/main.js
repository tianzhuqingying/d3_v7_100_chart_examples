/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

/**
 * @References
 * https://www.d3-graph-gallery.com/graph/dendrogram_basic.html
 */
/**
 * Basic Settings
 */
const canvasWidth = 800;
const canvasHeight = 800;

const chartPadding = 50;

const nodePadding = 30;
const nodeSpace = 25;

const dataset = {
  "name": "Front End",
  "children": [
    {
      "name": "JavaScript",
      "year": 9
    },
    {
      "name": "Framework",
      "year": 6,
      "children": [
        {
         "name": "vue",
         "year": 5
        },
        {
         "name": "react",
         "year": 3
        },
        {
         "name": "angular",
         "year": 4
        }
      ]
    },
    {
      "name": "Charting",
      "year": 7,
      "children": [
        {
          "name": "d3",
          "year": 3
        },
        {
          "name": "Chart.js",
          "year": 5
        },
        {
          "name": "Charting3",
          "year": 7,
          "children": [
            {
              "name": "d33",
              "year": 3
            },
            {
              "name": "Chart.js3",
              "year": 5
            },
            {
              "name": "ECharts3",
              "year": 1
            }
          ]
        },
        {
          "name": "ECharts",
          "year": 1
        },

      ]
    },
    {
      "name": "Charting2",
      "year": 7,
      "children": [
        {
          "name": "d32",
          "year": 3
        },
        {
          "name": "Chart.js2",
          "year": 5
        },
        {
          "name": "ECharts2",
          "year": 1
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
  .attr("transform", "translate(120, 50)");

/**
 * Draw Chart
 */
// 生成d3.tree能够处理的层次结构的数据
const root = d3.hierarchy(dataset, function(d) {
  return d.children;
});

const nodeValues = [];

root.eachBefore(function(d, i) {

  return nodeValues.push({
    depth: d.depth,
    name: d.data.name,
    index: i,
    childrenCopy: d.children,
    parentCopy: d.parent,
  });
});

// 计算树布局中各节点的位置，计算得到的默认布局是垂直的
// root.descendants() 所有节点的数组
const nodeData = root.descendants();

/**
 * Draw links between nodes.
 */
let parentIndex = [];
let patchLine = [];
parentIndex[0] = 0;
patchLine[0] = null;

svg.selectAll('path')
  // .data(root.links())
  .data(nodeValues.slice(1))
  .join('path')
  .attr("d", function(d, i) {


    if(typeof parentIndex[d.depth] === 'undefined') {
      patchLine[d.depth] = d.index;
    }
    else {
      patchLine[d.depth] = parentIndex[d.depth];
    }

    parentIndex[d.depth] = d.index;
    parentIndex = parentIndex.slice(0, (d.depth + 1));

    return ( "M" + ((d.depth - 1) * nodePadding) + "," + ((i) * nodeSpace)
      + " V" + ((i + 1) * nodeSpace)
      + " h" + (nodePadding)
      + " M" + ((d.depth - 1) * nodePadding) + "," + ((i) * nodeSpace)
      + " v" + ((d.index - patchLine[d.depth] - 1) * -1 * nodeSpace)
    );
  })
  .style("fill", 'none')
  .attr("stroke", function(d, i) {
    return '#7f7f7f';
  });


/**
 * Draw circle node and label.
 */
const circleNode = svg.selectAll("g")
  // .data(nodeData)
  .data(nodeValues)
  .join("g")
  .attr("transform", function(d, i) {
    return `translate(${d.depth * nodePadding}, ${i * nodeSpace})`;
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
    return d.children ? -8 : 30;
  })
  .attr("dy", function(d) {
    return d.children ? -5 : 5;
  })
  .style("text-anchor", function(d) {
    return d.children ? "end" : "start";
  })
  .text(function(d) {
    return d.name;
  });
