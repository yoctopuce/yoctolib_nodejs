var yoctolib = require('yoctolib');
// 
var YAPI = yoctolib.YAPI;
var YRangeFinder = yoctolib.YRangeFinder;
var YLightSensor = yoctolib.YLightSensor;
var YTemperature = yoctolib.YTemperature;

// Setup the API to use local USB devices
var res = YAPI.RegisterHub('http://127.0.0.1:4444/');

var rf;

if (process.argv.length < 3 || process.argv[2] == "any") {
    rf = YRangeFinder.FirstProximity();
    if (rf == null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    var target = process.argv[2];
    rf = YRangeFinder.FindProximity(target + ".rangeFinder1");
    if (!rf.isOnline()) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
}

var serial = rf.get_module().get_serialNumber();
var ir = YLightSensor.FindLightSensor(serial + ".lightSensor1");
var tmp = YTemperature.FindTemperature(serial + ".temperature1");
setInterval(function () {
    if (!proximity.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    console.log("Distance    : " + rf.get_currentValue() +
        "Ambiant IR  : " + ir.get_currentValue() +
        "Temperature : " + tmp.get_currentValue()
    );
    console.log("  (press Ctrl-C to exit)\n");
}, 1000);
