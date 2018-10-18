
class PolarGrid extends Drawable {

  constructor({position, radius, steps,
      orbit_target, orbit_velocity,
      stroke, strokeWeight}) {

    super();
    this.objects = [];
    this.position = position || createVector(0,0);
    this.radius = radius;
    this.steps = steps;

    this.orbit_target = orbit_target;
    this.orbit_velocity = orbit_velocity || this.radius;
    this.orbital_position = 0;

    this.stroke = stroke;
    this.strokeWeight = strokeWeight;
  }

  applyFill() {
    if (this.fill) {
      fill(this.fill);
    }
    else {
      noFill();
    }
  }

  applyStroke() {
    if (this.stroke) {
      stroke(this.stroke);
      if (this.strokeWeight) {
        strokeWeight(this.strokeWeight);
      }
    }
    else {
      noStroke();
    }
  }

  addObject(object, position, orbital_velocity) {
    this.objects.push({ object, position, orbital_velocity });
  }

  update() {
    if (this.orbital_position < 360) {
      this.orbital_position = 0;
    }
    else {
      this.orbital_position++;
    }
  }

  draw() {
    this.applyStroke();
    this.applyFill();
    ellipse(this.position.x, this.position.y, this.radius*2);

    this.objects.forEach(({object, position, orbital_velocity}) => {
      object.update();

      position.rotate(degrees(orbital_velocity));

      object.applyStroke();
      ellipse(this.position.x, this.position.y, position.mag()*2);

      push();
      translate(position.x, position.y);
      object.draw();
      pop();
    });
  }

}

class SolarSystem extends PolarGrid {
  addPlanet() {
    const planetary_radius_min = 10;
    const planetary_radius_max = 30;
    const planetary_radius = random(planetary_radius_min, planetary_radius_max);

    const orbital_radius_min = 50;
    const orbital_radius_max = this.radius;
    const orbital_radius = random(orbital_radius_min, orbital_radius_max);

    this.addObject(

      new PolarGrid({
        radius: planetary_radius,
        stroke: randomColour(),
        strokeWeight: 1
      }),

      createVector(
        random(-this.radius, this.radius),
        random(-this.radius, this.radius)
      ).setMag(orbital_radius),

      map(orbital_radius,
          orbital_radius_min, orbital_radius_max,
        0.001, 0.000001
      )

    );
  }
}

////////////////////////////////////////////////////////////////////////////////

let scene;
let system;

function setup() {
  scene = new Scene();

  system = new SolarSystem({
    radius: min(height/2,width/2),
    strokeWeight: 4,
    stroke: '#ffffff'
  })

  const rand = random(4,9);
  for (let i=0; i<rand; i++) {
    system.addPlanet();
  }

  scene.addObject(system);
}

function windowResized() {
  scene.resize(windowWidth, windowHeight);
}

function draw() {
  switch (key) {
    default: break;
  }

  scene.draw();
}

function keyPressed() {
  switch (key) {
    default: break;
  }
}

function keyReleased() {
  key = undefined;
}
