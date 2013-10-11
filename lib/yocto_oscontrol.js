/*********************************************************************
 *
 * $Id: yocto_oscontrol.js 13065 2013-10-10 16:04:55Z mvuilleu $
 *
 * Implements yFindOsControl(), the high-level API for OsControl functions
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

//--- (return codes)
//--- (end of return codes)
//--- (YOsControl definitions)
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_SHUTDOWNCOUNTDOWN_INVALID     = -1;
//--- (end of YOsControl definitions)

/**
 * YOsControl Class: OS control
 * 
 * The OScontrol object allows some control over the operating system running a VirtualHub.
 * OsControl is available on the VirtualHub software only. This feature must be activated at the VirtualHub
 * start up with -o option.
 */
var YOsControl; // definition below
(function()
{
    //--- (YOsControl implementation)

    /**
     * Returns the logical name of the OS control, corresponding to the network name of the module.
     * 
     * @return a string corresponding to the logical name of the OS control, corresponding to the network
     * name of the module
     * 
     * On failure, throws an exception or returns YOsControl.LOGICALNAME_INVALID.
     */
    function YOsControl_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Gets the logical name of the OS control, corresponding to the network name of the module.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YOsControl object that invoked the callback
     *         - the result:a string corresponding to the logical name of the OS control, corresponding to the
     *         network name of the modu
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YOsControl_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the OS control. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the OS control
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YOsControl_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the OS control (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the OS control (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YOsControl.ADVERTISEDVALUE_INVALID.
     */
    function YOsControl_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Gets the current value of the OS control (no more than 6 characters).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YOsControl object that invoked the callback
     *         - the result:a string corresponding to the current value of the OS control (no more than 6 character
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YOsControl_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
    {   var json_val = this._getAttr('shutdownCountdown');
        return (json_val == null ? Y_SHUTDOWNCOUNTDOWN_INVALID : parseInt(json_val));
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
     *         shutdown has been schedul
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_SHUTDOWNCOUNTDOWN_INVALID.
     */
    function YOsControl_get_shutdownCountdown_async(func_callback, obj_context)
    {   this._getAttr_async('shutdownCountdown',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SHUTDOWNCOUNTDOWN_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YOsControl_set_shutdownCountdown(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('shutdownCountdown',rest_val);
    }

    /**
     * Schedules an OS shutdown after a given number of seconds.
     * 
     * @param secBeforeShutDown : number of seconds before shutdown
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YOsControl_shutdown(int_secBeforeShutDown)
    {   var rest_val;
        rest_val = String(int_secBeforeShutDown);
        return this._setAttr('shutdownCountdown',rest_val);
    }

    /**
     * Continues the enumeration of OS control started using yFirstOsControl().
     * 
     * @return a pointer to a YOsControl object, corresponding to
     *         OS control currently online, or a null pointer
     *         if there are no more OS control to enumerate.
     */
    function YOsControl_nextOsControl()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YOsControl.FindOsControl(next_hwid);
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
    function YOsControl_FindOsControl(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('OsControl', str_func);
        if(obj_func) return obj_func;
        return new YOsControl(str_func);
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

    function _YOsControl(str_func)
    {
        //--- (YOsControl constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'OsControl', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.SHUTDOWNCOUNTDOWN_INVALID       = -1;
        this.get_logicalName                 = YOsControl_get_logicalName;
        this.logicalName                     = YOsControl_get_logicalName;
        this.get_logicalName_async           = YOsControl_get_logicalName_async;
        this.logicalName_async               = YOsControl_get_logicalName_async;
        this.set_logicalName                 = YOsControl_set_logicalName;
        this.setLogicalName                  = YOsControl_set_logicalName;
        this.get_advertisedValue             = YOsControl_get_advertisedValue;
        this.advertisedValue                 = YOsControl_get_advertisedValue;
        this.get_advertisedValue_async       = YOsControl_get_advertisedValue_async;
        this.advertisedValue_async           = YOsControl_get_advertisedValue_async;
        this.get_shutdownCountdown           = YOsControl_get_shutdownCountdown;
        this.shutdownCountdown               = YOsControl_get_shutdownCountdown;
        this.get_shutdownCountdown_async     = YOsControl_get_shutdownCountdown_async;
        this.shutdownCountdown_async         = YOsControl_get_shutdownCountdown_async;
        this.set_shutdownCountdown           = YOsControl_set_shutdownCountdown;
        this.setShutdownCountdown            = YOsControl_set_shutdownCountdown;
        this.shutdown                        = YOsControl_shutdown;
        this.nextOsControl                   = YOsControl_nextOsControl;
        //--- (end of YOsControl constructor)
    }

    YOsControl = _YOsControl;
    YOsControl.LOGICALNAME_INVALID             = "!INVALID!";
    YOsControl.ADVERTISEDVALUE_INVALID         = "!INVALID!";
    YOsControl.SHUTDOWNCOUNTDOWN_INVALID       = -1;
    YOsControl.FindOsControl  = YOsControl_FindOsControl;
    YOsControl.FirstOsControl = YOsControl_FirstOsControl;
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
function yFindOsControl(str_func)
{
    return YOsControl.FindOsControl(str_func);
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
