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
var bytesPerLines = parseInt(w / 8);

var max_iteration = 50;
var targetX  = 0.834555980181972;
var targetY  = 0.204552998862566;
var zoom     = 1;
var distance = 1;
var data = new Buffer(h*bytesPerLines);
data.fill(0);

// display cleanup
disp.resetAll();
setTimeout(refresh,20);

function refresh()
{    
    for(var i=0 ;i< data.length; i++)  data[i]=0;
    distance = distance *0.95;
    var centerX =  targetX * (1-distance);
    var centerY =  targetY * (1-distance);
    max_iteration = parseInt(0.5+max_iteration  + Math.sqrt(zoom) );
    if (max_iteration > 1500)  max_iteration = 1500;
    for (var j = 0;j < h; j++) {
        for (var i = 0;i < w; i++) 
        {
            x0 = (((i - w/2.0) / (w/8))/zoom)-centerX;
            y0 = (((j - h/2.0) / (w/8))/zoom)-centerY;
            x = 0;
            y = 0;

            iteration = 0;
            while ((x*x + y*y < 4) && (iteration < max_iteration )) 
            {
                xtemp = x*x - y*y + x0;
                y = 2*x*y + y0;
                x = xtemp;
                iteration += 1;
            }

            if (iteration>=max_iteration) {
                data[j*bytesPerLines + (i >> 3)] |=  (128 >> (i & 7));        
            }
        }
    }
    l0.drawBitmap(0,0,w,data,0);
    zoom =zoom / 0.95;
    disp.wait_async(refresh);
}
