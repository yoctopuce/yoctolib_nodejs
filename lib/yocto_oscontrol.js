/*********************************************************************
 *
 * $Id: yocto_oscontrol.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements the high-level API for OsControl functions
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

//--- (YOsControl return codes)
//--- (end of YOsControl return codes)
//--- (YOsControl definitions)
var Y_SHUTDOWNCOUNTDOWN_INVALID     = YAPI_INVALID_UINT;
//--- (end of YOsControl definitions)

//--- (YOsControl class start)
/**
 * YOsControl Class: OS control
 * 
 * The OScontrol object allows some control over the operating system running a VirtualHub.
 * OsControl is available on the VirtualHub software only. This feature must be activated at the VirtualHub
 * start up with -o option.
 */
//--- (end of YOsControl class start)

var YOsControl; // definition below
(function()
{
    function _YOsControl(str_func)
    {
        //--- (YOsControl constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'OsControl';

        this._shutdownCountdown              = Y_SHUTDOWNCOUNTDOWN_INVALID; // UInt31
        //--- (end of YOsControl constructor)
    }

    //--- (YOsControl implementation)

    function YOsControl_parseAttr(name, val, _super)
    {
        switch(name) {
        case "shutdownCountdown":
            this._shutdownCountdown = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the remaining number of seconds before the OS shutdown, or zero when no
     * shutdown has been scheduled.
     * 
     * @return an integer corresponding to the remaining number of seconds before the OS shutdown, or zero when no
     *         shutdown has been scheduled
     * 
     * On failure, throws an exception or returns YOsControl.SHUTDOWNCOUNTDOWN_INVALID.
     */
    function YOsControl_get_shutdownCountdown()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SHUTDOWNCOUNTDOWN_INVALID;
            }
        }
        return this._shutdownCountdown;
    }

    /**
     * Gets the remaining number of seconds before the OS shutdown, or zero when no
     * shutdown has been scheduled.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YOsControl object that invoked the callback
     *         - the result:an integer corresponding to the remaining number of seconds before the OS shutdown, or zero when no
     *         shutdown has been scheduled
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_SHUTDOWNCOUNTDOWN_INVALID.
     */
    function YOsControl_get_shutdownCountdown_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SHUTDOWNCOUNTDOWN_INVALID);
            } else {
                callback(context, obj, obj._shutdownCountdown);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YOsControl_set_shutdownCountdown(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('shutdownCountdown',rest_val);
    }

    /**
     * Retrieves OS control for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the OS control is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YOsControl.isOnline() to test if the OS control is
     * indeed online at a given time. In case of ambiguity when looking for
     * OS control by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the OS control
     * 
     * @return a YOsControl object allowing you to drive the OS control.
     */
    function YOsControl_FindOsControl(func)                     // class method
    {
        var obj;                    // YOsControl;
        obj = YFunction._FindFromCache("OsControl", func);
        if (obj == null) {
            obj = new YOsControl(func);
            YFunction._AddToCache("OsControl", func, obj);
        }
        return obj;
    }

    /**
     * Schedules an OS shutdown after a given number of seconds.
     * 
     * @param secBeforeShutDown : number of seconds before shutdown
     * 
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YOsControl_shutdown(secBeforeShutDown)
    {
        return this.set_shutdownCountdown(secBeforeShutDown);
    }

    /**
     * Continues the enumeration of OS control started using yFirstOsControl().
     * 
     * @return a pointer to a YOsControl object, corresponding to
     *         OS control currently online, or a null pointer
     *         if there are no more OS control to enumerate.
     */
    function YOsControl_nextOsControl()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YOsControl.FindOsControl(next_hwid);
    }

    /**
     * Starts the enumeration of OS control currently accessible.
     * Use the method YOsControl.nextOsControl() to iterate on
     * next OS control.
     * 
     * @return a pointer to a YOsControl object, corresponding to
     *         the first OS control currently online, or a null pointer
     *         if there are none.
     */
    function YOsControl_FirstOsControl()
    {
        var next_hwid = YAPI.getFirstHardwareId('OsControl');
        if(next_hwid == null) return null;
        return YOsControl.FindOsControl(next_hwid);
    }

    //--- (end of YOsControl implementation)

    //--- (YOsControl initialization)
    YOsControl = YFunction._Subclass(_YOsControl, {
        // Constants
        SHUTDOWNCOUNTDOWN_INVALID   : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindOsControl               : YOsControl_FindOsControl,
        FirstOsControl              : YOsControl_FirstOsControl
    }, {
        // Methods
        get_shutdownCountdown       : YOsControl_get_shutdownCountdown,
        shutdownCountdown           : YOsControl_get_shutdownCountdown,
        get_shutdownCountdown_async : YOsControl_get_shutdownCountdown_async,
        shutdownCountdown_async     : YOsControl_get_shutdownCountdown_async,
        set_shutdownCountdown       : YOsControl_set_shutdownCountdown,
        setShutdownCountdown        : YOsControl_set_shutdownCountdown,
        shutdown                    : YOsControl_shutdown,
        nextOsControl               : YOsControl_nextOsControl,
        _parseAttr                  : YOsControl_parseAttr
    });
    //--- (end of YOsControl initialization)
})();

//--- (OsControl functions)

/**
 * Retrieves OS control for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the OS control is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YOsControl.isOnline() to test if the OS control is
 * indeed online at a given time. In case of ambiguity when looking for
 * OS control by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the OS control
 * 
 * @return a YOsControl object allowing you to drive the OS control.
 */
function yFindOsControl(func)
{
    return YOsControl.FindOsControl(func);
}

/**
 * Starts the enumeration of OS control currently accessible.
 * Use the method YOsControl.nextOsControl() to iterate on
 * next OS control.
 * 
 * @return a pointer to a YOsControl object, corresponding to
 *         the first OS control currently online, or a null pointer
 *         if there are none.
 */
function yFirstOsControl()
{
    return YOsControl.FirstOsControl();
}

//--- (end of OsControl functions)
