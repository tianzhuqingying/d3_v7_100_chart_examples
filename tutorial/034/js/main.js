/*!
 * d3_v7_100_chart_examples with D3.js v7.1.1
 */

let hotelList = [
  {
    "name": "The Westin Harbour Castle, Toronto",
    "city": "Toronto",
    "price": 180,
    "position": [43.639, -79.376],
  },
  {
    "name": "Shangri-La Vancouver",
    "city": "Vancouver",
    "price": 350,
    "location": [49.285, -123.123]
  },
  {
    "name": "Holiday Inn Express & Suites Toronto",
    "city": "Toronto",
    "price": 120,
    "location": [43.849, -79.382]
  },
  {
    "name": "The Westin New York Grand Central",
    "city": "New York",
    "price": 160,
    "location": [40.750, -73.973]
  },
  {
    "name": "Grand Hyatt Washington",
    "city": "Washington",
    "price": 230,
    "location": [38.874, -77.002]
  }
];

var result = d3.group(hotelList, d => d.city);
console.log({result});
console.log(result.get('Washington')[0]['name']);

console.log(Array.from(hotelList));

console.log("- - - - -")

const jsonUrl = '../../json/map_point_043.json';

// 参考 https://bl.ocks.org/mbostock/899711

// Create the Google Map…
// using the .node() function of a selection to access this DOM element.
var map = new google.maps.Map(d3.select("#d3-chart-wrapper").node(), {
  zoom: 8,
  center: new google.maps.LatLng(37.76487, -122.41948),
  mapTypeId: google.maps.MapTypeId.TERRAIN
});


let dataset2 = [
  {
    "name": "The Westin Harbour Castle, Toronto",
    "price": 180,
    "position": [43.639, -79.376],
  },
  {
    "name": "Shangri-La Vancouver",
    "price": 350,
    "location": [49.285, -123.123]
  },
  {
    "name": "Grand Hyatt Washington",
    "price": 230,
    "location": [38.874, -77.002]
  }
];

// let groupValue = d3.group(dataset2, d => d.name);
// console.log({groupValue});
// console.log(groupValue.keys());
// console.log(groupValue.get('Grand Hyatt Washington'));
// console.log(groupValue.get('Grand Hyatt Washington')[0]);

// let groupsValue = d3.groups(dataset2, d => d.name);
// console.log({groupsValue});
// console.log(groupsValue[0]);

let dataset = [
  {
    "key":"KMAE",
    "value":[
      -120.12,
      36.98,
      "MADERA MUNICIPAL AIRPORT",
      [
        26,
        1,
        2,
        5,
        6,
        3,
        2,
        1,
        2,
        7,
        29,
        12,
        3
      ]
    ]
  },
];

// Load the station data. When the data comes back, create an overlay.
d3.json(jsonUrl)
  .then(function(response) {
    response = Object.values(response);
    response = response.filter(function(currentValue, index) {
      if (index < 2) {
        return currentValue;
      }
    });
    console.log((response));

    // 使用 OverlayView 自定义叠加层
    var overlay = new google.maps.OverlayView();

    // Add the container when the overlay is added to the map.
    // onAdd() 方法，以将叠加层附加到地图上
    overlay.onAdd = function() {
      var layer = d3.select(this.getPanes().overlayLayer)
        .append("div")
        .attr("class", "demo-spot");

      // Draw each marker as a separate SVG element.
      // We could use a single SVG, but what size would it have?
      // draw() 方法，以处理对象的视觉显示
      overlay.draw = function() {
        var projection = this.getProjection(),
          padding = 10;

        var marker = layer.selectAll("svg")
          .data(response)
          // .each(transform) // update existing markers
          .enter()
          .append("svg")
          .each(transform)
          .attr("class", "marker");

        // Add a circle.
        marker.append("circle")
          .attr("r", 5.5)
          .attr("cx", padding)
          .attr("cy", padding)
          .attr('fill', '#ff6384');

        // Add a label.
        marker.append("text")
          .attr("x", padding + 7)
          .attr("y", padding)
          .attr("dy", "0.3em")
          .attr('fill', '#ff6384')
          .text(function(d) {
            return d[2];
          });

        function transform(d) {
          let latlng = new google.maps.LatLng(d[1], d[0]);

          let projectionLatLng = projection.fromLatLngToDivPixel(latlng);
          console.log(projectionLatLng.x);

          return d3.select(this)
            .style("left", (projectionLatLng.x - padding) + "px")
            .style("top", (projectionLatLng.y - padding) + "px");
        }
      };
    };

    // onRemove() 方法，以清理在叠加层中添加的所有元素
    overlay.onRemove = function() {
    }

    // Bind our overlay to the map…
    overlay.setMap(map);
});
