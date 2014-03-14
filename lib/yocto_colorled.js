/*********************************************************************
 *
 * $Id: yocto_colorled.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements the high-level API for ColorLed functions
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

//--- (YColorLed return codes)
//--- (end of YColorLed return codes)
//--- (YColorLed definitions)
var Y_RGBCOLOR_INVALID              = YAPI_INVALID_UINT;
var Y_HSLCOLOR_INVALID              = YAPI_INVALID_UINT;
var Y_RGBMOVE_INVALID               = null;
var Y_HSLMOVE_INVALID               = null;
var Y_RGBCOLORATPOWERON_INVALID     = YAPI_INVALID_UINT;
//--- (end of YColorLed definitions)

//--- (YColorLed class start)
/**
 * YColorLed Class: ColorLed function interface
 * 
 * Yoctopuce application programming interface
 * allows you to drive a color led using RGB coordinates as well as HSL coordinates.
 * The module performs all conversions form RGB to HSL automatically. It is then
 * self-evident to turn on a led with a given hue and to progressively vary its
 * saturation or lightness. If needed, you can find more information on the
 * difference between RGB and HSL in the section following this one.
 */
//--- (end of YColorLed class start)

var YColorLed; // definition below
(function()
{
    function _YColorLed(str_func)
    {
        //--- (YColorLed constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'ColorLed';

        this._rgbColor                       = Y_RGBCOLOR_INVALID;         // U24Color
        this._hslColor                       = Y_HSLCOLOR_INVALID;         // U24Color
        this._rgbMove                        = Y_RGBMOVE_INVALID;          // Move
        this._hslMove                        = Y_HSLMOVE_INVALID;          // Move
        this._rgbColorAtPowerOn              = Y_RGBCOLORATPOWERON_INVALID; // U24Color
        //--- (end of YColorLed constructor)
    }

    //--- (YColorLed implementation)

    function YColorLed_parseAttr(name, val, _super)
    {
        switch(name) {
        case "rgbColor":
            this._rgbColor = parseInt(val);
            return 1;
        case "hslColor":
            this._hslColor = parseInt(val);
            return 1;
        case "rgbMove":
            this._rgbMove = val;
            return 1;
        case "hslMove":
            this._hslMove = val;
            return 1;
        case "rgbColorAtPowerOn":
            this._rgbColorAtPowerOn = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current RGB color of the led.
     * 
     * @return an integer corresponding to the current RGB color of the led
     * 
     * On failure, throws an exception or returns YColorLed.RGBCOLOR_INVALID.
     */
    function YColorLed_get_rgbColor()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RGBCOLOR_INVALID;
            }
        }
        return this._rgbColor;
    }

    /**
     * Gets the current RGB color of the led.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:an integer corresponding to the current RGB color of the led
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_RGBCOLOR_INVALID.
     */
    function YColorLed_get_rgbColor_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RGBCOLOR_INVALID);
            } else {
                callback(context, obj, obj._rgbColor);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current color of the led, using a RGB color. Encoding is done as follows: 0xRRGGBB.
     * 
     * @param newval : an integer corresponding to the current color of the led, using a RGB color
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_set_rgbColor(newval)
    {   var rest_val;
        rest_val = '0x'+newval.toString(16);
        return this._setAttr('rgbColor',rest_val);
    }

    /**
     * Returns the current HSL color of the led.
     * 
     * @return an integer corresponding to the current HSL color of the led
     * 
     * On failure, throws an exception or returns YColorLed.HSLCOLOR_INVALID.
     */
    function YColorLed_get_hslColor()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_HSLCOLOR_INVALID;
            }
        }
        return this._hslColor;
    }

    /**
     * Gets the current HSL color of the led.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:an integer corresponding to the current HSL color of the led
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_HSLCOLOR_INVALID.
     */
    function YColorLed_get_hslColor_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_HSLCOLOR_INVALID);
            } else {
                callback(context, obj, obj._hslColor);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current color of the led, using a color HSL. Encoding is done as follows: 0xHHSSLL.
     * 
     * @param newval : an integer corresponding to the current color of the led, using a color HSL
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_set_hslColor(newval)
    {   var rest_val;
        rest_val = '0x'+newval.toString(16);
        return this._setAttr('hslColor',rest_val);
    }

    function YColorLed_get_rgbMove()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RGBMOVE_INVALID;
            }
        }
        return this._rgbMove;
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YColorLed_get_rgbMove_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RGBMOVE_INVALID);
            } else {
                callback(context, obj, obj._rgbMove);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YColorLed_set_rgbMove(newval)
    {   var rest_val;
        rest_val = String(newval.target)+":"+String(newval.ms);
        return this._setAttr('rgbMove',rest_val);
    }

    /**
     * Performs a smooth transition in the RGB color space between the current color and a target color.
     * 
     * @param rgb_target  : desired RGB color at the end of the transition
     * @param ms_duration : duration of the transition, in millisecond
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_rgbMove(rgb_target,ms_duration)
    {   var rest_val;
        rest_val = String(rgb_target)+":"+String(ms_duration);
        return this._setAttr('rgbMove',rest_val);
    }

    function YColorLed_get_hslMove()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_HSLMOVE_INVALID;
            }
        }
        return this._hslMove;
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YColorLed_get_hslMove_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_HSLMOVE_INVALID);
            } else {
                callback(context, obj, obj._hslMove);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YColorLed_set_hslMove(newval)
    {   var rest_val;
        rest_val = String(newval.target)+":"+String(newval.ms);
        return this._setAttr('hslMove',rest_val);
    }

    /**
     * Performs a smooth transition in the HSL color space between the current color and a target color.
     * 
     * @param hsl_target  : desired HSL color at the end of the transition
     * @param ms_duration : duration of the transition, in millisecond
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_hslMove(hsl_target,ms_duration)
    {   var rest_val;
        rest_val = String(hsl_target)+":"+String(ms_duration);
        return this._setAttr('hslMove',rest_val);
    }

    /**
     * Returns the configured color to be displayed when the module is turned on.
     * 
     * @return an integer corresponding to the configured color to be displayed when the module is turned on
     * 
     * On failure, throws an exception or returns YColorLed.RGBCOLORATPOWERON_INVALID.
     */
    function YColorLed_get_rgbColorAtPowerOn()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RGBCOLORATPOWERON_INVALID;
            }
        }
        return this._rgbColorAtPowerOn;
    }

    /**
     * Gets the configured color to be displayed when the module is turned on.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLed object that invoked the callback
     *         - the result:an integer corresponding to the configured color to be displayed when the module is turned on
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_RGBCOLORATPOWERON_INVALID.
     */
    function YColorLed_get_rgbColorAtPowerOn_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RGBCOLORATPOWERON_INVALID);
            } else {
                callback(context, obj, obj._rgbColorAtPowerOn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the color that the led will display by default when the module is turned on.
     * This color will be displayed as soon as the module is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * change should be kept.
     * 
     * @param newval : an integer corresponding to the color that the led will display by default when the
     * module is turned on
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_set_rgbColorAtPowerOn(newval)
    {   var rest_val;
        rest_val = '0x'+newval.toString(16);
        return this._setAttr('rgbColorAtPowerOn',rest_val);
    }

    /**
     * Retrieves an RGB led for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the RGB led is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB led is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB led by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the RGB led
     * 
     * @return a YColorLed object allowing you to drive the RGB led.
     */
    function YColorLed_FindColorLed(func)                       // class method
    {
        var obj;                    // YColorLed;
        obj = YFunction._FindFromCache("ColorLed", func);
        if (obj == null) {
            obj = new YColorLed(func);
            YFunction._AddToCache("ColorLed", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of RGB leds started using yFirstColorLed().
     * 
     * @return a pointer to a YColorLed object, corresponding to
     *         an RGB led currently online, or a null pointer
     *         if there are no more RGB leds to enumerate.
     */
    function YColorLed_nextColorLed()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YColorLed.FindColorLed(next_hwid);
    }

    /**
     * Starts the enumeration of RGB leds currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB leds.
     * 
     * @return a pointer to a YColorLed object, corresponding to
     *         the first RGB led currently online, or a null pointer
     *         if there are none.
     */
    function YColorLed_FirstColorLed()
    {
        var next_hwid = YAPI.getFirstHardwareId('ColorLed');
        if(next_hwid == null) return null;
        return YColorLed.FindColorLed(next_hwid);
    }

    //--- (end of YColorLed implementation)

    //--- (YColorLed initialization)
    YColorLed = YFunction._Subclass(_YColorLed, {
        // Constants
        RGBCOLOR_INVALID            : YAPI_INVALID_UINT,
        HSLCOLOR_INVALID            : YAPI_INVALID_UINT,
        RGBCOLORATPOWERON_INVALID   : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindColorLed                : YColorLed_FindColorLed,
        FirstColorLed               : YColorLed_FirstColorLed
    }, {
        // Methods
        get_rgbColor                : YColorLed_get_rgbColor,
        rgbColor                    : YColorLed_get_rgbColor,
        get_rgbColor_async          : YColorLed_get_rgbColor_async,
        rgbColor_async              : YColorLed_get_rgbColor_async,
        set_rgbColor                : YColorLed_set_rgbColor,
        setRgbColor                 : YColorLed_set_rgbColor,
        get_hslColor                : YColorLed_get_hslColor,
        hslColor                    : YColorLed_get_hslColor,
        get_hslColor_async          : YColorLed_get_hslColor_async,
        hslColor_async              : YColorLed_get_hslColor_async,
        set_hslColor                : YColorLed_set_hslColor,
        setHslColor                 : YColorLed_set_hslColor,
        get_rgbMove                 : YColorLed_get_rgbMove,
        rgbMove                     : YColorLed_get_rgbMove,
        get_rgbMove_async           : YColorLed_get_rgbMove_async,
        rgbMove_async               : YColorLed_get_rgbMove_async,
        set_rgbMove                 : YColorLed_set_rgbMove,
        setRgbMove                  : YColorLed_set_rgbMove,
        rgbMove                     : YColorLed_rgbMove,
        get_hslMove                 : YColorLed_get_hslMove,
        hslMove                     : YColorLed_get_hslMove,
        get_hslMove_async           : YColorLed_get_hslMove_async,
        hslMove_async               : YColorLed_get_hslMove_async,
        set_hslMove                 : YColorLed_set_hslMove,
        setHslMove                  : YColorLed_set_hslMove,
        hslMove                     : YColorLed_hslMove,
        get_rgbColorAtPowerOn       : YColorLed_get_rgbColorAtPowerOn,
        rgbColorAtPowerOn           : YColorLed_get_rgbColorAtPowerOn,
        get_rgbColorAtPowerOn_async : YColorLed_get_rgbColorAtPowerOn_async,
        rgbColorAtPowerOn_async     : YColorLed_get_rgbColorAtPowerOn_async,
        set_rgbColorAtPowerOn       : YColorLed_set_rgbColorAtPowerOn,
        setRgbColorAtPowerOn        : YColorLed_set_rgbColorAtPowerOn,
        nextColorLed                : YColorLed_nextColorLed,
        _parseAttr                  : YColorLed_parseAttr
    });
    //--- (end of YColorLed initialization)
})();

//--- (ColorLed functions)

/**
 * Retrieves an RGB led for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the RGB led is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YColorLed.isOnline() to test if the RGB led is
 * indeed online at a given time. In case of ambiguity when looking for
 * an RGB led by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the RGB led
 * 
 * @return a YColorLed object allowing you to drive the RGB led.
 */
function yFindColorLed(func)
{
    return YColorLed.FindColorLed(func);
}

/**
 * Starts the enumeration of RGB leds currently accessible.
 * Use the method YColorLed.nextColorLed() to iterate on
 * next RGB leds.
 * 
 * @return a pointer to a YColorLed object, corresponding to
 *         the first RGB led currently online, or a null pointer
 *         if there are none.
 */
function yFirstColorLed()
{
    return YColorLed.FirstColorLed();
}

//--- (end of ColorLed functions)
