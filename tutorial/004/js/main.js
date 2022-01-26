/*!
 * Path Example 1
 */
const svgPath1 = d3.select("#path-element-1")
  .append('svg')
  .attr('width', 800)
  .attr('height', 200)
  .style('background', '#f7f8fa');

svgPath1.append('path')
  .attr('d', 'M100,50 L300,50 L200,160 z')
  .style('fill', '#9467bd')
  .style('stroke', '#1f77b4')
  .style('stroke-width', 2);

svgPath1.append('path')
  .attr('d', 'M420,75 Q500,150 570,75')
  .style('fill', 'none')
  .style('stroke', '#1f77b4')
  .style('stroke-width', 2);

// Circle
svgPath1.selectAll('circle')
  .data([450, 550])
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return d;
  })
  .attr('cy', 150)
  .attr('r', 10)
  .attr('r', 3)
  .attr('fill', '#1f77b4');

/*
 * Path Example 2
 */
const svgPath2 = d3.select("#path-element-2")
  .append('svg')
  .attr('width', 800)
  .attr('height', 200)
  .style('background', '#f7f8fa');

svgPath2.append('path')
  .attr('d', 'M0,100 H800 M222,0 V200')
  .style('stroke', '#003580')
  .style('stroke-width', 52);
