class Drawable {
  isOffCanvas() {
    return (this.position.x < minx)
        || (this.position.x > maxx)
        || (this.position.y < miny)
        || (this.position.y > maxy);
  }

  collideWith() {}
  update() {}
  draw() {}
}
