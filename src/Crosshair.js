class Crosshair extends Drawable {
  constructor({position, colour, size}) {
    super()
    this.position = position || createVector(0,0);
    this.colour   = colour   || randomColour();
    this.size     = size     || 0;
  }

  target({position, size}) {
    this.position = position;
    this.size = size;
  }

  update() {

  }

  draw() {
    stroke(this.colour);
    strokeWeight(6);

    const o = 20;
    const p = this.position;
    const s = this.size;

    line( p.x, p.y-o-s, p.x, p.y-o-s-50); // Top
    line( p.x, p.y+o+s, p.x, p.y+o+s+50); // Bottom
    line( p.x-o-s, p.y, p.x-o-s-50, p.y); // Left
    line( p.x+o+s, p.y, p.x+o+s+50, p.y); // Right
  }
}
