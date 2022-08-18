const r = 1;

const cx0 = 50;
const cy0 = 50;
const r0 = 45;
const svgns = "http://www.w3.org/2000/svg";

const getAngleFromIndex = (index, samples) => {
  return 2 * Math.PI * (index / samples);
};

const getPointFromAngle = (angle) => {
  const x = cx0 + Math.cos(angle) * r0;
  const y = cy0 + Math.sin(angle) * r0;
  return { x, y };
};

const lineGroup = document.querySelector("g.lines");

const drawLine = (p1, p2) => {
  const line = document.createElementNS(svgns, "line");
  line.setAttributeNS(null, "x1", p1.x);
  line.setAttributeNS(null, "y1", p1.y);
  line.setAttributeNS(null, "x2", p2.x);
  line.setAttributeNS(null, "y2", p2.y);
  lineGroup.appendChild(line);
};

const container = document.querySelector("g.samples");

export class Board {
  constructor() {
    console.log("instantiating board");
    this.config = {
      samples: 23,
      multiplicationFactor: 34,
    };

    this.name = "board";
  }

  drawCircles() {
    console.log("I am drawing");
    const samples = this.config.samples;

    for (let i = 0; i < samples; i++) {
      console.log("i: ", i);

      const angle = getAngleFromIndex(i, samples);
      const { x, y } = getPointFromAngle(angle);

      const circle = document.createElementNS(svgns, "circle");
      circle.setAttributeNS(null, "cx", x);
      circle.setAttributeNS(null, "cy", y);
      circle.setAttributeNS(null, "r", r);
      container.appendChild(circle);
    }
  }

  drawLines() {
    console.log("I am drawing lines");
    for (let i = 0; i < this.config.samples; i++) {
      this.drawLine(i);
    }
  }

  drawLine(index) {
    console.log("index: ", index);
    const angle1 = getAngleFromIndex(index, this.config.samples);
    console.log("angle1: ", angle1);
    const angle2 = getAngleFromIndex(
      index * this.config.multiplicationFactor,
      this.config.samples
    );

    const p1 = getPointFromAngle(angle1);
    console.log("p1: ", p1);
    const p2 = getPointFromAngle(angle2);

    drawLine(p1, p2);
  }

  draw() {
    this.drawCircles();
    this.drawLines();
  }

  setConfig(config) {
    this.config = config;
  }
}
