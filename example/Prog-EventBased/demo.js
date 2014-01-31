var yoctolib = require('yoctolib');
//
var YAPI = yoctolib.YAPI;
var YModule = yoctolib.YModule;
var YSensor = yoctolib.YSensor;
var YAnButton = yoctolib.YAnButton;

console.log("NOTE: This example is provided for reference, but is currently");
console.log("      not usable due to a limitation in the implementation of");
console.log("      node.js XMLHttpRequest, which does not support continuous");
console.log("      updates of request data for the notification channel.");

function valueChangeCallBack(obj_fct, str_value)
{
    // the field to update is stored in the function userData
    var info = obj_fct.get_userData();
    console.log(info.name+': '+str_value+' '+info.unit+' (new value)');
}

function timedReportCallBack(obj_fct, obj_measure)
{
    // the field to update is stored in the function userData
    var info = obj_fct.get_userData();
    console.log(info.name+': '+obj_measure.get_averageValue()+' '+info.unit+' (timed report)');
}

function deviceArrival(module)
{
    var serial = module.get_serialNumber();
    console.log("New module: "+serial);
    
    // First solution: look for a specific type of function (eg. anButton)
    var fctcount = module.functionCount();
    for (var i = 0; i < fctcount; i++)
    {
        var hardwareId = serial + "." + module.functionId(i);         
        if (hardwareId.indexOf(".anButton") > 0) { 
            console.log("- "+hardwareId);
            var anButton = YAnButton.FindAnButton(hardwareId);
            anButton.set_userData({name:hardwareId,unit:''});
            anButton.registerValueCallback(valueChangeCallBack);
        }
    }
    
    // Alternate solution: register any kind of sensor on the device
    var sensor = YSensor.FirstSensor();
    while(sensor) {
        if(sensor.get_module().get_serialNumber() == serial) {
            console.log("- "+sensor.get_hardwareId());
            sensor.set_userData({name:sensor.get_hardwareId(),unit:sensor.get_unit()});
            sensor.registerValueCallback(valueChangeCallBack);
            sensor.registerTimedReportCallback(timedReportCallBack);
        }
        sensor = sensor.nextSensor();
    }
}

function deviceRemoval(module)
{
    var serial = module.get_serialNumber();
    console.log("Module "+serial+" disconnected");
}

function handleHotPlug()
{
    YAPI.SetTimeout(handleHotPlug,100);
}

YAPI.RegisterHub_async('http://127.0.0.1:4444/', function(ctx,res,errmsg) 
{
    if(res != YAPI.SUCCESS) {
        throw new Error("Cannot contact VirtualHub on 127.0.0.1");
    }
    YAPI.RegisterDeviceArrivalCallback(deviceArrival);
    YAPI.RegisterDeviceRemovalCallback(deviceRemoval);
    YAPI.SetTimeout(handleHotPlug,100);
});
