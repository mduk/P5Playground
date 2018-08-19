function randomColour() {
  return color(
    random(255),
    random(255),
    random(255)
  );
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

////////////////////////////////////////////////////////////////////////////////
// Main
////////////////////////////////////////////////////////////////////////////////

let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#000000');

  translate(width/2, height/2);
  fill('#FFFF00');
  ellipse(0,0,10,10);

  stroke(50);
  line(-(width/2), 0, (width/2), 0);
  line(0, -(height/2), 0, (height/2));

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

  objects.push(new Ellipse({position: mouseV}));
}

function draw() {
  translate(width/2, height/2);
  objects.map((object) => {
    push();
    object.draw();
    pop();
  });

}
