// classes for Vertex and Edge

class Vertex {

    Vertex(pos, col) {
        this.position = pos;
        this.colorV = col;
    }

    Draw() {
        if (VERBOSE) console.log("Vertex::Draw at", position, "\n");

        lights();
        noStroke();
        
        push();
        rotateX(radians(ROTATION.x));
        rotateY(radians(ROTATION.y));
        rotateZ(radians(ROTATION.z));

        fill(colorV.x, colorV.y, colorV.z);
        translate(position.x, position.y, position.z);
        sphere(sphereRadius);
        pop();
    }
}

class Edge {
 
    Edge(one, two, stitchEdge) {
        this.start = one;
        this.end = two;
        this.isStitchEdge = stitchEdge;
    }

    Draw() {
        let pos1 = this.start.position;
        let pos2 = this.end.position;
        
        push();
        rotateX(radians(ROTATION.x));
        rotateY(radians(ROTATION.y));
        rotateZ(radians(ROTATION.z));

        if (this.isStitchEdge) 
            stroke(0);
        else
            stroke(255, 0, 0, 255);

        line(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z);
        pop();
    }
}
