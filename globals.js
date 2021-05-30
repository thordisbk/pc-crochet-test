
// global variable and functions to initialize/reset them

var ROTATION;
var ZOOM;

function ResetRotZoom() {
    // reset rotation and zoom
    ROTATION.set(0, 0, 0);
    ZOOM = 1.0;
}

// canvas
let cnv;

// gui
let gui;

// 'true' uses the tests from testcased.pde, set to false when a model is generated via gui
let useTests;

let generatedReady;
let generatedCrochetModel;

let springColor;
let springNonColor;

// for visualization; how far to position vertices from each other
let stitchLengthMultiplier = 30;
let stitchWidthMultiplier = 30;

// size of sphere vertex representation
let sphereRadius = 5;
// thickness of yarn
let strokeThickness = 3.0;

// keyboard, set to false
let X_PRESSED;
let Y_PRESSED;
let Z_PRESSED;
let ARROW_KEY_PRESSED;

// for tests
let models;
let activeTestIdx;

function InitializeGlobals() {

    ROTATION = createVector(0.0, 0.0, 0.0);
    ZOOM = 1.0;
    recordingPDF = false;
    useTests = true;
    generatedReady = false;

    springColor = createVector(255, 0, 0);
    springNonColor = createVector(0, 255, 0);

    if (!DEBUG) {
        springColor = createVector(129, 113, 122);  // FIXME
        springNonColor = createVector(189, 179, 185);  // FIXME
        useTests = false;
    }

    X_PRESSED = false;
    Y_PRESSED = false;
    Z_PRESSED = false;
    ARROW_KEY_PRESSED = false;

    models = [];
    activeTestIdx = 0;
}