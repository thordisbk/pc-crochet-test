
// for testing crochet structures and stitches

function createTests() {
    let circs = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
    // let active =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    let active = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  // one active
    // let active =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]; // only circular active
    for (let i = 0; i < MAX_TESTS; i++) {
        let type = (circs[i] == 1) ? CrochetType.CIRCULAR : CrochetType.BACKFORTH;
        let crochetStructure = new CrochetStructure(type, 5.5, YarnWeight.MEDIUM);
        structures.push(crochetStructure);

        if (active[i] == 0) 
            continue;
        crochetStructure.SetupTest(i);
        let pattern = new Pattern(crochetStructure);
        if (VERBOSE || DEBUG) console.log("test " + i + ": " + crochetStructure.csName + "\n" + pattern.patternStr);
    }
}

function NextTest() {
    activeTestIdx = (activeTestIdx + 1) % MAX_TESTS;
    if (VERBOSE || DEBUG) console.log("active test:", activeTestIdx, "\n");

    ResetRotZoom();
}

function ResetActiveTest() {
    // destroy the currently active test and recreate is
    let type = structures[activeTestIdx].crochetType;
    // structures[activeTestIdx] = null;
    structures[activeTestIdx] = new CrochetStructure(type, 5.5, YarnWeight.MEDIUM);
    structures[activeTestIdx].SetupTest(activeTestIdx);
}

function GetActiveTestName() {
    return structures[activeTestIdx].csName;
}

function GetActiveTestStitchCount() {
    return structures[activeTestIdx].totalStitches;
}

function GetActiveTestRowCount() {
    return structures[activeTestIdx].rows.length;
}

function GetActiveTestTensionWidth() {
    return structures[activeTestIdx].tensionWidth;
}

function GetActiveTestTensionLength() {
    return structures[activeTestIdx].tensionLength;
}

function GetActiveTestPattern() {
    let pattern = new Pattern(structures[activeTestIdx]);
    return pattern.patternStr;
}

function GetActiveTestApproximateRealSize() {
    return structures[activeTestIdx].GetApproximateRealSize();
}

function GetActiveTestGaugeInfo() {
    return structures[activeTestIdx].GetGaugeInfo();
}

function ActiveTestUpdatePreviousStitches() {
    let a = structures[activeTestIdx].rows.length-1;
    let b = structures[activeTestIdx].rows[a].count-1;
    structures[activeTestIdx].UpdatePreviousStitches(a, b, 1000, true);
}

function ToggleSpringUpdates(on) {
    for (let s = 0; s < structures[activeTestIdx].allSprings.length; s++) {
        let spring = structures[activeTestIdx].allSprings[s];
        spring.updatePositions = on;
    }
}

function displayTest() {
    structures[activeTestIdx].Draw();
}

// function handleMouseActionTest(release) {
//     if (!release) {
//         structures[activeTestIdx].PressNodes();
//     }
//     else {
//         structures[activeTestIdx].ReleaseNodes();
//     }
// }

function handleKeyPressTest() {
    // change active test by clicking 'n'
    if (key == 'n' || key == 'N') {
        NextTest();
    }
}

// functions for test setup

function SetupCircleSC(firstStitch) {
    let rows = [];

    // first row
    let stitch_ch1 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, firstStitch, null);
    let stitch_ch2 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, stitch_ch1, null);
    let firstRowStitches = [firstStitch, stitch_ch1, stitch_ch2];
    rows.push(new Row(firstRowStitches, CrochetType.CIRCULAR));

    // second row
    let stitch2 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch_ch2, stitch_ch1);
    let stitch3 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch2, stitch_ch1);
    let stitch4 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch3, stitch_ch1);
    let stitch5 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch4, stitch_ch1);
    let stitch6 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch5, stitch_ch1);
    let stitch7 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch6, stitch_ch1);
    let stitch8 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch7, stitch_ch1);
    let stitch9 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch8, stitch_ch1);
    let secondRowStitches = [stitch2, stitch3, stitch4, stitch5, stitch6, stitch7, stitch8, stitch9];
    rows.push(new Row(secondRowStitches, CrochetType.CIRCULAR));

    // third row
    let stitch10 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch9, stitch2);
    let stitch11 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch10, stitch2);
    let stitch12 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch11, stitch3);
    let stitch13 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch12, stitch3);
    let stitch14 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch13, stitch4);
    let stitch15 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch14, stitch4);
    let stitch16 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch15, stitch5);
    let stitch17 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch16, stitch5);
    let stitch18 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch17, stitch6);
    let stitch19 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch18, stitch6);
    let stitch20 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch19, stitch7);
    let stitch21 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch20, stitch7);
    let stitch22 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch21, stitch8);
    let stitch23 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch22, stitch8);
    let stitch24 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch23, stitch9);
    let stitch25 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch24, stitch9);
    let thirdRowStitches = [stitch10, stitch11, stitch12, stitch13, stitch14, stitch15, stitch16, stitch17,
                                 stitch18, stitch19, stitch20, stitch21, stitch22, stitch23, stitch24, stitch25];
    rows.push(new Row(thirdRowStitches, CrochetType.CIRCULAR));

    return rows;
}

function SetupFlatCircle(firstStitch, numStitchesInFirstRow, numOfRows, type) {
    // a flat circle with a starting row, then INC in all SC, then INC in every other SC, then every third, the fourth, ...

    let rows = [];

    // let numStitchesInFirstRow = 6;
    // let numOfRows = 4;
    // let type = StitchTypes.SC;
    let rowCount = 0;

    // first row
    let stitch_ch1 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, firstStitch, null);
    let stitch_ch2 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, stitch_ch1, null);
    let firstRowStitches = [firstStitch, stitch_ch1, stitch_ch2];
    rows.push(new Row(firstRowStitches, CrochetType.CIRCULAR));
    rowCount++;

    let secondRowStitches = [];
    secondRowStitches = InitStitchIncNum(secondRowStitches, stitch_ch2, stitch_ch1, type, numStitchesInFirstRow);
    rows.push(new Row(secondRowStitches, CrochetType.CIRCULAR));
    rowCount++;

    for (; rowCount < numOfRows; rowCount++) {
        let numStitchesInCurrRow = numStitchesInFirstRow * (rowCount-1);  // should increase by 
        let currRowStitches = [];
        // currRowStitches = [];
        let lastRow = rows[rows.length-1];
        let prevStitch = lastRow.stitches[lastRow.count-1];
        let ontoStitch = lastRow.stitches[0];
        for (let s = 0; s < numStitchesInCurrRow && ontoStitch != null; s++) {
            if (s % (rowCount-1) == 0) {
                // inc
                currRowStitches = InitStitchInc(currRowStitches, prevStitch, ontoStitch, type);
            } else {
                // single
                currRowStitches = InitStitchSingle(currRowStitches, prevStitch, ontoStitch, type);
            }
            prevStitch = currRowStitches[currRowStitches.length-1];
            ontoStitch = ontoStitch.nextStitch;
        }
        rows.push(new Row(currRowStitches, CrochetType.CIRCULAR));
    }
    return rows;
}

function SetupCircleDiff(firstStitch) {
    let rows = [];

    // first row
    let stitch_ch1 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, firstStitch, null);
    let stitch_ch2 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, stitch_ch1, null);
    let firstRowStitches = [firstStitch, stitch_ch1, stitch_ch2];
    rows.push(new Row(firstRowStitches, CrochetType.CIRCULAR));

    // second row
    let stitch2 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch_ch2, stitch_ch1);
    let stitch3 = new Stitch(StitchTypes.HDC, StitchDescription.INC, stitch2, stitch_ch1);
    let stitch4 = new Stitch(StitchTypes.DC, StitchDescription.INC, stitch3, stitch_ch1);
    let stitch5 = new Stitch(StitchTypes.HDC, StitchDescription.INC, stitch4, stitch_ch1);
    let stitch6 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch5, stitch_ch1);
    let stitch7 = new Stitch(StitchTypes.HDC, StitchDescription.INC, stitch6, stitch_ch1);
    let stitch8 = new Stitch(StitchTypes.TR, StitchDescription.INC, stitch7, stitch_ch1);
    let stitch9 = new Stitch(StitchTypes.HDC, StitchDescription.INC, stitch8, stitch_ch1);
    let secondRowStitches = [stitch2, stitch3, stitch4, stitch5, stitch6, stitch7, stitch8, stitch9];
    rows.push(new Row(secondRowStitches, CrochetType.CIRCULAR));

    // third row
    let stitch10 = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, stitch9, stitch2);
    let stitch11 = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, stitch10, stitch3);
    let stitch12 = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, stitch11, stitch4);
    let stitch13 = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, stitch12, stitch5);
    let stitch14 = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, stitch13, stitch6);
    let stitch15 = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, stitch14, stitch7);
    let stitch16 = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, stitch15, stitch8);
    let stitch17 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch16, stitch9);
    let stitch18 = new Stitch(StitchTypes.SC, StitchDescription.INC, stitch17, stitch9);
    let thirdRowStitches = [stitch10, stitch11, stitch12, stitch13, stitch14, stitch15, stitch16, stitch17, stitch18];
    rows.push(new Row(thirdRowStitches, CrochetType.CIRCULAR));

    return rows;
}

function SetupCircleThatCups(firstStitch) {

    let numOfRows = 7;
    let numOfStitchesInRow = 6;

    let rows = [];

    // first row
    let stitch_ch1 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, firstStitch, null);
    let stitch_ch2 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, stitch_ch1, null);
    let firstRowStitches = [firstStitch, stitch_ch1, stitch_ch2];
    rows.push(new Row(firstRowStitches, CrochetType.CIRCULAR));

    // second row
    let prevStitch = stitch_ch2;
    let ontoStitch = stitch_ch1;
    let turns = 1;
    for (let r = 0; r < numOfRows; r++) {
        let rowStitches = [];
        if (r == 0) {
            // first row
            for (let s = 0; s < numOfStitchesInRow; s++) {
                let currStitch = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, prevStitch, ontoStitch);
                rowStitches.push(currStitch);
                prevStitch = currStitch;
            }
        }
        else if (r > 2) {
            // two stitches in each ontoStitch
            // for (let s = 0; s < numOfStitchesInRow * turns; s++) {
            for (let s = 0; s < numOfStitchesInRow; s++) {
                ontoStitch = rows[r].stitches[s];  // ontoStitch.prevStitch;
                let currStitch1 = new Stitch(StitchTypes.SC, StitchDescription.INC, prevStitch, ontoStitch);
                let currStitch2 = new Stitch(StitchTypes.SC, StitchDescription.INC, currStitch1, ontoStitch);
                rowStitches.push(currStitch1);
                rowStitches.push(currStitch2);
                prevStitch = currStitch2;
            }
            turns++;
            numOfStitchesInRow *= 2;
        }
        else {
            // one stitch for each ontoStitch
            for (let s = 0; s < numOfStitchesInRow; s++) {
                ontoStitch = rows[r].stitches[s];  // ontoStitch.prevStitch;
                let currStitch = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, prevStitch, ontoStitch);
                rowStitches.push(currStitch);
                prevStitch = currStitch;
            }
        }
        rows.push(new Row(rowStitches, CrochetType.CIRCULAR));
    }

    return rows;
}

function SetupCircleThatCupsRandomIncs(firstStitch) {

    let numOfRows = 5;
    let numOfStitchesInRow = 6;

    let rows = [];

    // first row
    let stitch_ch1 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, firstStitch, null);
    let stitch_ch2 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, stitch_ch1, null);
    let firstRowStitches = [firstStitch, stitch_ch1, stitch_ch2];
    rows.push(new Row(firstRowStitches, CrochetType.CIRCULAR));

    // second row
    let prevStitch = stitch_ch2;
    let ontoStitch = stitch_ch1;
    let turns = 1;
    for (let r = 0; r < numOfRows; r++) {
        let rowStitches = [];
        if (r == 0) {
            // first row
            for (let s = 0; s < numOfStitchesInRow; s++) {
                let currStitch = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, prevStitch, ontoStitch);
                rowStitches.push(currStitch);
                prevStitch = currStitch;
            }
        }
        else {
            // one stitch for each ontoStitch
            let rand = int(random(0, numOfStitchesInRow));
            for (let s = 0; s < numOfStitchesInRow; s++) {
                if (s == rand) {
                    ontoStitch = rows[r].stitches[s];
                    let currStitch1 = new Stitch(StitchTypes.SC, StitchDescription.INC, prevStitch, ontoStitch);
                    let currStitch2 = new Stitch(StitchTypes.SC, StitchDescription.INC, currStitch1, ontoStitch);
                    rowStitches.push(currStitch1);
                    rowStitches.push(currStitch2);
                    prevStitch = currStitch2;
                }
                else {
                    ontoStitch = rows[r].stitches[s];
                    let currStitch = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, prevStitch, ontoStitch);
                    rowStitches.push(currStitch);
                    prevStitch = currStitch;
                }
            }
            numOfStitchesInRow++;
        }
        rows.push(new Row(rowStitches, CrochetType.CIRCULAR));
    }

    return rows;
}

function SetupHat(firstStitch) {

    let numOfRows = 6;
    let numOfStitchesInRow = 6;

    let rows = [];

    // first row
    let stitch_ch1 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, firstStitch, null);
    let stitch_ch2 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, stitch_ch1, null);
    let firstRowStitches = [firstStitch, stitch_ch1, stitch_ch2];
    rows.push(new Row(firstRowStitches, CrochetType.CIRCULAR));

    // second row
    let prevStitch = stitch_ch2;
    let ontoStitch = stitch_ch1;
    for (let r = 0; r < numOfRows; r++) {
        let rowStitches = [];
        if (r == 0) {
            // first row, numOfStitchesInRow stitches in first stitch
            for (let s = 0; s < numOfStitchesInRow; s++) {
                let currStitch = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, prevStitch, ontoStitch);
                rowStitches.push(currStitch);
                prevStitch = currStitch;
            }
        }
        else if (r == 1) {
            // two stitches in each ontoStitch
            for (let s = 0; s < numOfStitchesInRow; s++) {
                ontoStitch = rows[r].stitches[s];  // ontoStitch.prevStitch;
                let currStitch1 = new Stitch(StitchTypes.SC, StitchDescription.INC, prevStitch, ontoStitch);
                let currStitch2 = new Stitch(StitchTypes.SC, StitchDescription.INC, currStitch1, ontoStitch);
                rowStitches.push(currStitch1);
                rowStitches.push(currStitch2);
                prevStitch = currStitch2;
            }
            numOfStitchesInRow += numOfStitchesInRow;
        }
        else if (r == 2) {
            // repeat: *two stitches in ontoStitch, one stitch in ontoStitch*
            let newStitches = 0;
            for (let s = 0; s < numOfStitchesInRow; s++) {
                ontoStitch = rows[r].stitches[s];
                if (s % 2 == 0) {
                    let currStitch1 = new Stitch(StitchTypes.SC, StitchDescription.INC, prevStitch, ontoStitch);
                    let currStitch2 = new Stitch(StitchTypes.SC, StitchDescription.INC, currStitch1, ontoStitch);
                    rowStitches.push(currStitch1);
                    rowStitches.push(currStitch2);
                    prevStitch = currStitch2;
                    newStitches++;
                }
                else {
                    let currStitch = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, prevStitch, ontoStitch);
                    rowStitches.push(currStitch);
                    prevStitch = currStitch;
                }
            }
            numOfStitchesInRow += newStitches;
        }
        else {
            // one stitch for each ontoStitch, except in first stitch
            let newStitches = 0;
            for (let s = 0; s < numOfStitchesInRow; s++) {
                ontoStitch = rows[r].stitches[s];
                let currStitch = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, prevStitch, ontoStitch);
                rowStitches.push(currStitch);
                prevStitch = currStitch;
            }
            numOfStitchesInRow += newStitches;
        }
        rows.push(new Row(rowStitches, CrochetType.CIRCULAR));
    }

    return rows;
}

function SetupCirclePI(firstStitch) {
    let rows = [];

    let numStitchesLastRow = 1;
    let numOfRows = 8;
    let numStitchesInFirstRow = 6;

    // zero-th row, just chain
    // let zeroRowStitches = [firstStitch];
    // rows.push(new Row(zeroRowStitches, CrochetType.CIRCULAR));
    
    // first row
    let stitch_ch1 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, firstStitch, null);
    let stitch_ch2 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, stitch_ch1, null);
    let firstRowStitches = [firstStitch, stitch_ch1, stitch_ch2];
    rows.push(new Row(firstRowStitches, CrochetType.CIRCULAR));

    // first row INC
    let currRowStitches = [];
    let prevStitch = stitch_ch2;
    let ontoStitch = stitch_ch1;
    for (let i = 0; i < numStitchesInFirstRow; i++) {
        let newStitch = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, prevStitch, ontoStitch);
        prevStitch = newStitch;
        currRowStitches.push(newStitch);
    }

    rows.push(new Row(currRowStitches, CrochetType.CIRCULAR));
    numStitchesLastRow = currRowStitches.length;
    let prevRowStitches = currRowStitches;

    for (let n = 2; n <= numOfRows; n++) {
        // if n is a power of 2, then this is an increase row; else, this is a non-increase row
        currRowStitches = [];
        prevStitch = prevRowStitches[prevRowStitches.length-1];
        if (IsAPowerOfTwo(n)) {
            for (let i = 0; i < numStitchesLastRow; i++) {
                ontoStitch = prevRowStitches[i];
                let newStitch1 = new Stitch(StitchTypes.SC, StitchDescription.INC, prevStitch, ontoStitch);
                let newStitch2 = new Stitch(StitchTypes.SC, StitchDescription.INC, newStitch1, ontoStitch);
                prevStitch = newStitch2;
                currRowStitches.push(newStitch1);
                currRowStitches.push(newStitch2);
            }
        }
        else {
            for (let i = 0; i < numStitchesLastRow; i++) {
                ontoStitch = prevRowStitches[i];
                let newStitch1 = new Stitch(StitchTypes.SC, StitchDescription.REGULAR, prevStitch, ontoStitch);
                prevStitch = newStitch1;
                currRowStitches.push(newStitch1);
            }
        }
        rows.push(new Row(currRowStitches, CrochetType.CIRCULAR));
        numStitchesLastRow = currRowStitches.length;
        prevRowStitches = currRowStitches;
    }

    return rows;
}

function SetupBackAndForthSquare(firstStitch, stitchType, numOfRows, numStitchesInRows, withInc, withDec) {
    // if withInc == true, add one row of increases
    // if withDec == true, add one row of decreases
    let rows = [];

    // let numOfRows = 4;
    // let numStitchesInRows = 5;
    // let stitchType = StitchTypes.DC;

    // CH row
    let stitch_ch1 = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, firstStitch, null);
    let currRowStitches = [firstStitch, stitch_ch1];

    // next rows
    let prevStitch = stitch_ch1;
    let ontoStitch = null;
    for (let i = 0; i < numStitchesInRows+1; i++) {
        let newStitch = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, prevStitch, ontoStitch);
        prevStitch = newStitch;
        currRowStitches.push(newStitch);
    }
    rows.push(new Row(currRowStitches, CrochetType.BACKFORTH));
    let prevRowStitches = currRowStitches;

    // DC ROW, ending with CH 2
    for (let i = 0; i < numOfRows; i++) {
        ontoStitch = prevStitch.prevStitch.prevStitch;  // because DC; take 3rd CH from hook
        currRowStitches = [];
        for (let j = 0; j < numStitchesInRows; j++) {
            let newStitch = new Stitch(stitchType, StitchDescription.REGULAR, prevStitch, ontoStitch);
            prevStitch = newStitch;
            currRowStitches.push(newStitch);
            ontoStitch = ontoStitch.prevStitch;
        }
        ontoStitch = null;
        if (i < numOfRows-1) {
            for (let j = 0; j < 2; j++) {
                let newStitch = new Stitch(StitchTypes.CH, StitchDescription.REGULAR, prevStitch, ontoStitch);
                prevStitch = newStitch;
                currRowStitches.push(newStitch);
            }
        }
        rows.push(new Row(currRowStitches, CrochetType.BACKFORTH));
        prevRowStitches = currRowStitches;
    }

    if (withInc) {
        let lastRow = rows[rows.length-1];
        prevStitch = lastRow.stitches[lastRow.count-1];
        ontoStitch = lastRow.stitches[lastRow.count-1];
        currRowStitches = [];

        // first 2 CH
        currRowStitches = InitStitchSingle(currRowStitches, prevStitch, null, StitchTypes.CH);
        prevStitch = prevStitch.nextStitch;
        currRowStitches = InitStitchSingle(currRowStitches, prevStitch, null, StitchTypes.CH);
        prevStitch = prevStitch.nextStitch;

        // then incs in every other stitch
        for (let i = 0; i < numStitchesInRows; i++) {
            if (i % 2 == 0) {
                currRowStitches = InitStitchInc(currRowStitches, prevStitch, ontoStitch, stitchType);
                prevStitch = prevStitch.nextStitch;
            } else {
                currRowStitches = InitStitchSingle(currRowStitches, prevStitch, ontoStitch, stitchType);
            }
            prevStitch = prevStitch.nextStitch;
            ontoStitch = ontoStitch.prevStitch;
        }
        rows.push(new Row(currRowStitches, CrochetType.BACKFORTH));
    }
    if (withDec) {
        let lastRow = rows[rows.length-1];
        prevStitch = lastRow.stitches[lastRow.count-1];
        ontoStitch = lastRow.stitches[lastRow.count-1];
        currRowStitches = [];

        // first 2 CH
        currRowStitches = InitStitchSingle(currRowStitches, prevStitch, null, StitchTypes.CH);
        prevStitch = prevStitch.nextStitch;
        currRowStitches = InitStitchSingle(currRowStitches, prevStitch, null, StitchTypes.CH);
        prevStitch = prevStitch.nextStitch;

        // then decs in every other stitch
        for (let i = 0; i < numStitchesInRows; i++) {
            if (i % 2 == 0 && i < numStitchesInRows - 1) {
                currRowStitches = InitStitchDec(currRowStitches, prevStitch, ontoStitch, ontoStitch.prevStitch, stitchType);
                ontoStitch = ontoStitch.prevStitch;
                // i++;
                numStitchesInRows--;
            } else {
                currRowStitches = InitStitchSingle(currRowStitches, prevStitch, ontoStitch, stitchType);
            }
            prevStitch = prevStitch.nextStitch;
            ontoStitch = ontoStitch.prevStitch;
        }
        rows.push(new Row(currRowStitches, CrochetType.BACKFORTH));
    }

    return rows;
}

function SetupTapestryCrochet(firstStitch) {
    let rows = [];
    return rows;
}

function SetupCylindricalSpiral(firstStitch) {
    let rows = [];

    let rowNum = 5;
    let stitchNum = 10;
    let cType = CrochetType.CIRCULAR;

    // at the end of round, set ontoStitch as the first stitch in the previous row

    for (let r = 0; r < rowNum; r++) {
        // let currType = (r == 0) ? StitchTypes.CH : StitchTypes.SC;
        
        if (r == 0) {  // first make a row of CH
            let currType = StitchTypes.CH;
            let currRowStitches = [firstStitch];  // slip knot
            for (let s = 0; s < stitchNum; s++) {
                if (s == 0) {
                    currRowStitches = InitStitchSingle(currRowStitches, firstStitch, null, currType);
                }
                else {
                    currRowStitches = InitStitchSingle(currRowStitches, currRowStitches[currRowStitches.length-1], null, currType);
                }
            }
            rows.push(new Row(currRowStitches, cType));
        }
        else {  // then SC 1 into each CH
            let currType = StitchTypes.SC;
            let currRowStitches = [];

            let lastRow = rows[rows.length-1];
            let prevStitch = lastRow.stitches[lastRow.count-1];
            let ontoStitch = rows[rows.length-1].stitches[0];
            if (r == 1) {  // skip the slip knot
                ontoStitch = rows[rows.length-1].stitches[1];
            }
            for (let s = 0; s < stitchNum; s++) {
                currRowStitches = InitStitchSingle(currRowStitches, prevStitch, ontoStitch, currType);
                ontoStitch = ontoStitch.nextStitch;
                prevStitch = prevStitch.nextStitch;
            }
            rows.push(new Row(currRowStitches, cType));
        }

    } 

    return rows;
}

function SetupCylindrical(firstStitch) {
    let rows = [];

    let rowNum = 10;
    let stitchNum = 10;
    let cType = CrochetType.CIRCULAR;

    for (let r = 0; r < rowNum; r++) {
        
        if (r == 0) {  // first make a row of CH
            let currType = StitchTypes.CH;
            let currRowStitches = [firstStitch];
            for (let s = 0; s < stitchNum-1; s++) {  // -1 because of firstStitch already having been made
                if (s == 0) {
                    currRowStitches = InitStitchSingle(currRowStitches, firstStitch, null, currType);
                }
                else {
                    currRowStitches = InitStitchSingle(currRowStitches, currRowStitches[currRowStitches.length-1], null, currType);
                }
                // console.log("Init stitch " + currType + " | r = " + r);
            }
            rows.push(new Row(currRowStitches, cType));
        }
        else {  // then SC 1 into each CH
            let currType = StitchTypes.SC;
            let currRowStitches = [];

            let ontoStitch = null;
            for (let s = 0; s < stitchNum; s++) {
                if (s == 0) {
                    let idxFirstStitchInLastRow = (r > 1) ? 1 : 0;  // [0] is a SLST in all but the first row
                    let lastRow = rows[rows.length-1];
                    ontoStitch = lastRow.stitches[idxFirstStitchInLastRow];  
                    let lastRowLastStitch = lastRow.stitches[lastRow.count-1];
   
                    // first stitch connects the row in a circle
                    currRowStitches = InitStitchSingle(currRowStitches, lastRowLastStitch, ontoStitch, StitchTypes.SLST);
                    // first actual stitch in the row
                    currRowStitches = InitStitchSingle(currRowStitches, currRowStitches[currRowStitches.length-1], ontoStitch, currType);

                    ontoStitch = ontoStitch.nextStitch;
                }
                else {
                    let prevStitch = currRowStitches[currRowStitches.length-1];
                    currRowStitches = InitStitchSingle(currRowStitches, prevStitch, ontoStitch, currType);

                    ontoStitch = ontoStitch.nextStitch;
                }
            }
            rows.push(new Row(currRowStitches, cType));
        }
    } 

    return rows;
}

function SetupCircleWithDecreases(firstStitch) {
    let rows = [];
    
    let numStitchesInFirstRow = 6;
    let numOfRows = 4;
    let numOfHeightRows = 2;

    // first make a flat circle
    rows = SetupFlatCircle(firstStitch, numStitchesInFirstRow, numOfRows, StitchTypes.SC);
    
    // then rows of one stitch in each
    let lastRow = rows[rows.length-1];
    let prev = lastRow.stitches[lastRow.count-1];
    for (let r = 0; r < numOfHeightRows; r++) {
        let rowStitches = [];
        for (let s = 0; s < lastRow.count; s++) {
            rowStitches = InitStitchSingle(rowStitches, prev, lastRow.stitches[s], StitchTypes.SC);
            prev = rowStitches[rowStitches.length-1];
        }
        rows.push(new Row(rowStitches, CrochetType.CIRCULAR));
        lastRow = rows[rows.length-1];
    }

    // then a row with decreases
    let rowStitches = [];
    for (let s = 0; s < lastRow.count; s += 2) {
        let onto1 = lastRow.stitches[s];
        let onto2 = lastRow.stitches[s+1];
        rowStitches = InitStitchDec(rowStitches, prev, onto1, onto2, StitchTypes.SC);
        prev = rowStitches[rowStitches.length-1];
    }
    rows.push(new Row(rowStitches, CrochetType.CIRCULAR));

    return rows;
}
