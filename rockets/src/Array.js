Array.prototype.draw = function() {
  let i = this.length;
  while (i--) {
    this[i].draw();
  }
};

