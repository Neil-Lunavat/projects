particles = [];
function setup() {
    createCanvas(400, 400);
    gravity = createVector(0, 0.1);
    frameRate(60);
}

function draw() {
    background(127);

    if (mouseIsPressed) particles.push(new Particle(20, 20, 2));
    for (let p of particles) {
        p.applyForce(gravity);
        p.update(particles);
        p.display();
    }
}

function Particle(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(10, 0);
    this.force = createVector(0, 0);
    this.mass = m;
    this.radius = m * 5;

    this.update = (particles) => {
        this.vel.add(p5.Vector.div(this.force, this.mass));
        this.pos.add(this.vel);

        for (let p of particles) {
            if (this != p) {
                distance = p5.Vector.sub(p.pos, this.pos);
                extension = this.radius + p.radius - distance.mag();
                if (extension > 0) {
                    p.pos.add(distance.setMag(extension / 2));
                    this.pos.sub(distance.setMag(extension / 2));
                }
            }
        }

        if (this.pos.x > width - this.radius) {
            this.pos.x -= this.pos.x - width + this.radius;
        }
        if (this.pos.x < this.radius) {
            this.pos.x += this.radius - this.pos.x;
        }
        if (this.pos.y > height - this.radius) {
            this.pos.y -= this.pos.y - height + this.radius;
        }
        if (this.pos.y < this.radius) {
            this.pos.y += this.radius - this.pos.y;
        }
        this.force.mult(0);
    };
    this.applyForce = (f) => {
        this.force.add(f);
    };
    this.display = () => {
        circle(this.pos.x, this.pos.y, this.radius * 2);
    };
}
