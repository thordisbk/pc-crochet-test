
// letegers
const MAX_let = 2147483647;
const MIN_let = -2147483648;

// window size
const WIDTH = 800;
const HEIGHT = 600;

// 'true' prints additional information
// const VERBOSE = true;
const VERBOSE = false;

// 'true' shows the debug GUI
const DEBUG = true;
// debug colors for vertices and stitches
const useVertexStitchColors = true;

const MAX_TESTS = 13;

// in CrochetStructure, for visualization purposes; how far to position vertices from each other TODO add movable perspective
let stitchLengthMultiplier = 30;
let stitchWidthMultiplier = 30;

// size of sphere vertex representation
const sphereRadius = 5;

// in CrochetStructure, if true: fix positions using the center most stitch; if false: use the ontoStitch instead
// let useOriginStitchForCentering = true;
// in Row, if true: create an edge between the first stitch in a row and the last stitch in the previous row
let connectStartEndStitches = true;

const showCentroid = false;

const rotMult = 2.0;

// 'true' selects the hideGUI toggle at startup to hide the GUI (except the debug GUI)
const hideGuiAtStart = false;

const backgroundColor = 230;  // 50;

// let errorMargin = 0.0000001

const YARN_WEIGHTS = [ "lace", "super fine", "fine", "light", "medium", "bulky", "super bulky", "jumbo" ];
const HOOK_SIZES = [ "2.0 mm", "2.25 mm", "2.5 mm", "2.75 mm", "3.0 mm", "3.25 mm", "3.5 mm", "3.75 mm", "4.0 mm", 
                        "4.25 mm", "4.5 mm", "5.0 mm", "5.5 mm", "6.0 mm", "6.5 mm", "7.0 mm", "7.5 mm", "8.0 mm", 
                        "9.0 mm", "10 mm", "12 mm", "15 mm", "16 mm", "19 mm", "25 mm", "35 mm" ];
const STITCH_TYPES = [ "SC", "HDC", "DC", "TR" ];

//

const StitchTypes = {
    CH: 'chain',
    SC: 'single stitch',
    HDC: 'half-double stitch',
    DC: 'double stitch',
    TR: 'treble stitch',
    SLST: 'slip stitch',
    SK: 'skip stitch',
    SLKN: 'slip knot',  // slip knot
    MR: 'magic ring',  // magic ring
    NONE: 'NONE'
}

const StitchDescription = {
    REGULAR: 'regular',
    START: 'start',  // first stitch/knot; StitchTypes.SLKN and StitchTypes.MR only
    INC: 'increase',
    DEC: 'decrease',
    SC2TOG: 'stitch 2 stitches together',
    FLO: 'in front loop only',  // front loop only
    BLO: 'in back loop only',  // back loop only
    NONE: 'NONE'
}

const CrochetType = {
    CIRCULAR: '',
    BACKFORTH: ''
}

const YarnWeight = { 
    LACE: "lace", 
    SUPERFINE: "super fine", 
    FINE: "fine", 
    LIGHT: "light", 
    MEDIUM: "medium", 
    BULKY: "bulky", 
    SUPERBULKY: "super bulky", 
    JUMBO: "jumbo" 
};
