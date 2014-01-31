var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YDataLogger = yoctolib.YDataLogger;

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

var logger;
if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    logger = YDataLogger.FirstDataLogger();    
    if (logger == null) {
        console.log("No datalogger connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    logger = YDataLogger.FindDataLogger(process.argv[2]+".dataLogger");
    if (!logger.isOnline()) {
        console.log("Datalogger not connected (check USB cable)\n");
        process.exit(1);
    }
}

console.log("Using DataLogger of " + logger.module().get_serialNumber());
var streams = [];

// Handle recorder on/off state
// Dump list of available streams
logger.get_dataStreams(streams);
console.log("Available data streams in the data logger:");
console.log("Run\tRelative time\tUTC time\tMeasures interval");
for(var i = 0; i < streams.length; i++) {
    var stream = streams[i];
    var run = stream.get_runIndex();
    var time = stream.get_startTime();
    var utc = stream.get_startTimeUTC();
    var itv = stream.get_dataSamplesInterval();
    console.log(run+"\t"+time+"\t"+utc+"\t"+itv);
    var names = stream.get_columnNames();
    var line = '';
    for(var c = 0; c < names.length; c++) {
        line += names[c]+"\t";
    }
    console.log(line);
    var table = stream.get_dataRows();
    for(var r = 0; r < table.length; r++) {
        var row = table[r];
        var rline = '';
        for(var col = 0; col < row.length; col++) {
            rline += row[col]+ "\t";
        }
        console.log(rline);
    }
}

YAPI.FreeAPI();
