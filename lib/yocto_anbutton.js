/*********************************************************************
 *
 * $Id: yocto_anbutton.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements the high-level API for AnButton functions
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

//--- (YAnButton return codes)
//--- (end of YAnButton return codes)
//--- (YAnButton definitions)
var Y_ANALOGCALIBRATION_OFF         = 0;
var Y_ANALOGCALIBRATION_ON          = 1;
var Y_ANALOGCALIBRATION_INVALID     = -1;
var Y_ISPRESSED_FALSE               = 0;
var Y_ISPRESSED_TRUE                = 1;
var Y_ISPRESSED_INVALID             = -1;
var Y_CALIBRATEDVALUE_INVALID       = YAPI_INVALID_UINT;
var Y_RAWVALUE_INVALID              = YAPI_INVALID_UINT;
var Y_CALIBRATIONMAX_INVALID        = YAPI_INVALID_UINT;
var Y_CALIBRATIONMIN_INVALID        = YAPI_INVALID_UINT;
var Y_SENSITIVITY_INVALID           = YAPI_INVALID_UINT;
var Y_LASTTIMEPRESSED_INVALID       = YAPI_INVALID_LONG;
var Y_LASTTIMERELEASED_INVALID      = YAPI_INVALID_LONG;
var Y_PULSECOUNTER_INVALID          = YAPI_INVALID_LONG;
var Y_PULSETIMER_INVALID            = YAPI_INVALID_LONG;
//--- (end of YAnButton definitions)

//--- (YAnButton class start)
/**
 * YAnButton Class: AnButton function interface
 * 
 * Yoctopuce application programming interface allows you to measure the state
 * of a simple button as well as to read an analog potentiometer (variable resistance).
 * This can be use for instance with a continuous rotating knob, a throttle grip
 * or a joystick. The module is capable to calibrate itself on min and max values,
 * in order to compute a calibrated value that varies proportionally with the
 * potentiometer position, regardless of its total resistance.
 */
//--- (end of YAnButton class start)

var YAnButton; // definition below
(function()
{
    function _YAnButton(str_func)
    {
        //--- (YAnButton constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'AnButton';

        this._calibratedValue                = Y_CALIBRATEDVALUE_INVALID;  // UInt31
        this._rawValue                       = Y_RAWVALUE_INVALID;         // UInt31
        this._analogCalibration              = Y_ANALOGCALIBRATION_INVALID; // OnOff
        this._calibrationMax                 = Y_CALIBRATIONMAX_INVALID;   // UInt31
        this._calibrationMin                 = Y_CALIBRATIONMIN_INVALID;   // UInt31
        this._sensitivity                    = Y_SENSITIVITY_INVALID;      // UInt31
        this._isPressed                      = Y_ISPRESSED_INVALID;        // Bool
        this._lastTimePressed                = Y_LASTTIMEPRESSED_INVALID;  // Time
        this._lastTimeReleased               = Y_LASTTIMERELEASED_INVALID; // Time
        this._pulseCounter                   = Y_PULSECOUNTER_INVALID;     // UInt
        this._pulseTimer                     = Y_PULSETIMER_INVALID;       // Time
        //--- (end of YAnButton constructor)
    }

    //--- (YAnButton implementation)

    function YAnButton_parseAttr(name, val, _super)
    {
        switch(name) {
        case "calibratedValue":
            this._calibratedValue = parseInt(val);
            return 1;
        case "rawValue":
            this._rawValue = parseInt(val);
            return 1;
        case "analogCalibration":
            this._analogCalibration = parseInt(val);
            return 1;
        case "calibrationMax":
            this._calibrationMax = parseInt(val);
            return 1;
        case "calibrationMin":
            this._calibrationMin = parseInt(val);
            return 1;
        case "sensitivity":
            this._sensitivity = parseInt(val);
            return 1;
        case "isPressed":
            this._isPressed = parseInt(val);
            return 1;
        case "lastTimePressed":
            this._lastTimePressed = parseInt(val);
            return 1;
        case "lastTimeReleased":
            this._lastTimeReleased = parseInt(val);
            return 1;
        case "pulseCounter":
            this._pulseCounter = parseInt(val);
            return 1;
        case "pulseTimer":
            this._pulseTimer = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current calibrated input value (between 0 and 1000, included).
     * 
     * @return an integer corresponding to the current calibrated input value (between 0 and 1000, included)
     * 
     * On failure, throws an exception or returns YAnButton.CALIBRATEDVALUE_INVALID.
     */
    function YAnButton_get_calibratedValue()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALIBRATEDVALUE_INVALID;
            }
        }
        return this._calibratedValue;
    }

    /**
     * Gets the current calibrated input value (between 0 and 1000, included).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAnButton object that invoked the callback
     *         - the result:an integer corresponding to the current calibrated input value (between 0 and 1000, included)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_CALIBRATEDVALUE_INVALID.
     */
    function YAnButton_get_calibratedValue_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALIBRATEDVALUE_INVALID);
            } else {
                callback(context, obj, obj._calibratedValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current measured input value as-is (between 0 and 4095, included).
     * 
     * @return an integer corresponding to the current measured input value as-is (between 0 and 4095, included)
     * 
     * On failure, throws an exception or returns YAnButton.RAWVALUE_INVALID.
     */
    function YAnButton_get_rawValue()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RAWVALUE_INVALID;
            }
        }
        return this._rawValue;
    }

    /**
     * Gets the current measured input value as-is (between 0 and 4095, included).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAnButton object that invoked the callback
     *         - the result:an integer corresponding to the current measured input value as-is (between 0 and 4095, included)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_RAWVALUE_INVALID.
     */
    function YAnButton_get_rawValue_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RAWVALUE_INVALID);
            } else {
                callback(context, obj, obj._rawValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Tells if a calibration process is currently ongoing.
     * 
     * @return either YAnButton.ANALOGCALIBRATION_OFF or YAnButton.ANALOGCALIBRATION_ON
     * 
     * On failure, throws an exception or returns YAnButton.ANALOGCALIBRATION_INVALID.
     */
    function YAnButton_get_analogCalibration()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ANALOGCALIBRATION_INVALID;
            }
        }
        return this._analogCalibration;
    }

    /**
     * Tells if a calibration process is currently ongoing.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAnButton object that invoked the callback
     *         - the result:either Y_ANALOGCALIBRATION_OFF or Y_ANALOGCALIBRATION_ON
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ANALOGCALIBRATION_INVALID.
     */
    function YAnButton_get_analogCalibration_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ANALOGCALIBRATION_INVALID);
            } else {
                callback(context, obj, obj._analogCalibration);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Starts or stops the calibration process. Remember to call the saveToFlash()
     * method of the module at the end of the calibration if the modification must be kept.
     * 
     * @param newval : either YAnButton.ANALOGCALIBRATION_OFF or YAnButton.ANALOGCALIBRATION_ON
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAnButton_set_analogCalibration(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('analogCalibration',rest_val);
    }

    /**
     * Returns the maximal value measured during the calibration (between 0 and 4095, included).
     * 
     * @return an integer corresponding to the maximal value measured during the calibration (between 0
     * and 4095, included)
     * 
     * On failure, throws an exception or returns YAnButton.CALIBRATIONMAX_INVALID.
     */
    function YAnButton_get_calibrationMax()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALIBRATIONMAX_INVALID;
            }
        }
        return this._calibrationMax;
    }

    /**
     * Gets the maximal value measured during the calibration (between 0 and 4095, included).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAnButton object that invoked the callback
     *         - the result:an integer corresponding to the maximal value measured during the calibration (between
     *         0 and 4095, included)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_CALIBRATIONMAX_INVALID.
     */
    function YAnButton_get_calibrationMax_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALIBRATIONMAX_INVALID);
            } else {
                callback(context, obj, obj._calibrationMax);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the maximal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     * 
     * @param newval : an integer corresponding to the maximal calibration value for the input (between 0
     * and 4095, included), without actually
     *         starting the automated calibration
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAnButton_set_calibrationMax(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('calibrationMax',rest_val);
    }

    /**
     * Returns the minimal value measured during the calibration (between 0 and 4095, included).
     * 
     * @return an integer corresponding to the minimal value measured during the calibration (between 0
     * and 4095, included)
     * 
     * On failure, throws an exception or returns YAnButton.CALIBRATIONMIN_INVALID.
     */
    function YAnButton_get_calibrationMin()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALIBRATIONMIN_INVALID;
            }
        }
        return this._calibrationMin;
    }

    /**
     * Gets the minimal value measured during the calibration (between 0 and 4095, included).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAnButton object that invoked the callback
     *         - the result:an integer corresponding to the minimal value measured during the calibration (between
     *         0 and 4095, included)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_CALIBRATIONMIN_INVALID.
     */
    function YAnButton_get_calibrationMin_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALIBRATIONMIN_INVALID);
            } else {
                callback(context, obj, obj._calibrationMin);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the minimal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     * 
     * @param newval : an integer corresponding to the minimal calibration value for the input (between 0
     * and 4095, included), without actually
     *         starting the automated calibration
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAnButton_set_calibrationMin(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('calibrationMin',rest_val);
    }

    /**
     * Returns the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     * 
     * @return an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     * 
     * On failure, throws an exception or returns YAnButton.SENSITIVITY_INVALID.
     */
    function YAnButton_get_sensitivity()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SENSITIVITY_INVALID;
            }
        }
        return this._sensitivity;
    }

    /**
     * Gets the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAnButton object that invoked the callback
     *         - the result:an integer corresponding to the sensibility for the input (between 1 and 1000) for
     *         triggering user callbacks
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_SENSITIVITY_INVALID.
     */
    function YAnButton_get_sensitivity_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SENSITIVITY_INVALID);
            } else {
                callback(context, obj, obj._sensitivity);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     * The sensibility is used to filter variations around a fixed value, but does not preclude the
     * transmission of events when the input value evolves constantly in the same direction.
     * Special case: when the value 1000 is used, the callback will only be thrown when the logical state
     * of the input switches from pressed to released and back.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * 
     * @param newval : an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAnButton_set_sensitivity(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('sensitivity',rest_val);
    }

    /**
     * Returns true if the input (considered as binary) is active (closed contact), and false otherwise.
     * 
     * @return either YAnButton.ISPRESSED_FALSE or YAnButton.ISPRESSED_TRUE, according to true if the
     * input (considered as binary) is active (closed contact), and false otherwise
     * 
     * On failure, throws an exception or returns YAnButton.ISPRESSED_INVALID.
     */
    function YAnButton_get_isPressed()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ISPRESSED_INVALID;
            }
        }
        return this._isPressed;
    }

    /**
     * Gets true if the input (considered as binary) is active (closed contact), and false otherwise.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAnButton object that invoked the callback
     *         - the result:either Y_ISPRESSED_FALSE or Y_ISPRESSED_TRUE, according to true if the input
     *         (considered as binary) is active (closed contact), and false otherwise
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ISPRESSED_INVALID.
     */
    function YAnButton_get_isPressed_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ISPRESSED_INVALID);
            } else {
                callback(context, obj, obj._isPressed);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was pressed (the input contact transitionned from open to closed).
     * 
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was pressed (the input contact transitionned from open to closed)
     * 
     * On failure, throws an exception or returns YAnButton.LASTTIMEPRESSED_INVALID.
     */
    function YAnButton_get_lastTimePressed()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LASTTIMEPRESSED_INVALID;
            }
        }
        return this._lastTimePressed;
    }

    /**
     * Gets the number of elapsed milliseconds between the module power on and the last time
     * the input button was pressed (the input contact transitionned from open to closed).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAnButton object that invoked the callback
     *         - the result:an integer corresponding to the number of elapsed milliseconds between the module
     *         power on and the last time
     *         the input button was pressed (the input contact transitionned from open to closed)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LASTTIMEPRESSED_INVALID.
     */
    function YAnButton_get_lastTimePressed_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LASTTIMEPRESSED_INVALID);
            } else {
                callback(context, obj, obj._lastTimePressed);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was released (the input contact transitionned from closed to open).
     * 
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was released (the input contact transitionned from closed to open)
     * 
     * On failure, throws an exception or returns YAnButton.LASTTIMERELEASED_INVALID.
     */
    function YAnButton_get_lastTimeReleased()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LASTTIMERELEASED_INVALID;
            }
        }
        return this._lastTimeReleased;
    }

    /**
     * Gets the number of elapsed milliseconds between the module power on and the last time
     * the input button was released (the input contact transitionned from closed to open).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAnButton object that invoked the callback
     *         - the result:an integer corresponding to the number of elapsed milliseconds between the module
     *         power on and the last time
     *         the input button was released (the input contact transitionned from closed to open)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LASTTIMERELEASED_INVALID.
     */
    function YAnButton_get_lastTimeReleased_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LASTTIMERELEASED_INVALID);
            } else {
                callback(context, obj, obj._lastTimeReleased);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the pulse counter value
     * 
     * @return an integer corresponding to the pulse counter value
     * 
     * On failure, throws an exception or returns YAnButton.PULSECOUNTER_INVALID.
     */
    function YAnButton_get_pulseCounter()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULSECOUNTER_INVALID;
            }
        }
        return this._pulseCounter;
    }

    /**
     * Gets the pulse counter value
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAnButton object that invoked the callback
     *         - the result:an integer corresponding to the pulse counter value
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_PULSECOUNTER_INVALID.
     */
    function YAnButton_get_pulseCounter_async(callback,context)
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

    function YAnButton_set_pulseCounter(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pulseCounter',rest_val);
    }

    /**
     * Returns the timer of the pulses counter (ms)
     * 
     * @return an integer corresponding to the timer of the pulses counter (ms)
     * 
     * On failure, throws an exception or returns YAnButton.PULSETIMER_INVALID.
     */
    function YAnButton_get_pulseTimer()
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
     *         - the YAnButton object that invoked the callback
     *         - the result:an integer corresponding to the timer of the pulses counter (ms)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    function YAnButton_get_pulseTimer_async(callback,context)
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
     * Retrieves an analog input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the analog input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAnButton.isOnline() to test if the analog input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an analog input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the analog input
     * 
     * @return a YAnButton object allowing you to drive the analog input.
     */
    function YAnButton_FindAnButton(func)                       // class method
    {
        var obj;                    // YAnButton;
        obj = YFunction._FindFromCache("AnButton", func);
        if (obj == null) {
            obj = new YAnButton(func);
            YFunction._AddToCache("AnButton", func, obj);
        }
        return obj;
    }

    /**
     * Returns the pulse counter value as well as his timer
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAnButton_resetCounter()
    {
        return this.set_pulseCounter(0);
    }

    /**
     * Continues the enumeration of analog inputs started using yFirstAnButton().
     * 
     * @return a pointer to a YAnButton object, corresponding to
     *         an analog input currently online, or a null pointer
     *         if there are no more analog inputs to enumerate.
     */
    function YAnButton_nextAnButton()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAnButton.FindAnButton(next_hwid);
    }

    /**
     * Starts the enumeration of analog inputs currently accessible.
     * Use the method YAnButton.nextAnButton() to iterate on
     * next analog inputs.
     * 
     * @return a pointer to a YAnButton object, corresponding to
     *         the first analog input currently online, or a null pointer
     *         if there are none.
     */
    function YAnButton_FirstAnButton()
    {
        var next_hwid = YAPI.getFirstHardwareId('AnButton');
        if(next_hwid == null) return null;
        return YAnButton.FindAnButton(next_hwid);
    }

    //--- (end of YAnButton implementation)

    //--- (YAnButton initialization)
    YAnButton = YFunction._Subclass(_YAnButton, {
        // Constants
        CALIBRATEDVALUE_INVALID     : YAPI_INVALID_UINT,
        RAWVALUE_INVALID            : YAPI_INVALID_UINT,
        ANALOGCALIBRATION_OFF       : 0,
        ANALOGCALIBRATION_ON        : 1,
        ANALOGCALIBRATION_INVALID   : -1,
        CALIBRATIONMAX_INVALID      : YAPI_INVALID_UINT,
        CALIBRATIONMIN_INVALID      : YAPI_INVALID_UINT,
        SENSITIVITY_INVALID         : YAPI_INVALID_UINT,
        ISPRESSED_FALSE             : 0,
        ISPRESSED_TRUE              : 1,
        ISPRESSED_INVALID           : -1,
        LASTTIMEPRESSED_INVALID     : YAPI_INVALID_LONG,
        LASTTIMERELEASED_INVALID    : YAPI_INVALID_LONG,
        PULSECOUNTER_INVALID        : YAPI_INVALID_LONG,
        PULSETIMER_INVALID          : YAPI_INVALID_LONG
    }, {
        // Class methods
        FindAnButton                : YAnButton_FindAnButton,
        FirstAnButton               : YAnButton_FirstAnButton
    }, {
        // Methods
        get_calibratedValue         : YAnButton_get_calibratedValue,
        calibratedValue             : YAnButton_get_calibratedValue,
        get_calibratedValue_async   : YAnButton_get_calibratedValue_async,
        calibratedValue_async       : YAnButton_get_calibratedValue_async,
        get_rawValue                : YAnButton_get_rawValue,
        rawValue                    : YAnButton_get_rawValue,
        get_rawValue_async          : YAnButton_get_rawValue_async,
        rawValue_async              : YAnButton_get_rawValue_async,
        get_analogCalibration       : YAnButton_get_analogCalibration,
        analogCalibration           : YAnButton_get_analogCalibration,
        get_analogCalibration_async : YAnButton_get_analogCalibration_async,
        analogCalibration_async     : YAnButton_get_analogCalibration_async,
        set_analogCalibration       : YAnButton_set_analogCalibration,
        setAnalogCalibration        : YAnButton_set_analogCalibration,
        get_calibrationMax          : YAnButton_get_calibrationMax,
        calibrationMax              : YAnButton_get_calibrationMax,
        get_calibrationMax_async    : YAnButton_get_calibrationMax_async,
        calibrationMax_async        : YAnButton_get_calibrationMax_async,
        set_calibrationMax          : YAnButton_set_calibrationMax,
        setCalibrationMax           : YAnButton_set_calibrationMax,
        get_calibrationMin          : YAnButton_get_calibrationMin,
        calibrationMin              : YAnButton_get_calibrationMin,
        get_calibrationMin_async    : YAnButton_get_calibrationMin_async,
        calibrationMin_async        : YAnButton_get_calibrationMin_async,
        set_calibrationMin          : YAnButton_set_calibrationMin,
        setCalibrationMin           : YAnButton_set_calibrationMin,
        get_sensitivity             : YAnButton_get_sensitivity,
        sensitivity                 : YAnButton_get_sensitivity,
        get_sensitivity_async       : YAnButton_get_sensitivity_async,
        sensitivity_async           : YAnButton_get_sensitivity_async,
        set_sensitivity             : YAnButton_set_sensitivity,
        setSensitivity              : YAnButton_set_sensitivity,
        get_isPressed               : YAnButton_get_isPressed,
        isPressed                   : YAnButton_get_isPressed,
        get_isPressed_async         : YAnButton_get_isPressed_async,
        isPressed_async             : YAnButton_get_isPressed_async,
        get_lastTimePressed         : YAnButton_get_lastTimePressed,
        lastTimePressed             : YAnButton_get_lastTimePressed,
        get_lastTimePressed_async   : YAnButton_get_lastTimePressed_async,
        lastTimePressed_async       : YAnButton_get_lastTimePressed_async,
        get_lastTimeReleased        : YAnButton_get_lastTimeReleased,
        lastTimeReleased            : YAnButton_get_lastTimeReleased,
        get_lastTimeReleased_async  : YAnButton_get_lastTimeReleased_async,
        lastTimeReleased_async      : YAnButton_get_lastTimeReleased_async,
        get_pulseCounter            : YAnButton_get_pulseCounter,
        pulseCounter                : YAnButton_get_pulseCounter,
        get_pulseCounter_async      : YAnButton_get_pulseCounter_async,
        pulseCounter_async          : YAnButton_get_pulseCounter_async,
        set_pulseCounter            : YAnButton_set_pulseCounter,
        setPulseCounter             : YAnButton_set_pulseCounter,
        get_pulseTimer              : YAnButton_get_pulseTimer,
        pulseTimer                  : YAnButton_get_pulseTimer,
        get_pulseTimer_async        : YAnButton_get_pulseTimer_async,
        pulseTimer_async            : YAnButton_get_pulseTimer_async,
        resetCounter                : YAnButton_resetCounter,
        nextAnButton                : YAnButton_nextAnButton,
        _parseAttr                  : YAnButton_parseAttr
    });
    //--- (end of YAnButton initialization)
})();

//--- (AnButton functions)

/**
 * Retrieves an analog input for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the analog input is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YAnButton.isOnline() to test if the analog input is
 * indeed online at a given time. In case of ambiguity when looking for
 * an analog input by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the analog input
 * 
 * @return a YAnButton object allowing you to drive the analog input.
 */
function yFindAnButton(func)
{
    return YAnButton.FindAnButton(func);
}

/**
 * Starts the enumeration of analog inputs currently accessible.
 * Use the method YAnButton.nextAnButton() to iterate on
 * next analog inputs.
 * 
 * @return a pointer to a YAnButton object, corresponding to
 *         the first analog input currently online, or a null pointer
 *         if there are none.
 */
function yFirstAnButton()
{
    return YAnButton.FirstAnButton();
}

//--- (end of AnButton functions)
