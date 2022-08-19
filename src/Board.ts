import { Config } from "./interfaces/Config";
import { Point } from "./interfaces/Point";
import { querySelector } from "./utils";

const r = 1;

const cx0 = 50;
const cy0 = 50;
const r0 = 45;
const svgns = "http://www.w3.org/2000/svg";

const getAngleFromIndex = (index: number, samples: number) => {
  return 2 * Math.PI * (index / samples);
};

const getPointFromAngle = (angle: number) => {
  const x = cx0 + Math.cos(angle) * r0;
  const y = cy0 + Math.sin(angle) * r0;
  return { x, y };
};

const lineGroup = querySelector("g.lines");

const drawLine = (p1: Point, p2: Point) => {
  const line = document.createElementNS(svgns, "line");
  line.setAttributeNS(null, "x1", p1.x + "");
  line.setAttributeNS(null, "y1", `${p1.y}`);
  line.setAttributeNS(null, "x2", String(p2.x));
  line.setAttributeNS(null, "y2", p2.y.toFixed());
  lineGroup.appendChild(line);
};

const container = querySelector("g.samples");

export class Board {
  private config: Config = {
    samples: 23,
    multiplicationFactor: 34,
  };

  drawCircles() {
    const samples = this.config.samples;

    for (let i = 0; i < samples; i++) {
      const angle = getAngleFromIndex(i, samples);
      const { x, y } = getPointFromAngle(angle);

      const circle = document.createElementNS(svgns, "circle");
      circle.setAttributeNS(null, "cx", x + "");
      circle.setAttributeNS(null, "cy", y + "");
      circle.setAttributeNS(null, "r", r + "");
      container.appendChild(circle);
    }
  }

  drawLines() {
    for (let i = 0; i < this.config.samples; i++) {
      this.drawLine(i);
    }
  }

  drawLine(index: number) {
    const angle1 = getAngleFromIndex(index, this.config.samples);

    const angle2 = getAngleFromIndex(
      index * this.config.multiplicationFactor,
      this.config.samples
    );

    const p1 = getPointFromAngle(angle1);

    const p2 = getPointFromAngle(angle2);

    drawLine(p1, p2);
  }

  draw() {
    this.drawCircles();
    this.drawLines();
  }

  redraw() {
    container.innerHTML = "";
    lineGroup.innerHTML = "";
    this.draw();
  }

  setConfig(config: Config) {
    this.config = config;
  }
}
