class Scene {
  constructor() {
    this.background = '#000000';

    this.width = windowWidth;
    this.height = windowHeight;
    this.gutter_px = 100;

    this.draw_guides = true;
    this.guide_colour = '#AAAAAA';
    this.guide_weight = 1;

    this.objects = [];
    this.fixedObjects = [];

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

    this.fixedObjects.push(object);
  }

  updateObjects() {
    this.fixedObjects.forEach((fo) => {
      this.objects.forEach((vo) => {
        vo.attractedTo(fo);

      stroke(150);
      strokeWeight(1);
      line(vo.position.x, vo.position.y,
           fo.position.x, fo.position.y);
      });
    });

    this.objects.forEach((attractor) => {
      this.objects.forEach((attractee) => {
        attractee.attractedTo(attractor);
      });
    });


    this.objects.forEach((object) => {
      if (!(object instanceof Drawable)) {
        console.log("Object is not drawable!", object);
        return;
      }
      object.update(this);
    });
  }

  drawGuides() {
    stroke(this.guide_colour);
    strokeWeight(this.guide_weight);
    line(-(this.width/2), 0, (this.width/2), 0);
    line(0, -(this.height/2), 0, (this.height/2));
  }

  drawObjects() {
    this.fixedObjects.forEach(o => o.draw());
    this.objects.forEach(o => o.draw());
  }

  draw() {
    background(this.background);

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
