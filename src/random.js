function randomColour() {
  return color(
    random(255),
    random(255),
    random(255)
  );
}

function randomPosition() {
  return createVector(
    random(-(width/2), (width/2)),
    random(-(height/2), (height/2))
  );
}

function mouseVector() {
  return createVector(
    mouseX - (width / 2),
    mouseY - (height / 2)
  );
}
