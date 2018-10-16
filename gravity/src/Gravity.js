class Gravity {
  constructor(attractor, attractee) {
    this.attractor = attractor;
    this.attractee = attractee;
    this.g = 1;
  }

  update() {
    const attraction = p5.Vector.sub(this.attractor.position, this.attractee.position);
    let distance = attraction.mag();
    distance = constrain(distance, 5, 45);

    attraction.normalize();

    let gravity = (this.g * this.attractor.mass * this.attractee.mass) / (distance * distance);

    attraction.mult(gravity);

    this.attractee.applyForce(attraction);
  }
}
