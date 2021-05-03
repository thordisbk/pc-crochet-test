// https://processing.org/examples/springs.html
// https://gafferongames.com/post/spring_physics/
// https://ghoscher.com/2013/03/02/simple-spring-physics/

class Node {
    // let radius;  // sphere radius
    // PVector pos;  // x,y,z position
    // PVector col;  // sphere color
    // PVector colH;  // sphere color when mouse hovers over it

    // boolean over = false;  // true if mouse is over this node
    // boolean move = false;  // true if mouse has pressed this node

    // let mass;  // mass of the node, for spring physics

    constructor() {
        if (arguments.length == 4) this.Node(arguments[0], arguments[1], arguments[2], arguments[3]);
        else if (arguments.length == 5) this.Node(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
        else if (arguments.length == 6) this.Node(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        else console.warn("Node() constructor received wrong number of arguments");
    }

    // Constructor, main (rad, position, mass, color)
    Node(r, p, m, c) {
        this.pos = p;
        this.radius = r;
        this.mass = m;
        this.col = c;
        this.colH = createVector(c.x/2, c.y/2, c.z/2);
    }

    // Constructor, main (rad, position, mass, color)
    Node(r, x, y, z, m, c) {
        this.pos = createVector(x, y, z);
        this.radius = r;
        this.mass = m;
        this.col = c;
        this.colH = createVector(c.x/2, c.y/2, c.z/2);
    }

    // Constructor, without color
    Node(r, x, y, z, m) {
        this.pos = createVector(x, y, z);
        this.radius = r;
        this.mass = m;
        this.col = createVector(255, 255, 255);
        this.colH = createVector(153, 153, 153);
    }

    // // Check if mouse is over this node
    // overEvent() {
    //     // get position in screen coordinates
    //     let pos2D = createVector(screenX(this.pos.x, this.pos.y, this.pos.z), screenY(this.pos.x, this.pos.y, this.pos.z), screenZ(this.pos.x, this.pos.y, this.pos.z));
    //     // TODO apply rotation as well?
    //     // compare mouse poleter position to screen coordinates of object
    //     let dist = pos2D.dist(createVector(touchX, touchY, 0));
    //     if (dist < this.radius) {
    //         this.over = true;
    //     } else {
    //         this.over = false;
    //     }
    //     // console.log("over? dist = " + dist + "\n");
    // }
    
    // // Called from touchStarted() to check if this is the node being clicked
    // pressed() {
    //     if (this.over) {
    //         this.move = true;
    //     } else {
    //         this.move = false;
    //     }
    // }

    // // Called from touchEnded() to release this node
    // released() {
    //     this.move = false;
    // }

    update() {
        // TODO update() find 3D position correcsponding to these screen coordinates
        if (this.move) {
            // pos.set(touchX, touchY, pos.z);
            // pos.set(pos.x + 1, pos.y, pos.z);
        }
    }

    Draw() {
        noStroke();

        if (this.over) {
            fill(this.colH.x, this.colH.y, this.colH.z);
        } else {
            fill(this.col.x, this.col.y, this.col.z);
        }
        // console.log("node pos: " + pos + "\n");

        push();
        rotateX(radians(ROTATION.x));
        rotateY(radians(ROTATION.y));
        rotateZ(radians(ROTATION.z));

        let zoomPos = p5.Vector.mult(this.pos, ZOOM);
        translate(zoomPos.x, zoomPos.y, zoomPos.z);
        // translate(pos.x * ZOOM, pos.y * ZOOM, pos.z * ZOOM);
        scale(ZOOM, ZOOM, ZOOM);

        // translate(pos.x, pos.y, pos.z);
        sphere(this.radius);
        pop();
    }
}

class Spring {
    // End nodes
    // Node nodeA;
    // Node nodeB;

    // Spring simulation constants

    // k is a constant describing the tightness of the spring. 
    //  Larger values of k mean that the spring is tighter and will therefore stretch less per unit of force, 
    //  smaller values mean the spring is looser and will stretch further.
    // let k = 0.2;    // Spring constant
    // Damping simulates energy loss, and it is used in physics simulations to make sure 
    //  that springs don’t oscillate forever but come to rest over time.
    // let damp;       // Damping

    // let rest_dist;  // Rest distance from X,Y

    // Spring simulation variables
    // PVector velocity;        // X Y Velocity
    // let acceleration = 0;    // Acceleration
    // let force = 0;    // Force

    // let strokeThickness = 3.0;
    // boolean bounceAtStart = false;

    // PVector col;

    // boolean isSpring = true;
    // boolean updatePositions = false;

    // Constructor
    constructor(n1, n2, rd, d, k_const, c, notASpring) {

        this.bounceAtStart = false;
        this.strokeThickness = 3.0;
        this.acceleration = 0;
        this.force = 0;
        this.isSpring = true;
        this.updatePositions = false;

        // TODO color
        let z = 0;

        this.nodeA = n1;
        this.nodeB = n2;

        this.rest_dist = rd;
        this.damp = d;
        this.k = k_const;
        this.velocity = createVector(0.0, 0.0);

        this.col = c;

        if (notASpring) {
            this.isSpring = false;
        }

        // bounce at start
        if (this.bounceAtStart) {
            this.nodeA.pos.set(this.nodeA.pos.x, this.nodeA.pos.y + 100, this.nodeA.pos.z);
            this.nodeB.pos.set(this.nodeB.pos.x, this.nodeB.pos.y - 100, this.nodeB.pos.z);
        }
    }

    update() {

        if (this.isSpring && this.updatePositions) {
            this.updatePos(this.nodeA.pos, this.nodeB.pos, this.nodeA.mass);
            this.updatePos(this.nodeB.pos, this.nodeA.pos, this.nodeB.mass);
        }

        // this.nodeA.overEvent();
        // this.nodeB.overEvent();
    }

    updatePos(pos1, pos2, mass) {

        // if this frame will bring the ball closer to rest pos --> stop
        let prev_rest_temp_dist = p5.Vector.dist(pos1, pos2);

        this.force = -this.k * (pos2.y - pos1.y);                     // f=-ky
        this.acceleration = this.force / mass;                        // Set the acceleration, f=ma == a=f/m
        this.velocity.y = this.damp * (this.velocity.y + this.acceleration);    // Set the velocity
        pos2.y = pos2.y + this.velocity.y;                       // Updated position

        this.force = -this.k * (pos2.x - pos1.x);                     // f=-kx
        this.acceleration = this.force / mass;                        // Set the acceleration, f=ma == a=f/m
        this.velocity.x = this.damp * (this.velocity.x + this.acceleration);    // Set the velocity
        pos2.x = pos2.x + this.velocity.x;                       // Updated position

        this.force = -this.k * (pos2.z - pos1.z);                     // f=-kx
        this.acceleration = this.force / mass;                        // Set the acceleration, f=ma == a=f/m
        this.velocity.z = this.damp * (this.velocity.z + this.acceleration);    // Set the velocity
        pos2.z = pos2.z + this.velocity.z;                       // Updated position
        // console.log("Correct: " + pos2 + "\n");

        let curr_rest_temp_dist = p5.Vector.dist(pos1, pos2);

        if ((curr_rest_temp_dist < prev_rest_temp_dist && prev_rest_temp_dist < this.rest_dist) || curr_rest_temp_dist < this.rest_dist) {
            // Set position as rest_dist away from the pos1, with current direction
            let newPos = createVector(0, 0, 0);
            p5.Vector.sub(pos2, pos1, newPos);
            newPos.normalize();
            newPos.mult(this.rest_dist);
            pos2.set(pos1.x + newPos.x, pos1.y + newPos.y, pos1.z + newPos.z);
        }
    }

    Draw() {

        let strokeW = this.rest_dist / this.nodeA.pos.dist(this.nodeB.pos);

        push();
        rotateX(radians(ROTATION.x));
        rotateY(radians(ROTATION.y));
        rotateZ(radians(ROTATION.z));

        // strokeWeight(strokeW * strokeThickness);
        strokeWeight(strokeW * this.strokeThickness * ZOOM);
        stroke(this.col.x, this.col.y, this.col.z, 255);
        
        let zoomNodeA = p5.Vector.mult(this.nodeA.pos, ZOOM);
        let zoomNodeB = p5.Vector.mult(this.nodeB.pos, ZOOM);
        line(zoomNodeA.x, zoomNodeA.y, zoomNodeA.z, zoomNodeB.x, zoomNodeB.y, zoomNodeB.z);
        // line(nodeA.pos.x * ZOOM, nodeA.pos.y * ZOOM, nodeA.pos.z * ZOOM, nodeB.pos.x * ZOOM, nodeB.pos.y * ZOOM, nodeB.pos.z * ZOOM);
        // line(nodeA.pos.x, nodeA.pos.y, nodeA.pos.z, nodeB.pos.x, nodeB.pos.y, nodeB.pos.z);
        strokeWeight(1);
        pop();
    }
}