
class Pattern {
    // CrochetModel crochetModel;
    // String patternStr;

    // boolean condenseStitches = true;
    // boolean checkForIncreases = true;

    constructor(cs) {
        this.crochetModel = cs;
        this.patternStr = "Pattern:\n";
        let rowCounter = 0;
        for (let r = 0; r < cs.rows.length; r++) {
            let row = cs.rows[r];
            let rowString = "";
            let rowStringList = [];
            if (condenseStitches && !checkForIncreases) {
                for (let i = 0; i < row.stitches.length; i++) {
                    let stitch = row.stitches[i];
                    let currType = stitch.stitchType;
                    let numOfSame = 1;
                    // TODO factor in stitch increases
                    while (i+1 < row.stitches.length && row.stitches[i+1].stitchType == currType) {
                        numOfSame++;
                        i++;
                    }
                    if (numOfSame > 1)
                        rowString += stitch.stitchType + " x" + numOfSame;
                    else
                        rowString += stitch.stitchType;
                    if (i+1 < row.stitches.length)
                        rowString += ", ";
                    else if (endBackForthRowsWithTurn && cs.crochetType == CrochetType.BACKFORTH && rowCounter != 0)
                        rowString += ", turn";
                }
            }
            else if (condenseStitches && checkForIncreases) {
                
                // check the type and description to determine inc and dec
                for (let i = 0; i < row.stitches.length; i++) {
                    let stitch = row.stitches[i];
                    let ontoStitch = null;
                    if (stitch.ontoStitch != null) {
                        ontoStitch = stitch.ontoStitch;
                    }
                    let currType = stitch.stitchType;
                    let currDesc = stitch.stitchDescription;
                    if (currDesc == StitchDescription.INC && stitch.ontoStitch != null) {  // i+1 < row.stitches.length
                        let incNums = stitch.ontoStitch.childStitches.length;
                        i += (incNums-1);

                        let elem = "";
                        if (incNums == 2) elem = stitch.stitchType + "-INC";
                        else {
                            elem = "make " + incNums + " " + currType + " in next stitch";
                            if (cs.crochetType == "CIRCULAR" && i === row.stitches.length-1) elem += " to form a ring"
                        }
                        rowStringList.push(elem);
                    } else if (currDesc == StitchDescription.DEC && stitch.ontoStitch != null) {
                        let decNums = stitch.ontoStitches.length + 1;

                        let elem = "";
                        if (decNums == 2) elem = stitch.stitchType + "-DEC";
                        else elem = "stitch next " + decNums + " " + currType + " stitches together";
                        rowStringList.push(elem);
                    } else if (currDesc == StitchDescription.START && stitch.ontoStitch != null) {
                        let elem = "" + stitch.stitchType;
                        rowStringList.push(elem);
                    } else {  // if (currDesc == StitchDescription.REGULAR)
                        let elem = "" + stitch.stitchType;
                        rowStringList.push(elem);
                    }

                    // add a comma or a TURN to the rowString
                    if (i+1 < row.stitches.length) {
                        rowString += ", ";
                    }
                    else if (endBackForthRowsWithTurn && cs.crochetType == CrochetType.BACKFORTH && rowCounter != 0) {
                        rowString += ", turn";
                        rowStringList.push("turn");
                    }
                }

                if (endCircularRowsWithJoin && cs.crochetType == "CIRCULAR" && r > 0) {
                    let elem = "join";
                    rowStringList.push(elem);
                }
            }
            else {
                // just checks the stitch type and prints that
                //  does not cheack for increases, decreases, or repetitions
                for (let i = 0; i < row.count; i++) {
                    rowString += row.stitches[i].stitchType;
                    if (i < row.count - 1)
                        rowString += ", ";

                    let elem = "" + row.stitches[i].stitchType;
                    rowStringList.push(elem);
                }
            }

            // use the list of row strings to create a row string, look for patterns
            let totalStitches = row.count;
            if (row.stitches[0].stitchType == StitchTypes.SLKN) totalStitches--;
            if (rowStringList.length > 0) {
                let res = this.ListToString(rowStringList);
                this.patternStr += "Row " + rowCounter +  ": " + res + " (" + totalStitches + ")\n";
            }
            else {
                this.patternStr += "Row " + rowCounter +  ": " + rowString + " (" + totalStitches + ")\n";
            }
            rowCounter++;
        }
        this.patternStr += "\n";
    }

    ListToString(rowStringList) {
        // console.log("rowStringList for row " + rowCounter + ":\n");
        // for (let i = 0; i < rowStringList.length; i++) console.log(rowStringList[i] + " ");
        // console.log("\n");

        let newRowString = "";
        for (let i = 0; i < rowStringList.length; i++) {
            // newRowString += rowStringList[i];
            let currStr = "" + rowStringList[i];
            let sameCounter = 0;
            // check if the current repeats
            while (i+1 < rowStringList.length && currStr === rowStringList[i+1]) {
                sameCounter++;
                i++;
            }
            // check if current and next guy repeat
            let sameTwoCounter = 1;
            let nextStr = "";
            if (sameCounter == 0 && i+1 < rowStringList.length) {
                nextStr = "" + rowStringList[i+1];
                let j = i+2;
                while (j < rowStringList.length && j+1 < rowStringList.length) {
                    let thirdStr = "" + rowStringList[j];
                    let fourthStr = "" + rowStringList[j+1];
                    if (currStr === thirdStr && nextStr === fourthStr) {
                        sameTwoCounter++;
                        j += 2;
                        i += 2;
                    }
                    else {
                        break;
                    }
                }
            }

            if (sameCounter > 0) {
                sameCounter++;  // to represent total amount of same stitches
                // newRowString += " x" + sameCounter;
                newRowString += "*" + currStr + "* repeat x" + sameCounter;
            }
            else if (sameTwoCounter > 1) {
                i += 2;  // because of how sameTwoCounter is set
                newRowString += "*" + currStr + ", " + nextStr + "* repeat x" + sameTwoCounter;
            }
            else {
                newRowString += currStr;
            }

            if (i+1 < rowStringList.length) {
                // newRowString += ", ";
                newRowString += ", ";
            }
        }
        
        // console.log("newRowString: " + newRowString + "\n");
        return newRowString; //("Row " + rowCounter +  ": " + newRowString + " (" + rowStringList.length + ")\n");
    }
}

function FormatPatternString(pattern) {
    // TODO split into pages if too many rows
    let formattedPattern = "";

    let maxCharInRow = 75;
    let idxAtRowStart = 0;
    for (let i = 0; i < pattern.length; i++) {
        let currChar = pattern.charAt(i);
        if (currChar == '\n') {
            let subStringRow = pattern.substring(idxAtRowStart, i);  // incl, excl
            idxAtRowStart = i+1;
            // console.log(("substringrow: " + subStringRow);
            let rowList = split(subStringRow, ' ');
            // console.log((rowList);
            let currLength = 0;
            for (let j = 0; j < rowList.length; j++) {
                currLength += rowList[j].length;
                if (currLength > maxCharInRow) {
                    formattedPattern += "\n" + rowList[j] + " ";
                    currLength = rowList[j].length;
                } else {
                    formattedPattern += rowList[j] + " ";
                }
            }
            formattedPattern += "\n";
        }
    }

    return formattedPattern;
}
