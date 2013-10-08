/*********************************************************************
 *
 * $Id: yocto_api.js 12909 2013-09-20 13:35:51Z mvuilleu $
 *
 * High-level programming interface, common to all modules
 *
 * - - - - - - - - - License information: - - - - - - - - -
 *
 *  Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 *  Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
 *  non-exclusive license to use, modify, copy and integrate this
 *  file into your software for the sole purpose of interfacing 
 *  with Yoctopuce products. 
 *
 *  You may reproduce and distribute copies of this file in 
 *  source or object form, as long as the sole purpose of this
 *  code is to interface with Yoctopuce products. You must retain 
 *  this notice in the distributed source file.
 *
 *  You should refer to Yoctopuce General Terms and Conditions
 *  for additional information regarding your rights and 
 *  obligations.
 *
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
 *  WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING 
 *  WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS 
 *  FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO
 *  EVENT SHALL LICENSOR BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
 *  INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA, 
 *  COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY OR 
 *  SERVICES, ANY CLAIMS BY THIRD PARTIES (INCLUDING BUT NOT 
 *  LIMITED TO ANY DEFENSE THEREOF), ANY CLAIMS FOR INDEMNITY OR
 *  CONTRIBUTION, OR OTHER SIMILAR COSTS, WHETHER ASSERTED ON THE
 *  BASIS OF CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF
 *  WARRANTY, OR OTHERWISE.
 *
 *********************************************************************/

//--- (generated code: YModule definitions)
// Yoctopuce error codes, also used by default as function return value
var YAPI_SUCCESS                   = 0;       // everything worked allright
var YAPI_NOT_INITIALIZED           = -1;      // call yInitAPI() first !
var YAPI_INVALID_ARGUMENT          = -2;      // one of the arguments passed to the function is invalid
var YAPI_NOT_SUPPORTED             = -3;      // the operation attempted is (currently) not supported
var YAPI_DEVICE_NOT_FOUND          = -4;      // the requested device is not reachable
var YAPI_VERSION_MISMATCH          = -5;      // the device firmware is incompatible with this API version
var YAPI_DEVICE_BUSY               = -6;      // the device is busy with another task and cannot answer
var YAPI_TIMEOUT                   = -7;      // the device took too long to provide an answer
var YAPI_IO_ERROR                  = -8;      // there was an I/O problem while talking to the device
var YAPI_NO_MORE_DATA              = -9;      // there is no more data to read from
var YAPI_EXHAUSTED                 = -10;     // you have run out of a limited ressource, check the documentation
var YAPI_DOUBLE_ACCES              = -11;     // you have two process that try to acces to the same device
var YAPI_UNAUTHORIZED              = -12;     // unauthorized access to password-protected device
var YAPI_RTC_NOT_READY             = -13;     // real-time clock has not been initialized (or time was lost)

var Y_PERSISTENTSETTINGS_LOADED     = 0;
var Y_PERSISTENTSETTINGS_SAVED      = 1;
var Y_PERSISTENTSETTINGS_MODIFIED   = 2;
var Y_PERSISTENTSETTINGS_INVALID    = -1;
var Y_BEACON_OFF                    = 0;
var Y_BEACON_ON                     = 1;
var Y_BEACON_INVALID                = -1;
var Y_USBBANDWIDTH_SIMPLE           = 0;
var Y_USBBANDWIDTH_DOUBLE           = 1;
var Y_USBBANDWIDTH_INVALID          = -1;
var Y_FUNCTIONDESCRIPTOR_INVALID    = "!INVALID!";
var Y_HARDWAREID_INVALID            = "!INVALID!";
var Y_PRODUCTNAME_INVALID           = "!INVALID!";
var Y_SERIALNUMBER_INVALID          = "!INVALID!";
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_PRODUCTID_INVALID             = -1;
var Y_PRODUCTRELEASE_INVALID        = -1;
var Y_FIRMWARERELEASE_INVALID       = "!INVALID!";
var Y_LUMINOSITY_INVALID            = -1;
var Y_UPTIME_INVALID                = -1;
var Y_USBCURRENT_INVALID            = -1;
var Y_REBOOTCOUNTDOWN_INVALID       = Number.NEGATIVE_INFINITY;
//--- (end of generated code: YModule definitions)

// yInitAPI constants (not really useful in Javascript, but defined for code portability)
var  Y_DETECT_NONE                  = 0;
var  Y_DETECT_USB                   = 1;
var  Y_DETECT_NET                   = 2;
var  Y_DETECT_ALL                   = (Y_DETECT_USB | Y_DETECT_NET);

var yAPI,YAPI;
var YModule;

(function()
{
    // 
    // Method common to all classes, to throw exceptions or report errors (Javascript-specific)
    //
    function YAPI_throw(int_errType, str_errMsg, obj_retVal)
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;

        if(YAPI.exceptionsDisabled) {
            return obj_retVal;
        }
        // create a well-formed exception object including stack
        try { 
            // note: The function Trigger_Yocto_Error below does intentionally not exist !
            //       Its only purpose is to create a valid exception stack frame and
            //       trigger the javascript debugger in the best possible way
            Trigger_Yocto_Error(int_errType, str_errMsg);
        } catch (e) {
            var key, exc = new Error(str_errMsg);
            for(key in e) {
                if(key != "name" && key != "number" && key != "message")
                    exc[key] = e[key];
            }
            exc["name"]        = "YoctoError";
            exc["message"]     = str_errMsg;
            exc["description"] = str_errMsg;
            exc["number"]      = int_errType;
            throw exc;
        }
    }

    //
    // JSON parser emulation if no native support is available
    //
    if(typeof JSON == "undefined") {
        window.JSON = {res: null,
                        parse: function(str) {
                            eval("this.res = "+str+";");
                            return this.res;
                        }
                      };
    }

    //
    // YFunctionType Class (used internally)
    //
    // Instances of this class stores everything we know about a given type of function:
    // Mapping between function logical names and Hardware ID as discovered on hubs,
    // and existing instances of YFunction (either already connected or simply requested).
    // To keep it simple, this implementation separates completely the name resolution
    // mechanism, implemented using the yellow pages, and the storage and retrieval of 
    // existing YFunction instances.
    //

    // Index a single function given by HardwareId and logical name; store any advertised value
    // Return true iff there was a logical name discrepency
    function YFunctionType_reindexFunction(str_hwid, str_name, str_val)
    {
        var currname = this._nameByHwId[str_hwid];
        var res = false;
        if(currname == undefined || currname == "") {
            if(str_name != "") {
                this._nameByHwId[str_hwid] = str_name;
                res = true;
            }
        } else if(currname != str_name) {
            if(this._hwIdByName[currname] == str_hwid)
                delete this._hwIdByName[currname];
            if(str_name != "") {
                this._nameByHwId[str_hwid] = str_name;
            } else {
                delete this._nameByHwId[str_hwid];
            }
            res = true;
        }
        if(str_name != "") {
            this._hwIdByName[str_name] = str_hwid;
        }
        if(str_val != undefined) {
            this._valueByHwId[str_hwid] = str_val;
        } else {
            if(this._valueByHwId[str_hwid] == undefined) {
                this._valueByHwId[str_hwid] = "";
            }
        }
        return res;
    }

    // Forget a disconnected function given by HardwareId
    function YFunctionType_forgetFunction(str_hwid)
    {
        var currname = this._nameByHwId[str_hwid];
        if(currname != undefined) {
            if(currname != "" && this._hwIdByName[currname] == str_hwid) {
                delete this._hwIdByName[currname];
            }
            delete this._nameByHwId[str_hwid];
        }
        if(this._valueByHwId[str_hwid] != undefined) {
            delete this._valueByHwId[str_hwid];
        }
    }

    // Find the exact Hardware Id of the specified function, if currently connected
    // If device is not known as connected, return a clean error
    // This function will not cause any network access
    function YFunctionType_resolve(str_func)
    {
        var dotpos = str_func.indexOf(".");
        var res;
        if(dotpos < 0) {
            // First case: str_func is the logicalname of a function
            res = this._hwIdByName[str_func];
            if(res != undefined) {
                return {errorType:YAPI_SUCCESS, 
                         errorMsg:"no error", 
                         result:String(res)};
            }

            // fallback to assuming that str_func is a logicalname or serial number of a module
            // with an implicit function name (like serial.module for instance)
            dotpos = str_func.length;
            str_func += "."+this._className.substr(0,1).toLowerCase()+this._className.substr(1);
        }

        // Second case: str_func is in the form: device_id.function_id

        // quick lookup for a known pure hardware id
        if(this._valueByHwId[str_func] != undefined) {
            return {errorType:YAPI_SUCCESS, 
                     errorMsg:"no error", 
                     result:String(str_func)};
        }
        if(dotpos>0) {

            // either the device id is a logical name, or the function is unknown
            var devid = str_func.substr(0,dotpos);
            var funcid = str_func.substr(dotpos+1);
            var dev = YAPI.getDevice(devid);
            if(!dev) {
                return {errorType:YAPI_DEVICE_NOT_FOUND, 
                         errorMsg:"Device ["+devid+"] not online",
                         result:null};
            }
            var serial = dev.getSerialNumber();
            res = serial+"."+funcid;
            if(this._valueByHwId[res] != undefined) {
                return {errorType:YAPI_SUCCESS, 
                         errorMsg:"no error", 
                         result:String(res)};
            }

            // not found neither, may be funcid is a function logicalname
            var i, nfun = dev.functionCount();
            for(i = 0; i < nfun; i++) {
                res = serial+"."+dev.functionId(i);
                var name = this._nameByHwId[res];
                if(name != undefined && name == funcid) {
                    return {errorType:YAPI_SUCCESS, 
                             errorMsg:"no error", 
                             result:String(res)};
                }
            }
        } else {
            funcid = str_func.substr(1);
            for (var hwid_str in this._connectedFns){
                var pos = hwid_str.indexOf(".");
                var str_function = hwid_str.substr(pos+1);
                if(str_function == funcid) {
                    return {errorType:YAPI_SUCCESS, 
                             errorMsg:"no error", 
                             result:String(hwid_str)};
                }
            }
        }
        return {errorType:YAPI_DEVICE_NOT_FOUND, 
                 errorMsg:"No function ["+funcid+"] found on device ["+serial+"]",
                 result:null};
    }

    // Find the friendly name (use logical name if available) of the 
    // specified function, if currently connected
    // If device is not known as connected, return a clean error
    // This function will not cause any network access
    function YFunctionType_getFriendlyName(str_func)
    {
        var resolved = this.resolve(str_func);
        if (resolved.errorType != YAPI_SUCCESS){
            return resolved;
        }
        if (this._className == "Module"){
            var friend = resolved.result;
            var name = this._nameByHwId[resolved.result];
            if (name !=undefined && name !=""){
                friend = this._nameByHwId[resolved.result];
            }
            return {errorType:YAPI_SUCCESS, 
                     errorMsg:"no error", 
                     result:String(friend)};
        } else {
            var pos = resolved.result.indexOf(".");
            var str_serialMod = resolved.result.substr(0,pos);
            var str_friendMod = YAPI.getFriendlyNameFunction("Module",str_serialMod).result;
            var str_friendFunc = resolved.result.substr(pos+1);
            var name = this._nameByHwId[resolved.result];
            if(name != undefined && name!="") {
                str_friendFunc = name;
            }
            return {errorType:YAPI_SUCCESS, 
                     errorMsg:"no error", 
                     result:String(str_friendMod+"."+str_friendFunc)};
		}
    }
    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    function YFunctionType_setFunction(str_func, obj_func)
    {
        var funres = this.resolve(str_func);
        if(funres.result != undefined) {
            // the function has been located on a device
            this._connectedFns[funres.result] = obj_func;
        } else {
            // the function is still abstract
            this._requestedFns[str_func] = obj_func;
        }
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    function YFunctionType_getFunction(str_func)
    {
        var funres = this.resolve(str_func);
        if(funres.errorType == YAPI_SUCCESS) {
            // the function has been located on a device
            var conn_fn = this._connectedFns[funres.result];
            if(conn_fn != undefined) return conn_fn;

            var req_fn = this._requestedFns[str_func];
            if(req_fn != undefined) {
                this._connectedFns[funres.result] = req_fn;
                delete this._requestedFns[str_func];
            }
            return req_fn;
        } else {
            // the function is still abstract
            return this._requestedFns[str_func];
        }
    }

    // Stores a function advertised value by hardware id, queue an event if needed
    function YFunctionType_setFunctionValue(str_hwid, str_pubval)
    {
        var conn_fn = this._connectedFns[str_hwid];
        if(conn_fn != undefined && conn_fn._valueCallback != undefined) {
            var currval = this._valueByHwId[str_hwid];
            if(currval == undefined || currval != str_pubval) {
                YAPI.addValueEvent(conn_fn, str_pubval);
            }
        }
        this._valueByHwId[str_hwid] = str_pubval;
    }

    // Retrieve a function advertised value by hardware id
    function YFunctionType_getFunctionValue(str_hwid)
    {
        return this._valueByHwId[str_hwid];
    }

    // Find the the hardwareId of the first instance of a given function class
    function YFunctionType_getFirstHardwareId()
    {
        var res = null;
        for(res in this._valueByHwId) break;
        return res;
    }

    // Find the hardwareId for the next instance of a given function class
    function YFunctionType_getNextHardwareId(str_hwid)
    {
        for(var iter_hwid in this._valueByHwId) {
            if(str_hwid == "!")
                return iter_hwid;
            if(str_hwid == iter_hwid)
                str_hwid = "!";
        }
        return null; // no more instance found
    }

    function YFunctionType(str_classname)
    {
        // private
        this._className     = str_classname;
        this._connectedFns  = {};           // functions requested and available, by Hardware Id
        this._requestedFns  = {};           // functions requested but not yet known, by any type of name
        this._hwIdByName    = {};           // hash table of function Hardware Id by logical name
        this._nameByHwId    = {};           // hash table of function logical name by Hardware Id
        this._valueByHwId   = {};           // hash table of function advertised value by logical name

        // public
        this.reindexFunction    = YFunctionType_reindexFunction;
        this.forgetFunction     = YFunctionType_forgetFunction;
        this.resolve            = YFunctionType_resolve;
        this.getFriendlyName    = YFunctionType_getFriendlyName;
        this.setFunction        = YFunctionType_setFunction;
        this.getFunction        = YFunctionType_getFunction;
        this.setFunctionValue   = YFunctionType_setFunctionValue;
        this.getFunctionValue   = YFunctionType_getFunctionValue;
        this.getFirstHardwareId = YFunctionType_getFirstHardwareId;
        this.getNextHardwareId  = YFunctionType_getNextHardwareId;
    }

    // 
    // YDevice Class (used internally)
    //
    // This class is used to store everything we know about connected Yocto-Devices.
    // Instances are created when devices are discovered in the white pages
    // (or registered manually, for root hubs) and then used to keep track of
    // device naming changes. When a device or a function is renamed, this
    // object forces the local indexes to be immediately updated, even if not
    // yet fully propagated through the yellow pages of the device hub.
    //
    // In order to regroup multiple function queries on the same physical device,
    // this class implements a device-wide API string cache (agnostic of API content).
    // This is in addition to the function-specific cache implemented in YFunction.
    //

    // Return the root URL used to access a device (including the trailing slash)
    function YDevice_getRootUrl()
    {
        return this._rootUrl;
    }

    // Return the serial number of the device, as found during discovery
    function YDevice_getSerialNumber()
    {
        return this._serialNumber;
    }

    // Return the logical name of the device, as found during discovery
    function YDevice_getLogicalName()
    {
        return this._logicalName;
    }

    // Return the product name of the device, as found during discovery
    function YDevice_getProductName()
    {
        return this._productName;
    }

    // Return the product Id of the device, as found during discovery
    function YDevice_getProductId()
    {
        return this._productId;
    }

    // Return the beacon state of the device, as found during discovery
    function YDevice_getBeacon()
    {
        return this._beacon;
    }

    // Return the hub-specific devYdx of the device, as found during discovery
    function YDevice_getDevYdx()
    {
        return this._devYdx;
    }

    // Return a string that describes the device (serial number, logical name or root URL)
    function YDevice_describe()
    {
        var res = this._rootUrl;
        if(this._serialNumber != "") {
            res = this._serialNumber;
            if(this._logicalName != "") {
                res = res + " (" + this._logicalName + ")";
            }
        }
        return this._productName+" "+res;
    }

    // Get the whole REST API string for a device, from cache if possible
    function YDevice_requestAPI()
    {
        if(this._cache._expiration > YAPI.GetTickCount()) {
            return {errorType:YAPI_SUCCESS, 
                     errorMsg:"no error", 
                     result: this._cache._json};
        }
        var yreq = YAPI.devRequest(this._rootUrl, "GET /api.json");
        if(yreq.errorType != YAPI_SUCCESS) return yreq;
        this._cache._expiration = YAPI.GetTickCount() + YAPI.defaultCacheValidity;
        this._cache._json = yreq.result;
        return yreq;
    }

    // Get the whole REST API string for a device, from cache if possible
    // This is the asynchronous version, that uses a callback instead of a return value in order to avoid
    // blocking the whole browser on Firefox due to their ill-implemented virtual machine, that does not 
    // properly implements javascript context switching during blocking I/O calls (other browsers do it right).
    function YDevice_requestAPI_async(func_callback, obj_context)
    {
        if(this._cache._expiration > YAPI.GetTickCount()) {
            func_callback(obj_context, {errorType:YAPI_SUCCESS, 
                                          errorMsg:"no error", 
                                          result: this._cache._json});
            return;
        }
        YAPI.devRequest_async(this._rootUrl, "GET /api.json", '',
                              function(params, yreq) {
                                  if(yreq.errorType != YAPI_SUCCESS) {
                                      if(params.cb) params.cb(params.ctx, yreq);
                                      return;
                                  }
                                  params.obj._cache._expiration = YAPI.GetTickCount() + YAPI.defaultCacheValidity;
                                  params.obj._cache._json = yreq.result;
                                  if(params.cb) params.cb(params.ctx, yreq);
                              },
                              {obj:this, cb:func_callback, ctx:obj_context});
    }

    // Update device cache and YAPI function lists from yp records
    function YDevice_updateFromYP(obj_ypRecs)
    {
        var funidx = 0;
        for(var categ in obj_ypRecs) {
            for(var key in obj_ypRecs[categ]) {
                var rec = obj_ypRecs[categ][key];
                var hwid = rec["hardwareId"];
                var dotpos = hwid.indexOf(".");
                if(hwid.substr(0,dotpos) == this._serialNumber) {
                    var funydx = rec["index"];
                    if(funydx == undefined) funydx = funidx;
                    this._functions[funydx] = [hwid.substr(dotpos+1), rec["logicalName"]];
                    funidx++;
                }
            }
        }        
    }

    // Update device cache and YAPI function lists accordingly
    function YDevice_updateFromReq(yreq, loadval)
    {
        this._cache._expiration = YAPI.GetTickCount() + YAPI.defaultCacheValidity;
        this._cache._json = yreq.result;

        var func;
        var reindex = false;
        if(this._productName == "") {
            // parse module and function names for the first time
            for(func in loadval) {    
                if(func == "module") {
                    this._serialNumber = loadval.module.serialNumber;
                    this._logicalName  = loadval.module.logicalName;
                    this._productName  = loadval.module.productName;
                    this._productId    = loadval.module.productId;
                    this._beacon       = loadval.module.beacon;
                } else if(func == "services") {
                    this._updateFromYP(loadval.services.yellowPages);
                }
            }
            reindex = true;
        } else {
            // parse module and refresh names if needed
            var renamed = false;
            for(func in loadval) {    
                if(func == "module") {
                    if(this._logicalName != loadval.module.logicalName) {
                        this._logicalName = loadval.module.logicalName;
                        reindex = true;
                    }
                    this._beacon = loadval.module.beacon;
                } else if(func != "services") {
                    var name = loadval[func]["logicalName"];
                    if(name == undefined) name = loadval.module.logicalName;
                    var pubval = loadval[func]["advertisedValue"];
                    if(pubval != undefined) YAPI.setFunctionValue(loadval.module.serialNumber+"."+func, pubval);
                    var funydx;
                    for(funydx in this._functions) {
                        if(this._functions[funydx][0] == func) {
                            if(this._functions[funydx][1] != name) {
                                this._functions[funydx][1] = name;
                                reindex = true;
                            }
                            break;
                        }
                    }
                }
            }
        }
        if(reindex) {
            YAPI.reindexDevice(this);
        }
    }

    // Reload a device API (store in cache), and update YAPI function lists accordingly
    function YDevice_refresh()
    {
        var yreq = this.requestAPI();
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        
        var loadval = null;

        try {loadval = JSON.parse(yreq.result);} catch(err){}
        
        if(!loadval) {
            return this._throw(YAPI_IO_ERROR, "Request failed, could not parse API result for "+this._rootUrl,
                               YAPI_IO_ERROR);
        }
        this._updateFromReq(yreq, loadval);
        return YAPI_SUCCESS;
    }

    // Reload a device API (store in cache), and update YAPI function lists accordingly
    // This is the asynchronous version, that uses a callback instead of a return value in order to avoid
    // blocking the whole browser on Firefox due to their ill-implemented virtual machine, that does not 
    // properly implements javascript context switching during blocking I/O calls (other browsers do it right).
    function YDevice_refresh_async(func_callback, obj_context)
    {
        this.requestAPI_async(function(params, yreq) {
                                  if(yreq.errorType != YAPI_SUCCESS) {
                                      params.obj._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
                                      if(params.cb) params.cb(params.ctx, yreq.errorType);
                                      return;
                                  }
                                  var loadval = null;
                                  try {loadval=JSON.parse(yreq.result);} catch(err) {}
                                  if(!loadval) {
                                      params.obj._throw(YAPI_IO_ERROR, "Request failed, could not parse API result for "+obj._rootUrl,
                                                        YAPI_IO_ERROR);
                                      if(params.cb) params.cb(params.ctx, YAPI_IO_ERROR);
                                      return;
                                  }
                                  params.obj._updateFromReq(yreq, loadval);
                                  if(params.cb) params.cb(params.ctx, YAPI_SUCCESS);
                              },
                              {obj:this, cb:func_callback, ctx:obj_context});
    }

    // Force the REST API string in cache to expire immediately
    function YDevice_dropCache()
    {
        this._cache._expiration = 0;
    }

    // Retrieve the number of functions (beside "module") in the device
    function YDevice_functionCount()
    {
        return this._functions.length;
    }

    // Retrieve the Id of the nth function (beside "module") in the device
    function YDevice_functionId(int_idx)
    {
        if(int_idx < this._functions.length) {
            return this._functions[int_idx][0];
        }
        return "";
    }

    // Retrieve the logical name of the nth function (beside "module") in the device
    function YDevice_functionName(int_idx)
    {
        if(int_idx < this._functions.length) {
            return this._functions[int_idx][1];
        }
        return "";
    }

    // Retrieve the advertised value of the nth function (beside "module") in the device
    function YDevice_functionValue(int_idx)
    {
        if(int_idx < this._functions.length) {
            return YAPI.getFunctionValue(this._serialNumber+"."+this._functions[int_idx][0]);
        }
        return "";
    }

    // Device constructor. Automatically call the YAPI functin to reindex device
    function YDevice(str_rooturl, obj_wpRec, obj_ypRecs, async_callback, async_context)
    {
        // private attributes
        this._rootUrl         = str_rooturl;
        this._serialNumber    = "";
        this._logicalName     = "";
        this._productName     = "";
        this._productId       = 0;
        this._beacon          = 0;
        this._devYdx          = -1;
        this._lastErrorType   = YAPI_SUCCESS;
        this._lastErrorMsg    = "no error";
        this._cache           = {_expiration:0, _json:""};
        this._functions       = [];
        this._busy            = 0;
        this._runningQuery    = null;
        this._pendingQueries  = [];
        this._throw           = YAPI_throw;
        this._updateFromYP    = YDevice_updateFromYP;
        this._updateFromReq   = YDevice_updateFromReq;

        // public
        this.getRootUrl       = YDevice_getRootUrl;
        this.getSerialNumber  = YDevice_getSerialNumber;
        this.getLogicalName   = YDevice_getLogicalName;
        this.getProductName   = YDevice_getProductName;
        this.getProductId     = YDevice_getProductId;
        this.getBeacon        = YDevice_getBeacon;
        this.describe         = YDevice_describe;
        this.requestAPI       = YDevice_requestAPI;
        this.requestAPI_async = YDevice_requestAPI_async;
        this.refresh          = YDevice_refresh;
        this.refresh_async    = YDevice_refresh_async;
        this.dropCache        = YDevice_dropCache;
        this.functionCount    = YDevice_functionCount;
        this.functionId       = YDevice_functionId;
        this.functionName     = YDevice_functionName;
        this.functionValue    = YDevice_functionValue;
        
        if(obj_wpRec != undefined) {
            // preload values from white pages, if provided
            this._serialNumber = obj_wpRec.serialNumber;
            this._logicalName  = obj_wpRec.logicalName;
            this._productName  = obj_wpRec.productName;
            this._productId    = obj_wpRec.productId;
            this._beacon       = obj_wpRec.beacon;
            this._devYdx       = (obj_wpRec.index == undefined ? -1 : obj_wpRec.index);
            this._updateFromYP(obj_ypRecs);
            YAPI.reindexDevice(this);
        } else {
            // preload values from device directly
            if(async_callback) {
                this.refresh_async(async_callback, async_context);
            } else {
                this.refresh();
            }
        }
    }

    // 
    // YAPI Context
    //
    // This class provides the high-level entry points to access Functions, stores
    // an indexes instances of the Device object and of FunctionType collections.
    //

    // Context used to update the list of known devices by rescanning all hubs as needed
    function YAPI_updateDeviceList_init()
    {
        // make sure all hubs are reachable
        var hubs = [];
        var i;
        for(i = 0; i < this._hubs.length; i++) {
            var rooturl = this._hubs[i].rooturl;
            var hubdev = this.getDevice(rooturl);
            if(!hubdev) {
                return this._throw(YAPI_INVALID_ARGUMENT, "Cannot find hub "+this._hubs[i].rooturl, null);
            }
            if(this._hubs[i].devListExpires <= YAPI.GetTickCount()) {
                hubs.push({hubidx: i,
                            huburl: rooturl,
                            hubdev: hubdev,
                            missing: {}});
            }
        }

        // assume all device as unpluged, unless proved wrong
        var serial;
        for(serial in this._devs) {
            var rooturl = this._devs[serial].getRootUrl();
            for(i = 0; i < hubs.length; i++) {
                var huburl = hubs[i].huburl;
                if(rooturl.substr(0,huburl.length) == huburl) {
                    hubs[i].missing[serial] = true;
                }
            }
        }

        return {updidx:  0,
                 hubs:    hubs,
                 callbk:  true};
    }

    // function used to process the every hub api request to update the list of known devices
    function YAPI_updateDeviceList_process(ctx, yreq) 
    {
        var hub = ctx.hubs[ctx.updidx];
        var hubdev = hub.hubdev;
        var loadval = null;
        try {loadval = JSON.parse(yreq.result);} catch (err) {}
        if(!loadval) {
            return this._throw(YAPI_IO_ERROR, "Request failed, could not parse API result for "+hubdev.describe(),
                               YAPI_IO_ERROR);
        }
        var whitePages = loadval["services"]["whitePages"];
        if(whitePages == undefined) {
            return this._throw(YAPI_INVALID_ARGUMENT, "Device "+hubdev.describe()+" is not a hub", 
                               YAPI_INVALID_ARGUMENT);
        }
        // Reindex all functions from yellow pages
        var refresh = {};
        var yellowPages = loadval["services"]["yellowPages"];
        for(var classname in yellowPages) {
            var obj_yprecs = yellowPages[classname];
            var ftype = this._fnByType[classname];
            if(ftype == undefined) {
                ftype = new YFunctionType(classname);
                this._fnByType[classname] = ftype;
            }
            for(var key in obj_yprecs) {
                var yprec = obj_yprecs[key];
                var hwid = yprec["hardwareId"];
                if(ftype.reindexFunction(hwid, yprec["logicalName"], yprec["advertisedValue"])) {
                    // logical name discrepency detected, force a refresh from device
                    var serial = hwid.substr(0,hwid.indexOf("."));
                    refresh[serial] = true;
                }
            }
        }
        // Reindex all devices from white pages
        var thishub = this._hubs[hub.hubidx];
        var devkey;
        for(devkey in whitePages) {
            var devinfo = whitePages[devkey];
            var serial  = devinfo["serialNumber"];
            var devydx  = devinfo["index"];
            var rooturl = devinfo.networkUrl.slice(0,-3);
            if(rooturl.charAt(0) == "/") rooturl = hubdev.getRootUrl()+rooturl.substr(1);
            var currdev = this._devs[serial];
            if(currdev && this._arrivalCallback != undefined && this._firstArrival) {
                this._pendingCallbacks.push('+'+serial);
            }
            thishub.serialByYdx[devydx] = serial;
            if(!currdev) {
                // Add new device
                new YDevice(rooturl, devinfo, loadval["services"]["yellowPages"]);
                if(this._arrivalCallback != undefined) {
                    this._pendingCallbacks.push('+'+serial);
                }
            } else if(currdev.getLogicalName() != devinfo["logicalName"]) {
                // Reindex device from its own data
                currdev.refresh_async(null, null);
                if(this._namechgCallback != undefined) {
                    this._pendingCallbacks.push('/'+serial);
                }
            } else if(refresh[serial] || currdev.getRootUrl() != rooturl ||
                      currdev.getBeacon() != devinfo["beacon"]) {
                // Reindex device from its own data in case of discrepency
                currdev.refresh_async(null, null);
            }
            hub.missing[serial] = false;
        }

        // Keep track of all unplugged devices on this hub
        var serial;
        for(serial in hub.missing) {
            if(hub.missing[serial]) {
                if(this._removalCallback != undefined) {
                    this._pendingCallbacks.push('-'+serial);
                } else {
                    this.forgetDevice(this._devs[serial]);
                }
            }
        }

        // reset device list cache timeout for this hub
        var now = YAPI.GetTickCount();
        if(thishub.notifTrigger > 0) {
            if(now < thishub.notifTrigger) {
                // second yUpdateDeviceList within trigger time, try to open notification channel
                thishub.notifTrigger = -1;
                this.monitorEvents(hub.hubidx);
            }
        }
        if(thishub.notifTrigger >= 0) {
            // update notification trigger timestamp
            thishub.notifTrigger = YAPI.GetTickCount() + 3000;
        }
        thishub.devListExpires = now + thishub.devListValidity;
        
        // after processing all hubs, invoke pending callbacks if required
        if(ctx.updidx == ctx.hubs.length-1 && ctx.callbk) {
            var nbevents = this._pendingCallbacks.length;
            for(var i = 0; i < nbevents; i++) {
                var evt = this._pendingCallbacks[i];
                var serial = evt.slice(1);
                switch(evt.charAt(0)) {
                case '+':
                    if(this._arrivalCallback != undefined) {
                        this._arrivalCallback(yFindModule(serial+".module"));
                    }
                    break;
                case '/':
                    if(this._namechgCallback != undefined) {
                        this._namechgCallback(yFindModule(serial+".module"));
                    }
                    break;
                case '-':
                    if(this._removalCallback != undefined) {
                        this._removalCallback(yFindModule(serial+".module"));
                    }
                    this.forgetDevice(this._devs[serial]);
                    break;
                }
            }
            this._pendingCallbacks = this._pendingCallbacks.slice(nbevents);
            if(this._arrivalCallback != undefined && this._firstArrival) {
                this._firstArrival = false;
            }
        }

        return YAPI_SUCCESS;
    }

    function YAPI_updateDeviceList_internal(bool_forceupdate, bool_invokecallbacks) 
    {
        if(this._firstArrival && bool_invokecallbacks && this._arrivalCallback) {
            bool_forceupdate = true;
        }
        if(bool_forceupdate) {
            var now = YAPI.GetTickCount();
            for(var i = 0; i < this._hubs.length; i++) {
                this._hubs[i].devListExpires = now;
            }
        }

        var ctx = this._updateDeviceList_init();
        if(ctx == null){
            return {errorType: this._lastErrorType, 
                     errorMsg:  this._lastErrorMsg, 
                     result:    this._lastErrorType};
        }
        ctx.callbk = bool_invokecallbacks;
        
        // Rescan all hubs and update list of online devices
        for(ctx.updidx = 0; ctx.updidx < ctx.hubs.length; ctx.updidx++) {
            var hubdev = ctx.hubs[ctx.updidx].hubdev;
            var retcode = hubdev.refresh();
            if(retcode != YAPI_SUCCESS) {
                return {errorType: retcode, 
                         errorMsg:  hubdev._lastErrorMsg, 
                         result:    retcode};
            }
            var yreq = hubdev.requestAPI();
            if(yreq.errorType != YAPI_SUCCESS) {
                return yreq;
            }
            var retcode = this._updateDeviceList_process(ctx, yreq);
            if(retcode != YAPI_SUCCESS) {
                return {errorType: _lastErrorType, 
                         errorMsg:  this._lastErrorMsg, 
                         result:    _lastErrorType};
            }
        }

        return {errorType:YAPI_SUCCESS, 
                 errorMsg:"no error", 
                 result:YAPI_SUCCESS};
    }

    // Handle the event-monitoring work on a registered hub
    // Called initially with a context containing just the 'rooturl'
    // of the hub to monitor
    function YAPI_monitorEvents(int_hubidx)
    {
        var yhub = YAPI._hubs[int_hubidx];
        var args = "?len="+yhub.notiflen.toString();
        if(yhub.notifPos > 0) args += "&abs="+yhub.notifPos;
        var yreq = this.devRequest(yhub.rooturl, "GET /not.byn"+args, 

        function(httpRequest) {
            var hub = YAPI._hubs[int_hubidx];
            if (httpRequest.readyState >= 3) {
                if(httpRequest.readyState == 4 && httpRequest.status != 200 && httpRequest.status != 304) {
                    // connection error
                    if(hub.retryDelay < 15000) hub.retryDelay *= 2;
                    hub.devListValidity = 500;
                    hub.devListExpires = 0;
                    if(typeof chrome != "undefined" && chrome.app && chrome.app.window) {
                        setTimeout(function(hubidx){YAPI.monitorEvents(hubidx)}, hub.retryDelay, int_hubidx);
                    } else {
                        setTimeout("YAPI.monitorEvents("+int_hubidx+")", hub.retryDelay);
                    }
                } else {
                    // receiving data properly
                    var newlen;
                    if(httpRequest.readyState == 3) {
                        // when using reconnection mode, ignore state 3
                        if(hub.notiflen == 1) return;
                        try {
                            // try accessing the responseText carefully (bcoz of IE)
                            newlen = httpRequest.responseText.length;
                        } catch(err) {
                            // oops, readyState 3 is not usable, use alternate notification channel
                            hub.notiflen = 1;
                            hub.currPos = 0;
                            if(typeof chrome != "undefined" && chrome.app && chrome.app.window) {
                                setTimeout(function(hubidx){YAPI.monitorEvents(hubidx)}, 15, int_hubidx);
                            } else {
                                setTimeout("YAPI.monitorEvents("+int_hubidx+")", 15);
                            }
                            httpRequest.abort();
                            return;
                        }
                    } else { 
                        // in state 4, responseText is always valid
                        newlen = httpRequest.responseText.length;
                    }
                    if(newlen > hub.currPos) {
                        hub.devListValidity = 10000; // 10s validity when notification are working properly
                        var rows = httpRequest.responseText.substr(hub.currPos,newlen-hub.currPos).split("\n");
                        var nrows = rows.length;
                        // in continuous mode, last line is either empty or a partial event
                        nrows--;
                        for(var idx = 0; idx < nrows; idx++) { 
                            var ev = rows[idx];
                            if(ev.length == 0) continue;
                            if(ev.length >= 3 && ev.charAt(0) == 'y') {
                                // function value ydx (tiny notification)
                                hub.retryDelay = 15;
                                if(hub.notifPos>=0) hub.notifPos += ev.length+1;
                                var devydx = ev.charCodeAt(1) - 65; // from 'A'
                                var funydx = ev.charCodeAt(2) - 48; // from '0'
                                if(funydx >= 64) { // high bit of devydx is on second character
                                    funydx -= 64;
                                    devydx += 128;
                                }
                                var serial = hub.serialByYdx[devydx];
                                if(serial && YAPI._devs[serial]) {
                                    funcid = YAPI._devs[serial].functionId(funydx);
                                    if(funcid != "") {
                                        var value = ev.slice(3);
                                        if(value != "") value = value.split("\0")[0];
                                        YAPI.setFunctionValue(serial+"."+funcid, value);
                                    }
                                }
                            } else if(ev.length > 5 && ev.substr(0,4) == 'YN01') {
                                hub.retryDelay = 15;
                                if(hub.notifPos>=0) hub.notifPos += ev.length+1;
                                var notype = ev.substr(4,1);
                                if(notype == '@') {
                                    hub.notifPos = parseInt(ev.slice(5));
                                } else switch(parseInt(notype)) {
                                case 0: // device name change, or arrival
                                case 2: // device plug/unplug
                                case 4: // function name change
                                case 8: // function name change (ydx)
                                    hub.devListExpires = 0;
                                    break;
                                case 5: // function value (long notification)
                                    var parts = ev.slice(5).split(",");
                                    if(parts.length > 2) {
                                        var value = parts[2].split("\0");
                                        YAPI.setFunctionValue(parts[0]+"."+parts[1], value[0]);
                                    }
                                    break;
                                }
                            } else { 
                                // oops, bad notification ? be safe until a good one comes
                                hub.devListValidity = 500;
                                hub.devListExpires = 0;
                                //alert('bad event on line '+idx+'/'+nrows+' : '+ev);
                                hub.notifPos = -1;
                            }
                            hub.currPos += ev.length + 1;
                        }
                    }
                    // trigger immediately a new connection if closed in success
                    if(httpRequest.readyState == 4 && httpRequest.status != 0) {
                        hub.currPos = 0;
                        YAPI.monitorEvents.call(YAPI,int_hubidx);
                    }
                }
            }
        });
        if(yreq.errorType != YAPI_SUCCESS) {
            alert('http_async error:'+(err.message || err.description));
            func_callback(obj_context, yreq);
        }
    }

    var decExp = [ 
        1.0e-6, 1.0e-5, 1.0e-4, 1.0e-3, 1.0e-2, 1.0e-1, 1.0, 
        1.0e1, 1.0e2, 1.0e3, 1.0e4, 1.0e5, 1.0e6, 1.0e7, 1.0e8, 1.0e9 ];

    // Convert Yoctopuce 16-bit decimal floats to standard double-precision floats
    //
    function YAPI_decimalToDouble(val)
    {
        var negate = false;
        var res;
        
        if(val == 0) return 0.0;
        if(val > 32767) {
            negate = true;
            val = 65536-val;            
        } else if(val < 0) {
            negate = true;
            val = -val;
        }
        res = (val & 2047) * decExp[val >> 11];
    
        return (negate ? -res : res);
    }

    // Convert standard double-precision floats to Yoctopuce 16-bit decimal floats
    //
    function YAPI_doubleToDecimal(val)
    {
        var     negate = false;
        var     comp, mant;
        var     decpow;
        var     res;
    
        if(val == 0.0) {
            return 0;
        }
        if(val < 0) {
            negate = true;
            val = -val;
        }
        comp = val / 1999.0;
        decpow = 0;
        while(comp > decExp[decpow] && decpow < 15) {
            decpow++;
        }
        mant = val / decExp[decpow];
        if(decpow == 15 && mant > 2047.0) {
            res = (15 << 11) + 2047; // overflow
        } else {
            res = (decpow << 11) + Math.round(mant);
        }
        return (negate ? -res : res);
    }

    function YAPI_getCalibrationHandler(calibType)
    {
        return this._calibHandlers[calibType]
    }
    
    // Compute the currentValue for the provided function, using the currentRawValue,
    // the calibrationParam and the proper registered calibration handler
    function YAPI_applyCalibration(obj_yfunc)
    {
        var params = obj_yfunc.get_calibrationParam();
        var rawVal = obj_yfunc.get_currentRawValue();
        if(rawVal == -Number.MAX_VALUE) {
            return -Number.MAX_VALUE;
        }
        if(params == "" || params == "0") return rawVal;
        params = params.split(",");
        if(params.length < 11) {
            return -Number.MAX_VALUE;
        }
        var ctyp = parseInt(params[0]);
        if(ctyp == 0) return rawVal;
        var handler = this.getCalibrationHandler(ctyp);
        if(!handler) {
            return -Number.MAX_VALUE;            
        }
        var resol = obj_yfunc.get_resolution();
        if(resol == -Number.MAX_VALUE) {
            return -Number.MAX_VALUE;
        }
        var iParams = new Array(params.length-1);
        var rawPt = new Array(params.length>>1);
        var calPt = new Array(params.length>>1);
        for(var i = 1; i < params.length; i += 2) {
            iParams[i-1] = parseInt(params[i]);
            iParams[i]   = parseInt(params[i+1]);
            if(ctyp <= 10) {
                rawPt[i>>1] = (iParams[i-1]+obj_yfunc._calibrationOffset) * resol;
                calPt[i>>1] = (iParams[i]+obj_yfunc._calibrationOffset) * resol;
            }else {
                rawPt[i>>1] = YAPI.decimalToDouble(iParams[i-1]);
                calPt[i>>1] = YAPI.decimalToDouble(iParams[i]);
            }
        }
        return handler(rawVal, ctyp, iParams, rawPt, calPt);
    }
    
    // Return a Device object for a specified URL, serial number or logical device name
    // This function will not cause any network access
    function YAPI_getDevice(str_device)
    {
        var dev = null;

        if(str_device.substr(0,7) == "http://") {
            // lookup by url
            var serial = this._snByUrl[str_device];
            if(serial != undefined) dev = this._devs[serial];
        } else {
            // lookup by serial
            if(this._devs[str_device]) {
                dev = this._devs[str_device];
            } else {
                // fallback to lookup by logical name
                var serial = this._snByName[str_device];
                if(serial) {
                    dev = this._devs[serial];
                }
            }
        }
        return dev;
    }

    // Return the class name for a given function ID or full Hardware Id
    // Also make sure that the function type is registered in the API
    function YAPI_functionClass(str_funcid)
    {
        var dotpos = str_funcid.indexOf(".");
        if(dotpos >= 0) str_funcid = str_funcid.substr(dotpos+1);
        var classlen = str_funcid.length;
        while(str_funcid.substr(classlen-1,1) <= '9') classlen--;
        var classname = str_funcid.substr(0,1).toUpperCase()+str_funcid.substr(1,classlen-1);
        if(this._fnByType[classname] == undefined)
            this._fnByType[classname] = new YFunctionType(classname);

        return classname;
    }

    // Reindex a device in YAPI after a name change detected by device refresh
    function YAPI_reindexDevice(obj_dev)
    {
        var rootUrl = obj_dev.getRootUrl();
        var serial = obj_dev.getSerialNumber();
        var lname  = obj_dev.getLogicalName();
        this._devs[serial] = obj_dev;
        this._snByUrl[rootUrl] = serial;
        if(lname != "") this._snByName[lname] = serial;
        this._fnByType["Module"].reindexFunction(serial+".module", lname, null);
        var i, count = obj_dev.functionCount();
        for(i = 0; i < count; i++) {
            var funcid = obj_dev.functionId(i);
            var funcname = obj_dev.functionName(i);
            var classname = this.functionClass(funcid);
            this._fnByType[classname].reindexFunction(serial+"."+funcid, funcname, null);
        }
    }

    // Remove a device from YAPI after an unplug detected by device refresh
    function YAPI_forgetDevice(obj_dev)
    {
        var rootUrl = obj_dev.getRootUrl();
        var serial = obj_dev.getSerialNumber();
        var lname = obj_dev.getLogicalName();
        delete this._devs[serial];
        delete this._snByUrl[rootUrl];
        if(this._snByName[lname] == serial) {
            delete this._snByName[lname];
        }
        this._fnByType["Module"].forgetFunction(serial+".module");
        var i, count = obj_dev.functionCount();
        for(i = 0; i < count; i++) {
            var funcid = obj_dev.functionId(i);
            var classname = this.functionClass(funcid);
            this._fnByType[classname].forgetFunction(serial+"."+funcid);
        }
    }

    // Find the best known identifier (hardware Id) for a given function
    function YAPI_resolveFunction(str_className, str_func)
    {
        if(this._fnByType[str_className] == undefined)
            this._fnByType[str_className] = new YFunctionType(str_className);
        return this._fnByType[str_className].resolve(str_func);
    }

    // Find the best known identifier (hardware Id) for a given function
    function YAPI_getFriendlyNameFunction(str_className, str_func)
    {
        if(this._fnByType[str_className] == undefined)
            this._fnByType[str_className] = new YFunctionType(str_className);
        return this._fnByType[str_className].getFriendlyName(str_func);
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    function YAPI_setFunction(str_className, str_func, obj_func)
    {
        if(this._fnByType[str_className] == undefined)
            this._fnByType[str_className] = new YFunctionType(str_className);
        return this._fnByType[str_className].setFunction(str_func, obj_func);
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    function YAPI_getFunction(str_className, str_func)
    {
        if(this._fnByType[str_className] == undefined)
            this._fnByType[str_className] = new YFunctionType(str_className);
        return this._fnByType[str_className].getFunction(str_func);
    }

    // Set a function advertised value by hardware id
    function YAPI_setFunctionValue(str_hwid, str_pubval)
    {
        var classname = this.functionClass(str_hwid);
        return this._fnByType[classname].setFunctionValue(str_hwid, str_pubval);
    }

    // Retrieve a function advertised value by hardware id
    function YAPI_getFunctionValue(str_hwid)
    {
        var classname = this.functionClass(str_hwid);
        return this._fnByType[classname].getFunctionValue(str_hwid);
    }

    // Queue a function value event
    function YAPI_addValueEvent(obj_func, str_newval)
    {
        if(this._forwardValues > 0) {
            obj_func._valueCallback(obj_func, str_newval);
        } else {
            this._pendingValues.push([obj_func, str_newval]);
        }
    }

    // Find the hardwareId for the first instance of a given function class
    function YAPI_getFirstHardwareId(str_className)
    {        
        if(this._fnByType[str_className] == undefined)
            this._fnByType[str_className] = new YFunctionType(str_className);
        return this._fnByType[str_className].getFirstHardwareId();
    }

    // Find the hardwareId for the next instance of a given function class
    function YAPI_getNextHardwareId(str_className, str_hwid)
    {        
        return this._fnByType[str_className].getNextHardwareId(str_hwid);
    }

    // Perform an HTTP request on a device, by URL or identifier. 
    // When loading the REST API from a device by identifier, the device cache will be used.
    // The 3rd argument of the function is optional, and used for implementing the asynchronous
    // version only. Return a strucure including errorType, errorMsg and result
    function YAPI_devRequest(str_device, str_request, func_statechanged, obj_body)
    {
        var async = (typeof func_statechanged != "undefined");
        if (!async && typeof chrome != "undefined" && chrome.app && chrome.app.window) {
            // Synchronous XML HTTP Requests are not possible when running as a chrome extension
            // This breakpoint is intended to help you understand what caused a synchronous request
            // while you should only use *_async functions
            debugger;
        }
        var lines = str_request.split("\n");
        var lockdev, baseUrl;
        if(str_device.substr(0,7) == "http://") {
            baseUrl = str_device;
            if (baseUrl.slice(-1) != "/") baseUrl = baseUrl + "/";
            if(lines[0].substr(0,12) != "GET /not.byn") {
                var serial = this._snByUrl[baseUrl];
                if(serial) {
                    lockdev = this._devs[serial];
                }
            }
        } else {
            lockdev = this.getDevice(str_device);
            if(!lockdev) {
                return {errorType:YAPI_DEVICE_NOT_FOUND, 
                         errorMsg:"Device ["+str_device+"] not online",
                         result:null};
            }
            // use the device cache when loading the whole API
            if(lines[0] == "GET /api.json") {
                return lockdev.requestAPI();
            }
            baseUrl = lockdev.getRootUrl();
        }
        // map str_device to a URL
        var words = lines[0].split(" ");
        if(words.length < 2) {
            return {errorType:YAPI_INVALID_ARGUMENT, 
                     errorMsg: "Invalid request, not enough words; expected a method name and a URL", 
                     result: null};
        } else if(words.length > 2) {
            return {errorType:YAPI_INVALID_ARGUMENT, 
                     errorMsg: "Invalid request, too many words; make sure the URL is URI-encoded", 
                     result: null};
        }
        var method = words[0];
        var devUrl = words[1];        
        if(devUrl.substr(0,1) == "/") devUrl = devUrl.substr(1);
        var httpRequest = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        try { 
            httpRequest.reqUrl = baseUrl+devUrl;
            httpRequest.open(method,baseUrl+devUrl,async,'','');
            if(!obj_body) {
                obj_body = '';
            } else if(typeof FormData == "undefined" && obj_body.length > 4 && obj_body.slice(0,2) == '--') {
                // Add form-encoding header
                var boundary = obj_body.slice(2, obj_body.indexOf('\r'));
                httpRequest.setRequestHeader("Content-Type", "multipart/form-data; boundary="+boundary);
            }
            if(async) {
                httpRequest.onreadystatechange = function() { 
                    if(lockdev && httpRequest.readyState==4) {
                        lockdev._runningQuery = null;
                        lockdev._busy--;
                        func_statechanged(httpRequest);
                        while(lockdev._busy == 0 && lockdev._pendingQueries.length > 0) {
                            var pq = lockdev._pendingQueries.shift();
                            if(pq.xhr) {
                                // send pending query
                                lockdev._busy++;
                                lockdev._runningQuery = pq.xhr;
                                pq.xhr.send(pq.body);
                            } else if(pq.cb) {
                                // notify queued callback
                                pq.cb(pq.ctx, pq.obj);
                            }
                        }
                    } else {
                        func_statechanged(httpRequest); 
                    }
                }
                if(lockdev && (lockdev._busy > 0 || lockdev._pendingQueries.length > 0)) {
                    lockdev._pendingQueries.push({xhr:httpRequest,body:obj_body});
                } else {
                    if(lockdev) {
                        lockdev._busy++;
                        lockdev._runningQuery = httpRequest;
                    }
                    httpRequest.send(obj_body);
                }
            } else {
                if(lockdev && lockdev._busy > 0 && (baseUrl.indexOf('/bySerial/') >= 0 || 
                                                    baseUrl.indexOf('/byName/') >= 0)) {
                    //console.log("HTTP blocking request: "+httpRequest.reqUrl);
                    //console.log("Currently executing: "+lockdev._runningQuery.reqUrl);
                    return {errorType:YAPI_DEVICE_BUSY, 
                             errorMsg: "Non-async request would deadlock the browser", 
                             result: null};
                }
                if(lockdev) {
                    lockdev._busy++;
                    lockdev._runningQuery = httpRequest;
                }
                httpRequest.send(obj_body);
                if(lockdev) {
                    lockdev._runningQuery = null;
                    lockdev._busy--;
                }
            }
        } catch(err) {
            //alert('http error:'+(err.message || err.description));
            return {errorType:YAPI_IO_ERROR, 
                     errorMsg:"HTTP request raised an exception: "+(err.message || err.description), 
                     result:null};
        }
        if(!async) {
            // called in blocking mode
            if(httpRequest.status != 200 && httpRequest.status != 304) {
                return {errorType:YAPI_IO_ERROR, 
                         errorMsg:"Received HTTP status "+httpRequest.status+" ("+httpRequest.responseText+") for "+baseUrl+devUrl, 
                         result:null};
            }
            return {errorType:YAPI_SUCCESS, 
                     errorMsg:"no error", 
                     result:String(httpRequest.responseText)};
        } else {
            // called in asynchronous mode
            return {errorType:YAPI_SUCCESS, 
                     errorMsg:"no error", 
                     result:httpRequest};
        }
    }

    // Perform an HTTP request on a device, by URL or identifier. 
    // This is the asynchronous version, that uses a callback instead of a return value in order to avoid
    // blocking the whole browser on Firefox due to their ill-implemented virtual machine, that does not 
    // properly implements javascript context switching during blocking I/O calls (other browsers do it right).
    function YAPI_devRequest_async(str_device, str_request, obj_body, func_callback, obj_context)
    {
        var yreq = this.devRequest(str_device, str_request, function(httpRequest) {
            if (httpRequest.readyState == 4) {
                if(httpRequest.status != 200 && httpRequest.status != 304) {
                    func_callback(obj_context, {errorType:YAPI_IO_ERROR, 
                                                errorMsg:"Received HTTP status "+httpRequest.status+" ("+httpRequest.responseText+")", 
                                                result:null});
                } else {
                    func_callback(obj_context, {errorType:YAPI_SUCCESS, 
                                                errorMsg:"no error", 
                                                result:String(httpRequest.responseText)});
                }
            }
        }, obj_body);
        if(yreq.errorType != YAPI_SUCCESS && func_callback) {
            func_callback(obj_context, yreq);
        }
    }

    // Locate the device to access a specified function. May cause device list update if needed
    function YAPI_funcDev_internal(obj_ctx, int_prevresult)
    {
        var res;
        
        if(int_prevresult != YAPI_SUCCESS) {
            res = {errorType: int_prevresult, 
                    errorMsg:  YAPI._lastErrorMsg,
                    result:    null};
            if(obj_ctx.callback) obj_ctx.callback(obj_ctx.context, res);
            return res;
        }
        var str_className = obj_ctx.className;
        var str_func = obj_ctx.func;
        var resolve = YAPI.resolveFunction(str_className, str_func);
        if(resolve.errorType != YAPI_SUCCESS) {
            if(obj_ctx.callback) obj_ctx.callback(obj_ctx.context, resolve);
            return resolve;
        }
        str_func = resolve.result;
        var dotpos = str_func.indexOf(".");
        var devid = str_func.substr(0,dotpos);
        var funcid = str_func.substr(dotpos+1);
        var dev = YAPI.getDevice(devid);
        if(dev == null) {
            res = {errorType: YAPI_DEVICE_NOT_FOUND, 
                    errorMsg:  "Device ["+devid+"] not found",
                    result:    null};
        } else {
            res = {errorType: YAPI_SUCCESS, 
                    errorMsg:  "no error", 
                    result:    {device:dev, deviceid:devid, functionid:funcid, hwid:str_func}};
        }
        if(obj_ctx.callback) obj_ctx.callback(obj_ctx.context, res);
        return res;
    }
    
    // Locate the device to access a specified function. May cause device list update if needed
    function YAPI_funcDev_async(str_className, str_func, func_callback, obj_context)
    {
        var resolve = this._funcDev_internal({className: str_className, func: str_func}, YAPI_SUCCESS);
        if(resolve.errorType == YAPI_SUCCESS) {
            func_callback(obj_context, resolve);
        } else if(resolve.errorType == YAPI_DEVICE_NOT_FOUND && this._hubs.length == 0) { 
            // when USB is supported, check if no USB device is connected before outputing this message
            resolve.errorMsg = "Impossible to contact any device because no hub has been registered";
            func_callback(obj_context, resolve);
        } else {
            this.UpdateDeviceList_async(this._funcDev_internal, 
                                        {className: str_className, 
                                          func:      str_func,
                                          callback:  func_callback,
                                          context:   obj_context});
        }
    }

    // Locate the device to access a specified function. May cause device list update if needed
    function YAPI_funcDev(str_className, str_func)
    {
        var resolve = this._funcDev_internal({className: str_className, func: str_func}, YAPI_SUCCESS);
        if(resolve.errorType == YAPI_SUCCESS) {
            return resolve;
        } else if(resolve.errorType == YAPI_DEVICE_NOT_FOUND && this._hubs.length == 0) { 
            // when USB is supported, check if no USB device is connected before outputing this message
            resolve.errorMsg = "Impossible to contact any device because no hub has been registered";
            return resolve;
        }
        resolve = this._updateDeviceList_internal(true, false);
        if(resolve.errorType != YAPI_SUCCESS) {
            return resolve;
        }
        return this._funcDev_internal({className: str_className, func: str_func}, YAPI_SUCCESS);
    }

    // Load and parse the REST API for a function given by class name and identifier, possibly applying changes
    // Device cache will be preloaded when loading function "module" and leveraged for other modules
    // Return a strucure including errorType, errorMsg and result
    function YAPI_funcRequest(str_className, str_func, str_extra)
    {
        var devreq = this._funcDev(str_className, str_func);
        if(devreq.errorType != YAPI_SUCCESS) {
            return devreq;
        }
        devreq = devreq.result;
        var loadval = null;
        if(str_extra == "") {
            // use a cached API string (reload if needed)
            var yreq = devreq.device.requestAPI();
            if(yreq != null) {
                if(yreq.errorType != YAPI_SUCCESS) return yreq;
                try {loadval = JSON.parse(yreq.result)[devreq.functionid];} catch(err) {}
            }
        } else {
            devreq.device.dropCache();
        }
        if(!loadval) {
            // request specified function only to minimize traffic
            if(str_extra == "") str_extra = ".json";
            var httpreq = "GET /api/"+devreq.functionid+str_extra;
            var yreq = this.devRequest(devreq.deviceid, httpreq);
            if(yreq.errorType != YAPI_SUCCESS) return yreq;
            if(yreq.result == '' && httpreq.indexOf('?') >= 0) return yreq;
            try {loadval = JSON.parse(yreq.result);} catch(err) {}
        }
        if(!loadval) {
            return {errorType:YAPI_IO_ERROR, 
                     errorMsg:"Request failed, could not parse API value for function "+devreq.hwid, 
                     result:null};
        }
        yreq.result = loadval;
        return yreq;
    }

    // Load and parse the REST API for a function given by class name and identifier, possibly applying changes
    // Device cache will be preloaded when loading function "module" and leveraged for other modules
    // This is the asynchronous version, that uses a callback instead of a return value in order to avoid
    // blocking the whole browser on Firefox due to their ill-implemented virtual machine, that does not 
    // properly implements javascript context switching during blocking I/O calls (other browsers do it right).
    function YAPI_funcRequest_async(str_className, str_func, str_extra, func_callback, obj_context)
    {
        var devreq = this._funcDev_async(str_className, str_func, function(obj_ctx, devreq) {
            if(devreq.errorType != YAPI_SUCCESS) {
                if(obj_ctx.callback) obj_ctx.callback(obj_ctx.context, devreq);
                return;
            }
            devreq = devreq.result;
            var reqcb = function(params, yreq) {
                var loadval = null;
                if(yreq != null) {
                    if(yreq.errorType != YAPI_SUCCESS) {
                        if(params.cb) params.cb(params.ctx, yreq);
                        return;
                    }
                    if(!params.cb) {
                        loadval = '';
                    } else if(yreq.result == '' && str_extra.indexOf('?') >= 0) {
                        loadval = '';
                    } else {
                        try {loadval = JSON.parse(yreq.result);} catch(err) {}
                    }
                    if(!loadval) {
                        if(params.cb) params.cb(params.ctx, {
                            errorType:YAPI_IO_ERROR, 
                            errorMsg:"Request failed, could not parse API value for function "+params.hwid, 
                            result:null
                        });
                        return;
                    }
                    if(params.funcid != null) loadval = loadval[params.funcid];
                    yreq.result = loadval;
                    if(params.cb) params.cb(params.ctx, yreq);
                    return;
                }
            };
            if(obj_ctx.extra == "") {
                // use a cached API string (reload if needed)
                devreq.device.requestAPI_async(reqcb, {funcid:devreq.functionid, 
                                                        hwid:devreq.hwid, 
                                                        cb:obj_ctx.callback, 
                                                        ctx:obj_ctx.context});
            } else {
                // request specified function only to minimize traffic
                devreq.device.dropCache();
                var httpreq = "GET /api/"+devreq.functionid+obj_ctx.extra;
                YAPI.devRequest_async(devreq.deviceid, httpreq, '',
                                      reqcb, {funcid:null, 
                                              hwid:devreq.hwid, 
                                              cb:obj_ctx.callback, 
                                              ctx:obj_ctx.context});
            }
        }, {extra: str_extra, callback: func_callback, context: obj_context} );
    }

    // Perform an HTTP request on a device and return the result string
    // Throw an exception (or return YAPI_ERROR_STRING on error)
    function YAPI_HTTPRequest(str_device, str_request)
    {
        var yreq = this.devRequest(str_device, str_request);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }
        return yreq.result;
    }

    // Perform an HTTP request on a device and return the result string
    // This is the asynchronous version, that uses a callback instead of a return value in order to avoid
    // blocking the whole browser on Firefox due to their ill-implemented virtual machine, that does not 
    // properly implements javascript context switching during blocking I/O calls (other browsers do it right).
    function YAPI_HTTPRequest_async(str_device, str_request, func_callback, obj_context)
    {
        this.devRequest_async(str_device, str_request, '',
                              function(params, yreq) {
                                  if(yreq.errorType != YAPI_SUCCESS) {
                                      params.obj._throw(yreq.errorType, yreq.errorMsg, null);
                                      if(params.cb) params.cb(params.ctx, null);
                                      return;
                                  }
                                  if(params.cb) params.cb(params.ctx, yreq.result);
                              },
                              {obj:this, cb:func_callback, ctx:obj_context});
    }

    /*
     * Return the API version
     */
    function YAPI_GetAPIVersion()
    {
        return "1.01.PATCH_WITH_BUILD";
    }

    /**
     * Initializes the Yoctopuce programming library explicitly.
     * It is not strictly needed to call yInitAPI(), as the library is
     * automatically  initialized when calling yRegisterHub() for the
     * first time.
     * 
     * When Y_DETECT_NONE is used as detection mode,
     * you must explicitly use yRegisterHub() to point the API to the
     * VirtualHub on which your devices are connected before trying to access them.
     * 
     * @param mode : an integer corresponding to the type of automatic
     *         device detection to use. Possible values are
     *         Y_DETECT_NONE, Y_DETECT_USB, Y_DETECT_NET,
     *         and Y_DETECT_ALL.
     * @param errmsg : a string passed by reference to receive any error message.
     * 
     * @return YAPI_SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_InitAPI(int_mode,obj_errmsg) 
    { 
        // nothing to be done for now
        return YAPI_SUCCESS;
    }

    /**
     * Frees dynamically allocated memory blocks used by the Yoctopuce library.
     * It is generally not required to call this function, unless you
     * want to free all dynamically allocated memory blocks in order to
     * track a memory leak for instance.
     * You should not call any other library function after calling
     * yFreeAPI(), or your program will crash.
     */
    function YAPI_FreeAPI() 
    { 
        // clear all caches
        this._hubs = []; 
        this._devs = {};  
        this._snByUrl = {}; 
        this._snByName = {}; 
        this._fnByType = {};
    }

    /**
     * Disables the use of exceptions to report runtime errors.
     * When exceptions are disabled, every function returns a specific
     * error value which depends on its type and which is documented in
     * this reference manual.
     */
    function YAPI_DisableExceptions() 
    { 
        this.exceptionsDisabled = true;
    }

    /**
     * Re-enables the use of exceptions for runtime error handling.
     * Be aware than when exceptions are enabled, every function that fails
     * triggers an exception. If the exception is not caught by the user code,
     * it  either fires the debugger or aborts (i.e. crash) the program.
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_EnableExceptions() 
    { 
        this.exceptionsDisabled = false;
    }


    function _cleanRegisteredUrl(str_url)
    {
    
        if (str_url.indexOf("http://")!=0){
            str_url = "http://"+str_url;
        }

        if(str_url.slice(-1) != "/") {
            str_url = str_url + "/";
        }

		var portpos = str_url.indexOf(":",7);
		var slpos   = str_url.indexOf("/",7);
        if(portpos<0 || portpos>slpos)
		    str_url = str_url.slice(0,slpos)+":4444"+str_url.slice(slpos);
	        
	    return str_url;
    }




    /**
     * Setup the Yoctopuce library to use modules connected on a given machine. The
     * parameter will determine how the API will work. Use the follwing values:
     * 
     * <b>usb</b>: When the usb keyword is used, the API will work with
     * devices connected directly to the USB bus. Some programming languages such a Javascript,
     * PHP, and Java don't provide direct access to USB harware, so usb will
     * not work with these. In this case, use a VirtualHub or a networked YoctoHub (see below).
     * 
     * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
     * host with the given IP address or hostname. That host can be a regular computer
     * running a VirtualHub, or a networked YoctoHub such as YoctoHub-Ethernet or
     * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
     * computer, use the IP address 127.0.0.1.
     * 
     * <b>callback</b>: that keywork make the API run in "<i>HTTP Callback</i>" mode.
     * This a special mode allowing to take control of Yoctopuce devices
     * through a NAT filter when using a VirtualHub ou a networked YoctoHub. You only
     * need to configure your hub to call your server script on a regular basis.
     * This mode is currently available for PHP only.
     * 
     * Be aware that only one application can use direct USB access at a
     * given time on a machine. Multiple access would cause conflicts
     * while trying to access the USB modules. In particular, this means
     * that you must stop the VirtualHub software before starting
     * an application that uses direct USB access. The workaround
     * for this limitation is to setup the library to use the VirtualHub
     * rather than direct USB access.
     * 
     * If acces control has been activated on the hub, virtual or not, you want to
     * reach, the URL parameter should look like:
     * 
     * http://username:password@adresse:port
     * 
     * You can call <i>RegisterHub</i> several times to connect to several machines.
     * 
     * @param url : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg : a string passed by reference to receive any error message.
     * 
     * @return YAPI_SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_RegisterHub(str_rooturl,obj_errmsg)
    {
        var i;

        str_rooturl = _cleanRegisteredUrl(str_rooturl);

        var yreq = YAPI.devRequest(str_rooturl, "GET /api.json");
        if(yreq.errorType != YAPI_SUCCESS) {
            if(obj_errmsg != undefined) obj_errmsg.msg = yreq.errorMsg;
            return this._throw(YAPI_DEVICE_NOT_FOUND, yreq.errorMsg, YAPI_DEVICE_NOT_FOUND);
        }

        YAPI.PreregisterHub(str_rooturl,obj_errmsg,true)
        // If hub is not yet known, create a device object (synchronous call)
        var serial = this._snByUrl[str_rooturl];
        if(!serial) {
            new YDevice(str_rooturl, null, null);
        }

        // Register device list
        yreq = this._updateDeviceList_internal(true, false);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(obj_errmsg != undefined) obj_errmsg.msg = yreq.errorMsg;
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a given machine.
     * When using Yoctopuce modules through the VirtualHub gateway,
     * you should provide as parameter the address of the machine on which the
     * VirtualHub software is running (typically "http://127.0.0.1:4444",
     * which represents the local machine).
     * When you use a language which has direct access to the USB hardware,
     * you can use the pseudo-URL "usb" instead.
     * 
     * Be aware that only one application can use direct USB access at a
     * given time on a machine. Multiple access would cause conflicts
     * while trying to access the USB modules. In particular, this means
     * that you must stop the VirtualHub software before starting
     * an application that uses direct USB access. The workaround
     * for this limitation is to setup the library to use the VirtualHub
     * rather than direct USB access.
     * 
     * If acces control has been activated on the VirtualHub you want to
     * reach, the URL parameter should look like:
     * 
     * http://username:password@adresse:port
     * 
     * @param url : a string containing either the root URL of the hub to monitor
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments: the caller-specific
     *         context object, the result code (YAPI_SUCCESS if the operation 
     *         completes successfully) and the error message.
     * @param context : caller-specific object that is passed as-is to the callback function
     * 
     * @return YAPI_SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
   function YAPI_RegisterHub_async(str_rooturl, func_callback, obj_context)
    {
        var i;

        str_rooturl = _cleanRegisteredUrl(str_rooturl);

        YAPI.devRequest_async(str_rooturl, "GET /api.json", '', function(params,yreq) {
           if(yreq.errorType != YAPI_SUCCESS) {
               params.cb(params.ctx, yreq.errorType, yreq.errorMsg);
           }
           YAPI.PreregisterHub(params.rooturl,null,true);
           // If hub is not yet known, create a device object
           var serial = YAPI._snByUrl[str_rooturl];
           if(!serial) {
               // create device asynchronously, without callback
               new YDevice(str_rooturl, null, null, function(params,res) {
                  // Update device list
                  YAPI.UpdateDeviceList_async(params.cb, params.ctx);
               }, params);
           }
           
        }, {rooturl: str_rooturl, cb: func_callback, ctx: obj_context});
        return YAPI_SUCCESS;
    }


    /**
     * Setup the Yoctopuce library to use modules connected on a given machine.
     * When using Yoctopuce modules through the VirtualHub gateway,
     * you should provide as parameter the address of the machine on which the
     * VirtualHub software is running (typically "http://127.0.0.1:4444",
     * which represents the local machine).
     * 
     * If acces control has been activated on the VirtualHub you want to
     * reach, the URL parameter should look like:
     * 
     * http://username:password@adresse:port
     * 
     * @param url : a string containing the root URL of the hub to monitor
     * @param errmsg : a string passed by reference to receive any error message.
     * 
     * @return YAPI_SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_PreregisterHub(str_rooturl, obj_errmsg, bool_DontCreateDevice)
    {
        var i;

        str_rooturl = _cleanRegisteredUrl(str_rooturl);

        for(i = 0; i < this._hubs.length; i++) {
            if(this._hubs[i].rooturl == str_rooturl) return YAPI_SUCCESS;
        }

        // Add hub to known list
        var notiflen = 32500;
        if(navigator.appName == 'Microsoft Internet Explorer') {
            notiflen = 1;
        }
        var newhub = {
            hubidx          : this._hubs.length,   // index of hub in array
            rooturl         : str_rooturl,         // root URL of the hub
            notiflen        : notiflen,            // notification message length before forced deconnection
            notifTrigger    : 0,                   // timestamp of next manual updateDeviceList that would open not.byn
            devListValidity : 500,                 // default validity of updateDeviceList
            devListExpires  : 0,                   // timestamp of next useful updateDeviceList
            serialByYdx     : [],                  // serials by hub-specific devYdx
            retryDelay      : 15,                  // delay before reconnecting in case of error: initially 15ms
            notifPos        : -1,                  // current absolute position in hub notification stream
            currPos         : 0                    // current position in data stream
        }            
        this._hubs.push(newhub);

        if(!bool_DontCreateDevice) {
            // If hub is not yet known, create a device object
            var serial = this._snByUrl[str_rooturl];
            if(!serial) {
                // create device asynchronously, without callback
                new YDevice(str_rooturl, null, null, function(){});
            }
        }

        return YAPI_SUCCESS;
    }


    /**
     * Setup the Yoctopuce library to no more use modules connected on a previously
     * registered machine with RegisterHub.
     * 
     * @param url : a string containing either "usb" or the
     *         root URL of the hub to monitor
     */
    function YAPI_UnregisterHub(str_rooturl)
    {
        var i,j;

        str_rooturl = _cleanRegisteredUrl(str_rooturl);

        for(i = 0; i < this._hubs.length; i++) {
            if(this._hubs[i].rooturl == str_rooturl)  {
            	for (j =0 ; j< this._hubs[i].serialByYdx.length ; j++) {
            		var serial = this._hubs[i].serialByYdx[j];
	            	this.forgetDevice(this._devs[serial]);
            	}
                var before = this._hubs.slice(0,i);
                if(i+1 < this._hubs.length) {
                    var after  = this._hubs.slice(i+1,this._hubs.length);
                    thishub = before.concat(after);
                }
                this._hubs =  before;                    
                return;
            }
        }
        return;
    }

    /**
     * Triggers a (re)detection of connected Yoctopuce modules.
     * The library searches the machines or USB ports previously registered using
     * yRegisterHub(), and invokes any user-defined callback function
     * in case a change in the list of connected devices is detected.
     * 
     * This function can be called as frequently as desired to refresh the device list
     * and to make the application aware of hot-plug events.
     * 
     * @param errmsg : a string passed by reference to receive any error message.
     * 
     * @return YAPI_SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_UpdateDeviceList(obj_errmsg)
    {
        var yreq = this._updateDeviceList_internal(false, true);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(obj_errmsg!=undefined) obj_errmsg.msg = yreq.errorMsg;
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Triggers a (re)detection of connected Yoctopuce modules.
     * The library searches the machines or USB ports previously registered using
     * yRegisterHub(), and invokes any user-defined callback function
     * in case a change in the list of connected devices is detected.
     * 
     * This function can be called as frequently as desired to refresh the device list
     * and to make the application aware of hot-plug events.
     * 
     * This asynchronous version exists only in Javascript. It uses a callback instead
     * of a return value in order to avoid blocking Firefox Javascript VM that does not
     * implement context switching during blocking I/O calls.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments: the caller-specific
     *         context object, the result code (YAPI_SUCCESS
     *         if the operation completes successfully) and the error
     *         message.
     * @param context : caller-specific object that is passed as-is to the callback function
     * 
     * @return nothing : the result is provided to the callback.
     */
    function YAPI_UpdateDeviceList_async(func_callback, obj_context)
    {
        // Rescan all hubs and update list of online devices
        var func_iter = function(ctx) {
            ctx.hubs[ctx.updidx].hubdev.refresh_async(function(ctx, retcode) {
                if(retcode != YAPI_SUCCESS) {
                    ctx.usercb(ctx.userctx, retcode, YAPI._lastErrorMsg);
                    return;
                }
                ctx.hubs[ctx.updidx].hubdev.requestAPI_async(function(ctx, yreq) {
                    if(yreq.errorType != YAPI_SUCCESS) {
                        ctx.usercb(ctx.userctx, yreq.errorType, yreq.errorMsg);
                        return;
                    }
                    var retcode = YAPI._updateDeviceList_process(ctx, yreq);
                    if(retcode != YAPI_SUCCESS) {
                        ctx.usercb(ctx.userctx, retcode, YAPI._lastErrorMsg);
                        return;
                    }
                    if(++ctx.updidx < ctx.hubs.length) {
                        ctx.iter(ctx);
                    } else {
                        ctx.usercb(ctx.userctx, YAPI_SUCCESS, 'no error');
                        return;
                    }
                }, ctx);
            }, ctx);
        };

        var ctx = this._updateDeviceList_init();
        if(ctx==null) return;
        ctx.usercb  = func_callback;
        ctx.userctx = obj_context;
        ctx.iter    = func_iter;
        if(ctx.hubs.length == 0) {
            ctx.usercb(ctx.userctx, YAPI_SUCCESS, 'no error');
            return;
        }

        ctx.iter(ctx);
    }

    /**
     * Maintains the device-to-library communication channel.
     * If your program includes significant loops, you may want to include
     * a call to this function to make sure that the library takes care of
     * the information pushed by the modules on the communication channels.
     * This is not strictly necessary, but it may improve the reactivity
     * of the library for the following commands.
     * 
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     * 
     * @param errmsg : a string passed by reference to receive any error message.
     * 
     * @return YAPI_SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_HandleEvents(obj_errmsg)
    {
        var nEvents = this._pendingValues.length;
        for(var i = 0; i < nEvents; i++) {
            var evt = this._pendingValues[i];
            if(evt[0]._valueCallback) {
                evt[0]._valueCallback(evt[0], evt[1]);
            }
        }
        this._pendingValues = this._pendingValues.slice(nEvents);

        return YAPI_SUCCESS;
    }

    /**
     * Pauses the execution flow for a specified duration.
     * This function implements a passive waiting loop, meaning that it does not
     * consume CPU cycles significatively. The processor is left available for
     * other threads and processes. During the pause, the library nevertheless
     * reads from time to time information from the Yoctopuce modules by
     * calling yHandleEvents(), in order to stay up-to-date.
     * 
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     * 
     * @param ms_duration : an integer corresponding to the duration of the pause,
     *         in milliseconds.
     * @param errmsg : a string passed by reference to receive any error message.
     * 
     * @return YAPI_SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_Sleep(int_ms_duration, obj_errmsg)
    {
        var end = this.GetTickCount() + int_ms_duration;
        do {
            this.HandleEvents(obj_errmsg);
        } while(this.GetTickCount() < end);

        return YAPI_SUCCESS;
    }

    /**
     * Invoke the specified callback function after a given timeout.
     * This function behaves more or less like Javascript setTimeout,
     * but during the waiting time, it will call yHandleEvents
     * and yUpdateDeviceList periodically, in order to
     * keep the API up-to-date with current devices.
     * 
     * @param callback : the function to call after the timeout occurs.
     *         On Microsoft Internet Explorer, the callback must
     *         be provided as a string to be evaluated.
     * @param ms_timeout : an integer corresponding to the duration of the
     *         timeout, in milliseconds.
     * @param arguments : additional arguments to be passed to the
     *         callback function can be provided, if needed
     *         (not supported on Microsoft Internet Explorer).
     * 
     * @return YAPI_SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_SetTimeout(func_callback, int_ms_timeout, optional_arguments)
    {
        var ctx = {
            usercb:   func_callback,
            userargs: optional_arguments,
            endtime:  YAPI.GetTickCount()+int_ms_timeout,
            updevlist: true
        };
        this.HandleEvents();
        YAPI._forwardValues++;
        YAPI._setTimeout_internal(ctx);
        
        return YAPI_SUCCESS;
    }

    function YAPI_setTimeout_internal(obj_ctx)
    {
        var nextcall = obj_ctx.endtime - YAPI.GetTickCount();
        if(nextcall <= 0) {
            YAPI._forwardValues--;
            if(typeof obj_ctx.usercb == "function") {
                obj_ctx.usercb.apply(null, obj_ctx.userargs);
            } else {
                eval(obj_ctx.usercb);
            }
        } else if(obj_ctx.updevlist) {
            obj_ctx.updevlist = false;
            YAPI.UpdateDeviceList_async(YAPI._setTimeout_internal, obj_ctx);
        } else {
            nextcall = obj_ctx.endtime - YAPI.GetTickCount();
            if(nextcall > 100) nextcall = 100;
            if(navigator.appName == 'Microsoft Internet Explorer') {
                var evalstr = "YAPI._setTimeout_internal({usercb:'";
                for (i = 0; i < obj_ctx.usercb.length; i++) {
                    var ascii = obj_ctx.usercb.charCodeAt(i);
                    if ((ascii>=32)&&(ascii<=127)&&(ascii!=34)&&(ascii!=39)) {
                        evalstr += obj_ctx.usercb.charAt(i);
                    } else {
                        var hex = ascii.toString(16).toUpperCase();
                        if (hex.length==1) hex = '0'+hex;
                        evalstr += String.fromCharCode(92) + 'x'+ hex; 
                    }  
                }
                evalstr += "',userargs:[],endtime:"+obj_ctx.endtime+",updevlist:true})";
                setTimeout(evalstr, nextcall);
            } else {
                obj_ctx.updevlist=true;
                setTimeout(YAPI._setTimeout_internal, nextcall, obj_ctx);
            }
        }
    }

    /**
     * Returns the current value of a monotone millisecond-based time counter.
     * This counter can be used to compute delays in relation with
     * Yoctopuce devices, which also uses the millisecond as timebase.
     * 
     * @return a long integer corresponding to the millisecond counter.
     */
    function YAPI_GetTickCount()
    {
        return +new Date();
    }

    /**
     * Checks if a given string is valid as logical name for a module or a function.
     * A valid logical name has a maximum of 19 characters, all among
     * A..Z, a..z, 0..9, _, and -.
     * If you try to configure a logical name with an incorrect string,
     * the invalid characters are ignored.
     * 
     * @param name : a string containing the name to check.
     * 
     * @return true if the name is valid, false otherwise.
     */
    function YAPI_CheckLogicalName(str_name)
    {
        if(str_name == "") return true;
        if(!str_name) return false;
        if(str_name.length > 19) return false;
        return /^[A-Za-z0-9_\-]*$/.test(str_name);
    }

    /**
     * Register a callback function, to be called each time
     * a device is pluged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     * 
     * @param arrivalCallback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    function YAPI_RegisterDeviceArrivalCallback(func_arrivalCallback)
    {
        this._arrivalCallback = func_arrivalCallback;
    }

    /**
     * Register a device logical name change callback
     */
    function YAPI_RegisterDeviceChangeCallback(func_changeCallback)
    {
        this._namechgCallback = func_changeCallback;        
    }

    /**
     * Register a callback function, to be called each time
     * a device is unpluged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     * 
     * @param removalCallback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    function YAPI_RegisterDeviceRemovalCallback(func_removalCallback)
    {
        this._removalCallback = func_removalCallback;
    }

    // Register a new value calibration handler for a given calibration type
    //
    function YAPI_RegisterCalibrationHandler(int_calibrationType, func_calibrationHandler)
    {
        this._calibHandlers[int_calibrationType.toString()] = func_calibrationHandler;
    }

    // Standard value calibration handler (n-point linear error correction)
    //
    function YAPI_LinearCalibrationHandler(float_rawValue, int_calibType, arr_calibParams,
                                           arr_calibRawValues, arr_calibRefValues)
    {
        // calibration types n=1..10 and 11..20 are meant for linear calibration using n points
        var npt = Math.min(int_calibType % 10, arr_calibRawValues.length, arr_calibRefValues.length);
        var x   = arr_calibRawValues[0];
        var adj = arr_calibRefValues[0] - x;
        var i   = 0;

        while(float_rawValue > arr_calibRawValues[i] && ++i < npt) {
            var x2   = x;
            var adj2 = adj;

            x   = arr_calibRawValues[i];
            adj = arr_calibRefValues[i] - x;

            if(float_rawValue < x && x > x2) {
                adj = adj2 + (adj - adj2) * (float_rawValue - x2) / (x - x2);
            }
        }
        return float_rawValue + adj;
    }

    // WPA preshared-key computation
    //
    var _shaw;

    function _initshaw(str_s, int_pad, int_xinit)
    {
        var i, j = -1, k = 0;
        var n = str_s.length;

        _shaw = new Array(80);
        for(i = 0; i < 64; i++) {
            var c = 0;
            if (i < n) {
                c = str_s.charCodeAt(i);
            } else if (int_pad != 0) {
                if (i == n + 3) c = int_pad;
                else if (i == n + 4) c = 0x80;
            }
            if (k == 0) {
                j++;
                _shaw[j] = 0;
                k = 32;
            }
            k -= 8;
            _shaw[j] |= (c << k);
        }
        if(int_pad != 0) {
            _shaw[15] = 8 * (64 + n + 4);
        }
        if(int_xinit != 0) {
            var xdw = (int_xinit << 16) | int_xinit;
            for (j = 0; j < 16; j++) {
                _shaw[j] ^= xdw;
            }
        }
    }

    function _itershaw(s)
    {
        var a, b, c, d, e, t, k;

        a = s[0];
        b = s[1];
        c = s[2];
        d = s[3];
        e = s[4];
        for (k = 16; k < 80; k++) {
            t = _shaw[k - 3] ^ _shaw[k - 8] ^ _shaw[k - 14] ^ _shaw[k - 16];
            _shaw[k] = (t << 1) | (t >>> 31);
        }
        for (k = 0; k < 20; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x5A827999 + ((b & c) | ((~b) & d));
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff
        }
        for (k = 20; k < 40; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x6ED9EBA1 + (b^c^d);
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff
        }
        for (k = 40; k < 60; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0x8F1BBCDC + ((b & c) | (b & d) | (c & d));
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff
        }
        for (k = 60; k < 80; k++) {
            t = ((a << 5) | (a >>> 27)) + e + _shaw[k] + 0xCA62C1D6 + (b^c^d);
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t & 0xffffffff
        }
        _shaw[0] = (s[0] + a) & 0xffffffff;
        _shaw[1] = (s[1] + b) & 0xffffffff;
        _shaw[2] = (s[2] + c) & 0xffffffff;
        _shaw[3] = (s[3] + d) & 0xffffffff;
        _shaw[4] = (s[4] + e) & 0xffffffff;
    }

    /**
     * Compute the WPA Preshared key for a given SSID and passphrase
     * 
     * @param ssid : the access point SSID
     * @param pass : the access point WPA/WPA2 passphrase
     * 
     * @return an hexadecimal string for the preshared key
     */
    function YAPI_ComputePSK(str_ssid, str_pass)
    {
        var sha1_init = [ 0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0 ];
        var inner=[], outer=[], shau=[], res=[];
        var iter, pos, k;

        
        // precompute part of sha used in the loops
        _initshaw(str_pass, 0, 0x3636);
        _itershaw(sha1_init);
        for(k = 0; k < 5; k++) inner[k] = _shaw[k];
        _initshaw(str_pass, 0, 0x5c5c);
        _itershaw(sha1_init);
        for(k = 0; k < 5; k++) outer[k] = _shaw[k];

        // prepare to compute first 20 bytes
        pos = 0;
        for(k = 0; k < 5; k++) shau[k] = 0;
        _initshaw(str_ssid, 1, 0);

        for(iter = 0; iter < 8192;) {
            _itershaw(inner);
            _shaw[5] = 0x80000000;
            for (k = 6; k < 15; k++) {
                _shaw[k] = 0;
            }
            _shaw[15] = 8 * (64 + 20);
            _itershaw(outer);
            shau[0] ^= _shaw[0];
            shau[1] ^= _shaw[1];
            shau[2] ^= _shaw[2];
            shau[3] ^= _shaw[3];
            shau[4] ^= _shaw[4];
            iter++;
            // after 4096 loops, move to 2nd half of sha1
            if((iter & 4095) == 0) {
                for(k = 0; k < 5 && pos < 32; k++) {
                    res[pos++] = (shau[k] >>> 24) & 0xff;
                    res[pos++] = (shau[k] >>> 16) & 0xff;
                    res[pos++] = (shau[k] >>> 8) & 0xff;
                    res[pos++] = shau[k] & 0xff;
                }
                if(iter == 4096) {
                    for(k = 0; k < 5; k++) shau[k] = 0;
                    _initshaw(str_ssid, 2, 0);
                }
            }
        }
        var hex = '';
        for(k = 0; k < 32; k++) {
            hex += ('0'+Number(res[k]).toString(16)).slice(-2);
        }
        return hex;
    }

    function _YAPI()
    {
        // private
        this._hubs = [];          // array of root urls
        this._devs = {};          // hash table of known devices, by serial number
        this._snByUrl = {};       // serial number for each known device, by URL
        this._snByName = {};      // serial number for each known device, by name
        this._fnByType = {};      // functions by type
        this._lastErrorType             = YAPI_SUCCESS;
        this._lastErrorMsg              = "no error";
        this._firstArrival              = true;
        this._pendingCallbacks          = [];
        this._arrivalCallback           = null;
        this._namechgCallback           = null;
        this._removalCallback           = null;
        this._pendingValues             = [];
        this._forwardValues             = 0;
        this._calibHandlers             = {};
        this._throw                     = YAPI_throw;
        this._funcDev_internal          = YAPI_funcDev_internal;
        this._funcDev_async             = YAPI_funcDev_async;
        this._funcDev                   = YAPI_funcDev;
        this._updateDeviceList_init     = YAPI_updateDeviceList_init;
        this._updateDeviceList_process  = YAPI_updateDeviceList_process;        
        this._updateDeviceList_internal = YAPI_updateDeviceList_internal;
        this._setTimeout_internal       = YAPI_setTimeout_internal;

        // Internal functions
        this.getDevice          = YAPI_getDevice;
        this.reindexDevice      = YAPI_reindexDevice;
        this.forgetDevice       = YAPI_forgetDevice;
        this.resolveFunction    = YAPI_resolveFunction;
        this.getFriendlyNameFunction = YAPI_getFriendlyNameFunction;
        this.functionClass      = YAPI_functionClass;
        this.setFunction        = YAPI_setFunction;
        this.getFunction        = YAPI_getFunction;
        this.setFunctionValue   = YAPI_setFunctionValue;
        this.getFunctionValue   = YAPI_getFunctionValue;
        this.addValueEvent      = YAPI_addValueEvent;
        this.getFirstHardwareId = YAPI_getFirstHardwareId;
        this.getNextHardwareId  = YAPI_getNextHardwareId;
        this.devRequest         = YAPI_devRequest;
        this.devRequest_async   = YAPI_devRequest_async;
        this.funcRequest        = YAPI_funcRequest;
        this.funcRequest_async  = YAPI_funcRequest_async;        
        this.monitorEvents      = YAPI_monitorEvents;
        this.doubleToDecimal    = YAPI_doubleToDecimal;
        this.decimalToDouble    = YAPI_decimalToDouble;
        this.getCalibrationHandler = YAPI_getCalibrationHandler;
        this.applyCalibration   = YAPI_applyCalibration;
        this.newFunction        = YFunction;

        // Low-level function to query devices
        this.HTTPRequest        = YAPI_HTTPRequest;
        this.HTTPRequest_async  = YAPI_HTTPRequest_async;

        // Default cache validity (in [ms]) before reloading data from device. This saves a lots of trafic.
        // Note that a value under 2 ms makes little sense since a USB bus itself has a 2ms roundtrip period
        this.defaultCacheValidity = 5;
        // Switch to turn off exceptions and use return codes instead, for source-code compatibility
        // with languages without exception support like C
        this.exceptionsDisabled = false;

//--- (generated code: return codes)
        this.SUCCESS               = 0;       // everything worked allright
        this.NOT_INITIALIZED       = -1;      // call yInitAPI() first !
        this.INVALID_ARGUMENT      = -2;      // one of the arguments passed to the function is invalid
        this.NOT_SUPPORTED         = -3;      // the operation attempted is (currently) not supported
        this.DEVICE_NOT_FOUND      = -4;      // the requested device is not reachable
        this.VERSION_MISMATCH      = -5;      // the device firmware is incompatible with this API version
        this.DEVICE_BUSY           = -6;      // the device is busy with another task and cannot answer
        this.TIMEOUT               = -7;      // the device took too long to provide an answer
        this.IO_ERROR              = -8;      // there was an I/O problem while talking to the device
        this.NO_MORE_DATA          = -9;      // there is no more data to read from
        this.EXHAUSTED             = -10;     // you have run out of a limited ressource, check the documentation
        this.DOUBLE_ACCES          = -11;     // you have two process that try to acces to the same device
        this.UNAUTHORIZED          = -12;     // unauthorized access to password-protected device
        this.RTC_NOT_READY         = -13;     // real-time clock has not been initialized (or time was lost)
//--- (end of generated code: return codes)

        // yInitAPI constants (not really useful in JavaScript)
        this.DETECT_NONE            = 0;
        this.DETECT_USB             = 1;
        this.DETECT_NET             = 2;
        this.DETECT_ALL             = (this.DETECT_USB | this.DETECT_NET);

        // High-level functions with a public function interface
        this.GetAPIVersion          = YAPI_GetAPIVersion;
        this.InitAPI                = YAPI_InitAPI;
        this.FreeAPI                = YAPI_FreeAPI;
        this.DisableExceptions      = YAPI_DisableExceptions;
        this.EnableExceptions       = YAPI_EnableExceptions;
        this.RegisterHub            = YAPI_RegisterHub;
        this.RegisterHub_async      = YAPI_RegisterHub_async;
        this.PreregisterHub         = YAPI_PreregisterHub;
        this.UnregisterHub          = YAPI_UnregisterHub;
        this.UpdateDeviceList       = YAPI_UpdateDeviceList;
        this.UpdateDeviceList_async = YAPI_UpdateDeviceList_async;
        this.HandleEvents           = YAPI_HandleEvents;
        this.Sleep                  = YAPI_Sleep;
        this.SetTimeout             = YAPI_SetTimeout;
        this.GetTickCount           = YAPI_GetTickCount;
        this.CheckLogicalName       = YAPI_CheckLogicalName;
        this.RegisterDeviceArrivalCallback = YAPI_RegisterDeviceArrivalCallback;
        this.RegisterDeviceChangeCallback  = YAPI_RegisterDeviceChangeCallback;
        this.RegisterDeviceRemovalCallback = YAPI_RegisterDeviceRemovalCallback;
        this.RegisterCalibrationHandler    = YAPI_RegisterCalibrationHandler;
        this.LinearCalibrationHandler      = YAPI_LinearCalibrationHandler;
        this.ComputePSK                    = YAPI_ComputePSK;

        this._fnByType["Module"] = new YFunctionType("Module");
        for(var i = 1; i <= 20; i++) {
            this.RegisterCalibrationHandler(i,this.LinearCalibrationHandler);
        }
    }

    YAPI = new _YAPI();
    yAPI = YAPI;

    /** \class YFunction
     *
     * YFunction Class (virtual class, used internally)
     *
     * This is the parent class for all public objects representing device functions documented in
     * the high-level programming API. This abstract class does all the real job, but without 
     * knowledge of the specific function attributes.
     *
     * Instantiating a child class of YFunction does not cause any communication.
     * The instance simply keeps track of its function identifier, and will dynamically bind
     * to a matching device at the time it is really beeing used to read or set an attribute.
     * In order to allow true hot-plug replacement of one device by another, the binding stay
     * dynamic through the life of the object.
     *
     * The YFunction class implements a generic high-level cache for the attribute values of
     * the specified function, pre-parsed from the REST API string.
     */

    /**
     * Returns a short text that describes the function in the form TYPE(NAME)=SERIAL&#46;FUNCTIONID.
     * More precisely,
     * TYPE       is the type of the function,
     * NAME       it the name used for the first access to the function,
     * SERIAL     is the serial number of the module if the module is connected or "unresolved", and
     * FUNCTIONID is  the hardware identifier of the function if the module is connected.
     * For example, this method returns Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1 if the
     * module is already connected or Relay(BadCustomeName.relay1)=unresolved if the module has
     * not yet been connected. This method does not trigger any USB or TCP transaction and can therefore be used in
     * a debugger.
     * 
     * @return a string that describes the function
     *         (ex: Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1)
     */
    function YFunction_describe()
    {
        var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS && resolve.result != this._func) {
            return this._className+"("+this._func+")=unresolved";
        }
        return this._className+"("+this._func+")="+resolve.result;
    }

    /**
     * Returns the unique hardware identifier of the function in the form SERIAL&#46;FUNCTIONID.
     * The unique hardware identifier is composed of the device serial
     * number and of the hardware identifier of the function. (for example RELAYLO1-123456.relay1)
     * 
     * @return a string that uniquely identifies the function (ex: RELAYLO1-123456.relay1)
     * 
     * On failure, throws an exception or returns  Y_HARDWAREID_INVALID.
     */
    function YFunction_get_hardwareId()
    {
        var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            this.isOnline();
            resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, Y_HARDWAREID_INVALID);
            }
        }
        return resolve.result;
    }

    /**
     * Returns the hardware identifier of the function, without reference to the module. For example
     * relay1
     * 
     * @return a string that identifies the function (ex: relay1)
     * 
     * On failure, throws an exception or returns  Y_FUNCTIONID_INVALID.
     */
    function YFunction_get_functionId()
    {
        var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            this.isOnline();
            resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, Y_HARDWAREID_INVALID);
            }
        }
        var pos =resolve.result.indexOf(".");
        return resolve.result.substr(pos+1);
    }

    /**
     * Returns a global identifier of the function in the format MODULE_NAME&#46;FUNCTION_NAME.
     * The returned string uses the logical names of the module and of the function if they are defined,
     * otherwise the serial number of the module and the hardware identifier of the function
     * (for exemple: MyCustomName.relay1)
     * 
     * @return a string that uniquely identifies the function using logical names
     *         (ex: MyCustomName.relay1)
     * 
     * On failure, throws an exception or returns  Y_FRIENDLYNAME_INVALID.
     */
    function YFunction_get_friendlyName()
    {
        var resolve = YAPI.getFriendlyNameFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            this.isOnline();
            resolve = YAPI.getFriendlyNameFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, Y_HARDWAREID_INVALID);
            }
        }
        return resolve.result;
    }


    // Return the value of an attribute from function cache, after reloading it from device if needed
    // Note: the function cache is a typed (parsed) cache, contrarily to the agnostic device cache
    function YFunction_getAttr(str_attr)
    {
        if(this._cache._expiration <= YAPI.GetTickCount()) {
            // no valid cached value, reload from device
            if(this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) return null;
        }
        if(typeof this._cache[str_attr] == "undefined") {
            this._throw(YAPI_VERSION_MISMATCH, "No such attribute "+str_attr+" in function", null);
        }
        return this._cache[str_attr];
    }

    // Return the value of an attribute from function cache, after loading it from device if never loaded
    function YFunction_getFixedAttr(str_attr)
    {
        if(this._cache._expiration == 0) {
            // no cached value, load from device
            if(this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) return null;
        }
        if(typeof this._cache[str_attr] == "undefined") {
            this._throw(YAPI_VERSION_MISMATCH, "No such attribute "+str_attr+" in function", null);
        }
        return this._cache[str_attr];
    }

    // Return the value of an attribute from function cache, after reloading it from device if needed.
    // This is the asynchronous version, that uses a callback instead of a return value in order to avoid
    // blocking the whole browser on Firefox due to their ill-implemented virtual machine, that does not 
    // properly implements javascript context switching during blocking I/O calls (other browsers do it right).
    function YFunction_getAttr_async(str_attr, func_callback, obj_context)
    {
        if(this._cache._expiration <= YAPI.GetTickCount()) {
            // no valid cached value, reload from device
            this.load_async(YAPI.defaultCacheValidity,
                            function(params, obj, retval) {
                                if(retval != YAPI_SUCCESS) {
                                    params.cb(params.ctx, obj, retval);
                                    return;
                                }
                                if(typeof obj._cache[params.attr] == "undefined") {
                                    obj._throw(YAPI_VERSION_MISMATCH, "No such attribute "+params.attr+" in function", null);
                                }
                                params.cb(params.ctx, obj, obj._cache[params.attr]);
                            },
                            {attr:str_attr, cb:func_callback, ctx:obj_context});
            return;
        }
        func_callback(obj_context, this, this._cache[str_attr]);
    }


    // Change the value of an attribute on a device, and invalidate the cache
    function YFunction_setAttr(str_attr, str_newval)
    {
        if(str_newval == undefined) {
            return this._throw(YAPI_INVALID_ARGUMENT, "Undefined value to set for attribute "+str_attr, null);
        }
        var attrname = encodeURIComponent(str_attr);
        var attrval = escape(str_newval).replace(/[+]/g, '%2B')
                        .replace(/%20/g, '+').replace(/%21/g, '!')
                        .replace(/%24/g, '$')
                        .replace(/%27/g, "'").replace(/%28/g, '(').replace(/%29/g, ')')
                        .replace(/%2[cC]/g, ',').replace(/%2[fF]/g, '/')
                        .replace(/%3[aA]/g, ':').replace(/%3[bB]/g, ';').replace(/%3[fF]/g, '?')                        
                        .replace(/%5[bB]/g, '[').replace(/%5[dD]/g, ']');
        var extra = "/"+attrname+"?"+attrname+"="+attrval;
        this._cache._expiration = YAPI.GetTickCount();
        YAPI.funcRequest_async(this._className, this._func, extra, null);

        return YAPI_SUCCESS;
    }

    // Execute an arbitrary HTTP GET request on the device and return the binary content
    //
    function YFunction_download(str_path)
    {
        // get the device serial number
        var devid = this.module().get_serialNumber();
        if(devid == Y_SERIALNUMBER_INVALID) {
            return '';
        }
        var yreq = YAPI.devRequest(devid, "GET /"+str_path);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, '');
        }
        return yreq.result;
    }

    // Upload a file to the filesystem, to the specified full path name.
    // If a file already exists with the same path name, its content is overwritten.
    //
    function YFunction_upload_async(str_path, bin_content, func_callback, obj_context)
    {
        // get the device serial number
        var devid = this.module().get_serialNumber();
        if(devid == Y_SERIALNUMBER_INVALID) {
            return this.get_errorType();
        }
        var httpreq = 'POST /upload.html';
        var len = bin_content.length;
        var body;
        if(typeof FormData == "undefined") {
            // fallback to sending a string body for non-HTML5 browsers
            var boundary;
            body = 'Content-Disposition: form-data; name="'+str_path+'"; filename="api"\r\n'+
                   'Content-Type: application/octet-stream\r\n'+
                   'Content-Transfer-Encoding: binary\r\n\r\n';
            if(typeof bin_content == 'string' || bin_content instanceof String) {
                body += bin_content;
            } else {
                for (var i = 0; i < len; i++) {
                    // Note: when FormData is not available, we cannot send
                    //       non-ASCII characters... sorry
                    body += String.fromCharCode(bin_content[i] & 0x7f);
                }
            }
            do {
                boundary = "Zz"+Math.floor(Math.random() * 0xffffff).toString(16)+"zZ";
            } while(body.indexOf(boundary) >= 0);
            body = "--"+boundary+"\r\n"+body+"\r\n--"+boundary+"--\r\n";
        } else {
            // convert to Uint8Array if needed
            if(typeof bin_content == 'string' || bin_content instanceof String || 
               bin_content instanceof Array) {
                if(typeof bin_content == 'string' || bin_content instanceof String) {
                    var u8 = new Uint8Array(len);
                    for (var i = 0; i < len; i++) {
                        u8[i] = bin_content.charCodeAt(i);
                    }
                    bin_content = u8;
                } else {
                    bin_content = new Uint8Array(bin_content);
                }
            }
            // convert Uint8Array to Blob if needed
            if(bin_content instanceof Uint8Array) {
                try {
                    bin_content = new Blob([bin_content], {type: "application/octet-binary"});
                } catch(e) {
                    window.BlobBuilder = window.BlobBuilder || 
                                         window.WebKitBlobBuilder || 
                                         window.MozBlobBuilder || 
                                         window.MSBlobBuilder;
                    if(e.name == 'TypeError' && window.BlobBuilder){
                        var bb = new BlobBuilder();
                        bb.append([bin_content.buffer]);
                        bin_content = bb.getBlob("application/octet-binary");
                    } else {
                        try {
                            bin_content = new Blob([bin_content.buffer], {type: "application/octet-binary"});
                        } catch(e) {
                            return this._throw(YAPI_NOT_SUPPORTED,
                                               "Blob constructor is not supported by this browser",
                                               YAPI_NOT_SUPPORTED);
                        }
                    }
                }
            }
            // else assume content is already a Blob, a File, etc
            body = new FormData();
            body.append(str_path, bin_content);
        }
        YAPI.devRequest_async(devid, httpreq, body,
                              function(params, yreq) {
                                  if(yreq.errorType != YAPI_SUCCESS) {
                                      params.obj._throw(yreq.errorType, yreq.errorMsg, null);
                                      if(params.cb) params.cb(params.ctx, params.obj, null);
                                      return;
                                  }
                                  if(params.cb) params.cb(params.ctx, params.obj, yreq.result);
                              },
                              {obj:this, cb:func_callback, ctx:obj_context});
        return YAPI_SUCCESS;        
    }    

    // Upload a file to the filesystem, to the specified full path name.
    // If a file already exists with the same path name, its content is overwritten.
    //
    function YFunction_upload(str_path, bin_content)
    {
        this._upload_async(str_path, bin_content, function(ctx,obj,res){}, null);
        return YAPI_SUCCESS;        
    }

    /**
     * Waits for all pending asynchronous commands on the module to complete, and invoke
     * the user-provided callback function. The callback function can therefore freely
     * issue synchronous or asynchronous commands, without risking to block the
     * Javascript VM.
     * 
     * @param callback : callback function that is invoked when all pending commands on
     *         the module are completed.
     *         The callback function receives two arguments: the caller-specific
     *         context object and the receiving function object.
     * @param context : caller-specific object that is passed as-is to the callback function
     * 
     * @return nothing.
     */
    function YFunction_wait_async(func_callback, obj_context)
    {
        // get the device serial number
        var devid = this.module().get_serialNumber();
        if(devid == Y_SERIALNUMBER_INVALID) {
            return '';
        }
        var lockdev = YAPI.getDevice(devid);
        if(lockdev == null || (lockdev._busy == 0 && lockdev._pendingQueries.length == 0)) {
            // no pending callback
            func_callback(obj_context, this);
        } else {
            lockdev._pendingQueries.push({cb:func_callback,obj:this,ctx:obj_context});
        }
        return YAPI_SUCCESS;        
    }
            

    // Get a value from a JSON buffer
    //
    function YFunction_json_get_key(str_jsonbuff, str_key)
    {
        var loadval = JSON.parse(str_jsonbuff);
        if(typeof loadval[str_key] != "undefined") {
            return loadval[str_key];
        }
        return "";
    }
    
    // Get an array of strings from a JSON buffer
    //
    function YFunction_json_get_array(str_jsonbuff)
    {
        var loadval = JSON.parse(str_jsonbuff, true);
        var res = new Array();
        for(idx in loadval) {
            res.push(JSON.stringify(loadval[idx]));
        }
        return res;
    }
    
    // Encode calibration points into 16-bit fixed-point or decimal floating-point
    //
    function YFunction_encodeCalibrationPoints(arr_rawValues, arr_refValues)
    {
        var npt = (arr_rawValues.length < arr_refValues.length ? arr_rawValues.length : arr_refValues.length);
        var caltype;
        var rawVal, refVal;
        var res = '';

        if(npt == 0) {
            return "0";
        }
        var params = this.get_calibrationParam();
        if(params == "") {
            caltype = 10+npt;
        } else {
            params = params.split(",");
            caltype = parseInt(params[0]);
            if(caltype <= 10) {
                caltype = npt;
            } else {
                caltype = 10+npt;
            }
        }
        res = caltype.toString();
        if(caltype <= 10) {
            // 16-bit fixed-point encoding
            var resol = this.get_resolution();
            if(resol == -Number.MAX_VALUE) {
                return "";
            }
            var minRaw = 0;
            for(var i = 0; i < npt; i++) {
                rawVal = Math.round(arr_rawValues[i] / resol - this._calibrationOffset);
                if(rawVal >= minRaw && rawVal < 65536) {
                    refVal = Math.round(arr_refValues[i] / resol - this._calibrationOffset);
                    if(refVal >= 0 && refVal < 65536) {
                        res += ','+rawVal.toString()+','+refVal.toString();
                        minRaw = rawVal+1;
                    }
                }
            }
        } else {
            // 16-bit floating-point decimal encoding
            for(var i = 0; i < npt; i++) {
                rawVal = YAPI.doubleToDecimal(arr_rawValues[i]);
                refVal = YAPI.doubleToDecimal(arr_refValues[i]);
                res += ','+rawVal.toString()+','+refVal.toString();
            }            
        }
    
        return res;
    }

    // Decode calibration points given as 16-bit fixed-point or decimal floating-point
    //
    function YFunction_decodeCalibrationPoints(arr_rawValues, arr_refValues)
    {
        while(arr_rawValues.length > 0) arr_rawValues.pop();
        while(arr_refValues.length > 0) arr_refValues.pop();

        var params = this.get_calibrationParam();
        if(params == "" || params == "0") return YAPI_SUCCESS;
        params = params.split(",");
        if(params.length < 11) {
            return YAPI_NOT_SUPPORTED;
        }
        var resol = this.get_resolution();
        if(resol == -Number.MAX_VALUE) {
            return YAPI_NOT_SUPPORTED;
        }
        var ctyp = parseInt(params[0]);
        var nval = (ctyp <= 20 ? 2*(ctyp%10) : 99);
        for(var i = 1; i < params.length && i < nval; i += 2) {
            rawval = parseInt(params[i]);
            calval = parseInt(params[i+1]);
            if(ctyp <= 10) {
                arr_rawValues[i>>1] = (rawval+this._calibrationOffset) * resol;
                arr_refValues[i>>1] = (calval+this._calibrationOffset) * resol;
            } else {
                arr_rawValues[i>>1] = YAPI.decimalToDouble(rawval);
                arr_refValues[i>>1] = YAPI.decimalToDouble(calval);
            }
        }
        return YAPI_SUCCESS;
    }
    
    /**
     * Checks if the function is currently reachable, without raising any error.
     * If there is a cached value for the function in cache, that has not yet
     * expired, the device is considered reachable.
     * No exception is raised if there is an error while trying to contact the
     * device hosting the requested function.
     * 
     * @return true if the function can be reached, and false otherwise
     */
    function YFunction_isOnline()
    {
        // A valid value in cache means that the device is online
        if(this._cache._expiration > YAPI.GetTickCount()) return true;

        // Check that the function is available without throwing exceptions
        var yreq = YAPI.funcRequest(this._className, this._func, "");
        if(yreq.errorType != YAPI_SUCCESS) {
            if(yreq.errorType == YAPI_DEVICE_BUSY) {
                return true;
            } else {
                return false;
            }
        }
        // save result in cache anyway
        var loadval = yreq.result;
        loadval["_expiration"] = YAPI.GetTickCount() + YAPI.defaultCacheValidity;
        this._cache = loadval;

        return true;
    }

    /**
     * Checks if the function is currently reachable, without raising any error (asynchronous version).
     * If there is a cached value for the function in cache, that has not yet
     * expired, the device is considered reachable.
     * No exception is raised if there is an error while trying to contact the
     * device hosting the requested function.
     * 
     * This asynchronous version exists only in Javascript. It uses a callback instead
     * of a return value in order to avoid blocking Firefox Javascript VM that does not
     * implement context switching during blocking I/O calls.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments: the caller-specific
     *         context object, the receiving function object and the boolean result
     * @param context : caller-specific object that is passed as-is to the callback function
     * 
     * @return nothing : the result is provided to the callback.
     */
    function YFunction_isOnline_async(func_callback, obj_context)
    {
        // A valid value in cache means that the device is online
        if(this._cache._expiration > YAPI.GetTickCount()) {
            func_callback(obj_context, this, true);
            return;
        }

        // Check that the function is available without throwing exceptions
        YAPI.funcRequest_async(this._className, this._func, "",
                               function(params, yreq) {
                                   if(yreq.errorType != YAPI_SUCCESS) {
                                       params.cb(params.ctx, params.obj, false);
                                       return;
                                   }
                                   // save result in cache anyway
                                   var loadval = yreq.result;
                                   loadval["_expiration"] = YAPI.GetTickCount() + YAPI.defaultCacheValidity;
                                   params.obj._cache = loadval;
                                   params.cb(params.ctx, params.obj, true);
                               },
                               {obj:this, cb:func_callback, ctx:obj_context});
    }

    /**
     * Returns the numerical error code of the latest error with this function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     * 
     * @return a number corresponding to the code of the latest error that occured while
     *         using this function object
     */
    function YFunction_get_errorType()
    {
        return this._lastErrorType;
    }

    /**
     * Returns the error message of the latest error with this function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     * 
     * @return a string corresponding to the latest error message that occured while
     *         using this function object
     */
    function YFunction_get_errorMessage()
    {
        return this._lastErrorMsg;
    }

    /**
     * Preloads the function cache with a specified validity duration.
     * By default, whenever accessing a device, all function attributes
     * are kept in cache for the standard duration (5 ms). This method can be
     * used to temporarily mark the cache as valid for a longer period, in order
     * to reduce network trafic for instance.
     * 
     * @param msValidity : an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds
     * 
     * @return YAPI_SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YFunction_load(int_msValidity)
    {
        var yreq = YAPI.funcRequest(this._className, this._func, "");
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        var loadval = yreq.result;
        loadval["_expiration"] = YAPI.GetTickCount() + int_msValidity;
        this._cache = loadval;

        return YAPI_SUCCESS;
    }

    /**
     * Preloads the function cache with a specified validity duration (asynchronous version).
     * By default, whenever accessing a device, all function attributes
     * are kept in cache for the standard duration (5 ms). This method can be
     * used to temporarily mark the cache as valid for a longer period, in order
     * to reduce network trafic for instance.
     * 
     * This asynchronous version exists only in Javascript. It uses a callback instead
     * of a return value in order to avoid blocking Firefox javascript VM that does not
     * implement context switching during blocking I/O calls. See the documentation
     * section on asynchronous Javascript calls for more details.
     * 
     * @param msValidity : an integer corresponding to the validity of the loaded
     *         function parameters, in milliseconds
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function  receives three arguments: the caller-specific
     *         context object, the receiving function object and the error code
     *         (or YAPI_SUCCESS)
     * @param context : caller-specific object that is passed as-is to the callback function
     * 
     * @return nothing : the result is provided to the callback.
     */
    function YFunction_load_async(int_msValidity, func_callback, obj_context)
    {
        YAPI.funcRequest_async(this._className, this._func, "",
                               function(params, yreq) {
                                   if(yreq.errorType != YAPI_SUCCESS) {
                                       params.obj._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
                                       params.cb(params.ctx, params.obj, yreq.errorType);
                                       return;
                                   }
                                   var loadval = yreq.result;
                                   loadval["_expiration"] = YAPI.GetTickCount() + YAPI.defaultCacheValidity;
                                   params.obj._cache = loadval;
                                   params.cb(params.ctx, params.obj, YAPI_SUCCESS);
                               },
                               {obj:this, cb:func_callback, ctx:obj_context});
    }

    /**
     * Gets the YModule object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModule is not shown as on-line.
     * 
     * @return an instance of YModule
     */
    function YFunction_get_module()
    {
        // try to resolve the function name to a device id without query
        var hwid = this._func;
        if(hwid.indexOf(".") < 0) {
            var resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType == YAPI_SUCCESS) hwid = resolve.result;
        }
        var dotidx = hwid.indexOf(".");
        if(dotidx >= 0) {
            // resolution worked
            return yFindModule(hwid.substr(0, dotidx));
        }

        // device not resolved for now, force a communication for a last chance resolution
        if(this.load(YAPI.defaultCacheValidity) == YAPI_SUCCESS) {
            var resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.result != undefined) hwid = resolve.result;
        }
        dotidx = hwid.indexOf(".");
        if(dotidx >= 0) {
            // resolution worked
            return yFindModule(hwid.substr(0, dotidx));
        }
        // return a true yFindModule object even if it is not a module valid for communicating
        return yFindModule("module_of_"+this.className+"_"+this._func);
    }

    /**
     * Gets the YModule object for the device on which the function is located (asynchronous version).
     * If the function cannot be located on any module, the returned YModule object does not show as on-line.
     * 
     * This asynchronous version exists only in Javascript. It uses a callback instead
     * of a return value in order to avoid blocking Firefox javascript VM that does not
     * implement context switching during blocking I/O calls. See the documentation
     * section on asynchronous Javascript calls for more details.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments: the caller-specific
     *         context object, the receiving function object and the requested
     *         YModule object
     * @param context : caller-specific object that is passed as-is to the callback function
     * 
     * @return nothing : the result is provided to the callback.
     */
    function YFunction_get_module_async(func_callback, obj_context)
    {
        // try to resolve the function name to a device id without query
        var hwid = this._func;
        if(hwid.indexOf(".") < 0) {
            var resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) hwid = resolve.result;
        }
        var dotidx = hwid.indexOf(".");
        if(dotidx >= 0) {
            // resolution worked
            func_callback(obj_context, this,  yFindModule(hwid.substr(0, dotidx)));
            return;
        }

        // device not resolved for now, force a communication for a last chance resolution
        this.load_async(YAPI.defaultCacheValidity,
                        function(params, obj, retval) {
                            var hwid = obj._func;
                            if(retval == YAPI_SUCCESS) {
                                var resolve = YAPI.resolveFunction(obj._className, obj._func);
                                if(resolve.result != undefined) hwid = resolve.result;
                            }
                            var dotidx = hwid.indexOf(".");
                            if(dotidx >= 0) {
                                // resolution worked
                                params.cb(params.ctx, obj, yFindModule(hwid.substr(0, dotidx)));
                            } else {
                                // return a true yFindModule object even if it is not a module valid for communicating
                                params.cb(params.ctx, obj, yFindModule("module_of_"+this.className+"_"+this._func));
                            }
                        },
                        {cb:func_callback, ctx:obj_context});
    }


    /**
     * Returns a unique identifier of type YFUN_DESCR corresponding to the function.
     * This identifier can be used to test if two instances of YFunction reference the same
     * physical function on the same physical device.
     * 
     * @return an identifier of type YFUN_DESCR.
     * 
     * If the function has never been contacted, the returned value is Y_FUNCTIONDESCRIPTOR_INVALID.
     */
    function YFunction_get_functionDescriptor()
    {
        // try to resolve the function name to a device id without query
        var hwid = this._func;
        if(hwid.indexOf(".") < 0) {
            var resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) hwid = resolve.result;
        }
        var dotidx = hwid.indexOf(".");
        if(dotidx >= 0) {
            return hwid;
        }
        return Y_FUNCTIONDESCRIPTOR_INVALID;
    }

    /**
     * Returns the value of the userData attribute, as previously stored using method
     * set_userData.
     * This attribute is never touched directly by the API, and is at disposal of the caller to
     * store a context.
     * 
     * @return the object stored previously by the caller.
     */
    function YFunction_get_userData()
    {
        return this._userData;
    }

    /**
     * Stores a user context provided as argument in the userData attribute of the function.
     * This attribute is never touched by the API, and is at disposal of the caller to store a context.
     * 
     * @param data : any kind of object to be stored
     * @noreturn
     */
    function YFunction_set_userData(obj_data)
    {
        this._userData = obj_data;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     * 
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    function YFunction_registerValueCallback(func_callback)
    {
        this._valueCallback = func_callback;
        if(func_callback != undefined && this.isOnline()) {
            var newval = this.get_advertisedValue();
            if(newval != "" && newval != "!INVALID!") {
                func_callback(this, newval);
            }
        }
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     * 
     * This asynchronous version exists only in Javascript. It will use an asynchronous call to perform the
     * initial load of the advertised value in order to call the callback for the very first time.
     * 
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    function YFunction_registerValueCallback_async(func_callback)
    {
        this._valueCallback = func_callback;
        if(func_callback != undefined) {
            this.isOnline_async(function(obj_ctx, obj_func, result) {
                if(result) {
                    var newval = obj_func.get_advertisedValue();
                    if(newval != "" && newval != "!INVALID!") {
                        func_callback(obj_func, newval);
                    }
                }
            }, null);
        }
    }

    function YFunction(str_classname,str_func)
    {
        // private
        this._className      = str_classname;
        this._func           = str_func;
        this._lastErrorType  = YAPI_SUCCESS;
        this._lastErrorMsg   = "no error";
        this._cache          = {_expiration:0};
        this._userData       = null;
        this._valueCallback  = null;
        this._throw          = YAPI_throw;
        this._getAttr        = YFunction_getAttr;
        this._getFixedAttr   = YFunction_getFixedAttr;
        this._getAttr_async  = YFunction_getAttr_async;
        this._setAttr        = YFunction_setAttr;
        this._download       = YFunction_download;
        this._upload         = YFunction_upload;
        this._upload_async   = YFunction_upload_async;
        this._json_get_key   = YFunction_json_get_key;
        this._json_get_array = YFunction_json_get_array;
        this._encodeCalibrationPoints = YFunction_encodeCalibrationPoints;
        this._decodeCalibrationPoints = YFunction_decodeCalibrationPoints;

        // public
        this.describe              = YFunction_describe;
        this.isOnline              = YFunction_isOnline;
        this.isOnline_async        = YFunction_isOnline_async;
        this.get_errorType         = YFunction_get_errorType;
        this.errorType             = YFunction_get_errorType;
        this.errType               = YFunction_get_errorType;
        this.get_errorMessage      = YFunction_get_errorMessage;
        this.errorMessage          = YFunction_get_errorMessage;
        this.errMessage            = YFunction_get_errorMessage;
        this.load                  = YFunction_load;
        this.load_async            = YFunction_load_async;
        this.get_module            = YFunction_get_module;
        this.module                = YFunction_get_module;
        this.get_module_async      = YFunction_get_module_async;
        this.module_async          = YFunction_get_module_async;
        this.get_functionDescriptor= YFunction_get_functionDescriptor;
        this.functionDescriptor    = YFunction_get_functionDescriptor;
        this.get_userData          = YFunction_get_userData;
        this.userData              = YFunction_get_userData;
        this.set_userData          = YFunction_set_userData;
        this.setUserData           = YFunction_set_userData;
        this.registerValueCallback = YFunction_registerValueCallback;
        this.registerValueCallback_async = YFunction_registerValueCallback_async;
        this.set_callback          = YFunction_registerValueCallback;
        this.set_callback_async    = YFunction_registerValueCallback_async;
        this.setCallback           = YFunction_registerValueCallback;
        this.setCallback_async     = YFunction_registerValueCallback_async;
        this.get_hardwareId        = YFunction_get_hardwareId;
        this.get_functionId        = YFunction_get_functionId;
        this.get_friendlyName      = YFunction_get_friendlyName;
        this.wait_async            = YFunction_wait_async;

        YAPI.setFunction(str_classname,str_func,this);
    }

    /**
     * YModule Class: Module control interface
     * 
     * This interface is identical for all Yoctopuce USB modules.
     * It can be used to control the module global parameters, and
     * to enumerate the functions provided by each module.
     */

    // Return the internal device object hosting the function
    // Raise an error if not found
    function YModule_getDev()
    {
        var devid = this._func;
        var dotidx = devid.indexOf(".");
        if(dotidx > 0) devid = devid.substr(0, dotidx);
        var dev = YAPI.getDevice(devid);
        if(!dev) {
            this._throw(YAPI_DEVICE_NOT_FOUND, "Device ["+devid+"] is not online", null);
        }
        return dev;
    }

    /**
     * Returns the number of functions (beside the "module" interface) available on the module.
     * 
     * @return the number of functions on the module
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_functionCount()
    {

        var dev = this._getDev();
        if(!dev) return YAPI_DEVICE_NOT_FOUND;
        return dev.functionCount();
    }

    /**
     * Retrieves the hardware identifier of the <i>n</i>th function on the module.
     * 
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     * 
     * @return a string corresponding to the unambiguous hardware identifier of the requested module function
     * 
     * On failure, throws an exception or returns an empty string.
     */
    function YModule_functionId(int_functionIndex)
    {
        var dev = this._getDev();
        if(!dev) return "";
        return dev.functionId(int_functionIndex);
    }

    /**
     * Retrieves the logical name of the <i>n</i>th function on the module.
     * 
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     * 
     * @return a string corresponding to the logical name of the requested module function
     * 
     * On failure, throws an exception or returns an empty string.
     */
    function YModule_functionName(int_functionIndex)
    {
        var dev = this._getDev();
        if(!dev) return "";
        return dev.functionName(int_functionIndex);
    }

    /**
     * Retrieves the advertised value of the <i>n</i>th function on the module.
     * 
     * @param functionIndex : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     * 
     * @return a short string (up to 6 characters) corresponding to the advertised value of the requested
     * module function
     * 
     * On failure, throws an exception or returns an empty string.
     */
    function YModule_functionValue(int_functionIndex)
    {
        var dev = this._getDev();
        if(!dev) return "";
        return dev.functionValue(int_functionIndex);
    }

    function YModule_loadUrl(str_url)
    {        
        var dev = this._getDev();
        if(!dev) return null;
        var yreq = YAPI.devRequest(dev.getRootUrl(), "GET "+str_url);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }
        return yreq.result;
    }

    //--- (generated code: YModule implementation)

    /**
     * Returns the commercial name of the module, as set by the factory.
     * 
     * @return a string corresponding to the commercial name of the module, as set by the factory
     * 
     * On failure, throws an exception or returns Y_PRODUCTNAME_INVALID.
     */
    function YModule_get_productName()
    {   var dev = this._getDev();
        var json_val = (dev == null ? null : dev._productName);
        return (json_val == null ? Y_PRODUCTNAME_INVALID : json_val);
    }

    /**
     * Returns the commercial name of the module, as set by the factory.
     * 
     * @return a string corresponding to the commercial name of the module, as set by the factory
     * 
     * On failure, throws an exception or returns Y_PRODUCTNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_productName_async(func_callback, obj_context)
    {   func_callback(obj_context, this, this.get_productName());   }

    /**
     * Returns the serial number of the module, as set by the factory.
     * 
     * @return a string corresponding to the serial number of the module, as set by the factory
     * 
     * On failure, throws an exception or returns Y_SERIALNUMBER_INVALID.
     */
    function YModule_get_serialNumber()
    {   var dev = this._getDev();
        var json_val = (dev == null ? null : dev._serialNumber);
        return (json_val == null ? Y_SERIALNUMBER_INVALID : json_val);
    }

    /**
     * Returns the serial number of the module, as set by the factory.
     * 
     * @return a string corresponding to the serial number of the module, as set by the factory
     * 
     * On failure, throws an exception or returns Y_SERIALNUMBER_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_serialNumber_async(func_callback, obj_context)
    {   func_callback(obj_context, this, this.get_serialNumber());   }

    /**
     * Returns the logical name of the module.
     * 
     * @return a string corresponding to the logical name of the module
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YModule_get_logicalName()
    {   var dev = this._getDev();
        if(dev != null && this._cache._expiration <= YAPI.GetTickCount())
            return dev._logicalName;
        var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the module.
     * 
     * @return a string corresponding to the logical name of the module
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_logicalName_async(func_callback, obj_context)
    {   func_callback(obj_context, this, this.get_logicalName());   }

    /**
     * Changes the logical name of the module. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the module
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        var res = this._setAttr('logicalName',rest_val);
        var dev = this._getDev();
        if(dev != null) dev.refresh_async(null,null);
        return res;
    }

    /**
     * Returns the USB device identifier of the module.
     * 
     * @return an integer corresponding to the USB device identifier of the module
     * 
     * On failure, throws an exception or returns Y_PRODUCTID_INVALID.
     */
    function YModule_get_productId()
    {   var dev = this._getDev();
        var json_val = (dev == null ? null : dev._productId);
        return (json_val == null ? Y_PRODUCTID_INVALID : parseInt(json_val));
    }

    /**
     * Returns the USB device identifier of the module.
     * 
     * @return an integer corresponding to the USB device identifier of the module
     * 
     * On failure, throws an exception or returns Y_PRODUCTID_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_productId_async(func_callback, obj_context)
    {   func_callback(obj_context, this, this.get_productId());   }

    /**
     * Returns the hardware release version of the module.
     * 
     * @return an integer corresponding to the hardware release version of the module
     * 
     * On failure, throws an exception or returns Y_PRODUCTRELEASE_INVALID.
     */
    function YModule_get_productRelease()
    {   var json_val = this._getFixedAttr('productRelease');
        return (json_val == null ? Y_PRODUCTRELEASE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the hardware release version of the module.
     * 
     * @return an integer corresponding to the hardware release version of the module
     * 
     * On failure, throws an exception or returns Y_PRODUCTRELEASE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_productRelease_async(func_callback, obj_context)
    {   this._getAttr_async('productRelease',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PRODUCTRELEASE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the version of the firmware embedded in the module.
     * 
     * @return a string corresponding to the version of the firmware embedded in the module
     * 
     * On failure, throws an exception or returns Y_FIRMWARERELEASE_INVALID.
     */
    function YModule_get_firmwareRelease()
    {   var json_val = this._getAttr('firmwareRelease');
        return (json_val == null ? Y_FIRMWARERELEASE_INVALID : json_val);
    }

    /**
     * Returns the version of the firmware embedded in the module.
     * 
     * @return a string corresponding to the version of the firmware embedded in the module
     * 
     * On failure, throws an exception or returns Y_FIRMWARERELEASE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_firmwareRelease_async(func_callback, obj_context)
    {   this._getAttr_async('firmwareRelease',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_FIRMWARERELEASE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current state of persistent module settings.
     * 
     * @return a value among Y_PERSISTENTSETTINGS_LOADED, Y_PERSISTENTSETTINGS_SAVED and
     * Y_PERSISTENTSETTINGS_MODIFIED corresponding to the current state of persistent module settings
     * 
     * On failure, throws an exception or returns Y_PERSISTENTSETTINGS_INVALID.
     */
    function YModule_get_persistentSettings()
    {   var json_val = this._getAttr('persistentSettings');
        return (json_val == null ? Y_PERSISTENTSETTINGS_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current state of persistent module settings.
     * 
     * @return a value among Y_PERSISTENTSETTINGS_LOADED, Y_PERSISTENTSETTINGS_SAVED and
     * Y_PERSISTENTSETTINGS_MODIFIED corresponding to the current state of persistent module settings
     * 
     * On failure, throws an exception or returns Y_PERSISTENTSETTINGS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_persistentSettings_async(func_callback, obj_context)
    {   this._getAttr_async('persistentSettings',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PERSISTENTSETTINGS_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YModule_set_persistentSettings(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('persistentSettings',rest_val);
    }

    /**
     * Saves current settings in the nonvolatile memory of the module.
     * Warning: the number of allowed save operations during a module life is
     * limited (about 100000 cycles). Do not call this function within a loop.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_saveToFlash()
    {   var rest_val;
        rest_val = '1';
        return this._setAttr('persistentSettings',rest_val);
    }

    /**
     * Reloads the settings stored in the nonvolatile memory, as
     * when the module is powered on.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_revertFromFlash()
    {   var rest_val;
        rest_val = '0';
        return this._setAttr('persistentSettings',rest_val);
    }

    /**
     * Returns the luminosity of the  module informative leds (from 0 to 100).
     * 
     * @return an integer corresponding to the luminosity of the  module informative leds (from 0 to 100)
     * 
     * On failure, throws an exception or returns Y_LUMINOSITY_INVALID.
     */
    function YModule_get_luminosity()
    {   var json_val = this._getAttr('luminosity');
        return (json_val == null ? Y_LUMINOSITY_INVALID : parseInt(json_val));
    }

    /**
     * Returns the luminosity of the  module informative leds (from 0 to 100).
     * 
     * @return an integer corresponding to the luminosity of the  module informative leds (from 0 to 100)
     * 
     * On failure, throws an exception or returns Y_LUMINOSITY_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_luminosity_async(func_callback, obj_context)
    {   this._getAttr_async('luminosity',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LUMINOSITY_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the luminosity of the module informative leds. The parameter is a
     * value between 0 and 100.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : an integer corresponding to the luminosity of the module informative leds
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_set_luminosity(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('luminosity',rest_val);
    }

    /**
     * Returns the state of the localization beacon.
     * 
     * @return either Y_BEACON_OFF or Y_BEACON_ON, according to the state of the localization beacon
     * 
     * On failure, throws an exception or returns Y_BEACON_INVALID.
     */
    function YModule_get_beacon()
    {   var dev = this._getDev();
        if(dev != null && this._cache._expiration <= YAPI.GetTickCount())
            return dev._beacon;
        var json_val = this._getAttr('beacon');
        return (json_val == null ? Y_BEACON_INVALID : parseInt(json_val));
    }

    /**
     * Returns the state of the localization beacon.
     * 
     * @return either Y_BEACON_OFF or Y_BEACON_ON, according to the state of the localization beacon
     * 
     * On failure, throws an exception or returns Y_BEACON_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_beacon_async(func_callback, obj_context)
    {   func_callback(obj_context, this, this.get_beacon());   }

    /**
     * Turns on or off the module localization beacon.
     * 
     * @param newval : either Y_BEACON_OFF or Y_BEACON_ON
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_set_beacon(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('beacon',rest_val);
    }

    /**
     * Returns the number of milliseconds spent since the module was powered on.
     * 
     * @return an integer corresponding to the number of milliseconds spent since the module was powered on
     * 
     * On failure, throws an exception or returns Y_UPTIME_INVALID.
     */
    function YModule_get_upTime()
    {   var json_val = this._getAttr('upTime');
        return (json_val == null ? Y_UPTIME_INVALID : parseInt(json_val));
    }

    /**
     * Returns the number of milliseconds spent since the module was powered on.
     * 
     * @return an integer corresponding to the number of milliseconds spent since the module was powered on
     * 
     * On failure, throws an exception or returns Y_UPTIME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_upTime_async(func_callback, obj_context)
    {   this._getAttr_async('upTime',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_UPTIME_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current consumed by the module on the USB bus, in milli-amps.
     * 
     * @return an integer corresponding to the current consumed by the module on the USB bus, in milli-amps
     * 
     * On failure, throws an exception or returns Y_USBCURRENT_INVALID.
     */
    function YModule_get_usbCurrent()
    {   var json_val = this._getAttr('usbCurrent');
        return (json_val == null ? Y_USBCURRENT_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current consumed by the module on the USB bus, in milli-amps.
     * 
     * @return an integer corresponding to the current consumed by the module on the USB bus, in milli-amps
     * 
     * On failure, throws an exception or returns Y_USBCURRENT_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_usbCurrent_async(func_callback, obj_context)
    {   this._getAttr_async('usbCurrent',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_USBCURRENT_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the remaining number of seconds before the module restarts, or zero when no
     * reboot has been scheduled.
     * 
     * @return an integer corresponding to the remaining number of seconds before the module restarts, or zero when no
     *         reboot has been scheduled
     * 
     * On failure, throws an exception or returns Y_REBOOTCOUNTDOWN_INVALID.
     */
    function YModule_get_rebootCountdown()
    {   var json_val = this._getAttr('rebootCountdown');
        return (json_val == null ? Y_REBOOTCOUNTDOWN_INVALID : parseInt(json_val));
    }

    /**
     * Returns the remaining number of seconds before the module restarts, or zero when no
     * reboot has been scheduled.
     * 
     * @return an integer corresponding to the remaining number of seconds before the module restarts, or zero when no
     *         reboot has been scheduled
     * 
     * On failure, throws an exception or returns Y_REBOOTCOUNTDOWN_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_rebootCountdown_async(func_callback, obj_context)
    {   this._getAttr_async('rebootCountdown',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_REBOOTCOUNTDOWN_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YModule_set_rebootCountdown(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('rebootCountdown',rest_val);
    }

    /**
     * Schedules a simple module reboot after the given number of seconds.
     * 
     * @param secBeforeReboot : number of seconds before rebooting
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_reboot(int_secBeforeReboot)
    {   var rest_val;
        rest_val = String(int_secBeforeReboot);
        return this._setAttr('rebootCountdown',rest_val);
    }

    /**
     * Schedules a module reboot into special firmware update mode.
     * 
     * @param secBeforeReboot : number of seconds before rebooting
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_triggerFirmwareUpdate(int_secBeforeReboot)
    {   var rest_val;
        rest_val = String(-int_secBeforeReboot);
        return this._setAttr('rebootCountdown',rest_val);
    }

    /**
     * Returns the number of USB interfaces used by the module.
     * 
     * @return either Y_USBBANDWIDTH_SIMPLE or Y_USBBANDWIDTH_DOUBLE, according to the number of USB
     * interfaces used by the module
     * 
     * On failure, throws an exception or returns Y_USBBANDWIDTH_INVALID.
     */
    function YModule_get_usbBandwidth()
    {   var json_val = this._getAttr('usbBandwidth');
        return (json_val == null ? Y_USBBANDWIDTH_INVALID : parseInt(json_val));
    }

    /**
     * Returns the number of USB interfaces used by the module.
     * 
     * @return either Y_USBBANDWIDTH_SIMPLE or Y_USBBANDWIDTH_DOUBLE, according to the number of USB
     * interfaces used by the module
     * 
     * On failure, throws an exception or returns Y_USBBANDWIDTH_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YModule_get_usbBandwidth_async(func_callback, obj_context)
    {   this._getAttr_async('usbBandwidth',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_USBBANDWIDTH_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the number of USB interfaces used by the module. You must reboot the module
     * after changing this setting.
     * 
     * @param newval : either Y_USBBANDWIDTH_SIMPLE or Y_USBBANDWIDTH_DOUBLE, according to the number of
     * USB interfaces used by the module
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_set_usbBandwidth(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('usbBandwidth',rest_val);
    }

    /**
     * Downloads the specified built-in file and returns a binary buffer with its content.
     * 
     * @param pathname : name of the new file to load
     * 
     * @return a binary buffer with the file content
     * 
     * On failure, throws an exception or returns an empty content.
     */
    function YModule_download(str_pathname)
    {
        return this._download(str_pathname);
        
    }

    /**
     * Returns the icon of the module. The icon is a PNG image and does not
     * exceeds 1536 bytes.
     * 
     * @return a binary buffer with module icon, in png format.
     */
    function YModule_get_icon2d()
    {
        return this._download("icon2d.png");
        
    }

    /**
     * Returns a string with last logs of the module. This method return only
     * logs that are still in the module.
     * 
     * @return a string with last logs of the module.
     */
    function YModule_get_lastLogs()
    {
        var content; // type: bin;
        content = this._download("logs.txt");
        return content;
        
    }

    /**
     * Continues the module enumeration started using yFirstModule().
     * 
     * @return a pointer to a YModule object, corresponding to
     *         the next module found, or a null pointer
     *         if there are no more modules to enumerate.
     */
    function YModule_nextModule()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YModule.FindModule(next_hwid);
    }

    /**
     * Allows you to find a module from its serial number or from its logical name.
     * 
     * This function does not require that the module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YModule.isOnline() to test if the module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string containing either the serial number or
     *         the logical name of the desired module
     * 
     * @return a YModule object allowing you to drive the module
     *         or get additional information on the module.
     */
    function YModule_FindModule(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Module', str_func);
        if(obj_func) return obj_func;
        return new YModule(str_func);
    }

    /**
     * Starts the enumeration of modules currently accessible.
     * Use the method YModule.nextModule() to iterate on the
     * next modules.
     * 
     * @return a pointer to a YModule object, corresponding to
     *         the first module currently online, or a null pointer
     *         if there are none.
     */
    function YModule_FirstModule()
    {
        var next_hwid = YAPI.getFirstHardwareId('Module');
        if(next_hwid == null) return null;
        return YModule.FindModule(next_hwid);
    }

    //--- (end of generated code: YModule implementation)

    function _YModule(str_func)
    {
        //--- (generated code: YModule constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Module', str_func);
        
        // public
        this.FUNCTIONDESCRIPTOR_INVALID      = "!INVALID!";
        this.HARDWAREID_INVALID              = "!INVALID!";
        this.PRODUCTNAME_INVALID             = "!INVALID!";
        this.SERIALNUMBER_INVALID            = "!INVALID!";
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.PRODUCTID_INVALID               = -1;
        this.PRODUCTRELEASE_INVALID          = -1;
        this.FIRMWARERELEASE_INVALID         = "!INVALID!";
        this.PERSISTENTSETTINGS_LOADED       = 0;
        this.PERSISTENTSETTINGS_SAVED        = 1;
        this.PERSISTENTSETTINGS_MODIFIED     = 2;
        this.PERSISTENTSETTINGS_INVALID      = -1;
        this.LUMINOSITY_INVALID              = -1;
        this.BEACON_OFF                      = 0;
        this.BEACON_ON                       = 1;
        this.BEACON_INVALID                  = -1;
        this.UPTIME_INVALID                  = -1;
        this.USBCURRENT_INVALID              = -1;
        this.REBOOTCOUNTDOWN_INVALID         = Number.NEGATIVE_INFINITY;
        this.USBBANDWIDTH_SIMPLE             = 0;
        this.USBBANDWIDTH_DOUBLE             = 1;
        this.USBBANDWIDTH_INVALID            = -1;
        this.get_productName                 = YModule_get_productName;
        this.productName                     = YModule_get_productName;
        this.get_productName_async           = YModule_get_productName_async;
        this.productName_async               = YModule_get_productName_async;
        this.get_serialNumber                = YModule_get_serialNumber;
        this.serialNumber                    = YModule_get_serialNumber;
        this.get_serialNumber_async          = YModule_get_serialNumber_async;
        this.serialNumber_async              = YModule_get_serialNumber_async;
        this.get_logicalName                 = YModule_get_logicalName;
        this.logicalName                     = YModule_get_logicalName;
        this.get_logicalName_async           = YModule_get_logicalName_async;
        this.logicalName_async               = YModule_get_logicalName_async;
        this.set_logicalName                 = YModule_set_logicalName;
        this.setLogicalName                  = YModule_set_logicalName;
        this.get_productId                   = YModule_get_productId;
        this.productId                       = YModule_get_productId;
        this.get_productId_async             = YModule_get_productId_async;
        this.productId_async                 = YModule_get_productId_async;
        this.get_productRelease              = YModule_get_productRelease;
        this.productRelease                  = YModule_get_productRelease;
        this.get_productRelease_async        = YModule_get_productRelease_async;
        this.productRelease_async            = YModule_get_productRelease_async;
        this.get_firmwareRelease             = YModule_get_firmwareRelease;
        this.firmwareRelease                 = YModule_get_firmwareRelease;
        this.get_firmwareRelease_async       = YModule_get_firmwareRelease_async;
        this.firmwareRelease_async           = YModule_get_firmwareRelease_async;
        this.get_persistentSettings          = YModule_get_persistentSettings;
        this.persistentSettings              = YModule_get_persistentSettings;
        this.get_persistentSettings_async    = YModule_get_persistentSettings_async;
        this.persistentSettings_async        = YModule_get_persistentSettings_async;
        this.set_persistentSettings          = YModule_set_persistentSettings;
        this.setPersistentSettings           = YModule_set_persistentSettings;
        this.saveToFlash                     = YModule_saveToFlash;
        this.revertFromFlash                 = YModule_revertFromFlash;
        this.get_luminosity                  = YModule_get_luminosity;
        this.luminosity                      = YModule_get_luminosity;
        this.get_luminosity_async            = YModule_get_luminosity_async;
        this.luminosity_async                = YModule_get_luminosity_async;
        this.set_luminosity                  = YModule_set_luminosity;
        this.setLuminosity                   = YModule_set_luminosity;
        this.get_beacon                      = YModule_get_beacon;
        this.beacon                          = YModule_get_beacon;
        this.get_beacon_async                = YModule_get_beacon_async;
        this.beacon_async                    = YModule_get_beacon_async;
        this.set_beacon                      = YModule_set_beacon;
        this.setBeacon                       = YModule_set_beacon;
        this.get_upTime                      = YModule_get_upTime;
        this.upTime                          = YModule_get_upTime;
        this.get_upTime_async                = YModule_get_upTime_async;
        this.upTime_async                    = YModule_get_upTime_async;
        this.get_usbCurrent                  = YModule_get_usbCurrent;
        this.usbCurrent                      = YModule_get_usbCurrent;
        this.get_usbCurrent_async            = YModule_get_usbCurrent_async;
        this.usbCurrent_async                = YModule_get_usbCurrent_async;
        this.get_rebootCountdown             = YModule_get_rebootCountdown;
        this.rebootCountdown                 = YModule_get_rebootCountdown;
        this.get_rebootCountdown_async       = YModule_get_rebootCountdown_async;
        this.rebootCountdown_async           = YModule_get_rebootCountdown_async;
        this.set_rebootCountdown             = YModule_set_rebootCountdown;
        this.setRebootCountdown              = YModule_set_rebootCountdown;
        this.reboot                          = YModule_reboot;
        this.triggerFirmwareUpdate           = YModule_triggerFirmwareUpdate;
        this.get_usbBandwidth                = YModule_get_usbBandwidth;
        this.usbBandwidth                    = YModule_get_usbBandwidth;
        this.get_usbBandwidth_async          = YModule_get_usbBandwidth_async;
        this.usbBandwidth_async              = YModule_get_usbBandwidth_async;
        this.set_usbBandwidth                = YModule_set_usbBandwidth;
        this.setUsbBandwidth                 = YModule_set_usbBandwidth;
        this.download                        = YModule_download;
        this.get_icon2d                      = YModule_get_icon2d;
        this.icon2d                          = YModule_get_icon2d;
        this.get_lastLogs                    = YModule_get_lastLogs;
        this.lastLogs                        = YModule_get_lastLogs;
        this.nextModule                      = YModule_nextModule;
        //--- (end of generated code: YModule constructor)

        // internal function
        this._getDev        = YModule_getDev;

        // public
        this.functionCount  = YModule_functionCount;
        this.functionId     = YModule_functionId;
        this.functionName   = YModule_functionName;
        this.functionValue  = YModule_functionValue;
        this.loadUrl        = YModule_loadUrl;
    }

    YModule = _YModule;
    YModule.FindModule  = YModule_FindModule;
    YModule.FirstModule = YModule_FirstModule;
})();

/**
 * Returns the version identifier for the Yoctopuce library in use.
 * The version is a string in the form "Major.Minor.Build",
 * for instance "1.01.5535". For languages using an external
 * DLL (for instance C#, VisualBasic or Delphi), the character string
 * includes as well the DLL version, for instance
 * "1.01.5535 (1.01.5439)".
 * 
 * If you want to verify in your code that the library version is
 * compatible with the version that you have used during development,
 * verify that the major number is strictly equal and that the minor
 * number is greater or equal. The build number is not relevant
 * with respect to the library compatibility.
 * 
 * @return a character string describing the library version.
 */
function yGetAPIVersion() 
{
    return YAPI.GetAPIVersion();
}

/**
 * Initializes the Yoctopuce programming library explicitly.
 * It is not strictly needed to call yInitAPI(), as the library is
 * automatically  initialized when calling yRegisterHub() for the
 * first time.
 * 
 * When Y_DETECT_NONE is used as detection mode,
 * you must explicitly use yRegisterHub() to point the API to the
 * VirtualHub on which your devices are connected before trying to access them.
 * 
 * @param mode : an integer corresponding to the type of automatic
 *         device detection to use. Possible values are
 *         Y_DETECT_NONE, Y_DETECT_USB, Y_DETECT_NET,
 *         and Y_DETECT_ALL.
 * @param errmsg : a string passed by reference to receive any error message.
 * 
 * @return YAPI_SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function yInitAPI(int_mode,obj_errmsg) 
{
    return YAPI.InitAPI(int_mode,obj_errmsg);
}

/**
 * Frees dynamically allocated memory blocks used by the Yoctopuce library.
 * It is generally not required to call this function, unless you
 * want to free all dynamically allocated memory blocks in order to
 * track a memory leak for instance.
 * You should not call any other library function after calling
 * yFreeAPI(), or your program will crash.
 */
function yFreeAPI() 
{
    YAPI.FreeAPI();
}

/**
 * Disables the use of exceptions to report runtime errors.
 * When exceptions are disabled, every function returns a specific
 * error value which depends on its type and which is documented in
 * this reference manual.
 */
function yDisableExceptions() 
{
    YAPI.DisableExceptions();
}

/**
 * Re-enables the use of exceptions for runtime error handling.
 * Be aware than when exceptions are enabled, every function that fails
 * triggers an exception. If the exception is not caught by the user code,
 * it  either fires the debugger or aborts (i.e. crash) the program.
 * On failure, throws an exception or returns a negative error code.
 */
function yEnableExceptions() 
{
    YAPI.EnableExceptions();
}

/**
 * Setup the Yoctopuce library to use modules connected on a given machine. The
 * parameter will determine how the API will work. Use the follwing values:
 * 
 * <b>usb</b>: When the usb keyword is used, the API will work with
 * devices connected directly to the USB bus. Some programming languages such a Javascript,
 * PHP, and Java don't provide direct access to USB harware, so usb will
 * not work with these. In this case, use a VirtualHub or a networked YoctoHub (see below).
 * 
 * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
 * host with the given IP address or hostname. That host can be a regular computer
 * running a VirtualHub, or a networked YoctoHub such as YoctoHub-Ethernet or
 * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
 * computer, use the IP address 127.0.0.1.
 * 
 * <b>callback</b>: that keywork make the API run in "<i>HTTP Callback</i>" mode.
 * This a special mode allowing to take control of Yoctopuce devices
 * through a NAT filter when using a VirtualHub ou a networked YoctoHub. You only
 * need to configure your hub to call your server script on a regular basis.
 * This mode is currently available for PHP only.
 * 
 * Be aware that only one application can use direct USB access at a
 * given time on a machine. Multiple access would cause conflicts
 * while trying to access the USB modules. In particular, this means
 * that you must stop the VirtualHub software before starting
 * an application that uses direct USB access. The workaround
 * for this limitation is to setup the library to use the VirtualHub
 * rather than direct USB access.
 * 
 * If acces control has been activated on the hub, virtual or not, you want to
 * reach, the URL parameter should look like:
 * 
 * http://username:password@adresse:port
 * 
 * You can call <i>RegisterHub</i> several times to connect to several machines.
 * 
 * @param url : a string containing either "usb","callback" or the
 *         root URL of the hub to monitor
 * @param errmsg : a string passed by reference to receive any error message.
 * 
 * @return YAPI_SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function yRegisterHub(str_url,obj_errmsg)
{
    return YAPI.RegisterHub(str_url,obj_errmsg);
}

/**
 * 
 */
function yPreregisterHub(str_url,obj_errmsg)
{
    return YAPI.PreregisterHub(str_url,obj_errmsg);
}

/**
 * Setup the Yoctopuce library to no more use modules connected on a previously
 * registered machine with RegisterHub.
 * 
 * @param url : a string containing either "usb" or the
 *         root URL of the hub to monitor
 */
function yUnregisterHub(str_url)
{
    YAPI.UnregisterHub(str_url);
}

/**
 * Triggers a (re)detection of connected Yoctopuce modules.
 * The library searches the machines or USB ports previously registered using
 * yRegisterHub(), and invokes any user-defined callback function
 * in case a change in the list of connected devices is detected.
 * 
 * This function can be called as frequently as desired to refresh the device list
 * and to make the application aware of hot-plug events.
 * 
 * @param errmsg : a string passed by reference to receive any error message.
 * 
 * @return YAPI_SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function yUpdateDeviceList(obj_errmsg)
{
    return YAPI.UpdateDeviceList(obj_errmsg);
}

/**
 * Triggers a (re)detection of connected Yoctopuce modules.
 * The library searches the machines or USB ports previously registered using
 * yRegisterHub(), and invokes any user-defined callback function
 * in case a change in the list of connected devices is detected.
 * 
 * This function can be called as frequently as desired to refresh the device list
 * and to make the application aware of hot-plug events.
 * 
 * This asynchronous version exists only in Javascript. It uses a callback instead
 * of a return value in order to avoid blocking Firefox Javascript VM that does not
 * implement context switching during blocking I/O calls.
 * 
 * @param callback : callback function that is invoked when the result is known.
 *         The callback function receives three arguments: the caller-specific
 *         context object, the result code (YAPI_SUCCESS
 *         if the operation completes successfully) and the error
 *         message.
 * @param context : caller-specific object that is passed as-is to the callback function
 * 
 * @return nothing : the result is provided to the callback.
 */
function yUpdateDeviceList_async(func_callback, obj_context)
{
    return YAPI.UpdateDeviceList_async(func_callback, obj_context);
}

/**
 * Maintains the device-to-library communication channel.
 * If your program includes significant loops, you may want to include
 * a call to this function to make sure that the library takes care of
 * the information pushed by the modules on the communication channels.
 * This is not strictly necessary, but it may improve the reactivity
 * of the library for the following commands.
 * 
 * This function may signal an error in case there is a communication problem
 * while contacting a module.
 * 
 * @param errmsg : a string passed by reference to receive any error message.
 * 
 * @return YAPI_SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function yHandleEvents(obj_errmsg)
{ 
    return YAPI.HandleEvents(obj_errmsg); 
}

/**
 * Pauses the execution flow for a specified duration.
 * This function implements a passive waiting loop, meaning that it does not
 * consume CPU cycles significatively. The processor is left available for
 * other threads and processes. During the pause, the library nevertheless
 * reads from time to time information from the Yoctopuce modules by
 * calling yHandleEvents(), in order to stay up-to-date.
 * 
 * This function may signal an error in case there is a communication problem
 * while contacting a module.
 * 
 * @param ms_duration : an integer corresponding to the duration of the pause,
 *         in milliseconds.
 * @param errmsg : a string passed by reference to receive any error message.
 * 
 * @return YAPI_SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function ySleep(int_ms_duration, obj_errmsg)
{ 
    return YAPI.Sleep(int_ms_duration, obj_errmsg); 
}

/**
 * Invoke the specified callback function after a given timeout.
 * This function behaves more or less like Javascript setTimeout,
 * but during the waiting time, it will call yHandleEvents
 * and yUpdateDeviceList periodically, in order to
 * keep the API up-to-date with current devices.
 * 
 * @param callback : the function to call after the timeout occurs.
 *         On Microsoft Internet Explorer, the callback must
 *         be provided as a string to be evaluated.
 * @param ms_timeout : an integer corresponding to the duration of the
 *         timeout, in milliseconds.
 * @param arguments : additional arguments to be passed to the
 *         callback function can be provided, if needed
 *         (not supported on Microsoft Internet Explorer).
 * 
 * @return YAPI_SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function ySetTimeout(func_callback, int_ms_timeout, optional_arguments)
{ 
    var allArgs = [func_callback, int_ms_timeout];
    if(optional_arguments) allArgs.push(optional_arguments);
    return YAPI.SetTimeout.apply(YAPI, allArgs); 
}

/**
 * Returns the current value of a monotone millisecond-based time counter.
 * This counter can be used to compute delays in relation with
 * Yoctopuce devices, which also uses the millisecond as timebase.
 * 
 * @return a long integer corresponding to the millisecond counter.
 */
function yGetTickCount()
{
    return YAPI.GetTickCount();
}

/**
 * Checks if a given string is valid as logical name for a module or a function.
 * A valid logical name has a maximum of 19 characters, all among
 * A..Z, a..z, 0..9, _, and -.
 * If you try to configure a logical name with an incorrect string,
 * the invalid characters are ignored.
 * 
 * @param name : a string containing the name to check.
 * 
 * @return true if the name is valid, false otherwise.
 */
function yCheckLogicalName(str_name)
{
    return YAPI.CheckLogicalName(str_name);
}

/**
 * Register a callback function, to be called each time
 * a device is pluged. This callback will be invoked while yUpdateDeviceList
 * is running. You will have to call this function on a regular basis.
 * 
 * @param arrivalCallback : a procedure taking a YModule parameter, or null
 *         to unregister a previously registered  callback.
 */
function yRegisterDeviceArrivalCallback(func_arrivalCallback)
{
    return YAPI.RegisterDeviceArrivalCallback(func_arrivalCallback);
}

/**
 * Register a device logical name change callback
 */
function yRegisterDeviceChangeCallback(func_changeCallback)
{
    return YAPI.RegisterDeviceChangeCallback(func_changeCallback);
}

/**
 * Register a callback function, to be called each time
 * a device is unpluged. This callback will be invoked while yUpdateDeviceList
 * is running. You will have to call this function on a regular basis.
 * 
 * @param removalCallback : a procedure taking a YModule parameter, or null
 *         to unregister a previously registered  callback.
 */
function yRegisterDeviceRemovalCallback(func_removalCallback)
{
    return YAPI.RegisterDeviceRemovalCallback(func_removalCallback);
}

// Register a new value calibration handler for a given calibration type
//
function yRegisterCalibrationHandler(int_calibrationType, func_calibrationHandler)
{
    return YAPI.RegisterCalibrationHandler(int_calibrationType, func_calibrationHandler);
}

// Standard value calibration handler (n-point linear error correction)
//
var yLinearCalibrationHandler = YAPI.LinearCalibrationHandler;


//--- (generated code: Module functions)

/**
 * Allows you to find a module from its serial number or from its logical name.
 * 
 * This function does not require that the module is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YModule.isOnline() to test if the module is
 * indeed online at a given time. In case of ambiguity when looking for
 * a module by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string containing either the serial number or
 *         the logical name of the desired module
 * 
 * @return a YModule object allowing you to drive the module
 *         or get additional information on the module.
 */
function yFindModule(str_func)
{
    return YModule.FindModule(str_func);
}

/**
 * Starts the enumeration of modules currently accessible.
 * Use the method YModule.nextModule() to iterate on the
 * next modules.
 * 
 * @return a pointer to a YModule object, corresponding to
 *         the first module currently online, or a null pointer
 *         if there are none.
 */
function yFirstModule()
{
    return YModule.FirstModule();
}

//--- (end of generated code: Module functions)

