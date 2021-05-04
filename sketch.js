// libraries
// import g4p_controls.*;
// import processing.pdf.*;
// import java.awt.Font;

// change active test by clicking 'n'
// hold 'x', 'y', or 'z' and push the up and down arrows to rotate
// reset rotation by clicking 'space'


function setup() {

    // init globals
    InitializeGlobals();

    // cnv = createCanvas(WIDTH, HEIGHT, WEBGL);
    cnv = createCanvas(windowWidth, windowHeight, WEBGL);
    // createCanvas(600, 600, P3D);
    background(backgroundColor);

    if (useTests) {
        createTests();
    }
    else if (generatedReady) {
        // should not be the case at setup, unless an example were to be shown
    }

    gui = new GUI();
    if (DEBUG) {
        // this.debuggui = newGUIdebug();
    }
}

function draw() {
    background(backgroundColor);
    
    if (DEBUG) {
        CheckKeysForRotation();
    }

    if (useTests && !recordingPDF) {
        displayTest();
    }
    else if (generatedReady && !recordingPDF) {
        generatedCrochetStructure.Draw();
    }

    gui.update();
}

function CheckKeysForRotation() {

    if (keyIsPressed == true && (X_PRESSED || Y_PRESSED || Z_PRESSED) && ARROW_KEY_PRESSED == true) {
        if (keyCode == UP_ARROW) {
            if (X_PRESSED) {
                ROTATION.x += 1.0 * rotMult;
            } else if (Y_PRESSED) {
                ROTATION.y += 1.0 * rotMult;
            } else if (Z_PRESSED) {
                ROTATION.z += 1.0 * rotMult;
            }
        } else if (keyCode == DOWN_ARROW) {
            if (X_PRESSED) {
                ROTATION.x -= 1.0 * rotMult;
            } else if (Y_PRESSED) {
                ROTATION.y -= 1.0 * rotMult;
            } else if (Z_PRESSED) {
                ROTATION.z -= 1.0 * rotMult;
            }
        }
    }
}

// function touchStarted() {
//     if (useTests) {
//         handleMouseActionTest(false);
//     }
//     else if (generatedReady) {

//     }
// }

// function touchEnded() {
//     if (useTests) {
//         handleMouseActionTest(true);
//     }
//     else if (generatedReady) {

//     }
// }

function keyPressed() {

    if (useTests) {
        handleKeyPressTest();
    }
    else if (generatedReady) {
        
    }

    if (DEBUG) {
        // reset rotation by clicking on the spacebar
        if (key == ' ') {
            ResetRotZoom();
        }

        if (key == 'x' || key == 'X') {
            X_PRESSED = true;
        } else if (key == 'y' || key == 'Y') {
            Y_PRESSED = true;
        } else if (key == 'z' || key == 'Z') {
            Z_PRESSED = true;
        }

        if (keyCode == UP_ARROW || keyCode == DOWN_ARROW || keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
            ARROW_KEY_PRESSED = true;
        }  
    }

    if (key == 'p' || key == 'P') {
        // create a PDF of the pattern of the currently active crochetStructure
        SavePatternPDFAndImageFile();
    }

    if (key == 'o' || key == 'O') {
        // activate springs for currently active structure
        // when the generated structure is ready
        let springsAreActive = false;
        if (!useTests && generatedReady) {
            generatedCrochetStructure.UpdatePreviousStitches(generatedCrochetStructure.rows.length-1, 
                generatedCrochetStructure.rows[generatedCrochetStructure.rows.length-1].count-1, 1000, true);
        } else {
            ActiveTestUpdatePreviousStitches();
        }
    }

    if (key == 'h' || key == 'H') {
        // show hide GUIs
        gui.showhide();
    }
}

function keyReleased() {

    if (DEBUG) {
        if (key == 'x' || key == 'X') {
            X_PRESSED = false;
        } else if (key == 'y' || key == 'Y') {
            Y_PRESSED = false;
        } else if (key == 'z' || key == 'Z') {
            Z_PRESSED = false;
        }

        if (keyCode == UP_ARROW || keyCode == DOWN_ARROW || keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
            ARROW_KEY_PRESSED = false;
        }
    }
}
