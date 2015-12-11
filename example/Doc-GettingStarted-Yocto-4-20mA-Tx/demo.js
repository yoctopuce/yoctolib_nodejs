var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YCurrentLoopOutput = yoctolib.YCurrentLoopOutput;
// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');
if (process.argv.length < 5) {
    console.log("usage: demo <serial_number>  <current> ");
    console.log("       demo <logical_name> <current> ");
    console.log("       demo any  <current>    (use any discovered device)");
    console.log("       <current>: floating point number between 3.00 and 21.00 mA");
    process.exit(1);
}
var target;
var loop, pwmoutput2;
if (process.argv[2] == "any") {
    var anyloop = YCurrentLoopOutput.FirstCurrentLoopOutput();
    if (anyloop == null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
    target = anyloop.get_module().get_serialNumber();
}
else {
    target = process.argv[2];
}
value = process.argv[3];
loop = YCurrentLoopOutput.FindCurrentLoopOutput(target + ".currentLoopOutput");
if (loop.isOnline()) {
    loop.set_cuurent(value);
    switch (loop.get_loopPower()) {
    case Y_LOOPPOWER_POWEROK:
        console.log('Loop is powered');
        break;
    case Y_LOOPPOWER_LOWPWR:
        console.log('Insufficient loop Voltage');
        break;
    default  :
        console.log('Loop is not Powered');
        break;
    }
}
else {
    console.log("Module not connected (check identification and USB cable)\n");
}
