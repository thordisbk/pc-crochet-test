
class Row {
    // Stitch[] stitches = new Stitch[0];
    // let count = 0;
    // CrochetType crochetType;

    constructor(newStitches, ct) {
        this.stitches = newStitches;
        this.count = newStitches.length;
        this.crochetType = ct;

        // this.count = 0;
        // for (Stitch stitch : newStitches) {
        //     if (stitch.stitchType != StitchTypes.SLST && stitch.stitchType != StitchTypes.SK && stitch.stitchType != StitchTypes.NONE) {
        //         this.count++;
        //     }
        // }

        // TODO decide if to use, maybe use SLST instead
        if (this.crochetType == CrochetType.CIRCULAR && (this.count > 1 && connectStartEndStitches)) {
            if (VERBOSE) console.log("Row::Row connect start stitch to last row's end stitch\n");
            let lastStitch = this.stitches[this.count - 1];
            // console.log("lastStitch = " + lastStitch);
            let firstStitch = this.stitches[0];
            if (VERBOSE) console.log("Row::Row lastStitch =", lastStitch.stitchType, " | firstStitch =", firstStitch.stitchType, "\n");
            // make a green edge/spring that connects the lastStitch to the firstStitch, but does no update like a spring
            
            // check if first stitch is a slip knot and rest is only CH, if so connect lastStitch to 2nd stitch instead of the 1st
            let firstIsSLKN = firstStitch.stitchType == StitchTypes.SLKN;
            let restIsCH = true;
            if (firstIsSLKN) {
                for (let i = 1; i < this.count; i++) {
                    if (this.stitches[i].stitchType != StitchTypes.CH) {
                        restIsCH = false;
                    }
                }
            }
            
            if (firstIsSLKN && restIsCH) {
                if (firstStitch.nextStitch != null && firstStitch.nextStitch.node != lastStitch.node) {
                    lastStitch.springs.push(new Spring(lastStitch.node, firstStitch.nextStitch.node, 
                                    lastStitch.width * stitchLengthMultiplier, defDamp, defSpringConstant, 
                                    createVector(0, 255, 0), true));  // notASpring = true as this edge should not be a spring
                }
            } else {
                // if not only CH, connect lastStitch to first stitch
                lastStitch.springs.push(new Spring(lastStitch.node, firstStitch.node, 
                                    lastStitch.width * stitchLengthMultiplier, defDamp, defSpringConstant, 
                                    createVector(0, 255, 0), true));  // notASpring = true as this edge should not be a spring
            }


            // springs.push(new Spring(node, prevStitch.node, rest_dist_prev, defDamp, defSpringConstant));
        }
        /*else if (this.crochetType == CrochetType.BACKFORTH && (this.count > 1 && connectStartEndStitches && this.stitches[0].prevStitch != null)) {
            if (VERBOSE) console.log("Row::Row connect start stitch to last row's end stitch\n");
            Stitch firstStitchCurr = this.stitches[0];
            Stitch lastStitchPrev = firstStitchCurr.prevStitch;
            if (VERBOSE) console.log("Row::Row lastStitch =", lastStitchPrev.stitchType, " | firstStitch =", firstStitchCurr.stitchType, "\n");
            // firstStitchCurr.edges.push(new Edge(lastStitchPrev.vertices[0], firstStitchCurr.vertices[0], false));
            firstStitchCurr.edges.push(new Edge(lastStitchPrev.vertex0, firstStitchCurr.vertex0, false));
        }*/
    }

    GetRowCircumferenceActual(isConnected) {
        // find the actual circumference
        let actualCircumference = 0;  // the sum of the length of the connecting edges in the row
        
        for (let i = 1; i < this.count; i++) {
            let pos1 = this.stitches[i-1].GetPosition();
            let pos2 = this.stitches[i].GetPosition();
            actualCircumference += pos1.dist(pos2) / stitchLengthMultiplier;
        }
        if (isConnected) {
            // if the row is connected, e.g. crochet is circular,
            //  then also use distance between last stitch and the first
            let pos1 = this.stitches[0].GetPosition();
            let pos2 = this.stitches[this.count-1].GetPosition();
            actualCircumference += pos1.dist(pos2) / stitchLengthMultiplier;
        }

        return actualCircumference;
    }

    GetRowCircumferenceDesired() {
        // find the desired circumference, which is the combined width of all this.stitches
        let desiredCircumference = 0;  // this.count * stitchWidth * stitchLengthMultiplier;
        
        for (let i = 0; i < this.count; i++) {
            desiredCircumference += this.stitches[i].width;
        }

        return desiredCircumference;
    }

    AllStitchesAreTheSameType(type) {
        for (let s = 0; s < this.count; s++) {
            let stitch = this.stitches[s];
            if (stitch.stitchType != type) {
                return false;
            }
        }
        return true;
    }

    FixVectorsInRow() {
        for (let s = 0; s < this.count; s++) {
            let stitch = this.stitches[s];
            stitch.RecalculateVectors();
        }
    }

    IsStitchInRow(testStitch) {
        for (let s = 0; s < this.count; s++) {
            let stitch = this.stitches[s];
            if (stitch == testStitch) {
                return true;
            }
        } 
        return false;
    }

    UpdateSpringsInRow() {
        // activate updating of all springs of the stitches in the row, then deactivate it
        for (let s = 0; s < this.count; s++) {
            let stitch = this.stitches[s];
            for (let e = 0; e < stitch.springs.length; e++) {
                stitch.springs[e].updatePositions = true;
                stitch.springs[e].update();
            }
            for (let e = 0; e < stitch.springs.length; e++) {
                stitch.springs[e].updatePositions = false;
            }
        }
    }

    UpdateSpringLengthsInRow() {
        // activate stitch length springs in row
        for (let s = 0; s < this.count; s++) {
            let stitch = this.stitches[s];
            if (stitch.ontoStitch != null && stitch.prevStitch != null) {
                // springs[0] is length, springs[1] is width
                stitch.springs[0].updatePositions = true;
                stitch.springs[0].update();
            } else if (stitch.ontoStitch == null) {
                // there is only springs[0] which is width
            } else {
                // nothing
            }
        }
        // deactivate stitch length springs in row
        for (let s = 0; s < this.count; s++) {
            let stitch = this.stitches[s];
            if (stitch.ontoStitch != null && stitch.prevStitch != null) {
                // springs[0] is length, springs[1] is width
                stitch.springs[0].updatePositions = false;
            } else if (stitch.ontoStitch == null) {
                // there is only springs[0] which is width
            } else {
                // nothing
            }
        }
    }

    UpdateSpringWidthsInRow() {
        // activate stitch width springs in row
        for (let s = 0; s < this.count; s++) {
            let stitch = this.stitches[s];
            if (stitch.ontoStitch != null && stitch.prevStitch != null) {
                // springs[0] is length, springs[1] is width
                stitch.springs[1].updatePositions = true;
                stitch.springs[1].update();
            } else if (stitch.ontoStitch == null) {
                // there is only springs[0] which is width
                stitch.springs[0].updatePositions = true;
                stitch.springs[0].update();
            } else {
                // nothing
            }
        }
        // deactivate stitch width springs in row
        for (let s = 0; s < this.count; s++) {
            let stitch = this.stitches[s];
            if (stitch.ontoStitch != null && stitch.prevStitch != null) {
                // springs[0] is length, springs[1] is width
                stitch.springs[1].updatePositions = false;
            } else if (stitch.ontoStitch == null) {
                // there is only springs[0] which is width
                stitch.springs[0].updatePositions = false;
            } else {
                // nothing
            }
        }
    }

    Draw() {
        for (let s = 0; s < this.count; s++) {
            this.stitches[s].Draw();
        }
    }
}
