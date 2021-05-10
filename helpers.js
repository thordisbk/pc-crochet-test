
function AreAlmostEqual(v1, v2) {
    // TODO letroduce an error margin due to precision errors
    // if difference between desired value and actual value is between -0.0000001 and +0.0000001, then it is ok
    let errorMargin = 0.0000002;
    
    // diff is a positive value representing the difference between v1 and v2
    let diff = (v1 >= v2) ? v1 - v2 : v2 - v1;
    // console.log("--- diff: " + diff + "\n");
    if (diff <= errorMargin)
        return true;
    
    return false;
}

function FindCentroid(translatePositions, rows, totalStitches) {
    // finds the centroid given a list of rows with stitches
    let x = 0, y = 0, z = 0;

    for (let r = 0; r < rows.length; r++) {
        let row = rows[r];
        for (let s = 0; s < row.count; s++) {
            let stitch = row.stitches[s];
            x += stitch.GetPosition().x;
            y += stitch.GetPosition().y;
            z += stitch.GetPosition().z;
        }
    }

    let centroid = createVector(x/totalStitches, y/totalStitches, z/totalStitches);

    if (translatePositions) {
        for (let r = 0; r < rows.length; r++) {
            let row = rows[r];
            for (let s = 0; s < row.count; s++) {
                let stitch = row.stitches[s];
                let currPos = stitch.GetPosition();
                let newPos = createVector(currPos.x - centroid.x, currPos.y - centroid.y, currPos.z - centroid.z);
                stitch.SetPosition(newPos);
            }
        }
    }

    return centroid;
}

function IsAPowerOfTwo(num) {
    if (num == 0)
        return false;
    let log2_num = log(num) / log(2);
    return ceil(log2_num) == floor(log2_num);
}

function ComputeStitchPosFromUpVector(stitch) {
    // FIXME should be able to return a new position of a new stitch made unto stitch
    if (stitch.ontoStitch == null) {
        return createVector(0, 0, 0);
    }
    let newPos = createVector(stitch.ontoStitch.upVector.x, stitch.ontoStitch.upVector.y, stitch.ontoStitch.upVector.z);
    newPos.mult(stitch.length * stitchLengthMultiplier);
    newPos.add(stitch.ontoStitch.GetPosition());
    return newPos;
}

function isInteger(str) {
    return Number.isSafeInteger(str);
}

function isFloat(str) {
    console.log("is " + str + " a float?");
    return Number(str) === str && str % 1 !== 0;
}

function SavePatternPDFAndImageFile(fileName = "generated_crochet") {
    // let fileName = "generated_crochet";

    noLoop();

    let dateString = CreateDateString();
    console.log("date string: " + dateString);

    let patternString = "Pattern:\n";
    let approxRealSize = "? cm";
    let gaugeInfo = "Hook size: ?\nYarn weight:?\n";
    if (useTests) {
        patternString = GetActiveTestPattern();
        approxRealSize = GetActiveTestApproximateRealSize();
        gaugeInfo = GetActiveTestGaugeInfo();
    } else if (generatedReady) {
        let pattern = new Pattern(generatedCrochetStructure);
        patternString = pattern.patternStr;
        approxRealSize = generatedCrochetStructure.GetApproximateRealSize();
        gaugeInfo = generatedCrochetStructure.GetGaugeInfo();
    } else {
        console.error("SavePatternPDFAndImageFile(): no crochet structure ready");
        return;
    }
    let formattedPattern = FormatPatternString(patternString);
    let formattedPatternList = formattedPattern.split('\n');
    let realSize = "Approximate real size of crocheted object: " + approxRealSize;
    let creatorStr = "Created using Crochet Patthern Generator by ÞBK (pokr@itu.dk)";

    // save an image of the crochet structure
    save(cnv, fileName + "_image.png");

    // save a PDF with the pattern
    let doc = new jsPDF();
    let xMargin = 15;

    // title
    doc.setFontSize(18);
    doc.text("Generated Crochet Pattern", xMargin, 20);
    
    // info
    doc.setFontSize(8);
    doc.text(creatorStr, xMargin, 30);
    doc.text(dateString, xMargin, 35);
    doc.text(realSize, xMargin, 40);
    doc.setFontSize(10);
    doc.text(gaugeInfo, xMargin, 50);

    // pattern
    doc.setFontSize(12);
    // doc.text(formattedPattern, xMargin, 60);
    let yMargin = 65;
    let linesPerPage = 40;
    for (let i = 0; i < formattedPatternList.length; i++) {
        doc.text(formattedPatternList[i], xMargin, yMargin);
        yMargin += 5;
        if (i > 0 && i % linesPerPage === 0) {
            doc.addPage();
            yMargin = 30;
        }
    }
    
    doc.save(fileName + "_pattern.pdf");

    loop();
}

function UpdateSpringsOfActiveStructure() {
    // when the generated structure is ready, activate that one, else active springs of currently active test
    let springsAreActive = false;
    if (!useTests && generatedReady) {
        generatedCrochetStructure.UpdatePreviousStitches(generatedCrochetStructure.rows.length-1, 
            generatedCrochetStructure.rows[generatedCrochetStructure.rows.length-1].count-1, 1000, true);
    } else if (useTests) {
        ActiveTestUpdatePreviousStitches();
    }
}

function GetRandomStitchType() {
    let rand = int(random(0, 7)); 
    if (rand == 0) return StitchTypes.CH;
    if (rand == 1) return StitchTypes.SC;
    if (rand == 2) return StitchTypes.HDC;
    if (rand == 3) return StitchTypes.DC;
    if (rand == 4) return StitchTypes.TR;
    if (rand == 5) return StitchTypes.SLST;
    if (rand == 6) return StitchTypes.SK;
    // if (rand == 7) return StitchTypes.SLKN;
    // if (rand == 8) return StitchTypes.MR;
    return StitchTypes.NONE;
}

function GetStitchTypesKeyByValue(str) {
    if (str === "CH") return StitchTypes.CH;
    if (str === "SC") return StitchTypes.SC;
    if (str === "HDC") return StitchTypes.HDC;
    if (str === "DC") return StitchTypes.DC;
    if (str === "TR") return StitchTypes.TR;
    if (str === "SLST") return StitchTypes.SLST;
    if (str === "SK") return StitchTypes.SK;
    // if (str === "SLKN") return StitchTypes.SLKN;
    // if (str === "MR") return StitchTypes.MR;
    return StitchTypes.NONE;
}

function CompareToStitchType() {
    // TODO
}

function CreateDateString() {
    // let dateStr = String.format("%f:%f:%f %f/%f/%f", hour(), minute(), second(), day(), month(), year()); 
    // let dateStr = hour() + ":" + minute() + ":" + second() + " " + day() + "/" + month() + "/" + year();

    let currentTime = new Date();

    let hour = "" + currentTime.getHours();
    if (hour.length == 1) hour = "0" + hour;
    let min = "" + currentTime.getMinutes();
    if (min.length == 1) min = "0" + min;
    let sec = "" + currentTime.getSeconds();
    if (sec.length == 1) sec = "0" + sec;
    let day = "" + currentTime.getDate();
    if (day.length == 1) day = "0" + day;
    let mon = "" + currentTime.getMonth();
    if (mon.length == 1) mon = "0" + mon;
    let year = "" + currentTime.getFullYear();
    let weekDayIdx = currentTime.getDay();
    let weekDay = WeekDays[weekDayIdx];

    let dateStr = hour + ":" + min + ":" + sec + " " + weekDay + " " + day + "/" + mon + "/" + year;
    return dateStr;
}


// uses the length of each stitch to calculate the radius
function DistributeStitchesInRowCircularlyAroundCenter(row) {
    // takes a row of stitches and distributes them in a circle around a center polet
    let angle = TWO_PI / row.count;

    let useOriginStitchForCentering = true;

    for (let j = 0; j < row.count; j++) {
        let currStitch = row.stitches[j];
        let ontoStitch = currStitch.ontoStitch;
        let ontoStitchPos = ontoStitch.GetPosition();
        let stitchLen = currStitch.length * stitchLengthMultiplier;
        if (useOriginStitchForCentering) {
            while (ontoStitch != null) {
                if (ontoStitch != null) {
                    ontoStitchPos = ontoStitch.GetPosition();
                    stitchLen = stitchLen + ontoStitch.length * stitchLengthMultiplier;
                }
                ontoStitch = ontoStitch.ontoStitch;
            }
        }
        // get radius for current stitch
        let radius = stitchLen;
        let xCoord = cos(angle * j) * radius;
        let yCoord = sin(angle * j) * radius;
        let zCoord = 0;  // [0, stitchLengthMultiplier]

        // TODO apply angle
        // either calculate how the prev stitch is angled from its ontoStitch and apply that to the current stitch
        //  or use the angle from Stitch.angle ...

        currStitch.SetPosition(createVector(ontoStitchPos.x + xCoord, ontoStitchPos.y + yCoord, ontoStitchPos.z + zCoord));
    }
}

// uses the distance from current stitch to its ontoStitch to calculate the radius
//  which can look strange if the previous rows' stitches have been normalized
function DistributeStitchesEvenlyCircular(row, ccw) {
    // uses circle origin for centering
    // ccw = true by default (Counter Clock-Wise)
    // distributes stitches evenly around a polet, in CCW order (if !ccw, then CW order)
    //  note: uses the screen XY-coords where (0,0) is top left corner of window, 
    //        and (maxX, maxY) is bottom right corner of the window,
    //        so without using a -angle, the order will be clockwise

    let angle = TWO_PI / row.count;
    if (ccw) {
        angle *= -1;
    }

    if (row.count < 1) {
        // no stitches; don't bother
        return;
    } else if (row.stitches[0].ontoStitch == null) {
        // TODO distribute the CHs in a circle
        // NOTE: the first row can't by design have other stitches that CH
        //  UNLESS the piece is being attached to another piece, but that is a TODO
        
        let circumference = row.count * stitchLengthMultiplier;
        let radius = circumference / (2 * PI);
        
        for (let s = 0; s < row.count; s++) {
            let currStitch = row.stitches[s];
            let xCoord = cos(angle * s) * radius;
            let yCoord = sin(angle * s) * radius;
            let zCoord = 0;

            currStitch.SetPosition(createVector(xCoord, yCoord, zCoord));
            // console.log(("distribute circular || curr pos: " + currStitch.GetPosition());
        }

        return;
    }

    for (let s = 0; s < row.count; s++) {
        let currStitch = row.stitches[s];
        let ontoStitch = currStitch.ontoStitch;

        let originStitchPos = ontoStitch.GetPosition();
        while (ontoStitch != null) {
            originStitchPos = ontoStitch.GetPosition();
            ontoStitch = ontoStitch.ontoStitch;
        }

        let ontoStitchPos = currStitch.ontoStitch.GetPosition();
        let ontoPos2D = createVector(ontoStitchPos.x, ontoStitchPos.y, 0);
        let originPos2D = createVector(originStitchPos.x, originStitchPos.y, 0);

        // get radius for current stitch
        let radius = currStitch.length * stitchLengthMultiplier + ontoPos2D.dist(originPos2D);
        let xCoord = cos(angle * s) * radius;
        let yCoord = sin(angle * s) * radius;
        let zCoord = 0;

        currStitch.SetPosition(createVector(originStitchPos.x + xCoord, originStitchPos.y + yCoord, ontoStitchPos.z + zCoord));
        // console.log(("distribute circular || curr pos: " + currStitch.GetPosition());
    }
}

function NormalizeStitchesInCircularRow(row) {  // same as NormalizeStitchLengthsInRow
    // move each stitch closer to its ontoStitch, until the length between them is equal to stitch.length
    for (let s = 0; s < row.count; s++) {
        let stitch = row.stitches[s];
        if (stitch.ontoStitch != null && stitch.ontoStitches.length > 0) {
            // TODO make work for >1 stitch (bc currently, a dec of 2 stores only one ontoStitch in ontoStitches) 
            let onto1Pos = stitch.ontoStitch.GetPosition();
            let onto2Pos = stitch.ontoStitches[0].GetPosition();

            let stitchPos = stitch.GetPosition();

            // normalize both ontoStitch to currStitch vectors
            let onto1ToCurr = p5.Vector.sub(stitchPos, onto1Pos);
            onto1ToCurr.normalize();
            onto1ToCurr.mult(stitchLengthMultiplier * stitch.length);
            let newPos1 = p5.Vector.add(onto1Pos, onto1ToCurr);

            let onto2ToCurr = p5.Vector.sub(stitchPos, onto2Pos);
            onto2ToCurr.normalize();
            onto2ToCurr.mult(stitchLengthMultiplier * stitch.length);
            let newPos2 = p5.Vector.add(onto2Pos, onto2ToCurr);

            // find position between the two new ones
            let newPos = p5.Vector.lerp(newPos1, newPos2, 0.5);
            stitch.SetPosition(newPos);

        } else if (stitch.ontoStitch != null) {
            // check current stitch length
            let lenPrev = stitch.GetPosition().dist(stitch.ontoStitch.GetPosition()) / stitchLengthMultiplier;

            // give the stitch the same z-coord as its ontoStitch
            let stitchPos = stitch.GetPosition();
            stitch.SetPosition(createVector(stitchPos.x, stitchPos.y, stitch.ontoStitch.GetPosition().z));

            // get vector from stitch.ontoStitch to stitch
            let vectorOntoCurr = p5.Vector.sub(stitch.GetPosition(), stitch.ontoStitch.GetPosition());

            // normalize the vector, so that its length becomes 1.0
            vectorOntoCurr.normalize();

            // scale the vector, so that its length is the stitch's length
            vectorOntoCurr.mult(stitchLengthMultiplier * stitch.length);

            // position of stitch is then the vector applied to stitch.ontoStitch
            stitch.SetPosition(p5.Vector.add(stitch.ontoStitch.GetPosition(), vectorOntoCurr));

            // check stitch length
            let len = stitch.GetPosition().dist(stitch.ontoStitch.GetPosition()) / stitchLengthMultiplier;
            // if (len != stitch.length) console.log(("stitch length is " + len + " but should be " + stitch.length + " (was " + lenPrev + ")");
            // if (!AreAlmostEqual(len, stitch.length)) console.log(("ALMOST: stitch length is " + len + " but should be " + stitch.length + " (was " + lenPrev + ")");
        }
    }
}

function FindTensionWidthLength(hooksize, yarnweight) {
    // using hooksize and yarnweight, find tensionLength and tensionWidth
    let obj = {len: 1.0, wid: 1.0};

    // bigger hook size will create more space between stitches -> increasing the gauge
    // smaller hook size will create less space between stitches -> decreasing the gauge

    // larger yarn weight will increase gauge
    // smaller yarn weight will decrease gauge

    // the middle ground for tension is with hook size 5 mm and yarn weight medium 



    return obj;
}
