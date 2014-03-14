/*********************************************************************
 *
 * $Id: yocto_tilt.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements the high-level API for Tilt functions
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

//--- (YTilt return codes)
//--- (end of YTilt return codes)
//--- (YTilt definitions)
var Y_AXIS_X                        = 0;
var Y_AXIS_Y                        = 1;
var Y_AXIS_Z                        = 2;
var Y_AXIS_INVALID                  = -1;
//--- (end of YTilt definitions)

//--- (YTilt class start)
/**
 * YTilt Class: Tilt function interface
 * 
 * The Yoctopuce application programming interface allows you to read an instant
 * measure of the sensor, as well as the minimal and maximal values observed.
 */
//--- (end of YTilt class start)

var YTilt; // definition below
(function()
{
    function _YTilt(str_func)
    {
        //--- (YTilt constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Tilt';

        this._axis                           = Y_AXIS_INVALID;             // Axis
        //--- (end of YTilt constructor)
    }

    //--- (YTilt implementation)

    function YTilt_parseAttr(name, val, _super)
    {
        switch(name) {
        case "axis":
            this._axis = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    function YTilt_get_axis()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_AXIS_INVALID;
            }
        }
        return this._axis;
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YTilt object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YTilt_get_axis_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_AXIS_INVALID);
            } else {
                callback(context, obj, obj._axis);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a tilt sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the tilt sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTilt.isOnline() to test if the tilt sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a tilt sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the tilt sensor
     * 
     * @return a YTilt object allowing you to drive the tilt sensor.
     */
    function YTilt_FindTilt(func)                               // class method
    {
        var obj;                    // YTilt;
        obj = YFunction._FindFromCache("Tilt", func);
        if (obj == null) {
            obj = new YTilt(func);
            YFunction._AddToCache("Tilt", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of tilt sensors started using yFirstTilt().
     * 
     * @return a pointer to a YTilt object, corresponding to
     *         a tilt sensor currently online, or a null pointer
     *         if there are no more tilt sensors to enumerate.
     */
    function YTilt_nextTilt()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YTilt.FindTilt(next_hwid);
    }

    /**
     * Starts the enumeration of tilt sensors currently accessible.
     * Use the method YTilt.nextTilt() to iterate on
     * next tilt sensors.
     * 
     * @return a pointer to a YTilt object, corresponding to
     *         the first tilt sensor currently online, or a null pointer
     *         if there are none.
     */
    function YTilt_FirstTilt()
    {
        var next_hwid = YAPI.getFirstHardwareId('Tilt');
        if(next_hwid == null) return null;
        return YTilt.FindTilt(next_hwid);
    }

    //--- (end of YTilt implementation)

    //--- (YTilt initialization)
    YTilt = YSensor._Subclass(_YTilt, {
        // Constants
        AXIS_X                      : 0,
        AXIS_Y                      : 1,
        AXIS_Z                      : 2,
        AXIS_INVALID                : -1
    }, {
        // Class methods
        FindTilt                    : YTilt_FindTilt,
        FirstTilt                   : YTilt_FirstTilt
    }, {
        // Methods
        get_axis                    : YTilt_get_axis,
        axis                        : YTilt_get_axis,
        get_axis_async              : YTilt_get_axis_async,
        axis_async                  : YTilt_get_axis_async,
        nextTilt                    : YTilt_nextTilt,
        _parseAttr                  : YTilt_parseAttr
    });
    //--- (end of YTilt initialization)
})();

//--- (Tilt functions)

/**
 * Retrieves a tilt sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the tilt sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YTilt.isOnline() to test if the tilt sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a tilt sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the tilt sensor
 * 
 * @return a YTilt object allowing you to drive the tilt sensor.
 */
function yFindTilt(func)
{
    return YTilt.FindTilt(func);
}

/**
 * Starts the enumeration of tilt sensors currently accessible.
 * Use the method YTilt.nextTilt() to iterate on
 * next tilt sensors.
 * 
 * @return a pointer to a YTilt object, corresponding to
 *         the first tilt sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstTilt()
{
    return YTilt.FirstTilt();
}

//--- (end of Tilt functions)
