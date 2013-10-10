var yoctolib = require('yoctolib');
// 
var YAPI = yoctolib.YAPI;
var YLightSensor = yoctolib.YLightSensor;


// Setup the API to use local USB devices
var res =YAPI.RegisterHub('http://127.0.0.1:4444/');

var sensor;

if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    sensor  = YLightSensor.FirstLightSensor();   
    if (sensor==null ) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    var target = process.argv[2];
    sensor  = YLightSensor.FindLightSensor(target+".carbonDioxide");   
}


setInterval(function(){
    if(!sensor.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    console.log("Current ambiant light : "+sensor.get_currentValue() + " lx") ;
    console.log("  (press Ctrl-C to exit)\n");

},1000);
