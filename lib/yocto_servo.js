/*********************************************************************
 *
 * $Id: yocto_servo.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements the high-level API for Servo functions
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

//--- (YServo return codes)
//--- (end of YServo return codes)
//--- (YServo definitions)
var Y_ENABLED_FALSE                 = 0;
var Y_ENABLED_TRUE                  = 1;
var Y_ENABLED_INVALID               = -1;
var Y_ENABLEDATPOWERON_FALSE        = 0;
var Y_ENABLEDATPOWERON_TRUE         = 1;
var Y_ENABLEDATPOWERON_INVALID      = -1;
var Y_POSITION_INVALID              = YAPI_INVALID_INT;
var Y_RANGE_INVALID                 = YAPI_INVALID_UINT;
var Y_NEUTRAL_INVALID               = YAPI_INVALID_UINT;
var Y_MOVE_INVALID                  = null;
var Y_POSITIONATPOWERON_INVALID     = YAPI_INVALID_INT;
//--- (end of YServo definitions)

//--- (YServo class start)
/**
 * YServo Class: Servo function interface
 * 
 * Yoctopuce application programming interface allows you not only to move
 * a servo to a given position, but also to specify the time interval
 * in which the move should be performed. This makes it possible to
 * synchronize two servos involved in a same move.
 */
//--- (end of YServo class start)

var YServo; // definition below
(function()
{
    function _YServo(str_func)
    {
        //--- (YServo constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Servo';

        this._position                       = Y_POSITION_INVALID;         // Int
        this._enabled                        = Y_ENABLED_INVALID;          // Bool
        this._range                          = Y_RANGE_INVALID;            // Percent
        this._neutral                        = Y_NEUTRAL_INVALID;          // MicroSeconds
        this._move                           = Y_MOVE_INVALID;             // Move
        this._positionAtPowerOn              = Y_POSITIONATPOWERON_INVALID; // Int
        this._enabledAtPowerOn               = Y_ENABLEDATPOWERON_INVALID; // Bool
        //--- (end of YServo constructor)
    }

    //--- (YServo implementation)

    function YServo_parseAttr(name, val, _super)
    {
        switch(name) {
        case "position":
            this._position = parseInt(val);
            return 1;
        case "enabled":
            this._enabled = parseInt(val);
            return 1;
        case "range":
            this._range = parseInt(val);
            return 1;
        case "neutral":
            this._neutral = parseInt(val);
            return 1;
        case "move":
            this._move = val;
            return 1;
        case "positionAtPowerOn":
            this._positionAtPowerOn = parseInt(val);
            return 1;
        case "enabledAtPowerOn":
            this._enabledAtPowerOn = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current servo position.
     * 
     * @return an integer corresponding to the current servo position
     * 
     * On failure, throws an exception or returns YServo.POSITION_INVALID.
     */
    function YServo_get_position()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_POSITION_INVALID;
            }
        }
        return this._position;
    }

    /**
     * Gets the current servo position.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YServo object that invoked the callback
     *         - the result:an integer corresponding to the current servo position
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_POSITION_INVALID.
     */
    function YServo_get_position_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_POSITION_INVALID);
            } else {
                callback(context, obj, obj._position);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes immediately the servo driving position.
     * 
     * @param newval : an integer corresponding to immediately the servo driving position
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YServo_set_position(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('position',rest_val);
    }

    /**
     * Returns the state of the servos.
     * 
     * @return either YServo.ENABLED_FALSE or YServo.ENABLED_TRUE, according to the state of the servos
     * 
     * On failure, throws an exception or returns YServo.ENABLED_INVALID.
     */
    function YServo_get_enabled()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ENABLED_INVALID;
            }
        }
        return this._enabled;
    }

    /**
     * Gets the state of the servos.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YServo object that invoked the callback
     *         - the result:either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the state of the servos
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    function YServo_get_enabled_async(callback,context)
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
     * Stops or starts the servo.
     * 
     * @param newval : either YServo.ENABLED_FALSE or YServo.ENABLED_TRUE
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YServo_set_enabled(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabled',rest_val);
    }

    /**
     * Returns the current range of use of the servo.
     * 
     * @return an integer corresponding to the current range of use of the servo
     * 
     * On failure, throws an exception or returns YServo.RANGE_INVALID.
     */
    function YServo_get_range()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RANGE_INVALID;
            }
        }
        return this._range;
    }

    /**
     * Gets the current range of use of the servo.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YServo object that invoked the callback
     *         - the result:an integer corresponding to the current range of use of the servo
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_RANGE_INVALID.
     */
    function YServo_get_range_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RANGE_INVALID);
            } else {
                callback(context, obj, obj._range);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the range of use of the servo, specified in per cents.
     * A range of 100% corresponds to a standard control signal, that varies
     * from 1 [ms] to 2 [ms], When using a servo that supports a double range,
     * from 0.5 [ms] to 2.5 [ms], you can select a range of 200%.
     * Be aware that using a range higher than what is supported by the servo
     * is likely to damage the servo.
     * 
     * @param newval : an integer corresponding to the range of use of the servo, specified in per cents
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YServo_set_range(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('range',rest_val);
    }

    /**
     * Returns the duration in microseconds of a neutral pulse for the servo.
     * 
     * @return an integer corresponding to the duration in microseconds of a neutral pulse for the servo
     * 
     * On failure, throws an exception or returns YServo.NEUTRAL_INVALID.
     */
    function YServo_get_neutral()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NEUTRAL_INVALID;
            }
        }
        return this._neutral;
    }

    /**
     * Gets the duration in microseconds of a neutral pulse for the servo.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YServo object that invoked the callback
     *         - the result:an integer corresponding to the duration in microseconds of a neutral pulse for the servo
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_NEUTRAL_INVALID.
     */
    function YServo_get_neutral_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NEUTRAL_INVALID);
            } else {
                callback(context, obj, obj._neutral);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the duration of the pulse corresponding to the neutral position of the servo.
     * The duration is specified in microseconds, and the standard value is 1500 [us].
     * This setting makes it possible to shift the range of use of the servo.
     * Be aware that using a range higher than what is supported by the servo is
     * likely to damage the servo.
     * 
     * @param newval : an integer corresponding to the duration of the pulse corresponding to the neutral
     * position of the servo
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YServo_set_neutral(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('neutral',rest_val);
    }

    function YServo_get_move()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MOVE_INVALID;
            }
        }
        return this._move;
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YServo object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YServo_get_move_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MOVE_INVALID);
            } else {
                callback(context, obj, obj._move);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YServo_set_move(newval)
    {   var rest_val;
        rest_val = String(newval.target)+":"+String(newval.ms);
        return this._setAttr('move',rest_val);
    }

    /**
     * Performs a smooth move at constant speed toward a given position.
     * 
     * @param target      : new position at the end of the move
     * @param ms_duration : total duration of the move, in milliseconds
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YServo_move(target,ms_duration)
    {   var rest_val;
        rest_val = String(target)+":"+String(ms_duration);
        return this._setAttr('move',rest_val);
    }

    /**
     * Returns the servo position at device power up.
     * 
     * @return an integer corresponding to the servo position at device power up
     * 
     * On failure, throws an exception or returns YServo.POSITIONATPOWERON_INVALID.
     */
    function YServo_get_positionAtPowerOn()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_POSITIONATPOWERON_INVALID;
            }
        }
        return this._positionAtPowerOn;
    }

    /**
     * Gets the servo position at device power up.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YServo object that invoked the callback
     *         - the result:an integer corresponding to the servo position at device power up
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_POSITIONATPOWERON_INVALID.
     */
    function YServo_get_positionAtPowerOn_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_POSITIONATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._positionAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Configure the servo position at device power up. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     * 
     * @param newval : an integer
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YServo_set_positionAtPowerOn(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('positionAtPowerOn',rest_val);
    }

    /**
     * Returns the servo signal generator state at power up.
     * 
     * @return either YServo.ENABLEDATPOWERON_FALSE or YServo.ENABLEDATPOWERON_TRUE, according to the
     * servo signal generator state at power up
     * 
     * On failure, throws an exception or returns YServo.ENABLEDATPOWERON_INVALID.
     */
    function YServo_get_enabledAtPowerOn()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ENABLEDATPOWERON_INVALID;
            }
        }
        return this._enabledAtPowerOn;
    }

    /**
     * Gets the servo signal generator state at power up.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YServo object that invoked the callback
     *         - the result:either Y_ENABLEDATPOWERON_FALSE or Y_ENABLEDATPOWERON_TRUE, according to the servo
     *         signal generator state at power up
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ENABLEDATPOWERON_INVALID.
     */
    function YServo_get_enabledAtPowerOn_async(callback,context)
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
     * Configure the servo signal generator state at power up. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     * 
     * @param newval : either YServo.ENABLEDATPOWERON_FALSE or YServo.ENABLEDATPOWERON_TRUE
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YServo_set_enabledAtPowerOn(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabledAtPowerOn',rest_val);
    }

    /**
     * Retrieves a servo for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the servo is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YServo.isOnline() to test if the servo is
     * indeed online at a given time. In case of ambiguity when looking for
     * a servo by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the servo
     * 
     * @return a YServo object allowing you to drive the servo.
     */
    function YServo_FindServo(func)                             // class method
    {
        var obj;                    // YServo;
        obj = YFunction._FindFromCache("Servo", func);
        if (obj == null) {
            obj = new YServo(func);
            YFunction._AddToCache("Servo", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of servos started using yFirstServo().
     * 
     * @return a pointer to a YServo object, corresponding to
     *         a servo currently online, or a null pointer
     *         if there are no more servos to enumerate.
     */
    function YServo_nextServo()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YServo.FindServo(next_hwid);
    }

    /**
     * Starts the enumeration of servos currently accessible.
     * Use the method YServo.nextServo() to iterate on
     * next servos.
     * 
     * @return a pointer to a YServo object, corresponding to
     *         the first servo currently online, or a null pointer
     *         if there are none.
     */
    function YServo_FirstServo()
    {
        var next_hwid = YAPI.getFirstHardwareId('Servo');
        if(next_hwid == null) return null;
        return YServo.FindServo(next_hwid);
    }

    //--- (end of YServo implementation)

    //--- (YServo initialization)
    YServo = YFunction._Subclass(_YServo, {
        // Constants
        POSITION_INVALID            : YAPI_INVALID_INT,
        ENABLED_FALSE               : 0,
        ENABLED_TRUE                : 1,
        ENABLED_INVALID             : -1,
        RANGE_INVALID               : YAPI_INVALID_UINT,
        NEUTRAL_INVALID             : YAPI_INVALID_UINT,
        POSITIONATPOWERON_INVALID   : YAPI_INVALID_INT,
        ENABLEDATPOWERON_FALSE      : 0,
        ENABLEDATPOWERON_TRUE       : 1,
        ENABLEDATPOWERON_INVALID    : -1
    }, {
        // Class methods
        FindServo                   : YServo_FindServo,
        FirstServo                  : YServo_FirstServo
    }, {
        // Methods
        get_position                : YServo_get_position,
        position                    : YServo_get_position,
        get_position_async          : YServo_get_position_async,
        position_async              : YServo_get_position_async,
        set_position                : YServo_set_position,
        setPosition                 : YServo_set_position,
        get_enabled                 : YServo_get_enabled,
        enabled                     : YServo_get_enabled,
        get_enabled_async           : YServo_get_enabled_async,
        enabled_async               : YServo_get_enabled_async,
        set_enabled                 : YServo_set_enabled,
        setEnabled                  : YServo_set_enabled,
        get_range                   : YServo_get_range,
        range                       : YServo_get_range,
        get_range_async             : YServo_get_range_async,
        range_async                 : YServo_get_range_async,
        set_range                   : YServo_set_range,
        setRange                    : YServo_set_range,
        get_neutral                 : YServo_get_neutral,
        neutral                     : YServo_get_neutral,
        get_neutral_async           : YServo_get_neutral_async,
        neutral_async               : YServo_get_neutral_async,
        set_neutral                 : YServo_set_neutral,
        setNeutral                  : YServo_set_neutral,
        get_move                    : YServo_get_move,
        move                        : YServo_get_move,
        get_move_async              : YServo_get_move_async,
        move_async                  : YServo_get_move_async,
        set_move                    : YServo_set_move,
        setMove                     : YServo_set_move,
        move                        : YServo_move,
        get_positionAtPowerOn       : YServo_get_positionAtPowerOn,
        positionAtPowerOn           : YServo_get_positionAtPowerOn,
        get_positionAtPowerOn_async : YServo_get_positionAtPowerOn_async,
        positionAtPowerOn_async     : YServo_get_positionAtPowerOn_async,
        set_positionAtPowerOn       : YServo_set_positionAtPowerOn,
        setPositionAtPowerOn        : YServo_set_positionAtPowerOn,
        get_enabledAtPowerOn        : YServo_get_enabledAtPowerOn,
        enabledAtPowerOn            : YServo_get_enabledAtPowerOn,
        get_enabledAtPowerOn_async  : YServo_get_enabledAtPowerOn_async,
        enabledAtPowerOn_async      : YServo_get_enabledAtPowerOn_async,
        set_enabledAtPowerOn        : YServo_set_enabledAtPowerOn,
        setEnabledAtPowerOn         : YServo_set_enabledAtPowerOn,
        nextServo                   : YServo_nextServo,
        _parseAttr                  : YServo_parseAttr
    });
    //--- (end of YServo initialization)
})();

//--- (Servo functions)

/**
 * Retrieves a servo for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the servo is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YServo.isOnline() to test if the servo is
 * indeed online at a given time. In case of ambiguity when looking for
 * a servo by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the servo
 * 
 * @return a YServo object allowing you to drive the servo.
 */
function yFindServo(func)
{
    return YServo.FindServo(func);
}

/**
 * Starts the enumeration of servos currently accessible.
 * Use the method YServo.nextServo() to iterate on
 * next servos.
 * 
 * @return a pointer to a YServo object, corresponding to
 *         the first servo currently online, or a null pointer
 *         if there are none.
 */
function yFirstServo()
{
    return YServo.FirstServo();
}

//--- (end of Servo functions)
