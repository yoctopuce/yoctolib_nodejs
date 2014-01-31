var yoctolib = require('yoctolib');
// 
var YAPI = yoctolib.YAPI;
var YSensor = yoctolib.YSensor;

// Setup the API to use local USB devices
var res = YAPI.RegisterHub('http://127.0.0.1:4444/');

var sensor = YSensor.FirstSensor();   
if (sensor == null ) {
    console.log("No sensor connected (check USB cable and firmware version)\n");
    process.exit(1);
}

setInterval( function() {
    sensor = YSensor.FirstSensor();
    while(sensor != null) {
        console.log(sensor.get_friendlyName()+": "+sensor.get_currentValue() + " " + sensor.get_unit()) ;
        sensor = sensor.nextSensor();
    }
    console.log("  (press Ctrl-C to exit)\n");

},1000);
