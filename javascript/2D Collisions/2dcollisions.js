document.addEventListener("contextmenu", (event) => event.preventDefault());
let balls = [];
let mousePos;

function preload() {
    clack = new Audio("./clack.wav");
    clack = new Audio("./2D Collisions/clack.wav");
}

function setup() {
    createCanvas(1200, 800);
    for (let i = 0; i < 30; i++) {
        balls[i] = new Ball(random(width), random(height), random(3, 5));
    }
}

function draw() {
    clacksound = false;
    background(127);
    mousePos = createVector(mouseX, mouseY);
    for (let b of balls) {
        b.bounce();
        b.update();
        b.display();
    }

    if (clacksound) clack.play();
}

function Ball(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(10);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.selected = false;

    this.display = () => {
        push();
        fill(255);
        if (this.selected && mouseButton == RIGHT) {
            fill(200);
            stroke(240, 50, 80);
            strokeWeight(5);
            line(this.pos.x, this.pos.y, mousePos.x, mousePos.y);
        }
        strokeWeight(3);
        circle(this.pos.x, this.pos.y, this.mass * 10);
        offset = this.vel.copy().setMag(this.mass * 5);
        line(
            this.pos.x,
            this.pos.y,
            this.pos.x + offset.x,
            this.pos.y + offset.y
        );
        pop();
    };
    this.update = () => {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if (this.selected && mouseButton == LEFT) {
            this.pos = mousePos;
        }
        for (let b of balls) {
            if (this != b) {
                posdiff = p5.Vector.sub(b.pos, this.pos);
                overlap = (this.mass + b.mass) * 5 - posdiff.mag();
                if (overlap > 0) {
                    b.pos.add(posdiff.setMag(overlap));

                    veldiff = p5.Vector.sub(b.vel, this.vel);
                    m = (2 * b.mass) / (this.mass + b.mass);
                    c = posdiff.mult(
                        (p5.Vector.dot(veldiff, posdiff) * m) /
                            Math.pow(posdiff.mag(), 2)
                    );

                    this.vel.add(c);

                    m = (2 * this.mass) / (this.mass + b.mass);
                    c = posdiff.mult(
                        (p5.Vector.dot(veldiff, posdiff) * m) /
                            Math.pow(posdiff.mag(), 2)
                    );

                    b.vel.sub(c);
                    clacksound = true;
                }
            }
        }
        this.vel.mult(0.988);
        // if (this.vel.mag() < 0.01) this.vel.mult(0);
        this.acc.mult(0);
    };
    this.applyForce = (f) => {
        this.acc.add(f.div(this.mass));
    };
    this.bounce = () => {
        if (this.pos.x < this.mass * 5) {
            this.pos.x = this.mass * 5;
            this.vel.x *= -1;
            clacksound = true;
        }
        if (this.pos.x > width - this.mass * 5) {
            this.pos.x = width - this.mass * 5;
            this.vel.x *= -1;
            clacksound = true;
        }
        if (this.pos.y < this.mass * 5) {
            this.pos.y = this.mass * 5;
            this.vel.y *= -1;
            clacksound = true;
        }
        if (this.pos.y > height - this.mass * 5) {
            this.pos.y = height - this.mass * 5;
            this.vel.y *= -1;
            clacksound = true;
        }
    };
}

function mousePressed() {
    for (let b of balls)
        if (p5.Vector.dist(b.pos, mousePos) < b.mass * 10) b.selected = true;
}
function mouseReleased() {
    for (let b of balls) {
        if (b.selected && mouseButton == RIGHT)
            b.applyForce(p5.Vector.sub(b.pos, mousePos).mult(0.4));
        b.selected = false;
    }
}
