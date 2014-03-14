/*********************************************************************
 *
 * $Id: yocto_accelerometer.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements the high-level API for Accelerometer functions
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

//--- (YAccelerometer return codes)
//--- (end of YAccelerometer return codes)
//--- (YAccelerometer definitions)
var Y_XVALUE_INVALID                = YAPI_INVALID_DOUBLE;
var Y_YVALUE_INVALID                = YAPI_INVALID_DOUBLE;
var Y_ZVALUE_INVALID                = YAPI_INVALID_DOUBLE;
//--- (end of YAccelerometer definitions)

//--- (YAccelerometer class start)
/**
 * YAccelerometer Class: Accelerometer function interface
 * 
 * The Yoctopuce application programming interface allows you to read an instant
 * measure of the sensor, as well as the minimal and maximal values observed.
 */
//--- (end of YAccelerometer class start)

var YAccelerometer; // definition below
(function()
{
    function _YAccelerometer(str_func)
    {
        //--- (YAccelerometer constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Accelerometer';

        this._xValue                         = Y_XVALUE_INVALID;           // Centesimal
        this._yValue                         = Y_YVALUE_INVALID;           // Centesimal
        this._zValue                         = Y_ZVALUE_INVALID;           // Centesimal
        //--- (end of YAccelerometer constructor)
    }

    //--- (YAccelerometer implementation)

    function YAccelerometer_parseAttr(name, val, _super)
    {
        switch(name) {
        case "xValue":
            this._xValue = val/65536;
            return 1;
        case "yValue":
            this._yValue = val/65536;
            return 1;
        case "zValue":
            this._zValue = val/65536;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the X component of the acceleration, as a floating point number.
     * 
     * @return a floating point number corresponding to the X component of the acceleration, as a floating point number
     * 
     * On failure, throws an exception or returns YAccelerometer.XVALUE_INVALID.
     */
    function YAccelerometer_get_xValue()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_XVALUE_INVALID;
            }
        }
        return this._xValue;
    }

    /**
     * Gets the X component of the acceleration, as a floating point number.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAccelerometer object that invoked the callback
     *         - the result:a floating point number corresponding to the X component of the acceleration, as a
     *         floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_XVALUE_INVALID.
     */
    function YAccelerometer_get_xValue_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_XVALUE_INVALID);
            } else {
                callback(context, obj, obj._xValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the Y component of the acceleration, as a floating point number.
     * 
     * @return a floating point number corresponding to the Y component of the acceleration, as a floating point number
     * 
     * On failure, throws an exception or returns YAccelerometer.YVALUE_INVALID.
     */
    function YAccelerometer_get_yValue()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_YVALUE_INVALID;
            }
        }
        return this._yValue;
    }

    /**
     * Gets the Y component of the acceleration, as a floating point number.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAccelerometer object that invoked the callback
     *         - the result:a floating point number corresponding to the Y component of the acceleration, as a
     *         floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_YVALUE_INVALID.
     */
    function YAccelerometer_get_yValue_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_YVALUE_INVALID);
            } else {
                callback(context, obj, obj._yValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the Z component of the acceleration, as a floating point number.
     * 
     * @return a floating point number corresponding to the Z component of the acceleration, as a floating point number
     * 
     * On failure, throws an exception or returns YAccelerometer.ZVALUE_INVALID.
     */
    function YAccelerometer_get_zValue()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ZVALUE_INVALID;
            }
        }
        return this._zValue;
    }

    /**
     * Gets the Z component of the acceleration, as a floating point number.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAccelerometer object that invoked the callback
     *         - the result:a floating point number corresponding to the Z component of the acceleration, as a
     *         floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ZVALUE_INVALID.
     */
    function YAccelerometer_get_zValue_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ZVALUE_INVALID);
            } else {
                callback(context, obj, obj._zValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves an accelerometer for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the accelerometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAccelerometer.isOnline() to test if the accelerometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * an accelerometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the accelerometer
     * 
     * @return a YAccelerometer object allowing you to drive the accelerometer.
     */
    function YAccelerometer_FindAccelerometer(func)             // class method
    {
        var obj;                    // YAccelerometer;
        obj = YFunction._FindFromCache("Accelerometer", func);
        if (obj == null) {
            obj = new YAccelerometer(func);
            YFunction._AddToCache("Accelerometer", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of accelerometers started using yFirstAccelerometer().
     * 
     * @return a pointer to a YAccelerometer object, corresponding to
     *         an accelerometer currently online, or a null pointer
     *         if there are no more accelerometers to enumerate.
     */
    function YAccelerometer_nextAccelerometer()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAccelerometer.FindAccelerometer(next_hwid);
    }

    /**
     * Starts the enumeration of accelerometers currently accessible.
     * Use the method YAccelerometer.nextAccelerometer() to iterate on
     * next accelerometers.
     * 
     * @return a pointer to a YAccelerometer object, corresponding to
     *         the first accelerometer currently online, or a null pointer
     *         if there are none.
     */
    function YAccelerometer_FirstAccelerometer()
    {
        var next_hwid = YAPI.getFirstHardwareId('Accelerometer');
        if(next_hwid == null) return null;
        return YAccelerometer.FindAccelerometer(next_hwid);
    }

    //--- (end of YAccelerometer implementation)

    //--- (YAccelerometer initialization)
    YAccelerometer = YSensor._Subclass(_YAccelerometer, {
        // Constants
        XVALUE_INVALID              : YAPI_INVALID_DOUBLE,
        YVALUE_INVALID              : YAPI_INVALID_DOUBLE,
        ZVALUE_INVALID              : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindAccelerometer           : YAccelerometer_FindAccelerometer,
        FirstAccelerometer          : YAccelerometer_FirstAccelerometer
    }, {
        // Methods
        get_xValue                  : YAccelerometer_get_xValue,
        xValue                      : YAccelerometer_get_xValue,
        get_xValue_async            : YAccelerometer_get_xValue_async,
        xValue_async                : YAccelerometer_get_xValue_async,
        get_yValue                  : YAccelerometer_get_yValue,
        yValue                      : YAccelerometer_get_yValue,
        get_yValue_async            : YAccelerometer_get_yValue_async,
        yValue_async                : YAccelerometer_get_yValue_async,
        get_zValue                  : YAccelerometer_get_zValue,
        zValue                      : YAccelerometer_get_zValue,
        get_zValue_async            : YAccelerometer_get_zValue_async,
        zValue_async                : YAccelerometer_get_zValue_async,
        nextAccelerometer           : YAccelerometer_nextAccelerometer,
        _parseAttr                  : YAccelerometer_parseAttr
    });
    //--- (end of YAccelerometer initialization)
})();

//--- (Accelerometer functions)

/**
 * Retrieves an accelerometer for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the accelerometer is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YAccelerometer.isOnline() to test if the accelerometer is
 * indeed online at a given time. In case of ambiguity when looking for
 * an accelerometer by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the accelerometer
 * 
 * @return a YAccelerometer object allowing you to drive the accelerometer.
 */
function yFindAccelerometer(func)
{
    return YAccelerometer.FindAccelerometer(func);
}

/**
 * Starts the enumeration of accelerometers currently accessible.
 * Use the method YAccelerometer.nextAccelerometer() to iterate on
 * next accelerometers.
 * 
 * @return a pointer to a YAccelerometer object, corresponding to
 *         the first accelerometer currently online, or a null pointer
 *         if there are none.
 */
function yFirstAccelerometer()
{
    return YAccelerometer.FirstAccelerometer();
}

//--- (end of Accelerometer functions)
