let scene;
let mouse_position;
let star;

function setup() {
  scene = new Scene();

  star = new Rocket({
    size: 500,
    position: createVector(0,0)
  });

  scene.addFixedObject(star);

  for (let i = 0; i < 5; i++) {
    scene.addObject(new Rocket({}));
  }
}

function windowResized() {
  scene.resize(windowWidth, windowHeight);
}

function draw() {
  mouse_position = createVector(
    mouseX - (width/2),
    mouseY - (height/2)
  );

  if (key != undefined) {
    switch (key) {
      case ' ':
        scene.objects.forEach((o) => {
          o.attractedTo({position: mouse_position, mass: 50});
        });
        break;

      default:
        scene.objects.forEach((o) => {
          o.attractedTo({position: mouse_position, mass: (key * 10)});
        });
        break
    }
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
  scene.addObject(new Rocket({
    position: mouse_position
  }));
}
