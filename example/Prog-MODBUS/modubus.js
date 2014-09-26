var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YSerialPort = yoctolib.YSerialPort;


// Setup the API to use local VirtualHub
YAPI.RegisterHub('127.0.0.1');


var serialPort;
if (process.argv.length > 2) {
    serialPort = YSerialPort.FindSerialPort(process.argv[2]);
} else {
    serialPort = YSerialPort.FirstSerialPort();
    if (serialPort == null) {
        process.stdout.write("No module connected (check USB cable)"+"\n");
        System.exit(1);
    }
}

var target = { slave:0, reg:0 };
var g_step = 1;


process.stdin.setEncoding('utf8');
process.stdout.write("Please enter the MODBUS slave address (1...255)\n");
process.stdout.write("Slave: ");

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    var val = parseInt(chunk);
    switch (g_step) {
        case 1:
            if (val < 1 || val > 255){
                process.stdout.write("invalid slave number");
            }else{
                target.slave = val
                g_step++;
                process.stdout.write("Slave = "+target.slave);
                process.stdout.write("Please select a Coil No (>=1), Input Bit No (>=10001+),\n");
                process.stdout.write("       Register No (>=30001) or Input Register No (>=40001)\n");
                process.stdout.write("No: ");
            }
            break;
        case 2:
            if(val < 1 || val >= 50000 || (val % 10000) == 0) {
                process.stdout.write("invalid register number");
            }else{
                target.reg = val;
                printModbusValue(target.slave,target.reg);
                g_step++;
                process.stdout.write("Press ENTER to read again, Q to quit");
                if((target.reg % 30000) < 10000) {
                    process.stdout.write(" or enter a new value");
                }
                process.stdout.write(": ");
            }
            break;
        case 3:
            if(chunk.charAt(0) == 'q' || chunk.charAt(0) == 'Q') {
                YAPI.FreeAPI();
                process.exit(0);
            }
            if (chunk.charAt(0) != 'r' && chunk.charAt(0) != 'R' && (target.reg % 30000) < 10000) {
                if(target.reg >= 30001) {
                    serialPort.modbusWriteRegister(target.slave, target.reg - 30001, val);
                } else {
                    serialPort.modbusWriteBit(target.slave, target.reg - 1, val);
                }
            }
            printModbusValue(target.slave,target.reg);
            process.stdout.write("Press R to read again, Q to quit");
            if((target.reg % 30000) < 10000) {
                process.stdout.write(" or enter a new value");
            }
            process.stdout.write(": ");
            break
        default:
            process.stdout.write('data: ' + chunk);
    }
  }
});


function printModbusValue(slave, reg)
{
    var val;
    process.stdout.write("reg="+reg+" slave="+ slave+"\n");
    if(reg >= 40001) {
        val = serialPort.modbusReadInputRegisters(slave, reg-40001, 1)[0];
    } else if(reg >= 30001) {
        val = serialPort.modbusReadRegisters(slave, reg-30001, 1)[0];
    } else if(reg >= 10001) {
        val = serialPort.modbusReadInputBits(slave, reg-10001, 1)[0];
    } else {
        val = serialPort.modbusReadBits(slave, reg-1, 1)[0];
    }
    process.stdout.write("Current value: "+ val+"\n");
    return val;
}

