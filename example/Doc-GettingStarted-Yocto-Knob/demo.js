var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YAnButton = yoctolib.YAnButton;

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

var target;
var input1,input5;

if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    var anyinput  = YAnButton.FirstAnButton();   
    if (anyinput==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
    target = anyinput.get_module().get_serialNumber();
} else {
    target = process.argv[2];
}
input1  = YAnButton.FindAnButton(target+".anButton1");   
input5  = YAnButton.FindAnButton(target+".anButton5");   

setInterval(function(){
    if(!input1.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    console.log("Button1: "+(input1.get_isPressed()?"pressed    ":"not pressed")+
        " - analog value: " + input1.get_calibratedValue() );
    console.log("Button5: "+(input5.get_isPressed()?"pressed    ":"not pressed")+
        " - analog value: " + input5.get_calibratedValue() );
    console.log("  (press Ctrl-C to exit)\n");
},1000);

