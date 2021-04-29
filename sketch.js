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


    createCanvas(WIDTH, HEIGHT, WEBGL);
    // createCanvas(600, 600, P3D);
    background(backgroundColor);
    // surface.setTitle("Generative Crochet");
    // surface.setResizable(true);
    // frameRate(30);
    // noCursor();

    if (useTests) {
        createTests();
    }
    else if (generatedReady) {
        // should not be the case at setup, unless an example were to be shown
    }

    // createGUI();
    // if (DEBUG) {
    //     createDebugGUI();
    // }
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

    if (recordingPDF) {
        // then somewhere a PDF recording was started
        // RecordToPDF();

        // endRaw();
        recordingPDF = false;
    }
}

/*function RecordToPDF() {

    let patternString = "";
    let approxRealSize = "? cm";
    if (useTests) {
        patternString = GetActiveTestPattern();
        approxRealSize = GetActiveTestApproximateRealSize();
    } else if (generatedReady) {
        let pattern = new Pattern(generatedCrochetStructure);
        patternString = pattern.patternStr;
        approxRealSize = generatedCrochetStructure.GetApproximateRealSize();
    }
    let formattedPattern = FormatPatternString(patternString);

    let pdfTitleStr = "Generated crochet";
    let dateStr = CreateDateString();
    let authorStr = "ÞBK";
    let realSize = "Approximate real size of crocheted object: " + approxRealSize;

    // make a PDF with the structure render
    displayTest();
    endRaw();
    // pdf_structure = null;

    // make a PDF with the pattern
    pdf.beginDraw();
    
    // pdf.background(200, 200, 200);

    pdf.fill(50);

    pdf.textSize(26);
    pdf.text(pdfTitleStr, 50, 50);

    pdf.textSize(6);
    pdf.text(realSize, 50, 80);
    
    pdf.textSize(6);
    pdf.text(dateStr, 500, 550);
    pdf.text(authorStr, 500, 570);
    
    pdf.textSize(12);
    pdf.text(formattedPattern, 50, 110);
    
    // pdf.nextPage();
    // draw structure on the next page

    pdf.dispose();
    pdf.endDraw();
    pdf = null;    
}*/

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
        console.log("key: " + key);
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
