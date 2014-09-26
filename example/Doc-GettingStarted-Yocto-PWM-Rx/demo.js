var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YPWM = yoctolib.YPwmInput;

// Setup the API to use local VirtualHub
var res =YAPI.RegisterHub('http://127.0.0.1:4444/');

var target;
if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    var anypwm  = YPwmInput.FirstPwmInput();   
    if (anypwm==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
    target = anypwm.get_module().get_serialNumber();
} else {
    target = process.argv[2];
}

var pwm1  = YPwmInput.FindPwmInput(target+".pwmInput1");   
var pwm2  = YPwmInput.FindPwmInput(target+".pwmInput2");   

setInterval(function(){
    if(!pwm1.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    console.log("PWM1 : "+pwm1.get_frequency() +"Hz "
                         +pwm1.get_dutyCycle() +"% "
                         +pwm1.get_pulseCounter() +" pulse Edge ");
    console.log("PWM2 : "+pwm2.get_frequency() +"Hz "
                         +pwm2.get_dutyCycle() +"% "
                         +pwm2.get_pulseCounter() +" pulse Edge ");
    console.log("  (press Ctrl-C to exit)\n");
},1000);
