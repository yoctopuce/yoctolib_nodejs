/*********************************************************************
 *
 * $Id: yocto_relay.js 13065 2013-10-10 16:04:55Z mvuilleu $
 *
 * Implements yFindRelay(), the high-level API for Relay functions
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
//--- (YRelay definitions)
var Y_STATE_A                       = 0;
var Y_STATE_B                       = 1;
var Y_STATE_INVALID                 = -1;
var Y_OUTPUT_OFF                    = 0;
var Y_OUTPUT_ON                     = 1;
var Y_OUTPUT_INVALID                = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_PULSETIMER_INVALID            = -1;
var Y_DELAYEDPULSETIMER_INVALID     = null;
var Y_COUNTDOWN_INVALID             = -1;
//--- (end of YRelay definitions)

/**
 * YRelay Class: Relay function interface
 * 
 * The Yoctopuce application programming interface allows you to switch the relay state.
 * This change is not persistent: the relay will automatically return to its idle position
 * whenever power is lost or if the module is restarted.
 * The library can also generate automatically short pulses of determined duration.
 * On devices with two output for each relay (double throw), the two outputs are named A and B,
 * with output A corresponding to the idle position (at power off) and the output B corresponding to the
 * active state. If you prefer the alternate default state, simply switch your cables on the board.
 */
var YRelay; // definition below
(function()
{
    //--- (YRelay implementation)

    /**
     * Returns the logical name of the relay.
     * 
     * @return a string corresponding to the logical name of the relay
     * 
     * On failure, throws an exception or returns YRelay.LOGICALNAME_INVALID.
     */
    function YRelay_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Gets the logical name of the relay.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:a string corresponding to the logical name of the rel
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YRelay_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the relay. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the relay
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRelay_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the relay (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the relay (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YRelay.ADVERTISEDVALUE_INVALID.
     */
    function YRelay_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Gets the current value of the relay (no more than 6 characters).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:a string corresponding to the current value of the relay (no more than 6 character
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YRelay_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the state of the relays (A for the idle position, B for the active position).
     * 
     * @return either YRelay.STATE_A or YRelay.STATE_B, according to the state of the relays (A for the
     * idle position, B for the active position)
     * 
     * On failure, throws an exception or returns YRelay.STATE_INVALID.
     */
    function YRelay_get_state()
    {   var json_val = this._getAttr('state');
        return (json_val == null ? Y_STATE_INVALID : parseInt(json_val));
    }

    /**
     * Gets the state of the relays (A for the idle position, B for the active position).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:either Y_STATE_A or Y_STATE_B, according to the state of the relays (A for the idle
     *         position, B for the active positio
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_STATE_INVALID.
     */
    function YRelay_get_state_async(func_callback, obj_context)
    {   this._getAttr_async('state',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_STATE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the state of the relays (A for the idle position, B for the active position).
     * 
     * @param newval : either YRelay.STATE_A or YRelay.STATE_B, according to the state of the relays (A
     * for the idle position, B for the active position)
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRelay_set_state(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('state',rest_val);
    }

    /**
     * Returns the output state of the relays, when used as a simple switch (single throw).
     * 
     * @return either YRelay.OUTPUT_OFF or YRelay.OUTPUT_ON, according to the output state of the relays,
     * when used as a simple switch (single throw)
     * 
     * On failure, throws an exception or returns YRelay.OUTPUT_INVALID.
     */
    function YRelay_get_output()
    {   var json_val = this._getAttr('output');
        return (json_val == null ? Y_OUTPUT_INVALID : parseInt(json_val));
    }

    /**
     * Gets the output state of the relays, when used as a simple switch (single throw).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:either Y_OUTPUT_OFF or Y_OUTPUT_ON, according to the output state of the relays, when
     *         used as a simple switch (single thro
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_OUTPUT_INVALID.
     */
    function YRelay_get_output_async(func_callback, obj_context)
    {   this._getAttr_async('output',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_OUTPUT_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the output state of the relays, when used as a simple switch (single throw).
     * 
     * @param newval : either YRelay.OUTPUT_OFF or YRelay.OUTPUT_ON, according to the output state of the
     * relays, when used as a simple switch (single throw)
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRelay_set_output(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('output',rest_val);
    }

    /**
     * Returns the number of milliseconds remaining before the relays is returned to idle position
     * (state A), during a measured pulse generation. When there is no ongoing pulse, returns zero.
     * 
     * @return an integer corresponding to the number of milliseconds remaining before the relays is
     * returned to idle position
     *         (state A), during a measured pulse generation
     * 
     * On failure, throws an exception or returns YRelay.PULSETIMER_INVALID.
     */
    function YRelay_get_pulseTimer()
    {   var json_val = this._getAttr('pulseTimer');
        return (json_val == null ? Y_PULSETIMER_INVALID : parseInt(json_val));
    }

    /**
     * Gets the number of milliseconds remaining before the relays is returned to idle position
     * (state A), during a measured pulse generation. When there is no ongoing pulse, returns zero.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:an integer corresponding to the number of milliseconds remaining before the relays is
     *         returned to idle position
     *         (state A), during a measured pulse generati
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    function YRelay_get_pulseTimer_async(func_callback, obj_context)
    {   this._getAttr_async('pulseTimer',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PULSETIMER_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YRelay_set_pulseTimer(newval)
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
    function YRelay_pulse(int_ms_duration)
    {   var rest_val;
        rest_val = String(int_ms_duration);
        return this._setAttr('pulseTimer',rest_val);
    }

    function YRelay_get_delayedPulseTimer()
    {   var json_val = this._getAttr('delayedPulseTimer');
        return (json_val == null ? Y_DELAYEDPULSETIMER_INVALID : json_val);
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRelay object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YRelay_get_delayedPulseTimer_async(func_callback, obj_context)
    {   this._getAttr_async('delayedPulseTimer',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_DELAYEDPULSETIMER_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YRelay_set_delayedPulseTimer(newval)
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
    function YRelay_delayedPulse(int_ms_delay,int_ms_duration)
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
     * On failure, throws an exception or returns YRelay.COUNTDOWN_INVALID.
     */
    function YRelay_get_countdown()
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
     *         - the YRelay object that invoked the callback
     *         - the result:an integer corresponding to the number of milliseconds remaining before a pulse
     *         (delayedPulse() call)
     *         When there is no scheduled pulse, returns ze
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_COUNTDOWN_INVALID.
     */
    function YRelay_get_countdown_async(func_callback, obj_context)
    {   this._getAttr_async('countdown',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_COUNTDOWN_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Continues the enumeration of relays started using yFirstRelay().
     * 
     * @return a pointer to a YRelay object, corresponding to
     *         a relay currently online, or a null pointer
     *         if there are no more relays to enumerate.
     */
    function YRelay_nextRelay()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YRelay.FindRelay(next_hwid);
    }

    /**
     * Retrieves a relay for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the relay is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRelay.isOnline() to test if the relay is
     * indeed online at a given time. In case of ambiguity when looking for
     * a relay by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the relay
     * 
     * @return a YRelay object allowing you to drive the relay.
     */
    function YRelay_FindRelay(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Relay', str_func);
        if(obj_func) return obj_func;
        return new YRelay(str_func);
    }

    /**
     * Starts the enumeration of relays currently accessible.
     * Use the method YRelay.nextRelay() to iterate on
     * next relays.
     * 
     * @return a pointer to a YRelay object, corresponding to
     *         the first relay currently online, or a null pointer
     *         if there are none.
     */
    function YRelay_FirstRelay()
    {
        var next_hwid = YAPI.getFirstHardwareId('Relay');
        if(next_hwid == null) return null;
        return YRelay.FindRelay(next_hwid);
    }

    //--- (end of YRelay implementation)

    function _YRelay(str_func)
    {
        //--- (YRelay constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Relay', str_func);
        
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
        this.get_logicalName                 = YRelay_get_logicalName;
        this.logicalName                     = YRelay_get_logicalName;
        this.get_logicalName_async           = YRelay_get_logicalName_async;
        this.logicalName_async               = YRelay_get_logicalName_async;
        this.set_logicalName                 = YRelay_set_logicalName;
        this.setLogicalName                  = YRelay_set_logicalName;
        this.get_advertisedValue             = YRelay_get_advertisedValue;
        this.advertisedValue                 = YRelay_get_advertisedValue;
        this.get_advertisedValue_async       = YRelay_get_advertisedValue_async;
        this.advertisedValue_async           = YRelay_get_advertisedValue_async;
        this.get_state                       = YRelay_get_state;
        this.state                           = YRelay_get_state;
        this.get_state_async                 = YRelay_get_state_async;
        this.state_async                     = YRelay_get_state_async;
        this.set_state                       = YRelay_set_state;
        this.setState                        = YRelay_set_state;
        this.get_output                      = YRelay_get_output;
        this.output                          = YRelay_get_output;
        this.get_output_async                = YRelay_get_output_async;
        this.output_async                    = YRelay_get_output_async;
        this.set_output                      = YRelay_set_output;
        this.setOutput                       = YRelay_set_output;
        this.get_pulseTimer                  = YRelay_get_pulseTimer;
        this.pulseTimer                      = YRelay_get_pulseTimer;
        this.get_pulseTimer_async            = YRelay_get_pulseTimer_async;
        this.pulseTimer_async                = YRelay_get_pulseTimer_async;
        this.set_pulseTimer                  = YRelay_set_pulseTimer;
        this.setPulseTimer                   = YRelay_set_pulseTimer;
        this.pulse                           = YRelay_pulse;
        this.get_delayedPulseTimer           = YRelay_get_delayedPulseTimer;
        this.delayedPulseTimer               = YRelay_get_delayedPulseTimer;
        this.get_delayedPulseTimer_async     = YRelay_get_delayedPulseTimer_async;
        this.delayedPulseTimer_async         = YRelay_get_delayedPulseTimer_async;
        this.set_delayedPulseTimer           = YRelay_set_delayedPulseTimer;
        this.setDelayedPulseTimer            = YRelay_set_delayedPulseTimer;
        this.delayedPulse                    = YRelay_delayedPulse;
        this.get_countdown                   = YRelay_get_countdown;
        this.countdown                       = YRelay_get_countdown;
        this.get_countdown_async             = YRelay_get_countdown_async;
        this.countdown_async                 = YRelay_get_countdown_async;
        this.nextRelay                       = YRelay_nextRelay;
        //--- (end of YRelay constructor)
    }

    YRelay = _YRelay;
    YRelay.LOGICALNAME_INVALID             = "!INVALID!";
    YRelay.ADVERTISEDVALUE_INVALID         = "!INVALID!";
    YRelay.STATE_A                         = 0;
    YRelay.STATE_B                         = 1;
    YRelay.STATE_INVALID                   = -1;
    YRelay.OUTPUT_OFF                      = 0;
    YRelay.OUTPUT_ON                       = 1;
    YRelay.OUTPUT_INVALID                  = -1;
    YRelay.PULSETIMER_INVALID              = -1;
    YRelay.COUNTDOWN_INVALID               = -1;
    YRelay.FindRelay  = YRelay_FindRelay;
    YRelay.FirstRelay = YRelay_FirstRelay;
})();

//--- (Relay functions)

/**
 * Retrieves a relay for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the relay is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YRelay.isOnline() to test if the relay is
 * indeed online at a given time. In case of ambiguity when looking for
 * a relay by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the relay
 * 
 * @return a YRelay object allowing you to drive the relay.
 */
function yFindRelay(str_func)
{
    return YRelay.FindRelay(str_func);
}

/**
 * Starts the enumeration of relays currently accessible.
 * Use the method YRelay.nextRelay() to iterate on
 * next relays.
 * 
 * @return a pointer to a YRelay object, corresponding to
 *         the first relay currently online, or a null pointer
 *         if there are none.
 */
function yFirstRelay()
{
    return YRelay.FirstRelay();
}

//--- (end of Relay functions)
