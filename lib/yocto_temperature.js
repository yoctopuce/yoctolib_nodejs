/*********************************************************************
 *
 * $Id: yocto_temperature.js 15402 2014-03-12 16:23:14Z mvuilleu $
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
var Y_SENSORTYPE_INVALID            = -1;
//--- (end of YTemperature definitions)

//--- (YTemperature class start)
/**
 * YTemperature Class: Temperature function interface
 * 
 * The Yoctopuce application programming interface allows you to read an instant
 * measure of the sensor, as well as the minimal and maximal values observed.
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

        this._sensorType                     = Y_SENSORTYPE_INVALID;       // TempSensorType
        //--- (end of YTemperature constructor)
    }

    //--- (YTemperature implementation)

    function YTemperature_parseAttr(name, val, _super)
    {
        switch(name) {
        case "sensorType":
            this._sensorType = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the temperature sensor type.
     * 
     * @return a value among YTemperature.SENSORTYPE_DIGITAL, YTemperature.SENSORTYPE_TYPE_K,
     * YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J, YTemperature.SENSORTYPE_TYPE_N,
     * YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S, YTemperature.SENSORTYPE_TYPE_T,
     * YTemperature.SENSORTYPE_PT100_4WIRES, YTemperature.SENSORTYPE_PT100_3WIRES and
     * YTemperature.SENSORTYPE_PT100_2WIRES corresponding to the temperature sensor type
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
     *         Y_SENSORTYPE_TYPE_T, Y_SENSORTYPE_PT100_4WIRES, Y_SENSORTYPE_PT100_3WIRES and
     *         Y_SENSORTYPE_PT100_2WIRES corresponding to the temperature sensor type
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
     * Modify the temperature sensor type.  This function is used to
     * to define the type of thermocouple (K,E...) used with the device.
     * This will have no effect if module is using a digital sensor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a value among YTemperature.SENSORTYPE_DIGITAL, YTemperature.SENSORTYPE_TYPE_K,
     * YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J, YTemperature.SENSORTYPE_TYPE_N,
     * YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S, YTemperature.SENSORTYPE_TYPE_T,
     * YTemperature.SENSORTYPE_PT100_4WIRES, YTemperature.SENSORTYPE_PT100_3WIRES and
     * YTemperature.SENSORTYPE_PT100_2WIRES
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
        SENSORTYPE_INVALID          : -1
    }, {
        // Class methods
        FindTemperature             : YTemperature_FindTemperature,
        FirstTemperature            : YTemperature_FirstTemperature
    }, {
        // Methods
        get_sensorType              : YTemperature_get_sensorType,
        sensorType                  : YTemperature_get_sensorType,
        get_sensorType_async        : YTemperature_get_sensorType_async,
        sensorType_async            : YTemperature_get_sensorType_async,
        set_sensorType              : YTemperature_set_sensorType,
        setSensorType               : YTemperature_set_sensorType,
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
