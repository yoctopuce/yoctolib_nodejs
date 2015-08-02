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

// retreive the display size
var w=disp.get_displayWidth();
var h=disp.get_displayHeight();

disp.resetAll();

// retreive the  first layer
var l0=disp.get_displayLayer(0);
l0.clear();

// display a text in the middle of the screen
l0.drawText(w / 2, h / 2, YDisplayLayer.ALIGN_CENTER, "Hello world!" );
// visualize each corner
l0.moveTo(0,5);l0.lineTo(0,0);l0.lineTo(5,0);
l0.moveTo(0,h-6);l0.lineTo(0,h-1);l0.lineTo(5,h-1);
l0.moveTo(w-1,h-6);l0.lineTo(w-1,h-1);l0.lineTo(w-6,h-1);
l0.moveTo(w-1,5);l0.lineTo(w-1,0);l0.lineTo(w-6,0);

// draw a circle in the top left corner of layer 1
var l1=disp.get_displayLayer(1);
l1.clear();
l1.drawCircle(h / 8, h / 8, h / 8);

var x=0; 
var y=0; 
var vx=1; 
var vy=1;

setInterval(function (){    
    x+=vx;y+=vy;
    if ((x<0) || (x>w-(h / 4)))  vx=-vx;
    if ((y<0) || (y>h-(h / 4)))  vy=-vy;
    l1.setLayerPosition(x,y,0);
},20);


