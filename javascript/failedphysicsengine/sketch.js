// TODO: Make soft body simulation in Euler physics
let springs = [];
let w, h;

function setup() {
    createCanvas(400, 400);
    (w = 3), (h = 4);
    particles = [];

    for (i = 0; i < h; i++) {
        for (j = 0; j < w; j++) {
            particles[i * w + j] = new Particle(
                125 + i * 25,
                325 + j * 25,
                2,
                i * w + j
            );
        }
    }

    (k = 0.01), (l = 30), (d = 0.1);
    for (i = 0; i < h; i++) {
        for (j = 0; j < w - 1; j++) {
            z = i * w + j;
            springs.push(
                new Spring(particles[z], particles[z + w - 2], k, l, d)
            );
        }
    }

    for (j = 0; j < w; j++) {
        for (i = 0; i < h - 1; i++) {
            z = i * w + j;
            springs.push(new Spring(particles[z], particles[z + w], k, l, d));
        }
    }

    for (j = 0; j < w - 1; j++) {
        for (i = 0; i < h - 1; i++) {
            z = i * w + j;
            springs.push(new Spring(particles[z], particles[z + h], k, l, d));
        }
    }

    for (j = 1; j < w; j++) {
        for (i = 0; i < h - 1; i++) {
            z = i * w + j;
            springs.push(
                new Spring(particles[z], particles[z + h - 2], k, l, d)
            );
        }
    }

    // particles[0] = new Particle(random(width), random(height), 2);
    // particles[1] = new Particle(random(width), random(height), 2);
    // springs[0] = new Spring(particles[0], particles[1], 0.01, 50, 0.01);

    gravity = createVector(0, 0.9);
}
function draw() {
    background(127);

    for (let p of particles) {
        p.calculateForces();
    }
    for (let s of springs) {
        s.applyForces();
    }
    for (let p of particles) {
        p.update(particles);
        p.display();
    }
    for (let s of springs) {
        s.display();
    }
}
