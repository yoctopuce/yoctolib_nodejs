var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YGenericSensor = yoctolib.YGenericSensor;

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

var target;
var sensor1,sensor2;

if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    var anysensor  = YGenericSensor.FirstGenericSensor();   
    if (anysensor==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
    target = anysensor.get_module().get_serialNumber();
} else {
    target = process.argv[2];
}
sensor1  = YGenericSensor.FindGenericSensor(target+".genericSensor1");   

setInterval(function(){
    if(!sensor1.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    console.log("channel 1 : "+sensor1.get_currentValue() + sensor1.get_unit()) ;
    console.log("  (press Ctrl-C to exit)\n");

},1000);
