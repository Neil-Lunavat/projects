// TODO: create mathematically accurate simple pendulum
// TODO: create a side by side physics enabled pendulum
function preload() {
    font = loadFont("/assets/FiraCode-VariableFont_wght.ttf");
}

function setup() {
    textFont(font);
    textSize(28);
    createCanvas(800, 400);
    mp = new mpendulum(200, 0, 200 * 1.25, 40);
    pp = new ppendulum(400, 100 * 1.25, 200 * 1.25, 3);

    gravity = createVector(0, 1);
}

function draw() {
    background(127);
    text("Mathematical Pendulum", 25, 350);
    text("Physics Pendulum", 465, 350);

    line(400, 0, 400, 400);

    mp.update();
    mp.display();
    pp.update();
    pp.display();
}

function ppendulum(x, y, l, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.max_length = l;
    this.spring_constant = 1;

    this.update = () => {
        this.applyForce(gravity);
        this.simulate();

        string = p5.Vector.sub(this.pos, createVector(600, 0));
        extension = string.mag() - this.max_length;
        if (extension > 0) {
            this.applyForce(
                string.normalize().mult(-this.spring_constant * extension)
            );
            this.simulate();
        }
    };

    this.simulate = () => {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };

    this.display = () => {
        strokeWeight(2);
        line(this.pos.x, this.pos.y, 600, 0);
        circle(this.pos.x, this.pos.y, this.mass * 10);
    };

    this.applyForce = (f) => {
        this.acc.add(p5.Vector.div(f, this.mass));
    };
}

function mpendulum(x, y, l, s) {
    this.time = -PI / 4;
    this.amplitude = 0;
    this.angle = 0;

    this.pos = createVector(x, y);
    this.length = l;
    this.size = s;

    this.update = () => {
        this.angle = (sin(this.time) * Math.PI) / 4;
        this.time += 0.08;
    };
    this.display = () => {
        push();
        strokeWeight(2);
        translate(this.pos.x, this.pos.y);
        line(
            0,
            0,
            this.length * sin(this.angle),
            this.length * cos(this.angle)
        );
        circle(
            this.length * sin(this.angle),
            this.length * cos(this.angle),
            this.size
        );
        pop();
    };
}
