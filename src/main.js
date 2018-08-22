function randomColour() {
  return color(
    random(255),
    random(255),
    random(255)
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
    const isWithin =
           (this.position.x < minx)
        || (this.position.x > maxx)
        || (this.position.y < miny)
        || (this.position.y > maxy);
    console.log('is within', isWithin);
    return isWithin;
  }

  update() {}
  draw() {}
}

class Agent extends Drawable {
  constructor({position, velocity, size}) {
    super();
    this.size = size || random(10, 50);
    this.position = position || createVector(
      random(-(width/2), (width/2)),
      random(-(height/2), (height/2))
    );

    this.velocity = createVector(
      0,0
    );

    this.acceleration = createVector(
      random(-0.1, 0.1),
      random(-0.1, 0.1)
    );
  }

  draw() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);



    fill('#0000FF');
    line(0, 0, this.position.x, this.position.y);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading() + radians(90));
    triangle(
      0, 0,
      (this.size / 3), this.size,
      -(this.size / 3), this.size
    );
  }
}

class Ellipse extends Drawable {
  constructor({position, size, colour}) {
    super();
    if (position) {
      this.position = position;
    } else {
      this.position = createVector(
        random(-(width/2), (width/2)),
        random(-(height/2), (height/2))
      );
    }

    this.size = size || random(10, 50);
    this.colour = colour || randomColour();
  }

  draw() {
    noStroke();
    fill(this.colour);
    ellipse(this.position.x, this.position.y, this.size);
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

let objects = [];
let minx;
let maxx;
let miny;
let maxy;

function setup() {
  createCanvas(windowWidth, windowHeight);
  objects.push(new Agent({}));
  objects.push(new Ellipse({}));

  minx = -(width /2);
  maxm =  (width /2);
  miny = -(height/2);
  maxy =  (height/2);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  let mouseV = createVector(
    mouseX - (width / 2),
    mouseY - (height / 2)
  );

  console.log("click!", mouseV);

  if (random(-1,1) > 0) {
    objects.push(new Agent({position: mouseV}));
  } else {
    objects.push(new Ellipse({position: mouseV}));
  }
}

function draw() {
  translate(width/2, height/2);
  background(0);

  guides();

  let i = objects.length;
  while (i--) {
    let object = objects[i];
    if (object.isOffCanvas()) {
      objects.splice(i, 1);
      continue;
    }

    push();
    object.draw();
    pop();
  }
}
