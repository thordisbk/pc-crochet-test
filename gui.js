

var yarn_weight = YARN_WEIGHTS;
var hook_size = HOOK_SIZES;
var pdfname = "pattern.pdf";
var booltest = true;
var colortest = "#00ddff";
var inttest = 20;
var floattest = 1.24;
var approxRealSize = "Approximate real size: ? cm";

var use_measure = false;
var use_standard = true;
var input_length_rows = "10";
var input_width_rows = "10";

var stitch_type = ["SC"]; // STITCH_TYPES;
var first_row_stitches = "0";
var min_stitches = "0";
var max_stitches = "0";
var min_rows = "0";
var max_rows = "0";
var crochet_type = ["CIRCULAR"]; //["CIRCULAR", "BACKFORTH", "C2C"];

var pdfname = "pattern";
var approximate_real_size = "? cm";

var zoom = 1.0;
var rot_x = 0.0;
var rot_y = 0.0;
var rot_z = 0.0;

let gui_gen_standard;
let gui_gen_measure;
let gui_gen;
let gui_pattern;
let gui_zoomrot;

class GUI {

    // gui for:
    // generation using standard
    // generation using gauge
    // zoom, rotate
    // pdf, image, show approx. size
    // debug
    constructor(debug = false) {
        // Create GUI

        // 
        colorMode(RGB);  // HSB
        gui_gen_standard = this.createGUIgenGauge('standard');
        gui_gen_measure = this.createGUIgenGauge('measure');
        gui_gen_measure.hide();

        gui_gen = this.createGUIparam();
        gui_pattern = this.createGUIpattern();
        gui_zoomrot = this.createGUIzoomrotate();
    }

    createGUIgenGauge(gauge) {
        let gui = createGui('Generation gauge').setPosition(10, 10);

        if (gauge == 'standard') {
            // gui.addCheckBoxWithCallback('use_standard', use_standard, function() {
            //     gaugeChange();
            // });
            gui.addButton('use_standard', function() {
                gaugeChange();
            });
            gui.addGlobals('hook_size', 'yarn_weight');
        }
        else if (gauge == 'measure') {
            // gui.addCheckBoxWithCallback('use_measure', use_measure, function() {
            //     gaugeChange();
            // });
            gui.addButton('use_measure', function() {
                gaugeChange();
            });
            gui.addGlobals('input_length_rows', 'input_width_rows');
        }
        else {
            console.log("ERROR:GUI() incorrect gauge string provided");
        }

        // sliderRange(0, 50, 1);
        // liderRange(0, 10, 0.1);
        return gui;
    }

    createGUIparam() {
        let gui = createGui('Generation parameters').setPosition(10, 200);
        gui.addGlobals('stitch_type');
        gui.addGlobals('first_row_stitches', 'min_stitches', 'max_stitches', 'min_rows', 'max_rows');
        gui.addGlobals('crochet_type');
        gui.addButton("GENERATE", function() {
            generateUsingInput();
        });
        return gui;
    }

    createGUIpattern() {
        let gui = createGui('Get pattern').setPosition(width - 200, 10);
        gui.addGlobals('pdfname', 'approximate_real_size');
        gui.addButton("Download pattern & image", function() {
            SavePatternPDFAndImageFile(pdfname);
        });
        return gui;
    }

    createGUIzoomrotate() {
        let gui = createGui('Zoom & Rotate').setPosition(width - 200, 200);
        sliderRange(0.1, 10, 0.1);
        gui.addGlobals('zoom');
        sliderRange(-180.0, 180, 0.1);
        gui.addGlobals('rot_x', 'rot_y', 'rot_z');
        gui.addButton("Reset", function() {
            resetZoomRotGUI();
        });
        return gui;
    }
}

function generateUsingInput() {
    console.log("randomize called");
    // gui.setRangeValue('numShapes', random(0, 100));

    generatedCrochetStructure = new CrochetStructure(type, rowWidth, rowLength);
}

function gaugeChange() {
    console.log("change gauge");
    console.log("BEFORE: use_measure = " + use_measure + " | use_standard = " + use_standard);
    use_measure = !use_measure;
    use_standard = !use_standard;
    if (use_measure === true || use_standard === false) {
        gui_gen_measure.show();
        gui_gen_standard.hide();
    } 
    else if (use_standard === true || use_measure === false) {
        gui_gen_measure.hide();
        gui_gen_standard.show();
    }
    console.log("AFTER: use_measure = " + use_measure + " | use_standard = " + use_standard);
}

function resetZoomRotGUI() {
    // TODO
}