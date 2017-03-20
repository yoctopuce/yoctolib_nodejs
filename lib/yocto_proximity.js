/*********************************************************************
 *
 * $Id: pic24config.php 26780 2017-03-16 14:02:09Z mvuilleu $
 *
 * Implements the high-level API for Proximity functions
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

//--- (YProximity return codes)
//--- (end of YProximity return codes)
//--- (YProximity definitions)
var Y_ISPRESENT_FALSE               = 0;
var Y_ISPRESENT_TRUE                = 1;
var Y_ISPRESENT_INVALID             = -1;
var Y_PROXIMITYREPORTMODE_NUMERIC   = 0;
var Y_PROXIMITYREPORTMODE_PRESENCE  = 1;
var Y_PROXIMITYREPORTMODE_PULSECOUNT = 2;
var Y_PROXIMITYREPORTMODE_INVALID   = -1;
var Y_SIGNALVALUE_INVALID           = YAPI_INVALID_DOUBLE;
var Y_DETECTIONTHRESHOLD_INVALID    = YAPI_INVALID_UINT;
var Y_LASTTIMEAPPROACHED_INVALID    = YAPI_INVALID_LONG;
var Y_LASTTIMEREMOVED_INVALID       = YAPI_INVALID_LONG;
var Y_PULSECOUNTER_INVALID          = YAPI_INVALID_LONG;
var Y_PULSETIMER_INVALID            = YAPI_INVALID_LONG;
//--- (end of YProximity definitions)

//--- (YProximity class start)
/**
 * YProximity Class: Proximity function interface
 *
 * The Yoctopuce class YProximity allows you to use and configure Yoctopuce proximity
 * sensors. It inherits from the YSensor class the core functions to read measurements,
 * to register callback functions, to access the autonomous datalogger.
 * This class adds the ability to easily perform a one-point linear calibration
 * to compensate the effect of a glass or filter placed in front of the sensor.
 */
//--- (end of YProximity class start)

var YProximity; // definition below
(function()
{
    function _YProximity(str_func)
    {
        //--- (YProximity constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Proximity';

        this._signalValue                    = Y_SIGNALVALUE_INVALID;      // MeasureVal
        this._detectionThreshold             = Y_DETECTIONTHRESHOLD_INVALID; // UInt31
        this._isPresent                      = Y_ISPRESENT_INVALID;        // Bool
        this._lastTimeApproached             = Y_LASTTIMEAPPROACHED_INVALID; // Time
        this._lastTimeRemoved                = Y_LASTTIMEREMOVED_INVALID;  // Time
        this._pulseCounter                   = Y_PULSECOUNTER_INVALID;     // UInt
        this._pulseTimer                     = Y_PULSETIMER_INVALID;       // Time
        this._proximityReportMode            = Y_PROXIMITYREPORTMODE_INVALID; // ProximityReportModeType
        //--- (end of YProximity constructor)
    }

    //--- (YProximity implementation)

    function YProximity_parseAttr(name, val, _super)
    {
        switch(name) {
        case "signalValue":
            this._signalValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "detectionThreshold":
            this._detectionThreshold = parseInt(val);
            return 1;
        case "isPresent":
            this._isPresent = parseInt(val);
            return 1;
        case "lastTimeApproached":
            this._lastTimeApproached = parseInt(val);
            return 1;
        case "lastTimeRemoved":
            this._lastTimeRemoved = parseInt(val);
            return 1;
        case "pulseCounter":
            this._pulseCounter = parseInt(val);
            return 1;
        case "pulseTimer":
            this._pulseTimer = parseInt(val);
            return 1;
        case "proximityReportMode":
            this._proximityReportMode = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current value of signal measured by the proximity sensor.
     *
     * @return a floating point number corresponding to the current value of signal measured by the proximity sensor
     *
     * On failure, throws an exception or returns YProximity.SIGNALVALUE_INVALID.
     */
    function YProximity_get_signalValue()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SIGNALVALUE_INVALID;
            }
        }
        res = Math.round(this._signalValue * 1000) / 1000;
        return res;
    }

    /**
     * Gets the current value of signal measured by the proximity sensor.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YProximity object that invoked the callback
     *         - the result:a floating point number corresponding to the current value of signal measured by the
     *         proximity sensor
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_SIGNALVALUE_INVALID.
     */
    function YProximity_get_signalValue_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SIGNALVALUE_INVALID);
            } else {
                callback(context, obj, Math.round(obj._signalValue * 1000) / 1000);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @return an integer corresponding to the threshold used to determine the logical state of the
     * proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * On failure, throws an exception or returns YProximity.DETECTIONTHRESHOLD_INVALID.
     */
    function YProximity_get_detectionThreshold()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DETECTIONTHRESHOLD_INVALID;
            }
        }
        res = this._detectionThreshold;
        return res;
    }

    /**
     * Gets the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YProximity object that invoked the callback
     *         - the result:an integer corresponding to the threshold used to determine the logical state of the
     *         proximity sensor, when considered
     *         as a binary input (on/off)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_DETECTIONTHRESHOLD_INVALID.
     */
    function YProximity_get_detectionThreshold_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DETECTIONTHRESHOLD_INVALID);
            } else {
                callback(context, obj, obj._detectionThreshold);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @param newval : an integer corresponding to the threshold used to determine the logical state of
     * the proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YProximity_set_detectionThreshold(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('detectionThreshold',rest_val);
    }

    /**
     * Returns true if the input (considered as binary) is active (detection value is smaller than the
     * specified threshold), and false otherwise.
     *
     * @return either YProximity.ISPRESENT_FALSE or YProximity.ISPRESENT_TRUE, according to true if the
     * input (considered as binary) is active (detection value is smaller than the specified threshold),
     * and false otherwise
     *
     * On failure, throws an exception or returns YProximity.ISPRESENT_INVALID.
     */
    function YProximity_get_isPresent()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ISPRESENT_INVALID;
            }
        }
        res = this._isPresent;
        return res;
    }

    /**
     * Gets true if the input (considered as binary) is active (detection value is smaller than the
     * specified threshold), and false otherwise.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YProximity object that invoked the callback
     *         - the result:either Y_ISPRESENT_FALSE or Y_ISPRESENT_TRUE, according to true if the input
     *         (considered as binary) is active (detection value is smaller than the specified threshold), and false otherwise
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_ISPRESENT_INVALID.
     */
    function YProximity_get_isPresent_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ISPRESENT_INVALID);
            } else {
                callback(context, obj, obj._isPresent);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from absent to present).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last observed
     *         detection (the input contact transitioned from absent to present)
     *
     * On failure, throws an exception or returns YProximity.LASTTIMEAPPROACHED_INVALID.
     */
    function YProximity_get_lastTimeApproached()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LASTTIMEAPPROACHED_INVALID;
            }
        }
        res = this._lastTimeApproached;
        return res;
    }

    /**
     * Gets the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from absent to present).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YProximity object that invoked the callback
     *         - the result:an integer corresponding to the number of elapsed milliseconds between the module
     *         power on and the last observed
     *         detection (the input contact transitioned from absent to present)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_LASTTIMEAPPROACHED_INVALID.
     */
    function YProximity_get_lastTimeApproached_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LASTTIMEAPPROACHED_INVALID);
            } else {
                callback(context, obj, obj._lastTimeApproached);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from present to absent).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last observed
     *         detection (the input contact transitioned from present to absent)
     *
     * On failure, throws an exception or returns YProximity.LASTTIMEREMOVED_INVALID.
     */
    function YProximity_get_lastTimeRemoved()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LASTTIMEREMOVED_INVALID;
            }
        }
        res = this._lastTimeRemoved;
        return res;
    }

    /**
     * Gets the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from present to absent).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YProximity object that invoked the callback
     *         - the result:an integer corresponding to the number of elapsed milliseconds between the module
     *         power on and the last observed
     *         detection (the input contact transitioned from present to absent)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_LASTTIMEREMOVED_INVALID.
     */
    function YProximity_get_lastTimeRemoved_async(callback,context)
    {
        var res;                    // long;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LASTTIMEREMOVED_INVALID);
            } else {
                callback(context, obj, obj._lastTimeRemoved);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the pulse counter value. The value is a 32 bit integer. In case
     * of overflow (>=2^32), the counter will wrap. To reset the counter, just
     * call the resetCounter() method.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YProximity.PULSECOUNTER_INVALID.
     */
    function YProximity_get_pulseCounter()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULSECOUNTER_INVALID;
            }
        }
        res = this._pulseCounter;
        return res;
    }

    /**
     * Gets the pulse counter value. The value is a 32 bit integer. In case
     * of overflow (>=2^32), the counter will wrap. To reset the counter, just
     * call the resetCounter() method.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YProximity object that invoked the callback
     *         - the result:an integer corresponding to the pulse counter value
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PULSECOUNTER_INVALID.
     */
    function YProximity_get_pulseCounter_async(callback,context)
    {
        var res;                    // long;
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

    function YProximity_set_pulseCounter(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pulseCounter',rest_val);
    }

    /**
     * Returns the timer of the pulse counter (ms).
     *
     * @return an integer corresponding to the timer of the pulse counter (ms)
     *
     * On failure, throws an exception or returns YProximity.PULSETIMER_INVALID.
     */
    function YProximity_get_pulseTimer()
    {
        var res;                    // long;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PULSETIMER_INVALID;
            }
        }
        res = this._pulseTimer;
        return res;
    }

    /**
     * Gets the timer of the pulse counter (ms).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YProximity object that invoked the callback
     *         - the result:an integer corresponding to the timer of the pulse counter (ms)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    function YProximity_get_pulseTimer_async(callback,context)
    {
        var res;                    // long;
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
     * Returns the parameter (sensor value, presence or pulse count) returned by the get_currentValue
     * function and callbacks.
     *
     * @return a value among YProximity.PROXIMITYREPORTMODE_NUMERIC,
     * YProximity.PROXIMITYREPORTMODE_PRESENCE and YProximity.PROXIMITYREPORTMODE_PULSECOUNT corresponding
     * to the parameter (sensor value, presence or pulse count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns YProximity.PROXIMITYREPORTMODE_INVALID.
     */
    function YProximity_get_proximityReportMode()
    {
        var res;                    // enumPROXIMITYREPORTMODETYPE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PROXIMITYREPORTMODE_INVALID;
            }
        }
        res = this._proximityReportMode;
        return res;
    }

    /**
     * Gets the parameter (sensor value, presence or pulse count) returned by the get_currentValue
     * function and callbacks.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YProximity object that invoked the callback
     *         - the result:a value among Y_PROXIMITYREPORTMODE_NUMERIC, Y_PROXIMITYREPORTMODE_PRESENCE and
     *         Y_PROXIMITYREPORTMODE_PULSECOUNT corresponding to the parameter (sensor value, presence or pulse
     *         count) returned by the get_currentValue function and callbacks
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PROXIMITYREPORTMODE_INVALID.
     */
    function YProximity_get_proximityReportMode_async(callback,context)
    {
        var res;                    // enumPROXIMITYREPORTMODETYPE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PROXIMITYREPORTMODE_INVALID);
            } else {
                callback(context, obj, obj._proximityReportMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Modifies the  parameter  type (sensor value, presence or pulse count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     *
     * @param newval : a value among YProximity.PROXIMITYREPORTMODE_NUMERIC,
     * YProximity.PROXIMITYREPORTMODE_PRESENCE and YProximity.PROXIMITYREPORTMODE_PULSECOUNT
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YProximity_set_proximityReportMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('proximityReportMode',rest_val);
    }

    /**
     * Retrieves a proximity sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the proximity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YProximity.isOnline() to test if the proximity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a proximity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the proximity sensor
     *
     * @return a YProximity object allowing you to drive the proximity sensor.
     */
    function YProximity_FindProximity(func)                     // class method
    {
        var obj;                    // YProximity;
        obj = YFunction._FindFromCache("Proximity", func);
        if (obj == null) {
            obj = new YProximity(func);
            YFunction._AddToCache("Proximity", func, obj);
        }
        return obj;
    }

    /**
     * Resets the pulse counter value as well as its timer.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YProximity_resetCounter()
    {
        return this.set_pulseCounter(0);
    }

    /**
     * Continues the enumeration of proximity sensors started using yFirstProximity().
     *
     * @return a pointer to a YProximity object, corresponding to
     *         a proximity sensor currently online, or a null pointer
     *         if there are no more proximity sensors to enumerate.
     */
    function YProximity_nextProximity()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YProximity.FindProximity(next_hwid);
    }

    /**
     * Starts the enumeration of proximity sensors currently accessible.
     * Use the method YProximity.nextProximity() to iterate on
     * next proximity sensors.
     *
     * @return a pointer to a YProximity object, corresponding to
     *         the first proximity sensor currently online, or a null pointer
     *         if there are none.
     */
    function YProximity_FirstProximity()
    {
        var next_hwid = YAPI.getFirstHardwareId('Proximity');
        if(next_hwid == null) return null;
        return YProximity.FindProximity(next_hwid);
    }

    //--- (end of YProximity implementation)

    //--- (YProximity initialization)
    YProximity = YSensor._Subclass(_YProximity, {
        // Constants
        SIGNALVALUE_INVALID         : YAPI_INVALID_DOUBLE,
        DETECTIONTHRESHOLD_INVALID  : YAPI_INVALID_UINT,
        ISPRESENT_FALSE             : 0,
        ISPRESENT_TRUE              : 1,
        ISPRESENT_INVALID           : -1,
        LASTTIMEAPPROACHED_INVALID  : YAPI_INVALID_LONG,
        LASTTIMEREMOVED_INVALID     : YAPI_INVALID_LONG,
        PULSECOUNTER_INVALID        : YAPI_INVALID_LONG,
        PULSETIMER_INVALID          : YAPI_INVALID_LONG,
        PROXIMITYREPORTMODE_NUMERIC : 0,
        PROXIMITYREPORTMODE_PRESENCE : 1,
        PROXIMITYREPORTMODE_PULSECOUNT : 2,
        PROXIMITYREPORTMODE_INVALID : -1
    }, {
        // Class methods
        FindProximity               : YProximity_FindProximity,
        FirstProximity              : YProximity_FirstProximity
    }, {
        // Methods
        get_signalValue             : YProximity_get_signalValue,
        signalValue                 : YProximity_get_signalValue,
        get_signalValue_async       : YProximity_get_signalValue_async,
        signalValue_async           : YProximity_get_signalValue_async,
        get_detectionThreshold      : YProximity_get_detectionThreshold,
        detectionThreshold          : YProximity_get_detectionThreshold,
        get_detectionThreshold_async : YProximity_get_detectionThreshold_async,
        detectionThreshold_async    : YProximity_get_detectionThreshold_async,
        set_detectionThreshold      : YProximity_set_detectionThreshold,
        setDetectionThreshold       : YProximity_set_detectionThreshold,
        get_isPresent               : YProximity_get_isPresent,
        isPresent                   : YProximity_get_isPresent,
        get_isPresent_async         : YProximity_get_isPresent_async,
        isPresent_async             : YProximity_get_isPresent_async,
        get_lastTimeApproached      : YProximity_get_lastTimeApproached,
        lastTimeApproached          : YProximity_get_lastTimeApproached,
        get_lastTimeApproached_async : YProximity_get_lastTimeApproached_async,
        lastTimeApproached_async    : YProximity_get_lastTimeApproached_async,
        get_lastTimeRemoved         : YProximity_get_lastTimeRemoved,
        lastTimeRemoved             : YProximity_get_lastTimeRemoved,
        get_lastTimeRemoved_async   : YProximity_get_lastTimeRemoved_async,
        lastTimeRemoved_async       : YProximity_get_lastTimeRemoved_async,
        get_pulseCounter            : YProximity_get_pulseCounter,
        pulseCounter                : YProximity_get_pulseCounter,
        get_pulseCounter_async      : YProximity_get_pulseCounter_async,
        pulseCounter_async          : YProximity_get_pulseCounter_async,
        set_pulseCounter            : YProximity_set_pulseCounter,
        setPulseCounter             : YProximity_set_pulseCounter,
        get_pulseTimer              : YProximity_get_pulseTimer,
        pulseTimer                  : YProximity_get_pulseTimer,
        get_pulseTimer_async        : YProximity_get_pulseTimer_async,
        pulseTimer_async            : YProximity_get_pulseTimer_async,
        get_proximityReportMode     : YProximity_get_proximityReportMode,
        proximityReportMode         : YProximity_get_proximityReportMode,
        get_proximityReportMode_async : YProximity_get_proximityReportMode_async,
        proximityReportMode_async   : YProximity_get_proximityReportMode_async,
        set_proximityReportMode     : YProximity_set_proximityReportMode,
        setProximityReportMode      : YProximity_set_proximityReportMode,
        resetCounter                : YProximity_resetCounter,
        nextProximity               : YProximity_nextProximity,
        _parseAttr                  : YProximity_parseAttr
    });
    //--- (end of YProximity initialization)
})();

//--- (Proximity functions)

/**
 * Retrieves a proximity sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the proximity sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YProximity.isOnline() to test if the proximity sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a proximity sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the proximity sensor
 *
 * @return a YProximity object allowing you to drive the proximity sensor.
 */
function yFindProximity(func)
{
    return YProximity.FindProximity(func);
}

/**
 * Starts the enumeration of proximity sensors currently accessible.
 * Use the method YProximity.nextProximity() to iterate on
 * next proximity sensors.
 *
 * @return a pointer to a YProximity object, corresponding to
 *         the first proximity sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstProximity()
{
    return YProximity.FirstProximity();
}

//--- (end of Proximity functions)
