class Rocket extends Drawable {
  constructor({size, colour, position, velocity,
               acceleration, target, maxspeed, maxforce}) {
    super();

    this.size            = size            || random(10, 50);
    this.colour          = colour          || randomColour();
    this.velocity        = velocity        || createVector(0,0);
    this.position        = position        || randomPosition();
    this.acceleration    = acceleration    || createVector(0,0);

    this.target          = target          || false;
    this.maxspeed        = maxspeed        || 5;
    this.maxforce        = maxforce        || 0.05;
    this.maxsize         = 100;

    this.mass = this.size;

    this.initialPosition = this.position.copy();
  }

  attractedTo(attractor) {
    const attraction = p5.Vector.sub(attractor.position, this.position);

    let distance = attraction.mag();
    distance = constrain(distance, 5, 45);

    attraction.normalize();

    let gravity = (1 * attractor.mass * this.mass) / (distance * distance);

    attraction.mult(gravity);

    this.applyForce(attraction);

    return attraction;
  }

  applyForce(force) {
    this.acceleration.add(force.div(this.mass));
  }

  update(scene) {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  draw() {
    scene.objects.forEach((o) => {
      stroke(50);
      strokeWeight(1);
      line(this.position.x, this.position.y,
              o.position.x,    o.position.y);
    });

    // Draw the Crosshair
    if (this.target) {
      let c = new Crosshair({ colour: this.colour });
      c.position = this.target;
      c.draw();
    }

    // Draw the Rocket
    noStroke();
    fill(this.colour);
    //rotate(this.velocity.heading() + radians(90)); // point in direction of velocity
    ellipse(this.position.x, this.position.y, this.size);
  }

}
