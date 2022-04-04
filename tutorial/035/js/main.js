/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

drawBarChart("#d3-chart-wrapper");

//
function drawBarChart(chartSelection) {
  /**
   * 添加画布和绘制矩形
   */
  // 添加 SVG 画布.
  var width = 750;    // 画布的宽度
  var height = 500;   // 画布的高度

  var svg = d3.select(chartSelection)     // 选择文档中的body元素
    .append("svg")              // append添加一个svg元素
    .attr("width", width)       // 设定宽度
    .attr("height", height);    // 设定高度

  // 画布周边的空白.
  var padding = {
    left: 30,
    right: 30,
    top: 10,
    bottom: 20
  };

  // 定义一个数组.
  var dataset = [3, 7, 10, 17, 22, 27, 38, 39];
  var dataset = [
    {
      'country': 'Usa',
      'gold': 39,
      'sliver': 41,
      'brone': 33,
    },
    {
      'country': 'China',
      'gold': 38,
      'sliver': 32,
      'brone': 18,
    },
    {
      'country': 'Japan',
      'gold': 27,
      'sliver': 14,
      'brone': 17,
    },
    {
      'country': 'Australia',
      'gold': 17,
      'sliver': 7,
      'brone': 22,
    },
    {
      'country': 'France',
      'gold': 10,
      'sliver': 12,
      'brone': 11,
    },
    // {
    //   'country': 'Germany',
    //   'gold': 10,
    //   'sliver': 11,
    //   'brone': 16,
    // },
    {
      'country': 'Canada',
      'gold': 7,
      'sliver': 6,
      'brone': 11,
    },
  ];

  const myMap3 = new Map([
    ['Samsung', 'Smart Phone'],
    ['Colgate', 'Toothpaste'],
    ['Coke', 'Soda']
  ]);

  var gg = d3.group(dataset, d => d.gold);
  var ggs = d3.groups(dataset, d => d.gold);
  var roll = d3.rollup(dataset, g => g.length, d => d.country);
  var rolls = d3.rollups(dataset, g => g.length, d => d.country);
  var countryIndex = d3.index(dataset, d => d.country).keys();

// console.log({dataset});
// console.log({gg});
// console.log({ggs});
// console.log({roll});
// console.log({rolls});

  const maxGoldNum = d3.max(dataset, d => d.gold);

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

  const xScaleCountry = d3.scaleBand()
    .domain(countryIndex)
    .range([0, width- padding.left - padding.right]);

  // y轴的比例尺
  var yScale = d3.scaleLinear()
    .domain([0, maxGoldNum * 1.2])
    .range([height - padding.top - padding.bottom, 0]);

  // 矩形之间的空白
  var rectPadding = 4;

  // Color Scale
  var colorScale = d3.scaleLinear()
    .domain([0, maxGoldNum])
    .range(["yellow", "red"]);

  // 画矩形
  var drawRect = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("transform", "translate(" + padding.left + ", " + padding.top + ")")
    .attr("x", function(d, i) {
      return xScale(i) + rectPadding / 2;
    })
    .attr("y", function(d, i) {
      return yScale(d.gold);
    })
    .attr("width", (xScale.bandwidth() - rectPadding ))
    .attr("height", function(d, i) {
      return height - padding.top - padding.bottom - yScale(d.gold);
    })
    .attr("fill", function(d, i) {
      return colorScale(d.gold);
    });

  /**
   * 坐标轴
   */
  const xAxis = d3.axisBottom()
    .scale(xScaleCountry);


  const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(30, " + (height - padding.bottom) + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + ", " + padding.top + ")")
    .call(yAxis);

  /**
   * 添加文字元素
   */
  const texts = svg.selectAll(".barChartLabel")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "barChartLabel")
    .attr("transform", "translate(" + padding.left + ", " + padding.top + ")")
    .attr("x", function(d, i) {
      return xScale(i) + (xScale.bandwidth() / 2);
    })
    .attr("y", function(d) {
      return yScale(d.gold) + 17;
    })
    .text(function(d) {
      return d.gold;
    })
    .attr("text-anchor", "middle")
    .attr("fill", "#ffffff");

  /**
   * 添加title
   */
  const titleText = svg.selectAll(".barChartTitle")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "barChartTitle")
    .attr("transform", "translate(" + padding.left + ", " + padding.top + ")")
    .attr("x", 325)
    .attr("y", 10)
    .text("Tokyo 2020 Olympic Medal")
    .attr("text-anchor", "middle")
    .attr("fill", "#36a2eb");

  /**
   * 添加Image
   * Country Flags in SVG https://flagicons.lipis.dev/
   */
  svg.selectAll(".barChartImage")
    .data(dataset)
    .enter()
    .append("image", "text")
    .attr("class", "barChartImage")
    .attr("xlink:href", function(d, i) {
      return "../../images/country/" + d.country + ".svg";
    })
    .attr("width", "66px")
    .attr("height", "36px")
    .attr("x", function(d, i) {
      return xScale(i) + (xScale.bandwidth() / 2) - 3;
    })
    .attr("y", function(d) {
      return yScale(d.gold) - 30;
    })
}
