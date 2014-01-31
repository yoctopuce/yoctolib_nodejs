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

var l1 = disp.get_displayLayer(1);
var l2 = disp.get_displayLayer(2);
var centerX = disp.get_displayWidth() / 2;
var centerY = disp.get_displayHeight() / 2;
var radius  = disp.get_displayHeight() / 2;
var a=0.0;

disp.resetAll();
l1.hide();    // L1 is hidden, l2 stay visible
setTimeout(refresh,20);

// this is the recusive function to draw 1/3nd of the Von Koch flake
function recursiveLine(layer,  x0,  y0,  x1,  y1 ,   deep)
{  
    if (deep<=0) {
        layer.moveTo(parseInt(x0+0.5),parseInt(y0+0.5));
        layer.lineTo(parseInt(x1+0.5),parseInt(y1+0.5));
	} else {
        var dx = (x1-x0) /3;
        var dy = (y1-y0) /3;
        var mx =  ((x0+x1) / 2) +  (0.87 *(y1-y0) / 3);
        var my =  ((y0+y1) / 2) -  (0.87 *(x1-x0) / 3);
        recursiveLine(layer,x0,y0,x0+dx,y0+dy,deep-1);
        recursiveLine(layer,x0+dx,y0+dy,mx,my,deep-1);
        recursiveLine(layer,mx,my,x1-dx,y1-dy,deep-1);
        recursiveLine(layer,x1-dx,y1-dy,x1,y1,deep-1);
	}
}

function refresh()
{    
    // we draw in the hidden layer
    l1.clear();
    for (var i=0 ;i< 3;i++) {
        recursiveLine(l1,centerX + radius*Math.cos(a+i*2.094),
                         centerY + radius*Math.sin(a+i*2.094) ,
                         centerX + radius*Math.cos(a+(i+1)*2.094),
                         centerY + radius*Math.sin(a+(i+1)*2.094), 2);
    }
    // then we swap contents with the visible layer

    disp.swapLayerContent(1,2);
    // change the flake angle
    a+=0.1257;
    disp.wait_async(refresh);
}

