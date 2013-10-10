var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YModule = yoctolib.YModule;

if(process.argv.length < 3) {
    console.log("usage: savesettings.js <serial> <newLogicalName>");
    process.exit(1);
}

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

var module = YModule.FindModule(process.argv[2]);
if(module.isOnline()) {
    if(process.argv.length >3) {
        var newname = process.argv[3];
        if (!YAPI.CheckLogicalName(newname)) {
            console.log("Invalid name (" + newname + ")");
            process.exit(1);
        }
        module.set_logicalName(newname);
        module.saveToFlash();
    }
    module.wait_async( function() {
        console.log('Current name: '+module.get_logicalName());
    });
} else {
    console.log(process.argv[2]+" not connected (check identification and USB cable)");
}

