/*********************************************************************
 *
 * $Id: yocto_led.js 13065 2013-10-10 16:04:55Z mvuilleu $
 *
 * Implements yFindLed(), the high-level API for Led functions
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
//--- (YLed definitions)
var Y_POWER_OFF                     = 0;
var Y_POWER_ON                      = 1;
var Y_POWER_INVALID                 = -1;
var Y_BLINKING_STILL                = 0;
var Y_BLINKING_RELAX                = 1;
var Y_BLINKING_AWARE                = 2;
var Y_BLINKING_RUN                  = 3;
var Y_BLINKING_CALL                 = 4;
var Y_BLINKING_PANIC                = 5;
var Y_BLINKING_INVALID              = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_LUMINOSITY_INVALID            = -1;
//--- (end of YLed definitions)

/**
 * YLed Class: Led function interface
 * 
 * Yoctopuce application programming interface
 * allows you not only to drive the intensity of the led, but also to
 * have it blink at various preset frequencies.
 */
var YLed; // definition below
(function()
{
    //--- (YLed implementation)

    /**
     * Returns the logical name of the led.
     * 
     * @return a string corresponding to the logical name of the led
     * 
     * On failure, throws an exception or returns YLed.LOGICALNAME_INVALID.
     */
    function YLed_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Gets the logical name of the led.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YLed object that invoked the callback
     *         - the result:a string corresponding to the logical name of the l
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YLed_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the led. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the led
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YLed_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the led (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the led (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YLed.ADVERTISEDVALUE_INVALID.
     */
    function YLed_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Gets the current value of the led (no more than 6 characters).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YLed object that invoked the callback
     *         - the result:a string corresponding to the current value of the led (no more than 6 character
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YLed_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current led state.
     * 
     * @return either YLed.POWER_OFF or YLed.POWER_ON, according to the current led state
     * 
     * On failure, throws an exception or returns YLed.POWER_INVALID.
     */
    function YLed_get_power()
    {   var json_val = this._getAttr('power');
        return (json_val == null ? Y_POWER_INVALID : parseInt(json_val));
    }

    /**
     * Gets the current led state.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YLed object that invoked the callback
     *         - the result:either Y_POWER_OFF or Y_POWER_ON, according to the current led sta
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_POWER_INVALID.
     */
    function YLed_get_power_async(func_callback, obj_context)
    {   this._getAttr_async('power',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_POWER_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the state of the led.
     * 
     * @param newval : either YLed.POWER_OFF or YLed.POWER_ON, according to the state of the led
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YLed_set_power(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('power',rest_val);
    }

    /**
     * Returns the current led intensity (in per cent).
     * 
     * @return an integer corresponding to the current led intensity (in per cent)
     * 
     * On failure, throws an exception or returns YLed.LUMINOSITY_INVALID.
     */
    function YLed_get_luminosity()
    {   var json_val = this._getAttr('luminosity');
        return (json_val == null ? Y_LUMINOSITY_INVALID : parseInt(json_val));
    }

    /**
     * Gets the current led intensity (in per cent).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YLed object that invoked the callback
     *         - the result:an integer corresponding to the current led intensity (in per cen
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LUMINOSITY_INVALID.
     */
    function YLed_get_luminosity_async(func_callback, obj_context)
    {   this._getAttr_async('luminosity',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LUMINOSITY_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the current led intensity (in per cent).
     * 
     * @param newval : an integer corresponding to the current led intensity (in per cent)
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YLed_set_luminosity(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('luminosity',rest_val);
    }

    /**
     * Returns the current led signaling mode.
     * 
     * @return a value among YLed.BLINKING_STILL, YLed.BLINKING_RELAX, YLed.BLINKING_AWARE,
     * YLed.BLINKING_RUN, YLed.BLINKING_CALL and YLed.BLINKING_PANIC corresponding to the current led signaling mode
     * 
     * On failure, throws an exception or returns YLed.BLINKING_INVALID.
     */
    function YLed_get_blinking()
    {   var json_val = this._getAttr('blinking');
        return (json_val == null ? Y_BLINKING_INVALID : parseInt(json_val));
    }

    /**
     * Gets the current led signaling mode.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YLed object that invoked the callback
     *         - the result:a value among Y_BLINKING_STILL, Y_BLINKING_RELAX, Y_BLINKING_AWARE, Y_BLINKING_RUN,
     *         Y_BLINKING_CALL and Y_BLINKING_PANIC corresponding to the current led signaling mo
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_BLINKING_INVALID.
     */
    function YLed_get_blinking_async(func_callback, obj_context)
    {   this._getAttr_async('blinking',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_BLINKING_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the current led signaling mode.
     * 
     * @param newval : a value among YLed.BLINKING_STILL, YLed.BLINKING_RELAX, YLed.BLINKING_AWARE,
     * YLed.BLINKING_RUN, YLed.BLINKING_CALL and YLed.BLINKING_PANIC corresponding to the current led signaling mode
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YLed_set_blinking(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('blinking',rest_val);
    }

    /**
     * Continues the enumeration of leds started using yFirstLed().
     * 
     * @return a pointer to a YLed object, corresponding to
     *         a led currently online, or a null pointer
     *         if there are no more leds to enumerate.
     */
    function YLed_nextLed()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YLed.FindLed(next_hwid);
    }

    /**
     * Retrieves a led for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the led is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLed.isOnline() to test if the led is
     * indeed online at a given time. In case of ambiguity when looking for
     * a led by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the led
     * 
     * @return a YLed object allowing you to drive the led.
     */
    function YLed_FindLed(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Led', str_func);
        if(obj_func) return obj_func;
        return new YLed(str_func);
    }

    /**
     * Starts the enumeration of leds currently accessible.
     * Use the method YLed.nextLed() to iterate on
     * next leds.
     * 
     * @return a pointer to a YLed object, corresponding to
     *         the first led currently online, or a null pointer
     *         if there are none.
     */
    function YLed_FirstLed()
    {
        var next_hwid = YAPI.getFirstHardwareId('Led');
        if(next_hwid == null) return null;
        return YLed.FindLed(next_hwid);
    }

    //--- (end of YLed implementation)

    function _YLed(str_func)
    {
        //--- (YLed constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Led', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.POWER_OFF                       = 0;
        this.POWER_ON                        = 1;
        this.POWER_INVALID                   = -1;
        this.LUMINOSITY_INVALID              = -1;
        this.BLINKING_STILL                  = 0;
        this.BLINKING_RELAX                  = 1;
        this.BLINKING_AWARE                  = 2;
        this.BLINKING_RUN                    = 3;
        this.BLINKING_CALL                   = 4;
        this.BLINKING_PANIC                  = 5;
        this.BLINKING_INVALID                = -1;
        this.get_logicalName                 = YLed_get_logicalName;
        this.logicalName                     = YLed_get_logicalName;
        this.get_logicalName_async           = YLed_get_logicalName_async;
        this.logicalName_async               = YLed_get_logicalName_async;
        this.set_logicalName                 = YLed_set_logicalName;
        this.setLogicalName                  = YLed_set_logicalName;
        this.get_advertisedValue             = YLed_get_advertisedValue;
        this.advertisedValue                 = YLed_get_advertisedValue;
        this.get_advertisedValue_async       = YLed_get_advertisedValue_async;
        this.advertisedValue_async           = YLed_get_advertisedValue_async;
        this.get_power                       = YLed_get_power;
        this.power                           = YLed_get_power;
        this.get_power_async                 = YLed_get_power_async;
        this.power_async                     = YLed_get_power_async;
        this.set_power                       = YLed_set_power;
        this.setPower                        = YLed_set_power;
        this.get_luminosity                  = YLed_get_luminosity;
        this.luminosity                      = YLed_get_luminosity;
        this.get_luminosity_async            = YLed_get_luminosity_async;
        this.luminosity_async                = YLed_get_luminosity_async;
        this.set_luminosity                  = YLed_set_luminosity;
        this.setLuminosity                   = YLed_set_luminosity;
        this.get_blinking                    = YLed_get_blinking;
        this.blinking                        = YLed_get_blinking;
        this.get_blinking_async              = YLed_get_blinking_async;
        this.blinking_async                  = YLed_get_blinking_async;
        this.set_blinking                    = YLed_set_blinking;
        this.setBlinking                     = YLed_set_blinking;
        this.nextLed                         = YLed_nextLed;
        //--- (end of YLed constructor)
    }

    YLed = _YLed;
    YLed.LOGICALNAME_INVALID             = "!INVALID!";
    YLed.ADVERTISEDVALUE_INVALID         = "!INVALID!";
    YLed.POWER_OFF                       = 0;
    YLed.POWER_ON                        = 1;
    YLed.POWER_INVALID                   = -1;
    YLed.LUMINOSITY_INVALID              = -1;
    YLed.BLINKING_STILL                  = 0;
    YLed.BLINKING_RELAX                  = 1;
    YLed.BLINKING_AWARE                  = 2;
    YLed.BLINKING_RUN                    = 3;
    YLed.BLINKING_CALL                   = 4;
    YLed.BLINKING_PANIC                  = 5;
    YLed.BLINKING_INVALID                = -1;
    YLed.FindLed  = YLed_FindLed;
    YLed.FirstLed = YLed_FirstLed;
})();

//--- (Led functions)

/**
 * Retrieves a led for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the led is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YLed.isOnline() to test if the led is
 * indeed online at a given time. In case of ambiguity when looking for
 * a led by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the led
 * 
 * @return a YLed object allowing you to drive the led.
 */
function yFindLed(str_func)
{
    return YLed.FindLed(str_func);
}

/**
 * Starts the enumeration of leds currently accessible.
 * Use the method YLed.nextLed() to iterate on
 * next leds.
 * 
 * @return a pointer to a YLed object, corresponding to
 *         the first led currently online, or a null pointer
 *         if there are none.
 */
function yFirstLed()
{
    return YLed.FirstLed();
}

//--- (end of Led functions)
