var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YColorLed = yoctolib.YColorLed;

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

if(process.argv.length < 4) {
    console.log("usage: demo <serial_number>  [ color | rgb ]");
    console.log("       demo <logical_name> [ color | rgb ]");
    console.log("       demo any  [ color | rgb ]                (use any discovered device)");
    console.log("Eg.");
    console.log("   demo any 0xFF1493 ");
    console.log("   demo YRGBLED1-123456 red");
    process.exit(1);
}

var color;
if (process.argv[3] == "red")
    color = 0xFF0000;
else if ( process.argv[3] == "green")            
    color = 0x00FF00;
else if (process.argv[3] == "blue")
    color = 0x0000FF;
else 
    color = parseInt(process.argv[3]);

var target;
var led1,led2;
if(process.argv[2]=="any" ) {
    var anyled  = YColorLed.FirstColorLed();   
    if (anyled==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
    target = anyled.get_module().get_serialNumber();
} else {
    target = process.argv[2];
}
led1  = YColorLed.FindColorLed(target+".colorLed1");   
led2  = YColorLed.FindColorLed(target+".colorLed2");   
if(led1.isOnline()) {
    // Change the color in two different ways
    led1.set_rgbColor(color);  // immediate switch
    led2.rgbMove(color,1000);  // smooth transition  
}else{
    console.log("Module not connected (check identification and USB cable)\n");
}