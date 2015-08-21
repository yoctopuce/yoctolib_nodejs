/*********************************************************************
 *
 * $Id: yocto_temperature.js 21211 2015-08-19 16:03:29Z seb $
 *
 * Implements the high-level API for Temperature functions
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

//--- (YTemperature return codes)
//--- (end of YTemperature return codes)
//--- (YTemperature definitions)
var Y_SENSORTYPE_DIGITAL            = 0;
var Y_SENSORTYPE_TYPE_K             = 1;
var Y_SENSORTYPE_TYPE_E             = 2;
var Y_SENSORTYPE_TYPE_J             = 3;
var Y_SENSORTYPE_TYPE_N             = 4;
var Y_SENSORTYPE_TYPE_R             = 5;
var Y_SENSORTYPE_TYPE_S             = 6;
var Y_SENSORTYPE_TYPE_T             = 7;
var Y_SENSORTYPE_PT100_4WIRES       = 8;
var Y_SENSORTYPE_PT100_3WIRES       = 9;
var Y_SENSORTYPE_PT100_2WIRES       = 10;
var Y_SENSORTYPE_RES_OHM            = 11;
var Y_SENSORTYPE_RES_NTC            = 12;
var Y_SENSORTYPE_RES_LINEAR         = 13;
var Y_SENSORTYPE_INVALID            = -1;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YTemperature definitions)

//--- (YTemperature class start)
/**
 * YTemperature Class: Temperature function interface
 *
 * The Yoctopuce class YTemperature allows you to read and configure Yoctopuce temperature
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 * This class adds the ability to configure some specific parameters for some
 * sensors (connection type, temperature mapping table).
 */
//--- (end of YTemperature class start)

var YTemperature; // definition below
(function()
{
    function _YTemperature(str_func)
    {
        //--- (YTemperature constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Temperature';

        this._sensorType                     = Y_SENSORTYPE_INVALID;       // TempSensorTypeAll
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YTemperature constructor)
    }

    //--- (YTemperature implementation)

    function YTemperature_parseAttr(name, val, _super)
    {
        switch(name) {
        case "sensorType":
            this._sensorType = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the measuring unit for the measured temperature. That unit is a string.
     * If that strings end with the letter F all temperatures values will returned in
     * Fahrenheit degrees. If that String ends with the letter K all values will be
     * returned in Kelvin degrees. If that string ends with the letter C all values will be
     * returned in Celsius degrees.  If the string ends with any other character the
     * change will be ignored. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the temperature function, a
     * unit system change will probably break it.
     *
     * @param newval : a string corresponding to the measuring unit for the measured temperature
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YTemperature_set_unit(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('unit',rest_val);
    }

    /**
     * Returns the temperature sensor type.
     *
     * @return a value among YTemperature.SENSORTYPE_DIGITAL, YTemperature.SENSORTYPE_TYPE_K,
     * YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J, YTemperature.SENSORTYPE_TYPE_N,
     * YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S, YTemperature.SENSORTYPE_TYPE_T,
     * YTemperature.SENSORTYPE_PT100_4WIRES, YTemperature.SENSORTYPE_PT100_3WIRES,
     * YTemperature.SENSORTYPE_PT100_2WIRES, YTemperature.SENSORTYPE_RES_OHM,
     * YTemperature.SENSORTYPE_RES_NTC and YTemperature.SENSORTYPE_RES_LINEAR corresponding to the
     * temperature sensor type
     *
     * On failure, throws an exception or returns YTemperature.SENSORTYPE_INVALID.
     */
    function YTemperature_get_sensorType()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SENSORTYPE_INVALID;
            }
        }
        return this._sensorType;
    }

    /**
     * Gets the temperature sensor type.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YTemperature object that invoked the callback
     *         - the result:a value among Y_SENSORTYPE_DIGITAL, Y_SENSORTYPE_TYPE_K, Y_SENSORTYPE_TYPE_E,
     *         Y_SENSORTYPE_TYPE_J, Y_SENSORTYPE_TYPE_N, Y_SENSORTYPE_TYPE_R, Y_SENSORTYPE_TYPE_S,
     *         Y_SENSORTYPE_TYPE_T, Y_SENSORTYPE_PT100_4WIRES, Y_SENSORTYPE_PT100_3WIRES,
     *         Y_SENSORTYPE_PT100_2WIRES, Y_SENSORTYPE_RES_OHM, Y_SENSORTYPE_RES_NTC and Y_SENSORTYPE_RES_LINEAR
     *         corresponding to the temperature sensor type
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_SENSORTYPE_INVALID.
     */
    function YTemperature_get_sensorType_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SENSORTYPE_INVALID);
            } else {
                callback(context, obj, obj._sensorType);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Modifies the temperature sensor type.  This function is used
     * to define the type of thermocouple (K,E...) used with the device.
     * It has no effect if module is using a digital sensor or a thermistor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YTemperature.SENSORTYPE_DIGITAL, YTemperature.SENSORTYPE_TYPE_K,
     * YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J, YTemperature.SENSORTYPE_TYPE_N,
     * YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S, YTemperature.SENSORTYPE_TYPE_T,
     * YTemperature.SENSORTYPE_PT100_4WIRES, YTemperature.SENSORTYPE_PT100_3WIRES,
     * YTemperature.SENSORTYPE_PT100_2WIRES, YTemperature.SENSORTYPE_RES_OHM,
     * YTemperature.SENSORTYPE_RES_NTC and YTemperature.SENSORTYPE_RES_LINEAR
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YTemperature_set_sensorType(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('sensorType',rest_val);
    }

    function YTemperature_get_command()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COMMAND_INVALID;
            }
        }
        return this._command;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YTemperature object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YTemperature_get_command_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COMMAND_INVALID);
            } else {
                callback(context, obj, obj._command);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YTemperature_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a temperature sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the temperature sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTemperature.isOnline() to test if the temperature sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a temperature sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the temperature sensor
     *
     * @return a YTemperature object allowing you to drive the temperature sensor.
     */
    function YTemperature_FindTemperature(func)                 // class method
    {
        var obj;                    // YTemperature;
        obj = YFunction._FindFromCache("Temperature", func);
        if (obj == null) {
            obj = new YTemperature(func);
            YFunction._AddToCache("Temperature", func, obj);
        }
        return obj;
    }

    /**
     * Configure NTC thermistor parameters in order to properly compute the temperature from
     * the measured resistance. For increased precision, you can enter a complete mapping
     * table using set_thermistorResponseTable. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param res25 : thermistor resistance at 25 degrees Celsius
     * @param beta : Beta value
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YTemperature_set_ntcParameters(res25,beta)
    {
        var t0;                     // float;
        var t1;                     // float;
        var res100;                 // float;
        var tempValues = [];        // floatArr;
        var resValues = [];         // floatArr;
        t0 = 25.0+275.15;
        t1 = 100.0+275.15;
        res100 = res25 * Math.exp(beta*(1.0/t1 - 1.0/t0));
        tempValues.length = 0;
        resValues.length = 0;
        tempValues.push(25.0);
        resValues.push(res25);
        tempValues.push(100.0);
        resValues.push(res100);
        return this.set_thermistorResponseTable(tempValues, resValues);
    }

    /**
     * Records a thermistor response table, in order to interpolate the temperature from
     * the measured resistance. This function can only be used with a temperature
     * sensor based on thermistors.
     *
     * @param tempValues : array of floating point numbers, corresponding to all
     *         temperatures (in degrees Celcius) for which the resistance of the
     *         thermistor is specified.
     * @param resValues : array of floating point numbers, corresponding to the resistance
     *         values (in Ohms) for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YTemperature_set_thermistorResponseTable(tempValues,resValues)
    {
        var siz;                    // int;
        var res;                    // int;
        var idx;                    // int;
        var found;                  // int;
        var prev;                   // float;
        var curr;                   // float;
        var currTemp;               // float;
        var idxres;                 // float;
        siz = tempValues.length;
        if (!(siz >= 2)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"thermistor response table must have at least two points",YAPI_INVALID_ARGUMENT);
        }
        if (!(siz == resValues.length)) {
            return this._throw(YAPI_INVALID_ARGUMENT,"table sizes mismatch",YAPI_INVALID_ARGUMENT);
        }
        // may throw an exception
        res = this.set_command("Z");
        if (!(res==YAPI_SUCCESS)) {
            return this._throw(YAPI_IO_ERROR,"unable to reset thermistor parameters",YAPI_IO_ERROR);
        }
        // add records in growing resistance value
        found = 1;
        prev = 0.0;
        while (found > 0) {
            found = 0;
            curr = 99999999.0;
            currTemp = -999999.0;
            idx = 0;
            while (idx < siz) {
                idxres = resValues[idx];
                if ((idxres > prev) && (idxres < curr)) {
                    curr = idxres;
                    currTemp = tempValues[idx];
                    found = 1;
                }
                idx = idx + 1;
            }
            if (found > 0) {
                res = this.set_command("m"+String(Math.round(Math.round(1000*curr)))+":"+String(Math.round(Math.round(1000*currTemp))));
                if (!(res==YAPI_SUCCESS)) {
                    return this._throw(YAPI_IO_ERROR,"unable to reset thermistor parameters",YAPI_IO_ERROR);
                }
                prev = curr;
            }
        }
        return YAPI_SUCCESS;
    }

    /**
     * Retrieves the thermistor response table previously configured using the
     * set_thermistorResponseTable function. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all temperatures (in degrees Celcius) for which the resistance
     *         of the thermistor is specified.
     * @param resValues : array of floating point numbers, that is filled by the function
     *         with the value (in Ohms) for each of the temperature included in the
     *         first argument, index by index.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YTemperature_loadThermistorResponseTable(tempValues,resValues)
    {
        var id;                     // str;
        var bin_json;               // bin;
        var paramlist = [];         // strArr;
        var templist = [];          // floatArr;
        var siz;                    // int;
        var idx;                    // int;
        var temp;                   // float;
        var found;                  // int;
        var prev;                   // float;
        var curr;                   // float;
        var currRes;                // float;
        tempValues.length = 0;
        resValues.length = 0;
        // may throw an exception
        id = this.get_functionId();
        id = (id).substr( 11, (id).length-1);
        bin_json = this._download("extra.json?page="+id);
        paramlist = this._json_get_array(bin_json);
        // first convert all temperatures to float
        siz = ((paramlist.length) >> (1));
        templist.length = 0;
        idx = 0;
        while (idx < siz) {
            temp = parseFloat(paramlist[2*idx+1])/1000.0;
            templist.push(temp);
            idx = idx + 1;
        }
        // then add records in growing temperature value
        tempValues.length = 0;
        resValues.length = 0;
        found = 1;
        prev = -999999.0;
        while (found > 0) {
            found = 0;
            curr = 999999.0;
            currRes = -999999.0;
            idx = 0;
            while (idx < siz) {
                temp = templist[idx];
                if ((temp > prev) && (temp < curr)) {
                    curr = temp;
                    currRes = parseFloat(paramlist[2*idx])/1000.0;
                    found = 1;
                }
                idx = idx + 1;
            }
            if (found > 0) {
                tempValues.push(curr);
                resValues.push(currRes);
                prev = curr;
            }
        }
        return YAPI_SUCCESS;
    }

    /**
     * Continues the enumeration of temperature sensors started using yFirstTemperature().
     *
     * @return a pointer to a YTemperature object, corresponding to
     *         a temperature sensor currently online, or a null pointer
     *         if there are no more temperature sensors to enumerate.
     */
    function YTemperature_nextTemperature()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YTemperature.FindTemperature(next_hwid);
    }

    /**
     * Starts the enumeration of temperature sensors currently accessible.
     * Use the method YTemperature.nextTemperature() to iterate on
     * next temperature sensors.
     *
     * @return a pointer to a YTemperature object, corresponding to
     *         the first temperature sensor currently online, or a null pointer
     *         if there are none.
     */
    function YTemperature_FirstTemperature()
    {
        var next_hwid = YAPI.getFirstHardwareId('Temperature');
        if(next_hwid == null) return null;
        return YTemperature.FindTemperature(next_hwid);
    }

    //--- (end of YTemperature implementation)

    //--- (YTemperature initialization)
    YTemperature = YSensor._Subclass(_YTemperature, {
        // Constants
        SENSORTYPE_DIGITAL          : 0,
        SENSORTYPE_TYPE_K           : 1,
        SENSORTYPE_TYPE_E           : 2,
        SENSORTYPE_TYPE_J           : 3,
        SENSORTYPE_TYPE_N           : 4,
        SENSORTYPE_TYPE_R           : 5,
        SENSORTYPE_TYPE_S           : 6,
        SENSORTYPE_TYPE_T           : 7,
        SENSORTYPE_PT100_4WIRES     : 8,
        SENSORTYPE_PT100_3WIRES     : 9,
        SENSORTYPE_PT100_2WIRES     : 10,
        SENSORTYPE_RES_OHM          : 11,
        SENSORTYPE_RES_NTC          : 12,
        SENSORTYPE_RES_LINEAR       : 13,
        SENSORTYPE_INVALID          : -1,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindTemperature             : YTemperature_FindTemperature,
        FirstTemperature            : YTemperature_FirstTemperature
    }, {
        // Methods
        set_unit                    : YTemperature_set_unit,
        setUnit                     : YTemperature_set_unit,
        get_sensorType              : YTemperature_get_sensorType,
        sensorType                  : YTemperature_get_sensorType,
        get_sensorType_async        : YTemperature_get_sensorType_async,
        sensorType_async            : YTemperature_get_sensorType_async,
        set_sensorType              : YTemperature_set_sensorType,
        setSensorType               : YTemperature_set_sensorType,
        get_command                 : YTemperature_get_command,
        command                     : YTemperature_get_command,
        get_command_async           : YTemperature_get_command_async,
        command_async               : YTemperature_get_command_async,
        set_command                 : YTemperature_set_command,
        setCommand                  : YTemperature_set_command,
        set_ntcParameters           : YTemperature_set_ntcParameters,
        setNtcParameters            : YTemperature_set_ntcParameters,
        set_thermistorResponseTable : YTemperature_set_thermistorResponseTable,
        setThermistorResponseTable  : YTemperature_set_thermistorResponseTable,
        loadThermistorResponseTable : YTemperature_loadThermistorResponseTable,
        nextTemperature             : YTemperature_nextTemperature,
        _parseAttr                  : YTemperature_parseAttr
    });
    //--- (end of YTemperature initialization)
})();

//--- (Temperature functions)

/**
 * Retrieves a temperature sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the temperature sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YTemperature.isOnline() to test if the temperature sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a temperature sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the temperature sensor
 *
 * @return a YTemperature object allowing you to drive the temperature sensor.
 */
function yFindTemperature(func)
{
    return YTemperature.FindTemperature(func);
}

/**
 * Starts the enumeration of temperature sensors currently accessible.
 * Use the method YTemperature.nextTemperature() to iterate on
 * next temperature sensors.
 *
 * @return a pointer to a YTemperature object, corresponding to
 *         the first temperature sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstTemperature()
{
    return YTemperature.FirstTemperature();
}

//--- (end of Temperature functions)
