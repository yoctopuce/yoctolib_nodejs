var yoctolib = require('yoctolib');
// 
var YAPI           = yoctolib.YAPI;
var YTilt          = yoctolib.YTilt;
var YCompass       = yoctolib.YCompass;
var YGyro          = yoctolib.YGyro;
var YAccelerometer = yoctolib.YAccelerometer;


// Setup the API to use local USB devices
YAPI.RegisterHub('http://127.0.0.1:4444/');

// try to find a valid serial number
if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    anytilt = YTilt.FirstTilt();
    if (anytilt==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    var target = process.argv[2];
    anytilt = YTilt.FindTilt(target + ".tilt1");
    if (!anytilt.isOnline())  
     {  console.log("No module connected (check USB cable)\n");
        process.exit(1);
     }    
}

var serial = anytilt.get_module().get_serialNumber();

// find all sensors on the device matching the serial
var tilt1   = YTilt.FindTilt(serial + ".tilt1");
var tilt2   = YTilt.FindTilt(serial + ".tilt2");
var compass = YCompass.FindCompass(serial + ".compass");
var gyro    = YGyro.FindGyro(serial + ".gyro");
var accelerometer = YAccelerometer.FindAccelerometer(serial+".accelerometer");
var count =0;

setInterval(function(){
    if(!tilt1.isOnline()) {
        console.log("module diconnected\n");
        process.exit(1);
    }   
    if (count % 10==0)  console.log("tilt1\ttilt2\tcompass\tacc\tgyro");  
    console.log(tilt1.get_currentValue()+"\t"+
                tilt2.get_currentValue()+"\t"+
                compass.get_currentValue()+"\t"+
                accelerometer.get_currentValue()+"\t"+
                gyro.get_currentValue());
   
    count++;
},250);
