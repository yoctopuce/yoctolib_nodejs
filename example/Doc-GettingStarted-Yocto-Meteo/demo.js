var yoctolib = require('yoctolib');
// 
var YAPI = yoctolib.YAPI;
var YHumidity = yoctolib.YHumidity;
var YTemperature = yoctolib.YTemperature;
var YPressure = yoctolib.YPressure;


// Setup the API to use local USB devices
YAPI.RegisterHub('http://127.0.0.1:4444/');

if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    hsensor = YHumidity.FirstHumidity();
    tsensor = YTemperature.FirstTemperature();
    psensor = YPressure.FirstPressure();
    if (hsensor==null || tsensor==null || psensor==null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    var target = process.argv[2];
    hsensor = YHumidity.FindHumidity(target + ".humidity");
    tsensor = YTemperature.FindTemperature(target + ".temperature");
    psensor = YPressure.FindPressure(target + ".pressure");        
}

setInterval(function(){
    if(!hsensor.isOnline()) {
        console.log("Module not connected (check identification and USB cable)\n");
        process.exit(1);
    }
    
    console.log("Current humidity: "    + hsensor.get_currentValue() + " %RH");
    console.log("Current temperature: " + tsensor.get_currentValue() + " °C");
    console.log("Current pressure: "    + psensor.get_currentValue() + " hPa");
    console.log("  (press Ctrl-C to exit)\n");

},1000);
