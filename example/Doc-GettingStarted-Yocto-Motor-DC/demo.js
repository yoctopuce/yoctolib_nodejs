var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YMotor = yoctolib.YMotor;
var YCurrent = yoctolib.YCurrent;
var YVoltage = yoctolib.YVoltage;
var YTemperature = yoctolib.YTemperature;

function showStatus()
{ 
    var errmsg;
    // display motor status
    console.log( "Status="  + motor.get_advertisedValue() + "  " +
                 "Voltage=" + voltage.get_currentValue() + "V  "  +
                 "Current=" + current.get_currentValue()/1000 +"A  " +
                 "Temp="    + temperature.get_currentValue() + "deg C");
    YAPI.Sleep(1000,errmsg); // wait for one second
    motor.wait_async(showStatus);
}

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

if (process.argv.length < 3) {
    console.log("usage: demo <serial_number> <channel> power");
    console.log("       demo <logical_name> <channel> power");
    console.log("       demo any <channel> power (use any discovered device)");
    console.log("       power is an integer between -100 and 100%");
    console.log("example:");
    console.log("       demo any 75");
    process.exit(1);
}

var target,power;
var power = process.argv[3]

if (process.argv[2]=="any" ) {
    // find the serial# of the first available motor
    var anymotor  = YMotor.FirstMotor();
    if (anymotor==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
    target = anymotor.get_module().get_serialNumber();
} else {
    target = process.argv[2];
}

motor    = YMotor.FindMotor(target+".motor");
current  = YCurrent.FindCurrent(target+".current");
voltage  = YVoltage.FindVoltage(target+".voltage");
temperature = YTemperature.FindTemperature(target+".temperature");

// lets start the motor
if (motor.isOnline()) {
    // if the motor is in error state, reset it.
    if ( motor.get_motorStatus()>=YMotor.MOTORSTATUS_LOVOLT)  
        motor.resetStatus();
    motor.drivingForceMove(power,2000);  // ramp up to power in 2 seconds      
    motor.wait_async(showStatus);	  
} else {
    console.log( "Module not connected (check identification and USB cable)");
}