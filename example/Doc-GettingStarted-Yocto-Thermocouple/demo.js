var yoctolib = require('yoctolib');
// 
var YAPI = yoctolib.YAPI;
var YTemperature = yoctolib.YTemperature;


// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

var target;
if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    var anytemperature  = YTemperature.FirstTemperature();   
    if (anytemperature==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
    target = anytemperature.get_module().get_serialNumber();
} else {
    target = process.argv[2];
}
var temperature1  = YTemperature.FindTemperature(target+".temperature1");   
var temperature2  = YTemperature.FindTemperature(target+".temperature2");   

setInterval(function(){
    if(!temperature1.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    
    console.log("channel 1 temperature: " + temperature1.get_currentValue() + " °C");
    console.log("channel 2 temperature: " + temperature2.get_currentValue() + " °C");
    console.log("  (press Ctrl-C to exit)\n");

},1000);
