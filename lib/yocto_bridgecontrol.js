/*********************************************************************
 *
 * $Id: yocto_bridgecontrol.js 27017 2017-03-31 14:47:59Z seb $
 *
 * Implements the high-level API for BridgeControl functions
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

//--- (YBridgeControl return codes)
//--- (end of YBridgeControl return codes)
//--- (YBridgeControl definitions)
var Y_EXCITATIONMODE_INTERNAL_AC    = 0;
var Y_EXCITATIONMODE_INTERNAL_DC    = 1;
var Y_EXCITATIONMODE_EXTERNAL_DC    = 2;
var Y_EXCITATIONMODE_INVALID        = -1;
var Y_BRIDGELATENCY_INVALID         = YAPI_INVALID_UINT;
var Y_ADVALUE_INVALID               = YAPI_INVALID_INT;
var Y_ADGAIN_INVALID                = YAPI_INVALID_UINT;
//--- (end of YBridgeControl definitions)

//--- (YBridgeControl class start)
/**
 * YBridgeControl Class: BridgeControl function interface
 *
 * The Yoctopuce class YBridgeControl allows you to control bridge excitation parameters
 * and measure parameters for a Wheatstone bridge sensor. To read the measurements, it
 * is best to use the GenericSensor calss, which will compute the measured value
 * in the optimal way.
 */
//--- (end of YBridgeControl class start)

var YBridgeControl; // definition below
(function()
{
    function _YBridgeControl(str_func)
    {
        //--- (YBridgeControl constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'BridgeControl';

        this._excitationMode                 = Y_EXCITATIONMODE_INVALID;   // ExcitationMode
        this._bridgeLatency                  = Y_BRIDGELATENCY_INVALID;    // UInt31
        this._adValue                        = Y_ADVALUE_INVALID;          // Int
        this._adGain                         = Y_ADGAIN_INVALID;           // UInt31
        //--- (end of YBridgeControl constructor)
    }

    //--- (YBridgeControl implementation)

    function YBridgeControl_parseAttr(name, val, _super)
    {
        switch(name) {
        case "excitationMode":
            this._excitationMode = parseInt(val);
            return 1;
        case "bridgeLatency":
            this._bridgeLatency = parseInt(val);
            return 1;
        case "adValue":
            this._adValue = parseInt(val);
            return 1;
        case "adGain":
            this._adGain = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current Wheatstone bridge excitation method.
     *
     * @return a value among YBridgeControl.EXCITATIONMODE_INTERNAL_AC,
     * YBridgeControl.EXCITATIONMODE_INTERNAL_DC and YBridgeControl.EXCITATIONMODE_EXTERNAL_DC
     * corresponding to the current Wheatstone bridge excitation method
     *
     * On failure, throws an exception or returns YBridgeControl.EXCITATIONMODE_INVALID.
     */
    function YBridgeControl_get_excitationMode()
    {
        var res;                    // enumEXCITATIONMODE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_EXCITATIONMODE_INVALID;
            }
        }
        res = this._excitationMode;
        return res;
    }

    /**
     * Gets the current Wheatstone bridge excitation method.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBridgeControl object that invoked the callback
     *         - the result:a value among Y_EXCITATIONMODE_INTERNAL_AC, Y_EXCITATIONMODE_INTERNAL_DC and
     *         Y_EXCITATIONMODE_EXTERNAL_DC corresponding to the current Wheatstone bridge excitation method
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_EXCITATIONMODE_INVALID.
     */
    function YBridgeControl_get_excitationMode_async(callback,context)
    {
        var res;                    // enumEXCITATIONMODE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_EXCITATIONMODE_INVALID);
            } else {
                callback(context, obj, obj._excitationMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current Wheatstone bridge excitation method.
     *
     * @param newval : a value among YBridgeControl.EXCITATIONMODE_INTERNAL_AC,
     * YBridgeControl.EXCITATIONMODE_INTERNAL_DC and YBridgeControl.EXCITATIONMODE_EXTERNAL_DC
     * corresponding to the current Wheatstone bridge excitation method
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBridgeControl_set_excitationMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('excitationMode',rest_val);
    }

    /**
     * Returns the current Wheatstone bridge excitation method.
     *
     * @return an integer corresponding to the current Wheatstone bridge excitation method
     *
     * On failure, throws an exception or returns YBridgeControl.BRIDGELATENCY_INVALID.
     */
    function YBridgeControl_get_bridgeLatency()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BRIDGELATENCY_INVALID;
            }
        }
        res = this._bridgeLatency;
        return res;
    }

    /**
     * Gets the current Wheatstone bridge excitation method.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBridgeControl object that invoked the callback
     *         - the result:an integer corresponding to the current Wheatstone bridge excitation method
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_BRIDGELATENCY_INVALID.
     */
    function YBridgeControl_get_bridgeLatency_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BRIDGELATENCY_INVALID);
            } else {
                callback(context, obj, obj._bridgeLatency);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current Wheatstone bridge excitation method.
     *
     * @param newval : an integer corresponding to the current Wheatstone bridge excitation method
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBridgeControl_set_bridgeLatency(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('bridgeLatency',rest_val);
    }

    /**
     * Returns the raw value returned by the ratiometric A/D converter
     * during last read.
     *
     * @return an integer corresponding to the raw value returned by the ratiometric A/D converter
     *         during last read
     *
     * On failure, throws an exception or returns YBridgeControl.ADVALUE_INVALID.
     */
    function YBridgeControl_get_adValue()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ADVALUE_INVALID;
            }
        }
        res = this._adValue;
        return res;
    }

    /**
     * Gets the raw value returned by the ratiometric A/D converter
     * during last read.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBridgeControl object that invoked the callback
     *         - the result:an integer corresponding to the raw value returned by the ratiometric A/D converter
     *         during last read
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_ADVALUE_INVALID.
     */
    function YBridgeControl_get_adValue_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ADVALUE_INVALID);
            } else {
                callback(context, obj, obj._adValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current ratiometric A/D converter gain. The gain is automatically
     * configured according to the signalRange set in the corresponding genericSensor.
     *
     * @return an integer corresponding to the current ratiometric A/D converter gain
     *
     * On failure, throws an exception or returns YBridgeControl.ADGAIN_INVALID.
     */
    function YBridgeControl_get_adGain()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ADGAIN_INVALID;
            }
        }
        res = this._adGain;
        return res;
    }

    /**
     * Gets the current ratiometric A/D converter gain. The gain is automatically
     * configured according to the signalRange set in the corresponding genericSensor.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBridgeControl object that invoked the callback
     *         - the result:an integer corresponding to the current ratiometric A/D converter gain
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_ADGAIN_INVALID.
     */
    function YBridgeControl_get_adGain_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ADGAIN_INVALID);
            } else {
                callback(context, obj, obj._adGain);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a Wheatstone bridge controller for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the Wheatstone bridge controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBridgeControl.isOnline() to test if the Wheatstone bridge controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Wheatstone bridge controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the Wheatstone bridge controller
     *
     * @return a YBridgeControl object allowing you to drive the Wheatstone bridge controller.
     */
    function YBridgeControl_FindBridgeControl(func)             // class method
    {
        var obj;                    // YBridgeControl;
        obj = YFunction._FindFromCache("BridgeControl", func);
        if (obj == null) {
            obj = new YBridgeControl(func);
            YFunction._AddToCache("BridgeControl", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of Wheatstone bridge controllers started using yFirstBridgeControl().
     *
     * @return a pointer to a YBridgeControl object, corresponding to
     *         a Wheatstone bridge controller currently online, or a null pointer
     *         if there are no more Wheatstone bridge controllers to enumerate.
     */
    function YBridgeControl_nextBridgeControl()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YBridgeControl.FindBridgeControl(next_hwid);
    }

    /**
     * Starts the enumeration of Wheatstone bridge controllers currently accessible.
     * Use the method YBridgeControl.nextBridgeControl() to iterate on
     * next Wheatstone bridge controllers.
     *
     * @return a pointer to a YBridgeControl object, corresponding to
     *         the first Wheatstone bridge controller currently online, or a null pointer
     *         if there are none.
     */
    function YBridgeControl_FirstBridgeControl()
    {
        var next_hwid = YAPI.getFirstHardwareId('BridgeControl');
        if(next_hwid == null) return null;
        return YBridgeControl.FindBridgeControl(next_hwid);
    }

    //--- (end of YBridgeControl implementation)

    //--- (YBridgeControl initialization)
    YBridgeControl = YFunction._Subclass(_YBridgeControl, {
        // Constants
        EXCITATIONMODE_INTERNAL_AC  : 0,
        EXCITATIONMODE_INTERNAL_DC  : 1,
        EXCITATIONMODE_EXTERNAL_DC  : 2,
        EXCITATIONMODE_INVALID      : -1,
        BRIDGELATENCY_INVALID       : YAPI_INVALID_UINT,
        ADVALUE_INVALID             : YAPI_INVALID_INT,
        ADGAIN_INVALID              : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindBridgeControl           : YBridgeControl_FindBridgeControl,
        FirstBridgeControl          : YBridgeControl_FirstBridgeControl
    }, {
        // Methods
        get_excitationMode          : YBridgeControl_get_excitationMode,
        excitationMode              : YBridgeControl_get_excitationMode,
        get_excitationMode_async    : YBridgeControl_get_excitationMode_async,
        excitationMode_async        : YBridgeControl_get_excitationMode_async,
        set_excitationMode          : YBridgeControl_set_excitationMode,
        setExcitationMode           : YBridgeControl_set_excitationMode,
        get_bridgeLatency           : YBridgeControl_get_bridgeLatency,
        bridgeLatency               : YBridgeControl_get_bridgeLatency,
        get_bridgeLatency_async     : YBridgeControl_get_bridgeLatency_async,
        bridgeLatency_async         : YBridgeControl_get_bridgeLatency_async,
        set_bridgeLatency           : YBridgeControl_set_bridgeLatency,
        setBridgeLatency            : YBridgeControl_set_bridgeLatency,
        get_adValue                 : YBridgeControl_get_adValue,
        adValue                     : YBridgeControl_get_adValue,
        get_adValue_async           : YBridgeControl_get_adValue_async,
        adValue_async               : YBridgeControl_get_adValue_async,
        get_adGain                  : YBridgeControl_get_adGain,
        adGain                      : YBridgeControl_get_adGain,
        get_adGain_async            : YBridgeControl_get_adGain_async,
        adGain_async                : YBridgeControl_get_adGain_async,
        nextBridgeControl           : YBridgeControl_nextBridgeControl,
        _parseAttr                  : YBridgeControl_parseAttr
    });
    //--- (end of YBridgeControl initialization)
})();

//--- (BridgeControl functions)

/**
 * Retrieves a Wheatstone bridge controller for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the Wheatstone bridge controller is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YBridgeControl.isOnline() to test if the Wheatstone bridge controller is
 * indeed online at a given time. In case of ambiguity when looking for
 * a Wheatstone bridge controller by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the Wheatstone bridge controller
 *
 * @return a YBridgeControl object allowing you to drive the Wheatstone bridge controller.
 */
function yFindBridgeControl(func)
{
    return YBridgeControl.FindBridgeControl(func);
}

/**
 * Starts the enumeration of Wheatstone bridge controllers currently accessible.
 * Use the method YBridgeControl.nextBridgeControl() to iterate on
 * next Wheatstone bridge controllers.
 *
 * @return a pointer to a YBridgeControl object, corresponding to
 *         the first Wheatstone bridge controller currently online, or a null pointer
 *         if there are none.
 */
function yFirstBridgeControl()
{
    return YBridgeControl.FirstBridgeControl();
}

//--- (end of BridgeControl functions)
