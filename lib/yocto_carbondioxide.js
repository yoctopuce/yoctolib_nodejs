/*********************************************************************
 *
 * $Id: yocto_carbondioxide.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements the high-level API for CarbonDioxide functions
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

//--- (YCarbonDioxide return codes)
//--- (end of YCarbonDioxide return codes)
//--- (YCarbonDioxide definitions)
//--- (end of YCarbonDioxide definitions)

//--- (YCarbonDioxide class start)
/**
 * YCarbonDioxide Class: CarbonDioxide function interface
 * 
 * The Yoctopuce application programming interface allows you to read an instant
 * measure of the sensor, as well as the minimal and maximal values observed.
 */
//--- (end of YCarbonDioxide class start)

var YCarbonDioxide; // definition below
(function()
{
    function _YCarbonDioxide(str_func)
    {
        //--- (YCarbonDioxide constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'CarbonDioxide';

        //--- (end of YCarbonDioxide constructor)
    }

    //--- (YCarbonDioxide implementation)

    /**
     * Retrieves a CO2 sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the CO2 sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCarbonDioxide.isOnline() to test if the CO2 sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a CO2 sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the CO2 sensor
     * 
     * @return a YCarbonDioxide object allowing you to drive the CO2 sensor.
     */
    function YCarbonDioxide_FindCarbonDioxide(func)             // class method
    {
        var obj;                    // YCarbonDioxide;
        obj = YFunction._FindFromCache("CarbonDioxide", func);
        if (obj == null) {
            obj = new YCarbonDioxide(func);
            YFunction._AddToCache("CarbonDioxide", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of CO2 sensors started using yFirstCarbonDioxide().
     * 
     * @return a pointer to a YCarbonDioxide object, corresponding to
     *         a CO2 sensor currently online, or a null pointer
     *         if there are no more CO2 sensors to enumerate.
     */
    function YCarbonDioxide_nextCarbonDioxide()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YCarbonDioxide.FindCarbonDioxide(next_hwid);
    }

    /**
     * Starts the enumeration of CO2 sensors currently accessible.
     * Use the method YCarbonDioxide.nextCarbonDioxide() to iterate on
     * next CO2 sensors.
     * 
     * @return a pointer to a YCarbonDioxide object, corresponding to
     *         the first CO2 sensor currently online, or a null pointer
     *         if there are none.
     */
    function YCarbonDioxide_FirstCarbonDioxide()
    {
        var next_hwid = YAPI.getFirstHardwareId('CarbonDioxide');
        if(next_hwid == null) return null;
        return YCarbonDioxide.FindCarbonDioxide(next_hwid);
    }

    //--- (end of YCarbonDioxide implementation)

    //--- (YCarbonDioxide initialization)
    YCarbonDioxide = YSensor._Subclass(_YCarbonDioxide, {
    }, {
        // Class methods
        FindCarbonDioxide           : YCarbonDioxide_FindCarbonDioxide,
        FirstCarbonDioxide          : YCarbonDioxide_FirstCarbonDioxide
    }, {
        // Methods
        nextCarbonDioxide           : YCarbonDioxide_nextCarbonDioxide
    });
    //--- (end of YCarbonDioxide initialization)
})();

//--- (CarbonDioxide functions)

/**
 * Retrieves a CO2 sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the CO2 sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YCarbonDioxide.isOnline() to test if the CO2 sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a CO2 sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the CO2 sensor
 * 
 * @return a YCarbonDioxide object allowing you to drive the CO2 sensor.
 */
function yFindCarbonDioxide(func)
{
    return YCarbonDioxide.FindCarbonDioxide(func);
}

/**
 * Starts the enumeration of CO2 sensors currently accessible.
 * Use the method YCarbonDioxide.nextCarbonDioxide() to iterate on
 * next CO2 sensors.
 * 
 * @return a pointer to a YCarbonDioxide object, corresponding to
 *         the first CO2 sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstCarbonDioxide()
{
    return YCarbonDioxide.FirstCarbonDioxide();
}

//--- (end of CarbonDioxide functions)
