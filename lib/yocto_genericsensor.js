/*********************************************************************
 *
 * $Id: pic24config.php 13012 2013-10-07 13:56:46Z mvuilleu $
 *
 * Implements yFindGenericSensor(), the high-level API for GenericSensor functions
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
//--- (YGenericSensor definitions)
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_UNIT_INVALID                  = "!INVALID!";
var Y_CURRENTVALUE_INVALID          = -Number.MAX_VALUE;
var Y_LOWESTVALUE_INVALID           = -Number.MAX_VALUE;
var Y_HIGHESTVALUE_INVALID          = -Number.MAX_VALUE;
var Y_CURRENTRAWVALUE_INVALID       = -Number.MAX_VALUE;
var Y_CALIBRATIONPARAM_INVALID      = "!INVALID!";
var Y_SIGNALVALUE_INVALID           = -Number.MAX_VALUE;
var Y_SIGNALUNIT_INVALID            = "!INVALID!";
var Y_SIGNALRANGE_INVALID           = "!INVALID!";
var Y_VALUERANGE_INVALID            = "!INVALID!";
var Y_RESOLUTION_INVALID            = -Number.MAX_VALUE;
//--- (end of YGenericSensor definitions)

/**
 * YGenericSensor Class: GenericSensor function interface
 * 
 * 
 */
var YGenericSensor; // definition below
(function()
{
    //--- (YGenericSensor implementation)

    /**
     * Returns the logical name of the generic sensor.
     * 
     * @return a string corresponding to the logical name of the generic sensor
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YGenericSensor_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the generic sensor.
     * 
     * @return a string corresponding to the logical name of the generic sensor
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current value of the generic sensor (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the generic sensor (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YGenericSensor_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the generic sensor (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the generic sensor (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the measuring unit for the measured value.
     * 
     * @return a string corresponding to the measuring unit for the measured value
     * 
     * On failure, throws an exception or returns Y_UNIT_INVALID.
     */
    function YGenericSensor_get_unit()
    {   var json_val = this._getAttr('unit');
        return (json_val == null ? Y_UNIT_INVALID : json_val);
    }

    /**
     * Returns the measuring unit for the measured value.
     * 
     * @return a string corresponding to the measuring unit for the measured value
     * 
     * On failure, throws an exception or returns Y_UNIT_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_unit_async(func_callback, obj_context)
    {   this._getAttr_async('unit',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_UNIT_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current measured value.
     * 
     * @return a floating point number corresponding to the current measured value
     * 
     * On failure, throws an exception or returns Y_CURRENTVALUE_INVALID.
     */
    function YGenericSensor_get_currentValue()
    {   if(YAPI.applyCalibration) {
            var res = YAPI.applyCalibration(this);
            if(res != Y_CURRENTVALUE_INVALID) {
                var resol = this.get_resolution();
                res = Math.round(res / resol) * resol;
                return res;
            }
        }
        var json_val = this._getAttr('currentValue');
        return (json_val == null ? Y_CURRENTVALUE_INVALID : Math.round(json_val/65.536) / 1000);
    }

    /**
     * Returns the current measured value.
     * 
     * @return a floating point number corresponding to the current measured value
     * 
     * On failure, throws an exception or returns Y_CURRENTVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_currentValue_async(func_callback, obj_context)
    {   this._getAttr_async('currentValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CURRENTVALUE_INVALID : Math.round(json_val/65.536) / 1000);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the minimal value observed.
     * 
     * @return a floating point number corresponding to the minimal value observed
     * 
     * On failure, throws an exception or returns Y_LOWESTVALUE_INVALID.
     */
    function YGenericSensor_get_lowestValue()
    {   var json_val = this._getAttr('lowestValue');
        return (json_val == null ? Y_LOWESTVALUE_INVALID : Math.round(json_val/65.536) / 1000);
    }

    /**
     * Returns the minimal value observed.
     * 
     * @return a floating point number corresponding to the minimal value observed
     * 
     * On failure, throws an exception or returns Y_LOWESTVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_lowestValue_async(func_callback, obj_context)
    {   this._getAttr_async('lowestValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOWESTVALUE_INVALID : Math.round(json_val/65.536) / 1000);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the maximal value observed.
     * 
     * @return a floating point number corresponding to the maximal value observed
     * 
     * On failure, throws an exception or returns Y_HIGHESTVALUE_INVALID.
     */
    function YGenericSensor_get_highestValue()
    {   var json_val = this._getAttr('highestValue');
        return (json_val == null ? Y_HIGHESTVALUE_INVALID : Math.round(json_val/65.536) / 1000);
    }

    /**
     * Returns the maximal value observed.
     * 
     * @return a floating point number corresponding to the maximal value observed
     * 
     * On failure, throws an exception or returns Y_HIGHESTVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_highestValue_async(func_callback, obj_context)
    {   this._getAttr_async('highestValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_HIGHESTVALUE_INVALID : Math.round(json_val/65.536) / 1000);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the uncalibrated, unrounded raw value returned by the sensor.
     * 
     * @return a floating point number corresponding to the uncalibrated, unrounded raw value returned by the sensor
     * 
     * On failure, throws an exception or returns Y_CURRENTRAWVALUE_INVALID.
     */
    function YGenericSensor_get_currentRawValue()
    {   var json_val = this._getAttr('currentRawValue');
        return (json_val == null ? Y_CURRENTRAWVALUE_INVALID : json_val/65536.0);
    }

    /**
     * Returns the uncalibrated, unrounded raw value returned by the sensor.
     * 
     * @return a floating point number corresponding to the uncalibrated, unrounded raw value returned by the sensor
     * 
     * On failure, throws an exception or returns Y_CURRENTRAWVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_currentRawValue_async(func_callback, obj_context)
    {   this._getAttr_async('currentRawValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CURRENTRAWVALUE_INVALID : json_val/65536.0);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YGenericSensor_get_calibrationParam()
    {   var json_val = this._getAttr('calibrationParam');
        return (json_val == null ? Y_CALIBRATIONPARAM_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_calibrationParam_async(func_callback, obj_context)
    {   this._getAttr_async('calibrationParam',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALIBRATIONPARAM_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the measured value of the electrical signal used by the sensor.
     * 
     * @return a floating point number corresponding to the measured value of the electrical signal used by the sensor
     * 
     * On failure, throws an exception or returns Y_SIGNALVALUE_INVALID.
     */
    function YGenericSensor_get_signalValue()
    {   var json_val = this._getAttr('signalValue');
        return (json_val == null ? Y_SIGNALVALUE_INVALID : Math.round(json_val/65.536) / 1000);
    }

    /**
     * Returns the measured value of the electrical signal used by the sensor.
     * 
     * @return a floating point number corresponding to the measured value of the electrical signal used by the sensor
     * 
     * On failure, throws an exception or returns Y_SIGNALVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_signalValue_async(func_callback, obj_context)
    {   this._getAttr_async('signalValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SIGNALVALUE_INVALID : Math.round(json_val/65.536) / 1000);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     * 
     * @return a string corresponding to the measuring unit of the electrical signal used by the sensor
     * 
     * On failure, throws an exception or returns Y_SIGNALUNIT_INVALID.
     */
    function YGenericSensor_get_signalUnit()
    {   var json_val = this._getFixedAttr('signalUnit');
        return (json_val == null ? Y_SIGNALUNIT_INVALID : json_val);
    }

    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     * 
     * @return a string corresponding to the measuring unit of the electrical signal used by the sensor
     * 
     * On failure, throws an exception or returns Y_SIGNALUNIT_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_signalUnit_async(func_callback, obj_context)
    {   this._getAttr_async('signalUnit',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SIGNALUNIT_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the electric signal range used by the sensor.
     * 
     * @return a string corresponding to the electric signal range used by the sensor
     * 
     * On failure, throws an exception or returns Y_SIGNALRANGE_INVALID.
     */
    function YGenericSensor_get_signalRange()
    {   var json_val = this._getAttr('signalRange');
        return (json_val == null ? Y_SIGNALRANGE_INVALID : json_val);
    }

    /**
     * Returns the electric signal range used by the sensor.
     * 
     * @return a string corresponding to the electric signal range used by the sensor
     * 
     * On failure, throws an exception or returns Y_SIGNALRANGE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_signalRange_async(func_callback, obj_context)
    {   this._getAttr_async('signalRange',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SIGNALRANGE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the physical value range measured by the sensor.
     * 
     * @return a string corresponding to the physical value range measured by the sensor
     * 
     * On failure, throws an exception or returns Y_VALUERANGE_INVALID.
     */
    function YGenericSensor_get_valueRange()
    {   var json_val = this._getAttr('valueRange');
        return (json_val == null ? Y_VALUERANGE_INVALID : json_val);
    }

    /**
     * Returns the physical value range measured by the sensor.
     * 
     * @return a string corresponding to the physical value range measured by the sensor
     * 
     * On failure, throws an exception or returns Y_VALUERANGE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_valueRange_async(func_callback, obj_context)
    {   this._getAttr_async('valueRange',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_VALUERANGE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the values, which is not always the same as the actual precision of the sensor.
     * 
     * @return a floating point number corresponding to the resolution of the measured values
     * 
     * On failure, throws an exception or returns Y_RESOLUTION_INVALID.
     */
    function YGenericSensor_get_resolution()
    {   var json_val = this._getAttr('resolution');
        return (json_val == null ? Y_RESOLUTION_INVALID : (json_val > 100 ? 1.0 / Math.round(65536.0/json_val) : 0.001 / Math.round(67.0/json_val)));
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the values, which is not always the same as the actual precision of the sensor.
     * 
     * @return a floating point number corresponding to the resolution of the measured values
     * 
     * On failure, throws an exception or returns Y_RESOLUTION_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YGenericSensor_get_resolution_async(func_callback, obj_context)
    {   this._getAttr_async('resolution',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RESOLUTION_INVALID : (json_val > 100 ? 1.0 / Math.round(65536.0/json_val) : 0.001 / Math.round(67.0/json_val)));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Continues the enumeration of generic sensors started using yFirstGenericSensor().
     * 
     * @return a pointer to a YGenericSensor object, corresponding to
     *         a generic sensor currently online, or a null pointer
     *         if there are no more generic sensors to enumerate.
     */
    function YGenericSensor_nextGenericSensor()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YGenericSensor.FindGenericSensor(next_hwid);
    }

    /**
     * Retrieves a generic sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the generic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGenericSensor.isOnline() to test if the generic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a generic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the generic sensor
     * 
     * @return a YGenericSensor object allowing you to drive the generic sensor.
     */
    function YGenericSensor_FindGenericSensor(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('GenericSensor', str_func);
        if(obj_func) return obj_func;
        return new YGenericSensor(str_func);
    }

    /**
     * Starts the enumeration of generic sensors currently accessible.
     * Use the method YGenericSensor.nextGenericSensor() to iterate on
     * next generic sensors.
     * 
     * @return a pointer to a YGenericSensor object, corresponding to
     *         the first generic sensor currently online, or a null pointer
     *         if there are none.
     */
    function YGenericSensor_FirstGenericSensor()
    {
        var next_hwid = YAPI.getFirstHardwareId('GenericSensor');
        if(next_hwid == null) return null;
        return YGenericSensor.FindGenericSensor(next_hwid);
    }

    //--- (end of YGenericSensor implementation)

    function _YGenericSensor(str_func)
    {
        //--- (YGenericSensor constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'GenericSensor', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.UNIT_INVALID                    = "!INVALID!";
        this.CURRENTVALUE_INVALID            = -Number.MAX_VALUE;
        this.LOWESTVALUE_INVALID             = -Number.MAX_VALUE;
        this.HIGHESTVALUE_INVALID            = -Number.MAX_VALUE;
        this.CURRENTRAWVALUE_INVALID         = -Number.MAX_VALUE;
        this.CALIBRATIONPARAM_INVALID        = "!INVALID!";
        this.SIGNALVALUE_INVALID             = -Number.MAX_VALUE;
        this.SIGNALUNIT_INVALID              = "!INVALID!";
        this.SIGNALRANGE_INVALID             = "!INVALID!";
        this.VALUERANGE_INVALID              = "!INVALID!";
        this.RESOLUTION_INVALID              = -Number.MAX_VALUE;
        this._calibrationOffset              = 0;
        this.get_logicalName                 = YGenericSensor_get_logicalName;
        this.logicalName                     = YGenericSensor_get_logicalName;
        this.get_logicalName_async           = YGenericSensor_get_logicalName_async;
        this.logicalName_async               = YGenericSensor_get_logicalName_async;
        this.get_advertisedValue             = YGenericSensor_get_advertisedValue;
        this.advertisedValue                 = YGenericSensor_get_advertisedValue;
        this.get_advertisedValue_async       = YGenericSensor_get_advertisedValue_async;
        this.advertisedValue_async           = YGenericSensor_get_advertisedValue_async;
        this.get_unit                        = YGenericSensor_get_unit;
        this.unit                            = YGenericSensor_get_unit;
        this.get_unit_async                  = YGenericSensor_get_unit_async;
        this.unit_async                      = YGenericSensor_get_unit_async;
        this.get_currentValue                = YGenericSensor_get_currentValue;
        this.currentValue                    = YGenericSensor_get_currentValue;
        this.get_currentValue_async          = YGenericSensor_get_currentValue_async;
        this.currentValue_async              = YGenericSensor_get_currentValue_async;
        this.get_lowestValue                 = YGenericSensor_get_lowestValue;
        this.lowestValue                     = YGenericSensor_get_lowestValue;
        this.get_lowestValue_async           = YGenericSensor_get_lowestValue_async;
        this.lowestValue_async               = YGenericSensor_get_lowestValue_async;
        this.get_highestValue                = YGenericSensor_get_highestValue;
        this.highestValue                    = YGenericSensor_get_highestValue;
        this.get_highestValue_async          = YGenericSensor_get_highestValue_async;
        this.highestValue_async              = YGenericSensor_get_highestValue_async;
        this.get_currentRawValue             = YGenericSensor_get_currentRawValue;
        this.currentRawValue                 = YGenericSensor_get_currentRawValue;
        this.get_currentRawValue_async       = YGenericSensor_get_currentRawValue_async;
        this.currentRawValue_async           = YGenericSensor_get_currentRawValue_async;
        this.get_calibrationParam            = YGenericSensor_get_calibrationParam;
        this.calibrationParam                = YGenericSensor_get_calibrationParam;
        this.get_calibrationParam_async      = YGenericSensor_get_calibrationParam_async;
        this.calibrationParam_async          = YGenericSensor_get_calibrationParam_async;
        this.get_signalValue                 = YGenericSensor_get_signalValue;
        this.signalValue                     = YGenericSensor_get_signalValue;
        this.get_signalValue_async           = YGenericSensor_get_signalValue_async;
        this.signalValue_async               = YGenericSensor_get_signalValue_async;
        this.get_signalUnit                  = YGenericSensor_get_signalUnit;
        this.signalUnit                      = YGenericSensor_get_signalUnit;
        this.get_signalUnit_async            = YGenericSensor_get_signalUnit_async;
        this.signalUnit_async                = YGenericSensor_get_signalUnit_async;
        this.get_signalRange                 = YGenericSensor_get_signalRange;
        this.signalRange                     = YGenericSensor_get_signalRange;
        this.get_signalRange_async           = YGenericSensor_get_signalRange_async;
        this.signalRange_async               = YGenericSensor_get_signalRange_async;
        this.get_valueRange                  = YGenericSensor_get_valueRange;
        this.valueRange                      = YGenericSensor_get_valueRange;
        this.get_valueRange_async            = YGenericSensor_get_valueRange_async;
        this.valueRange_async                = YGenericSensor_get_valueRange_async;
        this.get_resolution                  = YGenericSensor_get_resolution;
        this.resolution                      = YGenericSensor_get_resolution;
        this.get_resolution_async            = YGenericSensor_get_resolution_async;
        this.resolution_async                = YGenericSensor_get_resolution_async;
        this.nextGenericSensor               = YGenericSensor_nextGenericSensor;
        //--- (end of YGenericSensor constructor)
    }

    YGenericSensor = _YGenericSensor;
    YGenericSensor.FindGenericSensor  = YGenericSensor_FindGenericSensor;
    YGenericSensor.FirstGenericSensor = YGenericSensor_FirstGenericSensor;
})();

//--- (GenericSensor functions)

/**
 * Retrieves a generic sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the generic sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YGenericSensor.isOnline() to test if the generic sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a generic sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the generic sensor
 * 
 * @return a YGenericSensor object allowing you to drive the generic sensor.
 */
function yFindGenericSensor(str_func)
{
    return YGenericSensor.FindGenericSensor(str_func);
}

/**
 * Starts the enumeration of generic sensors currently accessible.
 * Use the method YGenericSensor.nextGenericSensor() to iterate on
 * next generic sensors.
 * 
 * @return a pointer to a YGenericSensor object, corresponding to
 *         the first generic sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstGenericSensor()
{
    return YGenericSensor.FirstGenericSensor();
}

//--- (end of GenericSensor functions)
