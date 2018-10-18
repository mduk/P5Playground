function randomColour() {
  const step = 50;
  const steps = 5;
  return color(
    int(random(steps)) * step,
    int(random(steps)) * step,
    int(random(steps)) * step
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
