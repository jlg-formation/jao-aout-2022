console.log("start");

var samples = 10;
var r = 1;

var cx0 = 50;
var cy0 = 50;
var r0 = 45;

console.log("samples: ", samples);

for (var i = 0; i < samples; i++) {
  console.log("i: ", i);

  var svgns = "http://www.w3.org/2000/svg";
  var container = document.querySelector("g.samples");

  var angle = 2 * Math.PI * (i / samples);

  var x = cx0 + Math.cos(angle) * r0;
  var y = cy0 + Math.sin(angle) * r0;

  var circle = document.createElementNS(svgns, "circle");
  circle.setAttributeNS(null, "cx", x);
  circle.setAttributeNS(null, "cy", y);
  circle.setAttributeNS(null, "r", r);
  container.appendChild(circle);
}
