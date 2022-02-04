
// Basic
const colorPlatte1 = ['#ff6384', '#ff9f33', '#ffce57', '#4bc0c0', '#78c7e7', '#36a2eb', '#cc65fe', '#3c3c3c'];
const colorPlatte2 = [
 '#ff6384',
 '#fb8072',
 '#ff9f33',
 '#ffce57',
 '#00a950',
 '#4bc0c0',
 '#537bc4',
 '#78c7e7',
 '#36a2eb',
 '#cc65fe',
 '#8549ba',
 '#58595b',
 '#3c3c3c',
 '#c9cbcf'
];

// https://observablehq.com/@d3/color-schemes
const colorPlatte3 = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]

//
const colorScheme10 = d3.scaleOrdinal(d3.schemeCategory10);
colorScheme(1);

// Color Scale
const colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range(["#78c7e7", "#ff6384"]);
colorScale(1);

