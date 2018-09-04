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
