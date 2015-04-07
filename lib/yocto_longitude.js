/*********************************************************************
 *
 * $Id: yocto_longitude.js 19746 2015-03-17 10:34:00Z seb $
 *
 * Implements the high-level API for Longitude functions
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

//--- (YLongitude return codes)
//--- (end of YLongitude return codes)
//--- (YLongitude definitions)
//--- (end of YLongitude definitions)

//--- (YLongitude class start)
/**
 * YLongitude Class: Longitude function interface
 *
 * The Yoctopuce class YLongitude allows you to read the longitude from Yoctopuce
 * geolocalization sensors. It inherits from the YSensor class the core functions to
 * read measurements, register callback functions, access the autonomous
 * datalogger.
 */
//--- (end of YLongitude class start)

var YLongitude; // definition below
(function()
{
    function _YLongitude(str_func)
    {
        //--- (YLongitude constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Longitude';

        //--- (end of YLongitude constructor)
    }

    //--- (YLongitude implementation)

    /**
     * Retrieves a longitude sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the longitude sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLongitude.isOnline() to test if the longitude sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a longitude sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the longitude sensor
     *
     * @return a YLongitude object allowing you to drive the longitude sensor.
     */
    function YLongitude_FindLongitude(func)                     // class method
    {
        var obj;                    // YLongitude;
        obj = YFunction._FindFromCache("Longitude", func);
        if (obj == null) {
            obj = new YLongitude(func);
            YFunction._AddToCache("Longitude", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of longitude sensors started using yFirstLongitude().
     *
     * @return a pointer to a YLongitude object, corresponding to
     *         a longitude sensor currently online, or a null pointer
     *         if there are no more longitude sensors to enumerate.
     */
    function YLongitude_nextLongitude()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YLongitude.FindLongitude(next_hwid);
    }

    /**
     * Starts the enumeration of longitude sensors currently accessible.
     * Use the method YLongitude.nextLongitude() to iterate on
     * next longitude sensors.
     *
     * @return a pointer to a YLongitude object, corresponding to
     *         the first longitude sensor currently online, or a null pointer
     *         if there are none.
     */
    function YLongitude_FirstLongitude()
    {
        var next_hwid = YAPI.getFirstHardwareId('Longitude');
        if(next_hwid == null) return null;
        return YLongitude.FindLongitude(next_hwid);
    }

    //--- (end of YLongitude implementation)

    //--- (YLongitude initialization)
    YLongitude = YSensor._Subclass(_YLongitude, {
    }, {
        // Class methods
        FindLongitude               : YLongitude_FindLongitude,
        FirstLongitude              : YLongitude_FirstLongitude
    }, {
        // Methods
        nextLongitude               : YLongitude_nextLongitude
    });
    //--- (end of YLongitude initialization)
})();

//--- (Longitude functions)

/**
 * Retrieves a longitude sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the longitude sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YLongitude.isOnline() to test if the longitude sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a longitude sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the longitude sensor
 *
 * @return a YLongitude object allowing you to drive the longitude sensor.
 */
function yFindLongitude(func)
{
    return YLongitude.FindLongitude(func);
}

/**
 * Starts the enumeration of longitude sensors currently accessible.
 * Use the method YLongitude.nextLongitude() to iterate on
 * next longitude sensors.
 *
 * @return a pointer to a YLongitude object, corresponding to
 *         the first longitude sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstLongitude()
{
    return YLongitude.FirstLongitude();
}

//--- (end of Longitude functions)
