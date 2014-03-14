/*********************************************************************
 *
 * $Id: yocto_dualpower.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements the high-level API for DualPower functions
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

//--- (YDualPower return codes)
//--- (end of YDualPower return codes)
//--- (YDualPower definitions)
var Y_POWERSTATE_OFF                = 0;
var Y_POWERSTATE_FROM_USB           = 1;
var Y_POWERSTATE_FROM_EXT           = 2;
var Y_POWERSTATE_INVALID            = -1;
var Y_POWERCONTROL_AUTO             = 0;
var Y_POWERCONTROL_FROM_USB         = 1;
var Y_POWERCONTROL_FROM_EXT         = 2;
var Y_POWERCONTROL_OFF              = 3;
var Y_POWERCONTROL_INVALID          = -1;
var Y_EXTVOLTAGE_INVALID            = YAPI_INVALID_UINT;
//--- (end of YDualPower definitions)

//--- (YDualPower class start)
/**
 * YDualPower Class: External power supply control interface
 * 
 * Yoctopuce application programming interface allows you to control
 * the power source to use for module functions that require high current.
 * The module can also automatically disconnect the external power
 * when a voltage drop is observed on the external power source
 * (external battery running out of power).
 */
//--- (end of YDualPower class start)

var YDualPower; // definition below
(function()
{
    function _YDualPower(str_func)
    {
        //--- (YDualPower constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'DualPower';

        this._powerState                     = Y_POWERSTATE_INVALID;       // DualPwrState
        this._powerControl                   = Y_POWERCONTROL_INVALID;     // DualPwrControl
        this._extVoltage                     = Y_EXTVOLTAGE_INVALID;       // UInt31
        //--- (end of YDualPower constructor)
    }

    //--- (YDualPower implementation)

    function YDualPower_parseAttr(name, val, _super)
    {
        switch(name) {
        case "powerState":
            this._powerState = parseInt(val);
            return 1;
        case "powerControl":
            this._powerControl = parseInt(val);
            return 1;
        case "extVoltage":
            this._extVoltage = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current power source for module functions that require lots of current.
     * 
     * @return a value among YDualPower.POWERSTATE_OFF, YDualPower.POWERSTATE_FROM_USB and
     * YDualPower.POWERSTATE_FROM_EXT corresponding to the current power source for module functions that
     * require lots of current
     * 
     * On failure, throws an exception or returns YDualPower.POWERSTATE_INVALID.
     */
    function YDualPower_get_powerState()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_POWERSTATE_INVALID;
            }
        }
        return this._powerState;
    }

    /**
     * Gets the current power source for module functions that require lots of current.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDualPower object that invoked the callback
     *         - the result:a value among Y_POWERSTATE_OFF, Y_POWERSTATE_FROM_USB and Y_POWERSTATE_FROM_EXT
     *         corresponding to the current power source for module functions that require lots of current
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_POWERSTATE_INVALID.
     */
    function YDualPower_get_powerState_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_POWERSTATE_INVALID);
            } else {
                callback(context, obj, obj._powerState);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the selected power source for module functions that require lots of current.
     * 
     * @return a value among YDualPower.POWERCONTROL_AUTO, YDualPower.POWERCONTROL_FROM_USB,
     * YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF corresponding to the selected
     * power source for module functions that require lots of current
     * 
     * On failure, throws an exception or returns YDualPower.POWERCONTROL_INVALID.
     */
    function YDualPower_get_powerControl()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_POWERCONTROL_INVALID;
            }
        }
        return this._powerControl;
    }

    /**
     * Gets the selected power source for module functions that require lots of current.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDualPower object that invoked the callback
     *         - the result:a value among Y_POWERCONTROL_AUTO, Y_POWERCONTROL_FROM_USB, Y_POWERCONTROL_FROM_EXT
     *         and Y_POWERCONTROL_OFF corresponding to the selected power source for module functions that require
     *         lots of current
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_POWERCONTROL_INVALID.
     */
    function YDualPower_get_powerControl_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_POWERCONTROL_INVALID);
            } else {
                callback(context, obj, obj._powerControl);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the selected power source for module functions that require lots of current.
     * 
     * @param newval : a value among YDualPower.POWERCONTROL_AUTO, YDualPower.POWERCONTROL_FROM_USB,
     * YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF corresponding to the selected
     * power source for module functions that require lots of current
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDualPower_set_powerControl(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('powerControl',rest_val);
    }

    /**
     * Returns the measured voltage on the external power source, in millivolts.
     * 
     * @return an integer corresponding to the measured voltage on the external power source, in millivolts
     * 
     * On failure, throws an exception or returns YDualPower.EXTVOLTAGE_INVALID.
     */
    function YDualPower_get_extVoltage()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_EXTVOLTAGE_INVALID;
            }
        }
        return this._extVoltage;
    }

    /**
     * Gets the measured voltage on the external power source, in millivolts.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDualPower object that invoked the callback
     *         - the result:an integer corresponding to the measured voltage on the external power source, in millivolts
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_EXTVOLTAGE_INVALID.
     */
    function YDualPower_get_extVoltage_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_EXTVOLTAGE_INVALID);
            } else {
                callback(context, obj, obj._extVoltage);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a dual power control for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the power control is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDualPower.isOnline() to test if the power control is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power control by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the power control
     * 
     * @return a YDualPower object allowing you to drive the power control.
     */
    function YDualPower_FindDualPower(func)                     // class method
    {
        var obj;                    // YDualPower;
        obj = YFunction._FindFromCache("DualPower", func);
        if (obj == null) {
            obj = new YDualPower(func);
            YFunction._AddToCache("DualPower", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of dual power controls started using yFirstDualPower().
     * 
     * @return a pointer to a YDualPower object, corresponding to
     *         a dual power control currently online, or a null pointer
     *         if there are no more dual power controls to enumerate.
     */
    function YDualPower_nextDualPower()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YDualPower.FindDualPower(next_hwid);
    }

    /**
     * Starts the enumeration of dual power controls currently accessible.
     * Use the method YDualPower.nextDualPower() to iterate on
     * next dual power controls.
     * 
     * @return a pointer to a YDualPower object, corresponding to
     *         the first dual power control currently online, or a null pointer
     *         if there are none.
     */
    function YDualPower_FirstDualPower()
    {
        var next_hwid = YAPI.getFirstHardwareId('DualPower');
        if(next_hwid == null) return null;
        return YDualPower.FindDualPower(next_hwid);
    }

    //--- (end of YDualPower implementation)

    //--- (YDualPower initialization)
    YDualPower = YFunction._Subclass(_YDualPower, {
        // Constants
        POWERSTATE_OFF              : 0,
        POWERSTATE_FROM_USB         : 1,
        POWERSTATE_FROM_EXT         : 2,
        POWERSTATE_INVALID          : -1,
        POWERCONTROL_AUTO           : 0,
        POWERCONTROL_FROM_USB       : 1,
        POWERCONTROL_FROM_EXT       : 2,
        POWERCONTROL_OFF            : 3,
        POWERCONTROL_INVALID        : -1,
        EXTVOLTAGE_INVALID          : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindDualPower               : YDualPower_FindDualPower,
        FirstDualPower              : YDualPower_FirstDualPower
    }, {
        // Methods
        get_powerState              : YDualPower_get_powerState,
        powerState                  : YDualPower_get_powerState,
        get_powerState_async        : YDualPower_get_powerState_async,
        powerState_async            : YDualPower_get_powerState_async,
        get_powerControl            : YDualPower_get_powerControl,
        powerControl                : YDualPower_get_powerControl,
        get_powerControl_async      : YDualPower_get_powerControl_async,
        powerControl_async          : YDualPower_get_powerControl_async,
        set_powerControl            : YDualPower_set_powerControl,
        setPowerControl             : YDualPower_set_powerControl,
        get_extVoltage              : YDualPower_get_extVoltage,
        extVoltage                  : YDualPower_get_extVoltage,
        get_extVoltage_async        : YDualPower_get_extVoltage_async,
        extVoltage_async            : YDualPower_get_extVoltage_async,
        nextDualPower               : YDualPower_nextDualPower,
        _parseAttr                  : YDualPower_parseAttr
    });
    //--- (end of YDualPower initialization)
})();

//--- (DualPower functions)

/**
 * Retrieves a dual power control for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the power control is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDualPower.isOnline() to test if the power control is
 * indeed online at a given time. In case of ambiguity when looking for
 * a dual power control by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the power control
 * 
 * @return a YDualPower object allowing you to drive the power control.
 */
function yFindDualPower(func)
{
    return YDualPower.FindDualPower(func);
}

/**
 * Starts the enumeration of dual power controls currently accessible.
 * Use the method YDualPower.nextDualPower() to iterate on
 * next dual power controls.
 * 
 * @return a pointer to a YDualPower object, corresponding to
 *         the first dual power control currently online, or a null pointer
 *         if there are none.
 */
function yFirstDualPower()
{
    return YDualPower.FirstDualPower();
}

//--- (end of DualPower functions)
