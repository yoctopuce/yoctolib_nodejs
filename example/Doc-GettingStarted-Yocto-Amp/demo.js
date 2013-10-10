var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YCurrent = yoctolib.YCurrent;

// Setup the API to use local VirtualHub
var res =YAPI.RegisterHub('http://127.0.0.1:4444/');

var target;
if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    var anysensor  = YCurrent.FirstCurrent();   
    if (anysensor==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
    target = anysensor.get_module().get_serialNumber();
} else {
    target = process.argv[2];
}

var sensorDC  = YCurrent.FindCurrent(target+".current1");   
var sensorAC  = YCurrent.FindCurrent(target+".current2");   

setInterval(function(){
    if(!sensorDC.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    console.log("DC : "+sensorDC.get_currentValue());
    console.log("AC : "+sensorAC.get_currentValue());
    console.log("  (press Ctrl-C to exit)\n");
},1000);

