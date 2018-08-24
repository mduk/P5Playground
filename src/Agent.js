class Agent extends Drawable {
  constructor({initialPosition, size, colour, position, velocity, acceleration, target, maxspeed}) {
    super();

    this.size            = size            || random(10, 50);
    this.colour          = colour          || randomColour();
    this.velocity        = velocity        || createVector(0,0);
    this.position        = position        || randomPosition();
    this.acceleration    = acceleration    || createVector(0,0);

    this.target          = target          || false;
    this.maxspeed        = maxspeed        || 5;

    this.initialPosition = this.position.copy();

    this.crosshair = new Crosshair({
      position: this.initialPosition,
      colour: this.colour
    });

    this.flightPath = [];

    this.update();
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);

    if (this.target) {
      this.steerToward(this.target);
    }

    this.flightPath.push(this.position.copy());
  }

  steerToward(target) {
    let desired = p5.Vector.sub(target, this.position);
    var speed = this.maxspeed;

    var distance = desired.mag();
    if (false && distance < 100) {
      var speed = map(distance, 0, 100, 0, this.maxspeed);
    }

    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxspeed);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  collidesWith(objects) {
    let rocket = this;
    return objects.filter((o) => {
      return ((rocket.position.dist(o.position) - o.radius) <= 0) ;
    });
  }

  draw() {
    stroke(50);
    strokeWeight(1);

    //line(0, 0, this.position.x, this.position.y);

    this.crosshair.draw();

    stroke(50);
    strokeWeight(1);
    let pp = this.initialPosition;
    this.flightPath.forEach((p) => {
      line(
        pp.x, pp.y,
        p.x, p.y
      );
      pp = p;
    });

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
