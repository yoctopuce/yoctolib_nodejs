/*********************************************************************
 *
 * $Id: pic24config.php 13012 2013-10-07 13:56:46Z mvuilleu $
 *
 * Implements yFindServo(), the high-level API for Servo functions
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
//--- (YServo definitions)
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_POSITION_INVALID              = Number.NEGATIVE_INFINITY;
var Y_RANGE_INVALID                 = -1;
var Y_NEUTRAL_INVALID               = -1;
var Y_MOVE_INVALID                  = null;
//--- (end of YServo definitions)

/**
 * YServo Class: Servo function interface
 * 
 * Yoctopuce application programming interface allows you not only to move
 * a servo to a given position, but also to specify the time interval
 * in which the move should be performed. This makes it possible to
 * synchronize two servos involved in a same move.
 */
var YServo; // definition below
(function()
{
    //--- (YServo implementation)

    /**
     * Returns the logical name of the servo.
     * 
     * @return a string corresponding to the logical name of the servo
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YServo_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the servo.
     * 
     * @return a string corresponding to the logical name of the servo
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YServo_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the servo. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the servo
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YServo_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the servo (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the servo (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YServo_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the servo (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the servo (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YServo_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current servo position.
     * 
     * @return an integer corresponding to the current servo position
     * 
     * On failure, throws an exception or returns Y_POSITION_INVALID.
     */
    function YServo_get_position()
    {   var json_val = this._getAttr('position');
        return (json_val == null ? Y_POSITION_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current servo position.
     * 
     * @return an integer corresponding to the current servo position
     * 
     * On failure, throws an exception or returns Y_POSITION_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YServo_get_position_async(func_callback, obj_context)
    {   this._getAttr_async('position',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_POSITION_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes immediately the servo driving position.
     * 
     * @param newval : an integer corresponding to immediately the servo driving position
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YServo_set_position(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('position',rest_val);
    }

    /**
     * Returns the current range of use of the servo.
     * 
     * @return an integer corresponding to the current range of use of the servo
     * 
     * On failure, throws an exception or returns Y_RANGE_INVALID.
     */
    function YServo_get_range()
    {   var json_val = this._getAttr('range');
        return (json_val == null ? Y_RANGE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current range of use of the servo.
     * 
     * @return an integer corresponding to the current range of use of the servo
     * 
     * On failure, throws an exception or returns Y_RANGE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YServo_get_range_async(func_callback, obj_context)
    {   this._getAttr_async('range',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RANGE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
     * @return YAPI_SUCCESS if the call succeeds.
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
     * On failure, throws an exception or returns Y_NEUTRAL_INVALID.
     */
    function YServo_get_neutral()
    {   var json_val = this._getAttr('neutral');
        return (json_val == null ? Y_NEUTRAL_INVALID : parseInt(json_val));
    }

    /**
     * Returns the duration in microseconds of a neutral pulse for the servo.
     * 
     * @return an integer corresponding to the duration in microseconds of a neutral pulse for the servo
     * 
     * On failure, throws an exception or returns Y_NEUTRAL_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YServo_get_neutral_async(func_callback, obj_context)
    {   this._getAttr_async('neutral',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_NEUTRAL_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YServo_set_neutral(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('neutral',rest_val);
    }

    function YServo_get_move()
    {   var json_val = this._getAttr('move');
        return (json_val == null ? Y_MOVE_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YServo_get_move_async(func_callback, obj_context)
    {   this._getAttr_async('move',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_MOVE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YServo_move(int_target,int_ms_duration)
    {   var rest_val;
        rest_val = String(int_target)+":"+String(int_ms_duration);
        return this._setAttr('move',rest_val);
    }

    /**
     * Continues the enumeration of servos started using yFirstServo().
     * 
     * @return a pointer to a YServo object, corresponding to
     *         a servo currently online, or a null pointer
     *         if there are no more servos to enumerate.
     */
    function YServo_nextServo()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YServo.FindServo(next_hwid);
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
    function YServo_FindServo(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Servo', str_func);
        if(obj_func) return obj_func;
        return new YServo(str_func);
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

    function _YServo(str_func)
    {
        //--- (YServo constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Servo', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.POSITION_INVALID                = Number.NEGATIVE_INFINITY;
        this.RANGE_INVALID                   = -1;
        this.NEUTRAL_INVALID                 = -1;
        this.get_logicalName                 = YServo_get_logicalName;
        this.logicalName                     = YServo_get_logicalName;
        this.get_logicalName_async           = YServo_get_logicalName_async;
        this.logicalName_async               = YServo_get_logicalName_async;
        this.set_logicalName                 = YServo_set_logicalName;
        this.setLogicalName                  = YServo_set_logicalName;
        this.get_advertisedValue             = YServo_get_advertisedValue;
        this.advertisedValue                 = YServo_get_advertisedValue;
        this.get_advertisedValue_async       = YServo_get_advertisedValue_async;
        this.advertisedValue_async           = YServo_get_advertisedValue_async;
        this.get_position                    = YServo_get_position;
        this.position                        = YServo_get_position;
        this.get_position_async              = YServo_get_position_async;
        this.position_async                  = YServo_get_position_async;
        this.set_position                    = YServo_set_position;
        this.setPosition                     = YServo_set_position;
        this.get_range                       = YServo_get_range;
        this.range                           = YServo_get_range;
        this.get_range_async                 = YServo_get_range_async;
        this.range_async                     = YServo_get_range_async;
        this.set_range                       = YServo_set_range;
        this.setRange                        = YServo_set_range;
        this.get_neutral                     = YServo_get_neutral;
        this.neutral                         = YServo_get_neutral;
        this.get_neutral_async               = YServo_get_neutral_async;
        this.neutral_async                   = YServo_get_neutral_async;
        this.set_neutral                     = YServo_set_neutral;
        this.setNeutral                      = YServo_set_neutral;
        this.get_move                        = YServo_get_move;
        this.move                            = YServo_get_move;
        this.get_move_async                  = YServo_get_move_async;
        this.move_async                      = YServo_get_move_async;
        this.set_move                        = YServo_set_move;
        this.setMove                         = YServo_set_move;
        this.move                            = YServo_move;
        this.nextServo                       = YServo_nextServo;
        //--- (end of YServo constructor)
    }

    YServo = _YServo;
    YServo.FindServo  = YServo_FindServo;
    YServo.FirstServo = YServo_FirstServo;
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
function yFindServo(str_func)
{
    return YServo.FindServo(str_func);
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
