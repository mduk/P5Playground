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
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.flightPath.push(this.position.copy());
  }

  selectNearest(targets) {
    if (targets.length == 0) {
      return false;
    }

    let nearest = targets[0].position;
    let distance = targets[0].position.dist(this.position);

    console.log(targets.length);
    targets.forEach((t) => {
      const tdist = t.position.dist(this.position);

        if (debug.drawDistanceLines) {
          strokeWeight(map(tdist, 0, width/2, 10, 0));
          stroke(55);
          line(this.position.x, this.position.y,
                  t.position.x,    t.position.y);
        }

      if (tdist < distance) {

        nearest = t.position;
        distance = tdist;
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

    // Draw the Crosshair
    if (this.target) {
      let c = new Crosshair({ colour: this.colour });
      c.position = this.target;
      c.draw();
    }


    // Draw the Rocket
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
