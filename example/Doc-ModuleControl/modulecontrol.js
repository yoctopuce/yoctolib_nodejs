var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YModule = yoctolib.YModule;

if(process.argv.length < 3) {
    console.log("usage: modulecontrol.js <serial or logical name> [ON/OFF]");
    process.exit(1);
}

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

var module = YModule.FindModule(process.argv[2]);
if(module.isOnline()) {
    if(process.argv.length == 4) {
        if (process.argv[3] == "ON") 
            module.set_beacon(module.BEACON_ON);
        else  
            module.set_beacon(module.BEACON_OFF);
    }
    module.wait_async( function() {
        console.log('serial:       '+module.get_serialNumber());
        console.log('logical name: '+module.get_logicalName());
        console.log('luminosity:   '+module.get_luminosity()+'%');
        console.log('beacon:       '+(module.get_beacon()==YModule.BEACON_ON?'ON':'OFF'));
        console.log('upTime:       '+parseInt(module.get_upTime()/1000)+' sec');
        console.log('USB current:  '+module.get_usbCurrent()+' mA');
        console.log('logs:');
        console.log(module.get_lastLogs());
    });
} else {
    console.log(process.argv[2]+" not connected (check identification and USB cable)");
}
