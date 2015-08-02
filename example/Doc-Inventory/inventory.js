var yoctolib = require('yoctolib');
var YAPI = yoctolib.YAPI;
var YModule = yoctolib.YModule;

// Setup the API to use local VirtualHub
console.log("pouet")
var res =YAPI.RegisterHub('http://user:test@172.17.17.118:4444/');

var module = YModule.FirstModule();
while(module) {
    console.log(module.get_serialNumber()+'('+module.get_productName()+")");
    module = module.nextModule(); 
}
