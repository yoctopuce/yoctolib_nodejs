/*********************************************************************
 *
 * $Id: yocto_led.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements the high-level API for Led functions
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

//--- (YLed return codes)
//--- (end of YLed return codes)
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
var Y_LUMINOSITY_INVALID            = YAPI_INVALID_UINT;
//--- (end of YLed definitions)

//--- (YLed class start)
/**
 * YLed Class: Led function interface
 * 
 * Yoctopuce application programming interface
 * allows you not only to drive the intensity of the led, but also to
 * have it blink at various preset frequencies.
 */
//--- (end of YLed class start)

var YLed; // definition below
(function()
{
    function _YLed(str_func)
    {
        //--- (YLed constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Led';

        this._power                          = Y_POWER_INVALID;            // OnOff
        this._luminosity                     = Y_LUMINOSITY_INVALID;       // Percent
        this._blinking                       = Y_BLINKING_INVALID;         // Blink
        //--- (end of YLed constructor)
    }

    //--- (YLed implementation)

    function YLed_parseAttr(name, val, _super)
    {
        switch(name) {
        case "power":
            this._power = parseInt(val);
            return 1;
        case "luminosity":
            this._luminosity = parseInt(val);
            return 1;
        case "blinking":
            this._blinking = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current led state.
     * 
     * @return either YLed.POWER_OFF or YLed.POWER_ON, according to the current led state
     * 
     * On failure, throws an exception or returns YLed.POWER_INVALID.
     */
    function YLed_get_power()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_POWER_INVALID;
            }
        }
        return this._power;
    }

    /**
     * Gets the current led state.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YLed object that invoked the callback
     *         - the result:either Y_POWER_OFF or Y_POWER_ON, according to the current led state
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_POWER_INVALID.
     */
    function YLed_get_power_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_POWER_INVALID);
            } else {
                callback(context, obj, obj._power);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
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
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LUMINOSITY_INVALID;
            }
        }
        return this._luminosity;
    }

    /**
     * Gets the current led intensity (in per cent).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YLed object that invoked the callback
     *         - the result:an integer corresponding to the current led intensity (in per cent)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LUMINOSITY_INVALID.
     */
    function YLed_get_luminosity_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LUMINOSITY_INVALID);
            } else {
                callback(context, obj, obj._luminosity);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
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
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BLINKING_INVALID;
            }
        }
        return this._blinking;
    }

    /**
     * Gets the current led signaling mode.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YLed object that invoked the callback
     *         - the result:a value among Y_BLINKING_STILL, Y_BLINKING_RELAX, Y_BLINKING_AWARE, Y_BLINKING_RUN,
     *         Y_BLINKING_CALL and Y_BLINKING_PANIC corresponding to the current led signaling mode
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_BLINKING_INVALID.
     */
    function YLed_get_blinking_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BLINKING_INVALID);
            } else {
                callback(context, obj, obj._blinking);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
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
    function YLed_FindLed(func)                                 // class method
    {
        var obj;                    // YLed;
        obj = YFunction._FindFromCache("Led", func);
        if (obj == null) {
            obj = new YLed(func);
            YFunction._AddToCache("Led", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of leds started using yFirstLed().
     * 
     * @return a pointer to a YLed object, corresponding to
     *         a led currently online, or a null pointer
     *         if there are no more leds to enumerate.
     */
    function YLed_nextLed()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YLed.FindLed(next_hwid);
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

    //--- (YLed initialization)
    YLed = YFunction._Subclass(_YLed, {
        // Constants
        POWER_OFF                   : 0,
        POWER_ON                    : 1,
        POWER_INVALID               : -1,
        LUMINOSITY_INVALID          : YAPI_INVALID_UINT,
        BLINKING_STILL              : 0,
        BLINKING_RELAX              : 1,
        BLINKING_AWARE              : 2,
        BLINKING_RUN                : 3,
        BLINKING_CALL               : 4,
        BLINKING_PANIC              : 5,
        BLINKING_INVALID            : -1
    }, {
        // Class methods
        FindLed                     : YLed_FindLed,
        FirstLed                    : YLed_FirstLed
    }, {
        // Methods
        get_power                   : YLed_get_power,
        power                       : YLed_get_power,
        get_power_async             : YLed_get_power_async,
        power_async                 : YLed_get_power_async,
        set_power                   : YLed_set_power,
        setPower                    : YLed_set_power,
        get_luminosity              : YLed_get_luminosity,
        luminosity                  : YLed_get_luminosity,
        get_luminosity_async        : YLed_get_luminosity_async,
        luminosity_async            : YLed_get_luminosity_async,
        set_luminosity              : YLed_set_luminosity,
        setLuminosity               : YLed_set_luminosity,
        get_blinking                : YLed_get_blinking,
        blinking                    : YLed_get_blinking,
        get_blinking_async          : YLed_get_blinking_async,
        blinking_async              : YLed_get_blinking_async,
        set_blinking                : YLed_set_blinking,
        setBlinking                 : YLed_set_blinking,
        nextLed                     : YLed_nextLed,
        _parseAttr                  : YLed_parseAttr
    });
    //--- (end of YLed initialization)
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
function yFindLed(func)
{
    return YLed.FindLed(func);
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
