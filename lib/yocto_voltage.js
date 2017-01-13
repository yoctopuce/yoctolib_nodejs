/*********************************************************************
 *
 * $Id: yocto_voltage.js 26183 2016-12-15 00:14:02Z mvuilleu $
 *
 * Implements the high-level API for Voltage functions
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

//--- (YVoltage return codes)
//--- (end of YVoltage return codes)
//--- (YVoltage definitions)
var Y_ENABLED_FALSE                 = 0;
var Y_ENABLED_TRUE                  = 1;
var Y_ENABLED_INVALID               = -1;
//--- (end of YVoltage definitions)

//--- (YVoltage class start)
/**
 * YVoltage Class: Voltage function interface
 *
 * The Yoctopuce class YVoltage allows you to read and configure Yoctopuce voltage
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 */
//--- (end of YVoltage class start)

var YVoltage; // definition below
(function()
{
    function _YVoltage(str_func)
    {
        //--- (YVoltage constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Voltage';

        this._enabled                        = Y_ENABLED_INVALID;          // Bool
        //--- (end of YVoltage constructor)
    }

    //--- (YVoltage implementation)

    function YVoltage_parseAttr(name, val, _super)
    {
        switch(name) {
        case "enabled":
            this._enabled = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    function YVoltage_get_enabled()
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
     *         - the YVoltage object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YVoltage_get_enabled_async(callback,context)
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

    function YVoltage_set_enabled(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabled',rest_val);
    }

    /**
     * Retrieves a voltage sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltage.isOnline() to test if the voltage sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the voltage sensor
     *
     * @return a YVoltage object allowing you to drive the voltage sensor.
     */
    function YVoltage_FindVoltage(func)                         // class method
    {
        var obj;                    // YVoltage;
        obj = YFunction._FindFromCache("Voltage", func);
        if (obj == null) {
            obj = new YVoltage(func);
            YFunction._AddToCache("Voltage", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of voltage sensors started using yFirstVoltage().
     *
     * @return a pointer to a YVoltage object, corresponding to
     *         a voltage sensor currently online, or a null pointer
     *         if there are no more voltage sensors to enumerate.
     */
    function YVoltage_nextVoltage()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YVoltage.FindVoltage(next_hwid);
    }

    /**
     * Starts the enumeration of voltage sensors currently accessible.
     * Use the method YVoltage.nextVoltage() to iterate on
     * next voltage sensors.
     *
     * @return a pointer to a YVoltage object, corresponding to
     *         the first voltage sensor currently online, or a null pointer
     *         if there are none.
     */
    function YVoltage_FirstVoltage()
    {
        var next_hwid = YAPI.getFirstHardwareId('Voltage');
        if(next_hwid == null) return null;
        return YVoltage.FindVoltage(next_hwid);
    }

    //--- (end of YVoltage implementation)

    //--- (YVoltage initialization)
    YVoltage = YSensor._Subclass(_YVoltage, {
        // Constants
        ENABLED_FALSE               : 0,
        ENABLED_TRUE                : 1,
        ENABLED_INVALID             : -1
    }, {
        // Class methods
        FindVoltage                 : YVoltage_FindVoltage,
        FirstVoltage                : YVoltage_FirstVoltage
    }, {
        // Methods
        get_enabled                 : YVoltage_get_enabled,
        enabled                     : YVoltage_get_enabled,
        get_enabled_async           : YVoltage_get_enabled_async,
        enabled_async               : YVoltage_get_enabled_async,
        set_enabled                 : YVoltage_set_enabled,
        setEnabled                  : YVoltage_set_enabled,
        nextVoltage                 : YVoltage_nextVoltage,
        _parseAttr                  : YVoltage_parseAttr
    });
    //--- (end of YVoltage initialization)
})();

//--- (Voltage functions)

/**
 * Retrieves a voltage sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the voltage sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YVoltage.isOnline() to test if the voltage sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a voltage sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the voltage sensor
 *
 * @return a YVoltage object allowing you to drive the voltage sensor.
 */
function yFindVoltage(func)
{
    return YVoltage.FindVoltage(func);
}

/**
 * Starts the enumeration of voltage sensors currently accessible.
 * Use the method YVoltage.nextVoltage() to iterate on
 * next voltage sensors.
 *
 * @return a pointer to a YVoltage object, corresponding to
 *         the first voltage sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstVoltage()
{
    return YVoltage.FirstVoltage();
}

//--- (end of Voltage functions)
