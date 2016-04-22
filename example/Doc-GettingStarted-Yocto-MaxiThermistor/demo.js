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
var temperature3  = YTemperature.FindTemperature(target+".temperature3");
var temperature4  = YTemperature.FindTemperature(target+".temperature4");
var temperature5  = YTemperature.FindTemperature(target+".temperature5");
var temperature6  = YTemperature.FindTemperature(target+".temperature6");


setInterval(function(){
    if(!temperature1.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }

    process.stdout.write("|  1: " + temperature1.get_currentValue() );
    process.stdout.write("|  2: " + temperature2.get_currentValue() );
    process.stdout.write("|  3: " + temperature3.get_currentValue() );
    process.stdout.write("|  4: " + temperature4.get_currentValue() );
    process.stdout.write("|  5: " + temperature5.get_currentValue() );
    process.stdout.write("|  6: " + temperature6.get_currentValue() );
    process.stdout.write("| °C |\n");

},1000);
