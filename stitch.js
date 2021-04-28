
class Stitch {
    // StitchTypes stitchType;
    // StitchDescription stitchDescription;

    // a stitch has one node
    // Node node;
    // a stitch can have up to two springs; this-ontoStitch and this-prevStitch
    // TODO can also have more ontoStitch-es if this is a decrease
    // Spring[] springs = new Spring[0]; 

    // Stitch prevStitch;  // the stitch that was made previous to this one
    // Stitch ontoStitch;  // the stitch into which this one is crocheted

    // Stitch nextStitch;  // the stitch that was crocheted after this one
    // Stitch[] childStitches = new Stitch[0];  // the stitches that have been crocheted into this one

    // // DECREASE is a different matter ...
    // //  it is still one stitch with one node, one prevStitch, one nextStitch, and can have child stitches
    // //  BUT it has multiple ontoStitches and therefore more springs
    // // Spring springWidth;
    // // Spring[] springsLengths = new Spring[0];  // TODO
    // // Stitch[] ontoStitches = new Stitch[0];  // hold ontoStitches of decrease stitches, except the first ontoStitch FIXME

    // let length;
    // let width;
    // let stitchColor;

    // let angle;  // how the current stitch is angled from its ontoStitch

    // up direction of the stitch, == (stitch.pos - stitch.ontoStitch.pos)
    //  use to set the initial position of any stitch made unto this stitch
    // let upVector = createVector(0, 0, 1);
    // forward direction of the stitch, == (stitch.pos - stitch.prevStitch.pos)
    //  use to set the initial position of any stitch made after this stitch
    // let forwardVector = createVector(0, 1, 0);

    Stitch() {
        // call for first stitch in a crochet structure
        // Init(StitchTypes.CH, StitchDescription.REGULAR, createVector(WIDTH/2, HEIGHT/2, 0), null, null);
        Init(StitchTypes.SLKN, StitchDescription.START, createVector(0, 0, 0), null, null);
    }
    
    Stitch(type) {
        // call for first stitch in a crochet structure (slip knot or magic ring)
        if (type != StitchTypes.SLKN && type != StitchTypes.MR) {
            return;
        }
        Init(type, StitchDescription.START, createVector(0, 0, 0), null, null);
    }

    Stitch(type, description, prev, onto) {
        // call for any stitch in a crochet structure, except the initial one
        let pos = createVector(0, 0, 0);
        Init(type, description, pos, prev, onto);
    }

    Stitch(type, prev, onto) {
        // call for any DEC stitch in a crochet structure
        if (onto.length < 2) {
            console.log("WARNING: this Stitch constructor needs to be provided at least two ontoStitches");
            return;
        }
        let pos = createVector(0, 0, 0);
        // call init using first ontoStitch
        Init(type, StitchDescription.DEC, pos, prev, onto[0]); 
        // then update values with rest of ontostitches
        let rest_dist_onto = this.length * stitchLengthMultiplier;  // TODO will there have to be different distances for stitches?
        for (let i = 1; i < onto.length; i++) {
            let currOnto = onto[i];
            if (currOnto == null) {
                console.log("WARNING: Stitch() received a null ontoStitch");
            } else if (currOnto == onto[i-1]) {
                console.log("WARNING: Stitch() received a decrease using same ontoStitch (false decrease)");
            }
            array.push(ontoStitches, currOnto);
            array.push(currOnto.childStitches, this);
            array.push(this.springs, new Spring(this.node, currOnto.node, rest_dist_onto, defDamp, defSpringConstant, springColor, false));
        }
    }
    
    Init(type, description, pos, prev, onto) {

        if (!ValidateStitch(type, prev, onto)) {
            console.log("WARNING: stitch is not valid (type = " + type + ", prev = " + prev + ", onto = " + onto);
            return;
        }

        // call for any stitch in a crohet structure, except the initial one
        this.stitchType = type;
        this.stitchDescription = description;
        this.prevStitch = prev;
        this.ontoStitch = onto;

        // let tempVal = 255/25;
        // stitchColor = createVector(colorIncrease * tempVal, colorIncrease * tempVal, colorIncrease * tempVal);
        // colorIncrease++;
        this.stitchColor = GetStitchColor();
        this.length = GetStitchLength();
        this.width = GetStitchWidth();

        let rest_dist_onto = this.length * stitchLengthMultiplier;
        let rest_dist_prev = this.width * stitchLengthMultiplier;

        if (prev == null && onto == null) {
            // then this is the very first stitch (CH or SLKN)
            this.node = new Node(sphereRadius, pos, defMass, this.stitchColor);  // (rad, position, mass, color)
        }
        else if (prev != null && onto != null) {
            // then this is a typical stitch
            this.node = new Node(sphereRadius, pos, defMass, this.stitchColor);  // (rad, position, mass, color)
            array.push(this.springs, new Spring(this.node, this.ontoStitch.node, rest_dist_onto, defDamp, defSpringConstant, springColor, false));
            array.push(this.springs, new Spring(this.node, this.prevStitch.node, rest_dist_prev, defDamp, defSpringConstant, springColor, false));
        }
        else if (prev == null) {
            console.log("WARNING::FIXME::Stitch(): (prev = null) but (onto != null)");  // TODO should not happen
            return;
        }
        else if (onto == null) {
            // then this is most likely a CH
            this.node = new Node(sphereRadius, pos, defMass, this.stitchColor);  // (rad, position, mass, color)
            array.push(this.springs, new Spring(this.node, this.prevStitch.node, rest_dist_prev, defDamp, defSpringConstant, springColor, false));
        }

        this.nextStitch = null;
        if (this.prevStitch != null) {
            this.prevStitch.nextStitch = this;
        }
        if (this.ontoStitch != null) {
            array.push(this.ontoStitch.childStitches, this);
        }
    }

    ValidateStitch(type, prev, onto) {

        if (type == StitchTypes.CH && onto != null) {
            // a CH cannot be made onto a stitch
            return false;
        } else if ((onto == null || prev == null) && (type == StitchTypes.SC || type == StitchTypes.HDC 
                    || type == StitchTypes.DC || type == StitchTypes.TR || type == StitchTypes.SLST)) {
            // stitches SC, HDC, DC, TR, and SLST have to have both an ontoStitch and a prevStitch
            return false;
        }
        // TODO more checks

        return true;
    }

    GetStitchLength() {
        if (this.stitchType == StitchTypes.CH)
            return 0.0;
        else if (this.stitchType == StitchTypes.SC)
            return 1.0;
        else if (this.stitchType == StitchTypes.HDC)
            return 1.5;
        else if (this.stitchType == StitchTypes.DC)
            return 2.0;
        else if (this.stitchType == StitchTypes.TR)
            return 3.0;
        else if (this.stitchType == StitchTypes.SLST)
            return 0.1;
        else if (this.stitchType == StitchTypes.SK)
            return 0.0;
        else if (this.stitchType == StitchTypes.SLKN)
            return 0.0;
        else if (this.stitchType == StitchTypes.MR)
            return 0.0;
        else if (this.stitchType == StitchTypes.NONE)
            return 0.0;
        
        return 0.0;
    }

    GetStitchWidth() {
        return 1.0;
    }

    GetStitchColor() {
        if (!useVertexStitchColors)
            return createVector(255, 255, 255);

        if (this.stitchType == StitchTypes.CH)
            return createVector(255, 0, 0);
        else if (this.stitchType == StitchTypes.SC)
            return createVector(0, 255, 0);
        else if (this.stitchType == StitchTypes.HDC)
            return createVector(0, 0, 255);
        else if (this.stitchType == StitchTypes.DC)
            return createVector(255, 255, 0);
        else if (this.stitchType == StitchTypes.TR)
            return createVector(255, 0, 255);
        else if (this.stitchType == StitchTypes.SLST)
            return createVector(0, 255, 255);
        else if (this.stitchType == StitchTypes.SK)
            return createVector(0, 0, 0);
        else if (this.stitchType == StitchTypes.SLKN)
            return createVector(255, 255, 255);
        else if (this.stitchType == StitchTypes.MR)
            return createVector(255, 255, 255);
        else if (this.stitchType == StitchTypes.NONE)
            return createVector(255, 255, 255);

        return createVector(255, 255, 255);
    }

    SetPosition(newPos) {
        // vertex0.position = newPos;
        this.node.pos = newPos;
    }

    GetPosition() {
        // return vertex0.position;
        return this.node.pos;
    }

    GetOriginStitch() {
        // returns the ontoStitch ancestor (the origin stitch for this stitch)
        let origin = null;
        if (this.ontoStitch != null) {
            origin = this.ontoStitch;
            while (origin.ontoStitch != null) {
                origin = origin.ontoStitch;
            }
        }
        return origin;
    }

    RecalculateVectors() {
        // recalcuate the up and forward vectors of this stitch and normalize them
        if (this.ontoStitch != null) {
            this.upVector = p5.Vector.sub(GetPosition(), this.ontoStitch.GetPosition());
            this.upVector.normalize();
            
            // if this stitch has children, its upvector becomes the vector from itself to the newest child
            // FIXME do not use for BACKANDFORTH: (childStitches.length > 0)
            // if (childStitches.length > 1) { 
            //     upVector = p5.Vector.sub(childStitches[childStitches.length-1].GetPosition(), GetPosition());
            //     upVector.normalize();
            // }

            // TODO what if there if there are multiple ontoStitches (case for DEC)
        }
        if (this.prevStitch != null) {
            this.forwardVector = p5.Vector.sub(GetPosition(), this.prevStitch.GetPosition());
            this.forwardVector.normalize();
        }
    }

    updateNode() {
        this.node.update();
    }

    updateSprings() {
        for (let s = 0; s < this.springs.length; s++) {
            s = this.springs[s];
            s.update();
        }
    }

    update() {
        this.node.update();
        for (let s = 0; s < this.springs.length; s++) {
            s = this.springs[s];
            s.update();
        }
    }

    SpringsActivateAll() {
        for (let s = 0; s < this.springs.length; s++) {
            s = this.springs[s];
            s.updatePositions = true;
        }
    }

    SpringsUpdateAll() {
        for (let s = 0; s < this.springs.length; s++) {
            s = this.springs[s];
            s.update();
        }
    }

    SpringsDeactivateAll() {
        for (let s = 0; s < this.springs.length; s++) {
            s = this.springs[s];
            s.updatePositions = false;
        }
    }

    Draw() {

        this.node.Draw();
        for (let s = 0; s < this.springs.length; s++) {
            s = this.springs[s];
            s.Draw();
        }
    }
}