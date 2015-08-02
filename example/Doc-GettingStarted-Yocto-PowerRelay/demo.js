var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YRelay = yoctolib.YRelay;

if(process.argv.length < 4) {
    console.log("usage: demo <serial_number>  [ A | B ]");
    console.log("       demo <logical_name> [ A | B ]");
    console.log("       demo any  [ A | B ]                (use any discovered device)");
    process.exit(1);
}

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

var relay
if(process.argv[2]=="any" ) {
    relay = YRelay.FirstRelay();   
    if (relay==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    relay = YRelay.FindRelay(process.argv[2]+".relay");   
}

if(relay.isOnline()) {
    relay.set_state(process.argv[3] == "A" ? relay.STATE_A : relay.STATE_B);
}else{
    console.log("Module not connected (check identification and USB cable)\n");
}
