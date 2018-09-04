class Scene {
  constructor() {
    this.background = '#000000';

    this.width = windowWidth;
    this.height = windowHeight;
    this.gutter_px = 100;

    this.draw_guides = true;
    this.guide_colour = '#AAAAAA';
    this.guide_weight = 1;

    createCanvas(this.width, this.height);
    this.updateBounds();
  }

  resize() {
    resizeCanvas(this.width, this.height);
    this.updateBounds();
  }

  updateBounds() {
    this.minx = -( this.width / 2) - this.gutter_px;
    this.maxx =  ( this.width / 2) + this.gutter_px;
    this.miny = -(this.height / 2) - this.gutter_px;
    this.maxy =  (this.height / 2) + this.gutter_px;
  }

  drawGuides() {
    stroke(this.guide_colour);
    strokeWeight(this.guide_weight);
    line(-(this.width/2), 0, (this.width/2), 0);
    line(0, -(this.height/2), 0, (this.height/2));
  }

  draw() {
    background(this.background);

    translate(this.width/2, this.height/2);

    if (this.draw_guides) {
      this.drawGuides();
    }
  }
}

let scene;
function setup()         { scene = new Scene(); }
function windowResized() { scene.resize(); }
function draw()          { scene.draw(); }
