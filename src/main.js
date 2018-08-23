Array.prototype.draw = function() {
  let i = this.length;
  while (i--) {
    this[i].draw();
  }
};

function randomColour() {
  return color(
    random(255),
    random(255),
    random(255)
  );
}

function randomPosition() {
  return createVector(
    random(-(width/2), (width/2)),
    random(-(height/2), (height/2))
  );
}

function mouseVector() {
  return createVector(
    mouseX - (width / 2),
    mouseY - (height / 2)
  );
}

class Drawable {
  isOffCanvas() {
    return (this.position.x < minx)
        || (this.position.x > maxx)
        || (this.position.y < miny)
        || (this.position.y > maxy);
  }

  update() {}
  draw() {}
}

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
}

function guides() {
  stroke(50);
  strokeWeight(1);
  line(-(width/2), 0, (width/2), 0);
  line(0, -(height/2), 0, (height/2));
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


////////////////////////////////////////////////////////////////////////////////
// Main
////////////////////////////////////////////////////////////////////////////////

let minx;
let maxx;
let miny;
let maxy;

let nPlanets = 2;
let planets = [];
let rockets = [];
let launchLine = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  minx = -(width /2);
  maxm =  (width /2);
  miny = -(height/2);
  maxy =  (height/2);

  while (nPlanets--) {
    planets.push(new Ellipse({}));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  minx = -(width /2);
  maxm =  (width /2);
  miny = -(height/2);
  maxy =  (height/2);
}

function mousePressed() {
  launchLine = new Line(mouseVector());
}

function mouseDragged() {
  launchLine.end = mouseVector();
}

function mouseReleased() {
  rockets.push(new Agent({
    colour: launchLine.colour,
    position: mouseVector(),
    velocity: launchLine.end.sub(launchLine.begin).mult(-0.1)
  }));
  launchLine = false;
}

function draw() {
  translate(width/2, height/2);
  background(0);

  guides();

  if (launchLine) {
    launchLine.draw();
  }

  planets.draw();

  let i = rockets.length;
  while (i--) {
    let rocket = rockets[i];

    if (rocket.isOffCanvas()) {
      rockets.splice(i, 1);
      continue;
    }

    let collisions = rocket.collidesWith(planets);
    if (collisions.length > 0) {
      rockets.splice(i, 1);
      continue;
    }

    rocket.update();

    push();
    rocket.draw();
    pop();
  }
}
