class Drawable {
  isOffCanvas() {
    return (this.position.x < minx)
        || (this.position.x > maxx)
        || (this.position.y < miny)
        || (this.position.y > maxy);
  }

  collidesWith(objects) {
    return objects
      .filter((o) => {
        return ((this.position.dist(o.position) - o.size) <= 0) ;
      })
      .map((o) => {
        const otype = o.constructor.name;
        const handler = `handleCollisionWith${otype}`;
        if (typeof this[handler] == 'function') {
          this[handler](o);
        }
        else {
          console.log(`No collision handler: ${this.constructor.name}.${handler}`);
        }
        return o;
      });
  }

  update() {}
  draw() {}
}
