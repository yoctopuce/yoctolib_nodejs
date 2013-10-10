var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YModule = yoctolib.YModule;

// Setup the API to use local VirtualHub
var res =YAPI.RegisterHub('http://127.0.0.1:4444/');

var module = YModule.FirstModule();
while(module) {
    console.log(module.get_serialNumber()+'('+module.get_productName()+")");
    module = module.nextModule(); 
}
