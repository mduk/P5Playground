let scene;
let arrow;
let rocket;

class Arrow extends Drawable {
  constructor(v) {
    super();
    this.vector = v;
  }

  draw() {
    stroke(255);
    strokeWeight(5);
    line(0, 0, this.vector.x, this.vector.y);
    ellipse(this.vector.x, this.vector.y, 10);
  }
}



function setup() {
  scene = new Scene();

  arrow = new Arrow(createVector(0, 0));
  scene.addObject(arrow);

  rocket = new Rocket({});
  scene.addObject(rocket);
}

function windowResized() {
  scene.resize(windowWidth, windowHeight);
}

function draw() {
//  keyPressed();
  scene.draw();
}

function keyPressed() {
  switch (true) {
    case keyIsDown(   UP_ARROW): rocket.applyForce(createVector(   0, -1)); break;
    case keyIsDown(RIGHT_ARROW): rocket.applyForce(createVector( 1,    0)); break;
    case keyIsDown( DOWN_ARROW): rocket.applyForce(createVector(   0,  1)); break;
    case keyIsDown( LEFT_ARROW): rocket.applyForce(createVector(-1,    0)); break;
  }
}

function keyReleased() {
  rocket.acceleration = createVector(0,0)
  console.log("Acceleration", rocket.acceleration, "Velocity", rocket.velocity);
}

function mousePressed() {
  console.log(createVector(
    mouseX - (width/2),
    mouseY - (height/2)
  ));
}
