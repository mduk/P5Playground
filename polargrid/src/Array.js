Array.prototype.draw = function() {
  let i = this.length;
  while (i--) {
    this[i].draw();
  }
};


Array.prototype.update = function() {
  this.map((e) => e.update());
};
