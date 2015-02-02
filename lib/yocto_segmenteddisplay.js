/*********************************************************************
 *
 * $Id: yocto_segmenteddisplay.js 18762 2014-12-16 16:00:39Z seb $
 *
 * Implements the high-level API for SegmentedDisplay functions
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

//--- (YSegmentedDisplay return codes)
//--- (end of YSegmentedDisplay return codes)
//--- (YSegmentedDisplay definitions)
var Y_DISPLAYMODE_DISCONNECTED      = 0;
var Y_DISPLAYMODE_MANUAL            = 1;
var Y_DISPLAYMODE_AUTO1             = 2;
var Y_DISPLAYMODE_AUTO60            = 3;
var Y_DISPLAYMODE_INVALID           = -1;
var Y_DISPLAYEDTEXT_INVALID         = YAPI_INVALID_STRING;
//--- (end of YSegmentedDisplay definitions)

//--- (YSegmentedDisplay class start)
/**
 * YSegmentedDisplay Class: SegmentedDisplay function interface
 * 
 * The SegmentedDisplay class allows you to drive segmented displays.
 */
//--- (end of YSegmentedDisplay class start)

var YSegmentedDisplay; // definition below
(function()
{
    function _YSegmentedDisplay(str_func)
    {
        //--- (YSegmentedDisplay constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'SegmentedDisplay';

        this._displayedText                  = Y_DISPLAYEDTEXT_INVALID;    // Text
        this._displayMode                    = Y_DISPLAYMODE_INVALID;      // DisplayMode
        //--- (end of YSegmentedDisplay constructor)
    }

    //--- (YSegmentedDisplay implementation)

    function YSegmentedDisplay_parseAttr(name, val, _super)
    {
        switch(name) {
        case "displayedText":
            this._displayedText = val;
            return 1;
        case "displayMode":
            this._displayMode = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the text currently displayed on the screen.
     * 
     * @return a string corresponding to the text currently displayed on the screen
     * 
     * On failure, throws an exception or returns YSegmentedDisplay.DISPLAYEDTEXT_INVALID.
     */
    function YSegmentedDisplay_get_displayedText()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DISPLAYEDTEXT_INVALID;
            }
        }
        return this._displayedText;
    }

    /**
     * Gets the text currently displayed on the screen.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSegmentedDisplay object that invoked the callback
     *         - the result:a string corresponding to the text currently displayed on the screen
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_DISPLAYEDTEXT_INVALID.
     */
    function YSegmentedDisplay_get_displayedText_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DISPLAYEDTEXT_INVALID);
            } else {
                callback(context, obj, obj._displayedText);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the text currently displayed on the screen.
     * 
     * @param newval : a string corresponding to the text currently displayed on the screen
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YSegmentedDisplay_set_displayedText(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('displayedText',rest_val);
    }

    function YSegmentedDisplay_get_displayMode()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DISPLAYMODE_INVALID;
            }
        }
        return this._displayMode;
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSegmentedDisplay object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YSegmentedDisplay_get_displayMode_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DISPLAYMODE_INVALID);
            } else {
                callback(context, obj, obj._displayMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YSegmentedDisplay_set_displayMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('displayMode',rest_val);
    }

    /**
     * Retrieves a segmented display for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the segmented displays is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSegmentedDisplay.isOnline() to test if the segmented displays is
     * indeed online at a given time. In case of ambiguity when looking for
     * a segmented display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the segmented displays
     * 
     * @return a YSegmentedDisplay object allowing you to drive the segmented displays.
     */
    function YSegmentedDisplay_FindSegmentedDisplay(func)       // class method
    {
        var obj;                    // YSegmentedDisplay;
        obj = YFunction._FindFromCache("SegmentedDisplay", func);
        if (obj == null) {
            obj = new YSegmentedDisplay(func);
            YFunction._AddToCache("SegmentedDisplay", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of segmented displays started using yFirstSegmentedDisplay().
     * 
     * @return a pointer to a YSegmentedDisplay object, corresponding to
     *         a segmented display currently online, or a null pointer
     *         if there are no more segmented displays to enumerate.
     */
    function YSegmentedDisplay_nextSegmentedDisplay()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplay(next_hwid);
    }

    /**
     * Starts the enumeration of segmented displays currently accessible.
     * Use the method YSegmentedDisplay.nextSegmentedDisplay() to iterate on
     * next segmented displays.
     * 
     * @return a pointer to a YSegmentedDisplay object, corresponding to
     *         the first segmented displays currently online, or a null pointer
     *         if there are none.
     */
    function YSegmentedDisplay_FirstSegmentedDisplay()
    {
        var next_hwid = YAPI.getFirstHardwareId('SegmentedDisplay');
        if(next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplay(next_hwid);
    }

    //--- (end of YSegmentedDisplay implementation)

    //--- (YSegmentedDisplay initialization)
    YSegmentedDisplay = YFunction._Subclass(_YSegmentedDisplay, {
        // Constants
        DISPLAYEDTEXT_INVALID       : YAPI_INVALID_STRING,
        DISPLAYMODE_DISCONNECTED    : 0,
        DISPLAYMODE_MANUAL          : 1,
        DISPLAYMODE_AUTO1           : 2,
        DISPLAYMODE_AUTO60          : 3,
        DISPLAYMODE_INVALID         : -1
    }, {
        // Class methods
        FindSegmentedDisplay        : YSegmentedDisplay_FindSegmentedDisplay,
        FirstSegmentedDisplay       : YSegmentedDisplay_FirstSegmentedDisplay
    }, {
        // Methods
        get_displayedText           : YSegmentedDisplay_get_displayedText,
        displayedText               : YSegmentedDisplay_get_displayedText,
        get_displayedText_async     : YSegmentedDisplay_get_displayedText_async,
        displayedText_async         : YSegmentedDisplay_get_displayedText_async,
        set_displayedText           : YSegmentedDisplay_set_displayedText,
        setDisplayedText            : YSegmentedDisplay_set_displayedText,
        get_displayMode             : YSegmentedDisplay_get_displayMode,
        displayMode                 : YSegmentedDisplay_get_displayMode,
        get_displayMode_async       : YSegmentedDisplay_get_displayMode_async,
        displayMode_async           : YSegmentedDisplay_get_displayMode_async,
        set_displayMode             : YSegmentedDisplay_set_displayMode,
        setDisplayMode              : YSegmentedDisplay_set_displayMode,
        nextSegmentedDisplay        : YSegmentedDisplay_nextSegmentedDisplay,
        _parseAttr                  : YSegmentedDisplay_parseAttr
    });
    //--- (end of YSegmentedDisplay initialization)
})();

//--- (SegmentedDisplay functions)

/**
 * Retrieves a segmented display for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the segmented displays is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSegmentedDisplay.isOnline() to test if the segmented displays is
 * indeed online at a given time. In case of ambiguity when looking for
 * a segmented display by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the segmented displays
 * 
 * @return a YSegmentedDisplay object allowing you to drive the segmented displays.
 */
function yFindSegmentedDisplay(func)
{
    return YSegmentedDisplay.FindSegmentedDisplay(func);
}

/**
 * Starts the enumeration of segmented displays currently accessible.
 * Use the method YSegmentedDisplay.nextSegmentedDisplay() to iterate on
 * next segmented displays.
 * 
 * @return a pointer to a YSegmentedDisplay object, corresponding to
 *         the first segmented displays currently online, or a null pointer
 *         if there are none.
 */
function yFirstSegmentedDisplay()
{
    return YSegmentedDisplay.FirstSegmentedDisplay();
}

//--- (end of SegmentedDisplay functions)
