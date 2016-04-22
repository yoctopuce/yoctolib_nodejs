/*********************************************************************
 *
 * $Id: yocto_testsuite.js 23786 2016-04-07 15:47:02Z seb $
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

//--- (generated code: YTestSuite return codes)
//--- (end of generated code: YTestSuite return codes)
//--- (generated code: YTestSuite definitions)
//--- (end of generated code: YTestSuite definitions)

//--- (generated code: YTestSuite class start)
/**
 * YTestSuite Class: DisplayLayer object interface
 *
 * The Yoctopuce class YPressure allows you to read and configure Yoctopuce pressure
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 */
//--- (end of generated code: YTestSuite class start)

var YTestSuite; // definition below
(function()
{
    function _YTestSuite(str_func)
    {
        //--- (generated code: YTestSuite constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'TestSuite';

        //--- (end of generated code: YTestSuite constructor)
    }

    //--- (generated code: YTestSuite implementation)

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
        bin_val = new Buffer("", YAPI.defaultEncoding);
        //fixme: handle this test correctly
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
        //may throw an exception connection
        //res = YAPI.TestHub(WITH_ERRMSG("http://172.17.17.1", 100));
        //IF(STR_EQUAL(res, "")),RETURN("YAPI.TestHub failed for http")
        //res = YAPI.TestHub(WITH_ERRMSG("ws://172.17.17.1", 100));
        //IF(STR_EQUAL(res, "")),RETURN("YAPI.TestHub failed for ws")
        console.log("Test HTTP connections.");
        res = this.RunTestOnBench("172.17.17.142");
        if (!(res == "")) {
            return res;
        }
        console.log("Test WebSocket connections.");
        res = this.RunTestOnBench("ws://172.17.17.142");
        if (!(res == "")) {
            return res;
        }
        console.log("TestSuite success!");
        return "";
    }

    function YTestSuite_RunTestOnBench(url)
    {
        var m;                      // YModule;
        var serial;                 // str;
        var product;                // str;
        var firmware;               // str;
        var tmp;                    // str;
        var res;                    // int;
        //may throw an exception
        res = YAPI.TestHub(url, 100);
        if (res < 0) {
            return "unable to reach " + url;
        }
        // may throw an exception
        console.log("  Register url with url: " + url);
        res = YAPI.RegisterHub(url);
        if (res < 0) {
            return "unable to RegisterHub " + url;
        }
        console.log("  List connected devices:");
        m = YModule.FirstModule();
        while (!(m == null)) {
            serial = m.get_serialNumber();
            product = m.get_productName();
            firmware = m.get_firmwareRelease();
            tmp = "   - " + product + ": " + serial + " (firm=" + firmware + ")";
            console.log(tmp);
            m = m.nextModule();
        }
        // run perfomance test
        console.log("  Run Fw Update test");
        tmp = this.TestFwUpdate();
        if (!(tmp == "")) {
            return tmp;
        }
        // run perfomance test
        console.log("  Run perfomance test");
        tmp = this.RunPerfTest();
        if (!(tmp == "")) {
            return tmp;
        }
        // run save/restore settings
        console.log("  Run save/restore settings test");
        tmp = this.TestSaveSettings();
        if (!(tmp == "")) {
            return tmp;
        }
        YAPI.UnregisterHub(url);
        return "";
    }

    function YTestSuite_TestSaveSettings()
    {
        var m;                      // YModule;
        var f;                      // YFiles;
        var allSettings;            // bin;
        var tmp;                    // str;
        // may throw an exception
        m = YModule.FindModule("YHUBETH1-22D8A.module");
        f = YFiles.FindFiles("YHUBETH1-22D8A.files");
        console.log("  Prepare hub for test.");
        m.set_logicalName("ok");
        console.log("   - format fs");
        f.format_fs();
        console.log("   - upload test file");
        f.upload("test_file.txt",new Buffer("This Is a Test{\"task1\":{\"interval\":500,\"script\":[{\"writeHex\":\"61\"},{\"expect\":\"($1:BYTE)\"}]}}", YAPI.defaultEncoding));
        console.log("   - upload done");
        tmp = m.get_logicalName();
        if (!(tmp == "ok")) {
            return "Error:  YModule.set_logicalname(ok)";
        }
        console.log("   - get file count");
        if (f.get_filesCount() != 1) {
            return "Error: YFiles.upload()";
        }
        console.log("  Get all settings.");
        allSettings = m.get_allSettings();
        tmp = allSettings.toString(YAPI.defaultEncoding);
        console.log("  Set invalid settings.");
        m.set_logicalName("error");
        console.log("   - format fs");
        f.format_fs();
        tmp = m.get_logicalName();
        if (!(tmp == "error")) {
            return "Error: YModule.set_logicalname(error)";
        }
        console.log("   - get file count");
        if (f.get_filesCount() != 0) {
            return "Error: YFiles.format_fs()";
        }
        console.log("  Restore all settings and files.");
        m.set_allSettingsAndFiles(allSettings);
        console.log("   - verify settings and files.");
        tmp = m.get_logicalName();
        if (!(tmp == "ok")) {
            return "Error: files not restored";
        }
        console.log("  Cleanup m hub.");
        m.set_logicalName("error");
        console.log("  Restore settings only.");
        m.set_allSettings(allSettings);
        console.log("   - verify settings only.");
        tmp = m.get_logicalName();
        if (!(tmp == "ok")) {
            return "Error: files not restored";
        }
        console.log("  TestSaveSettings success.");
        return "";
    }

    function YTestSuite_RunPerfTest()
    {
        var m;                      // YModule;
        var relay1;                 // YRelay;
        var input1;                 // YAnButton;
        var i;                      // int;
        var sum1;                   // int;
        var cnt1;                   // int;
        var reftime;                // u64;
        var pulse_counter;          // long;
        // may throw an exception
        console.log("  Using lib " + YAPI.GetAPIVersion());
        input1 = YAnButton.FindAnButton("input1");
        if (!(input1.isOnline())) {
            return "No AnButton named 'input1' found, check cable!";
        }
        m = input1.get_module();
        console.log("  Use Knob " + m.get_serialNumber() + " (" + m.get_firmwareRelease() + ")");
        relay1 = YRelay.FindRelay("relay1");
        if (!(input1.isOnline()) || !(relay1.isOnline())) {
            return "No Relay named 'relay1' found, check cable!";
        }
        m = relay1.get_module();
        console.log("  Use Relay " + m.get_serialNumber() + " (" + m.get_firmwareRelease() + ")");
        reftime = YAPI.GetTickCount();
        i = 0;
        while (i < 64) {
            relay1.set_state(YRelay.STATE_B);
            relay1.set_state(YRelay.STATE_A);
            i = i + 1;
        }
        reftime = YAPI.GetTickCount() - reftime;
        console.log("   - Average 'set'     time: "+String(Math.round(reftime))+" / 128 = "+String(Math.round(reftime / 128.0*1000)/1000)+"ms");
        YAPI.Sleep(3000);
        reftime = YAPI.GetTickCount();
        i = 0;
        while (i < 32) {
            if (((i) & (1)) == 1) {
                relay1.set_state(YRelay.STATE_A);
            } else {
                relay1.set_state(YRelay.STATE_B);
            }
            relay1.get_state();
            i = i + 1;
        }
        reftime = YAPI.GetTickCount() - reftime;
        console.log("   - Average 'set/get' time: "+String(Math.round(reftime))+" / 32 = "+String(Math.round(reftime / 32*1000)/1000)+"ms");
        input1.set_pulseCounter(0);
        YAPI.Sleep(3000);
        sum1 = 0;
        cnt1 = 0;
        i = 0;
        while (i < 32) {
            reftime = YAPI.GetTickCount();
            if (((i) & (1)) == 1) {
                relay1.set_state(YRelay.STATE_A);
            } else {
                relay1.set_state(YRelay.STATE_B);
            }
            reftime = YAPI.GetTickCount() - reftime;
            cnt1 = cnt1 + 1;
            sum1 = sum1 + reftime;
            YAPI.Sleep(50);
            i = i + 1;
        }
        console.log("   - Average command time:   "+String(Math.round(sum1))+" / "+String(Math.round(cnt1))+" = "+String(Math.round(sum1 / cnt1*1000)/1000)+"ms");
        pulse_counter = input1.get_pulseCounter();
        console.log("   - puse counter = "+String(Math.round(pulse_counter)));
        return "";
    }

    function YTestSuite_upgradeSerialList(allserials)
    {
        var ii; // iterator
        var m;                      // YModule;
        var current;                // str;
        var product;                // str;
        var newfirm;                // str;
        var update;                 // YFirmwareUpdate;
        var status;                 // int;
        var newstatus;              // int;
        //may throw an exception
        for (ii in  allserials) {
            if(ii=='indexOf') continue; // IE8 Don'tEnum bug
            m = YModule.FindModule( allserials[ii]);
            product = m.get_productName();
            current = m.get_firmwareRelease();
            newfirm = m.checkFirmware("www.yoctopuce.com", true);
            if (newfirm == "") {
                console.log("  - " + product + " " +  allserials[ii] + "(rev=" + current + ") is up to date");
            } else {
                console.log("  - " + product + " " +  allserials[ii] + "(rev=" + current + ") need be updated with firmware :");
                console.log("      " + newfirm);
                update = m.updateFirmware(newfirm);
                status = update.startUpdate();
                while ((status < 100) && (status >=0)) {
                    newstatus =  update.get_progress();
                    if (newstatus != status) {
                        console.log("    "+String(Math.round(newstatus))+" "+update.get_progressMessage());
                    }
                    YAPI.Sleep(1000);
                    status = newstatus;
                }
                if (status < 0) {
                    return update.get_progressMessage();
                }
                if (m.isOnline()) {
                    console.log("Firmware Updated Successfully!");
                } else {
                    return status + " Firmware Update failed: module " +  allserials[ii] + "is not online";
                }
            }
        }
        return "";
    }

    function YTestSuite_TestFwUpdate()
    {
        var hubs = [];              // strArr;
        var shields = [];           // strArr;
        var devices = [];           // strArr;
        var m;                      // YModule;
        var tmp;                    // str;
        var serial;                 // str;
        var product;                // str;
        //may throw an exception
        m = YModule.FirstModule();
        while (!(m == null)) {
            serial = m.get_serialNumber();
            product = m.get_productName();
            if (product == "YoctoHub-Shield") {
                shields.push(serial);
            } else {
                tmp = (product).substr( 0, 8);
                if (tmp == "YoctoHub") {
                    hubs.push(serial);
                } else {
                    if (!(product == "VirtualHub")) {
                        devices.push(serial);
                    }
                }
            }
            m = m.nextModule();
        }
        // first upgrades all Hubs..
        this.upgradeSerialList(hubs);
        // .. then all shield.
        this.upgradeSerialList(shields);
        // .. and finaly all devices
        this.upgradeSerialList(devices);
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

    //--- (end of generated code: YTestSuite implementation)

    //--- (generated code: YTestSuite initialization)
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
        RunTestOnBench              : YTestSuite_RunTestOnBench,
        TestSaveSettings            : YTestSuite_TestSaveSettings,
        RunPerfTest                 : YTestSuite_RunPerfTest,
        upgradeSerialList           : YTestSuite_upgradeSerialList,
        TestFwUpdate                : YTestSuite_TestFwUpdate,
        nextTestSuite               : YTestSuite_nextTestSuite
    });
    //--- (end of generated code: YTestSuite initialization)
})();

//--- (generated code: TestSuite functions)

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

//--- (end of generated code: TestSuite functions)
