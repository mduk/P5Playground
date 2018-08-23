class Agent extends Drawable {
  constructor({size, colour, position, velocity, acceleration}) {
    super();

    this.size         = size         || random(10, 50);
    this.colour       = colour       || randomColour();
    this.velocity     = velocity     || createVector(0,0);
    this.position     = position     || randomPosition();
    this.acceleration = acceleration || createVector(0,0);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  collidesWith(objects) {
    let rocket = this;
    return objects.filter((o) => {
      return ((rocket.position.dist(o.position) - o.radius) <= 0) ;
    });
  }

  draw() {
    noStroke();
    fill(this.colour);
    line(0, 0, this.position.x, this.position.y);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading() + radians(90));
    triangle(
       0,               0,
       (this.size / 3), this.size,
      -(this.size / 3), this.size
    );
  }

}
