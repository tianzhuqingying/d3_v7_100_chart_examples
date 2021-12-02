
// d3.select("body").
// d3.selectAll(".d3-wrapper")

d3.selectAll("body .d3-wrapper")
  .text("Hello D3")
  .attr('class', "d3-set-attributes")
  .style("color", "red")
  .style("font-size", "30px");
  .attr("style", "color: green; font-size: 30px;");

