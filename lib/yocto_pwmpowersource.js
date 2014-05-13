/*********************************************************************
 *
 * $Id: yocto_pwmpowersource.js 15529 2014-03-20 17:54:15Z seb $
 *
 * Implements the high-level API for PwmPowerSource functions
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

//--- (YPwmPowerSource return codes)
//--- (end of YPwmPowerSource return codes)
//--- (YPwmPowerSource definitions)
var Y_POWERMODE_USB_5V              = 0;
var Y_POWERMODE_USB_3V              = 1;
var Y_POWERMODE_EXT_V               = 2;
var Y_POWERMODE_OPNDRN              = 3;
var Y_POWERMODE_INVALID             = -1;
//--- (end of YPwmPowerSource definitions)

//--- (YPwmPowerSource class start)
/**
 * YPwmPowerSource Class: PwmPowerSource function interface
 * 
 * The Yoctopuce application programming interface allows you to configure
 * the voltage source used by all PWM on the same device.
 */
//--- (end of YPwmPowerSource class start)

var YPwmPowerSource; // definition below
(function()
{
    function _YPwmPowerSource(str_func)
    {
        //--- (YPwmPowerSource constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'PwmPowerSource';

        this._powerMode                      = Y_POWERMODE_INVALID;        // PwmPwrState
        //--- (end of YPwmPowerSource constructor)
    }

    //--- (YPwmPowerSource implementation)

    function YPwmPowerSource_parseAttr(name, val, _super)
    {
        switch(name) {
        case "powerMode":
            this._powerMode = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the selected power source for the PWM on the same device
     * 
     * @return a value among YPwmPowerSource.POWERMODE_USB_5V, YPwmPowerSource.POWERMODE_USB_3V,
     * YPwmPowerSource.POWERMODE_EXT_V and YPwmPowerSource.POWERMODE_OPNDRN corresponding to the selected
     * power source for the PWM on the same device
     * 
     * On failure, throws an exception or returns YPwmPowerSource.POWERMODE_INVALID.
     */
    function YPwmPowerSource_get_powerMode()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_POWERMODE_INVALID;
            }
        }
        return this._powerMode;
    }

    /**
     * Gets the selected power source for the PWM on the same device
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmPowerSource object that invoked the callback
     *         - the result:a value among Y_POWERMODE_USB_5V, Y_POWERMODE_USB_3V, Y_POWERMODE_EXT_V and
     *         Y_POWERMODE_OPNDRN corresponding to the selected power source for the PWM on the same device
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_POWERMODE_INVALID.
     */
    function YPwmPowerSource_get_powerMode_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_POWERMODE_INVALID);
            } else {
                callback(context, obj, obj._powerMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes  the PWM power source. PWM can use isolated 5V from USB, isolated 3V from USB or
     * voltage from an external power source. The PWM can also work in open drain  mode. In that
     * mode, the PWM actively pulls the line down.
     * Warning: this setting is common to all PWM on the same device. If you change that parameter,
     * all PWM located on the same device are  affected.
     * If you want the change to be kept after a device reboot, make sure  to call the matching
     * module saveToFlash().
     * 
     * @param newval : a value among YPwmPowerSource.POWERMODE_USB_5V, YPwmPowerSource.POWERMODE_USB_3V,
     * YPwmPowerSource.POWERMODE_EXT_V and YPwmPowerSource.POWERMODE_OPNDRN corresponding to  the PWM power source
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmPowerSource_set_powerMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('powerMode',rest_val);
    }

    /**
     * Retrieves a voltage source for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the voltage source is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmPowerSource.isOnline() to test if the voltage source is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage source by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the voltage source
     * 
     * @return a YPwmPowerSource object allowing you to drive the voltage source.
     */
    function YPwmPowerSource_FindPwmPowerSource(func)           // class method
    {
        var obj;                    // YPwmPowerSource;
        obj = YFunction._FindFromCache("PwmPowerSource", func);
        if (obj == null) {
            obj = new YPwmPowerSource(func);
            YFunction._AddToCache("PwmPowerSource", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of Voltage sources started using yFirstPwmPowerSource().
     * 
     * @return a pointer to a YPwmPowerSource object, corresponding to
     *         a voltage source currently online, or a null pointer
     *         if there are no more Voltage sources to enumerate.
     */
    function YPwmPowerSource_nextPwmPowerSource()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPwmPowerSource.FindPwmPowerSource(next_hwid);
    }

    /**
     * Starts the enumeration of Voltage sources currently accessible.
     * Use the method YPwmPowerSource.nextPwmPowerSource() to iterate on
     * next Voltage sources.
     * 
     * @return a pointer to a YPwmPowerSource object, corresponding to
     *         the first source currently online, or a null pointer
     *         if there are none.
     */
    function YPwmPowerSource_FirstPwmPowerSource()
    {
        var next_hwid = YAPI.getFirstHardwareId('PwmPowerSource');
        if(next_hwid == null) return null;
        return YPwmPowerSource.FindPwmPowerSource(next_hwid);
    }

    //--- (end of YPwmPowerSource implementation)

    //--- (YPwmPowerSource initialization)
    YPwmPowerSource = YFunction._Subclass(_YPwmPowerSource, {
        // Constants
        POWERMODE_USB_5V            : 0,
        POWERMODE_USB_3V            : 1,
        POWERMODE_EXT_V             : 2,
        POWERMODE_OPNDRN            : 3,
        POWERMODE_INVALID           : -1
    }, {
        // Class methods
        FindPwmPowerSource          : YPwmPowerSource_FindPwmPowerSource,
        FirstPwmPowerSource         : YPwmPowerSource_FirstPwmPowerSource
    }, {
        // Methods
        get_powerMode               : YPwmPowerSource_get_powerMode,
        powerMode                   : YPwmPowerSource_get_powerMode,
        get_powerMode_async         : YPwmPowerSource_get_powerMode_async,
        powerMode_async             : YPwmPowerSource_get_powerMode_async,
        set_powerMode               : YPwmPowerSource_set_powerMode,
        setPowerMode                : YPwmPowerSource_set_powerMode,
        nextPwmPowerSource          : YPwmPowerSource_nextPwmPowerSource,
        _parseAttr                  : YPwmPowerSource_parseAttr
    });
    //--- (end of YPwmPowerSource initialization)
})();

//--- (PwmPowerSource functions)

/**
 * Retrieves a voltage source for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the voltage source is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPwmPowerSource.isOnline() to test if the voltage source is
 * indeed online at a given time. In case of ambiguity when looking for
 * a voltage source by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the voltage source
 * 
 * @return a YPwmPowerSource object allowing you to drive the voltage source.
 */
function yFindPwmPowerSource(func)
{
    return YPwmPowerSource.FindPwmPowerSource(func);
}

/**
 * Starts the enumeration of Voltage sources currently accessible.
 * Use the method YPwmPowerSource.nextPwmPowerSource() to iterate on
 * next Voltage sources.
 * 
 * @return a pointer to a YPwmPowerSource object, corresponding to
 *         the first source currently online, or a null pointer
 *         if there are none.
 */
function yFirstPwmPowerSource()
{
    return YPwmPowerSource.FirstPwmPowerSource();
}

//--- (end of PwmPowerSource functions)
