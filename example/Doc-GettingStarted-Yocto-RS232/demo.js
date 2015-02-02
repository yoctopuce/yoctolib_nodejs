var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YSerialPort = yoctolib.YSerialPort;


// Setup the API to use local VirtualHub
YAPI.RegisterHub('127.0.0.1');


var serialPort;
if (process.argv.length > 2) {
    serialPort = YSerialPort.FindSerialPort(process.argv[2] + ".serialPort");
} else {
    serialPort = YSerialPort.FirstSerialPort();
    if (serialPort == null) {
        process.stdout.write("No module connected (check USB cable)" + "\n");
        System.exit(1);
    }
}
serialPort.set_serialMode("9600,8N1");
serialPort.set_protocol("Line");
serialPort.reset();

process.stdin.setEncoding('utf8');
process.stdout.write("Type line to send, or Ctrl-C to exit:\n");
process.stdin.on('readable', function () {
    var line = process.stdin.read();
    if (line != '') {
        serialPort.writeLine(line);
        setTimeout(function () {
            var response = serialPort.readLine();
            if (response != '')
                process.stdout.write("Received: " + response);
        }, 500);

    }
});

