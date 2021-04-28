
// collection of currently used globals
// TODO afunctionance

let ROTATION = createVector(0.0, 0.0, 0.0);
let ZOOM = 1.0;

function ResetRotZoom() {
    // reset rotation and zoom
    ROTATION.set(0, 0, 0);
    ZOOM = 1.0;
}

let recordingPDF = false;
// let pdf;  // enables use of nextPage function, but doesn't support raw 3D
// let pdf_structure;  // supports 3D, but has no nextPage function

// 'true' uses the tests from testcased.pde, set to false when a structure is generated via gui
let useTests = true;

let generatedReady = false;
let generatedCrochetStructure;

let colorIncrease = 0;

let defMass = 10.0;
// Damping simulates energy loss, and it is used in physics simulations to make sure 
//  that springs don’t oscillate forever but come to rest over time.
let defDamp = 0.9;
// k is a constant describing the tightness of the spring. 
//  Larger values of k mean that the spring is tighter and will therefore stretch less per unit of force, 
//  smaller values mean the spring is looser and will stretch further.
let defSpringConstant = 0.05;
let springColor = createVector(255, 0, 0);
