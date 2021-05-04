

var yarn_weight = YARN_WEIGHTS;
var hook_size = HOOK_SIZES;
// var colortest = "#00ddff";

var use_measure_gauge = true;
var use_standard_gauge = true;
var input_length_rows = "10";
var input_width_rows = "10";

var stitch_type_to_use = ["SC"]; // STITCH_TYPES;
var stitches_in_first_row = 0;
var min_stitches_in_a_row = 0;
var max_stitches_in_a_row = 0;
var min_number_of_rows = 0;
var max_number_of_rows = 0;
var crochet_type_to_make = ["CIRCULAR"]; //["CIRCULAR", "BACKFORTH", "C2C"];

var pdf_file_name = "pattern";
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
        use_measure_gauge = false;

        gui_gen = this.createGUIparam();
        gui_pattern = this.createGUIpattern();
        gui_zoomrot = this.createGUIzoomrotate();

        // TODO test gui and hide/show
        this.visible = true;
    }

    createGUIgenGauge(gauge) {
        let gui = createGui('Generation gauge (' + gauge + ')').setPosition(10, 10);

        if (gauge == 'standard') {
            gui.addGlobals('hook_size', 'yarn_weight');
            gui.addButton('use_measure_gauge', function() {
                gaugeChange();
            });
        }
        else if (gauge == 'measure') {
            gui.addGlobals('input_length_rows', 'input_width_rows');
            gui.addButton('use_standard_gauge', function() {
                gaugeChange();
            });
        }
        else {
            console.error("GUI() incorrect gauge string provided");
        }
        return gui;
    }

    createGUIparam() {
        let gui = createGui('Generation parameters').setPosition(10, 200);
        gui.addGlobals('stitch_type_to_use');
        sliderRange(0, 10, 1);
        gui.addGlobals('stitches_in_first_row');
        sliderRange(0, 50, 1);
        gui.addGlobals('min_number_of_rows', 'max_number_of_rows');
        sliderRange(0, 300, 1);
        gui.addGlobals('min_stitches_in_a_row', 'max_stitches_in_a_row');
        gui.addGlobals('crochet_type_to_make');
        gui.addButton("GENERATE", function() {
            generateUsingInput();
        });
        return gui;
    }

    createGUIpattern() {
        let gui = createGui('Get pattern').setPosition(width - 210, 10);
        gui.addGlobals('pdf_file_name', 'approximate_real_size');
        gui.addButton("Download pattern & image", function() {
            SavePatternPDFAndImageFile(pdf_file_name);
        });
        return gui;
    }

    createGUIzoomrotate() {
        let gui = createGui('Zoom & Rotate').setPosition(width - 210, 200);
        sliderRange(0.1, 10, 0.1);
        gui.addGlobals('zoom');
        sliderRange(-180.0, 180, 0.1);
        gui.addGlobals('rot_x', 'rot_y', 'rot_z');
        gui.addButton("Reset", function() {
            resetZoomRotGUI();
        });
        return gui;
    }

    showhide() {
        if (this.visible) {
            gui_gen_standard.hide();
            gui_gen_measure.hide();
            gui_gen.hide();
            gui_pattern.hide();
            gui_zoomrot.hide();
            this.visible = false;
        } else {
            if (use_standard_gauge) gui_gen_standard.show();
            if (use_measure_gauge) gui_gen_measure.show();
            gui_gen.show();
            gui_pattern.show();
            gui_zoomrot.show();
            this.visible = true;
        }
    }

    update() {
        // update values
        if (useTests && !generatedReady) {
            approximate_real_size = GetActiveTestApproximateRealSize();
            gui_pattern.prototype.setValue('approximate_real_size', GetActiveTestApproximateRealSize());
        }

        // if they have been changed by gui
        ZOOM = zoom;
        ROTATION.set(rot_x, rot_y, rot_z);
    }
}

function generateUsingInput() {
    noLoop();

    if (DEBUG) {
        console.log("generate crochet structure");
        console.log("use_measure_gauge = " + use_measure_gauge + " | use_standard_gauge = " + use_standard_gauge);
        console.log("crochet: " + crochet_type_to_make);
        console.log("input_width_rows: " + input_width_rows);
        console.log("input_length_rows: " + input_length_rows);
        console.log("hook_size: " + hook_size);
        console.log("yarn_weight: " + yarn_weight);
        console.log("min_number_of_rows: " + min_number_of_rows);
        console.log("max_number_of_rows: " + max_number_of_rows);
        console.log("min_stitches_in_a_row: " + min_stitches_in_a_row);
        console.log("max_stitches_in_a_row: " + max_stitches_in_a_row);
        console.log("stitches_in_first_row: " + stitches_in_first_row);
        console.log("stitch_type_to_use: " + stitch_type_to_use);
    }

    if (use_measure_gauge === true ) {
        generatedCrochetStructure = new CrochetStructure(crochet_type_to_make, input_width_rows, input_length_rows);
    }
    else if (use_standard_gauge === true) {
        generatedCrochetStructure = new CrochetStructure(crochet_type_to_make, hook_size, yarn_weight);
    }
    let stitch_type = GetStitchTypesKeyByValue(stitch_type_to_use);
    let ok = generatedCrochetStructure.GenerateRestrained(min_number_of_rows, max_number_of_rows, 
        min_stitches_in_a_row, max_stitches_in_a_row, stitches_in_first_row, true, false, true, stitch_type);

    if (ok === false) {
        console.error("generateUsingInput() something went wrong while generating structure");
        return;
    }

    generatedReady = true;
    useTests = false;

    let approxRealSize = generatedCrochetStructure.GetApproximateRealSize();
    approximate_real_size = approxRealSize;
    gui_pattern.prototype.setValue('approximate_real_size', approxRealSize);

    loop();
}

function gaugeChange() {
    console.log("change gauge");
    console.log("BEFORE: use_measure_gauge = " + use_measure_gauge + " | use_standard_gauge = " + use_standard_gauge);
    use_measure_gauge = !use_measure_gauge;
    use_standard_gauge = !use_standard_gauge;
    if (use_measure_gauge === true || use_standard_gauge === false) {
        gui_gen_measure.show();
        gui_gen_standard.hide();
    } 
    else if (use_standard_gauge === true || use_measure_gauge === false) {
        gui_gen_measure.hide();
        gui_gen_standard.show();
    }
    console.log("AFTER: use_measure_gauge = " + use_measure_gauge + " | use_standard_gauge = " + use_standard_gauge);
}

function resetZoomRotGUI() {
    gui_zoomrot.prototype.setValue('zoom', 1.0);
    gui_zoomrot.prototype.setValue('rot_x', 0.0);
    gui_zoomrot.prototype.setValue('rot_y', 0.0);
    gui_zoomrot.prototype.setValue('rot_z', 0.0);
}
