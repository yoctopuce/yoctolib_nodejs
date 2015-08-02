var yoctolib = require('yoctolib');
// 
var YAPI = yoctolib.YAPI;
var YGps = yoctolib.YGps;

// Setup the API to use local USB devices
var res =YAPI.RegisterHub('http://127.0.0.1:4444/');

var gps;

if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    gps  = YGps.FirstGps();   
    if (gps==null ) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    var target = process.argv[2];
    gps  = YGps.FindGps(target+".gps");   
}

setInterval( function() {
    if(!gps.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    if (gps.get_isFixed()!=Y_ISFIXED_TRUE)  
        console.log("fixing");
     else
       console.log(gps.get_latitude() + " " + gps.get_longitude()) ;
    console.log("  (press Ctrl-C to exit)\n");

},1000);
