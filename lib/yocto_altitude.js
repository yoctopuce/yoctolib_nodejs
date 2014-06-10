/*********************************************************************
 *
 * $Id: yocto_altitude.js 16185 2014-05-12 16:00:20Z seb $
 *
 * Implements the high-level API for Altitude functions
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

//--- (YAltitude return codes)
//--- (end of YAltitude return codes)
//--- (YAltitude definitions)
var Y_QNH_INVALID                   = YAPI_INVALID_DOUBLE;
//--- (end of YAltitude definitions)

//--- (YAltitude class start)
/**
 * YAltitude Class: Altitude function interface
 * 
 * The Yoctopuce application programming interface allows you to read an instant
 * measure of the sensor, as well as the minimal and maximal values observed.
 */
//--- (end of YAltitude class start)

var YAltitude; // definition below
(function()
{
    function _YAltitude(str_func)
    {
        //--- (YAltitude constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Altitude';

        this._qnh                            = Y_QNH_INVALID;              // CentFloatingPoint
        //--- (end of YAltitude constructor)
    }

    //--- (YAltitude implementation)

    function YAltitude_parseAttr(name, val, _super)
    {
        switch(name) {
        case "qnh":
            this._qnh = val/65536;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the current estimated altitude. This allows to compensate for
     * ambient pressure variations and to work in relative mode.
     * 
     * @param newval : a floating point number corresponding to the current estimated altitude
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAltitude_set_currentValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('currentValue',rest_val);
    }

    /**
     * Changes the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH). This enables you to compensate for atmospheric pressure
     * changes due to weather conditions.
     * 
     * @param newval : a floating point number corresponding to the barometric pressure adjusted to sea
     * level used to compute
     *         the altitude (QNH)
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAltitude_set_qnh(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('qnh',rest_val);
    }

    /**
     * Returns the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH).
     * 
     * @return a floating point number corresponding to the barometric pressure adjusted to sea level used to compute
     *         the altitude (QNH)
     * 
     * On failure, throws an exception or returns YAltitude.QNH_INVALID.
     */
    function YAltitude_get_qnh()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_QNH_INVALID;
            }
        }
        return this._qnh;
    }

    /**
     * Gets the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAltitude object that invoked the callback
     *         - the result:a floating point number corresponding to the barometric pressure adjusted to sea level
     *         used to compute
     *         the altitude (QNH)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_QNH_INVALID.
     */
    function YAltitude_get_qnh_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_QNH_INVALID);
            } else {
                callback(context, obj, obj._qnh);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves an altimeter for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the altimeter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAltitude.isOnline() to test if the altimeter is
     * indeed online at a given time. In case of ambiguity when looking for
     * an altimeter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the altimeter
     * 
     * @return a YAltitude object allowing you to drive the altimeter.
     */
    function YAltitude_FindAltitude(func)                       // class method
    {
        var obj;                    // YAltitude;
        obj = YFunction._FindFromCache("Altitude", func);
        if (obj == null) {
            obj = new YAltitude(func);
            YFunction._AddToCache("Altitude", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of altimeters started using yFirstAltitude().
     * 
     * @return a pointer to a YAltitude object, corresponding to
     *         an altimeter currently online, or a null pointer
     *         if there are no more altimeters to enumerate.
     */
    function YAltitude_nextAltitude()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAltitude.FindAltitude(next_hwid);
    }

    /**
     * Starts the enumeration of altimeters currently accessible.
     * Use the method YAltitude.nextAltitude() to iterate on
     * next altimeters.
     * 
     * @return a pointer to a YAltitude object, corresponding to
     *         the first altimeter currently online, or a null pointer
     *         if there are none.
     */
    function YAltitude_FirstAltitude()
    {
        var next_hwid = YAPI.getFirstHardwareId('Altitude');
        if(next_hwid == null) return null;
        return YAltitude.FindAltitude(next_hwid);
    }

    //--- (end of YAltitude implementation)

    //--- (YAltitude initialization)
    YAltitude = YSensor._Subclass(_YAltitude, {
        // Constants
        QNH_INVALID                 : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindAltitude                : YAltitude_FindAltitude,
        FirstAltitude               : YAltitude_FirstAltitude
    }, {
        // Methods
        set_currentValue            : YAltitude_set_currentValue,
        setCurrentValue             : YAltitude_set_currentValue,
        set_qnh                     : YAltitude_set_qnh,
        setQnh                      : YAltitude_set_qnh,
        get_qnh                     : YAltitude_get_qnh,
        qnh                         : YAltitude_get_qnh,
        get_qnh_async               : YAltitude_get_qnh_async,
        qnh_async                   : YAltitude_get_qnh_async,
        nextAltitude                : YAltitude_nextAltitude,
        _parseAttr                  : YAltitude_parseAttr
    });
    //--- (end of YAltitude initialization)
})();

//--- (Altitude functions)

/**
 * Retrieves an altimeter for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the altimeter is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YAltitude.isOnline() to test if the altimeter is
 * indeed online at a given time. In case of ambiguity when looking for
 * an altimeter by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the altimeter
 * 
 * @return a YAltitude object allowing you to drive the altimeter.
 */
function yFindAltitude(func)
{
    return YAltitude.FindAltitude(func);
}

/**
 * Starts the enumeration of altimeters currently accessible.
 * Use the method YAltitude.nextAltitude() to iterate on
 * next altimeters.
 * 
 * @return a pointer to a YAltitude object, corresponding to
 *         the first altimeter currently online, or a null pointer
 *         if there are none.
 */
function yFirstAltitude()
{
    return YAltitude.FirstAltitude();
}

//--- (end of Altitude functions)
