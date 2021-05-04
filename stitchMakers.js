// functions for creating different stitches
// they use the current row and return it modified

// single stitch, increase, decrease, ...
// TODO
// skip stitch: CH 1, skip ontoStitch and make SC/HDC/DC/TR in ontoStitch.nextStitch
// picot: CH 3, SLST into 2nd CH from hook
// etc ...

function InitStitchSingle(rowStitches, prevStitch, ontoStitch, type) {
    let currStitch = new Stitch(type, StitchDescription.REGULAR, prevStitch, ontoStitch);
    rowStitches.push(currStitch);
    return rowStitches;
}

function InitStitchInc(rowStitches, prevStitch, ontoStitch, type) {    
    // use to make a normal stitch INCREASE of 2 stitches
    let currStitch1 = new Stitch(type, StitchDescription.INC, prevStitch, ontoStitch);
    let currStitch2 = new Stitch(type, StitchDescription.INC, currStitch1, ontoStitch);
    rowStitches.push(currStitch1);
    rowStitches.push(currStitch2);
    return rowStitches;
}

function InitStitchIncNum(rowStitches, prevStitch, ontoStitch, type, incs) {    
    // stitch increase of "incs" stitches
    let prev = prevStitch;
    for (let i = 0; i < incs; i++) {
        let currStitch = new Stitch(type, StitchDescription.INC, prev, ontoStitch); 
        rowStitches.push(currStitch);
        prev = currStitch;
    }
    return rowStitches;
}

function InitStitchDec(rowStitches, prevStitch, ontoStitch1, ontoStitch2, type) {
    // use to make a normal stitch DECREASE of 2 stitches
    let ontoStitches = [ontoStitch1, ontoStitch2];
    let currStitch = new Stitch(type, prevStitch, ontoStitches); 
    rowStitches.push(currStitch);
    return rowStitches;
}

function InitStitchDecNum(rowStitches, prevStitch, ontoStitches, type) {
    // use the make a stitch decrease into the stitches in the list ontoStitches
    let currStitch = new Stitch(type, prevStitch, ontoStitches); 
    rowStitches.push(currStitch);
    return rowStitches;
}
