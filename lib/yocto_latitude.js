/*********************************************************************
 *
 * $Id: yocto_latitude.js 26826 2017-03-17 11:20:57Z mvuilleu $
 *
 * Implements the high-level API for Latitude functions
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

//--- (YLatitude return codes)
//--- (end of YLatitude return codes)
//--- (YLatitude definitions)
//--- (end of YLatitude definitions)

//--- (YLatitude class start)
/**
 * YLatitude Class: Latitude function interface
 *
 * The Yoctopuce class YLatitude allows you to read the latitude from Yoctopuce
 * geolocalization sensors. It inherits from the YSensor class the core functions to
 * read measurements, to register callback functions, to access the autonomous
 * datalogger.
 */
//--- (end of YLatitude class start)

var YLatitude; // definition below
(function()
{
    function _YLatitude(str_func)
    {
        //--- (YLatitude constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Latitude';

        //--- (end of YLatitude constructor)
    }

    //--- (YLatitude implementation)

    /**
     * Retrieves a latitude sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the latitude sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLatitude.isOnline() to test if the latitude sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a latitude sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the latitude sensor
     *
     * @return a YLatitude object allowing you to drive the latitude sensor.
     */
    function YLatitude_FindLatitude(func)                       // class method
    {
        var obj;                    // YLatitude;
        obj = YFunction._FindFromCache("Latitude", func);
        if (obj == null) {
            obj = new YLatitude(func);
            YFunction._AddToCache("Latitude", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of latitude sensors started using yFirstLatitude().
     *
     * @return a pointer to a YLatitude object, corresponding to
     *         a latitude sensor currently online, or a null pointer
     *         if there are no more latitude sensors to enumerate.
     */
    function YLatitude_nextLatitude()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YLatitude.FindLatitude(next_hwid);
    }

    /**
     * Starts the enumeration of latitude sensors currently accessible.
     * Use the method YLatitude.nextLatitude() to iterate on
     * next latitude sensors.
     *
     * @return a pointer to a YLatitude object, corresponding to
     *         the first latitude sensor currently online, or a null pointer
     *         if there are none.
     */
    function YLatitude_FirstLatitude()
    {
        var next_hwid = YAPI.getFirstHardwareId('Latitude');
        if(next_hwid == null) return null;
        return YLatitude.FindLatitude(next_hwid);
    }

    //--- (end of YLatitude implementation)

    //--- (YLatitude initialization)
    YLatitude = YSensor._Subclass(_YLatitude, {
    }, {
        // Class methods
        FindLatitude                : YLatitude_FindLatitude,
        FirstLatitude               : YLatitude_FirstLatitude
    }, {
        // Methods
        nextLatitude                : YLatitude_nextLatitude
    });
    //--- (end of YLatitude initialization)
})();

//--- (Latitude functions)

/**
 * Retrieves a latitude sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the latitude sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YLatitude.isOnline() to test if the latitude sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a latitude sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the latitude sensor
 *
 * @return a YLatitude object allowing you to drive the latitude sensor.
 */
function yFindLatitude(func)
{
    return YLatitude.FindLatitude(func);
}

/**
 * Starts the enumeration of latitude sensors currently accessible.
 * Use the method YLatitude.nextLatitude() to iterate on
 * next latitude sensors.
 *
 * @return a pointer to a YLatitude object, corresponding to
 *         the first latitude sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstLatitude()
{
    return YLatitude.FirstLatitude();
}

//--- (end of Latitude functions)
