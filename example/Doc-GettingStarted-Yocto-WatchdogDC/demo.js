var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YWatchdog = yoctolib.YWatchdog;

if(process.argv.length < 4) {
    console.log("usage: demo <serial_number>  [ on | off | reset ]");
    console.log("       demo <logical_name> [ on | off | reset ]");
    console.log("       demo any  [ on | off | reset ]                (use any discovered device)");
    process.exit(1);
}

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

var watchdog;
if(process.argv[2]=="any" ) {
    watchdog = YWatchdog.FirstWatchdog();   
    if (watchdog==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    watchdog = YWatchdog.FindWatchdog(process.argv[2]+".watchdog1");   
}

if(watchdog.isOnline()) {
    if (process.argv[3] == "on")    watchdog.set_running(YWatchdog.RUNNING_ON);
    if (process.argv[3] == "off")   watchdog.set_running(YWatchdog.RUNNING_OFF);
    if (process.argv[3] == "reset") watchdog.resetWatchdog();
}else{
    console.log("Module not connected (check identification and USB cable)\n");
}
