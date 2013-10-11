/*********************************************************************
 *
 * $Id: yocto_power.js 13065 2013-10-10 16:04:55Z mvuilleu $
 *
 * Implements yFindPower(), the high-level API for Power functions
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
//--- (YPower definitions)
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_UNIT_INVALID                  = "!INVALID!";
var Y_CURRENTVALUE_INVALID          = -Number.MAX_VALUE;
var Y_LOWESTVALUE_INVALID           = -Number.MAX_VALUE;
var Y_HIGHESTVALUE_INVALID          = -Number.MAX_VALUE;
var Y_CURRENTRAWVALUE_INVALID       = -Number.MAX_VALUE;
var Y_CALIBRATIONPARAM_INVALID      = "!INVALID!";
var Y_RESOLUTION_INVALID            = -Number.MAX_VALUE;
var Y_COSPHI_INVALID                = -Number.MAX_VALUE;
var Y_METER_INVALID                 = -Number.MAX_VALUE;
var Y_METERTIMER_INVALID            = -1;
//--- (end of YPower definitions)

/**
 * YPower Class: Power function interface
 * 
 * The Yoctopuce application programming interface allows you to read an instant
 * measure of the sensor, as well as the minimal and maximal values observed.
 */
var YPower; // definition below
(function()
{
    //--- (YPower implementation)

    /**
     * Returns the logical name of the electrical power sensor.
     * 
     * @return a string corresponding to the logical name of the electrical power sensor
     * 
     * On failure, throws an exception or returns YPower.LOGICALNAME_INVALID.
     */
    function YPower_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Gets the logical name of the electrical power sensor.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a string corresponding to the logical name of the electrical power sens
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YPower_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the electrical power sensor. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the electrical power sensor
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPower_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the electrical power sensor (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the electrical power sensor (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YPower.ADVERTISEDVALUE_INVALID.
     */
    function YPower_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Gets the current value of the electrical power sensor (no more than 6 characters).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a string corresponding to the current value of the electrical power sensor (no more
     *         than 6 character
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YPower_get_advertisedValue_async(func_callback, obj_context)
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
     * On failure, throws an exception or returns YPower.UNIT_INVALID.
     */
    function YPower_get_unit()
    {   var json_val = this._getFixedAttr('unit');
        return (json_val == null ? Y_UNIT_INVALID : json_val);
    }

    /**
     * Gets the measuring unit for the measured value.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a string corresponding to the measuring unit for the measured val
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_UNIT_INVALID.
     */
    function YPower_get_unit_async(func_callback, obj_context)
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
     * On failure, throws an exception or returns YPower.CURRENTVALUE_INVALID.
     */
    function YPower_get_currentValue()
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
     * Gets the current measured value.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the current measured val
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_CURRENTVALUE_INVALID.
     */
    function YPower_get_currentValue_async(func_callback, obj_context)
    {   this._getAttr_async('currentValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CURRENTVALUE_INVALID : Math.round(json_val/65.536) / 1000);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
    function YPower_set_lowestValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('lowestValue',rest_val);
    }

    /**
     * Returns the minimal value observed.
     * 
     * @return a floating point number corresponding to the minimal value observed
     * 
     * On failure, throws an exception or returns YPower.LOWESTVALUE_INVALID.
     */
    function YPower_get_lowestValue()
    {   var json_val = this._getAttr('lowestValue');
        return (json_val == null ? Y_LOWESTVALUE_INVALID : Math.round(json_val/65.536) / 1000);
    }

    /**
     * Gets the minimal value observed.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the minimal value observ
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOWESTVALUE_INVALID.
     */
    function YPower_get_lowestValue_async(func_callback, obj_context)
    {   this._getAttr_async('lowestValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOWESTVALUE_INVALID : Math.round(json_val/65.536) / 1000);
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
    function YPower_set_highestValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('highestValue',rest_val);
    }

    /**
     * Returns the maximal value observed.
     * 
     * @return a floating point number corresponding to the maximal value observed
     * 
     * On failure, throws an exception or returns YPower.HIGHESTVALUE_INVALID.
     */
    function YPower_get_highestValue()
    {   var json_val = this._getAttr('highestValue');
        return (json_val == null ? Y_HIGHESTVALUE_INVALID : Math.round(json_val/65.536) / 1000);
    }

    /**
     * Gets the maximal value observed.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the maximal value observ
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_HIGHESTVALUE_INVALID.
     */
    function YPower_get_highestValue_async(func_callback, obj_context)
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
     * On failure, throws an exception or returns YPower.CURRENTRAWVALUE_INVALID.
     */
    function YPower_get_currentRawValue()
    {   var json_val = this._getAttr('currentRawValue');
        return (json_val == null ? Y_CURRENTRAWVALUE_INVALID : json_val/65536.0);
    }

    /**
     * Gets the uncalibrated, unrounded raw value returned by the sensor.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the uncalibrated, unrounded raw value returned by the sens
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_CURRENTRAWVALUE_INVALID.
     */
    function YPower_get_currentRawValue_async(func_callback, obj_context)
    {   this._getAttr_async('currentRawValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CURRENTRAWVALUE_INVALID : json_val/65536.0);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YPower_get_calibrationParam()
    {   var json_val = this._getAttr('calibrationParam');
        return (json_val == null ? Y_CALIBRATIONPARAM_INVALID : json_val);
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YPower_get_calibrationParam_async(func_callback, obj_context)
    {   this._getAttr_async('calibrationParam',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALIBRATIONPARAM_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YPower_set_calibrationParam(newval)
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
    function YPower_calibrateFromPoints(floatArr_rawValues,floatArr_refValues)
    {   var rest_val;
        rest_val = this._encodeCalibrationPoints(floatArr_rawValues,floatArr_refValues);
        return this._setAttr('calibrationParam',rest_val);
    }

    function YPower_loadCalibrationPoints(floatArrRef_rawValues,floatArrRef_refValues)
    {
        return this._decodeCalibrationPoints(floatArrRef_rawValues,floatArrRef_refValues);
    }

    /**
     * Changes the resolution of the measured values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     * 
     * @param newval : a floating point number corresponding to the resolution of the measured values
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YPower_set_resolution(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('resolution',rest_val);
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * 
     * @return a floating point number corresponding to the resolution of the measured values
     * 
     * On failure, throws an exception or returns YPower.RESOLUTION_INVALID.
     */
    function YPower_get_resolution()
    {   var json_val = this._getAttr('resolution');
        return (json_val == null ? Y_RESOLUTION_INVALID : (json_val > 100 ? 1.0 / Math.round(65536.0/json_val) : 0.001 / Math.round(67.0/json_val)));
    }

    /**
     * Gets the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the resolution of the measured valu
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_RESOLUTION_INVALID.
     */
    function YPower_get_resolution_async(func_callback, obj_context)
    {   this._getAttr_async('resolution',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RESOLUTION_INVALID : (json_val > 100 ? 1.0 / Math.round(65536.0/json_val) : 0.001 / Math.round(67.0/json_val)));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the power factor (the ratio between the real power consumed,
     * measured in W, and the apparent power provided, measured in VA).
     * 
     * @return a floating point number corresponding to the power factor (the ratio between the real power consumed,
     *         measured in W, and the apparent power provided, measured in VA)
     * 
     * On failure, throws an exception or returns YPower.COSPHI_INVALID.
     */
    function YPower_get_cosPhi()
    {   var json_val = this._getAttr('cosPhi');
        return (json_val == null ? Y_COSPHI_INVALID : Math.round(json_val/655.36) / 100);
    }

    /**
     * Gets the power factor (the ratio between the real power consumed,
     * measured in W, and the apparent power provided, measured in VA).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the power factor (the ratio between the real
     *         power consumed,
     *         measured in W, and the apparent power provided, measured in V
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_COSPHI_INVALID.
     */
    function YPower_get_cosPhi_async(func_callback, obj_context)
    {   this._getAttr_async('cosPhi',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_COSPHI_INVALID : Math.round(json_val/655.36) / 100);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YPower_set_meter(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('meter',rest_val);
    }

    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the power consumption over time.
     * Note that this counter is reset at each start of the device.
     * 
     * @return a floating point number corresponding to the energy counter, maintained by the wattmeter by
     * integrating the power consumption over time
     * 
     * On failure, throws an exception or returns YPower.METER_INVALID.
     */
    function YPower_get_meter()
    {   var json_val = this._getAttr('meter');
        return (json_val == null ? Y_METER_INVALID : Math.round(json_val/65.536) / 1000);
    }

    /**
     * Gets the energy counter, maintained by the wattmeter by integrating the power consumption over time.
     * Note that this counter is reset at each start of the device.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:a floating point number corresponding to the energy counter, maintained by the
     *         wattmeter by integrating the power consumption over ti
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_METER_INVALID.
     */
    function YPower_get_meter_async(func_callback, obj_context)
    {   this._getAttr_async('meter',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_METER_INVALID : Math.round(json_val/65.536) / 1000);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the elapsed time since last energy counter reset, in seconds.
     * 
     * @return an integer corresponding to the elapsed time since last energy counter reset, in seconds
     * 
     * On failure, throws an exception or returns YPower.METERTIMER_INVALID.
     */
    function YPower_get_meterTimer()
    {   var json_val = this._getAttr('meterTimer');
        return (json_val == null ? Y_METERTIMER_INVALID : parseInt(json_val));
    }

    /**
     * Gets the elapsed time since last energy counter reset, in seconds.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YPower object that invoked the callback
     *         - the result:an integer corresponding to the elapsed time since last energy counter reset, in secon
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_METERTIMER_INVALID.
     */
    function YPower_get_meterTimer_async(func_callback, obj_context)
    {   this._getAttr_async('meterTimer',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_METERTIMER_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Continues the enumeration of electrical power sensors started using yFirstPower().
     * 
     * @return a pointer to a YPower object, corresponding to
     *         a electrical power sensor currently online, or a null pointer
     *         if there are no more electrical power sensors to enumerate.
     */
    function YPower_nextPower()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YPower.FindPower(next_hwid);
    }

    /**
     * Retrieves a electrical power sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the electrical power sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPower.isOnline() to test if the electrical power sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a electrical power sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the electrical power sensor
     * 
     * @return a YPower object allowing you to drive the electrical power sensor.
     */
    function YPower_FindPower(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Power', str_func);
        if(obj_func) return obj_func;
        return new YPower(str_func);
    }

    /**
     * Starts the enumeration of electrical power sensors currently accessible.
     * Use the method YPower.nextPower() to iterate on
     * next electrical power sensors.
     * 
     * @return a pointer to a YPower object, corresponding to
     *         the first electrical power sensor currently online, or a null pointer
     *         if there are none.
     */
    function YPower_FirstPower()
    {
        var next_hwid = YAPI.getFirstHardwareId('Power');
        if(next_hwid == null) return null;
        return YPower.FindPower(next_hwid);
    }

    //--- (end of YPower implementation)

    function _YPower(str_func)
    {
        //--- (YPower constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Power', str_func);
        
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
        this.COSPHI_INVALID                  = -Number.MAX_VALUE;
        this.METER_INVALID                   = -Number.MAX_VALUE;
        this.METERTIMER_INVALID              = -1;
        this._calibrationOffset              = -32767;
        this.get_logicalName                 = YPower_get_logicalName;
        this.logicalName                     = YPower_get_logicalName;
        this.get_logicalName_async           = YPower_get_logicalName_async;
        this.logicalName_async               = YPower_get_logicalName_async;
        this.set_logicalName                 = YPower_set_logicalName;
        this.setLogicalName                  = YPower_set_logicalName;
        this.get_advertisedValue             = YPower_get_advertisedValue;
        this.advertisedValue                 = YPower_get_advertisedValue;
        this.get_advertisedValue_async       = YPower_get_advertisedValue_async;
        this.advertisedValue_async           = YPower_get_advertisedValue_async;
        this.get_unit                        = YPower_get_unit;
        this.unit                            = YPower_get_unit;
        this.get_unit_async                  = YPower_get_unit_async;
        this.unit_async                      = YPower_get_unit_async;
        this.get_currentValue                = YPower_get_currentValue;
        this.currentValue                    = YPower_get_currentValue;
        this.get_currentValue_async          = YPower_get_currentValue_async;
        this.currentValue_async              = YPower_get_currentValue_async;
        this.set_lowestValue                 = YPower_set_lowestValue;
        this.setLowestValue                  = YPower_set_lowestValue;
        this.get_lowestValue                 = YPower_get_lowestValue;
        this.lowestValue                     = YPower_get_lowestValue;
        this.get_lowestValue_async           = YPower_get_lowestValue_async;
        this.lowestValue_async               = YPower_get_lowestValue_async;
        this.set_highestValue                = YPower_set_highestValue;
        this.setHighestValue                 = YPower_set_highestValue;
        this.get_highestValue                = YPower_get_highestValue;
        this.highestValue                    = YPower_get_highestValue;
        this.get_highestValue_async          = YPower_get_highestValue_async;
        this.highestValue_async              = YPower_get_highestValue_async;
        this.get_currentRawValue             = YPower_get_currentRawValue;
        this.currentRawValue                 = YPower_get_currentRawValue;
        this.get_currentRawValue_async       = YPower_get_currentRawValue_async;
        this.currentRawValue_async           = YPower_get_currentRawValue_async;
        this.get_calibrationParam            = YPower_get_calibrationParam;
        this.calibrationParam                = YPower_get_calibrationParam;
        this.get_calibrationParam_async      = YPower_get_calibrationParam_async;
        this.calibrationParam_async          = YPower_get_calibrationParam_async;
        this.set_calibrationParam            = YPower_set_calibrationParam;
        this.setCalibrationParam             = YPower_set_calibrationParam;
        this.calibrateFromPoints             = YPower_calibrateFromPoints;
        this.loadCalibrationPoints           = YPower_loadCalibrationPoints;
        this.set_resolution                  = YPower_set_resolution;
        this.setResolution                   = YPower_set_resolution;
        this.get_resolution                  = YPower_get_resolution;
        this.resolution                      = YPower_get_resolution;
        this.get_resolution_async            = YPower_get_resolution_async;
        this.resolution_async                = YPower_get_resolution_async;
        this.get_cosPhi                      = YPower_get_cosPhi;
        this.cosPhi                          = YPower_get_cosPhi;
        this.get_cosPhi_async                = YPower_get_cosPhi_async;
        this.cosPhi_async                    = YPower_get_cosPhi_async;
        this.set_meter                       = YPower_set_meter;
        this.setMeter                        = YPower_set_meter;
        this.get_meter                       = YPower_get_meter;
        this.meter                           = YPower_get_meter;
        this.get_meter_async                 = YPower_get_meter_async;
        this.meter_async                     = YPower_get_meter_async;
        this.get_meterTimer                  = YPower_get_meterTimer;
        this.meterTimer                      = YPower_get_meterTimer;
        this.get_meterTimer_async            = YPower_get_meterTimer_async;
        this.meterTimer_async                = YPower_get_meterTimer_async;
        this.nextPower                       = YPower_nextPower;
        //--- (end of YPower constructor)
    }

    YPower = _YPower;
    YPower.LOGICALNAME_INVALID             = "!INVALID!";
    YPower.ADVERTISEDVALUE_INVALID         = "!INVALID!";
    YPower.UNIT_INVALID                    = "!INVALID!";
    YPower.CURRENTVALUE_INVALID            = -Number.MAX_VALUE;
    YPower.LOWESTVALUE_INVALID             = -Number.MAX_VALUE;
    YPower.HIGHESTVALUE_INVALID            = -Number.MAX_VALUE;
    YPower.CURRENTRAWVALUE_INVALID         = -Number.MAX_VALUE;
    YPower.CALIBRATIONPARAM_INVALID        = "!INVALID!";
    YPower.RESOLUTION_INVALID              = -Number.MAX_VALUE;
    YPower.COSPHI_INVALID                  = -Number.MAX_VALUE;
    YPower.METER_INVALID                   = -Number.MAX_VALUE;
    YPower.METERTIMER_INVALID              = -1;
    YPower._calibrationOffset              = -32767;
    YPower.FindPower  = YPower_FindPower;
    YPower.FirstPower = YPower_FirstPower;
})();

//--- (Power functions)

/**
 * Retrieves a electrical power sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the electrical power sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPower.isOnline() to test if the electrical power sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a electrical power sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the electrical power sensor
 * 
 * @return a YPower object allowing you to drive the electrical power sensor.
 */
function yFindPower(str_func)
{
    return YPower.FindPower(str_func);
}

/**
 * Starts the enumeration of electrical power sensors currently accessible.
 * Use the method YPower.nextPower() to iterate on
 * next electrical power sensors.
 * 
 * @return a pointer to a YPower object, corresponding to
 *         the first electrical power sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstPower()
{
    return YPower.FirstPower();
}

//--- (end of Power functions)
