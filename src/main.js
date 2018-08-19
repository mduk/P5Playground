function randomColour() {
  return color(
    random(255),
    random(255),
    random(255)
  );
}

class Creature {
  constructor({position, size}) {
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
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading() + radians(90));
    triangle(
      0, 0,
      (this.size / 3), this.size,
      -(this.size / 3), this.size
    );
  }
}

class Ellipse {
  constructor({position, size, colour}) {
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
    fill(this.colour);
    ellipse(this.position.x, this.position.y, this.size);
  }
}

function guides() {
  stroke(50);
  line(-(width/2), 0, (width/2), 0);
  line(0, -(height/2), 0, (height/2));
}

////////////////////////////////////////////////////////////////////////////////
// Main
////////////////////////////////////////////////////////////////////////////////

let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  objects.push(new Creature({}));
  objects.push(new Ellipse({}));
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

  //objects.push(new Ellipse({position: mouseV}));
  objects.push(new Creature({position: mouseV}));
}

function draw() {
  translate(width/2, height/2);
  background(0);

  guides();

  objects.map((object) => {
    push();
    object.draw();
    pop();
  });

}
