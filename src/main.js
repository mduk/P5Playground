let nPlanets = 2;

let minx;
let maxx;
let miny;
let maxy;

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
