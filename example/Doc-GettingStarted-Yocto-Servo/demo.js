var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YServo = yoctolib.YServo;

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

if(process.argv.length < 4) {
    console.log("usage: demo <serial_number>  [ -1000 | ... | 1000 ]");
    console.log("       demo <logical_name> [ -1000 | ... | 1000 ]");
    console.log("       demo any  [ -1000 | ... | 1000 ]                (use any discovered device)");
    process.exit(1);
}


var target;
var servo1,servo5;
if(process.argv[2]=="any" ) {
    var anyservo  = YServo.FirstServo();   
    if (anyservo==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
    target = anyservo.get_module().get_serialNumber();
} else {
    target = process.argv[2];
}
servo1  = YServo.FindServo(target+".servo1");   
servo5  = YServo.FindServo(target+".servo5");   
if(servo1.isOnline()) {
    // Change the color in two different ways
    servo1.set_position(process.argv[3]);  // immediate switch
    servo5.move(process.argv[3],1000);  // smooth transition  
}else{
    console.log("Module not connected (check identification and USB cable)\n");
}
