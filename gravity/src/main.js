let scene;
let mouse_position;
let star;
let nPlanets = 3;
let last_key;

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
      position: createVector(0, random(0, windowWidth/2)),
      mass: 1
    }));
  }

  background(0);
}

function windowResized() {
  scene.resize(windowWidth, windowHeight);
}

function draw() {
  mouse_position = createVector(
    mouseX - (width/2),
    mouseY - (height/2)
  );

  if (key != last_key) {
    if (key != undefined) {
      switch (key) {
        case ' ':
          scene.reset_background = !scene.reset_background;
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

  scene.draw();
}

function keyPressed() {
}

function keyReleased() {
  key = undefined;
}

function mouseWheel(e) {
  star.size += e.delta;
}

function mousePressed() {
}

function mouseReleased() {

}
