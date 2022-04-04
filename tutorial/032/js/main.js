const nodeSize = 17;

const data = {
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

const root = { let i = 0; return d3.hierarchy(data).eachBefore(d => d.index = i++); }

format = d3.format(",");

columns = [
  {
    label: "Size",
    value: d => d.value,
    format,
    x: 280
  },
  {
    label: "Count",
    value: d => d.children ? 0 : 1,
    format: (value, d) => d.children ? format(value) : "-",
    x: 340
  }
]

chart = {
  const nodes = root.descendants();

  const svg = d3.create("svg")
      .attr("viewBox", [-nodeSize / 2, -nodeSize * 3 / 2, width, (nodes.length + 1) * nodeSize])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("overflow", "visible");

  const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#999")
    .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("d", d => `
        M${d.source.depth * nodeSize}, ${d.source.index * nodeSize}
        V${d.target.index * nodeSize}
        h${nodeSize}
      `);

  const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
      .attr("transform", d => `translate(0, ${d.index * nodeSize})`);

  node.append("circle")
      .attr("r", 2.5)
      .attr("fill", d => d.children ? null : "#999");

  node.append("text")
      .attr("dy", "0.32em")
      .attr("x", d => d.depth * nodeSize + 6)
      .text(d => d.data.name);

  node.append("title")
      .text(d => d.ancestors().reverse().map(d => d.data.name).join("/"));

  for (const {label, value, format, x} of columns) {
    svg.append("text")
        .attr("dy", "0.32em")
        .attr("y", -nodeSize)
        .attr("x", x)
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text(label);

    node.append("text")
        .attr("dy", "0.32em")
        .attr("x", x)
        .attr("text-anchor", "end")
        .attr("fill", d => d.children ? null : "#555")
      .data(root.copy().sum(value).descendants())
        .text(d => format(d.value, d));
  }

  return svg.node();
}
