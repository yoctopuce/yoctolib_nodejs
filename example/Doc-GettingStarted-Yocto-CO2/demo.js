var yoctolib = require('yoctolib');
// 
var YAPI = yoctolib.YAPI;
var YCarbonDioxide = yoctolib.YCarbonDioxide;


// Setup the API to use local USB devices
var res =YAPI.RegisterHub('http://127.0.0.1:4444/');

var sensor;

if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    sensor  = YCarbonDioxide.FirstCarbonDioxide();   
    if (sensor==null ) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    var target = process.argv[2];
    sensor  = YCarbonDioxide.FindCarbonDioxide(target+".carbonDioxide");   
}


setInterval( function() {
    if(!sensor.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    console.log("CO2 1 : "+sensor.get_currentValue() + sensor.get_unit()) ;
    console.log("  (press Ctrl-C to exit)\n");

},1000);

