/*********************************************************************
 *
 * $Id: yocto_pwminput.js 19607 2015-03-05 10:36:54Z seb $
 *
 * Implements the high-level API for PwmInput functions
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

//--- (YPwmInput return codes)
//--- (end of YPwmInput return codes)
//--- (YPwmInput definitions)
var Y_PWMREPORTMODE_PWM_DUTYCYCLE   = 0;
var Y_PWMREPORTMODE_PWM_FREQUENCY   = 1;
var Y_PWMREPORTMODE_PWM_PULSEDURATION = 2;
var Y_PWMREPORTMODE_PWM_EDGECOUNT   = 3;
var Y_PWMREPORTMODE_INVALID         = -1;
var Y_DUTYCYCLE_INVALID             = YAPI_INVALID_DOUBLE;
var Y_PULSEDURATION_INVALID         = YAPI_INVALID_DOUBLE;
var Y_FREQUENCY_INVALID             = YAPI_INVALID_DOUBLE;
var Y_PERIOD_INVALID                = YAPI_INVALID_DOUBLE;
var Y_PULSECOUNTER_INVALID          = YAPI_INVALID_LONG;
var Y_PULSETIMER_INVALID            = YAPI_INVALID_LONG;
//--- (end of YPwmInput definitions)

//--- (YPwmInput class start)
/**
 * YPwmInput Class: PwmInput function interface
 *
 * The Yoctopuce class YPwmInput allows you to read and configure Yoctopuce PWM
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 * This class adds the ability to configure the signal parameter used to transmit
 * information: the duty cacle, the frequency or the pulse width.
 */
//--- (end of YPwmInput class start)

var YPwmInput; // definition below
(function()
{
    function _YPwmInput(str_func)
    {
        //--- (YPwmInput constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'PwmInput';

        this._dutyCycle                      = Y_DUTYCYCLE_INVALID;        // MeasureVal
        this._pulseDuration                  = Y_PULSEDURATION_INVALID;    // MeasureVal
        this._frequency                      = Y_FREQUENCY_INVALID;        // MeasureVal
        this._period                         = Y_PERIOD_INVALID;           // MeasureVal
        this._pulseCounter                   = Y_PULSECOUNTER_INVALID;     // UInt
        this._pulseTimer                     = Y_PULSETIMER_INVALID;       // Time
        this._pwmReportMode                  = Y_PWMREPORTMODE_INVALID;    // PwmReportModeType
        //--- (end of YPwmInput constructor)
    }

    //--- (YPwmInput implementation)

    function YPwmInput_parseAttr(name, val, _super)
    {
        switch(name) {
        case "dutyCycle":
            this._dutyCycle = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "pulseDuration":
            this._pulseDuration = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "frequency":
            this._frequency = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "period":
            this._period = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "pulseCounter":
            this._pulseCounter = parseInt(val);
            return 1;
        case "pulseTimer":
            this._pulseTimer = parseInt(val);
            return 1;
        case "pwmReportMode":
            this._pwmReportMode = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns YPwmInput.DUTYCYCLE_INVALID.
     */
    function YPwmInput_get_dutyCycle()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DUTYCYCLE_INVALID;
            }
        }
        return this._dutyCycle;
    }

    /**
     * Gets the PWM duty cycle, in per cents.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM duty cycle, in per cents
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_DUTYCYCLE_INVALID.
     */
    function YPwmInput_get_dutyCycle_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DUTYCYCLE_INVALID);
            } else {
                callback(context, obj, obj._dutyCycle);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return a floating point number corresponding to the PWM pulse length in milliseconds, as a
     * floating point number
     *
     * On failure, throws an exception or returns YPwmInput.PULSEDURATION_INVALID.
     */
    function YPwmInput_get_pulseDuration()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULSEDURATION_INVALID;
            }
        }
        return this._pulseDuration;
    }

    /**
     * Gets the PWM pulse length in milliseconds, as a floating point number.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM pulse length in milliseconds, as a
     *         floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PULSEDURATION_INVALID.
     */
    function YPwmInput_get_pulseDuration_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PULSEDURATION_INVALID);
            } else {
                callback(context, obj, obj._pulseDuration);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YPwmInput.FREQUENCY_INVALID.
     */
    function YPwmInput_get_frequency()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_FREQUENCY_INVALID;
            }
        }
        return this._frequency;
    }

    /**
     * Gets the PWM frequency in Hz.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM frequency in Hz
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_FREQUENCY_INVALID.
     */
    function YPwmInput_get_frequency_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_FREQUENCY_INVALID);
            } else {
                callback(context, obj, obj._frequency);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the PWM period in milliseconds.
     *
     * @return a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns YPwmInput.PERIOD_INVALID.
     */
    function YPwmInput_get_period()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PERIOD_INVALID;
            }
        }
        return this._period;
    }

    /**
     * Gets the PWM period in milliseconds.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM period in milliseconds
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PERIOD_INVALID.
     */
    function YPwmInput_get_period_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PERIOD_INVALID);
            } else {
                callback(context, obj, obj._period);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the pulse counter value. Actually that
     * counter is incremented twice per period. That counter is
     * limited  to 1 billion
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YPwmInput.PULSECOUNTER_INVALID.
     */
    function YPwmInput_get_pulseCounter()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULSECOUNTER_INVALID;
            }
        }
        return this._pulseCounter;
    }

    /**
     * Gets the pulse counter value. Actually that
     * counter is incremented twice per period. That counter is
     * limited  to 1 billion
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:an integer corresponding to the pulse counter value
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PULSECOUNTER_INVALID.
     */
    function YPwmInput_get_pulseCounter_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PULSECOUNTER_INVALID);
            } else {
                callback(context, obj, obj._pulseCounter);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YPwmInput_set_pulseCounter(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pulseCounter',rest_val);
    }

    /**
     * Returns the timer of the pulses counter (ms)
     *
     * @return an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns YPwmInput.PULSETIMER_INVALID.
     */
    function YPwmInput_get_pulseTimer()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULSETIMER_INVALID;
            }
        }
        return this._pulseTimer;
    }

    /**
     * Gets the timer of the pulses counter (ms)
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:an integer corresponding to the timer of the pulses counter (ms)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    function YPwmInput_get_pulseTimer_async(callback,context)
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

    /**
     * Returns the parameter (frequency/duty cycle, pulse width, edges count) returned by the
     * get_currentValue function and callbacks. Attention
     *
     * @return a value among YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE, YPwmInput.PWMREPORTMODE_PWM_FREQUENCY,
     * YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION and YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT corresponding
     * to the parameter (frequency/duty cycle, pulse width, edges count) returned by the get_currentValue
     * function and callbacks
     *
     * On failure, throws an exception or returns YPwmInput.PWMREPORTMODE_INVALID.
     */
    function YPwmInput_get_pwmReportMode()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PWMREPORTMODE_INVALID;
            }
        }
        return this._pwmReportMode;
    }

    /**
     * Gets the parameter (frequency/duty cycle, pulse width, edges count) returned by the
     * get_currentValue function and callbacks. Attention
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmInput object that invoked the callback
     *         - the result:a value among Y_PWMREPORTMODE_PWM_DUTYCYCLE, Y_PWMREPORTMODE_PWM_FREQUENCY,
     *         Y_PWMREPORTMODE_PWM_PULSEDURATION and Y_PWMREPORTMODE_PWM_EDGECOUNT corresponding to the parameter
     *         (frequency/duty cycle, pulse width, edges count) returned by the get_currentValue function and callbacks
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PWMREPORTMODE_INVALID.
     */
    function YPwmInput_get_pwmReportMode_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PWMREPORTMODE_INVALID);
            } else {
                callback(context, obj, obj._pwmReportMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Modifies the  parameter  type (frequency/duty cycle, pulse width, or edge count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     *
     * @param newval : a value among YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE,
     * YPwmInput.PWMREPORTMODE_PWM_FREQUENCY, YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION and
     * YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmInput_set_pwmReportMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pwmReportMode',rest_val);
    }

    /**
     * Retrieves a PWM input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmInput.isOnline() to test if the PWM input is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the PWM input
     *
     * @return a YPwmInput object allowing you to drive the PWM input.
     */
    function YPwmInput_FindPwmInput(func)                       // class method
    {
        var obj;                    // YPwmInput;
        obj = YFunction._FindFromCache("PwmInput", func);
        if (obj == null) {
            obj = new YPwmInput(func);
            YFunction._AddToCache("PwmInput", func, obj);
        }
        return obj;
    }

    /**
     * Returns the pulse counter value as well as its timer.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmInput_resetCounter()
    {
        return this.set_pulseCounter(0);
    }

    /**
     * Continues the enumeration of PWM inputs started using yFirstPwmInput().
     *
     * @return a pointer to a YPwmInput object, corresponding to
     *         a PWM input currently online, or a null pointer
     *         if there are no more PWM inputs to enumerate.
     */
    function YPwmInput_nextPwmInput()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPwmInput.FindPwmInput(next_hwid);
    }

    /**
     * Starts the enumeration of PWM inputs currently accessible.
     * Use the method YPwmInput.nextPwmInput() to iterate on
     * next PWM inputs.
     *
     * @return a pointer to a YPwmInput object, corresponding to
     *         the first PWM input currently online, or a null pointer
     *         if there are none.
     */
    function YPwmInput_FirstPwmInput()
    {
        var next_hwid = YAPI.getFirstHardwareId('PwmInput');
        if(next_hwid == null) return null;
        return YPwmInput.FindPwmInput(next_hwid);
    }

    //--- (end of YPwmInput implementation)

    //--- (YPwmInput initialization)
    YPwmInput = YSensor._Subclass(_YPwmInput, {
        // Constants
        DUTYCYCLE_INVALID           : YAPI_INVALID_DOUBLE,
        PULSEDURATION_INVALID       : YAPI_INVALID_DOUBLE,
        FREQUENCY_INVALID           : YAPI_INVALID_DOUBLE,
        PERIOD_INVALID              : YAPI_INVALID_DOUBLE,
        PULSECOUNTER_INVALID        : YAPI_INVALID_LONG,
        PULSETIMER_INVALID          : YAPI_INVALID_LONG,
        PWMREPORTMODE_PWM_DUTYCYCLE : 0,
        PWMREPORTMODE_PWM_FREQUENCY : 1,
        PWMREPORTMODE_PWM_PULSEDURATION : 2,
        PWMREPORTMODE_PWM_EDGECOUNT : 3,
        PWMREPORTMODE_INVALID       : -1
    }, {
        // Class methods
        FindPwmInput                : YPwmInput_FindPwmInput,
        FirstPwmInput               : YPwmInput_FirstPwmInput
    }, {
        // Methods
        get_dutyCycle               : YPwmInput_get_dutyCycle,
        dutyCycle                   : YPwmInput_get_dutyCycle,
        get_dutyCycle_async         : YPwmInput_get_dutyCycle_async,
        dutyCycle_async             : YPwmInput_get_dutyCycle_async,
        get_pulseDuration           : YPwmInput_get_pulseDuration,
        pulseDuration               : YPwmInput_get_pulseDuration,
        get_pulseDuration_async     : YPwmInput_get_pulseDuration_async,
        pulseDuration_async         : YPwmInput_get_pulseDuration_async,
        get_frequency               : YPwmInput_get_frequency,
        frequency                   : YPwmInput_get_frequency,
        get_frequency_async         : YPwmInput_get_frequency_async,
        frequency_async             : YPwmInput_get_frequency_async,
        get_period                  : YPwmInput_get_period,
        period                      : YPwmInput_get_period,
        get_period_async            : YPwmInput_get_period_async,
        period_async                : YPwmInput_get_period_async,
        get_pulseCounter            : YPwmInput_get_pulseCounter,
        pulseCounter                : YPwmInput_get_pulseCounter,
        get_pulseCounter_async      : YPwmInput_get_pulseCounter_async,
        pulseCounter_async          : YPwmInput_get_pulseCounter_async,
        set_pulseCounter            : YPwmInput_set_pulseCounter,
        setPulseCounter             : YPwmInput_set_pulseCounter,
        get_pulseTimer              : YPwmInput_get_pulseTimer,
        pulseTimer                  : YPwmInput_get_pulseTimer,
        get_pulseTimer_async        : YPwmInput_get_pulseTimer_async,
        pulseTimer_async            : YPwmInput_get_pulseTimer_async,
        get_pwmReportMode           : YPwmInput_get_pwmReportMode,
        pwmReportMode               : YPwmInput_get_pwmReportMode,
        get_pwmReportMode_async     : YPwmInput_get_pwmReportMode_async,
        pwmReportMode_async         : YPwmInput_get_pwmReportMode_async,
        set_pwmReportMode           : YPwmInput_set_pwmReportMode,
        setPwmReportMode            : YPwmInput_set_pwmReportMode,
        resetCounter                : YPwmInput_resetCounter,
        nextPwmInput                : YPwmInput_nextPwmInput,
        _parseAttr                  : YPwmInput_parseAttr
    });
    //--- (end of YPwmInput initialization)
})();

//--- (PwmInput functions)

/**
 * Retrieves a PWM input for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the PWM input is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPwmInput.isOnline() to test if the PWM input is
 * indeed online at a given time. In case of ambiguity when looking for
 * a PWM input by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the PWM input
 *
 * @return a YPwmInput object allowing you to drive the PWM input.
 */
function yFindPwmInput(func)
{
    return YPwmInput.FindPwmInput(func);
}

/**
 * Starts the enumeration of PWM inputs currently accessible.
 * Use the method YPwmInput.nextPwmInput() to iterate on
 * next PWM inputs.
 *
 * @return a pointer to a YPwmInput object, corresponding to
 *         the first PWM input currently online, or a null pointer
 *         if there are none.
 */
function yFirstPwmInput()
{
    return YPwmInput.FirstPwmInput();
}

//--- (end of PwmInput functions)
