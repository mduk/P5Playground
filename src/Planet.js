class Ellipse extends Drawable {
  constructor({position, radius, colour}) {
    super();
    if (position) {
      this.position = position;
    } else {
      this.position = createVector(
        random(-(width/2), (width/2)),
        random(-(height/2), (height/2))
      );
    }

    this.radius = radius || random(15, 25);
    this.colour = colour || randomColour();
  }

  draw() {
    noStroke();
    fill(this.colour);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }

  containsPoint(point) {
    return (this.position.dist(point) < this.radius);
  }
}
