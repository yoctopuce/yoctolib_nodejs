var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YBuzzer = yoctolib.YBuzzer;
var YLed = yoctolib.YLed;
var YAnButton = yoctolib.YAnButton;

if (process.argv.length < 3) {
    console.log("usage: demo <serial_number> ");
    console.log("       demo <logical_name> ");
    console.log("       demo any                (use any discovered device)");
    process.exit(1);
}

// Setup the API to use local VirtualHub
YAPI.RegisterHub('http://127.0.0.1:4444/');

var buz, led1, led2, button1, button2;
if (process.argv[2] == "any") {
    buz = YBuzzer.FirstBuzzer();
    if (buz == null) {
        console.log("No module connected (check USB cable)\n");
        process.exit(1);
    }
} else {
    buz = YBuzzer.FindBuzzer(process.argv[2] + ".buzzer");
}

var count = -1;

function playIt(channel, freq, mustInit) {
    var led = (channel == 1) ? led1 : led2;
    if (mustInit) {
        count = 3;
        led.set_power(YLed.POWER_ON);
        led.set_luminosity(100);
        led.set_blinking(YLed.BLINKING_PANIC);
    }
    if (count <= 0) {
        buz.set_frequency(0);
        led.set_power(YLed.POWER_OFF);
        count = -1;
        return;
    }
    buz.set_frequency(freq);
    buz.freqMove(2 * freq, 250);
    count--;
    setTimeout(function () {
        playIt(channel, freq, false);
    }, 250);
}

function Pollbuttons() {
    if (count <= 0) {
        if (button1.get_isPressed()) playIt(1, 1500, true);
        else if (button2.get_isPressed()) playIt(2, 750, true);
    }
}

if (buz.isOnline()) {
    serial = buz.get_module().get_serialNumber();
    led1 = YLed.FindLed(serial + ".led1");
    led2 = YLed.FindLed(serial + ".led2");
    button1 = YAnButton.FindAnButton(serial + ".anButton1");
    button2 = YAnButton.FindAnButton(serial + ".anButton2");
    console.log("Press any of the push buttons\n");
    setInterval(function () {
        button1.wait_async(Pollbuttons);
    }, 100);

} else {
    console.log("Module not connected (check identification and USB cable)\n");
}
