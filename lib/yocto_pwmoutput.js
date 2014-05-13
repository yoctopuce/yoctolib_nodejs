/*********************************************************************
 *
 * $Id: yocto_pwmoutput.js 15529 2014-03-20 17:54:15Z seb $
 *
 * Implements the high-level API for PwmOutput functions
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

//--- (YPwmOutput return codes)
//--- (end of YPwmOutput return codes)
//--- (YPwmOutput definitions)
var Y_ENABLED_FALSE                 = 0;
var Y_ENABLED_TRUE                  = 1;
var Y_ENABLED_INVALID               = -1;
var Y_ENABLEDATPOWERON_FALSE        = 0;
var Y_ENABLEDATPOWERON_TRUE         = 1;
var Y_ENABLEDATPOWERON_INVALID      = -1;
var Y_DUTYCYCLE_INVALID             = YAPI_INVALID_DOUBLE;
var Y_PULSEDURATION_INVALID         = YAPI_INVALID_DOUBLE;
var Y_FREQUENCY_INVALID             = YAPI_INVALID_UINT;
var Y_PERIOD_INVALID                = YAPI_INVALID_DOUBLE;
var Y_PWMTRANSITION_INVALID         = YAPI_INVALID_STRING;
var Y_DUTYCYCLEATPOWERON_INVALID    = YAPI_INVALID_DOUBLE;
//--- (end of YPwmOutput definitions)

//--- (YPwmOutput class start)
/**
 * YPwmOutput Class: Pwm function interface
 * 
 * The Yoctopuce application programming interface allows you to configure, start, and stop the PWM.
 */
//--- (end of YPwmOutput class start)

var YPwmOutput; // definition below
(function()
{
    function _YPwmOutput(str_func)
    {
        //--- (YPwmOutput constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'PwmOutput';

        this._enabled                        = Y_ENABLED_INVALID;          // Bool
        this._dutyCycle                      = Y_DUTYCYCLE_INVALID;        // Millesimal
        this._pulseDuration                  = Y_PULSEDURATION_INVALID;    // Precimal
        this._frequency                      = Y_FREQUENCY_INVALID;        // UInt31
        this._period                         = Y_PERIOD_INVALID;           // Precimal
        this._pwmTransition                  = Y_PWMTRANSITION_INVALID;    // PwmTransition
        this._enabledAtPowerOn               = Y_ENABLEDATPOWERON_INVALID; // Bool
        this._dutyCycleAtPowerOn             = Y_DUTYCYCLEATPOWERON_INVALID; // Millesimal
        //--- (end of YPwmOutput constructor)
    }

    //--- (YPwmOutput implementation)

    function YPwmOutput_parseAttr(name, val, _super)
    {
        switch(name) {
        case "enabled":
            this._enabled = parseInt(val);
            return 1;
        case "dutyCycle":
            this._dutyCycle = val/65536;
            return 1;
        case "pulseDuration":
            this._pulseDuration = val/65536;
            return 1;
        case "frequency":
            this._frequency = parseInt(val);
            return 1;
        case "period":
            this._period = val/65536;
            return 1;
        case "pwmTransition":
            this._pwmTransition = val;
            return 1;
        case "enabledAtPowerOn":
            this._enabledAtPowerOn = parseInt(val);
            return 1;
        case "dutyCycleAtPowerOn":
            this._dutyCycleAtPowerOn = val/65536;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the state of the PWMs.
     * 
     * @return either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE, according to the state of the PWMs
     * 
     * On failure, throws an exception or returns YPwmOutput.ENABLED_INVALID.
     */
    function YPwmOutput_get_enabled()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ENABLED_INVALID;
            }
        }
        return this._enabled;
    }

    /**
     * Gets the state of the PWMs.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmOutput object that invoked the callback
     *         - the result:either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the state of the PWMs
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    function YPwmOutput_get_enabled_async(callback,context)
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

    /**
     * Stops or starts the PWM.
     * 
     * @param newval : either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_enabled(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabled',rest_val);
    }

    /**
     * Changes the PWM duty cycle, in per cents.
     * 
     * @param newval : a floating point number corresponding to the PWM duty cycle, in per cents
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_dutyCycle(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('dutyCycle',rest_val);
    }

    /**
     * Returns the PWM duty cycle, in per cents.
     * 
     * @return a floating point number corresponding to the PWM duty cycle, in per cents
     * 
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLE_INVALID.
     */
    function YPwmOutput_get_dutyCycle()
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
     *         - the YPwmOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM duty cycle, in per cents
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_DUTYCYCLE_INVALID.
     */
    function YPwmOutput_get_dutyCycle_async(callback,context)
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
     * Changes the PWM pulse length, in milliseconds. A pulse length cannot be longer than period,
     * otherwise it is truncated.
     * 
     * @param newval : a floating point number corresponding to the PWM pulse length, in milliseconds
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_pulseDuration(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('pulseDuration',rest_val);
    }

    /**
     * Returns the PWM pulse length in milliseconds.
     * 
     * @return a floating point number corresponding to the PWM pulse length in milliseconds
     * 
     * On failure, throws an exception or returns YPwmOutput.PULSEDURATION_INVALID.
     */
    function YPwmOutput_get_pulseDuration()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULSEDURATION_INVALID;
            }
        }
        return this._pulseDuration;
    }

    /**
     * Gets the PWM pulse length in milliseconds.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM pulse length in milliseconds
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_PULSEDURATION_INVALID.
     */
    function YPwmOutput_get_pulseDuration_async(callback,context)
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
     * @return an integer corresponding to the PWM frequency in Hz
     * 
     * On failure, throws an exception or returns YPwmOutput.FREQUENCY_INVALID.
     */
    function YPwmOutput_get_frequency()
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
     *         - the YPwmOutput object that invoked the callback
     *         - the result:an integer corresponding to the PWM frequency in Hz
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_FREQUENCY_INVALID.
     */
    function YPwmOutput_get_frequency_async(callback,context)
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
     * Changes the PWM frequency. The duty cycle is kept unchanged thanks to an
     * automatic pulse width change.
     * 
     * @param newval : an integer corresponding to the PWM frequency
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_frequency(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('frequency',rest_val);
    }

    /**
     * Changes the PWM period.
     * 
     * @param newval : a floating point number corresponding to the PWM period
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_period(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('period',rest_val);
    }

    /**
     * Returns the PWM period in milliseconds.
     * 
     * @return a floating point number corresponding to the PWM period in milliseconds
     * 
     * On failure, throws an exception or returns YPwmOutput.PERIOD_INVALID.
     */
    function YPwmOutput_get_period()
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
     *         - the YPwmOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM period in milliseconds
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_PERIOD_INVALID.
     */
    function YPwmOutput_get_period_async(callback,context)
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

    function YPwmOutput_get_pwmTransition()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PWMTRANSITION_INVALID;
            }
        }
        return this._pwmTransition;
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmOutput object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YPwmOutput_get_pwmTransition_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PWMTRANSITION_INVALID);
            } else {
                callback(context, obj, obj._pwmTransition);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YPwmOutput_set_pwmTransition(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('pwmTransition',rest_val);
    }

    /**
     * Returns the state of the PWM at device power on.
     * 
     * @return either YPwmOutput.ENABLEDATPOWERON_FALSE or YPwmOutput.ENABLEDATPOWERON_TRUE, according to
     * the state of the PWM at device power on
     * 
     * On failure, throws an exception or returns YPwmOutput.ENABLEDATPOWERON_INVALID.
     */
    function YPwmOutput_get_enabledAtPowerOn()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ENABLEDATPOWERON_INVALID;
            }
        }
        return this._enabledAtPowerOn;
    }

    /**
     * Gets the state of the PWM at device power on.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmOutput object that invoked the callback
     *         - the result:either Y_ENABLEDATPOWERON_FALSE or Y_ENABLEDATPOWERON_TRUE, according to the state of
     *         the PWM at device power on
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ENABLEDATPOWERON_INVALID.
     */
    function YPwmOutput_get_enabledAtPowerOn_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ENABLEDATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._enabledAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the state of the PWM at device power on. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     * 
     * @param newval : either YPwmOutput.ENABLEDATPOWERON_FALSE or YPwmOutput.ENABLEDATPOWERON_TRUE,
     * according to the state of the PWM at device power on
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_enabledAtPowerOn(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabledAtPowerOn',rest_val);
    }

    /**
     * Changes the PWM duty cycle at device power on. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     * 
     * @param newval : a floating point number corresponding to the PWM duty cycle at device power on
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_set_dutyCycleAtPowerOn(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('dutyCycleAtPowerOn',rest_val);
    }

    /**
     * Returns the PWMs duty cycle at device power on as a floating point number between 0 and 100
     * 
     * @return a floating point number corresponding to the PWMs duty cycle at device power on as a
     * floating point number between 0 and 100
     * 
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLEATPOWERON_INVALID.
     */
    function YPwmOutput_get_dutyCycleAtPowerOn()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DUTYCYCLEATPOWERON_INVALID;
            }
        }
        return this._dutyCycleAtPowerOn;
    }

    /**
     * Gets the PWMs duty cycle at device power on as a floating point number between 0 and 100
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPwmOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the PWMs duty cycle at device power on as a
     *         floating point number between 0 and 100
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_DUTYCYCLEATPOWERON_INVALID.
     */
    function YPwmOutput_get_dutyCycleAtPowerOn_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DUTYCYCLEATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._dutyCycleAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a PWM for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the PWM is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmOutput.isOnline() to test if the PWM is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the PWM
     * 
     * @return a YPwmOutput object allowing you to drive the PWM.
     */
    function YPwmOutput_FindPwmOutput(func)                     // class method
    {
        var obj;                    // YPwmOutput;
        obj = YFunction._FindFromCache("PwmOutput", func);
        if (obj == null) {
            obj = new YPwmOutput(func);
            YFunction._AddToCache("PwmOutput", func, obj);
        }
        return obj;
    }

    /**
     * Performs a smooth transistion of the pulse duration toward a given value. Any period,
     * frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     * 
     * @param ms_target   : new pulse duration at the end of the transition
     *         (floating-point number, representing the pulse duration in milliseconds)
     * @param ms_duration : total duration of the transition, in milliseconds
     * 
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_pulseDurationMove(ms_target,ms_duration)
    {
        var newval;                 // str;
        if (ms_target < 0.0) {
            ms_target = 0.0;
        }
        newval = ""+String(Math.round(Math.round(ms_target*65536)))+"ms:"+String(Math.round(ms_duration));
        return this.set_pwmTransition(newval);
    }

    /**
     * Performs a smooth change of the pulse duration toward a given value.
     * 
     * @param target      : new duty cycle at the end of the transition
     *         (floating-point number, between 0 and 1)
     * @param ms_duration : total duration of the transition, in milliseconds
     * 
     * @return YAPI.SUCCESS when the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPwmOutput_dutyCycleMove(target,ms_duration)
    {
        var newval;                 // str;
        if (target < 0.0) {
            target = 0.0;
        }
        if (target > 100.0) {
            target = 100.0;
        }
        newval = ""+String(Math.round(Math.round(target*65536)))+":"+String(Math.round(ms_duration));
        return this.set_pwmTransition(newval);
    }

    /**
     * Continues the enumeration of PWMs started using yFirstPwmOutput().
     * 
     * @return a pointer to a YPwmOutput object, corresponding to
     *         a PWM currently online, or a null pointer
     *         if there are no more PWMs to enumerate.
     */
    function YPwmOutput_nextPwmOutput()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YPwmOutput.FindPwmOutput(next_hwid);
    }

    /**
     * Starts the enumeration of PWMs currently accessible.
     * Use the method YPwmOutput.nextPwmOutput() to iterate on
     * next PWMs.
     * 
     * @return a pointer to a YPwmOutput object, corresponding to
     *         the first PWM currently online, or a null pointer
     *         if there are none.
     */
    function YPwmOutput_FirstPwmOutput()
    {
        var next_hwid = YAPI.getFirstHardwareId('PwmOutput');
        if(next_hwid == null) return null;
        return YPwmOutput.FindPwmOutput(next_hwid);
    }

    //--- (end of YPwmOutput implementation)

    //--- (YPwmOutput initialization)
    YPwmOutput = YFunction._Subclass(_YPwmOutput, {
        // Constants
        ENABLED_FALSE               : 0,
        ENABLED_TRUE                : 1,
        ENABLED_INVALID             : -1,
        DUTYCYCLE_INVALID           : YAPI_INVALID_DOUBLE,
        PULSEDURATION_INVALID       : YAPI_INVALID_DOUBLE,
        FREQUENCY_INVALID           : YAPI_INVALID_UINT,
        PERIOD_INVALID              : YAPI_INVALID_DOUBLE,
        PWMTRANSITION_INVALID       : YAPI_INVALID_STRING,
        ENABLEDATPOWERON_FALSE      : 0,
        ENABLEDATPOWERON_TRUE       : 1,
        ENABLEDATPOWERON_INVALID    : -1,
        DUTYCYCLEATPOWERON_INVALID  : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindPwmOutput               : YPwmOutput_FindPwmOutput,
        FirstPwmOutput              : YPwmOutput_FirstPwmOutput
    }, {
        // Methods
        get_enabled                 : YPwmOutput_get_enabled,
        enabled                     : YPwmOutput_get_enabled,
        get_enabled_async           : YPwmOutput_get_enabled_async,
        enabled_async               : YPwmOutput_get_enabled_async,
        set_enabled                 : YPwmOutput_set_enabled,
        setEnabled                  : YPwmOutput_set_enabled,
        set_dutyCycle               : YPwmOutput_set_dutyCycle,
        setDutyCycle                : YPwmOutput_set_dutyCycle,
        get_dutyCycle               : YPwmOutput_get_dutyCycle,
        dutyCycle                   : YPwmOutput_get_dutyCycle,
        get_dutyCycle_async         : YPwmOutput_get_dutyCycle_async,
        dutyCycle_async             : YPwmOutput_get_dutyCycle_async,
        set_pulseDuration           : YPwmOutput_set_pulseDuration,
        setPulseDuration            : YPwmOutput_set_pulseDuration,
        get_pulseDuration           : YPwmOutput_get_pulseDuration,
        pulseDuration               : YPwmOutput_get_pulseDuration,
        get_pulseDuration_async     : YPwmOutput_get_pulseDuration_async,
        pulseDuration_async         : YPwmOutput_get_pulseDuration_async,
        get_frequency               : YPwmOutput_get_frequency,
        frequency                   : YPwmOutput_get_frequency,
        get_frequency_async         : YPwmOutput_get_frequency_async,
        frequency_async             : YPwmOutput_get_frequency_async,
        set_frequency               : YPwmOutput_set_frequency,
        setFrequency                : YPwmOutput_set_frequency,
        set_period                  : YPwmOutput_set_period,
        setPeriod                   : YPwmOutput_set_period,
        get_period                  : YPwmOutput_get_period,
        period                      : YPwmOutput_get_period,
        get_period_async            : YPwmOutput_get_period_async,
        period_async                : YPwmOutput_get_period_async,
        get_pwmTransition           : YPwmOutput_get_pwmTransition,
        pwmTransition               : YPwmOutput_get_pwmTransition,
        get_pwmTransition_async     : YPwmOutput_get_pwmTransition_async,
        pwmTransition_async         : YPwmOutput_get_pwmTransition_async,
        set_pwmTransition           : YPwmOutput_set_pwmTransition,
        setPwmTransition            : YPwmOutput_set_pwmTransition,
        get_enabledAtPowerOn        : YPwmOutput_get_enabledAtPowerOn,
        enabledAtPowerOn            : YPwmOutput_get_enabledAtPowerOn,
        get_enabledAtPowerOn_async  : YPwmOutput_get_enabledAtPowerOn_async,
        enabledAtPowerOn_async      : YPwmOutput_get_enabledAtPowerOn_async,
        set_enabledAtPowerOn        : YPwmOutput_set_enabledAtPowerOn,
        setEnabledAtPowerOn         : YPwmOutput_set_enabledAtPowerOn,
        set_dutyCycleAtPowerOn      : YPwmOutput_set_dutyCycleAtPowerOn,
        setDutyCycleAtPowerOn       : YPwmOutput_set_dutyCycleAtPowerOn,
        get_dutyCycleAtPowerOn      : YPwmOutput_get_dutyCycleAtPowerOn,
        dutyCycleAtPowerOn          : YPwmOutput_get_dutyCycleAtPowerOn,
        get_dutyCycleAtPowerOn_async : YPwmOutput_get_dutyCycleAtPowerOn_async,
        dutyCycleAtPowerOn_async    : YPwmOutput_get_dutyCycleAtPowerOn_async,
        pulseDurationMove           : YPwmOutput_pulseDurationMove,
        dutyCycleMove               : YPwmOutput_dutyCycleMove,
        nextPwmOutput               : YPwmOutput_nextPwmOutput,
        _parseAttr                  : YPwmOutput_parseAttr
    });
    //--- (end of YPwmOutput initialization)
})();

//--- (PwmOutput functions)

/**
 * Retrieves a PWM for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the PWM is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPwmOutput.isOnline() to test if the PWM is
 * indeed online at a given time. In case of ambiguity when looking for
 * a PWM by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the PWM
 * 
 * @return a YPwmOutput object allowing you to drive the PWM.
 */
function yFindPwmOutput(func)
{
    return YPwmOutput.FindPwmOutput(func);
}

/**
 * Starts the enumeration of PWMs currently accessible.
 * Use the method YPwmOutput.nextPwmOutput() to iterate on
 * next PWMs.
 * 
 * @return a pointer to a YPwmOutput object, corresponding to
 *         the first PWM currently online, or a null pointer
 *         if there are none.
 */
function yFirstPwmOutput()
{
    return YPwmOutput.FirstPwmOutput();
}

//--- (end of PwmOutput functions)
