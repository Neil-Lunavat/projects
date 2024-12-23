function Particle(x, y, m, n) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.force = createVector(0, 0);
    this.mass = m;
    this.n = n;

    this.calculateForces = () => {
        //CALCULATE DUNIYA BHAR KE FORCES
        this.applyForce(p5.Vector.mult(gravity, this.mass));
        if (mouseIsPressed) this.applyForce(createVector(0.5, 0));
    };

    this.update = (particles) => {
        // UPDATE PHYSICS acc vel pos
        acc = this.force.div(this.mass);
        vel = p5.Vector.add(this.vel, acc);
        pos = p5.Vector.add(this.pos, vel);

        //BOUNCE vel pos
        if (pos.x < this.mass * 5) {
            pos.x = this.mass * 5;
            vel.x *= -1;
        }
        if (pos.x > width - this.mass * 5) {
            pos.x = width - this.mass * 5;
            vel.x *= -1;
        }
        if (pos.y < this.mass * 5) {
            pos.y = this.mass * 5;
            vel.y *= -1;
        }
        if (pos.y > height - this.mass * 5) {
            pos.y = height - this.mass * 5;
            vel.y *= -1;
        }

        //COLLIDE vel pos
        for (p of particles) {
            if (this != p) {
                posdiff = p5.Vector.sub(p.pos, pos);
                extension = (this.mass + p.mass) * 5 - posdiff.mag();
                if (extension > 0) {
                    p.pos.add(p5.Vector.setMag(posdiff, extension / 2));
                    pos.sub(p5.Vector.setMag(posdiff, extension / 2));
                    // veldiff = p5.Vector.sub(p.vel, vel);
                    // m = (2 * p.mass) / (this.mass + p.mass);
                    // c = posdiff.mult(
                    //     (p5.Vector.dot(veldiff, posdiff) * m) /
                    //         Math.pow(posdiff.mag(), 2)
                    // );
                    // vel.add(c);
                    // m = (2 * this.mass) / (this.mass + p.mass);
                    // c = posdiff.mult(
                    //     (p5.Vector.dot(veldiff, posdiff) * m) /
                    //         Math.pow(posdiff.mag(), 2)
                    // );
                    // p.vel.sub(c);
                }
            }
        }

        this.vel = vel;
        this.pos = pos;
        this.vel.mult(0.979);
        this.force.mult(0);
    };

    this.display = () => {
        strokeWeight(3);
        circle(this.pos.x, this.pos.y, this.mass * 10);
        text(this.n, this.pos.x - 5, this.pos.y + 5);
    };

    this.applyForce = (f) => {
        this.force.add(f);
    };
}

function Spring(pA, pB, k, l, d) {
    (this.pA = pA), (this.pB = pB), (this.k = k), (this.l = l), (this.d = d);

    this.applyForces = () => {
        X = p5.Vector.sub(this.pA.pos, this.pB.pos);
        extension = X.mag() - this.l;

        //SPRING FORCE
        fs = p5.Vector.setMag(X, this.k * extension);

        //DAMPING
        veldiff = p5.Vector.sub(this.pA.vel, this.pB.vel);
        fd = X.normalize().dot(veldiff) * this.d;

        f = p5.Vector.add(fs, fd);

        if (extension != 0) {
            pB.applyForce(f);
            pA.applyForce(f.mult(-1));
        }
    };

    this.display = () => {
        push();
        strokeWeight(3);
        stroke(250, 10, 20);
        line(this.pA.pos.x, this.pA.pos.y, this.pB.pos.x, this.pB.pos.y);
        pop();
    };
}
