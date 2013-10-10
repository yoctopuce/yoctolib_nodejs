var yoctolib = require('yoctolib');
//
var YAPI = yoctolib.YAPI;
var YModule = yoctolib.YModule;

YAPI.RegisterHub_async('http://127.0.0.1:4444/', function(ctx,res,errmsg) 
{
    if(res != YAPI.SUCCESS) {
        throw new Error("Cannot contact VirtualHub on 127.0.0.1");
    }
    var module = YModule.FirstModule();
    while(module) {
        console.log(module.get_serialNumber() + '(' + module.get_productName() + ')');
        module = module.nextModule(); 
    }
});
