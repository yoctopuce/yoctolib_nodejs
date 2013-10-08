/*********************************************************************
 *
 * $Id: pic24config.php 13012 2013-10-07 13:56:46Z mvuilleu $
 *
 * Implements yFindWakeUpMonitor(), the high-level API for WakeUpMonitor functions
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
//--- (YWakeUpMonitor definitions)
var Y_WAKEUPREASON_USBPOWER         = 0;
var Y_WAKEUPREASON_EXTPOWER         = 1;
var Y_WAKEUPREASON_ENDOFSLEEP       = 2;
var Y_WAKEUPREASON_EXTSIG1          = 3;
var Y_WAKEUPREASON_EXTSIG2          = 4;
var Y_WAKEUPREASON_EXTSIG3          = 5;
var Y_WAKEUPREASON_EXTSIG4          = 6;
var Y_WAKEUPREASON_SCHEDULE1        = 7;
var Y_WAKEUPREASON_SCHEDULE2        = 8;
var Y_WAKEUPREASON_SCHEDULE3        = 9;
var Y_WAKEUPREASON_SCHEDULE4        = 10;
var Y_WAKEUPREASON_SCHEDULE5        = 11;
var Y_WAKEUPREASON_SCHEDULE6        = 12;
var Y_WAKEUPREASON_INVALID          = -1;
var Y_WAKEUPSTATE_SLEEPING          = 0;
var Y_WAKEUPSTATE_AWAKE             = 1;
var Y_WAKEUPSTATE_INVALID           = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_POWERDURATION_INVALID         = Number.NEGATIVE_INFINITY;
var Y_SLEEPCOUNTDOWN_INVALID        = Number.NEGATIVE_INFINITY;
var Y_NEXTWAKEUP_INVALID            = -1;
var Y_RTCTIME_INVALID               = -1;
//--- (end of YWakeUpMonitor definitions)

/**
 * YWakeUpMonitor Class: WakeUpMonitor function interface
 * 
 * 
 */
var YWakeUpMonitor; // definition below
(function()
{
    //--- (YWakeUpMonitor implementation)

    /**
     * Returns the logical name of the monitor.
     * 
     * @return a string corresponding to the logical name of the monitor
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YWakeUpMonitor_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the monitor.
     * 
     * @return a string corresponding to the logical name of the monitor
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpMonitor_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the monitor. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the monitor
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the monitor (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the monitor (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YWakeUpMonitor_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the monitor (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the monitor (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpMonitor_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the maximal wake up time (seconds) before going to sleep automatically.
     * 
     * @return an integer corresponding to the maximal wake up time (seconds) before going to sleep automatically
     * 
     * On failure, throws an exception or returns Y_POWERDURATION_INVALID.
     */
    function YWakeUpMonitor_get_powerDuration()
    {   var json_val = this._getAttr('powerDuration');
        return (json_val == null ? Y_POWERDURATION_INVALID : parseInt(json_val));
    }

    /**
     * Returns the maximal wake up time (seconds) before going to sleep automatically.
     * 
     * @return an integer corresponding to the maximal wake up time (seconds) before going to sleep automatically
     * 
     * On failure, throws an exception or returns Y_POWERDURATION_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpMonitor_get_powerDuration_async(func_callback, obj_context)
    {   this._getAttr_async('powerDuration',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_POWERDURATION_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the maximal wake up time (seconds) before going to sleep automatically.
     * 
     * @param newval : an integer corresponding to the maximal wake up time (seconds) before going to
     * sleep automatically
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_set_powerDuration(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('powerDuration',rest_val);
    }

    /**
     * Returns the delay before next sleep.
     * 
     * @return an integer corresponding to the delay before next sleep
     * 
     * On failure, throws an exception or returns Y_SLEEPCOUNTDOWN_INVALID.
     */
    function YWakeUpMonitor_get_sleepCountdown()
    {   var json_val = this._getAttr('sleepCountdown');
        return (json_val == null ? Y_SLEEPCOUNTDOWN_INVALID : parseInt(json_val));
    }

    /**
     * Returns the delay before next sleep.
     * 
     * @return an integer corresponding to the delay before next sleep
     * 
     * On failure, throws an exception or returns Y_SLEEPCOUNTDOWN_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpMonitor_get_sleepCountdown_async(func_callback, obj_context)
    {   this._getAttr_async('sleepCountdown',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SLEEPCOUNTDOWN_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the delay before next sleep.
     * 
     * @param newval : an integer corresponding to the delay before next sleep
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_set_sleepCountdown(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('sleepCountdown',rest_val);
    }

    /**
     * Returns the next scheduled wake-up date/time (UNIX format)
     * 
     * @return an integer corresponding to the next scheduled wake-up date/time (UNIX format)
     * 
     * On failure, throws an exception or returns Y_NEXTWAKEUP_INVALID.
     */
    function YWakeUpMonitor_get_nextWakeUp()
    {   var json_val = this._getAttr('nextWakeUp');
        return (json_val == null ? Y_NEXTWAKEUP_INVALID : parseInt(json_val));
    }

    /**
     * Returns the next scheduled wake-up date/time (UNIX format)
     * 
     * @return an integer corresponding to the next scheduled wake-up date/time (UNIX format)
     * 
     * On failure, throws an exception or returns Y_NEXTWAKEUP_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpMonitor_get_nextWakeUp_async(func_callback, obj_context)
    {   this._getAttr_async('nextWakeUp',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_NEXTWAKEUP_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the days of the week where a wake up must take place.
     * 
     * @param newval : an integer corresponding to the days of the week where a wake up must take place
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_set_nextWakeUp(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('nextWakeUp',rest_val);
    }

    /**
     * Return the last wake up reason.
     * 
     * @return a value among Y_WAKEUPREASON_USBPOWER, Y_WAKEUPREASON_EXTPOWER, Y_WAKEUPREASON_ENDOFSLEEP,
     * Y_WAKEUPREASON_EXTSIG1, Y_WAKEUPREASON_EXTSIG2, Y_WAKEUPREASON_EXTSIG3, Y_WAKEUPREASON_EXTSIG4,
     * Y_WAKEUPREASON_SCHEDULE1, Y_WAKEUPREASON_SCHEDULE2, Y_WAKEUPREASON_SCHEDULE3,
     * Y_WAKEUPREASON_SCHEDULE4, Y_WAKEUPREASON_SCHEDULE5 and Y_WAKEUPREASON_SCHEDULE6
     * 
     * On failure, throws an exception or returns Y_WAKEUPREASON_INVALID.
     */
    function YWakeUpMonitor_get_wakeUpReason()
    {   var json_val = this._getAttr('wakeUpReason');
        return (json_val == null ? Y_WAKEUPREASON_INVALID : parseInt(json_val));
    }

    /**
     * Return the last wake up reason.
     * 
     * @return a value among Y_WAKEUPREASON_USBPOWER, Y_WAKEUPREASON_EXTPOWER, Y_WAKEUPREASON_ENDOFSLEEP,
     * Y_WAKEUPREASON_EXTSIG1, Y_WAKEUPREASON_EXTSIG2, Y_WAKEUPREASON_EXTSIG3, Y_WAKEUPREASON_EXTSIG4,
     * Y_WAKEUPREASON_SCHEDULE1, Y_WAKEUPREASON_SCHEDULE2, Y_WAKEUPREASON_SCHEDULE3,
     * Y_WAKEUPREASON_SCHEDULE4, Y_WAKEUPREASON_SCHEDULE5 and Y_WAKEUPREASON_SCHEDULE6
     * 
     * On failure, throws an exception or returns Y_WAKEUPREASON_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpMonitor_get_wakeUpReason_async(func_callback, obj_context)
    {   this._getAttr_async('wakeUpReason',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_WAKEUPREASON_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns  the current state of the monitor
     * 
     * @return either Y_WAKEUPSTATE_SLEEPING or Y_WAKEUPSTATE_AWAKE, according to  the current state of the monitor
     * 
     * On failure, throws an exception or returns Y_WAKEUPSTATE_INVALID.
     */
    function YWakeUpMonitor_get_wakeUpState()
    {   var json_val = this._getAttr('wakeUpState');
        return (json_val == null ? Y_WAKEUPSTATE_INVALID : parseInt(json_val));
    }

    /**
     * Returns  the current state of the monitor
     * 
     * @return either Y_WAKEUPSTATE_SLEEPING or Y_WAKEUPSTATE_AWAKE, according to  the current state of the monitor
     * 
     * On failure, throws an exception or returns Y_WAKEUPSTATE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpMonitor_get_wakeUpState_async(func_callback, obj_context)
    {   this._getAttr_async('wakeUpState',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_WAKEUPSTATE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YWakeUpMonitor_set_wakeUpState(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('wakeUpState',rest_val);
    }

    function YWakeUpMonitor_get_rtcTime()
    {   var json_val = this._getAttr('rtcTime');
        return (json_val == null ? Y_RTCTIME_INVALID : parseInt(json_val));
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpMonitor_get_rtcTime_async(func_callback, obj_context)
    {   this._getAttr_async('rtcTime',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RTCTIME_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Forces a wakeup.
     */
    function YWakeUpMonitor_wakeUp()
    {
        return this.set_wakeUpState(Y_WAKEUPSTATE_AWAKE);
        
    }

    /**
     * Go to sleep until the next wakeup condition is met,  the
     * RTC time must have been set before calling this function.
     * 
     * @param secBeforeSleep : number of seconds before going into sleep mode,
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_sleep(int_secBeforeSleep)
    {
        var currTime; // type: int;
        currTime = this.get_rtcTime();
        if (!(currTime != 0)) return this._throw( YAPI_RTC_NOT_READY, "RTC time not set", YAPI_RTC_NOT_READY);
        this.set_nextWakeUp(this._endOfTime);
        this.set_sleepCountdown(int_secBeforeSleep);
        return YAPI_SUCCESS; 
        
    }

    /**
     * Go to sleep for a specific time or until the next wakeup condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     * 
     * @param secUntilWakeUp : sleep duration, in secondes
     * @param secBeforeSleep : number of seconds before going into sleep mode
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_sleepFor(int_secUntilWakeUp,int_secBeforeSleep)
    {
        var currTime; // type: int;
        currTime = this.get_rtcTime();
        if (!(currTime != 0)) return this._throw( YAPI_RTC_NOT_READY, "RTC time not set", YAPI_RTC_NOT_READY);
        this.set_nextWakeUp(currTime+int_secUntilWakeUp);
        this.set_sleepCountdown(int_secBeforeSleep);
        return YAPI_SUCCESS; 
        
    }

    /**
     * Go to sleep until a specific date is reached or until the next wakeup condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     * 
     * @param wakeUpTime : wake-up datetime (UNIX format)
     * @param secBeforeSleep : number of seconds before going into sleep mode
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_sleepUntil(int_wakeUpTime,int_secBeforeSleep)
    {
        var currTime; // type: int;
        currTime = this.get_rtcTime();
        if (!(currTime != 0)) return this._throw( YAPI_RTC_NOT_READY, "RTC time not set", YAPI_RTC_NOT_READY);
        this.set_nextWakeUp(int_wakeUpTime);
        this.set_sleepCountdown(int_secBeforeSleep);
        return YAPI_SUCCESS; 
        
    }

    /**
     * Reset the sleep countdown.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpMonitor_resetSleepCountDown()
    {
        this.set_sleepCountdown(0);
        this.set_nextWakeUp(0);
        return YAPI_SUCCESS; 
        
    }

    /**
     * Continues the enumeration of monitors started using yFirstWakeUpMonitor().
     * 
     * @return a pointer to a YWakeUpMonitor object, corresponding to
     *         a monitor currently online, or a null pointer
     *         if there are no more monitors to enumerate.
     */
    function YWakeUpMonitor_nextWakeUpMonitor()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitor(next_hwid);
    }

    /**
     * Retrieves a monitor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the monitor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpMonitor.isOnline() to test if the monitor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a monitor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the monitor
     * 
     * @return a YWakeUpMonitor object allowing you to drive the monitor.
     */
    function YWakeUpMonitor_FindWakeUpMonitor(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('WakeUpMonitor', str_func);
        if(obj_func) return obj_func;
        return new YWakeUpMonitor(str_func);
    }

    /**
     * Starts the enumeration of monitors currently accessible.
     * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
     * next monitors.
     * 
     * @return a pointer to a YWakeUpMonitor object, corresponding to
     *         the first monitor currently online, or a null pointer
     *         if there are none.
     */
    function YWakeUpMonitor_FirstWakeUpMonitor()
    {
        var next_hwid = YAPI.getFirstHardwareId('WakeUpMonitor');
        if(next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitor(next_hwid);
    }

    //--- (end of YWakeUpMonitor implementation)

    function _YWakeUpMonitor(str_func)
    {
        //--- (YWakeUpMonitor constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'WakeUpMonitor', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.POWERDURATION_INVALID           = Number.NEGATIVE_INFINITY;
        this.SLEEPCOUNTDOWN_INVALID          = Number.NEGATIVE_INFINITY;
        this.NEXTWAKEUP_INVALID              = -1;
        this.WAKEUPREASON_USBPOWER           = 0;
        this.WAKEUPREASON_EXTPOWER           = 1;
        this.WAKEUPREASON_ENDOFSLEEP         = 2;
        this.WAKEUPREASON_EXTSIG1            = 3;
        this.WAKEUPREASON_EXTSIG2            = 4;
        this.WAKEUPREASON_EXTSIG3            = 5;
        this.WAKEUPREASON_EXTSIG4            = 6;
        this.WAKEUPREASON_SCHEDULE1          = 7;
        this.WAKEUPREASON_SCHEDULE2          = 8;
        this.WAKEUPREASON_SCHEDULE3          = 9;
        this.WAKEUPREASON_SCHEDULE4          = 10;
        this.WAKEUPREASON_SCHEDULE5          = 11;
        this.WAKEUPREASON_SCHEDULE6          = 12;
        this.WAKEUPREASON_INVALID            = -1;
        this.WAKEUPSTATE_SLEEPING            = 0;
        this.WAKEUPSTATE_AWAKE               = 1;
        this.WAKEUPSTATE_INVALID             = -1;
        this.RTCTIME_INVALID                 = -1;
        this._endOfTime                      = 2145960000;
        this.get_logicalName                 = YWakeUpMonitor_get_logicalName;
        this.logicalName                     = YWakeUpMonitor_get_logicalName;
        this.get_logicalName_async           = YWakeUpMonitor_get_logicalName_async;
        this.logicalName_async               = YWakeUpMonitor_get_logicalName_async;
        this.set_logicalName                 = YWakeUpMonitor_set_logicalName;
        this.setLogicalName                  = YWakeUpMonitor_set_logicalName;
        this.get_advertisedValue             = YWakeUpMonitor_get_advertisedValue;
        this.advertisedValue                 = YWakeUpMonitor_get_advertisedValue;
        this.get_advertisedValue_async       = YWakeUpMonitor_get_advertisedValue_async;
        this.advertisedValue_async           = YWakeUpMonitor_get_advertisedValue_async;
        this.get_powerDuration               = YWakeUpMonitor_get_powerDuration;
        this.powerDuration                   = YWakeUpMonitor_get_powerDuration;
        this.get_powerDuration_async         = YWakeUpMonitor_get_powerDuration_async;
        this.powerDuration_async             = YWakeUpMonitor_get_powerDuration_async;
        this.set_powerDuration               = YWakeUpMonitor_set_powerDuration;
        this.setPowerDuration                = YWakeUpMonitor_set_powerDuration;
        this.get_sleepCountdown              = YWakeUpMonitor_get_sleepCountdown;
        this.sleepCountdown                  = YWakeUpMonitor_get_sleepCountdown;
        this.get_sleepCountdown_async        = YWakeUpMonitor_get_sleepCountdown_async;
        this.sleepCountdown_async            = YWakeUpMonitor_get_sleepCountdown_async;
        this.set_sleepCountdown              = YWakeUpMonitor_set_sleepCountdown;
        this.setSleepCountdown               = YWakeUpMonitor_set_sleepCountdown;
        this.get_nextWakeUp                  = YWakeUpMonitor_get_nextWakeUp;
        this.nextWakeUp                      = YWakeUpMonitor_get_nextWakeUp;
        this.get_nextWakeUp_async            = YWakeUpMonitor_get_nextWakeUp_async;
        this.nextWakeUp_async                = YWakeUpMonitor_get_nextWakeUp_async;
        this.set_nextWakeUp                  = YWakeUpMonitor_set_nextWakeUp;
        this.setNextWakeUp                   = YWakeUpMonitor_set_nextWakeUp;
        this.get_wakeUpReason                = YWakeUpMonitor_get_wakeUpReason;
        this.wakeUpReason                    = YWakeUpMonitor_get_wakeUpReason;
        this.get_wakeUpReason_async          = YWakeUpMonitor_get_wakeUpReason_async;
        this.wakeUpReason_async              = YWakeUpMonitor_get_wakeUpReason_async;
        this.get_wakeUpState                 = YWakeUpMonitor_get_wakeUpState;
        this.wakeUpState                     = YWakeUpMonitor_get_wakeUpState;
        this.get_wakeUpState_async           = YWakeUpMonitor_get_wakeUpState_async;
        this.wakeUpState_async               = YWakeUpMonitor_get_wakeUpState_async;
        this.set_wakeUpState                 = YWakeUpMonitor_set_wakeUpState;
        this.setWakeUpState                  = YWakeUpMonitor_set_wakeUpState;
        this.get_rtcTime                     = YWakeUpMonitor_get_rtcTime;
        this.rtcTime                         = YWakeUpMonitor_get_rtcTime;
        this.get_rtcTime_async               = YWakeUpMonitor_get_rtcTime_async;
        this.rtcTime_async                   = YWakeUpMonitor_get_rtcTime_async;
        this.wakeUp                          = YWakeUpMonitor_wakeUp;
        this.sleep                           = YWakeUpMonitor_sleep;
        this.sleepFor                        = YWakeUpMonitor_sleepFor;
        this.sleepUntil                      = YWakeUpMonitor_sleepUntil;
        this.resetSleepCountDown             = YWakeUpMonitor_resetSleepCountDown;
        this.nextWakeUpMonitor               = YWakeUpMonitor_nextWakeUpMonitor;
        //--- (end of YWakeUpMonitor constructor)
    }

    YWakeUpMonitor = _YWakeUpMonitor;
    YWakeUpMonitor.FindWakeUpMonitor  = YWakeUpMonitor_FindWakeUpMonitor;
    YWakeUpMonitor.FirstWakeUpMonitor = YWakeUpMonitor_FirstWakeUpMonitor;
})();

//--- (WakeUpMonitor functions)

/**
 * Retrieves a monitor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the monitor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YWakeUpMonitor.isOnline() to test if the monitor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a monitor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the monitor
 * 
 * @return a YWakeUpMonitor object allowing you to drive the monitor.
 */
function yFindWakeUpMonitor(str_func)
{
    return YWakeUpMonitor.FindWakeUpMonitor(str_func);
}

/**
 * Starts the enumeration of monitors currently accessible.
 * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
 * next monitors.
 * 
 * @return a pointer to a YWakeUpMonitor object, corresponding to
 *         the first monitor currently online, or a null pointer
 *         if there are none.
 */
function yFirstWakeUpMonitor()
{
    return YWakeUpMonitor.FirstWakeUpMonitor();
}

//--- (end of WakeUpMonitor functions)
