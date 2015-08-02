var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YDisplay = yoctolib.YDisplay;
var YDisplayLayer = yoctolib.YDisplayLayer;

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

var disp;
if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    disp = YDisplay.FirstDisplay();    
    if (disp==null ) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    disp = Display.FindDisplay(process.argv[2]+".display");
}

// retrieve the display size
var w = disp.get_displayWidth();
var h = disp.get_displayHeight();

// retrieve the first layer
var l0 = disp.get_displayLayer(0);

var count = 8
var coord = new Array(2*count)
// precompute the "leds" position
ledwidth = (w / count);
for (var i=0 ; i<count ;i++) {  
    coord[i] = i *ledwidth;
    coord[2*count-i-2] = coord[i] ;
}

var frameCount = 2*count-2;

// retreive the display size 
disp.resetAll();


// start recording
disp.newSequence();

// build one loop for recording
for (var i = 0; i < frameCount; i++) {
    l0.selectColorPen(0);
    l0.drawBar(coord[(i+frameCount-1) % frameCount], h-1,coord[(i+frameCount-1) % frameCount]+ledwidth, h-4);
    l0.selectColorPen(0xffffff);
    l0.drawBar(coord[i], h-1, coord[i]+ledwidth, h-4);
    disp.pauseSequence(50);  // records a 50ms pause.
}
// self-call : causes an endless looop
disp.playSequence("K2000.seq");
// stop recording and save to device filesystem
disp.saveSequence("K2000.seq");

// play the sequence
disp.playSequence("K2000.seq");

