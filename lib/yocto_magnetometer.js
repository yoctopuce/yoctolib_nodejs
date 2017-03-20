/*********************************************************************
 *
 * $Id: yocto_magnetometer.js 26673 2017-02-28 13:44:08Z seb $
 *
 * Implements the high-level API for Magnetometer functions
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

//--- (YMagnetometer return codes)
//--- (end of YMagnetometer return codes)
//--- (YMagnetometer definitions)
var Y_BANDWIDTH_INVALID             = YAPI_INVALID_INT;
var Y_XVALUE_INVALID                = YAPI_INVALID_DOUBLE;
var Y_YVALUE_INVALID                = YAPI_INVALID_DOUBLE;
var Y_ZVALUE_INVALID                = YAPI_INVALID_DOUBLE;
//--- (end of YMagnetometer definitions)

//--- (YMagnetometer class start)
/**
 * YMagnetometer Class: Magnetometer function interface
 *
 * The YSensor class is the parent class for all Yoctopuce sensors. It can be
 * used to read the current value and unit of any sensor, read the min/max
 * value, configure autonomous recording frequency and access recorded data.
 * It also provide a function to register a callback invoked each time the
 * observed value changes, or at a predefined interval. Using this class rather
 * than a specific subclass makes it possible to create generic applications
 * that work with any Yoctopuce sensor, even those that do not yet exist.
 * Note: The YAnButton class is the only analog input which does not inherit
 * from YSensor.
 */
//--- (end of YMagnetometer class start)

var YMagnetometer; // definition below
(function()
{
    function _YMagnetometer(str_func)
    {
        //--- (YMagnetometer constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Magnetometer';

        this._bandwidth                      = Y_BANDWIDTH_INVALID;        // Int
        this._xValue                         = Y_XVALUE_INVALID;           // MeasureVal
        this._yValue                         = Y_YVALUE_INVALID;           // MeasureVal
        this._zValue                         = Y_ZVALUE_INVALID;           // MeasureVal
        //--- (end of YMagnetometer constructor)
    }

    //--- (YMagnetometer implementation)

    function YMagnetometer_parseAttr(name, val, _super)
    {
        switch(name) {
        case "bandwidth":
            this._bandwidth = parseInt(val);
            return 1;
        case "xValue":
            this._xValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "yValue":
            this._yValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "zValue":
            this._zValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the measure update frequency, measured in Hz (Yocto-3D-V2 only).
     *
     * @return an integer corresponding to the measure update frequency, measured in Hz (Yocto-3D-V2 only)
     *
     * On failure, throws an exception or returns YMagnetometer.BANDWIDTH_INVALID.
     */
    function YMagnetometer_get_bandwidth()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BANDWIDTH_INVALID;
            }
        }
        res = this._bandwidth;
        return res;
    }

    /**
     * Gets the measure update frequency, measured in Hz (Yocto-3D-V2 only).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMagnetometer object that invoked the callback
     *         - the result:an integer corresponding to the measure update frequency, measured in Hz (Yocto-3D-V2 only)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_BANDWIDTH_INVALID.
     */
    function YMagnetometer_get_bandwidth_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BANDWIDTH_INVALID);
            } else {
                callback(context, obj, obj._bandwidth);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the measure update frequency, measured in Hz (Yocto-3D-V2 only). When the
     * frequency is lower, the device performs averaging.
     *
     * @param newval : an integer corresponding to the measure update frequency, measured in Hz (Yocto-3D-V2 only)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMagnetometer_set_bandwidth(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('bandwidth',rest_val);
    }

    /**
     * Returns the X component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the X component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.XVALUE_INVALID.
     */
    function YMagnetometer_get_xValue()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_XVALUE_INVALID;
            }
        }
        res = this._xValue;
        return res;
    }

    /**
     * Gets the X component of the magnetic field, as a floating point number.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMagnetometer object that invoked the callback
     *         - the result:a floating point number corresponding to the X component of the magnetic field, as a
     *         floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_XVALUE_INVALID.
     */
    function YMagnetometer_get_xValue_async(callback,context)
    {
        var res;                    // double;
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
     * Returns the Y component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the Y component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.YVALUE_INVALID.
     */
    function YMagnetometer_get_yValue()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_YVALUE_INVALID;
            }
        }
        res = this._yValue;
        return res;
    }

    /**
     * Gets the Y component of the magnetic field, as a floating point number.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMagnetometer object that invoked the callback
     *         - the result:a floating point number corresponding to the Y component of the magnetic field, as a
     *         floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_YVALUE_INVALID.
     */
    function YMagnetometer_get_yValue_async(callback,context)
    {
        var res;                    // double;
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
     * Returns the Z component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the Z component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.ZVALUE_INVALID.
     */
    function YMagnetometer_get_zValue()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ZVALUE_INVALID;
            }
        }
        res = this._zValue;
        return res;
    }

    /**
     * Gets the Z component of the magnetic field, as a floating point number.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMagnetometer object that invoked the callback
     *         - the result:a floating point number corresponding to the Z component of the magnetic field, as a
     *         floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_ZVALUE_INVALID.
     */
    function YMagnetometer_get_zValue_async(callback,context)
    {
        var res;                    // double;
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
     * Retrieves a magnetometer for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the magnetometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMagnetometer.isOnline() to test if the magnetometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a magnetometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the magnetometer
     *
     * @return a YMagnetometer object allowing you to drive the magnetometer.
     */
    function YMagnetometer_FindMagnetometer(func)               // class method
    {
        var obj;                    // YMagnetometer;
        obj = YFunction._FindFromCache("Magnetometer", func);
        if (obj == null) {
            obj = new YMagnetometer(func);
            YFunction._AddToCache("Magnetometer", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of magnetometers started using yFirstMagnetometer().
     *
     * @return a pointer to a YMagnetometer object, corresponding to
     *         a magnetometer currently online, or a null pointer
     *         if there are no more magnetometers to enumerate.
     */
    function YMagnetometer_nextMagnetometer()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMagnetometer.FindMagnetometer(next_hwid);
    }

    /**
     * Starts the enumeration of magnetometers currently accessible.
     * Use the method YMagnetometer.nextMagnetometer() to iterate on
     * next magnetometers.
     *
     * @return a pointer to a YMagnetometer object, corresponding to
     *         the first magnetometer currently online, or a null pointer
     *         if there are none.
     */
    function YMagnetometer_FirstMagnetometer()
    {
        var next_hwid = YAPI.getFirstHardwareId('Magnetometer');
        if(next_hwid == null) return null;
        return YMagnetometer.FindMagnetometer(next_hwid);
    }

    //--- (end of YMagnetometer implementation)

    //--- (YMagnetometer initialization)
    YMagnetometer = YSensor._Subclass(_YMagnetometer, {
        // Constants
        BANDWIDTH_INVALID           : YAPI_INVALID_INT,
        XVALUE_INVALID              : YAPI_INVALID_DOUBLE,
        YVALUE_INVALID              : YAPI_INVALID_DOUBLE,
        ZVALUE_INVALID              : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindMagnetometer            : YMagnetometer_FindMagnetometer,
        FirstMagnetometer           : YMagnetometer_FirstMagnetometer
    }, {
        // Methods
        get_bandwidth               : YMagnetometer_get_bandwidth,
        bandwidth                   : YMagnetometer_get_bandwidth,
        get_bandwidth_async         : YMagnetometer_get_bandwidth_async,
        bandwidth_async             : YMagnetometer_get_bandwidth_async,
        set_bandwidth               : YMagnetometer_set_bandwidth,
        setBandwidth                : YMagnetometer_set_bandwidth,
        get_xValue                  : YMagnetometer_get_xValue,
        xValue                      : YMagnetometer_get_xValue,
        get_xValue_async            : YMagnetometer_get_xValue_async,
        xValue_async                : YMagnetometer_get_xValue_async,
        get_yValue                  : YMagnetometer_get_yValue,
        yValue                      : YMagnetometer_get_yValue,
        get_yValue_async            : YMagnetometer_get_yValue_async,
        yValue_async                : YMagnetometer_get_yValue_async,
        get_zValue                  : YMagnetometer_get_zValue,
        zValue                      : YMagnetometer_get_zValue,
        get_zValue_async            : YMagnetometer_get_zValue_async,
        zValue_async                : YMagnetometer_get_zValue_async,
        nextMagnetometer            : YMagnetometer_nextMagnetometer,
        _parseAttr                  : YMagnetometer_parseAttr
    });
    //--- (end of YMagnetometer initialization)
})();

//--- (Magnetometer functions)

/**
 * Retrieves a magnetometer for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the magnetometer is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YMagnetometer.isOnline() to test if the magnetometer is
 * indeed online at a given time. In case of ambiguity when looking for
 * a magnetometer by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the magnetometer
 *
 * @return a YMagnetometer object allowing you to drive the magnetometer.
 */
function yFindMagnetometer(func)
{
    return YMagnetometer.FindMagnetometer(func);
}

/**
 * Starts the enumeration of magnetometers currently accessible.
 * Use the method YMagnetometer.nextMagnetometer() to iterate on
 * next magnetometers.
 *
 * @return a pointer to a YMagnetometer object, corresponding to
 *         the first magnetometer currently online, or a null pointer
 *         if there are none.
 */
function yFirstMagnetometer()
{
    return YMagnetometer.FirstMagnetometer();
}

//--- (end of Magnetometer functions)
