const config = {
  wireframe: true
};

let scene;
let gumball;

class Thruster extends Drawable {
  constructor(s, a) {
    super();
    this.ship = s;
    this.angle = a;
    this.colour = randomColour();

    this.update();
  }

  update() {
    this.position = createVector(
      this.ship.position.x - (this.ship.radius * cos(this.angle)),
      this.ship.position.y - (this.ship.radius * sin(this.angle)),
    );

    this.direction =
      this.ship.position.copy().sub(this.position).normalize();
  }


  adjustAngle(adjustment) {
    if (this.angle == 360) {
      this.angle = 0;
    }
    else {
      this.angle += adjustment;
    }
  }

  moveLeft(adjustment) {
    this.adjustAngle(adjustment ? -adjustment : -0.1);
  }

  moveRight(adjustment) {
    this.adjustAngle(adjustment ? adjustment : +0.1);
  }

  draw() {
    if (config.wireframe) {
      stroke(this.colour);
      noFill();
    }
    else {
      noStroke();
      fill(this.colour);
    }

    ellipse(this.position.x, this.position.y, 10);
  }

  activate() {
    this.ship.applyForce(this.direction.mult(1.2));
  }
}

class GumballOne extends Rocket {

  constructor(options) {
    super(options);

    this.radius = 50;
    this.velocity = createVector(0,0);

    this.thruster = new Thruster(this, radians(random(0,359)));

    this.attachments = [
      this.thruster
    ];
  }

  update() {
    super.update();
    this.attachments.update();
  }

  draw() {
    if (config.wireframe) {
      stroke(this.colour);
      strokeWeight(1);
    }
    else {
      noStroke();
      fill(this.colour);
    }

    ellipse(this.position.x, this.position.y, 3);
    ellipse(this.position.x, this.position.y, this.radius * 2);

    this.attachments.draw();
  }
}

function setup() {
  scene = new Scene();

  gumball = new GumballOne({
    position: randomPosition()
  });
  scene.addObject(gumball);
}

function windowResized() {
  scene.resize(windowWidth, windowHeight);
}

function draw() {
  switch (key) {
    case 'q': gumball.thruster.moveLeft(0.01); break;
    case 'w': gumball.thruster.moveRight(0.01); break;
  }
  //gumball.thruster.moveLeft(0.01);

  scene.draw();
}

function keyPressed() {
  switch (key) {
    case ' ': gumball.thruster.activate() ; break;
  }

  if (key == ' ') {
    gumball.thruster.activate();
  }
}

function keyReleased() {
  key = undefined;
}

function mouseWheel(e) {
  gumball.thruster.adjustAngle(e.delta/100);
}

function mousePressed() {
  console.log(createVector(
    mouseX - (width/2),
    mouseY - (height/2)
  ));
}
