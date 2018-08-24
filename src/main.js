let nPlanets = 2;

let minx;
let maxx;
let miny;
let maxy;

let planets = [];
let rockets = [];
let launchLine = false;

function spawnRocket() {
  if (rockets.length < 30 ){
    rockets.push(new Rocket({
      position: randomPosition()
    }));
  }
  setTimeout(spawnRocket, 1000)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  minx = -(width /2);
  maxm =  (width /2);
  miny = -(height/2);
  maxy =  (height/2);

  while (nPlanets--) {
    planets.push(new Planet({}));
  }

  spawnRocket();

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

  const clicked = planets
    .filter((p) => p.containsPoint(mouseVector()));

  if (clicked.length > 0) {
    const position = clicked[0].position;

    rockets.forEach((r) => r.target = position);
  }
}

function mouseDragged() {
  launchLine.end = mouseVector();
}

function mouseReleased() {
  rockets.push(new Rocket({
    colour: launchLine.colour,
    position: mouseVector(),
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
