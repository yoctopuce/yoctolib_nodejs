/*********************************************************************
 *
 * $Id: yocto_lightsensor.js 13045 2013-10-09 20:11:49Z mvuilleu $
 *
 * Implements yFindLightSensor(), the high-level API for LightSensor functions
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
//--- (YLightSensor definitions)
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_UNIT_INVALID                  = "!INVALID!";
var Y_CURRENTVALUE_INVALID          = -Number.MAX_VALUE;
var Y_LOWESTVALUE_INVALID           = -Number.MAX_VALUE;
var Y_HIGHESTVALUE_INVALID          = -Number.MAX_VALUE;
var Y_CURRENTRAWVALUE_INVALID       = -Number.MAX_VALUE;
var Y_CALIBRATIONPARAM_INVALID      = "!INVALID!";
var Y_RESOLUTION_INVALID            = -Number.MAX_VALUE;
//--- (end of YLightSensor definitions)

/**
 * YLightSensor Class: LightSensor function interface
 * 
 * The Yoctopuce application programming interface allows you to read an instant
 * measure of the sensor, as well as the minimal and maximal values observed.
 */
var YLightSensor; // definition below
(function()
{
    //--- (YLightSensor implementation)

    /**
     * Returns the logical name of the light sensor.
     * 
     * @return a string corresponding to the logical name of the light sensor
     * 
     * On failure, throws an exception or returns YLightSensor.LOGICALNAME_INVALID.
     */
    function YLightSensor_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the light sensor.
     * 
     * @return a string corresponding to the logical name of the light sensor
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YLightSensor_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the light sensor. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the light sensor
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YLightSensor_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the light sensor (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the light sensor (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YLightSensor.ADVERTISEDVALUE_INVALID.
     */
    function YLightSensor_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the light sensor (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the light sensor (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YLightSensor_get_advertisedValue_async(func_callback, obj_context)
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
     * On failure, throws an exception or returns YLightSensor.UNIT_INVALID.
     */
    function YLightSensor_get_unit()
    {   var json_val = this._getFixedAttr('unit');
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
    function YLightSensor_get_unit_async(func_callback, obj_context)
    {   this._getAttr_async('unit',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_UNIT_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YLightSensor_set_currentValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('currentValue',rest_val);
    }

    /**
     * Returns the current measured value.
     * 
     * @return a floating point number corresponding to the current measured value
     * 
     * On failure, throws an exception or returns YLightSensor.CURRENTVALUE_INVALID.
     */
    function YLightSensor_get_currentValue()
    {   if(YAPI.applyCalibration) {
            var res = YAPI.applyCalibration(this);
            if(res != Y_CURRENTVALUE_INVALID) {
                var resol = this.get_resolution();
                res = Math.round(res / resol) * resol;
                return res;
            }
        }
        var json_val = this._getAttr('currentValue');
        return (json_val == null ? Y_CURRENTVALUE_INVALID : Math.round(json_val/6553.6) / 10);
    }

    /**
     * Returns the current measured value.
     * 
     * @return a floating point number corresponding to the current measured value
     * 
     * On failure, throws an exception or returns Y_CURRENTVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YLightSensor_get_currentValue_async(func_callback, obj_context)
    {   this._getAttr_async('currentValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CURRENTVALUE_INVALID : Math.round(json_val/6553.6) / 10);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the sensor-specific calibration parameter so that the current value
     * matches a desired target (linear scaling).
     * 
     * @param calibratedVal : the desired target value.
     * 
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YLightSensor_calibrate(float_calibratedVal)
    {   var rest_val;
        rest_val = String(Math.round(float_calibratedVal*65536.0));
        return this._setAttr('currentValue',rest_val);
    }

    /**
     * Changes the recorded minimal value observed.
     * 
     * @param newval : a floating point number corresponding to the recorded minimal value observed
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YLightSensor_set_lowestValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('lowestValue',rest_val);
    }

    /**
     * Returns the minimal value observed.
     * 
     * @return a floating point number corresponding to the minimal value observed
     * 
     * On failure, throws an exception or returns YLightSensor.LOWESTVALUE_INVALID.
     */
    function YLightSensor_get_lowestValue()
    {   var json_val = this._getAttr('lowestValue');
        return (json_val == null ? Y_LOWESTVALUE_INVALID : Math.round(json_val/6553.6) / 10);
    }

    /**
     * Returns the minimal value observed.
     * 
     * @return a floating point number corresponding to the minimal value observed
     * 
     * On failure, throws an exception or returns Y_LOWESTVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YLightSensor_get_lowestValue_async(func_callback, obj_context)
    {   this._getAttr_async('lowestValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOWESTVALUE_INVALID : Math.round(json_val/6553.6) / 10);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the recorded maximal value observed.
     * 
     * @param newval : a floating point number corresponding to the recorded maximal value observed
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YLightSensor_set_highestValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('highestValue',rest_val);
    }

    /**
     * Returns the maximal value observed.
     * 
     * @return a floating point number corresponding to the maximal value observed
     * 
     * On failure, throws an exception or returns YLightSensor.HIGHESTVALUE_INVALID.
     */
    function YLightSensor_get_highestValue()
    {   var json_val = this._getAttr('highestValue');
        return (json_val == null ? Y_HIGHESTVALUE_INVALID : Math.round(json_val/6553.6) / 10);
    }

    /**
     * Returns the maximal value observed.
     * 
     * @return a floating point number corresponding to the maximal value observed
     * 
     * On failure, throws an exception or returns Y_HIGHESTVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YLightSensor_get_highestValue_async(func_callback, obj_context)
    {   this._getAttr_async('highestValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_HIGHESTVALUE_INVALID : Math.round(json_val/6553.6) / 10);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the unrounded and uncalibrated raw value returned by the sensor.
     * 
     * @return a floating point number corresponding to the unrounded and uncalibrated raw value returned by the sensor
     * 
     * On failure, throws an exception or returns YLightSensor.CURRENTRAWVALUE_INVALID.
     */
    function YLightSensor_get_currentRawValue()
    {   var json_val = this._getAttr('currentRawValue');
        return (json_val == null ? Y_CURRENTRAWVALUE_INVALID : json_val/65536.0);
    }

    /**
     * Returns the unrounded and uncalibrated raw value returned by the sensor.
     * 
     * @return a floating point number corresponding to the unrounded and uncalibrated raw value returned by the sensor
     * 
     * On failure, throws an exception or returns Y_CURRENTRAWVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YLightSensor_get_currentRawValue_async(func_callback, obj_context)
    {   this._getAttr_async('currentRawValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CURRENTRAWVALUE_INVALID : json_val/65536.0);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YLightSensor_get_calibrationParam()
    {   var json_val = this._getAttr('calibrationParam');
        return (json_val == null ? Y_CALIBRATIONPARAM_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YLightSensor_get_calibrationParam_async(func_callback, obj_context)
    {   this._getAttr_async('calibrationParam',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALIBRATIONPARAM_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YLightSensor_set_calibrationParam(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('calibrationParam',rest_val);
    }

    /**
     * Configures error correction data points, in particular to compensate for
     * a possible perturbation of the measure caused by an enclosure. It is possible
     * to configure up to five correction points. Correction points must be provided
     * in ascending order, and be in the range of the sensor. The device will automatically
     * perform a linear interpolation of the error correction between specified
     * points. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * For more information on advanced capabilities to refine the calibration of
     * sensors, please contact support@yoctopuce.com.
     * 
     * @param rawValues : array of floating point numbers, corresponding to the raw
     *         values returned by the sensor for the correction points.
     * @param refValues : array of floating point numbers, corresponding to the corrected
     *         values for the correction points.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YLightSensor_calibrateFromPoints(floatArr_rawValues,floatArr_refValues)
    {   var rest_val;
        rest_val = this._encodeCalibrationPoints(floatArr_rawValues,floatArr_refValues);
        return this._setAttr('calibrationParam',rest_val);
    }

    function YLightSensor_loadCalibrationPoints(floatArrRef_rawValues,floatArrRef_refValues)
    {
        return this._decodeCalibrationPoints(floatArrRef_rawValues,floatArrRef_refValues);
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * 
     * @return a floating point number corresponding to the resolution of the measured values
     * 
     * On failure, throws an exception or returns YLightSensor.RESOLUTION_INVALID.
     */
    function YLightSensor_get_resolution()
    {   var json_val = this._getAttr('resolution');
        return (json_val == null ? Y_RESOLUTION_INVALID : (json_val > 100 ? 1.0 / Math.round(65536.0/json_val) : 0.001 / Math.round(67.0/json_val)));
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * 
     * @return a floating point number corresponding to the resolution of the measured values
     * 
     * On failure, throws an exception or returns Y_RESOLUTION_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YLightSensor_get_resolution_async(func_callback, obj_context)
    {   this._getAttr_async('resolution',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RESOLUTION_INVALID : (json_val > 100 ? 1.0 / Math.round(65536.0/json_val) : 0.001 / Math.round(67.0/json_val)));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Continues the enumeration of light sensors started using yFirstLightSensor().
     * 
     * @return a pointer to a YLightSensor object, corresponding to
     *         a light sensor currently online, or a null pointer
     *         if there are no more light sensors to enumerate.
     */
    function YLightSensor_nextLightSensor()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YLightSensor.FindLightSensor(next_hwid);
    }

    /**
     * Retrieves a light sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the light sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLightSensor.isOnline() to test if the light sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a light sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the light sensor
     * 
     * @return a YLightSensor object allowing you to drive the light sensor.
     */
    function YLightSensor_FindLightSensor(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('LightSensor', str_func);
        if(obj_func) return obj_func;
        return new YLightSensor(str_func);
    }

    /**
     * Starts the enumeration of light sensors currently accessible.
     * Use the method YLightSensor.nextLightSensor() to iterate on
     * next light sensors.
     * 
     * @return a pointer to a YLightSensor object, corresponding to
     *         the first light sensor currently online, or a null pointer
     *         if there are none.
     */
    function YLightSensor_FirstLightSensor()
    {
        var next_hwid = YAPI.getFirstHardwareId('LightSensor');
        if(next_hwid == null) return null;
        return YLightSensor.FindLightSensor(next_hwid);
    }

    //--- (end of YLightSensor implementation)

    function _YLightSensor(str_func)
    {
        //--- (YLightSensor constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'LightSensor', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.UNIT_INVALID                    = "!INVALID!";
        this.CURRENTVALUE_INVALID            = -Number.MAX_VALUE;
        this.LOWESTVALUE_INVALID             = -Number.MAX_VALUE;
        this.HIGHESTVALUE_INVALID            = -Number.MAX_VALUE;
        this.CURRENTRAWVALUE_INVALID         = -Number.MAX_VALUE;
        this.CALIBRATIONPARAM_INVALID        = "!INVALID!";
        this.RESOLUTION_INVALID              = -Number.MAX_VALUE;
        this._calibrationOffset              = 0;
        this.get_logicalName                 = YLightSensor_get_logicalName;
        this.logicalName                     = YLightSensor_get_logicalName;
        this.get_logicalName_async           = YLightSensor_get_logicalName_async;
        this.logicalName_async               = YLightSensor_get_logicalName_async;
        this.set_logicalName                 = YLightSensor_set_logicalName;
        this.setLogicalName                  = YLightSensor_set_logicalName;
        this.get_advertisedValue             = YLightSensor_get_advertisedValue;
        this.advertisedValue                 = YLightSensor_get_advertisedValue;
        this.get_advertisedValue_async       = YLightSensor_get_advertisedValue_async;
        this.advertisedValue_async           = YLightSensor_get_advertisedValue_async;
        this.get_unit                        = YLightSensor_get_unit;
        this.unit                            = YLightSensor_get_unit;
        this.get_unit_async                  = YLightSensor_get_unit_async;
        this.unit_async                      = YLightSensor_get_unit_async;
        this.set_currentValue                = YLightSensor_set_currentValue;
        this.setCurrentValue                 = YLightSensor_set_currentValue;
        this.get_currentValue                = YLightSensor_get_currentValue;
        this.currentValue                    = YLightSensor_get_currentValue;
        this.get_currentValue_async          = YLightSensor_get_currentValue_async;
        this.currentValue_async              = YLightSensor_get_currentValue_async;
        this.calibrate                       = YLightSensor_calibrate;
        this.set_lowestValue                 = YLightSensor_set_lowestValue;
        this.setLowestValue                  = YLightSensor_set_lowestValue;
        this.get_lowestValue                 = YLightSensor_get_lowestValue;
        this.lowestValue                     = YLightSensor_get_lowestValue;
        this.get_lowestValue_async           = YLightSensor_get_lowestValue_async;
        this.lowestValue_async               = YLightSensor_get_lowestValue_async;
        this.set_highestValue                = YLightSensor_set_highestValue;
        this.setHighestValue                 = YLightSensor_set_highestValue;
        this.get_highestValue                = YLightSensor_get_highestValue;
        this.highestValue                    = YLightSensor_get_highestValue;
        this.get_highestValue_async          = YLightSensor_get_highestValue_async;
        this.highestValue_async              = YLightSensor_get_highestValue_async;
        this.get_currentRawValue             = YLightSensor_get_currentRawValue;
        this.currentRawValue                 = YLightSensor_get_currentRawValue;
        this.get_currentRawValue_async       = YLightSensor_get_currentRawValue_async;
        this.currentRawValue_async           = YLightSensor_get_currentRawValue_async;
        this.get_calibrationParam            = YLightSensor_get_calibrationParam;
        this.calibrationParam                = YLightSensor_get_calibrationParam;
        this.get_calibrationParam_async      = YLightSensor_get_calibrationParam_async;
        this.calibrationParam_async          = YLightSensor_get_calibrationParam_async;
        this.set_calibrationParam            = YLightSensor_set_calibrationParam;
        this.setCalibrationParam             = YLightSensor_set_calibrationParam;
        this.calibrateFromPoints             = YLightSensor_calibrateFromPoints;
        this.loadCalibrationPoints           = YLightSensor_loadCalibrationPoints;
        this.get_resolution                  = YLightSensor_get_resolution;
        this.resolution                      = YLightSensor_get_resolution;
        this.get_resolution_async            = YLightSensor_get_resolution_async;
        this.resolution_async                = YLightSensor_get_resolution_async;
        this.nextLightSensor                 = YLightSensor_nextLightSensor;
        //--- (end of YLightSensor constructor)
    }

    YLightSensor = _YLightSensor;
    YLightSensor.FindLightSensor  = YLightSensor_FindLightSensor;
    YLightSensor.FirstLightSensor = YLightSensor_FirstLightSensor;
})();

//--- (LightSensor functions)

/**
 * Retrieves a light sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the light sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YLightSensor.isOnline() to test if the light sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a light sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the light sensor
 * 
 * @return a YLightSensor object allowing you to drive the light sensor.
 */
function yFindLightSensor(str_func)
{
    return YLightSensor.FindLightSensor(str_func);
}

/**
 * Starts the enumeration of light sensors currently accessible.
 * Use the method YLightSensor.nextLightSensor() to iterate on
 * next light sensors.
 * 
 * @return a pointer to a YLightSensor object, corresponding to
 *         the first light sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstLightSensor()
{
    return YLightSensor.FirstLightSensor();
}

//--- (end of LightSensor functions)
