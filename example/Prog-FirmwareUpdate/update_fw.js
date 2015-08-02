var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YModule = yoctolib.YModule;
var YFirmwareUpdate = yoctolib.YFirmwareUpdate;
var async = require("async");


function update_device_from_Serial(serial, callbackDone) {
    console.log('update serial ' + serial);
    var module = YModule.FindModule(serial);
    var product = module.get_productName();
    var current = module.get_firmwareRelease();

    // check if a new firmware is available on yoctopuce.com
    var newfirm = module.checkFirmware("www.yoctopuce.com", true);
    if (newfirm == "") {
        console.log(product + " " + serial + "(rev=" + current + ") is up to date");
    } else {
        console.log(product + " " + serial + "(rev=" + current + ") need be updated with firmware : ");
        console.log("    " + newfirm);

        // execute the firmware upgrade
        var update = module.updateFirmware(newfirm);
        var status = update.startUpdate();

        function progress_callback() {
            var newstatus = update.get_progress();
            if (newstatus != status)
                console.log(newstatus.toString() + "% " + update.get_progressMessage());
            status = newstatus;
            if (status < 100 && status >= 0) {
                setTimeout(progress_callback, 1000);
            } else {
                progress_conclude(update);
            }
        }

        var progress_conclude = function (update) {
            if (status < 0) {
                callbackDone(status.toString() + " Firmware Update failed: " + update.get_progressMessage());
            } else {
                if (module.isOnline()) {
                    console.log(status.toString() + "% Firmware Updated Successfully!");
                    callbackDone();
                } else {
                    callbackDone(status.toString() + " Firmware Update failed: module " + serial + " is not online");
                }
            }
        };
        progress_callback(update);
    }
}

function update_hubs() {
    async.eachSeries(hubs, update_device_from_Serial, function (err) {
        if (err) {
            console.log('unable to update all hubs : ' + err);
            process.exit(1);
        } else {
            update_devices()
        }
    });
}


function update_shields() {
    async.eachSeries(shields, update_device_from_Serial, function (err) {
        if (err) {
            console.log('unable to update all shields : ' + err);
            process.exit(1);
        } else {
            update_devices()
        }
    });
}

function update_devices() {
    async.eachSeries(devices, update_device_from_Serial, function (err) {
        if (err) {
            console.log('unable to update all devices : ' + err);
            process.exit(1);
        } else {
            console.log('All files have been processed successfully');
        }
    });
}



// Setup the API to use local VirtualHub
var res = YAPI.RegisterHub('http://127.0.0.1:4444/');
var shields = [];
var hubs = [];
var devices = [];


var module = YModule.FirstModule();
while (module) {
    var product = module.get_productName();
    var serial = module.get_serialNumber();
    if (product == "YoctoHub-Shield") {
        shields.push(serial);
    } else if (product.substr(0, 9) == "YoctoHub-") {
        hubs.push(serial);
    } else if (product != "VirtualHub") {
        devices.push(serial);
    }
    module = module.nextModule();
}

update_hubs();


