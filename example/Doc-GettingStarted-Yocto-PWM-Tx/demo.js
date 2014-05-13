var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YPwmOutput = yoctolib.YPwmOutput;

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

if(process.argv.length < 5) {
    console.log("usage: demo <serial_number>  <frequency> <dutyCycle>");
    console.log("       demo <logical_name> <frequency> <dutyCycle>");
    console.log("       demo any  <frequency> <dutyCycle>   (use any discovered device)");
    console.log("       <frequency>: integer between 1Hz and 1000000Hz");
    console.log("       <dutyCycle>: floating point number between 0.0 and 100.0");
    process.exit(1);
}

var target;
var pwmoutput1,pwmoutput2;
if(process.argv[2]=="any" ) {
    var anypwmoutput  = YPwmOutput.FirstPwmOutput();   
    if (anypwmoutput==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
    target = anypwmoutput.get_module().get_serialNumber();
} else {
    target = process.argv[2];
}
frequency = process.argv[3];
dutyCycle = process.argv[4];

pwmoutput1  = YPwmOutput.FindPwmOutput(target+".pwmOutput1");   
pwmoutput2  = YPwmOutput.FindPwmOutput(target+".pwmOutput2");

if(pwmoutput1.isOnline()) {
    // output 1 : immediate change
    pwmoutput1.set_frequency(frequency);
    pwmoutput1.set_enabled(YPwmOutput.ENABLED_TRUE);
    pwmoutput1.set_dutyCycle(dutyCycle);
    // output 2 : smooth change
    pwmoutput2.set_frequency(frequency);
    pwmoutput2.set_enabled(YPwmOutput.ENABLED_TRUE);
    pwmoutput2.dutyCycleMove(dutyCycle,3000);
}else{
    console.log("Module not connected (check identification and USB cable)\n");
}
