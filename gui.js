

var yarn_weight = YARN_WEIGHTS;
var hook_size = HOOK_SIZES;
// var colortest = "#00ddff";

var use_measure_gauge = true;
var use_standard_gauge = true;
var input_length_rows_cm = "10";
var input_width_rows_cm = "10";

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
let gui_springs;

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

        // gui_gen_measure.hide();
        // use_measure_gauge = false;

        gui_gen_standard.hide();
        use_standard_gauge = false;

        gui_gen = this.createGUIparam();
        gui_pattern = this.createGUIpattern();
        gui_zoomrot = this.createGUIzoomrotate();
        gui_springs = this.createGUIsprings();

        // TODO test gui and hide/show
        this.visible = true;
    }

    createGUIgenGauge(gauge) {
        let gui = createGui('Generation gauge (' + gauge + ')').setPosition(10, 10);

        if (gauge == 'standard') {
            gui.addGlobals('hook_size', 'yarn_weight');
            gui.addButton('Use measure gauge instead', function() {
                gaugeChange();
            });
        }
        else if (gauge == 'measure') {
            gui.addGlobals('input_length_rows_cm', 'input_width_rows_cm');
            gui.addButton('Use standard gauge instead', function() {
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
        sliderRange(0, MAXSTITCHESROW1, 1);
        gui.addGlobals('stitches_in_first_row');
        sliderRange(0, MAXROWS, 1);
        gui.addGlobals('min_number_of_rows', 'max_number_of_rows');
        sliderRange(0, MAXSTITCHES, 1);
        gui.addGlobals('min_stitches_in_a_row', 'max_stitches_in_a_row');
        gui.addGlobals('crochet_type_to_make');
        gui.addButton("Generate", function() {
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

    createGUIsprings() {
        let gui = createGui('Adjust structure').setPosition(width - 210, 485);
        gui.addButton("Activate springs", function() {
            ActivateSpringsButton();
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
            gui_springs.hide();
            this.visible = false;
        } else {
            if (use_standard_gauge) gui_gen_standard.show();
            if (use_measure_gauge) gui_gen_measure.show();
            gui_gen.show();
            gui_pattern.show();
            gui_zoomrot.show();
            gui_springs.show();
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

function ActivateSpringsButton() {
    if (!generatedReady) {
        return;
    }

    UpdateSpringsOfActiveStructure();
    // find new approximate size
    let approxRealSize = generatedCrochetStructure.GetApproximateRealSize();
    approximate_real_size = approxRealSize;
    gui_pattern.prototype.setValue('approximate_real_size', approxRealSize);
}

function generateUsingInput() {
    noLoop();

    if (DEBUG) {
        console.log("generate crochet structure"
         + "\nuse_measure_gauge = " + use_measure_gauge + " | use_standard_gauge = " + use_standard_gauge
         + "\ncrochet: " + crochet_type_to_make
         + "\ninput_width_rows_cm: " + input_width_rows_cm
         + "\ninput_length_rows_cm: " + input_length_rows_cm
         + "\nhook_size: " + hook_size
         + "\nyarn_weight: " + yarn_weight
         + "\nmin_number_of_rows: " + min_number_of_rows
         + "\nmax_number_of_rows: " + max_number_of_rows
         + "\nmin_stitches_in_a_row: " + min_stitches_in_a_row
         + "\nmax_stitches_in_a_row: " + max_stitches_in_a_row
         + "\nstitches_in_first_row: " + stitches_in_first_row
         + "\nstitch_type_to_use: " + stitch_type_to_use);
    }

    if (use_measure_gauge === true ) {
        generatedCrochetStructure = new CrochetStructure(crochet_type_to_make, input_width_rows_cm, input_length_rows_cm);
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
}

function resetZoomRotGUI() {
    gui_zoomrot.prototype.setValue('zoom', 1.0);
    gui_zoomrot.prototype.setValue('rot_x', 0.0);
    gui_zoomrot.prototype.setValue('rot_y', 0.0);
    gui_zoomrot.prototype.setValue('rot_z', 0.0);
}
