// D3.js v7.1.1
const svg = d3.select("#d3-chart-wrapper")
  .append("svg")
  .attr("width", 900)
  .attr("height", 500);

const dataset = [5, 8, 13, 21, 34];

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return i * 30;
  })
  .attr("y", function(d, i) {
    return 100 - d;
  })
  .attr("width", 20)
  .attr("height", function(d) {
    return d;
  })
  .attr("fill", "steelblue");


//
function drawBarChart(chartCanvasId, chartContent) {
  /**
   * 添加画布和绘制矩形
   */
  // 添加 SVG 画布.
  var width = 300;    // 画布的宽度
  var height = 200;   // 画布的高度

  var svg = d3.select("#" + chartCanvasId)     // 选择文档中的body元素
      .append("svg")              // append添加一个svg元素
      .attr("width", width)       // 设定宽度
      .attr("height", height);    // 设定高度

  // 画布周边的空白.
  var padding = {
    left: 30,
    right: 30,
    top: 20,
    bottom: 20
  };

  // 定义一个数组.
  var dataset = [25 , 21 , 17 , 13 , 09];

  // 每个矩形所占的像素高度(包括空白)
  var rectHeight = 25;

  /**
   * 定义数据和比例尺.
   * 开发者需要指定 domain 和 range 的范围，如此即可得到一个计算关系。
   * domain 和 range 分别被称为 定义域 和 值域，
   * 线性比例尺，能将一个连续的区间，映射到另一区间
   * 解决柱形图高度/宽度的问题，就需要线性比例尺
   * https://doc.yonyoucloud.com/doc/wiki/project/d3wiki/scale.html
   */
  // 给柱形图添加线性比例尺
  var xScale = d3.scaleBand()
    .domain(d3.range(0, dataset.length))
    .rangeRound([0, width - padding.left - padding.right])
    .padding(0.2);

  // y轴的比例尺
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height - padding.top - padding.bottom, 0]);

  // 矩形之间的空白
  var rectPadding = 4;

  // 画矩形
  // .selectAll("rect") 选择svg内所有的矩形
  // .data(dataset)     绑定数组
  // .enter()           指定选择集的enter部分
  // .append("rect")    添加足够数量的矩形元素
  // function(d, i)，    d 代表与当前元素绑定的数据，i 代表索引号。
  // return xScale(d)   在这里用比例尺
  // .attr("x", 20)     设置x坐标 为20
  // .attr("fill", "color") 是给矩形元素设置颜色
  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "rect-elements")
    .attr("transform", "translate(" + padding.left + ", " + padding.top + ")")
    .attr("x", function(d, i) {
      return xScale(i) + rectPadding / 2;
    })
    .attr("y", function(d) {
      return yScale(d);
    })
    .attr("width", (xScale.bandwidth() - rectPadding ))
    .attr("height", function(d) {
      return height - padding.top - padding.bottom - yScale(d);
    })
    .attr("fill", "steelblue");

  /**
   * 坐标轴
   */
  // 定义坐标轴
  var xAxis = d3.axisBottom()   // d3.axisBottom()：D3 中坐标轴的组件，能够在 SVG 中生成组成坐标轴的元素
    .scale(xScale)              // 指定比例尺
    .ticks(7);                  // 指定刻度的数量
  var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(7);

  // 坐标轴的class，attr来设定。
  // 坐标轴的位置，可以通过 transform 属性来设定。
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(30, 180)")
    .call(xAxis);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + ", " + padding.top + ")")
    .call(yAxis);

  /**
   * 添加均线
   */
  svg.append('line')
    .attr('x1', 0)
    .attr('y1', 71)
    .attr('x2', 500)
    .attr('y2', 71)
    .attr('stroke', 'red')
}
