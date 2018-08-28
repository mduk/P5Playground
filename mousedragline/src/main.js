function randomColour() {
  return color(
    random(255),
    random(255),
    random(255)
  );
}

function mouseVector() {
  return createVector(mouseX, mouseY);
}

class Line {
  constructor(begin) {
    this.begin = begin;
    this.colour = randomColour();
    this.end = this.begin
  }

  draw() {
    stroke(this.colour);
    strokeWeight(4);
    line(
      this.begin.x,
      this.begin.y,
      this.end.x,
      this.end.y
    );
  }
}

let lines = [];
let i = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  console.log("pressed", i);
  lines[i] = new Line(mouseVector());
}

function mouseDragged() {
  console.log("dragged", lines[i]);
  lines[i].end = mouseVector();
}

function mouseReleased() {
  console.log("released");
  lines[i].end = mouseVector();
  i++;
}

function draw() {
  background(0);
  lines.map((l) => l.draw());
}
