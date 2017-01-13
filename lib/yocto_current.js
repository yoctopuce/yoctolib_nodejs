/*********************************************************************
 *
 * $Id: yocto_current.js 26183 2016-12-15 00:14:02Z mvuilleu $
 *
 * Implements the high-level API for Current functions
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

//--- (YCurrent return codes)
//--- (end of YCurrent return codes)
//--- (YCurrent definitions)
var Y_ENABLED_FALSE                 = 0;
var Y_ENABLED_TRUE                  = 1;
var Y_ENABLED_INVALID               = -1;
//--- (end of YCurrent definitions)

//--- (YCurrent class start)
/**
 * YCurrent Class: Current function interface
 *
 * The Yoctopuce class YCurrent allows you to read and configure Yoctopuce current
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 */
//--- (end of YCurrent class start)

var YCurrent; // definition below
(function()
{
    function _YCurrent(str_func)
    {
        //--- (YCurrent constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Current';

        this._enabled                        = Y_ENABLED_INVALID;          // Bool
        //--- (end of YCurrent constructor)
    }

    //--- (YCurrent implementation)

    function YCurrent_parseAttr(name, val, _super)
    {
        switch(name) {
        case "enabled":
            this._enabled = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    function YCurrent_get_enabled()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ENABLED_INVALID;
            }
        }
        return this._enabled;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCurrent object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YCurrent_get_enabled_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ENABLED_INVALID);
            } else {
                callback(context, obj, obj._enabled);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YCurrent_set_enabled(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabled',rest_val);
    }

    /**
     * Retrieves a current sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the current sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrent.isOnline() to test if the current sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a current sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the current sensor
     *
     * @return a YCurrent object allowing you to drive the current sensor.
     */
    function YCurrent_FindCurrent(func)                         // class method
    {
        var obj;                    // YCurrent;
        obj = YFunction._FindFromCache("Current", func);
        if (obj == null) {
            obj = new YCurrent(func);
            YFunction._AddToCache("Current", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of current sensors started using yFirstCurrent().
     *
     * @return a pointer to a YCurrent object, corresponding to
     *         a current sensor currently online, or a null pointer
     *         if there are no more current sensors to enumerate.
     */
    function YCurrent_nextCurrent()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YCurrent.FindCurrent(next_hwid);
    }

    /**
     * Starts the enumeration of current sensors currently accessible.
     * Use the method YCurrent.nextCurrent() to iterate on
     * next current sensors.
     *
     * @return a pointer to a YCurrent object, corresponding to
     *         the first current sensor currently online, or a null pointer
     *         if there are none.
     */
    function YCurrent_FirstCurrent()
    {
        var next_hwid = YAPI.getFirstHardwareId('Current');
        if(next_hwid == null) return null;
        return YCurrent.FindCurrent(next_hwid);
    }

    //--- (end of YCurrent implementation)

    //--- (YCurrent initialization)
    YCurrent = YSensor._Subclass(_YCurrent, {
        // Constants
        ENABLED_FALSE               : 0,
        ENABLED_TRUE                : 1,
        ENABLED_INVALID             : -1
    }, {
        // Class methods
        FindCurrent                 : YCurrent_FindCurrent,
        FirstCurrent                : YCurrent_FirstCurrent
    }, {
        // Methods
        get_enabled                 : YCurrent_get_enabled,
        enabled                     : YCurrent_get_enabled,
        get_enabled_async           : YCurrent_get_enabled_async,
        enabled_async               : YCurrent_get_enabled_async,
        set_enabled                 : YCurrent_set_enabled,
        setEnabled                  : YCurrent_set_enabled,
        nextCurrent                 : YCurrent_nextCurrent,
        _parseAttr                  : YCurrent_parseAttr
    });
    //--- (end of YCurrent initialization)
})();

//--- (Current functions)

/**
 * Retrieves a current sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the current sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YCurrent.isOnline() to test if the current sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a current sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the current sensor
 *
 * @return a YCurrent object allowing you to drive the current sensor.
 */
function yFindCurrent(func)
{
    return YCurrent.FindCurrent(func);
}

/**
 * Starts the enumeration of current sensors currently accessible.
 * Use the method YCurrent.nextCurrent() to iterate on
 * next current sensors.
 *
 * @return a pointer to a YCurrent object, corresponding to
 *         the first current sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstCurrent()
{
    return YCurrent.FirstCurrent();
}

//--- (end of Current functions)
