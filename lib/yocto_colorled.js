/*********************************************************************
 *
 * $Id: pic24config.php 13012 2013-10-07 13:56:46Z mvuilleu $
 *
 * Implements yFindColorLed(), the high-level API for ColorLed functions
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
//--- (YColorLed definitions)
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_RGBCOLOR_INVALID              = -1;
var Y_HSLCOLOR_INVALID              = -1;
var Y_RGBMOVE_INVALID               = null;
var Y_HSLMOVE_INVALID               = null;
var Y_RGBCOLORATPOWERON_INVALID     = -1;
//--- (end of YColorLed definitions)

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
var YColorLed; // definition below
(function()
{
    //--- (YColorLed implementation)

    /**
     * Returns the logical name of the RGB led.
     * 
     * @return a string corresponding to the logical name of the RGB led
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YColorLed_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the RGB led.
     * 
     * @return a string corresponding to the logical name of the RGB led
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YColorLed_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the RGB led. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the RGB led
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the RGB led (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the RGB led (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YColorLed_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the RGB led (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the RGB led (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YColorLed_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current RGB color of the led.
     * 
     * @return an integer corresponding to the current RGB color of the led
     * 
     * On failure, throws an exception or returns Y_RGBCOLOR_INVALID.
     */
    function YColorLed_get_rgbColor()
    {   var json_val = this._getAttr('rgbColor');
        return (json_val == null ? Y_RGBCOLOR_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current RGB color of the led.
     * 
     * @return an integer corresponding to the current RGB color of the led
     * 
     * On failure, throws an exception or returns Y_RGBCOLOR_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YColorLed_get_rgbColor_async(func_callback, obj_context)
    {   this._getAttr_async('rgbColor',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RGBCOLOR_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the current color of the led, using a RGB color. Encoding is done as follows: 0xRRGGBB.
     * 
     * @param newval : an integer corresponding to the current color of the led, using a RGB color
     * 
     * @return YAPI_SUCCESS if the call succeeds.
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
     * On failure, throws an exception or returns Y_HSLCOLOR_INVALID.
     */
    function YColorLed_get_hslColor()
    {   var json_val = this._getAttr('hslColor');
        return (json_val == null ? Y_HSLCOLOR_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current HSL color of the led.
     * 
     * @return an integer corresponding to the current HSL color of the led
     * 
     * On failure, throws an exception or returns Y_HSLCOLOR_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YColorLed_get_hslColor_async(func_callback, obj_context)
    {   this._getAttr_async('hslColor',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_HSLCOLOR_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the current color of the led, using a color HSL. Encoding is done as follows: 0xHHSSLL.
     * 
     * @param newval : an integer corresponding to the current color of the led, using a color HSL
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_set_hslColor(newval)
    {   var rest_val;
        rest_val = '0x'+newval.toString(16);
        return this._setAttr('hslColor',rest_val);
    }

    function YColorLed_get_rgbMove()
    {   var json_val = this._getAttr('rgbMove');
        return (json_val == null ? Y_RGBMOVE_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YColorLed_get_rgbMove_async(func_callback, obj_context)
    {   this._getAttr_async('rgbMove',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RGBMOVE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_rgbMove(int_rgb_target,int_ms_duration)
    {   var rest_val;
        rest_val = String(int_rgb_target)+":"+String(int_ms_duration);
        return this._setAttr('rgbMove',rest_val);
    }

    function YColorLed_get_hslMove()
    {   var json_val = this._getAttr('hslMove');
        return (json_val == null ? Y_HSLMOVE_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YColorLed_get_hslMove_async(func_callback, obj_context)
    {   this._getAttr_async('hslMove',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_HSLMOVE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_hslMove(int_hsl_target,int_ms_duration)
    {   var rest_val;
        rest_val = String(int_hsl_target)+":"+String(int_ms_duration);
        return this._setAttr('hslMove',rest_val);
    }

    /**
     * Returns the configured color to be displayed when the module is turned on.
     * 
     * @return an integer corresponding to the configured color to be displayed when the module is turned on
     * 
     * On failure, throws an exception or returns Y_RGBCOLORATPOWERON_INVALID.
     */
    function YColorLed_get_rgbColorAtPowerOn()
    {   var json_val = this._getAttr('rgbColorAtPowerOn');
        return (json_val == null ? Y_RGBCOLORATPOWERON_INVALID : parseInt(json_val));
    }

    /**
     * Returns the configured color to be displayed when the module is turned on.
     * 
     * @return an integer corresponding to the configured color to be displayed when the module is turned on
     * 
     * On failure, throws an exception or returns Y_RGBCOLORATPOWERON_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YColorLed_get_rgbColorAtPowerOn_async(func_callback, obj_context)
    {   this._getAttr_async('rgbColorAtPowerOn',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RGBCOLORATPOWERON_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLed_set_rgbColorAtPowerOn(newval)
    {   var rest_val;
        rest_val = '0x'+newval.toString(16);
        return this._setAttr('rgbColorAtPowerOn',rest_val);
    }

    /**
     * Continues the enumeration of RGB leds started using yFirstColorLed().
     * 
     * @return a pointer to a YColorLed object, corresponding to
     *         an RGB led currently online, or a null pointer
     *         if there are no more RGB leds to enumerate.
     */
    function YColorLed_nextColorLed()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YColorLed.FindColorLed(next_hwid);
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
    function YColorLed_FindColorLed(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('ColorLed', str_func);
        if(obj_func) return obj_func;
        return new YColorLed(str_func);
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

    function _YColorLed(str_func)
    {
        //--- (YColorLed constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'ColorLed', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.RGBCOLOR_INVALID                = -1;
        this.HSLCOLOR_INVALID                = -1;
        this.RGBCOLORATPOWERON_INVALID       = -1;
        this.get_logicalName                 = YColorLed_get_logicalName;
        this.logicalName                     = YColorLed_get_logicalName;
        this.get_logicalName_async           = YColorLed_get_logicalName_async;
        this.logicalName_async               = YColorLed_get_logicalName_async;
        this.set_logicalName                 = YColorLed_set_logicalName;
        this.setLogicalName                  = YColorLed_set_logicalName;
        this.get_advertisedValue             = YColorLed_get_advertisedValue;
        this.advertisedValue                 = YColorLed_get_advertisedValue;
        this.get_advertisedValue_async       = YColorLed_get_advertisedValue_async;
        this.advertisedValue_async           = YColorLed_get_advertisedValue_async;
        this.get_rgbColor                    = YColorLed_get_rgbColor;
        this.rgbColor                        = YColorLed_get_rgbColor;
        this.get_rgbColor_async              = YColorLed_get_rgbColor_async;
        this.rgbColor_async                  = YColorLed_get_rgbColor_async;
        this.set_rgbColor                    = YColorLed_set_rgbColor;
        this.setRgbColor                     = YColorLed_set_rgbColor;
        this.get_hslColor                    = YColorLed_get_hslColor;
        this.hslColor                        = YColorLed_get_hslColor;
        this.get_hslColor_async              = YColorLed_get_hslColor_async;
        this.hslColor_async                  = YColorLed_get_hslColor_async;
        this.set_hslColor                    = YColorLed_set_hslColor;
        this.setHslColor                     = YColorLed_set_hslColor;
        this.get_rgbMove                     = YColorLed_get_rgbMove;
        this.rgbMove                         = YColorLed_get_rgbMove;
        this.get_rgbMove_async               = YColorLed_get_rgbMove_async;
        this.rgbMove_async                   = YColorLed_get_rgbMove_async;
        this.set_rgbMove                     = YColorLed_set_rgbMove;
        this.setRgbMove                      = YColorLed_set_rgbMove;
        this.rgbMove                         = YColorLed_rgbMove;
        this.get_hslMove                     = YColorLed_get_hslMove;
        this.hslMove                         = YColorLed_get_hslMove;
        this.get_hslMove_async               = YColorLed_get_hslMove_async;
        this.hslMove_async                   = YColorLed_get_hslMove_async;
        this.set_hslMove                     = YColorLed_set_hslMove;
        this.setHslMove                      = YColorLed_set_hslMove;
        this.hslMove                         = YColorLed_hslMove;
        this.get_rgbColorAtPowerOn           = YColorLed_get_rgbColorAtPowerOn;
        this.rgbColorAtPowerOn               = YColorLed_get_rgbColorAtPowerOn;
        this.get_rgbColorAtPowerOn_async     = YColorLed_get_rgbColorAtPowerOn_async;
        this.rgbColorAtPowerOn_async         = YColorLed_get_rgbColorAtPowerOn_async;
        this.set_rgbColorAtPowerOn           = YColorLed_set_rgbColorAtPowerOn;
        this.setRgbColorAtPowerOn            = YColorLed_set_rgbColorAtPowerOn;
        this.nextColorLed                    = YColorLed_nextColorLed;
        //--- (end of YColorLed constructor)
    }

    YColorLed = _YColorLed;
    YColorLed.FindColorLed  = YColorLed_FindColorLed;
    YColorLed.FirstColorLed = YColorLed_FirstColorLed;
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
function yFindColorLed(str_func)
{
    return YColorLed.FindColorLed(str_func);
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
