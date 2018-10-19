class Scene {
  constructor() {
    this.background = '#000000';
    this.reset_background = true;

    this.width = windowWidth;
    this.height = windowHeight;
    this.gutter_px = 100;

    this.draw_guides = false;
    this.guide_colour = '#AAAAAA';
    this.guide_weight = 1;

    this.objects = [];
    this.fixed_objects = [];

    this.planets_interact = true;

    createCanvas(this.width, this.height);
    this.updateBounds();
  }

  resize(width, height) {
    this.width = width;
    this.height = height;

    resizeCanvas(this.width, this.height);
    this.updateBounds();
  }

  updateBounds() {
    this.minx = -( this.width / 2) - this.gutter_px;
    this.maxx =  ( this.width / 2) + this.gutter_px;
    this.miny = -(this.height / 2) - this.gutter_px;
    this.maxy =  (this.height / 2) + this.gutter_px;
  }

  addObject(object) {
    if (object == undefined) {
      return;
    }

    this.objects.push(object);
  }

  addFixedObject(object) {
    if (object == undefined) {
      return;
    }

    this.fixed_objects.push(object);
  }

  updateObjects() {

    // Fixed Objects attract Variable Objects
    this.fixed_objects.forEach((attractor) => {
      this.objects.forEach((attractee) => {
        attractee.attractedTo(attractor);
      });
    });

    // Variable Objects attract Variable Objects
    this.objects.forEach((attractor) => {
      this.objects.forEach((attractee) => {
        attractee.attractedTo(attractor);
      });
    });

    // Update all Objects
    this.objects.forEach(o => o.update(this));
    this.fixed_objects.forEach(o => o.update(this));

  }

  drawGuides() {
    stroke(this.guide_colour);
    strokeWeight(this.guide_weight);
    line(-(this.width/2), 0, (this.width/2), 0);
    line(0, -(this.height/2), 0, (this.height/2));
  }

  drawObjects() {
    this.fixed_objects.forEach(o => o.draw());
    this.objects.forEach(o => o.draw());
  }

  draw() {
    if (this.reset_background) {
      background(this.background);
    }

    const font_size = 16;

    fill(255);
    textSize(font_size);
    textAlign(LEFT);
    text(`${width}x${height}`, 0, font_size);

    let text_pos = font_size * 2;
    this.objects.forEach((o, i) => {
      fill(o.colour);
      text(`${o.position.x}x${o.position.y}`, 0, text_pos);
      text_pos += font_size;
    });

    translate(this.width/2, this.height/2);

    this.updateObjects();

    if (this.draw_guides) {
      this.drawGuides();
    }

    this.drawObjects();
  }
}
