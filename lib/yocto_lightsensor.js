/*********************************************************************
 *
 * $Id: yocto_lightsensor.js 22705 2016-01-13 11:10:29Z seb $
 *
 * Implements the high-level API for LightSensor functions
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

//--- (YLightSensor return codes)
//--- (end of YLightSensor return codes)
//--- (YLightSensor definitions)
var Y_MEASURETYPE_HUMAN_EYE         = 0;
var Y_MEASURETYPE_WIDE_SPECTRUM     = 1;
var Y_MEASURETYPE_INFRARED          = 2;
var Y_MEASURETYPE_HIGH_RATE         = 3;
var Y_MEASURETYPE_HIGH_ENERGY       = 4;
var Y_MEASURETYPE_INVALID           = -1;
//--- (end of YLightSensor definitions)

//--- (YLightSensor class start)
/**
 * YLightSensor Class: LightSensor function interface
 *
 * The Yoctopuce class YLightSensor allows you to read and configure Yoctopuce light
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 * This class adds the ability to easily perform a one-point linear calibration
 * to compensate the effect of a glass or filter placed in front of the sensor.
 * For some light sensors with several working modes, this class can select the
 * desired working mode.
 */
//--- (end of YLightSensor class start)

var YLightSensor; // definition below
(function()
{
    function _YLightSensor(str_func)
    {
        //--- (YLightSensor constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'LightSensor';

        this._measureType                    = Y_MEASURETYPE_INVALID;      // LightSensorTypeAll
        //--- (end of YLightSensor constructor)
    }

    //--- (YLightSensor implementation)

    function YLightSensor_parseAttr(name, val, _super)
    {
        switch(name) {
        case "measureType":
            this._measureType = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    function YLightSensor_set_currentValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('currentValue',rest_val);
    }

    /**
     * Changes the sensor-specific calibration parameter so that the current value
     * matches a desired target (linear scaling).
     *
     * @param calibratedVal : the desired target value.
     *
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YLightSensor_calibrate(calibratedVal)
    {   var rest_val;
        rest_val = String(Math.round(calibratedVal * 65536.0));
        return this._setAttr('currentValue',rest_val);
    }

    /**
     * Returns the type of light measure.
     *
     * @return a value among YLightSensor.MEASURETYPE_HUMAN_EYE, YLightSensor.MEASURETYPE_WIDE_SPECTRUM,
     * YLightSensor.MEASURETYPE_INFRARED, YLightSensor.MEASURETYPE_HIGH_RATE and
     * YLightSensor.MEASURETYPE_HIGH_ENERGY corresponding to the type of light measure
     *
     * On failure, throws an exception or returns YLightSensor.MEASURETYPE_INVALID.
     */
    function YLightSensor_get_measureType()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MEASURETYPE_INVALID;
            }
        }
        return this._measureType;
    }

    /**
     * Gets the type of light measure.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YLightSensor object that invoked the callback
     *         - the result:a value among Y_MEASURETYPE_HUMAN_EYE, Y_MEASURETYPE_WIDE_SPECTRUM,
     *         Y_MEASURETYPE_INFRARED, Y_MEASURETYPE_HIGH_RATE and Y_MEASURETYPE_HIGH_ENERGY corresponding to the
     *         type of light measure
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_MEASURETYPE_INVALID.
     */
    function YLightSensor_get_measureType_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MEASURETYPE_INVALID);
            } else {
                callback(context, obj, obj._measureType);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Modify the light sensor type used in the device. The measure can either
     * approximate the response of the human eye, focus on a specific light
     * spectrum, depending on the capabilities of the light-sensitive cell.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among YLightSensor.MEASURETYPE_HUMAN_EYE,
     * YLightSensor.MEASURETYPE_WIDE_SPECTRUM, YLightSensor.MEASURETYPE_INFRARED,
     * YLightSensor.MEASURETYPE_HIGH_RATE and YLightSensor.MEASURETYPE_HIGH_ENERGY
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YLightSensor_set_measureType(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('measureType',rest_val);
    }

    /**
     * Retrieves a light sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the light sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLightSensor.isOnline() to test if the light sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a light sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the light sensor
     *
     * @return a YLightSensor object allowing you to drive the light sensor.
     */
    function YLightSensor_FindLightSensor(func)                 // class method
    {
        var obj;                    // YLightSensor;
        obj = YFunction._FindFromCache("LightSensor", func);
        if (obj == null) {
            obj = new YLightSensor(func);
            YFunction._AddToCache("LightSensor", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of light sensors started using yFirstLightSensor().
     *
     * @return a pointer to a YLightSensor object, corresponding to
     *         a light sensor currently online, or a null pointer
     *         if there are no more light sensors to enumerate.
     */
    function YLightSensor_nextLightSensor()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YLightSensor.FindLightSensor(next_hwid);
    }

    /**
     * Starts the enumeration of light sensors currently accessible.
     * Use the method YLightSensor.nextLightSensor() to iterate on
     * next light sensors.
     *
     * @return a pointer to a YLightSensor object, corresponding to
     *         the first light sensor currently online, or a null pointer
     *         if there are none.
     */
    function YLightSensor_FirstLightSensor()
    {
        var next_hwid = YAPI.getFirstHardwareId('LightSensor');
        if(next_hwid == null) return null;
        return YLightSensor.FindLightSensor(next_hwid);
    }

    //--- (end of YLightSensor implementation)

    //--- (YLightSensor initialization)
    YLightSensor = YSensor._Subclass(_YLightSensor, {
        // Constants
        MEASURETYPE_HUMAN_EYE       : 0,
        MEASURETYPE_WIDE_SPECTRUM   : 1,
        MEASURETYPE_INFRARED        : 2,
        MEASURETYPE_HIGH_RATE       : 3,
        MEASURETYPE_HIGH_ENERGY     : 4,
        MEASURETYPE_INVALID         : -1
    }, {
        // Class methods
        FindLightSensor             : YLightSensor_FindLightSensor,
        FirstLightSensor            : YLightSensor_FirstLightSensor
    }, {
        // Methods
        set_currentValue            : YLightSensor_set_currentValue,
        setCurrentValue             : YLightSensor_set_currentValue,
        calibrate                   : YLightSensor_calibrate,
        get_measureType             : YLightSensor_get_measureType,
        measureType                 : YLightSensor_get_measureType,
        get_measureType_async       : YLightSensor_get_measureType_async,
        measureType_async           : YLightSensor_get_measureType_async,
        set_measureType             : YLightSensor_set_measureType,
        setMeasureType              : YLightSensor_set_measureType,
        nextLightSensor             : YLightSensor_nextLightSensor,
        _parseAttr                  : YLightSensor_parseAttr
    });
    //--- (end of YLightSensor initialization)
})();

//--- (LightSensor functions)

/**
 * Retrieves a light sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the light sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YLightSensor.isOnline() to test if the light sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a light sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the light sensor
 *
 * @return a YLightSensor object allowing you to drive the light sensor.
 */
function yFindLightSensor(func)
{
    return YLightSensor.FindLightSensor(func);
}

/**
 * Starts the enumeration of light sensors currently accessible.
 * Use the method YLightSensor.nextLightSensor() to iterate on
 * next light sensors.
 *
 * @return a pointer to a YLightSensor object, corresponding to
 *         the first light sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstLightSensor()
{
    return YLightSensor.FirstLightSensor();
}

//--- (end of LightSensor functions)
