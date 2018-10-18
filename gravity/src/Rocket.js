class Rocket extends Drawable {
  constructor({size, colour, position, velocity, acceleration, mass}) {
    super();

    this.size            = size            || random(10, 50);
    this.colour          = colour          || randomColour();
    this.velocity        = velocity        || createVector(0,0);
    this.position        = position        || randomPosition();
    this.acceleration    = acceleration    || createVector(0,0);
    this.mass            = mass            || this.size;

    this.initial_position = this.position.copy();
    this.previous_position = this.position.copy();
  }

  attractedTo(attractor) {
    const attraction = p5.Vector.sub(attractor.position, this.position);

    let distance = attraction.mag();
    distance = constrain(distance, 1, 35);

    attraction.normalize();

    let gravity = (attractor.mass * this.mass) / (distance * distance);

    attraction.mult(gravity);

    this.applyForce(attraction);

    return attraction;
  }

  applyForce(force) {
    this.acceleration.add(force.div(this.mass));
  }

  update(scene) {
    this.previous_position = this.position.copy();

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  draw() {
    noStroke();
    fill(this.colour);
    ellipse(this.position.x, this.position.y, this.size);
  }

}
