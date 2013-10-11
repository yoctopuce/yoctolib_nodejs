/*********************************************************************
 *
 * $Id: yocto_watchdog.js 13065 2013-10-10 16:04:55Z mvuilleu $
 *
 * Implements yFindWatchdog(), the high-level API for Watchdog functions
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
//--- (YWatchdog definitions)
var Y_STATE_A                       = 0;
var Y_STATE_B                       = 1;
var Y_STATE_INVALID                 = -1;
var Y_OUTPUT_OFF                    = 0;
var Y_OUTPUT_ON                     = 1;
var Y_OUTPUT_INVALID                = -1;
var Y_AUTOSTART_OFF                 = 0;
var Y_AUTOSTART_ON                  = 1;
var Y_AUTOSTART_INVALID             = -1;
var Y_RUNNING_OFF                   = 0;
var Y_RUNNING_ON                    = 1;
var Y_RUNNING_INVALID               = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_PULSETIMER_INVALID            = -1;
var Y_DELAYEDPULSETIMER_INVALID     = null;
var Y_COUNTDOWN_INVALID             = -1;
var Y_TRIGGERDELAY_INVALID          = -1;
var Y_TRIGGERDURATION_INVALID       = -1;
//--- (end of YWatchdog definitions)

/**
 * YWatchdog Class: Watchdog function interface
 * 
 * The watchog function works like a relay and can cause a brief power cut
 * to an appliance after a preset delay to force this appliance to
 * reset. The Watchdog must be called from time to time to reset the
 * timer and prevent the appliance reset.
 * The watchdog can be driven direcly with <i>pulse</i> and <i>delayedpulse</i> methods to switch
 * off an appliance for a given duration.
 */
var YWatchdog; // definition below
(function()
{
    //--- (YWatchdog implementation)

    /**
     * Returns the logical name of the watchdog.
     * 
     * @return a string corresponding to the logical name of the watchdog
     * 
     * On failure, throws an exception or returns YWatchdog.LOGICALNAME_INVALID.
     */
    function YWatchdog_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Gets the logical name of the watchdog.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:a string corresponding to the logical name of the watchd
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YWatchdog_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the watchdog. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the watchdog
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the watchdog (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the watchdog (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YWatchdog.ADVERTISEDVALUE_INVALID.
     */
    function YWatchdog_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Gets the current value of the watchdog (no more than 6 characters).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:a string corresponding to the current value of the watchdog (no more than 6 character
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YWatchdog_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the state of the watchdog (A for the idle position, B for the active position).
     * 
     * @return either YWatchdog.STATE_A or YWatchdog.STATE_B, according to the state of the watchdog (A
     * for the idle position, B for the active position)
     * 
     * On failure, throws an exception or returns YWatchdog.STATE_INVALID.
     */
    function YWatchdog_get_state()
    {   var json_val = this._getAttr('state');
        return (json_val == null ? Y_STATE_INVALID : parseInt(json_val));
    }

    /**
     * Gets the state of the watchdog (A for the idle position, B for the active position).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:either Y_STATE_A or Y_STATE_B, according to the state of the watchdog (A for the idle
     *         position, B for the active positio
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_STATE_INVALID.
     */
    function YWatchdog_get_state_async(func_callback, obj_context)
    {   this._getAttr_async('state',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_STATE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the state of the watchdog (A for the idle position, B for the active position).
     * 
     * @param newval : either YWatchdog.STATE_A or YWatchdog.STATE_B, according to the state of the
     * watchdog (A for the idle position, B for the active position)
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_set_state(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('state',rest_val);
    }

    /**
     * Returns the output state of the watchdog, when used as a simple switch (single throw).
     * 
     * @return either YWatchdog.OUTPUT_OFF or YWatchdog.OUTPUT_ON, according to the output state of the
     * watchdog, when used as a simple switch (single throw)
     * 
     * On failure, throws an exception or returns YWatchdog.OUTPUT_INVALID.
     */
    function YWatchdog_get_output()
    {   var json_val = this._getAttr('output');
        return (json_val == null ? Y_OUTPUT_INVALID : parseInt(json_val));
    }

    /**
     * Gets the output state of the watchdog, when used as a simple switch (single throw).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:either Y_OUTPUT_OFF or Y_OUTPUT_ON, according to the output state of the watchdog,
     *         when used as a simple switch (single thro
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_OUTPUT_INVALID.
     */
    function YWatchdog_get_output_async(func_callback, obj_context)
    {   this._getAttr_async('output',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_OUTPUT_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the output state of the watchdog, when used as a simple switch (single throw).
     * 
     * @param newval : either YWatchdog.OUTPUT_OFF or YWatchdog.OUTPUT_ON, according to the output state
     * of the watchdog, when used as a simple switch (single throw)
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_set_output(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('output',rest_val);
    }

    /**
     * Returns the number of milliseconds remaining before the watchdog is returned to idle position
     * (state A), during a measured pulse generation. When there is no ongoing pulse, returns zero.
     * 
     * @return an integer corresponding to the number of milliseconds remaining before the watchdog is
     * returned to idle position
     *         (state A), during a measured pulse generation
     * 
     * On failure, throws an exception or returns YWatchdog.PULSETIMER_INVALID.
     */
    function YWatchdog_get_pulseTimer()
    {   var json_val = this._getAttr('pulseTimer');
        return (json_val == null ? Y_PULSETIMER_INVALID : parseInt(json_val));
    }

    /**
     * Gets the number of milliseconds remaining before the watchdog is returned to idle position
     * (state A), during a measured pulse generation. When there is no ongoing pulse, returns zero.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:an integer corresponding to the number of milliseconds remaining before the watchdog
     *         is returned to idle position
     *         (state A), during a measured pulse generati
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    function YWatchdog_get_pulseTimer_async(func_callback, obj_context)
    {   this._getAttr_async('pulseTimer',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PULSETIMER_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YWatchdog_set_pulseTimer(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pulseTimer',rest_val);
    }

    /**
     * Sets the relay to output B (active) for a specified duration, then brings it
     * automatically back to output A (idle state).
     * 
     * @param ms_duration : pulse duration, in millisecondes
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_pulse(int_ms_duration)
    {   var rest_val;
        rest_val = String(int_ms_duration);
        return this._setAttr('pulseTimer',rest_val);
    }

    function YWatchdog_get_delayedPulseTimer()
    {   var json_val = this._getAttr('delayedPulseTimer');
        return (json_val == null ? Y_DELAYEDPULSETIMER_INVALID : json_val);
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YWatchdog_get_delayedPulseTimer_async(func_callback, obj_context)
    {   this._getAttr_async('delayedPulseTimer',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_DELAYEDPULSETIMER_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YWatchdog_set_delayedPulseTimer(newval)
    {   var rest_val;
        rest_val = String(newval.target)+":"+String(newval.ms);
        return this._setAttr('delayedPulseTimer',rest_val);
    }

    /**
     * Schedules a pulse.
     * 
     * @param ms_delay : waiting time before the pulse, in millisecondes
     * @param ms_duration : pulse duration, in millisecondes
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_delayedPulse(int_ms_delay,int_ms_duration)
    {   var rest_val;
        rest_val = String(int_ms_delay)+":"+String(int_ms_duration);
        return this._setAttr('delayedPulseTimer',rest_val);
    }

    /**
     * Returns the number of milliseconds remaining before a pulse (delayedPulse() call)
     * When there is no scheduled pulse, returns zero.
     * 
     * @return an integer corresponding to the number of milliseconds remaining before a pulse (delayedPulse() call)
     *         When there is no scheduled pulse, returns zero
     * 
     * On failure, throws an exception or returns YWatchdog.COUNTDOWN_INVALID.
     */
    function YWatchdog_get_countdown()
    {   var json_val = this._getAttr('countdown');
        return (json_val == null ? Y_COUNTDOWN_INVALID : parseInt(json_val));
    }

    /**
     * Gets the number of milliseconds remaining before a pulse (delayedPulse() call)
     * When there is no scheduled pulse, returns zero.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:an integer corresponding to the number of milliseconds remaining before a pulse
     *         (delayedPulse() call)
     *         When there is no scheduled pulse, returns ze
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_COUNTDOWN_INVALID.
     */
    function YWatchdog_get_countdown_async(func_callback, obj_context)
    {   this._getAttr_async('countdown',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_COUNTDOWN_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the watchdog runing state at module power up.
     * 
     * @return either YWatchdog.AUTOSTART_OFF or YWatchdog.AUTOSTART_ON, according to the watchdog runing
     * state at module power up
     * 
     * On failure, throws an exception or returns YWatchdog.AUTOSTART_INVALID.
     */
    function YWatchdog_get_autoStart()
    {   var json_val = this._getAttr('autoStart');
        return (json_val == null ? Y_AUTOSTART_INVALID : parseInt(json_val));
    }

    /**
     * Gets the watchdog runing state at module power up.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:either Y_AUTOSTART_OFF or Y_AUTOSTART_ON, according to the watchdog runing state at module power
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_AUTOSTART_INVALID.
     */
    function YWatchdog_get_autoStart_async(func_callback, obj_context)
    {   this._getAttr_async('autoStart',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_AUTOSTART_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the watchdog runningsttae at module power up. Remember to call the
     * saveToFlash() method and then to reboot the module to apply this setting.
     * 
     * @param newval : either YWatchdog.AUTOSTART_OFF or YWatchdog.AUTOSTART_ON, according to the watchdog
     * runningsttae at module power up
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_set_autoStart(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('autoStart',rest_val);
    }

    /**
     * Returns the watchdog running state.
     * 
     * @return either YWatchdog.RUNNING_OFF or YWatchdog.RUNNING_ON, according to the watchdog running state
     * 
     * On failure, throws an exception or returns YWatchdog.RUNNING_INVALID.
     */
    function YWatchdog_get_running()
    {   var json_val = this._getAttr('running');
        return (json_val == null ? Y_RUNNING_INVALID : parseInt(json_val));
    }

    /**
     * Gets the watchdog running state.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:either Y_RUNNING_OFF or Y_RUNNING_ON, according to the watchdog running sta
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_RUNNING_INVALID.
     */
    function YWatchdog_get_running_async(func_callback, obj_context)
    {   this._getAttr_async('running',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RUNNING_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the running state of the watchdog.
     * 
     * @param newval : either YWatchdog.RUNNING_OFF or YWatchdog.RUNNING_ON, according to the running
     * state of the watchdog
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_set_running(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('running',rest_val);
    }

    /**
     * Resets the watchdog. When the watchdog is running, this function
     * must be called on a regular basis to prevent the watchog to
     * trigger
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_resetWatchdog()
    {   var rest_val;
        rest_val = '1';
        return this._setAttr('running',rest_val);
    }

    /**
     * Returns  the waiting duration before a reset is automatically triggered by the watchdog, in milliseconds.
     * 
     * @return an integer corresponding to  the waiting duration before a reset is automatically triggered
     * by the watchdog, in milliseconds
     * 
     * On failure, throws an exception or returns YWatchdog.TRIGGERDELAY_INVALID.
     */
    function YWatchdog_get_triggerDelay()
    {   var json_val = this._getAttr('triggerDelay');
        return (json_val == null ? Y_TRIGGERDELAY_INVALID : parseInt(json_val));
    }

    /**
     * Gets  the waiting duration before a reset is automatically triggered by the watchdog, in milliseconds.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:an integer corresponding to  the waiting duration before a reset is automatically
     *         triggered by the watchdog, in millisecon
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_TRIGGERDELAY_INVALID.
     */
    function YWatchdog_get_triggerDelay_async(func_callback, obj_context)
    {   this._getAttr_async('triggerDelay',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_TRIGGERDELAY_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the waiting delay before a reset is triggered by the watchdog, in milliseconds.
     * 
     * @param newval : an integer corresponding to the waiting delay before a reset is triggered by the
     * watchdog, in milliseconds
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_set_triggerDelay(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('triggerDelay',rest_val);
    }

    /**
     * Returns the duration of resets caused by the watchdog, in milliseconds.
     * 
     * @return an integer corresponding to the duration of resets caused by the watchdog, in milliseconds
     * 
     * On failure, throws an exception or returns YWatchdog.TRIGGERDURATION_INVALID.
     */
    function YWatchdog_get_triggerDuration()
    {   var json_val = this._getAttr('triggerDuration');
        return (json_val == null ? Y_TRIGGERDURATION_INVALID : parseInt(json_val));
    }

    /**
     * Gets the duration of resets caused by the watchdog, in milliseconds.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:an integer corresponding to the duration of resets caused by the watchdog, in millisecon
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_TRIGGERDURATION_INVALID.
     */
    function YWatchdog_get_triggerDuration_async(func_callback, obj_context)
    {   this._getAttr_async('triggerDuration',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_TRIGGERDURATION_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the duration of resets caused by the watchdog, in milliseconds.
     * 
     * @param newval : an integer corresponding to the duration of resets caused by the watchdog, in milliseconds
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_set_triggerDuration(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('triggerDuration',rest_val);
    }

    /**
     * Continues the enumeration of watchdog started using yFirstWatchdog().
     * 
     * @return a pointer to a YWatchdog object, corresponding to
     *         a watchdog currently online, or a null pointer
     *         if there are no more watchdog to enumerate.
     */
    function YWatchdog_nextWatchdog()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YWatchdog.FindWatchdog(next_hwid);
    }

    /**
     * Retrieves a watchdog for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the watchdog is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWatchdog.isOnline() to test if the watchdog is
     * indeed online at a given time. In case of ambiguity when looking for
     * a watchdog by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the watchdog
     * 
     * @return a YWatchdog object allowing you to drive the watchdog.
     */
    function YWatchdog_FindWatchdog(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Watchdog', str_func);
        if(obj_func) return obj_func;
        return new YWatchdog(str_func);
    }

    /**
     * Starts the enumeration of watchdog currently accessible.
     * Use the method YWatchdog.nextWatchdog() to iterate on
     * next watchdog.
     * 
     * @return a pointer to a YWatchdog object, corresponding to
     *         the first watchdog currently online, or a null pointer
     *         if there are none.
     */
    function YWatchdog_FirstWatchdog()
    {
        var next_hwid = YAPI.getFirstHardwareId('Watchdog');
        if(next_hwid == null) return null;
        return YWatchdog.FindWatchdog(next_hwid);
    }

    //--- (end of YWatchdog implementation)

    function _YWatchdog(str_func)
    {
        //--- (YWatchdog constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Watchdog', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.STATE_A                         = 0;
        this.STATE_B                         = 1;
        this.STATE_INVALID                   = -1;
        this.OUTPUT_OFF                      = 0;
        this.OUTPUT_ON                       = 1;
        this.OUTPUT_INVALID                  = -1;
        this.PULSETIMER_INVALID              = -1;
        this.COUNTDOWN_INVALID               = -1;
        this.AUTOSTART_OFF                   = 0;
        this.AUTOSTART_ON                    = 1;
        this.AUTOSTART_INVALID               = -1;
        this.RUNNING_OFF                     = 0;
        this.RUNNING_ON                      = 1;
        this.RUNNING_INVALID                 = -1;
        this.TRIGGERDELAY_INVALID            = -1;
        this.TRIGGERDURATION_INVALID         = -1;
        this.get_logicalName                 = YWatchdog_get_logicalName;
        this.logicalName                     = YWatchdog_get_logicalName;
        this.get_logicalName_async           = YWatchdog_get_logicalName_async;
        this.logicalName_async               = YWatchdog_get_logicalName_async;
        this.set_logicalName                 = YWatchdog_set_logicalName;
        this.setLogicalName                  = YWatchdog_set_logicalName;
        this.get_advertisedValue             = YWatchdog_get_advertisedValue;
        this.advertisedValue                 = YWatchdog_get_advertisedValue;
        this.get_advertisedValue_async       = YWatchdog_get_advertisedValue_async;
        this.advertisedValue_async           = YWatchdog_get_advertisedValue_async;
        this.get_state                       = YWatchdog_get_state;
        this.state                           = YWatchdog_get_state;
        this.get_state_async                 = YWatchdog_get_state_async;
        this.state_async                     = YWatchdog_get_state_async;
        this.set_state                       = YWatchdog_set_state;
        this.setState                        = YWatchdog_set_state;
        this.get_output                      = YWatchdog_get_output;
        this.output                          = YWatchdog_get_output;
        this.get_output_async                = YWatchdog_get_output_async;
        this.output_async                    = YWatchdog_get_output_async;
        this.set_output                      = YWatchdog_set_output;
        this.setOutput                       = YWatchdog_set_output;
        this.get_pulseTimer                  = YWatchdog_get_pulseTimer;
        this.pulseTimer                      = YWatchdog_get_pulseTimer;
        this.get_pulseTimer_async            = YWatchdog_get_pulseTimer_async;
        this.pulseTimer_async                = YWatchdog_get_pulseTimer_async;
        this.set_pulseTimer                  = YWatchdog_set_pulseTimer;
        this.setPulseTimer                   = YWatchdog_set_pulseTimer;
        this.pulse                           = YWatchdog_pulse;
        this.get_delayedPulseTimer           = YWatchdog_get_delayedPulseTimer;
        this.delayedPulseTimer               = YWatchdog_get_delayedPulseTimer;
        this.get_delayedPulseTimer_async     = YWatchdog_get_delayedPulseTimer_async;
        this.delayedPulseTimer_async         = YWatchdog_get_delayedPulseTimer_async;
        this.set_delayedPulseTimer           = YWatchdog_set_delayedPulseTimer;
        this.setDelayedPulseTimer            = YWatchdog_set_delayedPulseTimer;
        this.delayedPulse                    = YWatchdog_delayedPulse;
        this.get_countdown                   = YWatchdog_get_countdown;
        this.countdown                       = YWatchdog_get_countdown;
        this.get_countdown_async             = YWatchdog_get_countdown_async;
        this.countdown_async                 = YWatchdog_get_countdown_async;
        this.get_autoStart                   = YWatchdog_get_autoStart;
        this.autoStart                       = YWatchdog_get_autoStart;
        this.get_autoStart_async             = YWatchdog_get_autoStart_async;
        this.autoStart_async                 = YWatchdog_get_autoStart_async;
        this.set_autoStart                   = YWatchdog_set_autoStart;
        this.setAutoStart                    = YWatchdog_set_autoStart;
        this.get_running                     = YWatchdog_get_running;
        this.running                         = YWatchdog_get_running;
        this.get_running_async               = YWatchdog_get_running_async;
        this.running_async                   = YWatchdog_get_running_async;
        this.set_running                     = YWatchdog_set_running;
        this.setRunning                      = YWatchdog_set_running;
        this.resetWatchdog                   = YWatchdog_resetWatchdog;
        this.get_triggerDelay                = YWatchdog_get_triggerDelay;
        this.triggerDelay                    = YWatchdog_get_triggerDelay;
        this.get_triggerDelay_async          = YWatchdog_get_triggerDelay_async;
        this.triggerDelay_async              = YWatchdog_get_triggerDelay_async;
        this.set_triggerDelay                = YWatchdog_set_triggerDelay;
        this.setTriggerDelay                 = YWatchdog_set_triggerDelay;
        this.get_triggerDuration             = YWatchdog_get_triggerDuration;
        this.triggerDuration                 = YWatchdog_get_triggerDuration;
        this.get_triggerDuration_async       = YWatchdog_get_triggerDuration_async;
        this.triggerDuration_async           = YWatchdog_get_triggerDuration_async;
        this.set_triggerDuration             = YWatchdog_set_triggerDuration;
        this.setTriggerDuration              = YWatchdog_set_triggerDuration;
        this.nextWatchdog                    = YWatchdog_nextWatchdog;
        //--- (end of YWatchdog constructor)
    }

    YWatchdog = _YWatchdog;
    YWatchdog.LOGICALNAME_INVALID             = "!INVALID!";
    YWatchdog.ADVERTISEDVALUE_INVALID         = "!INVALID!";
    YWatchdog.STATE_A                         = 0;
    YWatchdog.STATE_B                         = 1;
    YWatchdog.STATE_INVALID                   = -1;
    YWatchdog.OUTPUT_OFF                      = 0;
    YWatchdog.OUTPUT_ON                       = 1;
    YWatchdog.OUTPUT_INVALID                  = -1;
    YWatchdog.PULSETIMER_INVALID              = -1;
    YWatchdog.COUNTDOWN_INVALID               = -1;
    YWatchdog.AUTOSTART_OFF                   = 0;
    YWatchdog.AUTOSTART_ON                    = 1;
    YWatchdog.AUTOSTART_INVALID               = -1;
    YWatchdog.RUNNING_OFF                     = 0;
    YWatchdog.RUNNING_ON                      = 1;
    YWatchdog.RUNNING_INVALID                 = -1;
    YWatchdog.TRIGGERDELAY_INVALID            = -1;
    YWatchdog.TRIGGERDURATION_INVALID         = -1;
    YWatchdog.FindWatchdog  = YWatchdog_FindWatchdog;
    YWatchdog.FirstWatchdog = YWatchdog_FirstWatchdog;
})();

//--- (Watchdog functions)

/**
 * Retrieves a watchdog for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the watchdog is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YWatchdog.isOnline() to test if the watchdog is
 * indeed online at a given time. In case of ambiguity when looking for
 * a watchdog by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the watchdog
 * 
 * @return a YWatchdog object allowing you to drive the watchdog.
 */
function yFindWatchdog(str_func)
{
    return YWatchdog.FindWatchdog(str_func);
}

/**
 * Starts the enumeration of watchdog currently accessible.
 * Use the method YWatchdog.nextWatchdog() to iterate on
 * next watchdog.
 * 
 * @return a pointer to a YWatchdog object, corresponding to
 *         the first watchdog currently online, or a null pointer
 *         if there are none.
 */
function yFirstWatchdog()
{
    return YWatchdog.FirstWatchdog();
}

//--- (end of Watchdog functions)
