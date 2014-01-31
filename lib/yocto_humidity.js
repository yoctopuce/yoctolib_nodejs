/*********************************************************************
 *
 * $Id: yocto_humidity.js 13910 2013-12-08 01:56:01Z mvuilleu $
 *
 * Implements the high-level API for Humidity functions
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

//--- (YHumidity return codes)
//--- (end of YHumidity return codes)
//--- (YHumidity definitions)
//--- (end of YHumidity definitions)

//--- (YHumidity class start)
/**
 * YHumidity Class: Humidity function interface
 * 
 * The Yoctopuce application programming interface allows you to read an instant
 * measure of the sensor, as well as the minimal and maximal values observed.
 */
//--- (end of YHumidity class start)

var YHumidity; // definition below
(function()
{
    function _YHumidity(str_func)
    {
        //--- (YHumidity constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Humidity';

        //--- (end of YHumidity constructor)
    }

    //--- (YHumidity implementation)

    /**
     * Retrieves a humidity sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the humidity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHumidity.isOnline() to test if the humidity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a humidity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the humidity sensor
     * 
     * @return a YHumidity object allowing you to drive the humidity sensor.
     */
    function YHumidity_FindHumidity(func)                       // class method
    {
        var obj;                    // YHumidity;
        obj = YFunction._FindFromCache("Humidity", func);
        if (obj == null) {
            obj = new YHumidity(func);
            YFunction._AddToCache("Humidity", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of humidity sensors started using yFirstHumidity().
     * 
     * @return a pointer to a YHumidity object, corresponding to
     *         a humidity sensor currently online, or a null pointer
     *         if there are no more humidity sensors to enumerate.
     */
    function YHumidity_nextHumidity()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YHumidity.FindHumidity(next_hwid);
    }

    /**
     * Starts the enumeration of humidity sensors currently accessible.
     * Use the method YHumidity.nextHumidity() to iterate on
     * next humidity sensors.
     * 
     * @return a pointer to a YHumidity object, corresponding to
     *         the first humidity sensor currently online, or a null pointer
     *         if there are none.
     */
    function YHumidity_FirstHumidity()
    {
        var next_hwid = YAPI.getFirstHardwareId('Humidity');
        if(next_hwid == null) return null;
        return YHumidity.FindHumidity(next_hwid);
    }

    //--- (end of YHumidity implementation)

    //--- (YHumidity initialization)
    YHumidity = YSensor._Subclass(_YHumidity, {
    }, {
        // Class methods
        FindHumidity                : YHumidity_FindHumidity,
        FirstHumidity               : YHumidity_FirstHumidity
    }, {
        // Methods
        nextHumidity                : YHumidity_nextHumidity
    });
    //--- (end of YHumidity initialization)
})();

//--- (Humidity functions)

/**
 * Retrieves a humidity sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the humidity sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YHumidity.isOnline() to test if the humidity sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a humidity sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the humidity sensor
 * 
 * @return a YHumidity object allowing you to drive the humidity sensor.
 */
function yFindHumidity(func)
{
    return YHumidity.FindHumidity(func);
}

/**
 * Starts the enumeration of humidity sensors currently accessible.
 * Use the method YHumidity.nextHumidity() to iterate on
 * next humidity sensors.
 * 
 * @return a pointer to a YHumidity object, corresponding to
 *         the first humidity sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstHumidity()
{
    return YHumidity.FirstHumidity();
}

//--- (end of Humidity functions)
