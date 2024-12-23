let gridsize = 10;
let gridvalues;
let w, h;
let z = 0;
function setup() {
    createCanvas(400, 400);
    (w = width / gridsize), (h = height / gridsize);
    gridvalues = new Array(w).fill(0).map(() => new Array(h).fill(0));
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            gridvalues[i][j] = random() * 255;
        }
    }
    noStroke();
}

function draw() {
    background(127);

    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            gridvalues[i][j] = random(255);
            gridvalues[i][j] = noise(i / w, j / h, z) * 255;
            fill(gridvalues[i][j]);
            rect(i * gridsize, j * gridsize, gridsize, gridsize);
        }
    }
    z += 0.01;
}
