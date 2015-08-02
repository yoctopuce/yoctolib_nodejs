var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YLed = yoctolib.YLed;

if(process.argv.length < 4) {
    console.log("usage: demo <serial_number>  [ on | off ]");
    console.log("       demo <logical_name> [ on | off ]");
    console.log("       demo any  [ on | off ]                (use any discovered device)");
    process.exit(1);
}

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

var led
if(process.argv[2]=="any" ) {
    led = YLed.FirstLed();   
    if (led==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    led = YLed.FindLed(process.argv[2]+".led");   
}

if(led.isOnline()) {
    led.set_power(process.argv[3] == "on" ? led.POWER_ON : led.POWER_OFF);
}else{
    console.log("Module not connected (check identification and USB cable)\n");
}
