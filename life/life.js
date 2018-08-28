var x, y;
var scalepx = 10;
var grid;

function keyPressed() {
  randomise(grid, 1);
  return false;
}

function mouseClicked() {
  randomise(grid, 1);
}

function setup() {
  createCanvas(1201, 401);
  frameRate(10);

  x = Math.floor(width / scalepx);
  y = Math.floor(height / scalepx)
  grid = initgrid(x, y, 0);

  randomise(grid, 1);
  rendergrid(grid, x, scalepx);
}

function draw() {
  grid = process(grid, x);
  rendergrid(grid, x, scalepx);
}

function initgrid(x, y, v) {
  var grid = [];
  for (var i = 0; i < (x * y); i++) {
    grid[i] = v;
  }

  return grid
}

function randomise(g, l) {
  for (var i = 0; i < g.length; i++) {
    if (r(0, l) == 0) {
      g[i] = 1;
    }
    else {
      g[i] = 0;
    }
  }

  return g;
}

function neighbours(g, w, i) {
  return [
    g[i-w-1],
    g[i-w],
    g[i-w+1],
    g[i-1],
    //g[i],
    g[i+1],
    g[i+w-1],
    g[i+w],
    g[i+w+1]
  ];
}

function process(g, w) {
  var ng = [];

  for (var i = 0; i < g.length; i++) {
    var c = g[i];
    var alive = c > 0;
    var dead = c == 0;

    var nc = 0;

    var livingNeighbours = neighbours(g, w, i).reduce((a, b) => a + b, 0)
    var underpopulated = livingNeighbours < 2;
    var overpopulated = livingNeighbours > 3;
    var stable = livingNeighbours == 2 ||  livingNeighbours == 3;

    if (alive && underpopulated) {
      nc = 0;
    }
    else if (alive && stable) {
      nc = 1;
    }
    else if (alive && overpopulated) {
      nc = 0;
    }
    else if (dead && livingNeighbours == 3) {
      nc = 1;
    }

    ng[i] = nc;
  }

  return ng;
}

function rendergrid(g, w, px) {
  var x = 0;
  var y = 0;

  for (var i = 0; i < g.length; i++) {
    if (i % w == 0) {
      y++;
      x = 0;
    }

    var xpx = x * px;
    var ypx = y * px;

    if (g[i] == 0) {
      fill(255);
    }
    else {
      fill(r(50,100));
    }

    rect(xpx, ypx, px, px);

    x++;
  }
}

function r(min, max) {
  return round(Math.random() * (max - min) + min);
}
