/*********************************************************************
 *
 * $Id: yocto_watchdog.js 15434 2014-03-14 06:37:47Z mvuilleu $
 *
 * Implements the high-level API for Watchdog functions
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

//--- (YWatchdog return codes)
//--- (end of YWatchdog return codes)
//--- (YWatchdog definitions)
var Y_STATE_A                       = 0;
var Y_STATE_B                       = 1;
var Y_STATE_INVALID                 = -1;
var Y_STATEATPOWERON_UNCHANGED      = 0;
var Y_STATEATPOWERON_A              = 1;
var Y_STATEATPOWERON_B              = 2;
var Y_STATEATPOWERON_INVALID        = -1;
var Y_OUTPUT_OFF                    = 0;
var Y_OUTPUT_ON                     = 1;
var Y_OUTPUT_INVALID                = -1;
var Y_AUTOSTART_OFF                 = 0;
var Y_AUTOSTART_ON                  = 1;
var Y_AUTOSTART_INVALID             = -1;
var Y_RUNNING_OFF                   = 0;
var Y_RUNNING_ON                    = 1;
var Y_RUNNING_INVALID               = -1;
var Y_MAXTIMEONSTATEA_INVALID       = YAPI_INVALID_LONG;
var Y_MAXTIMEONSTATEB_INVALID       = YAPI_INVALID_LONG;
var Y_PULSETIMER_INVALID            = YAPI_INVALID_LONG;
var Y_DELAYEDPULSETIMER_INVALID     = null;
var Y_COUNTDOWN_INVALID             = YAPI_INVALID_LONG;
var Y_TRIGGERDELAY_INVALID          = YAPI_INVALID_LONG;
var Y_TRIGGERDURATION_INVALID       = YAPI_INVALID_LONG;
//--- (end of YWatchdog definitions)

//--- (YWatchdog class start)
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
//--- (end of YWatchdog class start)

var YWatchdog; // definition below
(function()
{
    function _YWatchdog(str_func)
    {
        //--- (YWatchdog constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Watchdog';

        this._state                          = Y_STATE_INVALID;            // Toggle
        this._stateAtPowerOn                 = Y_STATEATPOWERON_INVALID;   // ToggleAtPowerOn
        this._maxTimeOnStateA                = Y_MAXTIMEONSTATEA_INVALID;  // Time
        this._maxTimeOnStateB                = Y_MAXTIMEONSTATEB_INVALID;  // Time
        this._output                         = Y_OUTPUT_INVALID;           // OnOff
        this._pulseTimer                     = Y_PULSETIMER_INVALID;       // Time
        this._delayedPulseTimer              = Y_DELAYEDPULSETIMER_INVALID; // DelayedPulse
        this._countdown                      = Y_COUNTDOWN_INVALID;        // Time
        this._autoStart                      = Y_AUTOSTART_INVALID;        // OnOff
        this._running                        = Y_RUNNING_INVALID;          // OnOff
        this._triggerDelay                   = Y_TRIGGERDELAY_INVALID;     // Time
        this._triggerDuration                = Y_TRIGGERDURATION_INVALID;  // Time
        //--- (end of YWatchdog constructor)
    }

    //--- (YWatchdog implementation)

    function YWatchdog_parseAttr(name, val, _super)
    {
        switch(name) {
        case "state":
            this._state = parseInt(val);
            return 1;
        case "stateAtPowerOn":
            this._stateAtPowerOn = parseInt(val);
            return 1;
        case "maxTimeOnStateA":
            this._maxTimeOnStateA = parseInt(val);
            return 1;
        case "maxTimeOnStateB":
            this._maxTimeOnStateB = parseInt(val);
            return 1;
        case "output":
            this._output = parseInt(val);
            return 1;
        case "pulseTimer":
            this._pulseTimer = parseInt(val);
            return 1;
        case "delayedPulseTimer":
            this._delayedPulseTimer = val;
            return 1;
        case "countdown":
            this._countdown = parseInt(val);
            return 1;
        case "autoStart":
            this._autoStart = parseInt(val);
            return 1;
        case "running":
            this._running = parseInt(val);
            return 1;
        case "triggerDelay":
            this._triggerDelay = parseInt(val);
            return 1;
        case "triggerDuration":
            this._triggerDuration = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
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
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_STATE_INVALID;
            }
        }
        return this._state;
    }

    /**
     * Gets the state of the watchdog (A for the idle position, B for the active position).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:either Y_STATE_A or Y_STATE_B, according to the state of the watchdog (A for the idle
     *         position, B for the active position)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_STATE_INVALID.
     */
    function YWatchdog_get_state_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_STATE_INVALID);
            } else {
                callback(context, obj, obj._state);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
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
     * Returns the state of the watchdog at device startup (A for the idle position, B for the active
     * position, UNCHANGED for no change).
     * 
     * @return a value among YWatchdog.STATEATPOWERON_UNCHANGED, YWatchdog.STATEATPOWERON_A and
     * YWatchdog.STATEATPOWERON_B corresponding to the state of the watchdog at device startup (A for the
     * idle position, B for the active position, UNCHANGED for no change)
     * 
     * On failure, throws an exception or returns YWatchdog.STATEATPOWERON_INVALID.
     */
    function YWatchdog_get_stateAtPowerOn()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_STATEATPOWERON_INVALID;
            }
        }
        return this._stateAtPowerOn;
    }

    /**
     * Gets the state of the watchdog at device startup (A for the idle position, B for the active
     * position, UNCHANGED for no change).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:a value among Y_STATEATPOWERON_UNCHANGED, Y_STATEATPOWERON_A and Y_STATEATPOWERON_B
     *         corresponding to the state of the watchdog at device startup (A for the idle position, B for the
     *         active position, UNCHANGED for no change)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_STATEATPOWERON_INVALID.
     */
    function YWatchdog_get_stateAtPowerOn_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_STATEATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._stateAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Preset the state of the watchdog at device startup (A for the idle position,
     * B for the active position, UNCHANGED for no modification). Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     * 
     * @param newval : a value among YWatchdog.STATEATPOWERON_UNCHANGED, YWatchdog.STATEATPOWERON_A and
     * YWatchdog.STATEATPOWERON_B
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_set_stateAtPowerOn(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('stateAtPowerOn',rest_val);
    }

    /**
     * Retourne the maximum time (ms) allowed for $THEFUNCTIONS$ to stay in state A before automatically
     * switching back in to B state. Zero means no maximum time.
     * 
     * @return an integer
     * 
     * On failure, throws an exception or returns YWatchdog.MAXTIMEONSTATEA_INVALID.
     */
    function YWatchdog_get_maxTimeOnStateA()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MAXTIMEONSTATEA_INVALID;
            }
        }
        return this._maxTimeOnStateA;
    }

    /**
     * Retourne the maximum time (ms) allowed for $THEFUNCTIONS$ to stay in state A before automatically
     * switching back in to B state. Zero means no maximum time.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:an integer
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_MAXTIMEONSTATEA_INVALID.
     */
    function YWatchdog_get_maxTimeOnStateA_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MAXTIMEONSTATEA_INVALID);
            } else {
                callback(context, obj, obj._maxTimeOnStateA);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Sets the maximum time (ms) allowed for $THEFUNCTIONS$ to stay in state A before automatically
     * switching back in to B state. Use zero for no maximum time.
     * 
     * @param newval : an integer
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_set_maxTimeOnStateA(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('maxTimeOnStateA',rest_val);
    }

    /**
     * Retourne the maximum time (ms) allowed for $THEFUNCTIONS$ to stay in state B before automatically
     * switching back in to A state. Zero means no maximum time.
     * 
     * @return an integer
     * 
     * On failure, throws an exception or returns YWatchdog.MAXTIMEONSTATEB_INVALID.
     */
    function YWatchdog_get_maxTimeOnStateB()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MAXTIMEONSTATEB_INVALID;
            }
        }
        return this._maxTimeOnStateB;
    }

    /**
     * Retourne the maximum time (ms) allowed for $THEFUNCTIONS$ to stay in state B before automatically
     * switching back in to A state. Zero means no maximum time.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:an integer
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_MAXTIMEONSTATEB_INVALID.
     */
    function YWatchdog_get_maxTimeOnStateB_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MAXTIMEONSTATEB_INVALID);
            } else {
                callback(context, obj, obj._maxTimeOnStateB);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Sets the maximum time (ms) allowed for $THEFUNCTIONS$ to stay in state B before automatically
     * switching back in to A state. Use zero for no maximum time.
     * 
     * @param newval : an integer
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWatchdog_set_maxTimeOnStateB(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('maxTimeOnStateB',rest_val);
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
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_OUTPUT_INVALID;
            }
        }
        return this._output;
    }

    /**
     * Gets the output state of the watchdog, when used as a simple switch (single throw).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:either Y_OUTPUT_OFF or Y_OUTPUT_ON, according to the output state of the watchdog,
     *         when used as a simple switch (single throw)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_OUTPUT_INVALID.
     */
    function YWatchdog_get_output_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_OUTPUT_INVALID);
            } else {
                callback(context, obj, obj._output);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
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
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULSETIMER_INVALID;
            }
        }
        return this._pulseTimer;
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
     *         (state A), during a measured pulse generation
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    function YWatchdog_get_pulseTimer_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PULSETIMER_INVALID);
            } else {
                callback(context, obj, obj._pulseTimer);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
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
    function YWatchdog_pulse(ms_duration)
    {   var rest_val;
        rest_val = String(ms_duration);
        return this._setAttr('pulseTimer',rest_val);
    }

    function YWatchdog_get_delayedPulseTimer()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DELAYEDPULSETIMER_INVALID;
            }
        }
        return this._delayedPulseTimer;
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
    function YWatchdog_get_delayedPulseTimer_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DELAYEDPULSETIMER_INVALID);
            } else {
                callback(context, obj, obj._delayedPulseTimer);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
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
    function YWatchdog_delayedPulse(ms_delay,ms_duration)
    {   var rest_val;
        rest_val = String(ms_delay)+":"+String(ms_duration);
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
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COUNTDOWN_INVALID;
            }
        }
        return this._countdown;
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
     *         When there is no scheduled pulse, returns zero
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_COUNTDOWN_INVALID.
     */
    function YWatchdog_get_countdown_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COUNTDOWN_INVALID);
            } else {
                callback(context, obj, obj._countdown);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the watchdog runing state at module power on.
     * 
     * @return either YWatchdog.AUTOSTART_OFF or YWatchdog.AUTOSTART_ON, according to the watchdog runing
     * state at module power on
     * 
     * On failure, throws an exception or returns YWatchdog.AUTOSTART_INVALID.
     */
    function YWatchdog_get_autoStart()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_AUTOSTART_INVALID;
            }
        }
        return this._autoStart;
    }

    /**
     * Gets the watchdog runing state at module power on.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:either Y_AUTOSTART_OFF or Y_AUTOSTART_ON, according to the watchdog runing state at module power on
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_AUTOSTART_INVALID.
     */
    function YWatchdog_get_autoStart_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_AUTOSTART_INVALID);
            } else {
                callback(context, obj, obj._autoStart);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the watchdog runningsttae at module power on. Remember to call the
     * saveToFlash() method and then to reboot the module to apply this setting.
     * 
     * @param newval : either YWatchdog.AUTOSTART_OFF or YWatchdog.AUTOSTART_ON, according to the watchdog
     * runningsttae at module power on
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
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RUNNING_INVALID;
            }
        }
        return this._running;
    }

    /**
     * Gets the watchdog running state.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:either Y_RUNNING_OFF or Y_RUNNING_ON, according to the watchdog running state
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_RUNNING_INVALID.
     */
    function YWatchdog_get_running_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RUNNING_INVALID);
            } else {
                callback(context, obj, obj._running);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
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
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TRIGGERDELAY_INVALID;
            }
        }
        return this._triggerDelay;
    }

    /**
     * Gets  the waiting duration before a reset is automatically triggered by the watchdog, in milliseconds.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:an integer corresponding to  the waiting duration before a reset is automatically
     *         triggered by the watchdog, in milliseconds
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_TRIGGERDELAY_INVALID.
     */
    function YWatchdog_get_triggerDelay_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TRIGGERDELAY_INVALID);
            } else {
                callback(context, obj, obj._triggerDelay);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
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
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TRIGGERDURATION_INVALID;
            }
        }
        return this._triggerDuration;
    }

    /**
     * Gets the duration of resets caused by the watchdog, in milliseconds.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWatchdog object that invoked the callback
     *         - the result:an integer corresponding to the duration of resets caused by the watchdog, in milliseconds
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_TRIGGERDURATION_INVALID.
     */
    function YWatchdog_get_triggerDuration_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TRIGGERDURATION_INVALID);
            } else {
                callback(context, obj, obj._triggerDuration);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
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
    function YWatchdog_FindWatchdog(func)                       // class method
    {
        var obj;                    // YWatchdog;
        obj = YFunction._FindFromCache("Watchdog", func);
        if (obj == null) {
            obj = new YWatchdog(func);
            YFunction._AddToCache("Watchdog", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of watchdog started using yFirstWatchdog().
     * 
     * @return a pointer to a YWatchdog object, corresponding to
     *         a watchdog currently online, or a null pointer
     *         if there are no more watchdog to enumerate.
     */
    function YWatchdog_nextWatchdog()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YWatchdog.FindWatchdog(next_hwid);
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

    //--- (YWatchdog initialization)
    YWatchdog = YFunction._Subclass(_YWatchdog, {
        // Constants
        STATE_A                     : 0,
        STATE_B                     : 1,
        STATE_INVALID               : -1,
        STATEATPOWERON_UNCHANGED    : 0,
        STATEATPOWERON_A            : 1,
        STATEATPOWERON_B            : 2,
        STATEATPOWERON_INVALID      : -1,
        MAXTIMEONSTATEA_INVALID     : YAPI_INVALID_LONG,
        MAXTIMEONSTATEB_INVALID     : YAPI_INVALID_LONG,
        OUTPUT_OFF                  : 0,
        OUTPUT_ON                   : 1,
        OUTPUT_INVALID              : -1,
        PULSETIMER_INVALID          : YAPI_INVALID_LONG,
        COUNTDOWN_INVALID           : YAPI_INVALID_LONG,
        AUTOSTART_OFF               : 0,
        AUTOSTART_ON                : 1,
        AUTOSTART_INVALID           : -1,
        RUNNING_OFF                 : 0,
        RUNNING_ON                  : 1,
        RUNNING_INVALID             : -1,
        TRIGGERDELAY_INVALID        : YAPI_INVALID_LONG,
        TRIGGERDURATION_INVALID     : YAPI_INVALID_LONG
    }, {
        // Class methods
        FindWatchdog                : YWatchdog_FindWatchdog,
        FirstWatchdog               : YWatchdog_FirstWatchdog
    }, {
        // Methods
        get_state                   : YWatchdog_get_state,
        state                       : YWatchdog_get_state,
        get_state_async             : YWatchdog_get_state_async,
        state_async                 : YWatchdog_get_state_async,
        set_state                   : YWatchdog_set_state,
        setState                    : YWatchdog_set_state,
        get_stateAtPowerOn          : YWatchdog_get_stateAtPowerOn,
        stateAtPowerOn              : YWatchdog_get_stateAtPowerOn,
        get_stateAtPowerOn_async    : YWatchdog_get_stateAtPowerOn_async,
        stateAtPowerOn_async        : YWatchdog_get_stateAtPowerOn_async,
        set_stateAtPowerOn          : YWatchdog_set_stateAtPowerOn,
        setStateAtPowerOn           : YWatchdog_set_stateAtPowerOn,
        get_maxTimeOnStateA         : YWatchdog_get_maxTimeOnStateA,
        maxTimeOnStateA             : YWatchdog_get_maxTimeOnStateA,
        get_maxTimeOnStateA_async   : YWatchdog_get_maxTimeOnStateA_async,
        maxTimeOnStateA_async       : YWatchdog_get_maxTimeOnStateA_async,
        set_maxTimeOnStateA         : YWatchdog_set_maxTimeOnStateA,
        setMaxTimeOnStateA          : YWatchdog_set_maxTimeOnStateA,
        get_maxTimeOnStateB         : YWatchdog_get_maxTimeOnStateB,
        maxTimeOnStateB             : YWatchdog_get_maxTimeOnStateB,
        get_maxTimeOnStateB_async   : YWatchdog_get_maxTimeOnStateB_async,
        maxTimeOnStateB_async       : YWatchdog_get_maxTimeOnStateB_async,
        set_maxTimeOnStateB         : YWatchdog_set_maxTimeOnStateB,
        setMaxTimeOnStateB          : YWatchdog_set_maxTimeOnStateB,
        get_output                  : YWatchdog_get_output,
        output                      : YWatchdog_get_output,
        get_output_async            : YWatchdog_get_output_async,
        output_async                : YWatchdog_get_output_async,
        set_output                  : YWatchdog_set_output,
        setOutput                   : YWatchdog_set_output,
        get_pulseTimer              : YWatchdog_get_pulseTimer,
        pulseTimer                  : YWatchdog_get_pulseTimer,
        get_pulseTimer_async        : YWatchdog_get_pulseTimer_async,
        pulseTimer_async            : YWatchdog_get_pulseTimer_async,
        set_pulseTimer              : YWatchdog_set_pulseTimer,
        setPulseTimer               : YWatchdog_set_pulseTimer,
        pulse                       : YWatchdog_pulse,
        get_delayedPulseTimer       : YWatchdog_get_delayedPulseTimer,
        delayedPulseTimer           : YWatchdog_get_delayedPulseTimer,
        get_delayedPulseTimer_async : YWatchdog_get_delayedPulseTimer_async,
        delayedPulseTimer_async     : YWatchdog_get_delayedPulseTimer_async,
        set_delayedPulseTimer       : YWatchdog_set_delayedPulseTimer,
        setDelayedPulseTimer        : YWatchdog_set_delayedPulseTimer,
        delayedPulse                : YWatchdog_delayedPulse,
        get_countdown               : YWatchdog_get_countdown,
        countdown                   : YWatchdog_get_countdown,
        get_countdown_async         : YWatchdog_get_countdown_async,
        countdown_async             : YWatchdog_get_countdown_async,
        get_autoStart               : YWatchdog_get_autoStart,
        autoStart                   : YWatchdog_get_autoStart,
        get_autoStart_async         : YWatchdog_get_autoStart_async,
        autoStart_async             : YWatchdog_get_autoStart_async,
        set_autoStart               : YWatchdog_set_autoStart,
        setAutoStart                : YWatchdog_set_autoStart,
        get_running                 : YWatchdog_get_running,
        running                     : YWatchdog_get_running,
        get_running_async           : YWatchdog_get_running_async,
        running_async               : YWatchdog_get_running_async,
        set_running                 : YWatchdog_set_running,
        setRunning                  : YWatchdog_set_running,
        resetWatchdog               : YWatchdog_resetWatchdog,
        get_triggerDelay            : YWatchdog_get_triggerDelay,
        triggerDelay                : YWatchdog_get_triggerDelay,
        get_triggerDelay_async      : YWatchdog_get_triggerDelay_async,
        triggerDelay_async          : YWatchdog_get_triggerDelay_async,
        set_triggerDelay            : YWatchdog_set_triggerDelay,
        setTriggerDelay             : YWatchdog_set_triggerDelay,
        get_triggerDuration         : YWatchdog_get_triggerDuration,
        triggerDuration             : YWatchdog_get_triggerDuration,
        get_triggerDuration_async   : YWatchdog_get_triggerDuration_async,
        triggerDuration_async       : YWatchdog_get_triggerDuration_async,
        set_triggerDuration         : YWatchdog_set_triggerDuration,
        setTriggerDuration          : YWatchdog_set_triggerDuration,
        nextWatchdog                : YWatchdog_nextWatchdog,
        _parseAttr                  : YWatchdog_parseAttr
    });
    //--- (end of YWatchdog initialization)
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
function yFindWatchdog(func)
{
    return YWatchdog.FindWatchdog(func);
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
