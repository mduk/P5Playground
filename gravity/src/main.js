let scene;
let mousePosition;
let star;
let nPlanets = 3;
let last_key;
let draw_trails = false;

class Arrow extends Drawable {
  constructor(v) {
    super();
    this.v = v;
    this.mass = 0;
  }

  update() {
  }

  draw() {
    stroke(255);
    strokeWeight(2);
    line(this.position.x, this.position.y, this.v.x, this.v.y);
  }
}

function setup() {
  scene = new Scene();

  star = new Rocket({
    size: 70,
    mass: 1000,
    colour: '#ffff00',
    position: createVector(0,0)
  });

  scene.addFixedObject(star);

  for (let i = 0; i < nPlanets; i++) {
    scene.addObject(new Rocket({
      size: random(10, 30),
      velocity: createVector(random(10,20), 0),
      position: createVector(0, random(0, windowWidth/2))
    }));
  }

  background(0);
}

function windowResized() {
  scene.resize(windowWidth, windowHeight);
  background(0);
}

let lastMouseIsPressed = false;
let dragStart;
let dragStop;
let dragVector;
let dragVectorInverse;
let dragArrow;

function draw() {
  scene.reset_background = !draw_trails;

  mousePosition = createVector(
    mouseX - (width/2),
    mouseY - (height/2)
  );

  scene.draw();

  if (mouseIsPressed == true && lastMouseIsPressed == false ) {
    lastMouseIsPressed = mouseIsPressed;
    dragStart = mousePosition;

    dragArrow = new Arrow(dragStart);
    dragArrow.position = dragStart;
    scene.addFixedObject(dragArrow);

    dragVector = p5.Vector.sub(dragStart, dragStop);
  }
  else if (mouseIsPressed == true && lastMouseIsPressed == true) {
    dragStop = mousePosition;
    dragArrow.v = mousePosition;

    dragVector = p5.Vector.sub(dragStop, dragStart);
    dragVectorInverse = p5.Vector.sub(dragStart, dragStop);
  }
  else if (mouseIsPressed == false && lastMouseIsPressed == true) {
    lastMouseIsPressed = mouseIsPressed;

    scene.removeFixedObject(dragArrow);
    dragArrow = undefined;

    scene.addObject(new Rocket({
      size: random(10, 30),
      velocity: dragVectorInverse.mult(0.05),
      position: mousePosition
    }));
  }

  if (key != last_key) {
    if (key != undefined) {
      switch (key) {
        case ' ':
          draw_trails = !draw_trails;
          break;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          nPlanets = key;
          setup();
          break
      }
    }

    last_key = key;
  }
}

function keyPressed() {
}

function keyReleased() {
  key = undefined;
}

function mouseWheel(e) {
  star.size += e.delta;
}

