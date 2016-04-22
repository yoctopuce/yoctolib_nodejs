/*********************************************************************
 *
 * $Id: yocto_humidity.js 23246 2016-02-23 14:49:01Z seb $
 *
 * Implements the high-level API for Humidity functions
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

//--- (YHumidity return codes)
//--- (end of YHumidity return codes)
//--- (YHumidity definitions)
var Y_RELHUM_INVALID                = YAPI_INVALID_DOUBLE;
var Y_ABSHUM_INVALID                = YAPI_INVALID_DOUBLE;
//--- (end of YHumidity definitions)

//--- (YHumidity class start)
/**
 * YHumidity Class: Humidity function interface
 *
 * The Yoctopuce class YHumidity allows you to read and configure Yoctopuce humidity
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 */
//--- (end of YHumidity class start)

var YHumidity; // definition below
(function()
{
    function _YHumidity(str_func)
    {
        //--- (YHumidity constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Humidity';

        this._relHum                         = Y_RELHUM_INVALID;           // MeasureVal
        this._absHum                         = Y_ABSHUM_INVALID;           // MeasureVal
        //--- (end of YHumidity constructor)
    }

    //--- (YHumidity implementation)

    function YHumidity_parseAttr(name, val, _super)
    {
        switch(name) {
        case "relHum":
            this._relHum = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "absHum":
            this._absHum = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the primary unit for measuring humidity. That unit is a string.
     * If that strings starts with the letter 'g', the primary measured value is the absolute
     * humidity, in g/m3. Otherwise, the primary measured value will be the relative humidity
     * (RH), in per cents.
     *
     * Remember to call the saveToFlash() method of the module if the modification
     * must be kept.
     *
     * @param newval : a string corresponding to the primary unit for measuring humidity
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YHumidity_set_unit(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('unit',rest_val);
    }

    /**
     * Returns the current relative humidity, in per cents.
     *
     * @return a floating point number corresponding to the current relative humidity, in per cents
     *
     * On failure, throws an exception or returns YHumidity.RELHUM_INVALID.
     */
    function YHumidity_get_relHum()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RELHUM_INVALID;
            }
        }
        return this._relHum;
    }

    /**
     * Gets the current relative humidity, in per cents.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YHumidity object that invoked the callback
     *         - the result:a floating point number corresponding to the current relative humidity, in per cents
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_RELHUM_INVALID.
     */
    function YHumidity_get_relHum_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RELHUM_INVALID);
            } else {
                callback(context, obj, obj._relHum);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current absolute humidity, in grams per cubic meter of air.
     *
     * @return a floating point number corresponding to the current absolute humidity, in grams per cubic meter of air
     *
     * On failure, throws an exception or returns YHumidity.ABSHUM_INVALID.
     */
    function YHumidity_get_absHum()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ABSHUM_INVALID;
            }
        }
        return this._absHum;
    }

    /**
     * Gets the current absolute humidity, in grams per cubic meter of air.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YHumidity object that invoked the callback
     *         - the result:a floating point number corresponding to the current absolute humidity, in grams per
     *         cubic meter of air
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_ABSHUM_INVALID.
     */
    function YHumidity_get_absHum_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ABSHUM_INVALID);
            } else {
                callback(context, obj, obj._absHum);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a humidity sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the humidity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHumidity.isOnline() to test if the humidity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a humidity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the humidity sensor
     *
     * @return a YHumidity object allowing you to drive the humidity sensor.
     */
    function YHumidity_FindHumidity(func)                       // class method
    {
        var obj;                    // YHumidity;
        obj = YFunction._FindFromCache("Humidity", func);
        if (obj == null) {
            obj = new YHumidity(func);
            YFunction._AddToCache("Humidity", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of humidity sensors started using yFirstHumidity().
     *
     * @return a pointer to a YHumidity object, corresponding to
     *         a humidity sensor currently online, or a null pointer
     *         if there are no more humidity sensors to enumerate.
     */
    function YHumidity_nextHumidity()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YHumidity.FindHumidity(next_hwid);
    }

    /**
     * Starts the enumeration of humidity sensors currently accessible.
     * Use the method YHumidity.nextHumidity() to iterate on
     * next humidity sensors.
     *
     * @return a pointer to a YHumidity object, corresponding to
     *         the first humidity sensor currently online, or a null pointer
     *         if there are none.
     */
    function YHumidity_FirstHumidity()
    {
        var next_hwid = YAPI.getFirstHardwareId('Humidity');
        if(next_hwid == null) return null;
        return YHumidity.FindHumidity(next_hwid);
    }

    //--- (end of YHumidity implementation)

    //--- (YHumidity initialization)
    YHumidity = YSensor._Subclass(_YHumidity, {
        // Constants
        RELHUM_INVALID              : YAPI_INVALID_DOUBLE,
        ABSHUM_INVALID              : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindHumidity                : YHumidity_FindHumidity,
        FirstHumidity               : YHumidity_FirstHumidity
    }, {
        // Methods
        set_unit                    : YHumidity_set_unit,
        setUnit                     : YHumidity_set_unit,
        get_relHum                  : YHumidity_get_relHum,
        relHum                      : YHumidity_get_relHum,
        get_relHum_async            : YHumidity_get_relHum_async,
        relHum_async                : YHumidity_get_relHum_async,
        get_absHum                  : YHumidity_get_absHum,
        absHum                      : YHumidity_get_absHum,
        get_absHum_async            : YHumidity_get_absHum_async,
        absHum_async                : YHumidity_get_absHum_async,
        nextHumidity                : YHumidity_nextHumidity,
        _parseAttr                  : YHumidity_parseAttr
    });
    //--- (end of YHumidity initialization)
})();

//--- (Humidity functions)

/**
 * Retrieves a humidity sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the humidity sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YHumidity.isOnline() to test if the humidity sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a humidity sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the humidity sensor
 *
 * @return a YHumidity object allowing you to drive the humidity sensor.
 */
function yFindHumidity(func)
{
    return YHumidity.FindHumidity(func);
}

/**
 * Starts the enumeration of humidity sensors currently accessible.
 * Use the method YHumidity.nextHumidity() to iterate on
 * next humidity sensors.
 *
 * @return a pointer to a YHumidity object, corresponding to
 *         the first humidity sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstHumidity()
{
    return YHumidity.FirstHumidity();
}

//--- (end of Humidity functions)
