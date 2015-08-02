var yoctolib = require('yoctolib');
// 
var YAPI = yoctolib.YAPI;
var YVoc = yoctolib.YVoc;


// Setup the API to use local USB devices
var res =YAPI.RegisterHub('http://127.0.0.1:4444/');

var sensor;

if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    sensor  = YVoc.FirstVoc();   
    if (sensor==null ) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    var target = process.argv[2];
    sensor  = YVoc.FindVoc(target+".voc");   
}


setInterval( function() {
    if(!sensor.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    console.log("VOC : "+sensor.get_currentValue() + " ppm") ;
    console.log("  (press Ctrl-C to exit)\n");
},1000);
