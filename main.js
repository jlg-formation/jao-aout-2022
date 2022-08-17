console.log("start");

var samples = 10;
console.log("samples: ", samples);

for (var i = 0; i < samples; i++) {
  console.log("i: ", i);

  var svgns = "http://www.w3.org/2000/svg";
  var container = document.querySelector("g.samples");

  var x = 34;
  var y = 56;

  var circle = document.createElementNS(svgns, "circle");
  circle.setAttributeNS(null, "cx", x);
  circle.setAttributeNS(null, "cy", y);
  circle.setAttributeNS(null, "r", 1);
  container.appendChild(circle);
}
