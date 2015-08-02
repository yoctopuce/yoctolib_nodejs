var http     = require('http');
var yoctolib = require('yoctolib');
//
var YAPI    = yoctolib.YAPI;
var YModule = yoctolib.YModule;

// Instantiate a simple HTTP server
http.createServer(function (message, response) {
    // Here you can filter the requests by URL if you want
    console.log('received '+message.method+' request for '+message.url);

    // The part below starts the Yoctopuce library in HTTP Callback mode and interacts
    // with modules connected on the VirtualHub or YoctoHub that made the HTTP request
    YAPI.RegisterHub_async('http://callback/', function(obj_ctx, retcode, str_errmsg) {
        if(retcode == YAPI.SUCCESS) {
            // Display a list of modules on incoming hub to the Node.js console
            YAPI.UpdateDeviceList();
            var module = YModule.FirstModule();
            while(module) {
                console.log(module.get_serialNumber() + '(' + module.get_productName() + ')');
                module = module.nextModule(); 
            }
        }
        // Returns the API to its original state and close the connection
        YAPI.FreeAPI();
    }, null, message, response);
}).listen(8044, '127.0.0.1');

console.log('Node.js HTTP Callback server running at http://127.0.0.1:8044/');
