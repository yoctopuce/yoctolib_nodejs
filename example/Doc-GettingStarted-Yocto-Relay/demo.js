var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YRelay = yoctolib.YRelay;

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

if (process.argv.length < 5) {
    console.log("usage: demo <serial_number> <channel> [ A | B ]");
    console.log("       demo <logical_name> <channel> [ A | B ]");
    console.log("       demo any <channel> [ A | B ]                (use any discovered device)");
    process.exit(1);
}

var target;
if (process.argv[2]=="any" ) {
    var anyrelay  = YRelay.FirstRelay();   
    if (anyrelay==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
    target = anyrelay.get_module().get_serialNumber();
} else {
    target = process.argv[2];
}

console.log("Set ouput " + process.argv[3] + " of " + target + " to " + process.argv[4]);
var relay  = YRelay.FindRelay(target + ".relay" + process.argv[3]);   
if (relay.isOnline()) {
    relay.set_state(process.argv[4] == "A" ? YRelay.STATE_A : YRelay.STATE_B);
} else {
    console.log("Module not connected (check identification and USB cable)\n");
}
