class Ellipse {
  draw() {
    fill('#FF0000');
    ellipse(0, 0, 10, 10);
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

  stroke('#FFFFFF');
  line(-(width/2), 0, (width/2), 0);
  line(0, -(height/2), 0, (height/2));

  objects.push(new Ellipse);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  translate(width/2, height/2);
  objects.map((object) => {
    push();
    object.draw();
    pop();
  });

}
