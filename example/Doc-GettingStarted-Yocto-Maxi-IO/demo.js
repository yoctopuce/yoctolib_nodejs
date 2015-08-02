var yoctolib = require('yoctolib');
// 
var YAPI = yoctolib.YAPI;
var YDigitalIO = yoctolib.YDigitalIO;


// Setup the API to use local USB devices
var res =YAPI.RegisterHub('http://127.0.0.1:4444/');

var io;

if(process.argv.length < 3 ||  process.argv[2]=="any" ) {
    io  = YDigitalIO.FirstDigitalIO();   
    if (io==null ) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    var target = process.argv[2];
    io  = YDigitalIO.FindDigitalIO(target+".carbonDioxide");   
}

// make sure the device is here
if(!io.isOnline()) {
    console.log("Module not connected (check identification and USB cable)\n");
    process.exit(1);
}

// lets configure the channels direction
// bits 0..3 as output
// bits 4..7 as input
io.set_portDirection(0x0F);
io.set_portPolarity(0); // polarity set to regular
io.set_portOpenDrain(0); // No open drain

console.log("Channels 0..3 are configured as outputs and channels 4..7");
console.log("are configred as inputs, you can connect some inputs to");
console.log("ouputs and see what happens");

var outputdata = 0;

setInterval(function () {
    if(!io.isOnline()) {
        console.log("Module disconnected (check identification and USB cable)\n");
        process.exit(1);
    }

    outputdata = (outputdata + 1) % 16; // cycle ouput 0..15
    io.set_portState(outputdata); // We could have used set_bitState as well

    // set is asynchronous and get is synchronous, we cannot mix them
    io.wait_async( function() {
        var inputdata = io.get_portState(); // read port values
        var line = "";  // display port value as binary
        for (var i = 0; i < 8; i++) {
            if ((inputdata & (128 >> i))>0) 
                line = line + '1'; 
            else 
                line = line + '0';
        }
        console.log("port value = "+line);
    },null);             
},1000);
