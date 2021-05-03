// Generated with help from the tool "G4P GUI builder"

/*
// TODO for generation
// radio buttons to specify CIRCULAR or BACKANDFORTH or random
// input fields for max rows, starting stitches, max stitches, etc.

function slider_zoom(GSlider source, GEvent event) {
    console.log(("zoom - GSlider >> GEvent." + event + " @ " + millis());

    // TODO implement zoom
    ZOOM = s_zoom.getValueF();
}

function slider_rotx(GSlider source, GEvent event) { 
    console.log(("x - GSlider >> GEvent." + event + " @ " + millis());

    ROTATION.x = s_x.getValueF();
} 

function slider_roty(GSlider source, GEvent event) { 
    console.log(("y - GSlider >> GEvent." + event + " @ " + millis());

    ROTATION.y = s_y.getValueF();
} 

function slider_rotz(GSlider source, GEvent event) { 
    console.log(("z - GSlider >> GEvent." + event + " @ " + millis());

    ROTATION.z = s_z.getValueF();
} 

function button_reset(GButton source, GEvent event) { 
    console.log(("b_reset - GButton >> GEvent." + event + " @ " + millis());

    s_zoom.setValue(1.0);
    s_x.setValue((s_x.getStartLimit() + s_x.getEndLimit()) / 2.0);
    s_y.setValue((s_y.getStartLimit() + s_y.getEndLimit()) / 2.0);
    s_z.setValue((s_z.getStartLimit() + s_z.getEndLimit()) / 2.0);
    // calling setValue() also calls the event handlers for the sliders
    ResetRotZoom();
} 

function button_generate(GButton source, GEvent event) { 
    console.log(("b_generate - GButton >> GEvent." + event + " @ " + millis());

    CrochetType type = CrochetType.CIRCULAR;  // TODO
    // TODO initial stitch amount, max rows, etc
    
    if (o_gaugemeasure.isSelected()) {
        if (!islet(t_rowlength.getText()) || !islet(t_rowwidth.getText())) {
            console.warn(("button_generate() row width and length must be let or let");
            return;
        }
        let rowWidth = let.parselet(t_rowwidth.getText());
        let rowLength = let.parselet(t_rowlength.getText());
        generatedCrochetStructure = new CrochetStructure(type, rowWidth, rowLength);
        console.log((" Generate crochet structure from measure");
    } else if (o_gaugestandard.isSelected()) {
        let hookSize = dl_hooksize.getSelectedText();
        let yarnWeight = dl_yarnweight.getSelectedText();
        // TODO parse and hookSize and yarnWeight to let and enum
        generatedCrochetStructure = new CrochetStructure(type, 5.5, YarnWeight.MEDIUM);
        console.log((" Generate crochet structure with standard");
    }

    boolean sameStitch = true;  // FIXME
    let str_sType = dl_stitchtypes.getSelectedText();
    console.log(("stitch type chosen: " + str_sType);
    // parse stitchType to enum
    StitchTypes sType = StitchTypes.SC;
    if (str_sType === "SC") {
        sType = StitchTypes.SC;
    } else if (str_sType === "HDC") {
        sType = StitchTypes.HDC;
    } else if (str_sType === "DC") {
        sType = StitchTypes.DC;
    } else if (str_sType === "TR") {
        sType = StitchTypes.TR;
    } 

    // extract other generation values
    let str_numStitchesFirstRow = t_numstitchesrow1.getText(); 
    console.log(("test:: str_numStitchesFirstRow = " + str_numStitchesFirstRow);
    let numStitchesFirstRow = 5;
    if (isleteger(str_numStitchesFirstRow) && str_numStitchesFirstRow != "0") {
        numStitchesFirstRow = leteger.parselet(str_numStitchesFirstRow);
    }
    let str_minRows = t_minnumrows.getText(); 
    let minRows = 0;
    if (isleteger(str_minRows) && str_minRows != "0") {
        minRows = leteger.parselet(str_minRows);
    }
    let str_maxRows = t_maxnumrows.getText(); 
    let maxRows = MAX_let;
    if (isleteger(str_maxRows) && str_maxRows != "0") {
        maxRows = leteger.parselet(str_maxRows);
    }
    let str_minStitches = t_minnumstitches.getText(); 
    let minStitches = 1;
    if (isleteger(str_minStitches) && str_minStitches != "0") {
        minStitches = leteger.parselet(str_minStitches);
    }
    let str_maxStitches = t_maxnumstitches.getText(); 
    let maxStitches = MAX_let;
    if (isleteger(str_maxStitches) && str_maxStitches != "0") {
        maxStitches = leteger.parselet(str_maxStitches);
    }

    boolean canBeBAF = c_backandforth.isSelected(); 
    boolean canBeCirc = c_circular.isSelected(); 

    // supply parameters to GenerateRestrained()
    boolean ok = generatedCrochetStructure.GenerateRestrained(minRows, maxRows, minStitches, maxStitches, numStitchesFirstRow, canBeCirc, canBeBAF, sameStitch, sType);
    // generatedCrochetStructure.Generate();
    
    if (!ok) {
        console.error(("button_generate(): something went wrong while generating structure");
        return;
    }

    generatedReady = true;
    useTests = false;

    let approxRealSize = generatedCrochetStructure.GetApproximateRealSize();
    // console.log(("Approximate real size: " + approxRealSize);
    l_realsizecm.setText(approxRealSize);

    // update debug values 
    if (DEBUG) {
        button_nexttest(null, null);
    }
}

function button_export(GButton source, GEvent event) { 
    console.log(("b_export - GButton >> GEvent." + event + " @ " + millis());

    if (recordingPDF) {
        return;
    }

    let filename = t_pdfname.getText().trim();
    if (filename === "") {
        t_pdfname.setText("pattern");
        filename = "pattern";
        console.log(("Textfield empty! Set to: pattern.");
    }
    filename += ".pdf";
    console.log(("Export PDF with name: " + filename);

    // starts 
    recordingPDF = true;
    if (DEBUG) {
        pdf = (PGraphicsPDF) createGraphics(620, 877, PDF, "frame" + frameCount + "_" + filename);  // A4: 620/877
        // pdf_structure = 
        beginRaw(PDF, "frame" + frameCount + "_" + "structure" + "_" + filename);
        // beginRaw(PDF, "frame-####.pdf");
    } else { 
        pdf = (PGraphicsPDF) createGraphics(620, 877, PDF, filename);
        beginRaw(PDF, filename);
    }
} 

function textfield_pdfname(GTextField source, GEvent event) { 
    console.log(("t_pdfname - GTextField >> GEvent." + event + " @ " + millis());
} 

function option_gaugestandard(GOption source, GEvent event) { 
    console.log(("o_gaugestandard - GOption >> GEvent." + event + " @ " + millis());

    if (event == GEvent.SELECTED) {
        console.log(("Gauge option selected: Standard");
        SetVisibilityOfGauge_Standard(true);
        SetVisibilityOfGauge_Measure(false);
    }
} 

function option_gaugemeasure(GOption source, GEvent event) { 
    console.log(("o_gaugemeasure - GOption >> GEvent." + event + " @ " + millis());
    
    if (event == GEvent.SELECTED) {
        console.log(("Gauge option selected: Measure");
        SetVisibilityOfGauge_Standard(false);
        SetVisibilityOfGauge_Measure(true);
    }
} 

function dropList_yarnweight(GDropList source, GEvent event) { 
    console.log(("dl_yarnweight - GDropList >> GEvent." + event + " @ " + millis());
}

function dropList_hooksize(GDropList source, GEvent event) { 
    console.log(("dl_hooksize - GDropList >> GEvent." + event + " @ " + millis());
} 

function textfield_rowlength(GTextField source, GEvent event) { 
    console.log(("t_rowlength - GTextField >> GEvent." + event + " @ " + millis());
} 

function textfield_rowwidth(GTextField source, GEvent event) { 
    console.log(("t_rowwidth - GTextField >> GEvent." + event + " @ " + millis());
} 

function checkbox_samestitch(GCheckbox source, GEvent event) {
    console.log(("cb_samestitch - GCheckbox >> GEvent." + event + " @ " + millis());
} 

function dropList_stitchtypes(GDropList source, GEvent event) { 
    console.log(("dl_stitchtypes - GDropList >> GEvent." + event + " @ " + millis());
} 

function checkbox_hidegui(GCheckbox source, GEvent event) {
    console.log(("cb_hidegui - GCheckbox >> GEvent." + event + " @ " + millis());

    if (event == GEvent.SELECTED) {
        // hide all elements except this one
        SetVisibilityOfGUI(false);
    }
    else if (event == GEvent.DESELECTED) {
        // show all elements
        SetVisibilityOfGUI(true);
    }
}

function tf_numstitchesrow1(GTextField source, GEvent event) { 
    console.log(("textfield1 - GTextField >> GEvent." + event + " @ " + millis());
} 

function tf_minnumstitches(GTextField source, GEvent event) { 
    console.log(("textfield2 - GTextField >> GEvent." + event + " @ " + millis());
} 

function tf_maxnumstitches(GTextField source, GEvent event) { 
    console.log(("textfield3 - GTextField >> GEvent." + event + " @ " + millis());
} 

function tf_minnumrows(GTextField source, GEvent event) { 
    console.log(("textfield4 - GTextField >> GEvent." + event + " @ " + millis());
} 

function tf_maxnumrows(GTextField source, GEvent event) { 
    console.log(("textfield5 - GTextField >> GEvent." + event + " @ " + millis());
} 

function cb_backandforth(GCheckbox source, GEvent event) {
    console.log(("c_backandforth - GCheckbox >> GEvent." + event + " @ " + millis());
}

function bc_circular(GCheckbox source, GEvent event) { 
    console.log(("c_circular - GCheckbox >> GEvent." + event + " @ " + millis());
}


// Create all the GUI controls. 
function createGUI() {
    G4P.messagesEnabled(false);
    G4P.setGlobalColorScheme(GCScheme.BLUE_SCHEME);
    G4P.setMouseOverEnabled(false);

    initGUI();
    
    // set one gauge option's visibility to false
    SetVisibilityOfGauge_Standard(true);
    SetVisibilityOfGauge_Measure(false);

    // disable and change color scheme TODO implement
    cb_samestitch.setEnabled(false);
    cb_samestitch.setLocalColorScheme(GCScheme.YELLOW_SCHEME);
    // dl_stitchtypes.setEnabled(false);
    // dl_stitchtypes.setLocalColorScheme(GCScheme.YELLOW_SCHEME);

    // hide the GUI at start
    if (hideGuiAtStart) {
        cb_hidegui.setSelected(true);
        SetVisibilityOfGUI(false);
    }
}

// Variable declarations 
GLabel l_zoom; 
GLabel l_zoomin; 
GLabel l_zoomout; 
GSlider s_zoom; 
GLabel l_rotate; 
GSlider s_x; 
GSlider s_y; 
GSlider s_z; 
GButton b_reset; 
GLabel l_rotx;
GLabel l_roty;
GLabel l_rotz;
GLabel l_generation; 
GButton b_generate; 
GButton b_export; 
GTextField t_pdfname; 
GToggleGroup togGroup_gauge; 
GOption o_gaugestandard; 
GOption o_gaugemeasure; 
GDropList dl_yarnweight; 
GLabel l_yarnweight; 
GLabel l_hooksize; 
GDropList dl_hooksize; 
GLabel l_measure; 
GLabel l_select; 
GLabel l_rowlength; 
GLabel l_rowwidth; 
GTextField t_rowlength; 
GTextField t_rowwidth; 
GLabel l_cm1; 
GLabel l_cm2; 
GLabel l_gauge; 
GLabel l_pdfextension; 
GLabel l_realsizecm; 
GCheckbox cb_samestitch; 
GDropList dl_stitchtypes;
GCheckbox cb_hidegui; 
GLabel l_numstitchesrow1; 
GLabel l_minnumstitches; 
GLabel l_maxnumstitches; 
GLabel l_minnumrows; 
GLabel l_maxnumrows; 
GTextField t_numstitchesrow1; 
GTextField t_minnumstitches; 
GTextField t_maxnumstitches; 
GTextField t_minnumrows; 
GTextField t_maxnumrows; 
GCheckbox c_backandforth; 
GCheckbox c_circular; 

function initGUI() {
    l_zoom = new GLabel(this, WIDTH-90, 430, 80, 20);
    l_zoom.setTextAlign(GAlign.CENTER, GAlign.MIDDLE);
    l_zoom.setText("Zoom");
    l_zoom.setOpaque(false);
    s_zoom = new GSlider(this, WIDTH-90, 450, 80, 20, 10.0);
    // s_zoom.setLimits(0.5, 0.0, 1.0);
    s_zoom.setNumberFormat(G4P.DECIMAL, 2);
    s_zoom.setOpaque(false);
    s_zoom.addEventHandler(this, "slider_zoom");

    l_zoomout = new GLabel(this, WIDTH-125, 440, 80, 20);
    l_zoomout.setTextAlign(GAlign.CENTER, GAlign.MIDDLE);
    l_zoomout.setText("-");
    l_zoomout.setOpaque(false);
    l_zoomin = new GLabel(this, WIDTH-55, 440, 80, 20);
    l_zoomin.setTextAlign(GAlign.CENTER, GAlign.MIDDLE);
    l_zoomin.setText("+");
    l_zoomin.setOpaque(false);

    l_rotate = new GLabel(this, WIDTH-90, 480, 80, 20);
    l_rotate.setTextAlign(GAlign.CENTER, GAlign.MIDDLE);
    l_rotate.setText("Rotate");
    l_rotate.setOpaque(false);
    s_x = new GSlider(this, WIDTH-90, 500, 80, 20, 10.0);
    s_x.setNumberFormat(G4P.DECIMAL, 2);
    s_x.setOpaque(false);
    s_x.addEventHandler(this, "slider_rotx");
    s_y = new GSlider(this, WIDTH-90, 520, 80, 20, 10.0);
    s_y.setNumberFormat(G4P.DECIMAL, 2);
    s_y.setOpaque(false);
    s_y.addEventHandler(this, "slider_roty");
    s_z = new GSlider(this, WIDTH-90, 540, 80, 20, 10.0);
    s_z.setNumberFormat(G4P.DECIMAL, 2);
    s_z.setOpaque(false);
    s_z.addEventHandler(this, "slider_rotz");
    b_reset = new GButton(this, WIDTH-90, 570, 80, 20);
    b_reset.setText("Reset");
    b_reset.addEventHandler(this, "button_reset");

    s_zoom.setLimits(1.0, 0.5, 4.0);
    s_x.setLimits(0.0, -180.0, 180.0);
    s_y.setLimits(0.0, -180.0, 180.0);
    s_z.setLimits(0.0, -180.0, 180.0);

    l_rotx = new GLabel(this, WIDTH-105, 500, 20, 20);
    l_rotx.setTextAlign(GAlign.CENTER, GAlign.MIDDLE);
    l_rotx.setText("X");
    l_rotx.setOpaque(false);
    l_roty = new GLabel(this, WIDTH-105, 520, 20, 20);
    l_roty.setTextAlign(GAlign.CENTER, GAlign.MIDDLE);
    l_roty.setText("Y");
    l_roty.setOpaque(false);
    l_rotz = new GLabel(this, WIDTH-105, 540, 20, 20);
    l_rotz.setTextAlign(GAlign.CENTER, GAlign.MIDDLE);
    l_rotz.setText("Z");
    l_rotz.setOpaque(false);

    l_generation = new GLabel(this, 10, 10, 150, 20);
    l_generation.setTextAlign(GAlign.CENTER, GAlign.MIDDLE);
    l_generation.setText("Generation");
    l_generation.setOpaque(false);
    l_generation.setTextBold();
    l_generation.setFont(new Font("Arial", Font.PLAIN, 16));  // increase font size
    b_generate = new GButton(this, 10, 300, 80, 20);
    b_generate.setText("Generate");
    b_generate.addEventHandler(this, "button_generate");

    b_export = new GButton(this, WIDTH-90, 10, 80, 20);
    b_export.setText("Export PDF");
    b_export.addEventHandler(this, "button_export");
    t_pdfname = new GTextField(this, WIDTH-190, 10, 70, 20, G4P.SCROLLBARS_NONE);
    t_pdfname.setText("pattern");
    t_pdfname.setOpaque(true);
    t_pdfname.addEventHandler(this, "textfield_pdfname");
    l_pdfextension = new GLabel(this, WIDTH-120, 10, 30, 20);
    l_pdfextension.setText(".pdf");
    l_pdfextension.setOpaque(false);
    l_realsizecm = new GLabel(this, WIDTH-190, 30, 180, 20);
    l_realsizecm.setText("Approximate size: 0x0x0 cm");
    l_realsizecm.setOpaque(false);

    togGroup_gauge = new GToggleGroup();
    o_gaugestandard = new GOption(this, 60, 30, 70, 20);
    o_gaugestandard.setIconPos(GAlign.EAST);
    o_gaugestandard.setTextAlign(GAlign.RIGHT, GAlign.MIDDLE);
    o_gaugestandard.setText("standard");
    o_gaugestandard.setOpaque(false);
    o_gaugestandard.addEventHandler(this, "option_gaugestandard");
    o_gaugemeasure = new GOption(this, 130, 30, 70, 20);
    o_gaugemeasure.setIconAlign(GAlign.LEFT, GAlign.MIDDLE);
    o_gaugemeasure.setText("measure");
    o_gaugemeasure.setOpaque(false);
    o_gaugemeasure.addEventHandler(this, "option_gaugemeasure");
    togGroup_gauge.addControl(o_gaugestandard);
    o_gaugestandard.setSelected(true);
    togGroup_gauge.addControl(o_gaugemeasure);
    dl_yarnweight = new GDropList(this, 90, 120, 80, 120, 5, 10);
    dl_yarnweight.setItems(YARN_WEIGHTS, 4);
    dl_yarnweight.addEventHandler(this, "dropList_yarnweight");
    l_yarnweight = new GLabel(this, 10, 120, 80, 20);
    l_yarnweight.setText("Yarn weight:");
    l_yarnweight.setOpaque(false);
    l_hooksize = new GLabel(this, 10, 90, 80, 20);
    l_hooksize.setText("Hook size:");
    l_hooksize.setOpaque(false);
    dl_hooksize = new GDropList(this, 90, 90, 80, 120, 5, 10);
    dl_hooksize.setItems(HOOK_SIZES, 11);
    dl_hooksize.addEventHandler(this, "dropList_hooksize");
    l_measure = new GLabel(this, 10, 60, 170, 20);  // FIXME 200 to 10
    l_measure.setTextAlign(GAlign.CENTER, GAlign.MIDDLE);
    l_measure.setText("Measure 10x10 SC stitches");
    l_measure.setOpaque(false);
    l_select = new GLabel(this, 10, 60, 170, 20);
    l_select.setTextAlign(GAlign.CENTER, GAlign.MIDDLE);
    l_select.setText("Select hook and yarn");
    l_select.setOpaque(false);
    l_rowlength = new GLabel(this, 10, 90, 100, 20);  // FIXME 200 to 10
    l_rowlength.setText("Length (rows):");
    l_rowlength.setOpaque(false);
    l_rowwidth = new GLabel(this, 10, 120, 100, 20);  // FIXME 200 to 10
    l_rowwidth.setText("Width (stitches):");
    l_rowwidth.setOpaque(false);
    t_rowlength = new GTextField(this, 110, 90, 40, 20, G4P.SCROLLBARS_NONE);  // FIXME 300 to 110
    t_rowlength.setText("10");
    t_rowlength.setOpaque(true);
    t_rowlength.addEventHandler(this, "textfield_rowlength");
    t_rowwidth = new GTextField(this, 110, 120, 40, 20, G4P.SCROLLBARS_NONE);  // FIXME 300 to 110
    t_rowwidth.setText("10");
    t_rowwidth.setOpaque(true);
    t_rowwidth.addEventHandler(this, "textfield_rowwidth");
    l_cm1 = new GLabel(this, 150, 90, 30, 20);  // FIXME 340 to 150
    l_cm1.setText("cm");
    l_cm1.setOpaque(false);
    l_cm2 = new GLabel(this, 150, 120, 30, 20);  // FIXME 340 to 150
    l_cm2.setText("cm");
    l_cm2.setOpaque(false);
    l_gauge = new GLabel(this, 10, 30, 50, 20);
    l_gauge.setText("Gauge:");
    l_gauge.setOpaque(false);
    cb_samestitch = new GCheckbox(this, 10, 150, 130, 20);
    cb_samestitch.setIconAlign(GAlign.LEFT, GAlign.MIDDLE);
    cb_samestitch.setText("Use one stitch type");
    cb_samestitch.setOpaque(false);
    cb_samestitch.addEventHandler(this, "checkbox_samestitch");
    cb_samestitch.setSelected(true);
    dl_stitchtypes = new GDropList(this, 140, 150, 40, 100, 4, 10);
    dl_stitchtypes.setItems(STITCH_TYPES, 0);
    dl_stitchtypes.addEventHandler(this, "dropList_stitchtypes");

    cb_hidegui = new GCheckbox(this, 10, 570, 80, 20);
    cb_hidegui.setIconAlign(GAlign.LEFT, GAlign.MIDDLE);
    cb_hidegui.setText("Hide GUI");
    cb_hidegui.setOpaque(false);
    cb_hidegui.addEventHandler(this, "checkbox_hidegui");
    
    l_numstitchesrow1 = new GLabel(this, 50, 170, 130, 20);
    l_numstitchesrow1.setText("stitches in the first row");
    l_numstitchesrow1.setOpaque(false);
    l_minnumstitches = new GLabel(this, 50, 190, 130, 20);
    l_minnumstitches.setText("(min) stitches in a row");
    l_minnumstitches.setOpaque(false);
    l_maxnumstitches = new GLabel(this, 50, 210, 130, 20);
    l_maxnumstitches.setText("(max) stitches in a row");
    l_maxnumstitches.setOpaque(false);
    l_minnumrows = new GLabel(this, 50, 230, 70, 20);
    l_minnumrows.setText("(min) rows");
    l_minnumrows.setOpaque(false);
    l_maxnumrows = new GLabel(this, 50, 250, 70, 20);
    l_maxnumrows.setText("(max) rows");
    l_maxnumrows.setOpaque(false);
    t_numstitchesrow1 = new GTextField(this, 10, 170, 40, 20, G4P.SCROLLBARS_NONE);
    t_numstitchesrow1.setPromptText("0");
    t_numstitchesrow1.setOpaque(true);
    t_numstitchesrow1.addEventHandler(this, "tf_numstitchesrow1");
    t_minnumstitches = new GTextField(this, 10, 190, 40, 20, G4P.SCROLLBARS_NONE);
    t_minnumstitches.setPromptText("0");
    t_minnumstitches.setOpaque(true);
    t_minnumstitches.addEventHandler(this, "tf_minnumstitches");
    t_maxnumstitches = new GTextField(this, 10, 210, 40, 20, G4P.SCROLLBARS_NONE);
    t_maxnumstitches.setPromptText("0");
    t_maxnumstitches.setOpaque(true);
    t_maxnumstitches.addEventHandler(this, "tf_maxnumstitches");
    t_minnumrows = new GTextField(this, 10, 230, 40, 20, G4P.SCROLLBARS_NONE);
    t_minnumrows.setPromptText("0");
    t_minnumrows.setOpaque(true);
    t_minnumrows.addEventHandler(this, "tf_minnumrows");
    t_maxnumrows = new GTextField(this, 10, 250, 40, 20, G4P.SCROLLBARS_NONE);
    t_maxnumrows.setPromptText("0");
    t_maxnumrows.setOpaque(true);
    t_maxnumrows.addEventHandler(this, "tf_maxnumrows");
    c_backandforth = new GCheckbox(this, 80, 270, 100, 20);
    c_backandforth.setIconAlign(GAlign.LEFT, GAlign.MIDDLE);
    c_backandforth.setText("Back & Forth");
    c_backandforth.setOpaque(false);
    c_backandforth.addEventHandler(this, "cb_backandforth");
    c_backandforth.setSelected(true);
    c_circular = new GCheckbox(this, 10, 270, 70, 20);
    c_circular.setIconAlign(GAlign.LEFT, GAlign.MIDDLE);
    c_circular.setText("Circular");
    c_circular.setOpaque(false);
    c_circular.addEventHandler(this, "bc_circular");
    c_circular.setSelected(true);
}

function SetVisibilityOfGauge_Standard(boolean val) {
    l_select.setVisible(val);
    l_hooksize.setVisible(val);
    dl_hooksize.setVisible(val);
    l_yarnweight.setVisible(val);
    dl_yarnweight.setVisible(val);
}

function SetVisibilityOfGauge_Measure(boolean val) {
    l_measure.setVisible(val);
    l_rowlength.setVisible(val);
    l_rowwidth.setVisible(val);
    t_rowlength.setVisible(val);
    t_rowwidth.setVisible(val);
    l_cm1.setVisible(val);
    l_cm2.setVisible(val);
}

function SetVisibilityOfGUI(boolean val) {
    l_zoom.setVisible(val); 
    s_zoom.setVisible(val); 
    l_zoomin.setVisible(val); 
    l_zoomout.setVisible(val); 
    l_rotate.setVisible(val); 
    s_x.setVisible(val); 
    s_y.setVisible(val); 
    s_z.setVisible(val); 
    b_reset.setVisible(val); 
    l_rotx.setVisible(val);
    l_roty.setVisible(val);
    l_rotz.setVisible(val);
    l_generation.setVisible(val); 
    b_generate.setVisible(val); 
    b_export.setVisible(val); 
    t_pdfname.setVisible(val); 
    l_realsizecm.setVisible(val);
    // togGroup_gauge.setVisible(val); 
    o_gaugestandard.setVisible(val); 
    o_gaugemeasure.setVisible(val); 
    if (val) {
        SetVisibilityOfGauge_Standard(true);
        SetVisibilityOfGauge_Measure(false);
    }
    else {
        SetVisibilityOfGauge_Standard(val);
        SetVisibilityOfGauge_Measure(val);
    }
    l_gauge.setVisible(val); 
    l_pdfextension.setVisible(val); 
    cb_samestitch.setVisible(val); 
    dl_stitchtypes.setVisible(val);
    // cb_hidegui.setVisible(val); 

    l_numstitchesrow1.setVisible(val);
    l_minnumstitches.setVisible(val);
    l_maxnumstitches.setVisible(val);
    l_minnumrows.setVisible(val);
    l_maxnumrows.setVisible(val);
    t_numstitchesrow1.setVisible(val);
    t_minnumstitches.setVisible(val);
    t_maxnumstitches.setVisible(val);
    t_minnumrows.setVisible(val);
    t_maxnumrows.setVisible(val);
    c_backandforth.setVisible(val);
    c_circular.setVisible(val);
}
*/