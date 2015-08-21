/*********************************************************************
 *
 * $Id: pic24config.php 20732 2015-06-24 07:26:23Z mvuilleu $
 *
 * Implements the high-level API for TestSuite functions
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
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED 'AS IS' WITHOUT
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

if(typeof YAPI == "undefined") { if(typeof yAPI != "undefined") window["YAPI"]=yAPI; else throw "YAPI is not defined, please include yocto_api.js first"; }

//--- (YTestSuite return codes)
//--- (end of YTestSuite return codes)
//--- (YTestSuite definitions)
//--- (end of YTestSuite definitions)

//--- (YTestSuite class start)
/**
 * YTestSuite Class: DisplayLayer object interface
 *
 * The Yoctopuce class YPressure allows you to read and configure Yoctopuce pressure
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 */
//--- (end of YTestSuite class start)

var YTestSuite; // definition below
(function()
{
    function _YTestSuite(str_func)
    {
        //--- (YTestSuite constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'TestSuite';

        //--- (end of YTestSuite constructor)
    }

    //--- (YTestSuite implementation)

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
     * Use the method YTestSuite.isOnline() to test if the function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the function
     *
     * @return a YTestSuite object allowing you to drive the function.
     */
    function YTestSuite_FindTestSuite(func)                     // class method
    {
        var obj;                    // YTestSuite;
        obj = YFunction._FindFromCache("TestSuite", func);
        if (obj == null) {
            obj = new YTestSuite(func);
            YFunction._AddToCache("TestSuite", func, obj);
        }
        return obj;
    }

    function YTestSuite_test_json()
    {
        var bin_val;                // bin;
        var val;                    // str;
        var json;                   // str;
        bin_val = new Buffer("\"abcd1234'\\\"abcd\"", YAPI.defaultEncoding);
        //may throw an exception
        val = this._json_get_string(bin_val);
        if (!(val == "abcd1234'\"abcd")) {
            return "Error in _json_get_string function(\"abcd1234'\\\"abcd\")";
        }
        //bin_val = STR2BIN("");
        //val = this._json_get_string(bin_val);
        //IF(NOT(STR_EQUAL(val,"")), RETURN("Error in _json_get_string function(\"\""));
        json = "{\"module\": {\"productName\": \"YoctoHub-Ethernet\",\"serialNumber\": \"YHUBETH1-10EEB\",\"logicalName\": \"\",\"productId\": 14,\"upTime\": 33793},\"network\": {\"ipConfig\": \"DHCP:169.254.45.138/16/169.254.0.1\",\"callbackUrl\": \"http://e.g/i/post.json?apikey=c4a35&json=\",\"callbackMethod\": 1,\"poeCurrent\": 150},\"services\": {\"whitePages\": [{\"serialNumber\": \"YHUBETH1-10EEB\",\"logicalName\": \"[\\\"'\\\\]\",\"productName\": \"YoctoHub-Ethernet\",\"networkUrl\": \"/api\"},{\"serialNumber\": \"LIGHTMK2-39087\",\"logicalName\": \"\",\"productName\": \"Yocto-Light-V2\",\"networkUrl\": \"/bySerial/LIGHTMK2-39087/api\"}],\"yellowPages\": {\"HubPort\": [{\"baseType\": 0,\"advertisedValue\": \"ON\"},{\"baseType\": 0,\"advertisedValue\": \"ON\"}]}}}";
        val = this._get_json_path(json, "module|serialNumber");
        if (!(val == "\"YHUBETH1-10EEB\"")) {
            return "Error in _get_json_path(\"module|serialNumber\"";
        }
        val = this._decode_json_string(val);
        if (!(val == "YHUBETH1-10EEB")) {
            return "Error in _decode_json_string(\"\\\"YHUBETH1-10EEB\\\"\"";
        }
        val = this._get_json_path(json, "module|productId");
        if (!(val == "14")) {
            return "Error in _json_get_path function(\"module|productId\"";
        }
        val = this._get_json_path(json, "services|whitePages|1|networkUrl");
        val = this._decode_json_string(val);
        if (!(val == "/bySerial/LIGHTMK2-39087/api")) {
            return "Error in _json_get_path(\"services|whitePages|1|networkUrl\"";
        }
        val = this._get_json_path(json, "network");
        if ((val).length < 143) {
            return "Error in _json_get_path(\"network\"";
        }
        return "";
    }

    function YTestSuite_test_atoi()
    {
        var val;                    // str;
        var res;                    // int;
        val = "32";
        res = YAPI._atoi(val);
        if (res != 32) {
            return val;
        }
        val = "+32";
        res = YAPI._atoi(val);
        if (res != 32) {
            return val;
        }
        val = "-32";
        res = YAPI._atoi(val);
        if (res != -32) {
            return val;
        }
        val = "32.54";
        res = YAPI._atoi(val);
        if (res != 32) {
            return val;
        }
        val = "asasdf";
        res = YAPI._atoi(val);
        if (res != 0) {
            return val;
        }
        val = "   32";
        res = YAPI._atoi(val);
        if (res != 32) {
            return val;
        }
        val = "   -32pouet";
        res = YAPI._atoi(val);
        if (res != -32) {
            return val;
        }
        val = "-32.8";
        res = YAPI._atoi(val);
        if (res != -32) {
            return val;
        }
        val = "";
        res = YAPI._atoi(val);
        if (res != 0) {
            return "empty";
        }
        return "";
    }

    function YTestSuite_test_str_bin_hex()
    {
        var org_str;                // str;
        var bindata;                // bin;
        var hex_str;                // str;
        var final_str;              // str;
        org_str = "This Is a Test 2+2=4";
        bindata = new Buffer(org_str, YAPI.defaultEncoding);
        hex_str = YAPI._bytesToHexStr(bindata);
        if (!(hex_str == "546869732049732061205465737420322B323D34")) {
            return "Error: in string to bin to hex string";
        }
        bindata = YAPI._hexStrToBin(hex_str);
        final_str = bindata.toString(YAPI.defaultEncoding);
        if (!(final_str == org_str)) {
            return "Error: in hex string to bin to string";
        }
        return "";
    }

    function YTestSuite_Run()
    {
        var res;                    // str;
        console.log("Start test suite.");
        res = "Test API version: " + YAPI.GetAPIVersion();
        console.log(res);
        console.log(" - test atoi functions.");
        res = this.test_atoi();
        if (!(res == "")) {
            return res;
        }
        console.log(" - test bin functions.");
        res = this.test_str_bin_hex();
        if (!(res == "")) {
            return res;
        }
        console.log(" - test json functions.");
        //may throw an exception
        res = this.test_json();
        if (!(res == "")) {
            return res;
        }
        // may throw an exception
        //res = this.Run2();
        //IF(NOT(STR_EQUAL(res,"")), RETURN(res));
        return "TestSuite success!";
    }

    function YTestSuite_Run2()
    {
        var ii; // iterator
        var mo;                     // YModule;
        var dst;                    // YModule;
        var serial;                 // str;
        var product;                // str;
        var relays = [];            // strArr;
        var allSettings;            // bin;
        var tmp;                    // str;
        // may throw an exception
        console.log("Register hubs 172.17.17.73 and 172.17.17.61.");
        YAPI.RegisterHub("172.17.17.89");
        YAPI.RegisterHub("172.17.17.61");
        mo = YModule.FirstModule();
        while (!(mo == null)) {
            serial = mo.get_serialNumber();
            product = mo.get_productName();
            tmp = serial + " (" + product + ")";
            console.log(tmp);
            relays = mo.get_functionIds("Relay");
            for (ii in  relays) {
                if(ii=='indexOf') continue; // IE8 Don'tEnum bug
                tmp = "   - " +  relays[ii];
                console.log(tmp);;
            }
            mo = mo.nextModule();
        }
        mo = YModule.FindModule("YHUBETH1-22D8A.module");
        dst = YModule.FindModule("YHUBETH1-10EEB.module");
        console.log("get all settings.");
        allSettings = mo.get_allSettings_dev();
        tmp = allSettings.toString(YAPI.defaultEncoding);
        console.log("restore settings.");
        dst.set_allSettings_dev(allSettings);
        YAPI.FreeAPI();
        return "";
    }

    /**
     * Continues the enumeration of functions started using yFirstTestSuite().
     *
     * @return a pointer to a YTestSuite object, corresponding to
     *         a function currently online, or a null pointer
     *         if there are no more functions to enumerate.
     */
    function YTestSuite_nextTestSuite()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YTestSuite.FindTestSuite(next_hwid);
    }

    /**
     * Starts the enumeration of functions currently accessible.
     * Use the method YTestSuite.nextTestSuite() to iterate on
     * next functions.
     *
     * @return a pointer to a YTestSuite object, corresponding to
     *         the first function currently online, or a null pointer
     *         if there are none.
     */
    function YTestSuite_FirstTestSuite()
    {
        var next_hwid = YAPI.getFirstHardwareId('TestSuite');
        if(next_hwid == null) return null;
        return YTestSuite.FindTestSuite(next_hwid);
    }

    //--- (end of YTestSuite implementation)

    //--- (YTestSuite initialization)
    YTestSuite = YFunction._Subclass(_YTestSuite, {
    }, {
        // Class methods
        FindTestSuite               : YTestSuite_FindTestSuite,
        FirstTestSuite              : YTestSuite_FirstTestSuite
    }, {
        // Methods
        test_json                   : YTestSuite_test_json,
        test_atoi                   : YTestSuite_test_atoi,
        test_str_bin_hex            : YTestSuite_test_str_bin_hex,
        Run                         : YTestSuite_Run,
        Run2                        : YTestSuite_Run2,
        nextTestSuite               : YTestSuite_nextTestSuite
    });
    //--- (end of YTestSuite initialization)
})();

//--- (TestSuite functions)

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
 * Use the method YTestSuite.isOnline() to test if the function is
 * indeed online at a given time. In case of ambiguity when looking for
 * a function by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the function
 *
 * @return a YTestSuite object allowing you to drive the function.
 */
function yFindTestSuite(func)
{
    return YTestSuite.FindTestSuite(func);
}

/**
 * Starts the enumeration of functions currently accessible.
 * Use the method YTestSuite.nextTestSuite() to iterate on
 * next functions.
 *
 * @return a pointer to a YTestSuite object, corresponding to
 *         the first function currently online, or a null pointer
 *         if there are none.
 */
function yFirstTestSuite()
{
    return YTestSuite.FirstTestSuite();
}

//--- (end of TestSuite functions)
