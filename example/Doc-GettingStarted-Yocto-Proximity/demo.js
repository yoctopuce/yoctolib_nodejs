var yoctolib = require('yoctolib');
// 
var YAPI = yoctolib.YAPI;
var YLightSensor = yoctolib.YLightSensor;
var YProximity = yoctolib.YProximity;


// Setup the API to use local USB devices
var res = YAPI.RegisterHub('http://127.0.0.1:4444/');

var proximity;

if (process.argv.length < 3 || process.argv[2] == "any") {
    proximity = YProximity.FirstProximity();
    if (proximity == null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    var target = process.argv[2];
    proximity = YProximity.FindProximity(target + ".proximity1");
    if (!proximity.isOnline()) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
}

var serial = proximity.get_module().get_serialNumber();
var ambiant = YLightSensor.FindLightSensor(serial + ".lightSensor1");
var ir = YLightSensor.FindLightSensor(serial + ".lightSensor2");
setInterval(function () {
    if (!proximity.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    console.log('Proximity: ' + proximity.get_currentValue() +
        " Ambient: " + ambiant.get_currentValue() +
        " IR: " + ir.get_currentValue()
    );
    console.log("  (press Ctrl-C to exit)\n");

}, 1000);
