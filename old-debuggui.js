// Generated with help from the tool "G4P GUI builder"

/*
// TODO possible additions to debuggui
// [connectStartEndStitches] toggle connecting first and last stitches of rows (green edge)
// adjust [stitchLengthMultiplier]; perhaps unnecessary because of zooming
// show/hide centroid [showCentroid]
// [useVertexStitchColors] toggle on/off
// [backgroundColor] change
// show hook size and yarn weight
// size in cm

function checkbox_testview(GCheckbox source, GEvent event) { 
    console.log(("cb_testview - GCheckbox >> GEvent." + event + " @ " + millis());
    // hide / show test view
    if (event == GEvent.SELECTED) {
        // hide all elements except this one
        SetVisibilityOfDebugGUI(true);
    }
    else if (event == GEvent.DESELECTED) {
        // show all elements
        SetVisibilityOfDebugGUI(false);
    }
} 

function button_nexttest(GButton source, GEvent event) { 
    console.log(("b_nexttest - GButton >> GEvent." + event + " @ " + millis());
    // show next test and display information on the current test

    // when the generated structure is ready
    if (!useTests && generatedReady) {
        cb_springson.setSelected(false);
        l_testname.setText(generatedCrochetStructure.csName);
        l_stitchcount.setText("Stitches: " + generatedCrochetStructure.totalStitches);
        l_rowcount.setText("Rows: " + generatedCrochetStructure.rows.length);
        l_tensionwidth.setText("Tension-width: " + generatedCrochetStructure.tensionWidth);
        l_tensionlength.setText("Tension-length: " + generatedCrochetStructure.tensionLength);
        return;
    }
    
    if (source != null && event != null) {
        NextTest();
    }

    l_testname.setText(GetActiveTestName());
    l_stitchcount.setText("Stitches: " + GetActiveTestStitchCount());
    l_rowcount.setText("Rows: " + GetActiveTestRowCount());
    l_tensionwidth.setText("Tension-width: " + GetActiveTestTensionWidth());
    l_tensionlength.setText("Tension-length: " + GetActiveTestTensionLength());

    // from GUI
    l_realsizecm.setText(GetActiveTestApproximateRealSize());

    if (cb_springson.isSelected()) {
        ToggleSpringUpdates(true);
    } else {
        ToggleSpringUpdates(false);
    }
} 

function checkbox_springson(GCheckbox source, GEvent event) { 
    console.log(("cb_springson - GCheckbox >> GEvent." + event + " @ " + millis());
    // toggle between updating springs and not

    // when the generated structure is ready
    if (!useTests && generatedReady) {
        if (event == GEvent.SELECTED) {
            for (Spring spring : generatedCrochetStructure.allSprings) {
                spring.updatePositions = true;
            }
        }
        else if (event == GEvent.DESELECTED) {
            for (Spring spring : generatedCrochetStructure.allSprings) {
                spring.updatePositions = false;
            }
        }
        return;
    }

    if (event == GEvent.SELECTED) {
        ToggleSpringUpdates(true);
    }
    else if (event == GEvent.DESELECTED) {
        ToggleSpringUpdates(false);
    }
} 

function textfield_mass(GTextField source, GEvent event) { 
    console.log(("tf_mass - GTextField >> GEvent." + event + " @ " + millis());
    if (islet(tf_mass.getText())) {
        let newVal = let.parselet(tf_mass.getText());
        console.log((" update MASS value to " + newVal);
        defMass = newVal;
    }
} 

function textfield_k(GTextField source, GEvent event) { 
    console.log(("tf_k - GTextField >> GEvent." + event + " @ " + millis());
    if (islet(tf_k.getText())) {
        let newVal = let.parselet(tf_k.getText());
        console.log((" update K value to " + newVal);
        defSpringConstant = newVal;
    }
} 

function textfield_damp(GTextField source, GEvent event) { 
    console.log(("tf_damp - GTextField >> GEvent." + event + " @ " + millis());
    if (islet(tf_damp.getText())) {
        let newVal = let.parselet(tf_damp.getText());
        console.log((" update DAMP value to " + newVal);
        defDamp = newVal;
    }
} 

function button_regenerate(GButton source, GEvent event) { 
    console.log(("b_regenerate - GButton >> GEvent." + event + " @ " + millis());
    // delete the current crochet structure and generate it again from scratch

    // when the generated structure is ready
    if (!useTests && generatedReady) {
        // TODO get parameters, destroy and recreate (same way or different?)

        l_testname.setText(generatedCrochetStructure.csName);
        l_stitchcount.setText("Stitches: " + generatedCrochetStructure.totalStitches);
        l_rowcount.setText("Rows: " + generatedCrochetStructure.rows.length);
        l_tensionwidth.setText("Tension-width: " + generatedCrochetStructure.tensionWidth);
        l_tensionlength.setText("Tension-length: " + generatedCrochetStructure.tensionLength);
        return;
    }

    ResetActiveTest();

    l_testname.setText(GetActiveTestName());
    l_stitchcount.setText("Stitches: " + GetActiveTestStitchCount());
    l_rowcount.setText("Rows: " + GetActiveTestRowCount());
    l_tensionwidth.setText("Tension-width: " + GetActiveTestTensionWidth());
    l_tensionlength.setText("Tension-length: " + GetActiveTestTensionLength());
    
    if (cb_springson.isSelected()) {
        ToggleSpringUpdates(true);
    }
    else {
        ToggleSpringUpdates(false);
    }
}

function createDebugGUI() {
    initDebugGUI();
    cb_testview.setVisible(true);
    SetVisibilityOfDebugGUI(true);

    // call at start to fill in the values of the current test
    button_nexttest(null, null);

    // fill in default values
    tf_mass.setText("" + defMass);
    tf_k.setText("" + defSpringConstant);
    tf_damp.setText("" + defDamp);
}

GCheckbox cb_testview; 
GButton b_nexttest; 
GLabel l_testname; 
GCheckbox cb_springson; 
GLabel l_stitchcount; 
GLabel l_rowcount; 
GButton b_regenerate; 
GLabel l_tensionwidth; 
GLabel l_tensionlength; 
GLabel l_mass; 
GTextField tf_mass; 
GLabel l_k; 
GTextField tf_k; 
GLabel l_damp; 
GTextField tf_damp; 

function initDebugGUI() {
    cb_testview = new GCheckbox(this, 10, 550, 80, 20);
    cb_testview.setIconAlign(GAlign.LEFT, GAlign.MIDDLE);
    cb_testview.setText("Test view");
    cb_testview.setLocalColorScheme(GCScheme.RED_SCHEME);
    cb_testview.setOpaque(false);
    cb_testview.addEventHandler(this, "checkbox_testview");
    cb_testview.setSelected(true);
    b_nexttest = new GButton(this, 10, 450, 80, 20);
    b_nexttest.setText("Next test");
    b_nexttest.setLocalColorScheme(GCScheme.RED_SCHEME);
    b_nexttest.addEventHandler(this, "button_nexttest");
    l_testname = new GLabel(this, (WIDTH/2)-150, 570, 300, 20);
    l_testname.setTextAlign(GAlign.CENTER, GAlign.MIDDLE);
    l_testname.setText("testname");
    l_testname.setLocalColorScheme(GCScheme.RED_SCHEME);
    l_testname.setOpaque(false);
    cb_springson = new GCheckbox(this, 10, 330, 100, 20);
    cb_springson.setIconAlign(GAlign.LEFT, GAlign.MIDDLE);
    cb_springson.setText("Springs on/off");
    cb_springson.setLocalColorScheme(GCScheme.RED_SCHEME);
    cb_springson.setOpaque(false);
    cb_springson.addEventHandler(this, "checkbox_springson");
    l_stitchcount = new GLabel(this, WIDTH-90, 100, 80, 20);
    l_stitchcount.setTextAlign(GAlign.LEFT, GAlign.CENTER);
    l_stitchcount.setText("Stitches: ?");
    l_stitchcount.setLocalColorScheme(GCScheme.RED_SCHEME);
    l_stitchcount.setOpaque(false);
    l_rowcount = new GLabel(this, WIDTH-90, 120, 80, 20);
    l_rowcount.setText("Rows: ?");
    l_rowcount.setLocalColorScheme(GCScheme.RED_SCHEME);
    l_rowcount.setOpaque(false);
    b_regenerate = new GButton(this, 10, 420, 80, 20);
    b_regenerate.setText("Re-generate");
    b_regenerate.setLocalColorScheme(GCScheme.RED_SCHEME);
    b_regenerate.addEventHandler(this, "button_regenerate");
    l_tensionwidth = new GLabel(this, WIDTH-130, 60, 130, 20);
    l_tensionwidth.setTextAlign(GAlign.LEFT, GAlign.TOP);
    l_tensionwidth.setText("Tension-width: ?");
    l_tensionwidth.setLocalColorScheme(GCScheme.RED_SCHEME);
    l_tensionwidth.setOpaque(false);
    l_tensionlength = new GLabel(this, WIDTH-130, 80, 130, 20);
    l_tensionlength.setText("Tension-length: ?");
    l_tensionlength.setLocalColorScheme(GCScheme.RED_SCHEME);
    l_tensionlength.setOpaque(false);
  
    l_mass = new GLabel(this, 10, 350, 40, 20);
    l_mass.setText("mass");
    l_mass.setOpaque(false);
    l_mass.setLocalColorScheme(GCScheme.RED_SCHEME);
    tf_mass = new GTextField(this, 50, 350, 40, 20, G4P.SCROLLBARS_NONE);
    tf_mass.setOpaque(true);
    tf_mass.addEventHandler(this, "textfield_mass");
    tf_mass.setLocalColorScheme(GCScheme.RED_SCHEME);
    l_k = new GLabel(this, 10, 370, 40, 20);
    l_k.setText("k");
    l_k.setOpaque(false);
    l_k.setLocalColorScheme(GCScheme.RED_SCHEME);
    tf_k = new GTextField(this, 50, 370, 40, 20, G4P.SCROLLBARS_NONE);
    tf_k.setOpaque(true);
    tf_k.addEventHandler(this, "textfield_k");
    tf_k.setLocalColorScheme(GCScheme.RED_SCHEME);
    l_damp = new GLabel(this, 10, 390, 40, 20);
    l_damp.setText("damp");
    l_damp.setOpaque(false);
    l_damp.setLocalColorScheme(GCScheme.RED_SCHEME);
    tf_damp = new GTextField(this, 50, 390, 40, 20, G4P.SCROLLBARS_NONE);
    tf_damp.setOpaque(true);
    tf_damp.addEventHandler(this, "textfield_damp");
    tf_damp.setLocalColorScheme(GCScheme.RED_SCHEME);
}

function SetVisibilityOfDebugGUI(val) {
    // cb_testview.setVisible(val);
    b_nexttest.setVisible(val);
    l_testname.setVisible(val);
    cb_springson.setVisible(val);
    l_stitchcount.setVisible(val);
    l_rowcount.setVisible(val);
    b_regenerate.setVisible(val);
    l_tensionwidth.setVisible(val);
    l_tensionlength.setVisible(val);

    l_mass.setVisible(val);
    tf_mass.setVisible(val);
    l_k.setVisible(val);
    tf_k.setVisible(val);
    l_damp.setVisible(val);
    tf_damp.setVisible(val);
}
*/