class Rocket extends Drawable {
  constructor({initialPosition, size, colour, position, velocity,
               acceleration, target, maxspeed, maxforce}) {
    super();

    this.size            = size            || random(10, 15);
    this.colour          = colour          || randomColour();
    this.velocity        = velocity        || createVector(0,0);
    this.position        = position        || randomPosition();
    this.acceleration    = acceleration    || createVector(0,0);

    this.target          = target          || false;
    this.maxspeed        = maxspeed        || 5;
    this.maxforce        = maxforce        || 0.05;
    this.maxsize         = 100;

    this.initialPosition = this.position.copy();

    this.flightPath = [];

    this.update();
  }

  update() {
    this.target = this.selectClosestColour(planets);
    if (this.target) {
      this.steerToward(this.target);
    }

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.flightPath.push(this.position.copy());
  }

  selectClosestColour(targets) {
    if (targets.length == 0) {
      return;
    }

    let nearest = targets[0].position;
    let distance = targets[0].colour.asVector().dist(this.colour.asVector());
    targets.forEach((t) => {
      if (this.colour.asVector().dist(t.colour.asVector()) < distance) {
        nearest = t.position;
      }
    });
    return nearest;
  }

  selectNearest(targets) {
    let nearest = targets[0].position;
    let distance = targets[0].position.dist(this.position);
    targets.forEach((t) => {
      if (this.position.dist(t.position) < distance) {
        nearest = t.position;
      }
    });
    return nearest;
  }

  steerToward(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  handleCollisionWithPlanet(planet) {
    if (this.size < this.maxsize) {
      this.size += (planet.size / 2);
      if (this.size > this.maxsize) {
        this.size = this.maxsize;
      }
    }

    this.colour.levels[0] += planet.colour.levels[0];
    this.colour.levels[1] += planet.colour.levels[1];
    this.colour.levels[2] += planet.colour.levels[2];

    this.colour.levels[0] /= 2;
    this.colour.levels[1] /= 2;
    this.colour.levels[2] /= 2;

  }

  draw() {
    stroke(50);
    strokeWeight(1);

    if (false) {
      stroke(this.colour);
      strokeWeight(this.size / 10);
      let pp = this.initialPosition;
      this.flightPath.forEach((p) => {
        line(
          pp.x, pp.y,
          p.x, p.y
        );
        pp = p;
      });
    }

    if (this.target) {
      let c = new Crosshair({ colour: this.colour });
      c.position = this.target;
      c.draw();
    }

    noStroke();
    fill(this.colour);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading() + radians(90));
    triangle(
       0,               0,
       (this.size / 3), this.size,
      -(this.size / 3), this.size
    );
  }

}
