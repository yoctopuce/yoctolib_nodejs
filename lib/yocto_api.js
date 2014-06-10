/*********************************************************************
 *
 * $Id: yocto_api.js 16246 2014-05-16 12:09:39Z seb $
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

//--- (generated code: YFunction definitions)
// Yoctopuce error codes, also used by default as function return value
var YAPI_SUCCESS                    = 0;       // everything worked allright
var YAPI_NOT_INITIALIZED            = -1;      // call yInitAPI() first !
var YAPI_INVALID_ARGUMENT           = -2;      // one of the arguments passed to the function is invalid
var YAPI_NOT_SUPPORTED              = -3;      // the operation attempted is (currently) not supported
var YAPI_DEVICE_NOT_FOUND           = -4;      // the requested device is not reachable
var YAPI_VERSION_MISMATCH           = -5;      // the device firmware is incompatible with this API version
var YAPI_DEVICE_BUSY                = -6;      // the device is busy with another task and cannot answer
var YAPI_TIMEOUT                    = -7;      // the device took too long to provide an answer
var YAPI_IO_ERROR                   = -8;      // there was an I/O problem while talking to the device
var YAPI_NO_MORE_DATA               = -9;      // there is no more data to read from
var YAPI_EXHAUSTED                  = -10;     // you have run out of a limited ressource, check the documentation
var YAPI_DOUBLE_ACCES               = -11;     // you have two process that try to acces to the same device
var YAPI_UNAUTHORIZED               = -12;     // unauthorized access to password-protected device
var YAPI_RTC_NOT_READY              = -13;     // real-time clock has not been initialized (or time was lost)

var YAPI_INVALID_INT                = 0x7fffffff;
var YAPI_INVALID_UINT               = -1;
var YAPI_INVALID_LONG               = 0x7fffffffffffffff;
var YAPI_INVALID_DOUBLE             = -Number.MAX_VALUE;
var YAPI_INVALID_STRING             = "!INVALID!";
var Y_FUNCTIONDESCRIPTOR_INVALID    = YAPI_INVALID_STRING;
var Y_HARDWAREID_INVALID            = YAPI_INVALID_STRING;
var Y_FUNCTIONID_INVALID            = YAPI_INVALID_STRING;
var Y_FRIENDLYNAME_INVALID          = YAPI_INVALID_STRING;
var Y_LOGICALNAME_INVALID           = YAPI_INVALID_STRING;
var Y_ADVERTISEDVALUE_INVALID       = YAPI_INVALID_STRING;
//--- (end of generated code: YFunction definitions)

//--- (generated code: YMeasure definitions)
//--- (end of generated code: YMeasure definitions)
var Y_DATA_INVALID                  = YAPI_INVALID_DOUBLE;
var Y_DURATION_INVALID              = YAPI_INVALID_INT;

//--- (generated code: YDataStream definitions)
//--- (end of generated code: YDataStream definitions)

//--- (generated code: YDataSet definitions)
//--- (end of generated code: YDataSet definitions)

//--- (generated code: YSensor definitions)
var Y_UNIT_INVALID                  = YAPI_INVALID_STRING;
var Y_CURRENTVALUE_INVALID          = YAPI_INVALID_DOUBLE;
var Y_LOWESTVALUE_INVALID           = YAPI_INVALID_DOUBLE;
var Y_HIGHESTVALUE_INVALID          = YAPI_INVALID_DOUBLE;
var Y_CURRENTRAWVALUE_INVALID       = YAPI_INVALID_DOUBLE;
var Y_LOGFREQUENCY_INVALID          = YAPI_INVALID_STRING;
var Y_REPORTFREQUENCY_INVALID       = YAPI_INVALID_STRING;
var Y_CALIBRATIONPARAM_INVALID      = YAPI_INVALID_STRING;
var Y_RESOLUTION_INVALID            = YAPI_INVALID_DOUBLE;
//--- (end of generated code: YSensor definitions)

//--- (generated code: YModule definitions)
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
var Y_PRODUCTNAME_INVALID           = YAPI_INVALID_STRING;
var Y_SERIALNUMBER_INVALID          = YAPI_INVALID_STRING;
var Y_PRODUCTID_INVALID             = YAPI_INVALID_UINT;
var Y_PRODUCTRELEASE_INVALID        = YAPI_INVALID_UINT;
var Y_FIRMWARERELEASE_INVALID       = YAPI_INVALID_STRING;
var Y_LUMINOSITY_INVALID            = YAPI_INVALID_UINT;
var Y_UPTIME_INVALID                = YAPI_INVALID_LONG;
var Y_USBCURRENT_INVALID            = YAPI_INVALID_UINT;
var Y_REBOOTCOUNTDOWN_INVALID       = YAPI_INVALID_INT;
//--- (end of generated code: YModule definitions)

// yInitAPI constants (not really useful in Javascript, but defined for code portability)
var Y_DETECT_NONE                   = 0;
var Y_DETECT_USB                    = 1;
var Y_DETECT_NET                    = 2;
var Y_DETECT_ALL                    = (Y_DETECT_USB | Y_DETECT_NET);

var yAPI, YAPI;
var YFunction;
var YMeasure;
var YDataStream;
var YDataSet;
var YSensor;
var YModule;

var Y_BASETYPES = { Function:0, Sensor:1 };

(function()
{
    // 
    // Method common to all classes, to throw exceptions or report errors (Javascript-specific)
    //
    function YAPI_throw(int_errType, str_errMsg, obj_retVal)
    {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;

        if(!YAPI.exceptionsDisabled) {
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
        return obj_retVal;
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
    function YFunctionType(str_classname)
    {
        // private
        this._className     = str_classname;
        this._connectedFns  = {};           // functions requested and available, by Hardware Id
        this._requestedFns  = {};           // functions requested but not yet known, by any type of name
        this._hwIdByName    = {};           // hash table of function Hardware Id by logical name
        this._nameByHwId    = {};           // hash table of function logical name by Hardware Id
        this._valueByHwId   = {};           // hash table of function advertised value by logical name
        this._baseType      = 0;            // default to no abstract base type (generic YFunction)
    }    

    // Index a single function given by HardwareId and logical name; store any advertised value
    // Return true iff there was a logical name discrepency
    function YFunctionType_reindexFunction(str_hwid, str_name, str_val, int_basetype)
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
        if(int_basetype != undefined) {
            if(this._baseType == 0) {
                this._baseType = int_basetype;
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
        var name;
        if (resolved.errorType != YAPI_SUCCESS) {
            return resolved;
        }
        if (this._className == "Module"){
            var friend = resolved.result;
            name = this._nameByHwId[resolved.result];
            if (name !=undefined && name !=""){
                friend = this._nameByHwId[resolved.result];
            }
            return {errorType:YAPI_SUCCESS, 
                     errorMsg:"no error", 
                     result:String(friend)};
        } else {
            var pos = resolved.result.indexOf(".");
            var str_serialMod = resolved.result.substr(0,pos);
            var str_friendModFull = YAPI.getFriendlyNameFunction("Module",str_serialMod).result;
            var str_friendMod = str_friendModFull.substr(0,str_friendModFull.indexOf("."));
            var str_friendFunc = resolved.result.substr(pos+1);
            name = this._nameByHwId[resolved.result];
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
        var currval = this._valueByHwId[str_hwid];
        if(!(currval == undefined) && currval == str_pubval) {
            return;
        }
        this._valueByHwId[str_hwid] = str_pubval;
        var receivers = YFunction._ValueCallbackList;
        for(var i = 0; i < receivers.length; i++) {
            var fun = receivers[i];
            if(!fun._hwId) continue;
            if(fun._hwId == str_hwid) {
                YAPI.addValueEvent(fun, str_pubval);                
            }
        }
    }

    // Retrieve a function advertised value by hardware id
    function YFunctionType_getFunctionValue(str_hwid)
    {
        return this._valueByHwId[str_hwid];
    }

    // Stores a function timed value by hardware id, queue an event if needed
    function YFunctionType_setTimedReport(str_hwid, float_timestamp, arr_report)
    {
        var receivers = YFunction._TimedReportCallbackList;
        for(var i = 0; i < receivers.length; i++) {
            var fun = receivers[i];
            if(!fun._hwId) continue;
            if(fun._hwId == str_hwid) {
                YAPI.addTimedReportEvent(fun, float_timestamp, arr_report);                
            }
        }
    }
    
    // Return the basetype of this function class
    function YFunctionType_getBaseType()
    {
        return this._baseType;
    }

    // Find the hardwareId of the first instance of a given function class
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

    YFunctionType.prototype.reindexFunction    = YFunctionType_reindexFunction;
    YFunctionType.prototype.forgetFunction     = YFunctionType_forgetFunction;
    YFunctionType.prototype.resolve            = YFunctionType_resolve;
    YFunctionType.prototype.getFriendlyName    = YFunctionType_getFriendlyName;
    YFunctionType.prototype.setFunction        = YFunctionType_setFunction;
    YFunctionType.prototype.getFunction        = YFunctionType_getFunction;
    YFunctionType.prototype.setFunctionValue   = YFunctionType_setFunctionValue;
    YFunctionType.prototype.getFunctionValue   = YFunctionType_getFunctionValue;
    YFunctionType.prototype.setTimedReport     = YFunctionType_setTimedReport;
    YFunctionType.prototype.getBaseType        = YFunctionType_getBaseType;
    YFunctionType.prototype.getFirstHardwareId = YFunctionType_getFirstHardwareId;
    YFunctionType.prototype.getNextHardwareId  = YFunctionType_getNextHardwareId;

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
        this._deviceTime      = 0;
        
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

    // Return the value of the last timestamp sent by the device, if any
    function YDevice_getDeviceTime()
    {
        return this._deviceTime;
    }

    // Return the value of the last timestamp sent by the device, if any
    function YDevice_setDeviceTime(float_timestamp)
    {
        this._deviceTime = float_timestamp;
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
    // 
    // This is the asynchronous version, that uses a callback instead of a return value.
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
    // 
    // This is the asynchronous version, that uses a callback instead of a return value.
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
                                      params.obj._throw(YAPI_IO_ERROR, "Request failed, could not parse API result for "+params.obj._rootUrl,
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

    YDevice.prototype._throw           = YAPI_throw;
    YDevice.prototype._updateFromYP    = YDevice_updateFromYP;
    YDevice.prototype._updateFromReq   = YDevice_updateFromReq;
    YDevice.prototype.getRootUrl       = YDevice_getRootUrl;
    YDevice.prototype.getSerialNumber  = YDevice_getSerialNumber;
    YDevice.prototype.getLogicalName   = YDevice_getLogicalName;
    YDevice.prototype.getProductName   = YDevice_getProductName;
    YDevice.prototype.getProductId     = YDevice_getProductId;
    YDevice.prototype.getBeacon        = YDevice_getBeacon;
    YDevice.prototype.getDeviceTime    = YDevice_getDeviceTime;
    YDevice.prototype.setDeviceTime    = YDevice_setDeviceTime;
    YDevice.prototype.describe         = YDevice_describe;
    YDevice.prototype.requestAPI       = YDevice_requestAPI;
    YDevice.prototype.requestAPI_async = YDevice_requestAPI_async;
    YDevice.prototype.refresh          = YDevice_refresh;
    YDevice.prototype.refresh_async    = YDevice_refresh_async;
    YDevice.prototype.dropCache        = YDevice_dropCache;
    YDevice.prototype.functionCount    = YDevice_functionCount;
    YDevice.prototype.functionId       = YDevice_functionId;
    YDevice.prototype.functionName     = YDevice_functionName;
    YDevice.prototype.functionValue    = YDevice_functionValue;
        
    // 
    // YAPI Context
    //
    // This class provides the high-level entry points to access Functions, stores
    // an indexes instances of the Device object and of FunctionType collections.
    //

    function _YAPI()
    {
        // private
        this._init = function() {
            this._hubs = [];          // array of root urls
            this._devs = {};          // hash table of known devices, by serial number
            this._snByUrl = {};       // serial number for each known device, by URL
            this._snByName = {};      // serial number for each known device, by name
            this._fnByType = {};      // functions by type
            this._fnByType["Module"]    = new YFunctionType("Module");
            this._lastErrorType         = YAPI_SUCCESS;
            this._lastErrorMsg          = "no error";
            this._firstArrival          = true;
            this._pendingCallbacks      = [];
            this._arrivalCallback       = null;
            this._namechgCallback       = null;
            this._removalCallback       = null;
            this._data_events           = [];
            this._forwardValues         = 0;
            this._calibHandlers         = {};
            this._serverResponse        = null;
            this._callbackCache         = null;
        };
        this._init();

        // Default string encoding used in the library
        this.defaultEncoding       = 'binary';
        
        // Default cache validity (in [ms]) before reloading data from device. This saves a lots of trafic.
        // Note that a value under 2 ms makes little sense since a USB bus itself has a 2ms roundtrip period
        this.defaultCacheValidity  = 5;
        // Switch to turn off exceptions and use return codes instead, for source-code compatibility
        // with languages without exception support like C
        this.exceptionsDisabled    = false;

        for(var i = 1; i <= 20; i++) {
            this.RegisterCalibrationHandler(i,this.LinearCalibrationHandler);
        }
    }
    
    // Context used to update the list of known devices by rescanning all hubs as needed
    function YAPI_updateDeviceList_init()
    {
        // make sure all hubs are reachable
        var rooturl;
        var hubs = [];
        var i;
        for(i = 0; i < this._hubs.length; i++) {
            rooturl = this._hubs[i].urlInfo.url;
            var hubdev = this.getDevice(rooturl);
            if(!hubdev) {
                return this._throw(YAPI_INVALID_ARGUMENT, "Cannot find hub "+this._hubs[i].urlInfo.url, null);
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
            rooturl = this._devs[serial].getRootUrl();
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
        var serial;
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
                var basetype = yprec["baseType"];
                if(ftype.reindexFunction(hwid, yprec["logicalName"], yprec["advertisedValue"], basetype)) {
                    // logical name discrepency detected, force a refresh from device
                    serial = hwid.substr(0,hwid.indexOf("."));
                    refresh[serial] = true;
                }
            }
        }
        // Reindex all devices from white pages
        var thishub = this._hubs[hub.hubidx];
        var devkey;
        for(devkey in whitePages) {
            var devinfo = whitePages[devkey];
            serial  = devinfo["serialNumber"];
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
                serial = evt.slice(1);
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
            retcode = this._updateDeviceList_process(ctx, yreq);
            if(retcode != YAPI_SUCCESS) {
                return {errorType: this._lastErrorType, 
                         errorMsg: this._lastErrorMsg, 
                         result:   this._lastErrorType};
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
        if(yhub.urlInfo.host == 'callback') {
            return; // no event monitoring in callback mode
        }
        var args = "?len="+yhub.notiflen.toString();
        if(yhub.notifPos > 0) args += "&abs="+yhub.notifPos;
        this.devRequest(yhub.urlInfo.url, "GET /not.byn"+args, 
            function(httpRequest) {
                var hub = YAPI._hubs[int_hubidx];
                if (httpRequest.readyState >= 3) {
                    var status = parseInt(httpRequest.status);
                    if(httpRequest.readyState == 4 && status != 200 && status != 304) {
                        // connection error
                        if(hub.retryDelay < 15000) hub.retryDelay *= 2;
                        hub.devListValidity = 500;
                        hub.devListExpires = 0;
                        setTimeout(function(hubidx){YAPI.monitorEvents(hubidx)}, hub.retryDelay, int_hubidx);
                    } else {
                        // receiving data properly
                        var value;
                        var newlen;
                        if(httpRequest.readyState == 3) {
                            // when using reconnection mode, ignore state 3
                            if(hub.notiflen == 1) return;
                            newlen = httpRequest.responseText.length;
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
                                var firstCode = ev.charAt(0);
                                if(ev.length >= 3 && firstCode >= 'x' && firstCode <= 'z') {
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
                                        var funcid = (funydx == 0xf ? 'time' : YAPI._devs[serial].functionId(funydx));
                                        if(funcid != "") {
                                            value = ev.slice(3);
                                            if(value != "") value = value.split("\0")[0];
                                            if(firstCode == 'y') {
                                                // function value ydx (tiny notification)
                                                YAPI.setFunctionValue(serial+"."+funcid, value);
                                            } else {
                                                // timed value report
                                                var pos, arr = [(firstCode == 'z' ? 1 : 0)];
                                                for(pos = 0; pos < value.length; pos += 2) {
                                                    arr.push(parseInt(value.substr(pos,2), 16));
                                                }
                                                var dev = YAPI._devs[serial];
                                                if(funcid == 'time') {
                                                    var time = arr[1]+0x100*arr[2]+0x10000*arr[3]+0x1000000*arr[4];
                                                    dev.setDeviceTime(time + arr[5] / 250.0);
                                                } else {
                                                    YAPI.setTimedReport(serial+"."+funcid, dev.getDeviceTime(), arr);
                                                }
                                            }
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
                                            value = parts[2].split("\0");
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
                        if(httpRequest.readyState == 4 && parseInt(httpRequest.status) != 0) {
                            hub.currPos = 0;
                            YAPI.monitorEvents.call(YAPI,int_hubidx);
                        }
                    }
                }
            }
        );
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
        var decexp = decExp[val >> 11];
        if(decexp >= 1.0) {
            res = (val & 2047) * decexp;
        } else { // fix rounding issue
            res = (val & 2047) / Math.round(1/decexp);
        }
    
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
    
    // Parse an array of u16 encoded in a base64-like string with memory-based compresssion
    function YAPI_decodeWords(data)
    {
        var udata = [];
        for(var i = 0; i < data.length;) {
            var c = data[i];
            if(c == '*') {
                val = 0; 
                i++;
            } else if(c == 'X') {
                val = 0xffff; 
                i++;
            } else if(c == 'Y') {
                val = 0x7fff; 
                i++;
            } else if(c >= 'a') {
                var srcpos = udata.length-1-(data.charCodeAt(i++)-97);
                if(srcpos < 0)
                    val = 0;
                else
                    val = udata[srcpos];
            } else {
                if(i+3 > data.length) 
                    return udata;
                var val = (data.charCodeAt(i++) - 48);
                val += (data.charCodeAt(i++) - 48) << 5;
                if(data[i] == 'z') data[i] = '\\';
                val += (data.charCodeAt(i++) - 48) << 10;
            }
            udata.push(val);
        }
        return udata;
    }

    // Return a Device object for a specified URL, serial number or logical device name
    // This function will not cause any network access
    function YAPI_getDevice(str_device)
    {
        var dev = null;
        var serial;

        if(str_device.substr(0,7) == "http://") {
            // lookup by url
            serial = this._snByUrl[str_device];
            if(serial != undefined) dev = this._devs[serial];
        } else {
            // lookup by serial
            if(this._devs[str_device]) {
                dev = this._devs[str_device];
            } else {
                // fallback to lookup by logical name
                serial = this._snByName[str_device];
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
        this._fnByType["Module"].reindexFunction(serial+".module", lname, null, null);
        var i, count = obj_dev.functionCount();
        for(i = 0; i < count; i++) {
            var funcid = obj_dev.functionId(i);
            var funcname = obj_dev.functionName(i);
            var classname = this.functionClass(funcid);
            this._fnByType[classname].reindexFunction(serial+"."+funcid, funcname, null, null);
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
        if(Y_BASETYPES[str_className] == undefined) {
            // using a regular function type
            if(this._fnByType[str_className] == undefined)
                this._fnByType[str_className] = new YFunctionType(str_className);
            return this._fnByType[str_className].resolve(str_func);
        }
        // using an abstract baseType
        var baseType = Y_BASETYPES[str_className];
        var res;
        for(str_className in this._fnByType) {
            if(this._fnByType[str_className].getBaseType() == baseType) {
                res = this._fnByType[str_className].resolve(str_func);
                if(res.errorType == YAPI_SUCCESS) return res;
            }
        }
        return {errorType:YAPI_DEVICE_NOT_FOUND, 
                errorMsg:"No "+str_className+" ["+str_func+"] found (old firmware?)",
                result:null};
    }

    // Find the best known identifier (hardware Id) for a given function
    function YAPI_getFriendlyNameFunction(str_className, str_func)
    {
        if(Y_BASETYPES[str_className] == undefined) {
            // using a regular function type
            if(this._fnByType[str_className] == undefined)
                this._fnByType[str_className] = new YFunctionType(str_className);
            return this._fnByType[str_className].getFriendlyName(str_func);
        }
        // using an abstract baseType
        var baseType = Y_BASETYPES[str_className];
        var res;
        for(str_className in this._fnByType) {
            if(this._fnByType[str_className].getBaseType() == baseType) {
                res = this._fnByType[str_className].getFriendlyName(str_func);
                if(res.errorType == YAPI_SUCCESS) return res;
            }
        }
        return {errorType:YAPI_DEVICE_NOT_FOUND, 
                errorMsg:"No "+str_className+" ["+str_func+"] found (old firmware?)",
                result:null};
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
        this._fnByType[classname].setFunctionValue(str_hwid, str_pubval);
    }

    // Set add a timed value report for a function
    function YAPI_setTimedReport(str_hwid, float_timestamp, arr_report)
    {
        var classname = this.functionClass(str_hwid);
        this._fnByType[classname].setTimedReport(str_hwid, float_timestamp, arr_report);
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
        this._data_events.push([obj_func, str_newval]);
        if(this._forwardValues > 0) {
            YAPI.HandleEvents();
        }
    }

    // Queue a timed value report event
    function YAPI_addTimedReportEvent(obj_func, float_timestamp, arr_report)
    {
        this._data_events.push([obj_func, float_timestamp, arr_report]);
        if(this._forwardValues > 0) {
            YAPI.HandleEvents();
        }
    }

    // Find the hardwareId for the first instance of a given function class
    function YAPI_getFirstHardwareId(str_className)
    {
        if(Y_BASETYPES[str_className] == undefined) {
            // enumeration of a regular function type
            if(this._fnByType[str_className] == undefined)
                this._fnByType[str_className] = new YFunctionType(str_className);
            return this._fnByType[str_className].getFirstHardwareId();
        }
        // enumeration of an abstract class
        var baseType = Y_BASETYPES[str_className];
        var res;
        for(str_className in this._fnByType) {
            if(this._fnByType[str_className].getBaseType() == baseType) {
                res = this._fnByType[str_className].getFirstHardwareId();
                if(res != undefined) return res;
            }
        }
        return null;
    }

    // Find the hardwareId for the next instance of a given function class
    function YAPI_getNextHardwareId(str_className, str_hwid)
    {        
        if(Y_BASETYPES[str_className] == undefined) {
            // enumeration of a regular function type
            return this._fnByType[str_className].getNextHardwareId(str_hwid);
        }
        // enumeration of an abstract class
        var baseType = Y_BASETYPES[str_className];
        var prevclass = this.functionClass(str_hwid);
        var res = this._fnByType[prevclass].getNextHardwareId(str_hwid);
        if(res != undefined) return res;
        for(str_className in this._fnByType) {
            if(prevclass != "") {
                if(str_className != prevclass) continue;
                prevclass = "";
                continue;
            }
            if(this._fnByType[str_className].getBaseType() == baseType) {
                res = this._fnByType[str_className].getFirstHardwareId();
                if(res != undefined) return res;
            }
        }
        return null;
    }

    // Perform an HTTP request on a device, by URL or identifier. 
    // When loading the REST API from a device by identifier, the device cache will be used.
    // The 3rd argument of the function is optional, and used for implementing the asynchronous
    // version only. Return a strucure including errorType, errorMsg and result
    function YAPI_devRequest(str_device, str_request, func_statechanged, obj_body)
    {
        var async = (typeof func_statechanged != "undefined");
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
        if(baseUrl == "http://callback:4444/") {
            baseUrl = baseUrl.slice(baseUrl.indexOf('/',16));
            return this._httpCallbackRequest(method, baseUrl+devUrl, func_statechanged, obj_body)
        }
        // FOR NODE.JS ONLY: use XMLHttpRequest emulation
        var httpRequest = new XMLHttpRequest(); // using node.js XMLHTTPRequest emulation
        try { 
            httpRequest.reqUrl = baseUrl+devUrl;
            httpRequest.open(method,baseUrl+devUrl,async,'','');
            if(!obj_body) {
                obj_body = '';
            } else if(obj_body.length > 4 && obj_body.toString('ascii',0,2) == '--') {
                // FOR NODE.JS ONLY: Add form-encoding header
                for(var endb = 2; endb < obj_body.length; endb++) {
                    if(obj_body[endb] == 13) break;
                }               
                var boundary = obj_body.toString('ascii', 2, endb);
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
            var status = parseInt(httpRequest.status);
            if(status != 200 && status != 304) {
                return {errorType:YAPI_IO_ERROR, 
                         errorMsg:"Received HTTP status "+status+" ("+httpRequest.responseText+") for "+baseUrl+devUrl, 
                         result:null};
            }
            // FIXME: For now, we use the XMLHTTPRequest node.js package
            //        that unfortunately uses 'utf8' encoding instead of
            //        'binary', which will cause issues on binary files.
            //        We should fork it, or rewrite our own HTTP code.
            return {errorType:YAPI_SUCCESS, 
                     errorMsg:"no error", 
                     result:new Buffer(httpRequest.responseText,'utf8')};
        } else {
            // called in asynchronous mode
            return {errorType:YAPI_SUCCESS, 
                     errorMsg:"no error", 
                     result:httpRequest};
        }
    }

    // Emulate an HTTP request using preloaded HTTP callback cache
    // (used for node.js only)
    //
    function YAPI_httpCallbackRequest(method, devUrl, func_statechanged, obj_body)
    {
        var async = (typeof func_statechanged != "undefined");
        var res = { errorType:YAPI_SUCCESS, 
                    errorMsg:"no error", 
                    result:""};

        //console.log("Request: "+method+" "+devUrl+(async?" async":""));
        if(method == 'POST') {
            // Node.js uses a Buffer as body
            var boundary = '???';
            for(var endb = 0; endb < obj_body.length; endb++) {
                if(obj_body[endb] == 13) break;
            }               
            if(obj_body.toString('ascii', 0, 2)=='--' && endb > 2 && endb < 20) {
                boundary = obj_body.toString('ascii', 2, endb);
            }
            this._serverResponse.write("\n@YoctoAPI:"+method+" "+devUrl+" "+obj_body.length+":"+boundary+"\n");
            this._serverResponse.write(obj_body);
        } else if(method == 'GET') {
            var jzon = devUrl.indexOf('?fw=');
            if(jzon != -1 && devUrl.indexOf('&', jzon) == -1) {
                devUrl = devUrl.slice(0, jzon);                
            }
            if(devUrl.indexOf('?') == -1 ||
               devUrl.indexOf('/logs.txt') != -1 ||
               devUrl.indexOf('/logger.json') != -1 ||
               devUrl.indexOf('/ping.txt') != -1 ||
               devUrl.indexOf('/files.json?a=dir') != -1) {
                // read request, load from cache
                var subfun = /\/api\/([a-z][A-Za-z0-9]*)[.]json$/.exec(devUrl);
                if(subfun) {
                    devUrl = devUrl.slice(0,subfun.index)+'/api.json';
                }
                if(!this._callbackCache[devUrl]) {
                    this._serverResponse.write("\n!YoctoAPI:"+devUrl+" is not preloaded, adding to list");
                    this._serverResponse.write("\n@YoctoAPI:+"+devUrl+"\n");
                    res = { errorType:YAPI_NO_MORE_DATA, 
                            errorMsg:"URL "+devUrl+" not preloaded, adding to list", 
                            result:null};
                } else {
                    var jsonres = this._callbackCache[devUrl];
                    if(subfun) {
                        jsonres = jsonres[subfun[1]];
                    }
                    res.result = JSON.stringify(jsonres);
                }
            } else {
                // change request, print to output stream
                this._serverResponse.write("\n@YoctoAPI:"+method+" "+devUrl+"\n");
            }
        } else {
            res = { errorType:YAPI_NOT_SUPPORTED, 
                    errorMsg:"Unsupported HTTP method", 
                    result:null};
        }
        if(async) {
            var pseudoRequest = { readyState: 4, status: 200, 
                                  responseText: new Buffer(res.result,YAPI.defaultEncoding) };
            if(res.errorType != YAPI_SUCCESS) {
                pseudoRequest.status = 405;
            }
            func_statechanged(pseudoRequest);
            res.result = pseudoRequest;
        }
        return res;
    }
    
    // Perform an HTTP request on a device, by URL or identifier. 
    // 
    // This is the asynchronous version, that uses a callback instead of a return value.
    function YAPI_devRequest_async(str_device, str_request, obj_body, func_callback, obj_context)
    {
        var yreq = this.devRequest(str_device, str_request, function(httpRequest) {
            if (httpRequest.readyState == 4) {
                var status = parseInt(httpRequest.status);
                if(status != 200 && status != 304) {
                    func_callback(obj_context, {errorType:YAPI_IO_ERROR, 
                                                errorMsg:"Received HTTP status "+status+" ("+httpRequest.responseText+")", 
                                                result:null});
                } else {
                    // FIXME: For now, we use the XMLHTTPRequest node.js package
                    //        that unfortunately uses 'utf8' encoding instead of
                    //        'binary', which will cause issues on binary files.
                    //        We should fork it, or rewrite our own HTTP code.
                    func_callback(obj_context, {errorType:YAPI_SUCCESS, 
                                                errorMsg:"no error", 
                                                result:new Buffer(httpRequest.responseText,'utf8')});
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
    // 
    // This is the asynchronous version, that uses a callback instead of a return value.
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
        var yreq;
        devreq = devreq.result;
        var loadval = null;
        if(str_extra == "") {
            // use a cached API string (reload if needed)
            yreq = devreq.device.requestAPI();
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
            yreq = this.devRequest(devreq.deviceid, httpreq);
            if(yreq.errorType != YAPI_SUCCESS) return yreq;
            if(yreq.result == '' && httpreq.indexOf('?') >= 0) return yreq;
            try {loadval = JSON.parse(yreq.result);} catch(err) {}
        }
        yreq.hwid       = devreq.hwid;
        yreq.deviceid   = devreq.deviceid;
        yreq.functionid = devreq.functionid;
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
    // 
    // This is the asynchronous version, that uses a callback instead of a return value.
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
                    yreq.hwid       = params.hwid;
                    yreq.deviceid   = params.deviceid;
                    yreq.functionid = params.functionid;
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
                    if(params.functionid != null) loadval = loadval[params.functionid];
                    yreq.result = loadval;
                    if(params.cb) params.cb(params.ctx, yreq);
                    return;
                }
            };
            if(obj_ctx.extra == "") {
                // use a cached API string (reload if needed)
                devreq.device.requestAPI_async(reqcb, {hwid       : devreq.hwid,
                                                       deviceid   : devreq.deviceid,
                                                       functionid : devreq.functionid,
                                                       cb         : obj_ctx.callback, 
                                                       ctx        : obj_ctx.context});
            } else {
                // request specified function only to minimize traffic
                devreq.device.dropCache();
                var httpreq = "GET /api/"+devreq.functionid+obj_ctx.extra;
                YAPI.devRequest_async(devreq.deviceid, httpreq, '',
                                      reqcb, {hwid       : devreq.hwid,
                                              deviceid   : devreq.deviceid,
                                              functionid : devreq.functionid,
                                              cb         : obj_ctx.callback, 
                                              ctx        : obj_ctx.context});
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
    // 
    // This is the asynchronous version, that uses a callback instead of a return value.
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
        return "1.10.16490";
    }

    /**
     * Initializes the Yoctopuce programming library explicitly.
     * It is not strictly needed to call yInitAPI(), as the library is
     * automatically  initialized when calling yRegisterHub() for the
     * first time.
     * 
     * When YAPI.DETECT_NONE is used as detection mode,
     * you must explicitly use yRegisterHub() to point the API to the
     * VirtualHub on which your devices are connected before trying to access them.
     * 
     * @param mode : an integer corresponding to the type of automatic
     *         device detection to use. Possible values are
     *         YAPI.DETECT_NONE, YAPI.DETECT_USB, YAPI.DETECT_NET,
     *         and YAPI.DETECT_ALL.
     * @param errmsg : a string passed by reference to receive any error message.
     * 
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_InitAPI(mode,errmsg) 
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
        // when invoked in callback mode, close connection
        if(this._serverResponse) {
            this._serverResponse.end();
        }

        // clear all caches
        this._init();
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


    function _parseRegisteredUrl(str_url)
    {
        var user = '';
        var pass = '';
        var port = '4444';
        var host;
        var url="http://";

        if(str_url.slice(0,7) == 'http://') {
            str_url = str_url.slice(7);
        }
        var pos = str_url.indexOf('/');
        if (pos > 0) {
            str_url = str_url.slice(0, pos);
        }
        var authpos = str_url.indexOf('@');
        if (authpos >= 0) {
            var auth = str_url.slice(0, authpos);
            var passpos = auth.indexOf(':');
            if (passpos >= 0) {
                user = auth.slice(0, passpos);
                pass = auth.slice(passpos + 1);
                url += user + ':' + pass + '@';
            }else{
                user = auth;                
                url += user + '@';
            }
            str_url = str_url.slice(authpos + 1);
        }
        pos = str_url.indexOf(':');
        if(pos < 0) {
            host = str_url;
        } else {
            host = str_url.slice(0,pos);
            port = str_url.slice(pos + 1);
        }
        if (host == 'callback')
            url ="http://callback:4444/";
        else
            url += host + ':' + port + "/";
        var res = {'user':user, 'pass':pass, 'host':host, 'port':port, 'url':url}
        return res;

    }

    function YAPI_preregisterHub_internal(var_urlInfo)
    {

        for(var i = 0; i < this._hubs.length; i++) {
            if(this._hubs[i].urlInfo.url == var_urlInfo.url) return;
        }

        // Add hub to known list
        var notiflen = 32500;
        var newhub = {
            hubidx          : this._hubs.length,   // index of hub in array
            urlInfo         : var_urlInfo,         // structure that describe the root URL of the hub
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
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a given machine. The
     * parameter will determine how the API will work. Use the following values:
     * 
     * <b>usb</b>: When the usb keyword is used, the API will work with
     * devices connected directly to the USB bus. Some programming languages such a Javascript,
     * PHP, and Java don't provide direct access to USB hardware, so usb will
     * not work with these. In this case, use a VirtualHub or a networked YoctoHub (see below).
     * 
     * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
     * host with the given IP address or hostname. That host can be a regular computer
     * running a VirtualHub, or a networked YoctoHub such as YoctoHub-Ethernet or
     * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
     * computer, use the IP address 127.0.0.1.
     * 
     * <b>callback</b>: that keyword make the API run in "<i>HTTP Callback</i>" mode.
     * This a special mode allowing to take control of Yoctopuce devices
     * through a NAT filter when using a VirtualHub or a networked YoctoHub. You only
     * need to configure your hub to call your server script on a regular basis.
     * This mode is currently available for PHP and Node.JS only.
     * 
     * Be aware that only one application can use direct USB access at a
     * given time on a machine. Multiple access would cause conflicts
     * while trying to access the USB modules. In particular, this means
     * that you must stop the VirtualHub software before starting
     * an application that uses direct USB access. The workaround
     * for this limitation is to setup the library to use the VirtualHub
     * rather than direct USB access.
     * 
     * If access control has been activated on the hub, virtual or not, you want to
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
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_RegisterHub(url,errmsg)
    {
        var i;

        var urlInfo = _parseRegisteredUrl(url);

        var yreq = YAPI.devRequest(urlInfo.url, "GET /api.json");
        if(yreq.errorType != YAPI_SUCCESS) {
            if(errmsg != undefined) errmsg.msg = yreq.errorMsg;
            return this._throw(YAPI_DEVICE_NOT_FOUND, yreq.errorMsg, YAPI_DEVICE_NOT_FOUND);
        }

        this._preregisterHub_internal(urlInfo);
        // If hub is not yet known, create a device object (synchronous call)
        var serial = this._snByUrl[urlInfo.url];
        if(!serial) {
            new YDevice(urlInfo.url, null, null);
        }

        // Register device list
        yreq = this._updateDeviceList_internal(true, false);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(errmsg != undefined) errmsg.msg = yreq.errorMsg;
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        return YAPI_SUCCESS;
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a given machine. The
     * parameter will determine how the API will work. Use the follwing values:
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
     * This mode is currently available for PHP and Node.JS only.
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
     * @param url : a string containing either the root URL of the hub to monitor, or "callback"
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments: 
     *         - the user-specific context object
     *         - the result code (YAPI.SUCCESS if the operation completes successfully) 
     *         - the error message, if any
     * @param context : user-specific object that is passed as-is to the callback function
     * @param incomingMessage : when url is "callback", must be set to the node.js incomingMessage object.
     *         In all other cases, this parameter is ignored.
     * @param serverResponse  : when url is "callback", must be set to the node.js serverResponse object.
     *         In all other cases, this parameter is ignored.
     * 
     * @return YAPI_SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_RegisterHub_async(url, callback, context, incomingMessage, serverResponse)
    {
        var i;

        var urlInfo = _parseRegisteredUrl(url);
        var doit = function() {
            YAPI.devRequest_async(urlInfo.url, "GET /api.json", '', function(params,yreq) {
                if(yreq.errorType != YAPI_SUCCESS) {
                    params.cb(params.ctx, yreq.errorType, yreq.errorMsg);
                }
                YAPI._preregisterHub_internal(urlInfo);
                // If hub is not yet known, create a device object
                var serial = YAPI._snByUrl[urlInfo.url];
                if(!serial) {
                    // create device asynchronously, without callback
                    new YDevice(urlInfo.url, null, null, function(params,res) {
                        // Update device list
                        YAPI.UpdateDeviceList_async(params.cb, params.ctx);
                    }, params);
                }
            }, {rooturl: urlInfo.url, cb: callback, ctx: context});
        }
        if(urlInfo['host'] == "callback") {
            YAPI._serverResponse = serverResponse;
            var badCallback = function() {
                var errmsg = "RegisterHub(callback) used without posting YoctoAPI data";
                //console.log(errmsg);
                YAPI._serverResponse.write("\n!YoctoAPI:"+errmsg+"\n");
                YAPI._callbackCache = [];
                callback(context, YAPI.NO_MORE_DATA, errmsg);
            };
            if(incomingMessage.method != 'POST') {
                badCallback();
            } else {
                YAPI._callbackCache = '';
                incomingMessage.on('end',function() {
                    if(YAPI._callbackCache == "") {
                        badCallback();
                    } else {
                        var data_str = YAPI._callbackCache;
                        YAPI._callbackCache = JSON.parse(data_str);
                        if (urlInfo.pass != '') {
                            // callback data signed, verify signature
                            if (!YAPI._callbackCache.sign) {
                                var errmsg = "missing signature from incoming YoctoHub (callback password required)";
                                YAPI._serverResponse.write("\n!YoctoAPI:"+errmsg+"\n");
                                YAPI._callbackCache = [];
                                callback(context, YAPI.NO_MORE_DATA, errmsg);
                                return YAPI_INVALID_ARGUMENT;
                            }
                            var sign = YAPI._callbackCache['sign'];
                            var pass = urlInfo.pass;
                            var salt;
                            if (pass.length == 32) {
                                salt = pass.toLowerCase();
                            } else {
                                salt = crypto.createHash("md5").update(pass).digest("hex");
                            }
                            data_str = data_str.replace(sign, salt);
                            var check = crypto.createHash("md5").update(data_str).digest("hex");
                            if (check.toLowerCase() != sign.toLowerCase()) {
                                //console.log("Computed signature: "+ check);
                                //console.log("Received signature: "+ sign);
                                var errmsg = "invalid signature from incoming YoctoHub (invalid callback password)";
                                YAPI._serverResponse.write("\n!YoctoAPI:"+errmsg+"\n");
                                YAPI._callbackCache = [];
                                callback(context, YAPI_INVALID_ARGUMENT, errmsg);
                                return YAPI_INVALID_ARGUMENT;
                            }
                        }
                        doit();
                    }
                });            
                incomingMessage.on('data',function(chunk) {
                    YAPI._callbackCache += chunk.toString(YAPI.defaultEncoding);
                });
            }
        } else {
            doit();
        }

        return YAPI_SUCCESS;
    }


    /**
     * Fault-tolerant alternative to RegisterHub(). This function has the same
     * purpose and same arguments as RegisterHub(), but does not trigger
     * an error when the selected hub is not available at the time of the function call.
     * This makes it possible to register a network hub independently of the current
     * connectivity, and to try to contact it only when a device is actively needed.
     * 
     * @param url : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg : a string passed by reference to receive any error message.
     * 
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_PreregisterHub(url, errmsg)
    {
        var urlInfo =  _parseRegisteredUrl(url);

        this._preregisterHub_internal(urlInfo);
        
        // If hub is not yet known, create a device object
        var serial = this._snByUrl[urlInfo.url];
        if(!serial) {
            // create device asynchronously, without callback
            new YDevice(rooturl, null, null, function(){});
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
    function YAPI_UnregisterHub(url)
    {
        var urlInfo =  _parseRegisteredUrl(url);
        var i,j;

        for(i = 0; i < this._hubs.length; i++) {
            if(this._hubs[i].urlInfo.url == urlInfo.url)  {
            	for (j =0 ; j< this._hubs[i].serialByYdx.length ; j++) {
            		var serial = this._hubs[i].serialByYdx[j];
	            	this.forgetDevice(this._devs[serial]);
            	}
                var before = this._hubs.slice(0,i);
                if(i+1 < this._hubs.length) {
                    var after = this._hubs.slice(i+1);
                    this._hubs = before.concat(after);
                }
                this._hubs = before;                    
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
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_UpdateDeviceList(errmsg)
    {
        var yreq = this._updateDeviceList_internal(false, true);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(errmsg!=undefined) errmsg.msg = yreq.errorMsg;
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
     *         context object, the result code (YAPI.SUCCESS
     *         if the operation completes successfully) and the error
     *         message.
     * @param context : caller-specific object that is passed as-is to the callback function
     * 
     * @return nothing : the result is provided to the callback.
     */
    function YAPI_UpdateDeviceList_async(callback, context)
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
        ctx.usercb  = callback;
        ctx.userctx = context;
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
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_HandleEvents(errmsg)
    {
        var nEvents = this._data_events.length;
        for(var i = 0; i < nEvents; i++) {
            var evt = this._data_events[i];
            if(typeof evt[1] == "string") {
                // event object is an advertised value
                evt[0]._invokeValueCallback(evt[1]);
            } else { 
                // event object is an array of bytes (encoded timed report)
                var dev = this.getDevice(evt[0]._serial);
                if(dev) {
                    var report = evt[0]._decodeTimedReport(evt[1], evt[2]);
                    evt[0]._invokeTimedReportCallback(report);
                }
            }
        }
        this._data_events = this._data_events.slice(nEvents);

        return YAPI_SUCCESS;
    }

    /**
     * Pauses the execution flow for a specified duration.
     * This function implements a passive waiting loop, meaning that it does not
     * consume CPU cycles significantly. The processor is left available for
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
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_Sleep(ms_duration, errmsg)
    {
        var end = this.GetTickCount() + ms_duration;
        do {
            this.HandleEvents(errmsg);
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
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAPI_SetTimeout(callback, ms_timeout, arguments)
    {
        var ctx = {
            usercb:   callback,
            userargs: arguments,
            endtime:  YAPI.GetTickCount()+ms_timeout,
            updevlist: true
        };
        this.HandleEvents();
        YAPI._forwardValues++;
        YAPI._setTimeout_internal(ctx);
        
        return YAPI_SUCCESS;
    }

    function YAPI_setTimeout_internal(ctx)
    {
        var nextcall = ctx.endtime - YAPI.GetTickCount();
        if(nextcall <= 0) {
            YAPI._forwardValues--;
            if(typeof ctx.usercb == "function") {
                ctx.usercb.apply(null, ctx.userargs);
            } else {
                eval(ctx.usercb);
            }
        } else if(ctx.updevlist) {
            ctx.updevlist = false;
            YAPI.UpdateDeviceList_async(YAPI._setTimeout_internal, ctx);
        } else {
            nextcall = ctx.endtime - YAPI.GetTickCount();
            if(nextcall > 100) nextcall = 100;
            ctx.updevlist=true;
            setTimeout(YAPI._setTimeout_internal, nextcall, ctx);
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
    function YAPI_CheckLogicalName(name)
    {
        if(name == "") return true;
        if(!name) return false;
        if(name.length > 19) return false;
        return /^[A-Za-z0-9_\-]*$/.test(name);
    }

    /**
     * Register a callback function, to be called each time
     * a device is plugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     * 
     * @param arrivalCallback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    function YAPI_RegisterDeviceArrivalCallback(arrivalCallback)
    {
        this._arrivalCallback = arrivalCallback;
    }

    function YAPI_RegisterDeviceChangeCallback(changeCallback)
    {
        this._namechgCallback = changeCallback;        
    }

    /**
     * Register a callback function, to be called each time
     * a device is unplugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     * 
     * @param removalCallback : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    function YAPI_RegisterDeviceRemovalCallback(removalCallback)
    {
        this._removalCallback = removalCallback;
    }

    // Register a new value calibration handler for a given calibration type
    //
    function YAPI_RegisterCalibrationHandler(calibrationType, calibrationHandler)
    {
        this._calibHandlers[calibrationType.toString()] = calibrationHandler;
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
    function _initshaw(str_s, int_pad, int_xinit, _shaw)
    {
        var i, j = -1, k = 0;
        var n = str_s.length;

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

    function _itershaw(s, _shaw)
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
    function YAPI_ComputePSK(ssid, pass)
    {
        var sha1_init = [ 0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0 ];
        var inner=[], outer=[], shau=[], res=[];
        var iter, pos, k, _shaw;
        
        // precompute part of sha used in the loops
        _shaw = new Array(80);
        _initshaw(pass, 0, 0x3636, _shaw);
        _itershaw(sha1_init, _shaw);
        for(k = 0; k < 5; k++) inner[k] = _shaw[k];
        _shaw = new Array(80);
        _initshaw(pass, 0, 0x5c5c, _shaw);
        _itershaw(sha1_init, _shaw);
        for(k = 0; k < 5; k++) outer[k] = _shaw[k];

        // prepare to compute first 20 bytes
        pos = 0;
        for(k = 0; k < 5; k++) shau[k] = 0;
        _shaw = new Array(80);
        _initshaw(ssid, 1, 0, _shaw);

        for(iter = 0; iter < 8192;) {
            _itershaw(inner, _shaw);
            _shaw[5] = 0x80000000;
            for (k = 6; k < 15; k++) {
                _shaw[k] = 0;
            }
            _shaw[15] = 8 * (64 + 20);
            _itershaw(outer, _shaw);
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
                    _shaw = new Array(80);
                    _initshaw(ssid, 2, 0, _shaw);
                }
            }
        }
        var hex = '';
        for(k = 0; k < 32; k++) {
            hex += ('0'+Number(res[k]).toString(16)).slice(-2);
        }
        return hex;
    }
    
    _YAPI.prototype._throw                     = YAPI_throw;
    _YAPI.prototype._funcDev_internal          = YAPI_funcDev_internal;
    _YAPI.prototype._funcDev_async             = YAPI_funcDev_async;
    _YAPI.prototype._funcDev                   = YAPI_funcDev;
    _YAPI.prototype._preregisterHub_internal   = YAPI_preregisterHub_internal;
    _YAPI.prototype._updateDeviceList_init     = YAPI_updateDeviceList_init;
    _YAPI.prototype._updateDeviceList_process  = YAPI_updateDeviceList_process;        
    _YAPI.prototype._updateDeviceList_internal = YAPI_updateDeviceList_internal;
    _YAPI.prototype._setTimeout_internal       = YAPI_setTimeout_internal;
    _YAPI.prototype._httpCallbackRequest       = YAPI_httpCallbackRequest;
    _YAPI.prototype._doubleToDecimal           = YAPI_doubleToDecimal;
    _YAPI.prototype._decimalToDouble           = YAPI_decimalToDouble;
    _YAPI.prototype._getCalibrationHandler     = YAPI_getCalibrationHandler;
    _YAPI.prototype._decodeWords               = YAPI_decodeWords;

        // Internal functions
    _YAPI.prototype.getDevice             = YAPI_getDevice;
    _YAPI.prototype.reindexDevice         = YAPI_reindexDevice;
    _YAPI.prototype.forgetDevice          = YAPI_forgetDevice;
    _YAPI.prototype.resolveFunction       = YAPI_resolveFunction;
    _YAPI.prototype.getFriendlyNameFunction = YAPI_getFriendlyNameFunction;
    _YAPI.prototype.functionClass         = YAPI_functionClass;
    _YAPI.prototype.setFunction           = YAPI_setFunction;
    _YAPI.prototype.getFunction           = YAPI_getFunction;
    _YAPI.prototype.setFunctionValue      = YAPI_setFunctionValue;
    _YAPI.prototype.getFunctionValue      = YAPI_getFunctionValue;
    _YAPI.prototype.setTimedReport        = YAPI_setTimedReport;
    _YAPI.prototype.addValueEvent         = YAPI_addValueEvent;
    _YAPI.prototype.addTimedReportEvent   = YAPI_addTimedReportEvent;
    _YAPI.prototype.getFirstHardwareId    = YAPI_getFirstHardwareId;
    _YAPI.prototype.getNextHardwareId     = YAPI_getNextHardwareId;
    _YAPI.prototype.devRequest            = YAPI_devRequest;
    _YAPI.prototype.devRequest_async      = YAPI_devRequest_async;
    _YAPI.prototype.funcRequest           = YAPI_funcRequest;
    _YAPI.prototype.funcRequest_async     = YAPI_funcRequest_async;        
    _YAPI.prototype.monitorEvents         = YAPI_monitorEvents;

    // Low-level function to query devices
    _YAPI.prototype.HTTPRequest           = YAPI_HTTPRequest;
    _YAPI.prototype.HTTPRequest_async     = YAPI_HTTPRequest_async;

//--- (generated code: YFunction return codes)
    _YAPI.prototype.SUCCESS               = 0;       // everything worked allright
    _YAPI.prototype.NOT_INITIALIZED       = -1;      // call yInitAPI() first !
    _YAPI.prototype.INVALID_ARGUMENT      = -2;      // one of the arguments passed to the function is invalid
    _YAPI.prototype.NOT_SUPPORTED         = -3;      // the operation attempted is (currently) not supported
    _YAPI.prototype.DEVICE_NOT_FOUND      = -4;      // the requested device is not reachable
    _YAPI.prototype.VERSION_MISMATCH      = -5;      // the device firmware is incompatible with this API version
    _YAPI.prototype.DEVICE_BUSY           = -6;      // the device is busy with another task and cannot answer
    _YAPI.prototype.TIMEOUT               = -7;      // the device took too long to provide an answer
    _YAPI.prototype.IO_ERROR              = -8;      // there was an I/O problem while talking to the device
    _YAPI.prototype.NO_MORE_DATA          = -9;      // there is no more data to read from
    _YAPI.prototype.EXHAUSTED             = -10;     // you have run out of a limited ressource, check the documentation
    _YAPI.prototype.DOUBLE_ACCES          = -11;     // you have two process that try to acces to the same device
    _YAPI.prototype.UNAUTHORIZED          = -12;     // unauthorized access to password-protected device
    _YAPI.prototype.RTC_NOT_READY         = -13;     // real-time clock has not been initialized (or time was lost)
//--- (end of generated code: YFunction return codes)

    _YAPI.prototype.INVALID_INT           = YAPI_INVALID_INT;
    _YAPI.prototype.INVALID_UINT          = YAPI_INVALID_UINT;
    _YAPI.prototype.INVALID_LONG          = YAPI_INVALID_LONG;
    _YAPI.prototype.INVALID_DOUBLE        = YAPI_INVALID_DOUBLE;
    _YAPI.prototype.INVALID_STRING        = YAPI_INVALID_STRING;
        
    // yInitAPI constants (not really useful in JavaScript)
    _YAPI.prototype.DETECT_NONE           = 0;
    _YAPI.prototype.DETECT_USB            = 1;
    _YAPI.prototype.DETECT_NET            = 2;
    _YAPI.prototype.DETECT_ALL            = (this.DETECT_USB | this.DETECT_NET);

    // High-level functions with a public function interface
    _YAPI.prototype.GetAPIVersion         = YAPI_GetAPIVersion;
    _YAPI.prototype.InitAPI               = YAPI_InitAPI;
    _YAPI.prototype.FreeAPI               = YAPI_FreeAPI;
    _YAPI.prototype.DisableExceptions     = YAPI_DisableExceptions;
    _YAPI.prototype.EnableExceptions      = YAPI_EnableExceptions;
    _YAPI.prototype.RegisterHub           = YAPI_RegisterHub;
    _YAPI.prototype.RegisterHub_async     = YAPI_RegisterHub_async;
    _YAPI.prototype.PreregisterHub        = YAPI_PreregisterHub;
    _YAPI.prototype.UnregisterHub         = YAPI_UnregisterHub;
    _YAPI.prototype.UpdateDeviceList      = YAPI_UpdateDeviceList;
    _YAPI.prototype.UpdateDeviceList_async= YAPI_UpdateDeviceList_async;
    _YAPI.prototype.HandleEvents          = YAPI_HandleEvents;
    _YAPI.prototype.Sleep                 = YAPI_Sleep;
    _YAPI.prototype.SetTimeout            = YAPI_SetTimeout;
    _YAPI.prototype.GetTickCount          = YAPI_GetTickCount;
    _YAPI.prototype.CheckLogicalName      = YAPI_CheckLogicalName;
    _YAPI.prototype.RegisterDeviceArrivalCallback = YAPI_RegisterDeviceArrivalCallback;
    _YAPI.prototype.RegisterDeviceChangeCallback  = YAPI_RegisterDeviceChangeCallback;
    _YAPI.prototype.RegisterDeviceRemovalCallback = YAPI_RegisterDeviceRemovalCallback;
    _YAPI.prototype.RegisterCalibrationHandler    = YAPI_RegisterCalibrationHandler;
    _YAPI.prototype.LinearCalibrationHandler      = YAPI_LinearCalibrationHandler;
    _YAPI.prototype.ComputePSK                    = YAPI_ComputePSK;

    YAPI = new _YAPI();
    yAPI = YAPI;

    //--- (generated code: YFunction class start)
/**
 * YFunction Class: Common function interface
 * 
 * This is the parent class for all public objects representing device functions documented in
 * the high-level programming API. This abstract class does all the real job, but without
 * knowledge of the specific function attributes.
 * 
 * Instantiating a child class of YFunction does not cause any communication.
 * The instance simply keeps track of its function identifier, and will dynamically bind
 * to a matching device at the time it is really being used to read or set an attribute.
 * In order to allow true hot-plug replacement of one device by another, the binding stay
 * dynamic through the life of the object.
 * 
 * The YFunction class implements a generic high-level cache for the attribute values of
 * the specified function, pre-parsed from the REST API string.
 */
//--- (end of generated code: YFunction class start)

    function _YFunction(str_func)
    {
        // private
        this._className                      = 'Function';
        this._func                           = str_func;
        this._lastErrorType                  = YAPI_SUCCESS;
        this._lastErrorMsg                   = "no error";
        this._dataStreams                    = {};
        this._userData                       = null;
        this._cache                          = {_expiration:0};
        //--- (generated code: YFunction constructor)
        this._logicalName                    = Y_LOGICALNAME_INVALID;      // Text
        this._advertisedValue                = Y_ADVERTISEDVALUE_INVALID;  // PubText
        this._valueCallbackFunction          = null;                       // YFunctionValueCallback
        this._cacheExpiration                = 0;                          // ulong
        this._serial                         = "";                         // str
        this._funId                          = "";                         // str
        this._hwId                           = "";                         // str
        //--- (end of generated code: YFunction constructor)
    }
    
    //--- (generated code: YFunction implementation)

    function YFunction_parseAttr(name, val, _super)
    {
        switch(name) {
        case "_expiration":
            this._cacheExpiration = val;
            return 1;
        case "logicalName":
            this._logicalName = val;
            return 1;
        case "advertisedValue":
            this._advertisedValue = val;
            return 1;
        }
        return 0;
    }

    /**
     * Returns the logical name of the function.
     * 
     * @return a string corresponding to the logical name of the function
     * 
     * On failure, throws an exception or returns YFunction.LOGICALNAME_INVALID.
     */
    function YFunction_get_logicalName()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LOGICALNAME_INVALID;
            }
        }
        return this._logicalName;
    }

    /**
     * Gets the logical name of the function.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YFunction object that invoked the callback
     *         - the result:a string corresponding to the logical name of the function
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YFunction_get_logicalName_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LOGICALNAME_INVALID);
            } else {
                callback(context, obj, obj._logicalName);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the logical name of the function. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the function
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YFunction_set_logicalName(newval)
    {   var rest_val;
        if (!YAPI.CheckLogicalName(newval)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"Invalid name :" + newval, YAPI_INVALID_ARGUMENT);
        }
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the function (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the function (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YFunction.ADVERTISEDVALUE_INVALID.
     */
    function YFunction_get_advertisedValue()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ADVERTISEDVALUE_INVALID;
            }
        }
        return this._advertisedValue;
    }

    /**
     * Gets the current value of the function (no more than 6 characters).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YFunction object that invoked the callback
     *         - the result:a string corresponding to the current value of the function (no more than 6 characters)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YFunction_get_advertisedValue_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ADVERTISEDVALUE_INVALID);
            } else {
                callback(context, obj, obj._advertisedValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a function for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFunction.isOnline() to test if the function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the function
     * 
     * @return a YFunction object allowing you to drive the function.
     */
    function YFunction_FindFunction(func)                       // class method
    {
        var obj;                    // YFunction;
        obj = YFunction._FindFromCache("Function", func);
        if (obj == null) {
            obj = new YFunction(func);
            YFunction._AddToCache("Function", func, obj);
        }
        return obj;
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
    function YFunction_registerValueCallback(callback)
    {
        var val;                    // str;
        if (callback != null) {
            YFunction._UpdateValueCallbackList(this, true);
        } else {
            YFunction._UpdateValueCallbackList(this, false);
        }
        this._valueCallbackFunction = callback;
        // Immediately invoke value callback with current value
        if (callback != null && this.isOnline()) {
            val = this._advertisedValue;
            if (!(val == "")) {
                this._invokeValueCallback(val);
            }
        }
        return 0;
    }

    function YFunction_invokeValueCallback(value)
    {
        if (this._valueCallbackFunction != null) {
            this._valueCallbackFunction(this, value);
        } else {
        }
        return 0;
    }

    function YFunction_parserHelper()
    {
        return 0;
    }

    /**
     * comment from .yc definition
     */
    function YFunction_nextFunction()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YFunction.FindFunction(next_hwid);
    }

    /**
     * comment from .yc definition
     */
    function YFunction_FirstFunction()
    {
        var next_hwid = YAPI.getFirstHardwareId('Function');
        if(next_hwid == null) return null;
        return YFunction.FindFunction(next_hwid);
    }

    //--- (end of generated code: YFunction implementation)

    function YFunction_FindFromCache(className, func)           // class method
    {
        return YAPI.getFunction(className, func);
    }

    function YFunction_AddToCache(className, func, obj)         // class method
    {
        YAPI.setFunction(className, func, obj);
    }

    function YFunction_ClearCache()                             // class method
    {
        YAPI._init();
    }

    function YFunction_Subclass(func,cnst,meta,inst)            // class method
    {
        // This is a class method, so 'this' points to the class
        var k;
        
        // Copy class attributes and methods
        for(k in this) {
            func[k] = this[k];
        }
        // Copy prototype methods
        for(k in this.prototype) {
            func.prototype[k] = this.prototype[k];
        }
        // Keep a pointer to the parent class
        func.prototype._super = this.prototype;
        // Add constants to the class and to the prototype
        for(k in cnst) {
            func.prototype[k] = func[k] = cnst[k];
        }
        // Assign class methods
        for(k in meta) {
            func[k] = meta[k];
        }
        // Assign methods to the prototype
        for(k in inst) {
            func.prototype[k] = inst[k];
        }
        return func;
    }
    
    function YFunction_UpdateValueCallbackList(obj_func, bool_add) // class method
    {
        var index = YFunction._ValueCallbackList.indexOf(obj_func);
        if (bool_add) {
            obj_func.isOnline();
            if(index < 0) {
                YFunction._ValueCallbackList.push(obj_func);
            }
        } else if(index >= 0) {
            YFunction._ValueCallbackList.splice(index, 1);
        }
    }
    
    function YFunction_UpdateTimedReportCallbackList(obj_func, bool_add) // class method
    {
        var index = YFunction._TimedReportCallbackList.indexOf(obj_func);
        if (bool_add) {
            obj_func.isOnline();
            if(index < 0) {
                YFunction._TimedReportCallbackList.push(obj_func);
            }
        } else if(index >= 0) {
            YFunction._TimedReportCallbackList.splice(index, 1);
        }
    }

    /**
     * Returns a short text that describes unambiguously the instance of the function in the form
     * TYPE(NAME)=SERIAL&#46;FUNCTIONID.
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
        if(this._hwId != "") {
            return this._className+"("+this._func+")="+this._hwId;
        }
        var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS && resolve.result != this._func) {
            return this._className+"("+this._func+")=unresolved";
        }
        return this._className+"("+this._func+")="+resolve.result;
    }

    /**
     * Returns the unique hardware identifier of the function in the form SERIAL.FUNCTIONID.
     * The unique hardware identifier is composed of the device serial
     * number and of the hardware identifier of the function (for example RELAYLO1-123456.relay1).
     * 
     * @return a string that uniquely identifies the function (ex: RELAYLO1-123456.relay1)
     * 
     * On failure, throws an exception or returns  YFunction.HARDWAREID_INVALID.
     */
    function YFunction_get_hardwareId()
    {
        if(this._hwId != "") {
            return this._hwId;
        }
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
     * On failure, throws an exception or returns  YFunction.FUNCTIONID_INVALID.
     */
    function YFunction_get_functionId()
    {
        if(this._funId != "") {
            return this._funId;
        }
        var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            this.isOnline();
            resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, Y_FUNCTIONID_INVALID);
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
     * On failure, throws an exception or returns  YFunction.FRIENDLYNAME_INVALID.
     */
    function YFunction_get_friendlyName()
    {
        var resolve = YAPI.getFriendlyNameFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) {
            this.isOnline();
            resolve = YAPI.getFriendlyNameFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) {
                return this._throw(resolve.errorType, resolve.errorMsg, Y_FRIENDLYNAME_INVALID);
            }
        }
        return resolve.result;
    }


    // Store and parse a an API request for current function
    //
    function YFunction_parse(yreq, msValidity)
    {
        // save the whole structure for backward-compatibility
        yreq.result["_expiration"] = YAPI.GetTickCount() + msValidity;
        this._serial = yreq.deviceid;
        this._funId  = yreq.functionid;
        this._hwId   = yreq.hwid;
        this._cache  = yreq.result;
        // process each attribute in turn for class-oriented processing
        for(var key in yreq.result) {
            this._parseAttr(key, yreq.result[key], this._super);
        }
        this._parserHelper();
    }

    // Helper for the VirtualHub (backward-compatible)
    function YFunction_g(str_attr)
    {
        this._parseAttr(str_attr,this._getAttr(str_attr),this._super);
        return this['_'+str_attr];
    }
    
    // Return the value of an attribute from function cache, after reloading it from device if needed
    // Note: the function cache is a typed (parsed) cache, contrarily to the agnostic device cache
    function YFunction_getAttr(str_attr)
    {
        if(this._cacheExpiration <= YAPI.GetTickCount()) {
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
        if(this._cacheExpiration == 0) {
            // no cached value, load from device
            if(this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) return null;
        }
        if(typeof this._cache[str_attr] == "undefined") {
            this._throw(YAPI_VERSION_MISMATCH, "No such attribute "+str_attr+" in function", null);
        }
        return this._cache[str_attr];
    }

    // Return the value of an attribute from function cache, after reloading it from device if needed.
    // 
    // This is the asynchronous version, that uses a callback instead of a return value.
    function YFunction_getAttr_async(str_attr, func_callback, obj_context)
    {
        if(this._cacheExpiration <= YAPI.GetTickCount()) {
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
        if(this._cacheExpiration != 0) {
            this._cacheExpiration = YAPI.GetTickCount();
            this._cache._expiration = this._cacheExpiration;
        }
        YAPI.funcRequest_async(this._className, this._func, extra, null);

        return YAPI_SUCCESS;
    }

    // Execute an arbitrary HTTP GET request on the device and return the binary content
    //
    function YFunction_download(str_path)
    {
        // get the device serial number
        var devid = this._serial;
        if(devid == "") {
            devid = this.module().get_serialNumber();
        }
        if(devid == Y_SERIALNUMBER_INVALID) {
            return '';
        }
        var yreq = YAPI.devRequest(devid, "GET /"+str_path);
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, '');
        }
        return yreq.result;
    }

    // Execute an arbitrary HTTP GET request on the device and return the binary content
    // 
    // This asynchronous version exists only in Javascript. It uses a callback instead
    // of a return value in order to avoid blocking Firefox javascript VM that does not
    // implement context switching during blocking I/O calls. See the documentation
    // section on asynchronous Javascript calls for more details.
    // 
    // @param msValidity : an integer corresponding to the validity of the loaded
    //         function parameters, in milliseconds
    // @param callback : callback function that is invoked when the result is known.
    //         The callback function  receives three arguments: the caller-specific
    //         context object, the receiving function object and the error code
    //         (or YAPI.SUCCESS)
    // @param context : caller-specific object that is passed as-is to the callback function
    // 
    // @return nothing : the result is provided to the callback.
    //
    function YFunction_download_async(str_path, func_callback, obj_context)
    {
        // get the device serial number
        var devid = this._serial;
        if(devid == "") {
            devid = this.module().get_serialNumber();
        }
        if(devid == Y_SERIALNUMBER_INVALID) {
            if(params.cb) params.cb(params.ctx, params.obj, null);
        } else {
            YAPI.devRequest_async(devid, "GET /"+str_path, "",
                                  function(params, yreq) {
                                      if(yreq.errorType != YAPI_SUCCESS) {
                                          params.obj._throw(yreq.errorType, yreq.errorMsg, null);
                                          if(params.cb) params.cb(params.ctx, params.obj, null);
                                          return;
                                      }
                                      if(params.cb) params.cb(params.ctx, params.obj, yreq.result);
                                  },
                                  {obj:this, cb:func_callback, ctx:obj_context});
        }
    }

    // Upload a file to the filesystem, to the specified full path name.
    // If a file already exists with the same path name, its content is overwritten.
    //
    function YFunction_upload_async(str_path, bin_content, func_callback, obj_context)
    {
        // get the device serial number
        var devid = this._serial;
        if(devid == "") {
            devid = this.module().get_serialNumber();
        }
        if(devid == Y_SERIALNUMBER_INVALID) {
            return this.get_errorType();
        }
        var httpreq = 'POST /upload.html';
        var len = bin_content.length;
        // FOR NODE.JS ONLY: don't use FormData but Buffer object
        var hdr = new Buffer('Content-Disposition: form-data; name="'+str_path+'"; filename="api"\r\n'+
                             'Content-Type: application/octet-stream\r\n'+
                             'Content-Transfer-Encoding: binary\r\n\r\n', 'ascii');
        if(typeof bin_content == 'string' || bin_content instanceof String || Array.isArray(bin_content)) {
            if(typeof bin_content == 'string' || bin_content instanceof String) {
                var u8 = new Buffer(len);
                for (var i = 0; i < len; i++) {
                    u8[i] = bin_content.charCodeAt(i);
                }
                bin_content = u8;
            } else {
                bin_content = new Buffer(bin_content);
            }
        }
        // until node.js will includse Buffer.indexOf, don't check for boundary 
        // within body buffer (anyway very unlikely)
        var boundary = new Buffer("Zz"+Math.floor(Math.random() * 0xffffff).toString(16)+"zZ", 'ascii');
        var dash = new Buffer("--", 'ascii');
        var crlf = new Buffer("\r\n", 'ascii');
        var parts = [dash, boundary, crlf, hdr, bin_content, crlf, dash, boundary, dash, crlf];
        var body = Buffer.concat(parts);
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
    // This version is actually asynchronous, since this is the default behaviour
    // like for all set_* functions
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
    function YFunction_wait_async(callback, context)
    {
        // get the device serial number
        var devid = this._serial;
        if(devid == "") {
            devid = this.module().get_serialNumber();
        }
        if(devid == Y_SERIALNUMBER_INVALID) {
            callback(context, this);
            return YAPI_SUCCESS;        
        }
        var lockdev = YAPI.getDevice(devid);
        if(lockdev == null || (lockdev._busy == 0 && lockdev._pendingQueries.length == 0)) {
            // no pending callback
            callback(context, this);
        } else {
            lockdev._pendingQueries.push({cb:callback,obj:this,ctx:context});
        }
        return YAPI_SUCCESS;        
    }
            
    // Get a value from a JSON buffer
    //
    function YFunction_json_get_key(bin_jsonbuff, str_key)
    {
        var loadval = JSON.parse(bin_jsonbuff);
        if(typeof loadval[str_key] != "undefined") {
            return loadval[str_key];
        }
        return "";
    }
    
    // Get a string from a JSON buffer
    //
    function YFunction_json_get_string(bin_jsonbuff)
    {
        return JSON.parse(bin_jsonbuff);
    }
    
    // Get an array of strings from a JSON buffer
    //
    function YFunction_json_get_array(bin_jsonbuff)
    {
        var loadval = JSON.parse(bin_jsonbuff, true);
        var res = new Array();
        for(var idx in loadval) {
            res.push(JSON.stringify(loadval[idx]));
        }
        return res;
    }
    
    // Method used to cache DataStream objects (new DataLogger)
    //
    function YFunction_findDataStream(obj_dataset, str_def)
    {
        var key = obj_dataset.get_functionId()+":"+str_def;
        if(this._dataStreams[key])
            return this._dataStreams[key];

        var newDataStream = new YDataStream(this, obj_dataset, YAPI._decodeWords(str_def));
        this._dataStreams[key] = newDataStream;
        return newDataStream;
    }
    
    /**
     * Checks if the function is currently reachable, without raising any error.
     * If there is a cached value for the function in cache, that has not yet
     * expired, the device is considered reachable.
     * No exception is raised if there is an error while trying to contact the
     * device hosting the function.
     * 
     * @return true if the function can be reached, and false otherwise
     */
    function YFunction_isOnline()
    {
        // A valid value in cache means that the device is online
        if(this._cacheExpiration > YAPI.GetTickCount()) return true;

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
        this._parse(yreq, YAPI.defaultCacheValidity);

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
     * of a return value in order to avoid blocking the Javascript virtual machine.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments: the caller-specific
     *         context object, the receiving function object and the boolean result
     * @param context : caller-specific object that is passed as-is to the callback function
     * 
     * @return nothing : the result is provided to the callback.
     */
    function YFunction_isOnline_async(callback, context)
    {
        // A valid value in cache means that the device is online
        if(this._cacheExpiration > YAPI.GetTickCount()) {
            callback(context, this, true);
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
                                   params.obj._parse(yreq, YAPI.defaultCacheValidity);
                                   params.cb(params.ctx, params.obj, true);
                               },
                               {obj:this, cb:callback, ctx:context});
    }

    /**
     * Returns the numerical error code of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     * 
     * @return a number corresponding to the code of the latest error that occured while
     *         using the function object
     */
    function YFunction_get_errorType()
    {
        return this._lastErrorType;
    }

    /**
     * Returns the error message of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     * 
     * @return a string corresponding to the latest error message that occured while
     *         using the function object
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
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YFunction_load(msValidity)
    {
        var yreq = YAPI.funcRequest(this._className, this._func, "");
        if(yreq.errorType != YAPI_SUCCESS) {
            return this._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
        }
        this._parse(yreq, msValidity);

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
     * of a return value in order to avoid blocking the Javascript virtual machine.
     * 
     * @param msValidity : an integer corresponding to the validity of the loaded
     *         function parameters, in milliseconds
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function  receives three arguments: the caller-specific
     *         context object, the receiving function object and the error code
     *         (or YAPI.SUCCESS)
     * @param context : caller-specific object that is passed as-is to the callback function
     * 
     * @return nothing : the result is provided to the callback.
     */
    function YFunction_load_async(msValidity, callback, context)
    {
        YAPI.funcRequest_async(this._className, this._func, "",
                               function(params, yreq) {
                                   if(yreq.errorType != YAPI_SUCCESS) {
                                       params.obj._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
                                       params.cb(params.ctx, params.obj, yreq.errorType);
                                       return;
                                   }
                                   params.obj._parse(yreq, msValidity);
                                   params.cb(params.ctx, params.obj, YAPI_SUCCESS);
                               },
                               {obj:this, cb:callback, ctx:context});
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
        if(this._serial != "") {
            return yFindModule(this._serial + ".module");            
        }
        var hwid = this._func;
        var resolve;
        if(hwid.indexOf(".") < 0) {
            resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType == YAPI_SUCCESS) hwid = resolve.result;
        }
        var dotidx = hwid.indexOf(".");
        if(dotidx >= 0) {
            // resolution worked
            return yFindModule(hwid.substr(0, dotidx) + ".module");
        }

        // device not resolved for now, force a communication for a last chance resolution
        if(this.load(YAPI.defaultCacheValidity) == YAPI_SUCCESS) {
            resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.result != undefined) hwid = resolve.result;
        }
        dotidx = hwid.indexOf(".");
        if(dotidx >= 0) {
            // resolution worked
            return yFindModule(hwid.substr(0, dotidx) + ".module");
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
    function YFunction_get_module_async(callback, context)
    {
        // try to resolve the function name to a device id without query
        if(this._serial != "") {
            callback(context, this, yFindModule(this._serial + ".module"));
            return;
        }
        var hwid = this._func;
        if(hwid.indexOf(".") < 0) {
            var resolve = YAPI.resolveFunction(this._className, this._func);
            if(resolve.errorType != YAPI_SUCCESS) hwid = resolve.result;
        }
        var dotidx = hwid.indexOf(".");
        if(dotidx >= 0) {
            // resolution worked
            callback(context, this,  yFindModule(hwid.substr(0, dotidx) + ".module"));
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
                                params.cb(params.ctx, obj, yFindModule(hwid.substr(0, dotidx) + ".module"));
                            } else {
                                // return a true yFindModule object even if it is not a module valid for communicating
                                params.cb(params.ctx, obj, yFindModule("module_of_"+this.className+"_"+this._func));
                            }
                        },
                        {cb:callback, ctx:context});
    }


    /**
     * Returns a unique identifier of type YFUN_DESCR corresponding to the function.
     * This identifier can be used to test if two instances of YFunction reference the same
     * physical function on the same physical device.
     * 
     * @return an identifier of type YFUN_DESCR.
     * 
     * If the function has never been contacted, the returned value is YFunction.FUNCTIONDESCRIPTOR_INVALID.
     */
    function YFunction_get_functionDescriptor()
    {
        // try to resolve the function name to a device id without query
        if(this._hwId != "") {
            return this._hwId;
        }
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
    function YFunction_set_userData(data)
    {
        this._userData = data;
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
    function YFunction_registerValueCallback_async(callback)
    {
        this._valueCallbackFunction = callback;
        if(callback != undefined) {
            this.isOnline_async(function(obj_ctx, obj_func, result) {
                if(result) {
                    var newval = obj_func.get_advertisedValue();
                    if(newval != "" && newval != "!INVALID!") {
                        callback(obj_func, newval);
                    }
                }
            }, null);
        }
    }

    //--- (generated code: YFunction initialization)
    YFunction = _YFunction;
    // Constants
    YFunction.FUNCTIONDESCRIPTOR_INVALID            = YAPI_INVALID_STRING;
    YFunction.prototype.FUNCTIONDESCRIPTOR_INVALID  = YAPI_INVALID_STRING;
    YFunction.HARDWAREID_INVALID                    = YAPI_INVALID_STRING;
    YFunction.prototype.HARDWAREID_INVALID          = YAPI_INVALID_STRING;
    YFunction.FUNCTIONID_INVALID                    = YAPI_INVALID_STRING;
    YFunction.prototype.FUNCTIONID_INVALID          = YAPI_INVALID_STRING;
    YFunction.FRIENDLYNAME_INVALID                  = YAPI_INVALID_STRING;
    YFunction.prototype.FRIENDLYNAME_INVALID        = YAPI_INVALID_STRING;
    YFunction.LOGICALNAME_INVALID                   = YAPI_INVALID_STRING;
    YFunction.prototype.LOGICALNAME_INVALID         = YAPI_INVALID_STRING;
    YFunction.ADVERTISEDVALUE_INVALID               = YAPI_INVALID_STRING;
    YFunction.prototype.ADVERTISEDVALUE_INVALID     = YAPI_INVALID_STRING;
    // Class methods
    YFunction.FindFunction                          = YFunction_FindFunction;
    YFunction.FirstFunction                         = YFunction_FirstFunction;
    // Methods
    YFunction.prototype.get_logicalName             = YFunction_get_logicalName;
    YFunction.prototype.logicalName                 = YFunction_get_logicalName;
    YFunction.prototype.get_logicalName_async       = YFunction_get_logicalName_async;
    YFunction.prototype.logicalName_async           = YFunction_get_logicalName_async;
    YFunction.prototype.set_logicalName             = YFunction_set_logicalName;
    YFunction.prototype.setLogicalName              = YFunction_set_logicalName;
    YFunction.prototype.get_advertisedValue         = YFunction_get_advertisedValue;
    YFunction.prototype.advertisedValue             = YFunction_get_advertisedValue;
    YFunction.prototype.get_advertisedValue_async   = YFunction_get_advertisedValue_async;
    YFunction.prototype.advertisedValue_async       = YFunction_get_advertisedValue_async;
    YFunction.prototype.registerValueCallback       = YFunction_registerValueCallback;
    YFunction.prototype._invokeValueCallback        = YFunction_invokeValueCallback;
    YFunction.prototype._parserHelper               = YFunction_parserHelper;
    YFunction.prototype.nextFunction                = YFunction_nextFunction;
    YFunction.prototype._parseAttr                  = YFunction_parseAttr;
    //--- (end of generated code: YFunction initialization)
    YFunction._FindFromCache                        = YFunction_FindFromCache;
    YFunction._AddToCache                           = YFunction_AddToCache;
    YFunction._ClearCache                           = YFunction_ClearCache;
    YFunction._Subclass                             = YFunction_Subclass;
    YFunction._UpdateValueCallbackList              = YFunction_UpdateValueCallbackList;
    YFunction._UpdateTimedReportCallbackList        = YFunction_UpdateTimedReportCallbackList;
    YFunction._ValueCallbackList                    = [];
    YFunction._TimedReportCallbackList              = [];
    YFunction.prototype._throw                      = YAPI_throw;
    YFunction.prototype._parse                      = YFunction_parse;
    YFunction.prototype._getAttr                    = YFunction_getAttr;
    YFunction.prototype._g                          = YFunction_g;
    YFunction.prototype._getFixedAttr               = YFunction_getFixedAttr;
    YFunction.prototype._getAttr_async              = YFunction_getAttr_async;
    YFunction.prototype._setAttr                    = YFunction_setAttr;
    YFunction.prototype._download                   = YFunction_download;
    YFunction.prototype._download_async             = YFunction_download_async;
    YFunction.prototype._upload                     = YFunction_upload;
    YFunction.prototype._upload_async               = YFunction_upload_async;
    YFunction.prototype._json_get_key               = YFunction_json_get_key;
    YFunction.prototype._json_get_string            = YFunction_json_get_string;
    YFunction.prototype._json_get_array             = YFunction_json_get_array;
    YFunction.prototype._findDataStream             = YFunction_findDataStream;
    YFunction.prototype.describe                    = YFunction_describe;
    YFunction.prototype.isOnline                    = YFunction_isOnline;
    YFunction.prototype.isOnline_async              = YFunction_isOnline_async;
    YFunction.prototype.get_errorType               = YFunction_get_errorType;
    YFunction.prototype.errorType                   = YFunction_get_errorType;
    YFunction.prototype.errType                     = YFunction_get_errorType;
    YFunction.prototype.get_errorMessage            = YFunction_get_errorMessage;
    YFunction.prototype.errorMessage                = YFunction_get_errorMessage;
    YFunction.prototype.errMessage                  = YFunction_get_errorMessage;
    YFunction.prototype.load                        = YFunction_load;
    YFunction.prototype.load_async                  = YFunction_load_async;
    YFunction.prototype.get_module                  = YFunction_get_module;
    YFunction.prototype.module                      = YFunction_get_module;
    YFunction.prototype.get_module_async            = YFunction_get_module_async;
    YFunction.prototype.module_async                = YFunction_get_module_async;
    YFunction.prototype.get_functionDescriptor      = YFunction_get_functionDescriptor;
    YFunction.prototype.functionDescriptor          = YFunction_get_functionDescriptor;
    YFunction.prototype.get_userData                = YFunction_get_userData;
    YFunction.prototype.userData                    = YFunction_get_userData;
    YFunction.prototype.set_userData                = YFunction_set_userData;
    YFunction.prototype.setUserData                 = YFunction_set_userData;
    YFunction.prototype.registerValueCallback_async = YFunction_registerValueCallback_async;
    YFunction.prototype.set_callback                = YFunction_registerValueCallback;
    YFunction.prototype.set_callback_async          = YFunction_registerValueCallback_async;
    YFunction.prototype.setCallback                 = YFunction_registerValueCallback;
    YFunction.prototype.setCallback_async           = YFunction_registerValueCallback_async;
    YFunction.prototype.get_hardwareId              = YFunction_get_hardwareId;
    YFunction.prototype.get_functionId              = YFunction_get_functionId;
    YFunction.prototype.get_friendlyName            = YFunction_get_friendlyName;
    YFunction.prototype.wait_async                  = YFunction_wait_async;

//--- (generated code: YMeasure class start)
/**
 * YMeasure Class: Measured value
 * 
 * YMeasure objects are used within the API to represent
 * a value measured at a specified time. These objects are
 * used in particular in conjunction with the YDataSet class.
 */
//--- (end of generated code: YMeasure class start)

    function _YMeasure(float_start, float_end, float_minVal, float_avgVal, float_maxVal)
    {
        //--- (generated code: YMeasure constructor)
        this._start                          = 0;                          // float
        this._end                            = 0;                          // float
        this._minVal                         = 0;                          // float
        this._avgVal                         = 0;                          // float
        this._maxVal                         = 0;                          // float
        //--- (end of generated code: YMeasure constructor)
        this._start                          = float_start;
        this._end                            = float_end;
        this._minVal                         = float_minVal;
        this._avgVal                         = float_avgVal;
        this._maxVal                         = float_maxVal;
    }
    //--- (generated code: YMeasure implementation)

    /**
     * Returns the start time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher then 1 sample
     * per second, the timestamp may have a fractional part.
     * 
     * @return an floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the beginning of this measure.
     */
    function YMeasure_get_startTimeUTC()
    {
        return this._start;
    }

    /**
     * Returns the end time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher than 1 sample
     * per second, the timestamp may have a fractional part.
     * 
     * @return an floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the end of this measure.
     */
    function YMeasure_get_endTimeUTC()
    {
        return this._end;
    }

    /**
     * Returns the smallest value observed during the time interval
     * covered by this measure.
     * 
     * @return a floating-point number corresponding to the smallest value observed.
     */
    function YMeasure_get_minValue()
    {
        return this._minVal;
    }

    /**
     * Returns the average value observed during the time interval
     * covered by this measure.
     * 
     * @return a floating-point number corresponding to the average value observed.
     */
    function YMeasure_get_averageValue()
    {
        return this._avgVal;
    }

    /**
     * Returns the largest value observed during the time interval
     * covered by this measure.
     * 
     * @return a floating-point number corresponding to the largest value observed.
     */
    function YMeasure_get_maxValue()
    {
        return this._maxVal;
    }

    //--- (end of generated code: YMeasure implementation)

    /**
     * Returns the start date of the measure.
     * 
     * @return a Date object corresponding to the beginning of this measure
     */
    function YMeasure_get_startTimeUTC_asDate()
    {
        return new Date(Math.round(this._start * 1000));
    }

    /**
     * Returns the start date of the measure.
     * 
     * @return a Date object corresponding to the end of this measure
     */
    function YMeasure_get_endTimeUTC_asDate()
    {
        return new Date(Math.round(this._end * 1000));
    }

    //--- (generated code: YMeasure initialization)
    YMeasure = _YMeasure;
    // Methods
    YMeasure.prototype.get_startTimeUTC            = YMeasure_get_startTimeUTC;
    YMeasure.prototype.startTimeUTC                = YMeasure_get_startTimeUTC;
    YMeasure.prototype.get_endTimeUTC              = YMeasure_get_endTimeUTC;
    YMeasure.prototype.endTimeUTC                  = YMeasure_get_endTimeUTC;
    YMeasure.prototype.get_minValue                = YMeasure_get_minValue;
    YMeasure.prototype.minValue                    = YMeasure_get_minValue;
    YMeasure.prototype.get_averageValue            = YMeasure_get_averageValue;
    YMeasure.prototype.averageValue                = YMeasure_get_averageValue;
    YMeasure.prototype.get_maxValue                = YMeasure_get_maxValue;
    YMeasure.prototype.maxValue                    = YMeasure_get_maxValue;
    //--- (end of generated code: YMeasure initialization)
    YMeasure.prototype.get_startTimeUTC_asDate     = YMeasure_get_startTimeUTC_asDate;
    YMeasure.prototype.startTimeUTC_asDate         = YMeasure_get_startTimeUTC_asDate;
    YMeasure.prototype.get_endTimeUTC_asDate       = YMeasure_get_endTimeUTC_asDate;    
    YMeasure.prototype.endTimeUTC_asDate           = YMeasure_get_endTimeUTC_asDate;

//--- (generated code: YDataStream class start)
/**
 * YDataStream Class: Unformatted data sequence
 * 
 * YDataStream objects represent bare recorded measure sequences,
 * exactly as found within the data logger present on Yoctopuce
 * sensors.
 * 
 * In most cases, it is not necessary to use YDataStream objects
 * directly, as the YDataSet objects (returned by the
 * get_recordedData() method from sensors and the
 * get_dataSets() method from the data logger) provide
 * a more convenient interface.
 */
//--- (end of generated code: YDataStream class start)
    

    function _YDataStream(obj_parent, obj_dataset, encoded)
    {
        //--- (generated code: YDataStream constructor)
        this._parent                         = null;                       // YFunction
        this._runNo                          = 0;                          // int
        this._utcStamp                       = 0;                          // u32
        this._nCols                          = 0;                          // int
        this._nRows                          = 0;                          // int
        this._duration                       = 0;                          // int
        this._columnNames                    = [];                         // strArr
        this._functionId                     = "";                         // str
        this._isClosed                       = 0;                          // bool
        this._isAvg                          = 0;                          // bool
        this._isScal                         = 0;                          // bool
        this._decimals                       = 0;                          // int
        this._offset                         = 0;                          // float
        this._scale                          = 0;                          // float
        this._samplesPerHour                 = 0;                          // int
        this._minVal                         = 0;                          // float
        this._avgVal                         = 0;                          // float
        this._maxVal                         = 0;                          // float
        this._decexp                         = 0;                          // float
        this._caltyp                         = 0;                          // int
        this._calpar                         = [];                         // intArr
        this._calraw                         = [];                         // floatArr
        this._calref                         = [];                         // floatArr
        this._values                         = [];                         // floatArrArr
        //--- (end of generated code: YDataStream constructor)
        
        this._parent = obj_parent;
        this._calhdl = null;
        if(typeof obj_dataset != "undefined") {
            this._initFromDataSet(obj_dataset, encoded);
        }
    }
    
    //--- (generated code: YDataStream implementation)

    function YDataStream_initFromDataSet(dataset,encoded)
    {
        var val;                    // int;
        var i;                      // int;
        var iRaw;                   // int;
        var iRef;                   // int;
        var fRaw;                   // float;
        var fRef;                   // float;
        var duration_float;         // float;
        var iCalib = [];            // intArr;
        
        // decode sequence header to extract data
        this._runNo = encoded[0] + (((encoded[1]) << (16)));
        this._utcStamp = encoded[2] + (((encoded[3]) << (16)));
        val = encoded[4];
        this._isAvg = (((val) & (0x100)) == 0);
        this._samplesPerHour = ((val) & (0xff));
        if (((val) & (0x100)) != 0) {
            this._samplesPerHour = this._samplesPerHour * 3600;
        } else {
            if (((val) & (0x200)) != 0) {
                this._samplesPerHour = this._samplesPerHour * 60;
            }
        }
        
        val = encoded[5];
        if (val > 32767) {
            val = val - 65536;
        }
        this._decimals = val;
        this._offset = val;
        this._scale = encoded[6];
        this._isScal = (this._scale != 0);
        
        val = encoded[7];
        this._isClosed = (val != 0xffff);
        if (val == 0xffff) {
            val = 0;
        }
        this._nRows = val;
        duration_float = this._nRows * 3600 / this._samplesPerHour;
        this._duration = Math.round(duration_float);
        // precompute decoding parameters
        this._decexp = 1.0;
        if (this._scale == 0) {
            i = 0;
            while (i < this._decimals) {
                this._decexp = this._decexp * 10.0;
                i = i + 1;
            }
        }
        iCalib = dataset.get_calibration();
        this._caltyp = iCalib[0];
        if (this._caltyp != 0) {
            this._calhdl = YAPI._getCalibrationHandler(this._caltyp);
            this._calpar.length = 0;
            this._calraw.length = 0;
            this._calref.length = 0;
            i = 1;
            while (i + 1 < iCalib.length) {
                iRaw = iCalib[i];
                iRef = iCalib[i + 1];
                this._calpar.push(iRaw);
                this._calpar.push(iRef);
                if (this._isScal) {
                    fRaw = iRaw;
                    fRaw = (fRaw - this._offset) / this._scale;
                    fRef = iRef;
                    fRef = (fRef - this._offset) / this._scale;
                    this._calraw.push(fRaw);
                    this._calref.push(fRef);
                } else {
                    this._calraw.push(YAPI._decimalToDouble(iRaw));
                    this._calref.push(YAPI._decimalToDouble(iRef));
                }
                i = i + 2;
            }
        }
        // preload column names for backward-compatibility
        this._functionId = dataset.get_functionId();
        if (this._isAvg) {
            this._columnNames.length = 0;
            this._columnNames.push(""+this._functionId+"_min");
            this._columnNames.push(""+this._functionId+"_avg");
            this._columnNames.push(""+this._functionId+"_max");
            this._nCols = 3;
        } else {
            this._columnNames.length = 0;
            this._columnNames.push(this._functionId);
            this._nCols = 1;
        }
        // decode min/avg/max values for the sequence
        if (this._nRows > 0) {
            this._minVal = this._decodeVal(encoded[8]);
            this._maxVal = this._decodeVal(encoded[9]);
            this._avgVal = this._decodeAvg(encoded[10] + (((encoded[11]) << (16))), this._nRows);
        }
        return 0;
    }

    function YDataStream_parse(sdata)
    {
        var idx;                    // int;
        var udat = [];              // intArr;
        var dat = [];               // floatArr;
        // may throw an exception
        udat = YAPI._decodeWords(this._parent._json_get_string(sdata));
        this._values.length = 0;
        idx = 0;
        if (this._isAvg) {
            while (idx + 3 < udat.length) {
                dat.length = 0;
                dat.push(this._decodeVal(udat[idx]));
                dat.push(this._decodeAvg(udat[idx + 2] + (((udat[idx + 3]) << (16))), 1));
                dat.push(this._decodeVal(udat[idx + 1]));
                this._values.push(dat.slice());
                idx = idx + 4;
            }
        } else {
            if (this._isScal) {
                while (idx < udat.length) {
                    dat.length = 0;
                    dat.push(this._decodeVal(udat[idx]));
                    this._values.push(dat.slice());
                    idx = idx + 1;
                }
            } else {
                while (idx + 1 < udat.length) {
                    dat.length = 0;
                    dat.push(this._decodeAvg(udat[idx] + (((udat[idx + 1]) << (16))), 1));
                    this._values.push(dat.slice());
                    idx = idx + 2;
                }
            }
        }
        
        this._nRows = this._values.length;
        return YAPI_SUCCESS;
    }

    function YDataStream_get_url()
    {
        var url;                    // str;
        url = "logger.json?id="+this._functionId+"&run="+String(Math.round(this._runNo))+"&utc="+String(Math.round(this._utcStamp));
        return url;
    }

    function YDataStream_loadStream()
    {
        return this.parse(this._parent._download(this.get_url()));
    }

    function YDataStream_decodeVal(w)
    {
        var val;                    // float;
        val = w;
        if (this._isScal) {
            val = (val - this._offset) / this._scale;
        } else {
            val = YAPI._decimalToDouble(w);
        }
        if (this._caltyp != 0) {
            val = this._calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
        }
        return val;
    }

    function YDataStream_decodeAvg(dw,count)
    {
        var val;                    // float;
        val = dw;
        if (this._isScal) {
            val = (val / (100 * count) - this._offset) / this._scale;
        } else {
            val = val / (count * this._decexp);
        }
        if (this._caltyp != 0) {
            val = this._calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
        }
        return val;
    }

    function YDataStream_isClosed()
    {
        return this._isClosed;
    }

    /**
     * Returns the run index of the data stream. A run can be made of
     * multiple datastreams, for different time intervals.
     * 
     * @return an unsigned number corresponding to the run index.
     */
    function YDataStream_get_runIndex()
    {
        return this._runNo;
    }

    /**
     * Returns the relative start time of the data stream, measured in seconds.
     * For recent firmwares, the value is relative to the present time,
     * which means the value is always negative.
     * If the device uses a firmware older than version 13000, value is
     * relative to the start of the time the device was powered on, and
     * is always positive.
     * If you need an absolute UTC timestamp, use get_startTimeUTC().
     * 
     * @return an unsigned number corresponding to the number of seconds
     *         between the start of the run and the beginning of this data
     *         stream.
     */
    function YDataStream_get_startTime()
    {
        return this._utcStamp - parseInt(+new Date()/1000);
    }

    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     * 
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    function YDataStream_get_startTimeUTC()
    {
        return this._utcStamp;
    }

    /**
     * Returns the number of milliseconds between two consecutive
     * rows of this data stream. By default, the data logger records one row
     * per second, but the recording frequency can be changed for
     * each device function
     * 
     * @return an unsigned number corresponding to a number of milliseconds.
     */
    function YDataStream_get_dataSamplesIntervalMs()
    {
        return parseInt((3600000) / (this._samplesPerHour));
    }

    function YDataStream_get_dataSamplesInterval()
    {
        return 3600.0 / this._samplesPerHour;
    }

    /**
     * Returns the number of data rows present in this stream.
     * 
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     * 
     * @return an unsigned number corresponding to the number of rows.
     * 
     * On failure, throws an exception or returns zero.
     */
    function YDataStream_get_rowCount()
    {
        if ((this._nRows != 0) && this._isClosed) {
            return this._nRows;
        }
        this.loadStream();
        return this._nRows;
    }

    /**
     * Returns the number of data columns present in this stream.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     * 
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     * 
     * @return an unsigned number corresponding to the number of columns.
     * 
     * On failure, throws an exception or returns zero.
     */
    function YDataStream_get_columnCount()
    {
        if (this._nCols != 0) {
            return this._nCols;
        }
        this.loadStream();
        return this._nCols;
    }

    /**
     * Returns the title (or meaning) of each data column present in this stream.
     * In most case, the title of the data column is the hardware identifier
     * of the sensor that produced the data. For streams recorded at a lower
     * recording rate, the dataLogger stores the min, average and max value
     * during each measure interval into three columns with suffixes _min,
     * _avg and _max respectively.
     * 
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     * 
     * @return a list containing as many strings as there are columns in the
     *         data stream.
     * 
     * On failure, throws an exception or returns an empty array.
     */
    function YDataStream_get_columnNames()
    {
        if (this._columnNames.length != 0) {
            return this._columnNames;
        }
        this.loadStream();
        return this._columnNames;
    }

    /**
     * Returns the smallest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     * 
     * @return a floating-point number corresponding to the smallest value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     * 
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    function YDataStream_get_minValue()
    {
        return this._minVal;
    }

    /**
     * Returns the average of all measures observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     * 
     * @return a floating-point number corresponding to the average value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     * 
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    function YDataStream_get_averageValue()
    {
        return this._avgVal;
    }

    /**
     * Returns the largest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     * 
     * @return a floating-point number corresponding to the largest value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     * 
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    function YDataStream_get_maxValue()
    {
        return this._maxVal;
    }

    /**
     * Returns the approximate duration of this stream, in seconds.
     * 
     * @return the number of seconds covered by this stream.
     * 
     * On failure, throws an exception or returns YDataStream.DURATION_INVALID.
     */
    function YDataStream_get_duration()
    {
        if (this._isClosed) {
            return this._duration;
        }
        return parseInt(+new Date()/1000) - this._utcStamp;
    }

    /**
     * Returns the whole data set contained in the stream, as a bidimensional
     * table of numbers.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     * 
     * This method fetches the whole data stream from the device,
     * if not yet done.
     * 
     * @return a list containing as many elements as there are rows in the
     *         data stream. Each row itself is a list of floating-point
     *         numbers.
     * 
     * On failure, throws an exception or returns an empty array.
     */
    function YDataStream_get_dataRows()
    {
        if ((this._values.length == 0) || !(this._isClosed)) {
            this.loadStream();
        }
        return this._values;
    }

    /**
     * Returns a single measure from the data stream, specified by its
     * row and column index.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     * 
     * This method fetches the whole data stream from the device,
     * if not yet done.
     * 
     * @param row : row index
     * @param col : column index
     * 
     * @return a floating-point number
     * 
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    function YDataStream_get_data(row,col)
    {
        if ((this._values.length == 0) || !(this._isClosed)) {
            this.loadStream();
        }
        if (row >= this._values.length) {
            return Y_DATA_INVALID;
        }
        if (col >= this._values[row].length) {
            return Y_DATA_INVALID;
        }
        return this._values[row][col];
    }

    //--- (end of generated code: YDataStream implementation)
    //
    //--- (generated code: YDataStream initialization)
    YDataStream = _YDataStream;
    // Methods
    YDataStream.prototype._initFromDataSet            = YDataStream_initFromDataSet;
    YDataStream.prototype.parse                       = YDataStream_parse;
    YDataStream.prototype.get_url                     = YDataStream_get_url;
    YDataStream.prototype.url                         = YDataStream_get_url;
    YDataStream.prototype.loadStream                  = YDataStream_loadStream;
    YDataStream.prototype._decodeVal                  = YDataStream_decodeVal;
    YDataStream.prototype._decodeAvg                  = YDataStream_decodeAvg;
    YDataStream.prototype.isClosed                    = YDataStream_isClosed;
    YDataStream.prototype.get_runIndex                = YDataStream_get_runIndex;
    YDataStream.prototype.runIndex                    = YDataStream_get_runIndex;
    YDataStream.prototype.get_startTime               = YDataStream_get_startTime;
    YDataStream.prototype.startTime                   = YDataStream_get_startTime;
    YDataStream.prototype.get_startTimeUTC            = YDataStream_get_startTimeUTC;
    YDataStream.prototype.startTimeUTC                = YDataStream_get_startTimeUTC;
    YDataStream.prototype.get_dataSamplesIntervalMs   = YDataStream_get_dataSamplesIntervalMs;
    YDataStream.prototype.dataSamplesIntervalMs       = YDataStream_get_dataSamplesIntervalMs;
    YDataStream.prototype.get_dataSamplesInterval     = YDataStream_get_dataSamplesInterval;
    YDataStream.prototype.dataSamplesInterval         = YDataStream_get_dataSamplesInterval;
    YDataStream.prototype.get_rowCount                = YDataStream_get_rowCount;
    YDataStream.prototype.rowCount                    = YDataStream_get_rowCount;
    YDataStream.prototype.get_columnCount             = YDataStream_get_columnCount;
    YDataStream.prototype.columnCount                 = YDataStream_get_columnCount;
    YDataStream.prototype.get_columnNames             = YDataStream_get_columnNames;
    YDataStream.prototype.columnNames                 = YDataStream_get_columnNames;
    YDataStream.prototype.get_minValue                = YDataStream_get_minValue;
    YDataStream.prototype.minValue                    = YDataStream_get_minValue;
    YDataStream.prototype.get_averageValue            = YDataStream_get_averageValue;
    YDataStream.prototype.averageValue                = YDataStream_get_averageValue;
    YDataStream.prototype.get_maxValue                = YDataStream_get_maxValue;
    YDataStream.prototype.maxValue                    = YDataStream_get_maxValue;
    YDataStream.prototype.get_duration                = YDataStream_get_duration;
    YDataStream.prototype.duration                    = YDataStream_get_duration;
    YDataStream.prototype.get_dataRows                = YDataStream_get_dataRows;
    YDataStream.prototype.dataRows                    = YDataStream_get_dataRows;
    YDataStream.prototype.get_data                    = YDataStream_get_data;
    YDataStream.prototype.data                        = YDataStream_get_data;
    //--- (end of generated code: YDataStream initialization)

//--- (generated code: YDataSet class start)
/**
 * YDataSet Class: Recorded data sequence
 * 
 * YDataSet objects make it possible to retrieve a set of recorded measures
 * for a given sensor and a specified time interval. They can be used
 * to load data points with a progress report. When the YDataSet object is
 * instanciated by the get_recordedData()  function, no data is
 * yet loaded from the module. It is only when the loadMore()
 * method is called over and over than data will be effectively loaded
 * from the dataLogger.
 * 
 * A preview of available measures is available using the function
 * get_preview() as soon as loadMore() has been called
 * once. Measures themselves are available using function get_measures()
 * when loaded by subsequent calls to loadMore().
 * 
 * This class can only be used on devices that use a recent firmware,
 * as YDataSet objects are not supported by firmwares older than version 13000.
 */
//--- (end of generated code: YDataSet class start)
    
    function _YDataSet(obj_parent, str_vararg, str_unit, u32_startTime, u32_endTime)
    {
        //--- (generated code: YDataSet constructor)
        this._parent                         = null;                       // YFunction
        this._hardwareId                     = "";                         // str
        this._functionId                     = "";                         // str
        this._unit                           = "";                         // str
        this._startTime                      = 0;                          // u32
        this._endTime                        = 0;                          // u32
        this._progress                       = 0;                          // int
        this._calib                          = [];                         // intArr
        this._streams                        = [];                         // YDataStreamArr
        this._summary                        = null;                       // YMeasure
        this._preview                        = [];                         // YMeasureArr
        this._measures                       = [];                         // YMeasureArr
        //--- (end of generated code: YDataSet constructor)
        this._parse                          = YDataSet_parse;
        this.loadMore_async                  = YDataSet_loadMore_async;
        // init _summary with dummy value 
        this._summary = new YMeasure(0, 0, 0, 0, 0);  
        if(typeof str_unit === "undefined") {
            // 1st version of constructor, called from YDataLogger
            var str_json = str_vararg;

            this._parent     = obj_parent;
            this._startTime = 0;
            this._endTime   = 0;
            this._parse(str_json);
        } else {
            // 2nd version of constructor, called from YFunction
            var str_functionId = str_vararg;
            
            this._parent     = obj_parent;
            this._functionId = str_functionId;
            this._unit       = str_unit;
            this._startTime  = u32_startTime;
            this._endTime    = u32_endTime;
            this._progress   = -1;
        }
    }
    
    //--- (generated code: YDataSet implementation)

    function YDataSet_get_calibration()
    {
        return this._calib;
    }

    function YDataSet_processMore(progress,data)
    {
        var ii; // iterator
        var stream;                 // YDataStream;
        var dataRows = [];          // floatArrArr;
        var strdata;                // str;
        var tim;                    // float;
        var itv;                    // float;
        var nCols;                  // int;
        var minCol;                 // int;
        var avgCol;                 // int;
        var maxCol;                 // int;
        // may throw an exception
        if (progress != this._progress) {
            return this._progress;
        }
        if (this._progress < 0) {
            strdata = data.toString(YAPI.defaultEncoding);
            if (strdata == "{}") {
                this._parent._throw(YAPI_VERSION_MISMATCH, "device firmware is too old");
                return YAPI_VERSION_MISMATCH;
            }
            return this._parse(strdata);
        }
        stream = this._streams[this._progress];
        stream.parse(data);
        dataRows = stream.get_dataRows();
        this._progress = this._progress + 1;
        if (dataRows.length == 0) {
            return this.get_progress();
        }
        tim = stream.get_startTimeUTC();
        itv = stream.get_dataSamplesInterval();
        nCols = dataRows[0].length;
        minCol = 0;
        if (nCols > 2) {
            avgCol = 1;
        } else {
            avgCol = 0;
        }
        if (nCols > 2) {
            maxCol = 2;
        } else {
            maxCol = 0;
        }
        
        for (ii in dataRows) {
            if ((tim >= this._startTime) && ((this._endTime == 0) || (tim <= this._endTime))) {
                this._measures.push(new YMeasure(tim - itv, tim, dataRows[ii][minCol], dataRows[ii][avgCol], dataRows[ii][maxCol]));
                tim = tim + itv;
            }
        }
        
        return this.get_progress();
    }

    function YDataSet_get_privateDataStreams()
    {
        return this._streams;
    }

    /**
     * Returns the unique hardware identifier of the function who performed the measures,
     * in the form SERIAL.FUNCTIONID. The unique hardware identifier is composed of the
     * device serial number and of the hardware identifier of the function
     * (for example THRMCPL1-123456.temperature1)
     * 
     * @return a string that uniquely identifies the function (ex: THRMCPL1-123456.temperature1)
     * 
     * On failure, throws an exception or returns  YDataSet.HARDWAREID_INVALID.
     */
    function YDataSet_get_hardwareId()
    {
        var mo;                     // YModule;
        if (!(this._hardwareId == "")) {
            return this._hardwareId;
        }
        mo = this._parent.get_module();
        this._hardwareId = ""+mo.get_serialNumber()+"."+this.get_functionId();
        return this._hardwareId;
    }

    /**
     * Returns the hardware identifier of the function that performed the measure,
     * without reference to the module. For example temperature1.
     * 
     * @return a string that identifies the function (ex: temperature1)
     */
    function YDataSet_get_functionId()
    {
        return this._functionId;
    }

    /**
     * Returns the measuring unit for the measured value.
     * 
     * @return a string that represents a physical unit.
     * 
     * On failure, throws an exception or returns  YDataSet.UNIT_INVALID.
     */
    function YDataSet_get_unit()
    {
        return this._unit;
    }

    /**
     * Returns the start time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet is created, the start time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the start time is updated
     * to reflect the timestamp of the first measure actually found in the
     * dataLogger within the specified range.
     * 
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    function YDataSet_get_startTimeUTC()
    {
        return this._startTime;
    }

    /**
     * Returns the end time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet is created, the end time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the end time is updated
     * to reflect the timestamp of the last measure actually found in the
     * dataLogger within the specified range.
     * 
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the end of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    function YDataSet_get_endTimeUTC()
    {
        return this._endTime;
    }

    /**
     * Returns the progress of the downloads of the measures from the data logger,
     * on a scale from 0 to 100. When the object is instanciated by get_dataSet,
     * the progress is zero. Each time loadMore() is invoked, the progress
     * is updated, to reach the value 100 only once all measures have been loaded.
     * 
     * @return an integer in the range 0 to 100 (percentage of completion).
     */
    function YDataSet_get_progress()
    {
        if (this._progress < 0) {
            return 0;
        }
        // index not yet loaded
        if (this._progress >= this._streams.length) {
            return 100;
        }
        return parseInt((1 + (1 + this._progress) * 98 ) / ((1 + this._streams.length)));
    }

    /**
     * Loads the the next block of measures from the dataLogger, and updates
     * the progress indicator.
     * 
     * @return an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataSet_loadMore()
    {
        var url;                    // str;
        var stream;                 // YDataStream;
        if (this._progress < 0) {
            url = "logger.json?id="+this._functionId;
        } else {
            if (this._progress >= this._streams.length) {
                return 100;
            } else {
                stream = this._streams[this._progress];
                url = stream.get_url();
            }
        }
        return this.processMore(this._progress, this._parent._download(url));
    }

    /**
     * Returns an YMeasure object which summarizes the whole
     * DataSet. In includes the following information:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     * 
     * This summary is available as soon as loadMore() has
     * been called for the first time.
     * 
     * @return an YMeasure object
     */
    function YDataSet_get_summary()
    {
        return this._summary;
    }

    /**
     * Returns a condensed version of the measures that can
     * retrieved in this YDataSet, as a list of YMeasure
     * objects. Each item includes:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     * 
     * This preview is available as soon as loadMore() has
     * been called for the first time.
     * 
     * @return a table of records, where each record depicts the
     *         measured values during a time interval
     * 
     * On failure, throws an exception or returns an empty array.
     */
    function YDataSet_get_preview()
    {
        return this._preview;
    }

    /**
     * Returns all measured values currently available for this DataSet,
     * as a list of YMeasure objects. Each item includes:
     * - the start of the measure time interval
     * - the end of the measure time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     * 
     * Before calling this method, you should call loadMore()
     * to load data from the device. You may have to call loadMore()
     * several time until all rows are loaded, but you can start
     * looking at available data rows before the load is complete.
     * 
     * The oldest measures are always loaded first, and the most
     * recent measures will be loaded last. As a result, timestamps
     * are normally sorted in ascending order within the measure table,
     * unless there was an unexpected adjustment of the datalogger UTC
     * clock.
     * 
     * @return a table of records, where each record depicts the
     *         measured value for a given time interval
     * 
     * On failure, throws an exception or returns an empty array.
     */
    function YDataSet_get_measures()
    {
        return this._measures;
    }

    //--- (end of generated code: YDataSet implementation)

    // YDataSet parser for stream list
    function YDataSet_parse(str_json)
    {
        var summaryMinVal    = Number.MAX_VALUE;
        var summaryMaxVal    = -Number.MAX_VALUE;
        var summaryTotalTime = 0;
        var summaryTotalAvg  = 0;
        var loadval = JSON.parse(str_json);

        this._functionId = loadval.id;
        this._unit       = loadval.unit;
        this._calib      = YAPI._decodeWords(loadval.cal);
        this._summary    = new YMeasure(0,0,0,0,0);
        this._streams    = [];
        this._preview    = [];
        this._measures   = [];
        for(var i = 0; i < loadval.streams.length; i++) {
            var stream = this._parent._findDataStream(this, loadval.streams[i]);
            if(this._startTime > 0 && stream.get_startTimeUTC() + stream.get_duration() <= this._startTime) {
                // this stream is too early, drop it
            } else if(this._endTime > 0 && stream.get_startTimeUTC() > this._endTime) {
                // this stream is too late, drop it
            } else {
                this._streams.push(stream);
                if(stream.isClosed() && stream.get_startTimeUTC() >= this._startTime &&
                (this._endTime == 0 || stream.get_startTimeUTC() + stream.get_duration() <= this._endTime)) {
                    if (summaryMinVal > stream.get_minValue())
                        summaryMinVal = stream.get_minValue();
                    if (summaryMaxVal < stream.get_maxValue())
                        summaryMaxVal = stream.get_maxValue();
                    summaryTotalAvg  += stream.get_averageValue() * stream.get_duration();
                    summaryTotalTime += stream.get_duration();

                    var rec = new YMeasure(stream.get_startTimeUTC(),
                                           stream.get_startTimeUTC() + stream.get_duration(),
                                           stream.get_minValue(),
                                           stream.get_averageValue(),
                                           stream.get_maxValue());
                    this._preview.push(rec);
                }
            }
        }
        if((this._streams.length > 0) && (summaryTotalTime>0)) {
            // update time boundaries with actual data
            stream = this._streams[this._streams.length-1];
            var endtime = stream.get_startTimeUTC() + stream.get_duration();
            var startTime = this._streams[0].get_startTimeUTC() - stream.get_dataSamplesIntervalMs()/1000;
            if(this._startTime < startTime) {
                this._startTime = startTime;
            }
            if(this._endTime == 0 || this._endTime > endtime) {
                this._endTime = endtime;
            }
            this._summary = new YMeasure(this._startTime,this._endTime,
                                         summaryMinVal,summaryTotalAvg/summaryTotalTime,summaryMaxVal);
        }
        this._progress = 0;
        return this.get_progress();        
    }

    /**
     * Loads the the next block of measures from the dataLogger asynchronously.
     * 
     * @param callback : callback function that is invoked when the w
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataSet object whose loadMore_async was invoked
     *         - the load result: either the progress indicator (0...100), or
     *         a negative error code in case of failure.
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing.
     */
    function YDataSet_loadMore_async(callback, context)
    {
        var url;
        var stream;
        if (this._progress < 0) {
            url = "logger.json?id="+this._functionId;
        } else {
            if (this._progress >= this._streams.length) {
                callback(context, this, 100);
            } else {
                stream = this._streams[this._progress];
                url = stream.get_url();
            }
        }
        this._parent._download_async(url, function(ctx, parent, data) {
            var res = ctx.dataset.processMore(ctx.progress, data);
            ctx.usercb(ctx.userctx, ctx.dataset, res);
        }, { progress:this._progress, dataset:this, usercb:callback, userctx:context });        
    }

    //--- (generated code: YDataSet initialization)
    YDataSet = _YDataSet;
    // Methods
    YDataSet.prototype.get_calibration             = YDataSet_get_calibration;
    YDataSet.prototype.calibration                 = YDataSet_get_calibration;
    YDataSet.prototype.processMore                 = YDataSet_processMore;
    YDataSet.prototype.get_privateDataStreams      = YDataSet_get_privateDataStreams;
    YDataSet.prototype.privateDataStreams          = YDataSet_get_privateDataStreams;
    YDataSet.prototype.get_hardwareId              = YDataSet_get_hardwareId;
    YDataSet.prototype.hardwareId                  = YDataSet_get_hardwareId;
    YDataSet.prototype.get_functionId              = YDataSet_get_functionId;
    YDataSet.prototype.functionId                  = YDataSet_get_functionId;
    YDataSet.prototype.get_unit                    = YDataSet_get_unit;
    YDataSet.prototype.unit                        = YDataSet_get_unit;
    YDataSet.prototype.get_startTimeUTC            = YDataSet_get_startTimeUTC;
    YDataSet.prototype.startTimeUTC                = YDataSet_get_startTimeUTC;
    YDataSet.prototype.get_endTimeUTC              = YDataSet_get_endTimeUTC;
    YDataSet.prototype.endTimeUTC                  = YDataSet_get_endTimeUTC;
    YDataSet.prototype.get_progress                = YDataSet_get_progress;
    YDataSet.prototype.progress                    = YDataSet_get_progress;
    YDataSet.prototype.loadMore                    = YDataSet_loadMore;
    YDataSet.prototype.get_summary                 = YDataSet_get_summary;
    YDataSet.prototype.summary                     = YDataSet_get_summary;
    YDataSet.prototype.get_preview                 = YDataSet_get_preview;
    YDataSet.prototype.preview                     = YDataSet_get_preview;
    YDataSet.prototype.get_measures                = YDataSet_get_measures;
    YDataSet.prototype.measures                    = YDataSet_get_measures;
    //--- (end of generated code: YDataSet initialization)

//--- (generated code: YSensor class start)
/**
 * YSensor Class: Sensor function interface
 * 
 * The Yoctopuce application programming interface allows you to read an instant
 * measure of the sensor, as well as the minimal and maximal values observed.
 */
//--- (end of generated code: YSensor class start)
    
    function _YSensor(str_func)
    {
        //--- (generated code: YSensor constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Sensor';

        this._unit                           = Y_UNIT_INVALID;             // Text
        this._currentValue                   = Y_CURRENTVALUE_INVALID;     // Decimal
        this._lowestValue                    = Y_LOWESTVALUE_INVALID;      // Decimal
        this._highestValue                   = Y_HIGHESTVALUE_INVALID;     // Decimal
        this._currentRawValue                = Y_CURRENTRAWVALUE_INVALID;  // Precimal
        this._logFrequency                   = Y_LOGFREQUENCY_INVALID;     // YFrequency
        this._reportFrequency                = Y_REPORTFREQUENCY_INVALID;  // YFrequency
        this._calibrationParam               = Y_CALIBRATIONPARAM_INVALID; // WordArray
        this._resolution                     = Y_RESOLUTION_INVALID;       // Fractional
        this._timedReportCallbackSensor      = null;                       // YSensorTimedReportCallback
        this._prevTimedReport                = 0;                          // float
        this._iresol                         = 0;                          // float
        this._offset                         = 0;                          // float
        this._scale                          = 0;                          // float
        this._decexp                         = 0;                          // float
        this._isScal                         = 0;                          // bool
        this._caltyp                         = 0;                          // int
        this._calpar                         = [];                         // intArr
        this._calraw                         = [];                         // floatArr
        this._calref                         = [];                         // floatArr
        this._calhdl                         = null;                       // yCalibrationHandler
        //--- (end of generated code: YSensor constructor)
    }
    
    //--- (generated code: YSensor implementation)

    function YSensor_parseAttr(name, val, _super)
    {
        switch(name) {
        case "unit":
            this._unit = val;
            return 1;
        case "currentValue":
            this._currentValue = val/65536;
            return 1;
        case "lowestValue":
            this._lowestValue = val/65536;
            return 1;
        case "highestValue":
            this._highestValue = val/65536;
            return 1;
        case "currentRawValue":
            this._currentRawValue = val/65536;
            return 1;
        case "logFrequency":
            this._logFrequency = val;
            return 1;
        case "reportFrequency":
            this._reportFrequency = val;
            return 1;
        case "calibrationParam":
            this._calibrationParam = val;
            return 1;
        case "resolution":
            this._resolution = (val > 100 ? 1.0 / Math.round(65536.0/val) : 0.001 / Math.round(67.0/val));
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the measuring unit for the measure.
     * 
     * @return a string corresponding to the measuring unit for the measure
     * 
     * On failure, throws an exception or returns YSensor.UNIT_INVALID.
     */
    function YSensor_get_unit()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_UNIT_INVALID;
            }
        }
        return this._unit;
    }

    /**
     * Gets the measuring unit for the measure.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a string corresponding to the measuring unit for the measure
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_UNIT_INVALID.
     */
    function YSensor_get_unit_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_UNIT_INVALID);
            } else {
                callback(context, obj, obj._unit);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current value of the measure.
     * 
     * @return a floating point number corresponding to the current value of the measure
     * 
     * On failure, throws an exception or returns YSensor.CURRENTVALUE_INVALID.
     */
    function YSensor_get_currentValue()
    {
        var res;                    // float;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTVALUE_INVALID;
            }
        }
        res = this._applyCalibration(this._currentRawValue);
        if (res == Y_CURRENTVALUE_INVALID) {
            res = this._currentValue;
        }
        res = res * this._iresol;
        return Math.round(res) / this._iresol;
    }

    /**
     * Gets the current value of the measure.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the current value of the measure
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_CURRENTVALUE_INVALID.
     */
    function YSensor_get_currentValue_async(callback,context)
    {
        var res;                    // float;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTVALUE_INVALID);
            } else {
                res = obj._applyCalibration(obj._currentRawValue);
                if (res == Y_CURRENTVALUE_INVALID) {
                    res = obj._currentValue;
                }
                res = res * obj._iresol;
                callback(context, obj, Math.round(res) / obj._iresol);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the recorded minimal value observed.
     * 
     * @param newval : a floating point number corresponding to the recorded minimal value observed
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_set_lowestValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('lowestValue',rest_val);
    }

    /**
     * Returns the minimal value observed for the measure since the device was started.
     * 
     * @return a floating point number corresponding to the minimal value observed for the measure since
     * the device was started
     * 
     * On failure, throws an exception or returns YSensor.LOWESTVALUE_INVALID.
     */
    function YSensor_get_lowestValue()
    {
        var res;                    // float;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LOWESTVALUE_INVALID;
            }
        }
        res = this._lowestValue * this._iresol;
        return Math.round(res) / this._iresol;
    }

    /**
     * Gets the minimal value observed for the measure since the device was started.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the minimal value observed for the measure
     *         since the device was started
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOWESTVALUE_INVALID.
     */
    function YSensor_get_lowestValue_async(callback,context)
    {
        var res;                    // float;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LOWESTVALUE_INVALID);
            } else {
                res = obj._lowestValue * obj._iresol;
                callback(context, obj, Math.round(res) / obj._iresol);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the recorded maximal value observed.
     * 
     * @param newval : a floating point number corresponding to the recorded maximal value observed
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_set_highestValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('highestValue',rest_val);
    }

    /**
     * Returns the maximal value observed for the measure since the device was started.
     * 
     * @return a floating point number corresponding to the maximal value observed for the measure since
     * the device was started
     * 
     * On failure, throws an exception or returns YSensor.HIGHESTVALUE_INVALID.
     */
    function YSensor_get_highestValue()
    {
        var res;                    // float;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_HIGHESTVALUE_INVALID;
            }
        }
        res = this._highestValue * this._iresol;
        return Math.round(res) / this._iresol;
    }

    /**
     * Gets the maximal value observed for the measure since the device was started.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the maximal value observed for the measure
     *         since the device was started
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_HIGHESTVALUE_INVALID.
     */
    function YSensor_get_highestValue_async(callback,context)
    {
        var res;                    // float;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_HIGHESTVALUE_INVALID);
            } else {
                res = obj._highestValue * obj._iresol;
                callback(context, obj, Math.round(res) / obj._iresol);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the uncalibrated, unrounded raw value returned by the sensor.
     * 
     * @return a floating point number corresponding to the uncalibrated, unrounded raw value returned by the sensor
     * 
     * On failure, throws an exception or returns YSensor.CURRENTRAWVALUE_INVALID.
     */
    function YSensor_get_currentRawValue()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTRAWVALUE_INVALID;
            }
        }
        return this._currentRawValue;
    }

    /**
     * Gets the uncalibrated, unrounded raw value returned by the sensor.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the uncalibrated, unrounded raw value
     *         returned by the sensor
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_CURRENTRAWVALUE_INVALID.
     */
    function YSensor_get_currentRawValue_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTRAWVALUE_INVALID);
            } else {
                callback(context, obj, obj._currentRawValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the datalogger recording frequency for this function, or "OFF"
     * when measures are not stored in the data logger flash memory.
     * 
     * @return a string corresponding to the datalogger recording frequency for this function, or "OFF"
     *         when measures are not stored in the data logger flash memory
     * 
     * On failure, throws an exception or returns YSensor.LOGFREQUENCY_INVALID.
     */
    function YSensor_get_logFrequency()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LOGFREQUENCY_INVALID;
            }
        }
        return this._logFrequency;
    }

    /**
     * Gets the datalogger recording frequency for this function, or "OFF"
     * when measures are not stored in the data logger flash memory.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a string corresponding to the datalogger recording frequency for this function, or "OFF"
     *         when measures are not stored in the data logger flash memory
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOGFREQUENCY_INVALID.
     */
    function YSensor_get_logFrequency_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LOGFREQUENCY_INVALID);
            } else {
                callback(context, obj, obj._logFrequency);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the datalogger recording frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (eg. "4/h"). To disable recording for this function, use
     * the value "OFF".
     * 
     * @param newval : a string corresponding to the datalogger recording frequency for this function
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_set_logFrequency(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logFrequency',rest_val);
    }

    /**
     * Returns the timed value notification frequency, or "OFF" if timed
     * value notifications are disabled for this function.
     * 
     * @return a string corresponding to the timed value notification frequency, or "OFF" if timed
     *         value notifications are disabled for this function
     * 
     * On failure, throws an exception or returns YSensor.REPORTFREQUENCY_INVALID.
     */
    function YSensor_get_reportFrequency()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_REPORTFREQUENCY_INVALID;
            }
        }
        return this._reportFrequency;
    }

    /**
     * Gets the timed value notification frequency, or "OFF" if timed
     * value notifications are disabled for this function.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a string corresponding to the timed value notification frequency, or "OFF" if timed
     *         value notifications are disabled for this function
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_REPORTFREQUENCY_INVALID.
     */
    function YSensor_get_reportFrequency_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_REPORTFREQUENCY_INVALID);
            } else {
                callback(context, obj, obj._reportFrequency);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the timed value notification frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (eg. "4/h"). To disable timed value notifications for this
     * function, use the value "OFF".
     * 
     * @param newval : a string corresponding to the timed value notification frequency for this function
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_set_reportFrequency(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('reportFrequency',rest_val);
    }

    function YSensor_get_calibrationParam()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALIBRATIONPARAM_INVALID;
            }
        }
        return this._calibrationParam;
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YSensor_get_calibrationParam_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALIBRATIONPARAM_INVALID);
            } else {
                callback(context, obj, obj._calibrationParam);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YSensor_set_calibrationParam(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('calibrationParam',rest_val);
    }

    /**
     * Changes the resolution of the measured physical values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     * 
     * @param newval : a floating point number corresponding to the resolution of the measured physical values
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_set_resolution(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('resolution',rest_val);
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * 
     * @return a floating point number corresponding to the resolution of the measured values
     * 
     * On failure, throws an exception or returns YSensor.RESOLUTION_INVALID.
     */
    function YSensor_get_resolution()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RESOLUTION_INVALID;
            }
        }
        return this._resolution;
    }

    /**
     * Gets the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSensor object that invoked the callback
     *         - the result:a floating point number corresponding to the resolution of the measured values
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_RESOLUTION_INVALID.
     */
    function YSensor_get_resolution_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RESOLUTION_INVALID);
            } else {
                callback(context, obj, obj._resolution);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSensor.isOnline() to test if the sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the sensor
     * 
     * @return a YSensor object allowing you to drive the sensor.
     */
    function YSensor_FindSensor(func)                           // class method
    {
        var obj;                    // YSensor;
        obj = YFunction._FindFromCache("Sensor", func);
        if (obj == null) {
            obj = new YSensor(func);
            YFunction._AddToCache("Sensor", func, obj);
        }
        return obj;
    }

    function YSensor_parserHelper()
    {
        var position;               // int;
        var maxpos;                 // int;
        var iCalib = [];            // intArr;
        var iRaw;                   // int;
        var iRef;                   // int;
        var fRaw;                   // float;
        var fRef;                   // float;
        // Store inverted resolution, to provide better rounding
        if (this._resolution > 0) {
            this._iresol = Math.round(1.0 / this._resolution);
        } else {
            return 0;
        }
        
        this._scale = -1;
        this._calpar.length = 0;
        this._calraw.length = 0;
        this._calref.length = 0;
        
        // Old format: supported when there is no calibration
        if (this._calibrationParam == "" || this._calibrationParam == "0") {
            this._caltyp = 0;
            return 0;
        }
        // Old format: calibrated value will be provided by the device
        if ((this._calibrationParam).indexOf(",") >= 0) {
            this._caltyp = -1;
            return 0;
        }
        // New format, decode parameters
        iCalib = YAPI._decodeWords(this._calibrationParam);
        // In case of unknown format, calibrated value will be provided by the device
        if (iCalib.length < 2) {
            this._caltyp = -1;
            return 0;
        }
        
        // Save variable format (scale for scalar, or decimal exponent)
        this._isScal = (iCalib[1] > 0);
        if (this._isScal) {
            this._offset = iCalib[0];
            if (this._offset > 32767) {
                this._offset = this._offset - 65536;
            }
            this._scale = iCalib[1];
            this._decexp = 0;
        } else {
            this._offset = 0;
            this._scale = 1;
            this._decexp = 1.0;
            position = iCalib[0];
            while (position > 0) {
                this._decexp = this._decexp * 10;
                position = position - 1;
            }
        }
        
        // Shortcut when there is no calibration parameter
        if (iCalib.length == 2) {
            this._caltyp = 0;
            return 0;
        }
        
        this._caltyp = iCalib[2];
        this._calhdl = YAPI._getCalibrationHandler(this._caltyp);
        // parse calibration points
        position = 3;
        if (this._caltyp <= 10) {
            maxpos = this._caltyp;
        } else {
            if (this._caltyp <= 20) {
                maxpos = this._caltyp - 10;
            } else {
                maxpos = 5;
            }
        }
        maxpos = 3 + 2 * maxpos;
        if (maxpos > iCalib.length) {
            maxpos = iCalib.length;
        }
        this._calpar.length = 0;
        this._calraw.length = 0;
        this._calref.length = 0;
        while (position + 1 < maxpos) {
            iRaw = iCalib[position];
            iRef = iCalib[position + 1];
            this._calpar.push(iRaw);
            this._calpar.push(iRef);
            if (this._isScal) {
                fRaw = iRaw;
                fRaw = (fRaw - this._offset) / this._scale;
                fRef = iRef;
                fRef = (fRef - this._offset) / this._scale;
                this._calraw.push(fRaw);
                this._calref.push(fRef);
            } else {
                this._calraw.push(YAPI._decimalToDouble(iRaw));
                this._calref.push(YAPI._decimalToDouble(iRef));
            }
            position = position + 2;
        }
        
        
        
        return 0;
    }

    /**
     * Retrieves a DataSet object holding historical data for this
     * sensor, for a specified time interval. The measures will be
     * retrieved from the data logger, which must have been turned
     * on at the desired time. See the documentation of the DataSet
     * class for information on how to get an overview of the
     * recorded data, and how to load progressively a large set
     * of measures from the data logger.
     * 
     * This function only works if the device uses a recent firmware,
     * as DataSet objects are not supported by firmwares older than
     * version 13000.
     * 
     * @param startTime : the start of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any meaasure, without initial limit.
     * @param endTime : the end of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any meaasure, without ending limit.
     * 
     * @return an instance of YDataSet, providing access to historical
     *         data. Past measures can be loaded progressively
     *         using methods from the YDataSet object.
     */
    function YSensor_get_recordedData(startTime,endTime)
    {
        var funcid;                 // str;
        var funit;                  // str;
        // may throw an exception
        funcid = this.get_functionId();
        funit = this.get_unit();
        return new YDataSet(this, funcid, funit, startTime, endTime);
    }

    /**
     * Registers the callback function that is invoked on every periodic timed notification.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     * 
     * @param callback : the callback function to call, or a null pointer. The callback function should take two
     *         arguments: the function object of which the value has changed, and an YMeasure object describing
     *         the new advertised value.
     * @noreturn
     */
    function YSensor_registerTimedReportCallback(callback)
    {
        if (callback != null) {
            YFunction._UpdateTimedReportCallbackList(this, true);
        } else {
            YFunction._UpdateTimedReportCallbackList(this, false);
        }
        this._timedReportCallbackSensor = callback;
        return 0;
    }

    function YSensor_invokeTimedReportCallback(value)
    {
        if (this._timedReportCallbackSensor != null) {
            this._timedReportCallbackSensor(this, value);
        } else {
        }
        return 0;
    }

    /**
     * Configures error correction data points, in particular to compensate for
     * a possible perturbation of the measure caused by an enclosure. It is possible
     * to configure up to five correction points. Correction points must be provided
     * in ascending order, and be in the range of the sensor. The device will automatically
     * perform a linear interpolation of the error correction between specified
     * points. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * For more information on advanced capabilities to refine the calibration of
     * sensors, please contact support@yoctopuce.com.
     * 
     * @param rawValues : array of floating point numbers, corresponding to the raw
     *         values returned by the sensor for the correction points.
     * @param refValues : array of floating point numbers, corresponding to the corrected
     *         values for the correction points.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_calibrateFromPoints(rawValues,refValues)
    {
        var rest_val;               // str;
        // may throw an exception
        rest_val = this._encodeCalibrationPoints(rawValues, refValues);
        return this._setAttr("calibrationParam", rest_val);
    }

    /**
     * Retrieves error correction data points previously entered using the method
     * calibrateFromPoints.
     * 
     * @param rawValues : array of floating point numbers, that will be filled by the
     *         function with the raw sensor values for the correction points.
     * @param refValues : array of floating point numbers, that will be filled by the
     *         function with the desired values for the correction points.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YSensor_loadCalibrationPoints(rawValues,refValues)
    {
        var ii; // iterator
        rawValues.length = 0;
        refValues.length = 0;
        
        // Load function parameters if not yet loaded
        if (this._scale == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return YAPI_DEVICE_NOT_FOUND;
            }
        }
        
        if (this._caltyp < 0) {
            this._throw(YAPI_NOT_SUPPORTED, "Device does not support new calibration parameters. Please upgrade your firmware");
            return YAPI_NOT_SUPPORTED;
        }
        rawValues.length = 0;
        refValues.length = 0;
        for (ii in this._calraw) {
            rawValues.push(this._calraw[ii]);
        }
        for (ii in this._calref) {
            refValues.push(this._calref[ii]);
        }
        return YAPI_SUCCESS;
    }

    function YSensor_encodeCalibrationPoints(rawValues,refValues)
    {
        var res;                    // str;
        var npt;                    // int;
        var idx;                    // int;
        var iRaw;                   // int;
        var iRef;                   // int;
        
        npt = rawValues.length;
        if (npt != refValues.length) {
            this._throw(YAPI_INVALID_ARGUMENT, "Invalid calibration parameters (size mismatch)");
            return YAPI_INVALID_STRING;
        }
        
        // Shortcut when building empty calibration parameters
        if (npt == 0) {
            return "0";
        }
        
        // Load function parameters if not yet loaded
        if (this._scale == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return YAPI_INVALID_STRING;
            }
        }
        
        // Detect old firmware
        if ((this._caltyp < 0) || (this._scale < 0)) {
            this._throw(YAPI_NOT_SUPPORTED, "Device does not support new calibration parameters. Please upgrade your firmware");
            return "0";
        }
        if (this._isScal) {
            res = ""+String(Math.round(npt));
            idx = 0;
            while (idx < npt) {
                iRaw = Math.round(rawValues[idx] * this._scale + this._offset);
                iRef = Math.round(refValues[idx] * this._scale + this._offset);
                res = ""+res+","+String(Math.round(iRaw))+","+String(Math.round(iRef));
                idx = idx + 1;
            }
        } else {
            res = ""+String(Math.round(10 + npt));
            idx = 0;
            while (idx < npt) {
                iRaw = YAPI._doubleToDecimal(rawValues[idx]);
                iRef = YAPI._doubleToDecimal(refValues[idx]);
                res = ""+res+","+String(Math.round(iRaw))+","+String(Math.round(iRef));
                idx = idx + 1;
            }
        }
        return res;
    }

    function YSensor_applyCalibration(rawValue)
    {
        if (rawValue == Y_CURRENTVALUE_INVALID) {
            return Y_CURRENTVALUE_INVALID;
        }
        if (this._caltyp == 0) {
            return rawValue;
        }
        if (this._caltyp < 0) {
            return Y_CURRENTVALUE_INVALID;
        }
        if (!(this._calhdl != null)) {
            return Y_CURRENTVALUE_INVALID;
        }
        return this._calhdl(rawValue, this._caltyp, this._calpar, this._calraw, this._calref);
    }

    function YSensor_decodeTimedReport(timestamp,report)
    {
        var i;                      // int;
        var byteVal;                // int;
        var poww;                   // int;
        var minRaw;                 // int;
        var avgRaw;                 // int;
        var maxRaw;                 // int;
        var startTime;              // float;
        var endTime;                // float;
        var minVal;                 // float;
        var avgVal;                 // float;
        var maxVal;                 // float;
        
        startTime = this._prevTimedReport;
        endTime = timestamp;
        this._prevTimedReport = endTime;
        if (startTime == 0) {
            startTime = endTime;
        }
        if (report[0] > 0) {
            minRaw = report[1] + 0x100 * report[2];
            maxRaw = report[3] + 0x100 * report[4];
            avgRaw = report[5] + 0x100 * report[6] + 0x10000 * report[7];
            byteVal = report[8];
            if (((byteVal) & (0x80)) == 0) {
                avgRaw = avgRaw + 0x1000000 * byteVal;
            } else {
                avgRaw = avgRaw - 0x1000000 * (0x100 - byteVal);
            }
            minVal = this._decodeVal(minRaw);
            avgVal = this._decodeAvg(avgRaw);
            maxVal = this._decodeVal(maxRaw);
        } else {
            poww = 1;
            avgRaw = 0;
            byteVal = 0;
            i = 1;
            while (i < report.length) {
                byteVal = report[i];
                avgRaw = avgRaw + poww * byteVal;
                poww = poww * 0x100;
                i = i + 1;
            }
            if (this._isScal) {
                avgVal = this._decodeVal(avgRaw);
            } else {
                if (((byteVal) & (0x80)) != 0) {
                    avgRaw = avgRaw - poww;
                }
                avgVal = this._decodeAvg(avgRaw);
            }
            minVal = avgVal;
            maxVal = avgVal;
        }
        
        return new YMeasure(startTime, endTime, minVal, avgVal, maxVal);
    }

    function YSensor_decodeVal(w)
    {
        var val;                    // float;
        val = w;
        if (this._isScal) {
            val = (val - this._offset) / this._scale;
        } else {
            val = YAPI._decimalToDouble(w);
        }
        if (this._caltyp != 0) {
            val = this._calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
        }
        return val;
    }

    function YSensor_decodeAvg(dw)
    {
        var val;                    // float;
        val = dw;
        if (this._isScal) {
            val = (val / 100 - this._offset) / this._scale;
        } else {
            val = val / this._decexp;
        }
        if (this._caltyp != 0) {
            val = this._calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
        }
        return val;
    }

    /**
     * Continues the enumeration of sensors started using yFirstSensor().
     * 
     * @return a pointer to a YSensor object, corresponding to
     *         a sensor currently online, or a null pointer
     *         if there are no more sensors to enumerate.
     */
    function YSensor_nextSensor()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSensor.FindSensor(next_hwid);
    }

    /**
     * Starts the enumeration of sensors currently accessible.
     * Use the method YSensor.nextSensor() to iterate on
     * next sensors.
     * 
     * @return a pointer to a YSensor object, corresponding to
     *         the first sensor currently online, or a null pointer
     *         if there are none.
     */
    function YSensor_FirstSensor()
    {
        var next_hwid = YAPI.getFirstHardwareId('Sensor');
        if(next_hwid == null) return null;
        return YSensor.FindSensor(next_hwid);
    }

    //--- (end of generated code: YSensor implementation)

    //--- (generated code: YSensor initialization)
    YSensor = YFunction._Subclass(_YSensor, {
        // Constants
        UNIT_INVALID                : YAPI_INVALID_STRING,
        CURRENTVALUE_INVALID        : YAPI_INVALID_DOUBLE,
        LOWESTVALUE_INVALID         : YAPI_INVALID_DOUBLE,
        HIGHESTVALUE_INVALID        : YAPI_INVALID_DOUBLE,
        CURRENTRAWVALUE_INVALID     : YAPI_INVALID_DOUBLE,
        LOGFREQUENCY_INVALID        : YAPI_INVALID_STRING,
        REPORTFREQUENCY_INVALID     : YAPI_INVALID_STRING,
        CALIBRATIONPARAM_INVALID    : YAPI_INVALID_STRING,
        RESOLUTION_INVALID          : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindSensor                  : YSensor_FindSensor,
        FirstSensor                 : YSensor_FirstSensor
    }, {
        // Methods
        get_unit                    : YSensor_get_unit,
        unit                        : YSensor_get_unit,
        get_unit_async              : YSensor_get_unit_async,
        unit_async                  : YSensor_get_unit_async,
        get_currentValue            : YSensor_get_currentValue,
        currentValue                : YSensor_get_currentValue,
        get_currentValue_async      : YSensor_get_currentValue_async,
        currentValue_async          : YSensor_get_currentValue_async,
        set_lowestValue             : YSensor_set_lowestValue,
        setLowestValue              : YSensor_set_lowestValue,
        get_lowestValue             : YSensor_get_lowestValue,
        lowestValue                 : YSensor_get_lowestValue,
        get_lowestValue_async       : YSensor_get_lowestValue_async,
        lowestValue_async           : YSensor_get_lowestValue_async,
        set_highestValue            : YSensor_set_highestValue,
        setHighestValue             : YSensor_set_highestValue,
        get_highestValue            : YSensor_get_highestValue,
        highestValue                : YSensor_get_highestValue,
        get_highestValue_async      : YSensor_get_highestValue_async,
        highestValue_async          : YSensor_get_highestValue_async,
        get_currentRawValue         : YSensor_get_currentRawValue,
        currentRawValue             : YSensor_get_currentRawValue,
        get_currentRawValue_async   : YSensor_get_currentRawValue_async,
        currentRawValue_async       : YSensor_get_currentRawValue_async,
        get_logFrequency            : YSensor_get_logFrequency,
        logFrequency                : YSensor_get_logFrequency,
        get_logFrequency_async      : YSensor_get_logFrequency_async,
        logFrequency_async          : YSensor_get_logFrequency_async,
        set_logFrequency            : YSensor_set_logFrequency,
        setLogFrequency             : YSensor_set_logFrequency,
        get_reportFrequency         : YSensor_get_reportFrequency,
        reportFrequency             : YSensor_get_reportFrequency,
        get_reportFrequency_async   : YSensor_get_reportFrequency_async,
        reportFrequency_async       : YSensor_get_reportFrequency_async,
        set_reportFrequency         : YSensor_set_reportFrequency,
        setReportFrequency          : YSensor_set_reportFrequency,
        get_calibrationParam        : YSensor_get_calibrationParam,
        calibrationParam            : YSensor_get_calibrationParam,
        get_calibrationParam_async  : YSensor_get_calibrationParam_async,
        calibrationParam_async      : YSensor_get_calibrationParam_async,
        set_calibrationParam        : YSensor_set_calibrationParam,
        setCalibrationParam         : YSensor_set_calibrationParam,
        set_resolution              : YSensor_set_resolution,
        setResolution               : YSensor_set_resolution,
        get_resolution              : YSensor_get_resolution,
        resolution                  : YSensor_get_resolution,
        get_resolution_async        : YSensor_get_resolution_async,
        resolution_async            : YSensor_get_resolution_async,
        _parserHelper               : YSensor_parserHelper,
        get_recordedData            : YSensor_get_recordedData,
        recordedData                : YSensor_get_recordedData,
        registerTimedReportCallback : YSensor_registerTimedReportCallback,
        _invokeTimedReportCallback  : YSensor_invokeTimedReportCallback,
        calibrateFromPoints         : YSensor_calibrateFromPoints,
        loadCalibrationPoints       : YSensor_loadCalibrationPoints,
        _encodeCalibrationPoints    : YSensor_encodeCalibrationPoints,
        _applyCalibration           : YSensor_applyCalibration,
        _decodeTimedReport          : YSensor_decodeTimedReport,
        _decodeVal                  : YSensor_decodeVal,
        _decodeAvg                  : YSensor_decodeAvg,
        nextSensor                  : YSensor_nextSensor,
        _parseAttr                  : YSensor_parseAttr
    });
    //--- (end of generated code: YSensor initialization)

//--- (generated code: YModule class start)
/**
 * YModule Class: Module control interface
 * 
 * This interface is identical for all Yoctopuce USB modules.
 * It can be used to control the module global parameters, and
 * to enumerate the functions provided by each module.
 */
//--- (end of generated code: YModule class start)

    function _YModule(str_func)
    {
        //--- (generated code: YModule constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Module';

        this._productName                    = Y_PRODUCTNAME_INVALID;      // Text
        this._serialNumber                   = Y_SERIALNUMBER_INVALID;     // Text
        this._productId                      = Y_PRODUCTID_INVALID;        // XWord
        this._productRelease                 = Y_PRODUCTRELEASE_INVALID;   // XWord
        this._firmwareRelease                = Y_FIRMWARERELEASE_INVALID;  // Text
        this._persistentSettings             = Y_PERSISTENTSETTINGS_INVALID; // FlashSettings
        this._luminosity                     = Y_LUMINOSITY_INVALID;       // Percent
        this._beacon                         = Y_BEACON_INVALID;           // OnOff
        this._upTime                         = Y_UPTIME_INVALID;           // Time
        this._usbCurrent                     = Y_USBCURRENT_INVALID;       // UsedCurrent
        this._rebootCountdown                = Y_REBOOTCOUNTDOWN_INVALID;  // Int
        this._usbBandwidth                   = Y_USBBANDWIDTH_INVALID;     // UsbBandwidth
        this._logCallback                    = null;                       // YModuleLogCallback
        //--- (end of generated code: YModule constructor)

        // automatically fill in hardware properties if they can be resolved
        // without any network access (getDevice does not cause network access)
        var devid = this._func;
        var dotidx = devid.indexOf(".");
        if(dotidx > 0) devid = devid.substr(0, dotidx);
        var dev = YAPI.getDevice(devid);
        if(dev) {
            this._serial = dev.getSerialNumber();
            this._funId  = "module";
            this._hwId   = this._serial+".module";
        }
    }
    
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
    function YModule_functionId(functionIndex)
    {
        var dev = this._getDev();
        if(!dev) return "";
        return dev.functionId(functionIndex);
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
    function YModule_functionName(functionIndex)
    {
        var dev = this._getDev();
        if(!dev) return "";
        return dev.functionName(functionIndex);
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
    function YModule_functionValue(functionIndex)
    {
        var dev = this._getDev();
        if(!dev) return "";
        return dev.functionValue(functionIndex);
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

    /**
     * Returns the logical name of the module.
     * 
     * @return a string corresponding to the logical name of the module
     * 
     * On failure, throws an exception or returns YModule.LOGICALNAME_INVALID.
     */
    function YModule_get_logicalName()
    {
        var dev = this._getDev();
        // FOR NODE.JS: don't rely on dev._cache unless the _expiration is set, since
        //              we don't have a notification channel
        if(dev != null && this._cache._expiration <= YAPI.GetTickCount() && dev._cache._expiration != 0) {
            return dev._logicalName;
        }
        var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }
    
    /**
     * Gets the logical name of the module.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YFunction object that invoked the callback
     *         - the result:a string corresponding to the logical name of the module
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YModule_get_logicalName_async(callback, context)
    {   callback(context, this, this.get_logicalName());   }

    //--- (generated code: YModule implementation)

    function YModule_parseAttr(name, val, _super)
    {
        switch(name) {
        case "productName":
            this._productName = val;
            return 1;
        case "serialNumber":
            this._serialNumber = val;
            return 1;
        case "productId":
            this._productId = parseInt(val);
            return 1;
        case "productRelease":
            this._productRelease = parseInt(val);
            return 1;
        case "firmwareRelease":
            this._firmwareRelease = val;
            return 1;
        case "persistentSettings":
            this._persistentSettings = parseInt(val);
            return 1;
        case "luminosity":
            this._luminosity = parseInt(val);
            return 1;
        case "beacon":
            this._beacon = parseInt(val);
            return 1;
        case "upTime":
            this._upTime = parseInt(val);
            return 1;
        case "usbCurrent":
            this._usbCurrent = parseInt(val);
            return 1;
        case "rebootCountdown":
            this._rebootCountdown = parseInt(val);
            return 1;
        case "usbBandwidth":
            this._usbBandwidth = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the commercial name of the module, as set by the factory.
     * 
     * @return a string corresponding to the commercial name of the module, as set by the factory
     * 
     * On failure, throws an exception or returns YModule.PRODUCTNAME_INVALID.
     */
    function YModule_get_productName()
    {
        var dev;                    // YDevice;
        if (this._cacheExpiration == 0) {
            dev = this._getDev();
            if (!(dev == null)) {
                return dev.getProductName();
            }
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PRODUCTNAME_INVALID;
            }
        }
        return this._productName;
    }

    /**
     * Gets the commercial name of the module, as set by the factory.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:a string corresponding to the commercial name of the module, as set by the factory
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_PRODUCTNAME_INVALID.
     */
    function YModule_get_productName_async(callback,context)
    {
        var dev;                    // YDevice;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PRODUCTNAME_INVALID);
            } else {
                callback(context, obj, obj._productName);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the serial number of the module, as set by the factory.
     * 
     * @return a string corresponding to the serial number of the module, as set by the factory
     * 
     * On failure, throws an exception or returns YModule.SERIALNUMBER_INVALID.
     */
    function YModule_get_serialNumber()
    {
        var dev;                    // YDevice;
        if (this._cacheExpiration == 0) {
            dev = this._getDev();
            if (!(dev == null)) {
                return dev.getSerialNumber();
            }
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SERIALNUMBER_INVALID;
            }
        }
        return this._serialNumber;
    }

    /**
     * Gets the serial number of the module, as set by the factory.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:a string corresponding to the serial number of the module, as set by the factory
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_SERIALNUMBER_INVALID.
     */
    function YModule_get_serialNumber_async(callback,context)
    {
        var dev;                    // YDevice;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SERIALNUMBER_INVALID);
            } else {
                callback(context, obj, obj._serialNumber);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the USB device identifier of the module.
     * 
     * @return an integer corresponding to the USB device identifier of the module
     * 
     * On failure, throws an exception or returns YModule.PRODUCTID_INVALID.
     */
    function YModule_get_productId()
    {
        var dev;                    // YDevice;
        if (this._cacheExpiration == 0) {
            dev = this._getDev();
            if (!(dev == null)) {
                return dev.getProductId();
            }
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PRODUCTID_INVALID;
            }
        }
        return this._productId;
    }

    /**
     * Gets the USB device identifier of the module.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the USB device identifier of the module
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_PRODUCTID_INVALID.
     */
    function YModule_get_productId_async(callback,context)
    {
        var dev;                    // YDevice;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PRODUCTID_INVALID);
            } else {
                callback(context, obj, obj._productId);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the hardware release version of the module.
     * 
     * @return an integer corresponding to the hardware release version of the module
     * 
     * On failure, throws an exception or returns YModule.PRODUCTRELEASE_INVALID.
     */
    function YModule_get_productRelease()
    {
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PRODUCTRELEASE_INVALID;
            }
        }
        return this._productRelease;
    }

    /**
     * Gets the hardware release version of the module.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the hardware release version of the module
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_PRODUCTRELEASE_INVALID.
     */
    function YModule_get_productRelease_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PRODUCTRELEASE_INVALID);
            } else {
                callback(context, obj, obj._productRelease);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the version of the firmware embedded in the module.
     * 
     * @return a string corresponding to the version of the firmware embedded in the module
     * 
     * On failure, throws an exception or returns YModule.FIRMWARERELEASE_INVALID.
     */
    function YModule_get_firmwareRelease()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_FIRMWARERELEASE_INVALID;
            }
        }
        return this._firmwareRelease;
    }

    /**
     * Gets the version of the firmware embedded in the module.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:a string corresponding to the version of the firmware embedded in the module
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_FIRMWARERELEASE_INVALID.
     */
    function YModule_get_firmwareRelease_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_FIRMWARERELEASE_INVALID);
            } else {
                callback(context, obj, obj._firmwareRelease);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current state of persistent module settings.
     * 
     * @return a value among YModule.PERSISTENTSETTINGS_LOADED, YModule.PERSISTENTSETTINGS_SAVED and
     * YModule.PERSISTENTSETTINGS_MODIFIED corresponding to the current state of persistent module settings
     * 
     * On failure, throws an exception or returns YModule.PERSISTENTSETTINGS_INVALID.
     */
    function YModule_get_persistentSettings()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PERSISTENTSETTINGS_INVALID;
            }
        }
        return this._persistentSettings;
    }

    /**
     * Gets the current state of persistent module settings.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:a value among Y_PERSISTENTSETTINGS_LOADED, Y_PERSISTENTSETTINGS_SAVED and
     *         Y_PERSISTENTSETTINGS_MODIFIED corresponding to the current state of persistent module settings
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_PERSISTENTSETTINGS_INVALID.
     */
    function YModule_get_persistentSettings_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PERSISTENTSETTINGS_INVALID);
            } else {
                callback(context, obj, obj._persistentSettings);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YModule_set_persistentSettings(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('persistentSettings',rest_val);
    }

    /**
     * Returns the luminosity of the  module informative leds (from 0 to 100).
     * 
     * @return an integer corresponding to the luminosity of the  module informative leds (from 0 to 100)
     * 
     * On failure, throws an exception or returns YModule.LUMINOSITY_INVALID.
     */
    function YModule_get_luminosity()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LUMINOSITY_INVALID;
            }
        }
        return this._luminosity;
    }

    /**
     * Gets the luminosity of the  module informative leds (from 0 to 100).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the luminosity of the  module informative leds (from 0 to 100)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LUMINOSITY_INVALID.
     */
    function YModule_get_luminosity_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LUMINOSITY_INVALID);
            } else {
                callback(context, obj, obj._luminosity);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the luminosity of the module informative leds. The parameter is a
     * value between 0 and 100.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : an integer corresponding to the luminosity of the module informative leds
     * 
     * @return YAPI.SUCCESS if the call succeeds.
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
     * @return either YModule.BEACON_OFF or YModule.BEACON_ON, according to the state of the localization beacon
     * 
     * On failure, throws an exception or returns YModule.BEACON_INVALID.
     */
    function YModule_get_beacon()
    {
        var dev;                    // YDevice;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            dev = this._getDev();
            if (!(dev == null)) {
                return dev.getBeacon();
            }
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BEACON_INVALID;
            }
        }
        return this._beacon;
    }

    /**
     * Gets the state of the localization beacon.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:either Y_BEACON_OFF or Y_BEACON_ON, according to the state of the localization beacon
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_BEACON_INVALID.
     */
    function YModule_get_beacon_async(callback,context)
    {
        var dev;                    // YDevice;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BEACON_INVALID);
            } else {
                callback(context, obj, obj._beacon);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Turns on or off the module localization beacon.
     * 
     * @param newval : either YModule.BEACON_OFF or YModule.BEACON_ON
     * 
     * @return YAPI.SUCCESS if the call succeeds.
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
     * On failure, throws an exception or returns YModule.UPTIME_INVALID.
     */
    function YModule_get_upTime()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_UPTIME_INVALID;
            }
        }
        return this._upTime;
    }

    /**
     * Gets the number of milliseconds spent since the module was powered on.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the number of milliseconds spent since the module was powered on
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_UPTIME_INVALID.
     */
    function YModule_get_upTime_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_UPTIME_INVALID);
            } else {
                callback(context, obj, obj._upTime);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current consumed by the module on the USB bus, in milli-amps.
     * 
     * @return an integer corresponding to the current consumed by the module on the USB bus, in milli-amps
     * 
     * On failure, throws an exception or returns YModule.USBCURRENT_INVALID.
     */
    function YModule_get_usbCurrent()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_USBCURRENT_INVALID;
            }
        }
        return this._usbCurrent;
    }

    /**
     * Gets the current consumed by the module on the USB bus, in milli-amps.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the current consumed by the module on the USB bus, in milli-amps
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_USBCURRENT_INVALID.
     */
    function YModule_get_usbCurrent_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_USBCURRENT_INVALID);
            } else {
                callback(context, obj, obj._usbCurrent);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the remaining number of seconds before the module restarts, or zero when no
     * reboot has been scheduled.
     * 
     * @return an integer corresponding to the remaining number of seconds before the module restarts, or zero when no
     *         reboot has been scheduled
     * 
     * On failure, throws an exception or returns YModule.REBOOTCOUNTDOWN_INVALID.
     */
    function YModule_get_rebootCountdown()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_REBOOTCOUNTDOWN_INVALID;
            }
        }
        return this._rebootCountdown;
    }

    /**
     * Gets the remaining number of seconds before the module restarts, or zero when no
     * reboot has been scheduled.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:an integer corresponding to the remaining number of seconds before the module
     *         restarts, or zero when no
     *         reboot has been scheduled
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_REBOOTCOUNTDOWN_INVALID.
     */
    function YModule_get_rebootCountdown_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_REBOOTCOUNTDOWN_INVALID);
            } else {
                callback(context, obj, obj._rebootCountdown);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YModule_set_rebootCountdown(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('rebootCountdown',rest_val);
    }

    /**
     * Returns the number of USB interfaces used by the module.
     * 
     * @return either YModule.USBBANDWIDTH_SIMPLE or YModule.USBBANDWIDTH_DOUBLE, according to the number
     * of USB interfaces used by the module
     * 
     * On failure, throws an exception or returns YModule.USBBANDWIDTH_INVALID.
     */
    function YModule_get_usbBandwidth()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_USBBANDWIDTH_INVALID;
            }
        }
        return this._usbBandwidth;
    }

    /**
     * Gets the number of USB interfaces used by the module.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YModule object that invoked the callback
     *         - the result:either Y_USBBANDWIDTH_SIMPLE or Y_USBBANDWIDTH_DOUBLE, according to the number of USB
     *         interfaces used by the module
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_USBBANDWIDTH_INVALID.
     */
    function YModule_get_usbBandwidth_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_USBBANDWIDTH_INVALID);
            } else {
                callback(context, obj, obj._usbBandwidth);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
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
    function YModule_FindModule(func)                           // class method
    {
        var obj;                    // YModule;
        obj = YFunction._FindFromCache("Module", func);
        if (obj == null) {
            obj = new YModule(func);
            YFunction._AddToCache("Module", func, obj);
        }
        return obj;
    }

    /**
     * Saves current settings in the nonvolatile memory of the module.
     * Warning: the number of allowed save operations during a module life is
     * limited (about 100000 cycles). Do not call this function within a loop.
     * 
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_saveToFlash()
    {
        return this.set_persistentSettings(Y_PERSISTENTSETTINGS_SAVED);
    }

    /**
     * Reloads the settings stored in the nonvolatile memory, as
     * when the module is powered on.
     * 
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_revertFromFlash()
    {
        return this.set_persistentSettings(Y_PERSISTENTSETTINGS_LOADED);
    }

    /**
     * Schedules a simple module reboot after the given number of seconds.
     * 
     * @param secBeforeReboot : number of seconds before rebooting
     * 
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_reboot(secBeforeReboot)
    {
        return this.set_rebootCountdown(secBeforeReboot);
    }

    /**
     * Schedules a module reboot into special firmware update mode.
     * 
     * @param secBeforeReboot : number of seconds before rebooting
     * 
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YModule_triggerFirmwareUpdate(secBeforeReboot)
    {
        return this.set_rebootCountdown(-secBeforeReboot);
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
    function YModule_download(pathname)
    {
        return this._download(pathname);
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
        var content;                // bin;
        // may throw an exception
        content = this._download("logs.txt");
        return content.toString(YAPI.defaultEncoding);
    }

    /**
     * Continues the module enumeration started using yFirstModule().
     * 
     * @return a pointer to a YModule object, corresponding to
     *         the next module found, or a null pointer
     *         if there are no more modules to enumerate.
     */
    function YModule_nextModule()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YModule.FindModule(next_hwid);
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
    
    //--- (generated code: YModule initialization)
    YModule = YFunction._Subclass(_YModule, {
        // Constants
        PRODUCTNAME_INVALID         : YAPI_INVALID_STRING,
        SERIALNUMBER_INVALID        : YAPI_INVALID_STRING,
        PRODUCTID_INVALID           : YAPI_INVALID_UINT,
        PRODUCTRELEASE_INVALID      : YAPI_INVALID_UINT,
        FIRMWARERELEASE_INVALID     : YAPI_INVALID_STRING,
        PERSISTENTSETTINGS_LOADED   : 0,
        PERSISTENTSETTINGS_SAVED    : 1,
        PERSISTENTSETTINGS_MODIFIED : 2,
        PERSISTENTSETTINGS_INVALID  : -1,
        LUMINOSITY_INVALID          : YAPI_INVALID_UINT,
        BEACON_OFF                  : 0,
        BEACON_ON                   : 1,
        BEACON_INVALID              : -1,
        UPTIME_INVALID              : YAPI_INVALID_LONG,
        USBCURRENT_INVALID          : YAPI_INVALID_UINT,
        REBOOTCOUNTDOWN_INVALID     : YAPI_INVALID_INT,
        USBBANDWIDTH_SIMPLE         : 0,
        USBBANDWIDTH_DOUBLE         : 1,
        USBBANDWIDTH_INVALID        : -1
    }, {
        // Class methods
        FindModule                  : YModule_FindModule,
        FirstModule                 : YModule_FirstModule
    }, {
        // Methods
        get_productName             : YModule_get_productName,
        productName                 : YModule_get_productName,
        get_productName_async       : YModule_get_productName_async,
        productName_async           : YModule_get_productName_async,
        get_serialNumber            : YModule_get_serialNumber,
        serialNumber                : YModule_get_serialNumber,
        get_serialNumber_async      : YModule_get_serialNumber_async,
        serialNumber_async          : YModule_get_serialNumber_async,
        get_productId               : YModule_get_productId,
        productId                   : YModule_get_productId,
        get_productId_async         : YModule_get_productId_async,
        productId_async             : YModule_get_productId_async,
        get_productRelease          : YModule_get_productRelease,
        productRelease              : YModule_get_productRelease,
        get_productRelease_async    : YModule_get_productRelease_async,
        productRelease_async        : YModule_get_productRelease_async,
        get_firmwareRelease         : YModule_get_firmwareRelease,
        firmwareRelease             : YModule_get_firmwareRelease,
        get_firmwareRelease_async   : YModule_get_firmwareRelease_async,
        firmwareRelease_async       : YModule_get_firmwareRelease_async,
        get_persistentSettings      : YModule_get_persistentSettings,
        persistentSettings          : YModule_get_persistentSettings,
        get_persistentSettings_async : YModule_get_persistentSettings_async,
        persistentSettings_async    : YModule_get_persistentSettings_async,
        set_persistentSettings      : YModule_set_persistentSettings,
        setPersistentSettings       : YModule_set_persistentSettings,
        get_luminosity              : YModule_get_luminosity,
        luminosity                  : YModule_get_luminosity,
        get_luminosity_async        : YModule_get_luminosity_async,
        luminosity_async            : YModule_get_luminosity_async,
        set_luminosity              : YModule_set_luminosity,
        setLuminosity               : YModule_set_luminosity,
        get_beacon                  : YModule_get_beacon,
        beacon                      : YModule_get_beacon,
        get_beacon_async            : YModule_get_beacon_async,
        beacon_async                : YModule_get_beacon_async,
        set_beacon                  : YModule_set_beacon,
        setBeacon                   : YModule_set_beacon,
        get_upTime                  : YModule_get_upTime,
        upTime                      : YModule_get_upTime,
        get_upTime_async            : YModule_get_upTime_async,
        upTime_async                : YModule_get_upTime_async,
        get_usbCurrent              : YModule_get_usbCurrent,
        usbCurrent                  : YModule_get_usbCurrent,
        get_usbCurrent_async        : YModule_get_usbCurrent_async,
        usbCurrent_async            : YModule_get_usbCurrent_async,
        get_rebootCountdown         : YModule_get_rebootCountdown,
        rebootCountdown             : YModule_get_rebootCountdown,
        get_rebootCountdown_async   : YModule_get_rebootCountdown_async,
        rebootCountdown_async       : YModule_get_rebootCountdown_async,
        set_rebootCountdown         : YModule_set_rebootCountdown,
        setRebootCountdown          : YModule_set_rebootCountdown,
        get_usbBandwidth            : YModule_get_usbBandwidth,
        usbBandwidth                : YModule_get_usbBandwidth,
        get_usbBandwidth_async      : YModule_get_usbBandwidth_async,
        usbBandwidth_async          : YModule_get_usbBandwidth_async,
        saveToFlash                 : YModule_saveToFlash,
        revertFromFlash             : YModule_revertFromFlash,
        reboot                      : YModule_reboot,
        triggerFirmwareUpdate       : YModule_triggerFirmwareUpdate,
        download                    : YModule_download,
        get_icon2d                  : YModule_get_icon2d,
        icon2d                      : YModule_get_icon2d,
        get_lastLogs                : YModule_get_lastLogs,
        lastLogs                    : YModule_get_lastLogs,
        nextModule                  : YModule_nextModule,
        _parseAttr                  : YModule_parseAttr
    });
    //--- (end of generated code: YModule initialization)
    YModule.prototype._getDev               = YModule_getDev;
    YModule.prototype.functionCount         = YModule_functionCount;
    YModule.prototype.functionId            = YModule_functionId;
    YModule.prototype.functionName          = YModule_functionName;
    YModule.prototype.functionValue         = YModule_functionValue;
    YModule.prototype.loadUrl               = YModule_loadUrl;
    YModule.prototype.get_logicalName       = YModule_get_logicalName;
    YModule.prototype.logicalName           = YModule_get_logicalName;
    YModule.prototype.get_logicalName_async = YModule_get_logicalName_async;
    YModule.prototype.logicalName_async     = YModule_get_logicalName_async;

/**
 * Backward-compatibility for devices prior to revision 13890
 * 
 * Older embedded yocto_dev.js was instantiating functions using
 * an object constructor pointed by YAPI.newFunction
 */

    // for backward-compatibility
    YAPI.newFunction = function(str_classname,str_func) {
        // Assume all old functions inherit from YSensor,
        // too much is better than not enough
        for(var k in YSensor.prototype) {
            this[k] = YSensor.prototype[k];
        }
        YSensor.call(this, str_func);
        this._className = str_classname;
    }
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
 * When YAPI.DETECT_NONE is used as detection mode,
 * you must explicitly use yRegisterHub() to point the API to the
 * VirtualHub on which your devices are connected before trying to access them.
 * 
 * @param mode : an integer corresponding to the type of automatic
 *         device detection to use. Possible values are
 *         YAPI.DETECT_NONE, YAPI.DETECT_USB, YAPI.DETECT_NET,
 *         and YAPI.DETECT_ALL.
 * @param errmsg : a string passed by reference to receive any error message.
 * 
 * @return YAPI.SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function yInitAPI(mode,errmsg) 
{
    return YAPI.InitAPI(mode,errmsg);
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
 * parameter will determine how the API will work. Use the following values:
 * 
 * <b>usb</b>: When the usb keyword is used, the API will work with
 * devices connected directly to the USB bus. Some programming languages such a Javascript,
 * PHP, and Java don't provide direct access to USB hardware, so usb will
 * not work with these. In this case, use a VirtualHub or a networked YoctoHub (see below).
 * 
 * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
 * host with the given IP address or hostname. That host can be a regular computer
 * running a VirtualHub, or a networked YoctoHub such as YoctoHub-Ethernet or
 * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
 * computer, use the IP address 127.0.0.1.
 * 
 * <b>callback</b>: that keyword make the API run in "<i>HTTP Callback</i>" mode.
 * This a special mode allowing to take control of Yoctopuce devices
 * through a NAT filter when using a VirtualHub or a networked YoctoHub. You only
 * need to configure your hub to call your server script on a regular basis.
 * This mode is currently available for PHP and Node.JS only.
 * 
 * Be aware that only one application can use direct USB access at a
 * given time on a machine. Multiple access would cause conflicts
 * while trying to access the USB modules. In particular, this means
 * that you must stop the VirtualHub software before starting
 * an application that uses direct USB access. The workaround
 * for this limitation is to setup the library to use the VirtualHub
 * rather than direct USB access.
 * 
 * If access control has been activated on the hub, virtual or not, you want to
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
 * @return YAPI.SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function yRegisterHub(url,errmsg)
{
    return YAPI.RegisterHub(url,errmsg);
}

/**
 * Fault-tolerant alternative to RegisterHub(). This function has the same
 * purpose and same arguments as RegisterHub(), but does not trigger
 * an error when the selected hub is not available at the time of the function call.
 * This makes it possible to register a network hub independently of the current
 * connectivity, and to try to contact it only when a device is actively needed.
 * 
 * @param url : a string containing either "usb","callback" or the
 *         root URL of the hub to monitor
 * @param errmsg : a string passed by reference to receive any error message.
 * 
 * @return YAPI.SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function yPreregisterHub(url,errmsg)
{
    return YAPI.PreregisterHub(url,errmsg);
}

/**
 * Setup the Yoctopuce library to no more use modules connected on a previously
 * registered machine with RegisterHub.
 * 
 * @param url : a string containing either "usb" or the
 *         root URL of the hub to monitor
 */
function yUnregisterHub(url)
{
    YAPI.UnregisterHub(url);
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
 * @return YAPI.SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function yUpdateDeviceList(errmsg)
{
    return YAPI.UpdateDeviceList(errmsg);
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
 *         context object, the result code (YAPI.SUCCESS
 *         if the operation completes successfully) and the error
 *         message.
 * @param context : caller-specific object that is passed as-is to the callback function
 * 
 * @return nothing : the result is provided to the callback.
 */
function yUpdateDeviceList_async(callback, context)
{
    return YAPI.UpdateDeviceList_async(callback, context);
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
 * @return YAPI.SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function yHandleEvents(errmsg)
{ 
    return YAPI.HandleEvents(errmsg); 
}

/**
 * Pauses the execution flow for a specified duration.
 * This function implements a passive waiting loop, meaning that it does not
 * consume CPU cycles significantly. The processor is left available for
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
 * @return YAPI.SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function ySleep(ms_duration, errmsg)
{ 
    return YAPI.Sleep(ms_duration, errmsg); 
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
 * @return YAPI.SUCCESS when the call succeeds.
 * 
 * On failure, throws an exception or returns a negative error code.
 */
function ySetTimeout(callback, ms_timeout, arguments)
{ 
    var allArgs = [callback, ms_timeout];
    if(arguments) allArgs.push(arguments);
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
function yCheckLogicalName(name)
{
    return YAPI.CheckLogicalName(name);
}

/**
 * Register a callback function, to be called each time
 * a device is plugged. This callback will be invoked while yUpdateDeviceList
 * is running. You will have to call this function on a regular basis.
 * 
 * @param arrivalCallback : a procedure taking a YModule parameter, or null
 *         to unregister a previously registered  callback.
 */
function yRegisterDeviceArrivalCallback(arrivalCallback)
{
    return YAPI.RegisterDeviceArrivalCallback(arrivalCallback);
}

function yRegisterDeviceChangeCallback(changeCallback)
{
    return YAPI.RegisterDeviceChangeCallback(changeCallback);
}

/**
 * Register a callback function, to be called each time
 * a device is unplugged. This callback will be invoked while yUpdateDeviceList
 * is running. You will have to call this function on a regular basis.
 * 
 * @param removalCallback : a procedure taking a YModule parameter, or null
 *         to unregister a previously registered  callback.
 */
function yRegisterDeviceRemovalCallback(removalCallback)
{
    return YAPI.RegisterDeviceRemovalCallback(removalCallback);
}

// Register a new value calibration handler for a given calibration type
//
function yRegisterCalibrationHandler(calibrationType, calibrationHandler)
{
    return YAPI.RegisterCalibrationHandler(calibrationType, calibrationHandler);
}

// Standard value calibration handler (n-point linear error correction)
//
var yLinearCalibrationHandler = YAPI.LinearCalibrationHandler;

//--- (generated code: Sensor functions)

/**
 * Retrieves a sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSensor.isOnline() to test if the sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the sensor
 * 
 * @return a YSensor object allowing you to drive the sensor.
 */
function yFindSensor(func)
{
    return YSensor.FindSensor(func);
}

/**
 * Starts the enumeration of sensors currently accessible.
 * Use the method YSensor.nextSensor() to iterate on
 * next sensors.
 * 
 * @return a pointer to a YSensor object, corresponding to
 *         the first sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstSensor()
{
    return YSensor.FirstSensor();
}

//--- (end of generated code: Sensor functions)

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
function yFindModule(func)
{
    return YModule.FindModule(func);
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

