var yoctolib = require('yoctolib');
// 
var YAPI = yoctolib.YAPI;
var YSensor = yoctolib.YSensor;

// Setup the API to use local USB devices
var res =YAPI.RegisterHub('http://127.0.0.1:4444/');

function dumpSensor(sensor, dataset, progress)
{
    var fmt = function(val) {
        var rounded = Math.round(1000*val)/1000;
        return rounded.toString()+sensor.get_unit();
    };   
    
    if(typeof dataset == "undefined") {
        // when called directly: select area to dump
        dataset = sensor.get_recordedData(0, 0);
        progress = 0;
        console.log("Using DataLogger of " + sensor.get_friendlyName());
        console.log("loading summary... ");
    } else {
        // first callback: show summary
        if(typeof sensor.prevProgress == "undefined") {
            var summary = dataset.get_summary();

            console.log("from "+summary.get_startTimeUTC_asDate()+
                        " to "+summary.get_endTimeUTC_asDate()+" : "+
                        "min="+fmt(summary.get_minValue())+
                        " avg= "+fmt(summary.get_averageValue())+
                        " max="+fmt(summary.get_maxValue()));   
        }
        if(progress != sensor.prevProgress) {
            console.log("loading details : "+progress+"%");
        }
        sensor.prevProgress = progress;
    }

    if(progress < 100) {
        dataset.loadMore_async(dumpSensor, sensor);
    } else {
        // load completed: show all results
        var details = dataset.get_measures();
        for(var i = 0; i < details.length; i++) {
            var m = details[i];
            console.log("from "+m.get_startTimeUTC_asDate()+
                        " to "+m.get_endTimeUTC_asDate()+" : "+
                        "min="+fmt(m.get_minValue())+
                        " avg= "+fmt(m.get_averageValue())+
                        " max="+fmt(m.get_maxValue()));
        }        
        YAPI.FreeAPI();
    }
}

var sensor;

if(process.argv.length < 3 || process.argv[2]=="any") {
    sensor = YSensor.FirstSensor();   
    if (sensor==null ) {
        console.log("No sensor connected (check USB cable and firmware version)\n");
        process.exit(1);
    }
} else {
    var target = process.argv[2];
    sensor = YSensor.FindSensor(target);
}
dumpSensor(sensor);

