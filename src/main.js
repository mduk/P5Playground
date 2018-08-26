let nPlanets = 40;
let maxRockets = 1;
let gutterpx = 150;

let minx;
let maxx;
let miny;
let maxy;

let planets = [];
let rockets = [];
let launchLine = false;

p5.Color.prototype.asVector = function() {
  return createVector(
    this.levels[0],
    this.levels[1],
    this.levels[2]
  );
}

function spawnRocket() {
  if (rockets.length < maxRockets) {
    rockets.push(new Rocket({
      position: randomPosition()
    }));
  }

  if (planets.length > 0) {
    setTimeout(spawnRocket, 1000)
  }
  else {
    spawnRockets();
    let iPlanets = nPlanets;
    while (iPlanets--) {
      planets.push(new Planet({}));
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  minx = -(width /2) - gutterpx;
  maxm =  (width /2) + gutterpx;
  miny = -(height/2) - gutterpx;
  maxy =  (height/2) + gutterpx;

  let iPlanets = nPlanets;
  while (iPlanets--) {
    planets.push(new Planet({}));
  }

  spawnRocket();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  minx = -(width /2) - gutterpx;
  maxm =  (width /2) + gutterpx;
  miny = -(height/2) - gutterpx;
  maxy =  (height/2) + gutterpx;

  let beforeLength = planets.length;
  planets = planets.filter((p) => !p.isOffCanvas());
  let afterLength = planets.length;
  let newPlanets = beforeLength - afterLength;
  while (newPlanets--) {
    planets.push(new Planet());
  }
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

  planets = planets.filter((p) => p.size > 5);
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
      //rockets.splice(i, 1);
      collisions.forEach((c) => c.collideWith(rocket));
      continue;
    }

    rocket.update();

    push();
    rocket.draw();
    pop();
  }
}
