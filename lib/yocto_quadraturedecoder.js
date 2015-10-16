/*********************************************************************
 *
 * $Id: yocto_quadraturedecoder.js 21782 2015-10-16 07:53:41Z seb $
 *
 * Implements the high-level API for QuadratureDecoder functions
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

//--- (YQuadratureDecoder return codes)
//--- (end of YQuadratureDecoder return codes)
//--- (YQuadratureDecoder definitions)
var Y_DECODING_OFF                  = 0;
var Y_DECODING_ON                   = 1;
var Y_DECODING_INVALID              = -1;
var Y_SPEED_INVALID                 = YAPI_INVALID_DOUBLE;
//--- (end of YQuadratureDecoder definitions)

//--- (YQuadratureDecoder class start)
/**
 * YQuadratureDecoder Class: QuadratureDecoder function interface
 *
 * The class YQuadratureDecoder allows you to decode a two-wire signal produced by a
 * quadrature encoder. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 */
//--- (end of YQuadratureDecoder class start)

var YQuadratureDecoder; // definition below
(function()
{
    function _YQuadratureDecoder(str_func)
    {
        //--- (YQuadratureDecoder constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'QuadratureDecoder';

        this._speed                          = Y_SPEED_INVALID;            // MeasureVal
        this._decoding                       = Y_DECODING_INVALID;         // OnOff
        //--- (end of YQuadratureDecoder constructor)
    }

    //--- (YQuadratureDecoder implementation)

    function YQuadratureDecoder_parseAttr(name, val, _super)
    {
        switch(name) {
        case "speed":
            this._speed = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "decoding":
            this._decoding = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the current expected position of the quadrature decoder.
     * Invoking this function implicitely activates the quadrature decoder.
     *
     * @param newval : a floating point number corresponding to the current expected position of the quadrature decoder
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YQuadratureDecoder_set_currentValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('currentValue',rest_val);
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YQuadratureDecoder.SPEED_INVALID.
     */
    function YQuadratureDecoder_get_speed()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SPEED_INVALID;
            }
        }
        return this._speed;
    }

    /**
     * Gets the PWM frequency in Hz.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YQuadratureDecoder object that invoked the callback
     *         - the result:a floating point number corresponding to the PWM frequency in Hz
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_SPEED_INVALID.
     */
    function YQuadratureDecoder_get_speed_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SPEED_INVALID);
            } else {
                callback(context, obj, obj._speed);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the current activation state of the quadrature decoder.
     *
     * @return either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON, according to the
     * current activation state of the quadrature decoder
     *
     * On failure, throws an exception or returns YQuadratureDecoder.DECODING_INVALID.
     */
    function YQuadratureDecoder_get_decoding()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DECODING_INVALID;
            }
        }
        return this._decoding;
    }

    /**
     * Gets the current activation state of the quadrature decoder.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YQuadratureDecoder object that invoked the callback
     *         - the result:either Y_DECODING_OFF or Y_DECODING_ON, according to the current activation state of
     *         the quadrature decoder
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_DECODING_INVALID.
     */
    function YQuadratureDecoder_get_decoding_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DECODING_INVALID);
            } else {
                callback(context, obj, obj._decoding);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the activation state of the quadrature decoder.
     *
     * @param newval : either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON, according
     * to the activation state of the quadrature decoder
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YQuadratureDecoder_set_decoding(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('decoding',rest_val);
    }

    /**
     * Retrieves a quadrature decoder for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the quadrature decoder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQuadratureDecoder.isOnline() to test if the quadrature decoder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quadrature decoder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the quadrature decoder
     *
     * @return a YQuadratureDecoder object allowing you to drive the quadrature decoder.
     */
    function YQuadratureDecoder_FindQuadratureDecoder(func)     // class method
    {
        var obj;                    // YQuadratureDecoder;
        obj = YFunction._FindFromCache("QuadratureDecoder", func);
        if (obj == null) {
            obj = new YQuadratureDecoder(func);
            YFunction._AddToCache("QuadratureDecoder", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of quadrature decoders started using yFirstQuadratureDecoder().
     *
     * @return a pointer to a YQuadratureDecoder object, corresponding to
     *         a quadrature decoder currently online, or a null pointer
     *         if there are no more quadrature decoders to enumerate.
     */
    function YQuadratureDecoder_nextQuadratureDecoder()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoder(next_hwid);
    }

    /**
     * Starts the enumeration of quadrature decoders currently accessible.
     * Use the method YQuadratureDecoder.nextQuadratureDecoder() to iterate on
     * next quadrature decoders.
     *
     * @return a pointer to a YQuadratureDecoder object, corresponding to
     *         the first quadrature decoder currently online, or a null pointer
     *         if there are none.
     */
    function YQuadratureDecoder_FirstQuadratureDecoder()
    {
        var next_hwid = YAPI.getFirstHardwareId('QuadratureDecoder');
        if(next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoder(next_hwid);
    }

    //--- (end of YQuadratureDecoder implementation)

    //--- (YQuadratureDecoder initialization)
    YQuadratureDecoder = YSensor._Subclass(_YQuadratureDecoder, {
        // Constants
        SPEED_INVALID               : YAPI_INVALID_DOUBLE,
        DECODING_OFF                : 0,
        DECODING_ON                 : 1,
        DECODING_INVALID            : -1
    }, {
        // Class methods
        FindQuadratureDecoder       : YQuadratureDecoder_FindQuadratureDecoder,
        FirstQuadratureDecoder      : YQuadratureDecoder_FirstQuadratureDecoder
    }, {
        // Methods
        set_currentValue            : YQuadratureDecoder_set_currentValue,
        setCurrentValue             : YQuadratureDecoder_set_currentValue,
        get_speed                   : YQuadratureDecoder_get_speed,
        speed                       : YQuadratureDecoder_get_speed,
        get_speed_async             : YQuadratureDecoder_get_speed_async,
        speed_async                 : YQuadratureDecoder_get_speed_async,
        get_decoding                : YQuadratureDecoder_get_decoding,
        decoding                    : YQuadratureDecoder_get_decoding,
        get_decoding_async          : YQuadratureDecoder_get_decoding_async,
        decoding_async              : YQuadratureDecoder_get_decoding_async,
        set_decoding                : YQuadratureDecoder_set_decoding,
        setDecoding                 : YQuadratureDecoder_set_decoding,
        nextQuadratureDecoder       : YQuadratureDecoder_nextQuadratureDecoder,
        _parseAttr                  : YQuadratureDecoder_parseAttr
    });
    //--- (end of YQuadratureDecoder initialization)
})();

//--- (QuadratureDecoder functions)

/**
 * Retrieves a quadrature decoder for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the quadrature decoder is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YQuadratureDecoder.isOnline() to test if the quadrature decoder is
 * indeed online at a given time. In case of ambiguity when looking for
 * a quadrature decoder by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the quadrature decoder
 *
 * @return a YQuadratureDecoder object allowing you to drive the quadrature decoder.
 */
function yFindQuadratureDecoder(func)
{
    return YQuadratureDecoder.FindQuadratureDecoder(func);
}

/**
 * Starts the enumeration of quadrature decoders currently accessible.
 * Use the method YQuadratureDecoder.nextQuadratureDecoder() to iterate on
 * next quadrature decoders.
 *
 * @return a pointer to a YQuadratureDecoder object, corresponding to
 *         the first quadrature decoder currently online, or a null pointer
 *         if there are none.
 */
function yFirstQuadratureDecoder()
{
    return YQuadratureDecoder.FirstQuadratureDecoder();
}

//--- (end of QuadratureDecoder functions)
