/*********************************************************************
 *
 * $Id: pic24config.php 13012 2013-10-07 13:56:46Z mvuilleu $
 *
 * Implements yFindTemperature(), the high-level API for Temperature functions
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
//--- (YTemperature definitions)
var Y_SENSORTYPE_DIGITAL            = 0;
var Y_SENSORTYPE_TYPE_K             = 1;
var Y_SENSORTYPE_TYPE_E             = 2;
var Y_SENSORTYPE_TYPE_J             = 3;
var Y_SENSORTYPE_TYPE_N             = 4;
var Y_SENSORTYPE_TYPE_R             = 5;
var Y_SENSORTYPE_TYPE_S             = 6;
var Y_SENSORTYPE_TYPE_T             = 7;
var Y_SENSORTYPE_PT100_4WIRES       = 8;
var Y_SENSORTYPE_PT100_3WIRES       = 9;
var Y_SENSORTYPE_PT100_2WIRES       = 10;
var Y_SENSORTYPE_INVALID            = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_UNIT_INVALID                  = "!INVALID!";
var Y_CURRENTVALUE_INVALID          = -Number.MAX_VALUE;
var Y_LOWESTVALUE_INVALID           = -Number.MAX_VALUE;
var Y_HIGHESTVALUE_INVALID          = -Number.MAX_VALUE;
var Y_CURRENTRAWVALUE_INVALID       = -Number.MAX_VALUE;
var Y_CALIBRATIONPARAM_INVALID      = "!INVALID!";
var Y_RESOLUTION_INVALID            = -Number.MAX_VALUE;
//--- (end of YTemperature definitions)

/**
 * YTemperature Class: Temperature function interface
 * 
 * 
 */
var YTemperature; // definition below
(function()
{
    //--- (YTemperature implementation)

    /**
     * Returns the logical name of the temperature sensor.
     * 
     * @return a string corresponding to the logical name of the temperature sensor
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YTemperature_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the temperature sensor.
     * 
     * @return a string corresponding to the logical name of the temperature sensor
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YTemperature_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the temperature sensor. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the temperature sensor
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YTemperature_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the temperature sensor (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the temperature sensor (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YTemperature_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the temperature sensor (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the temperature sensor (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YTemperature_get_advertisedValue_async(func_callback, obj_context)
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
    function YTemperature_get_unit()
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
    function YTemperature_get_unit_async(func_callback, obj_context)
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
    function YTemperature_get_currentValue()
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
    function YTemperature_get_currentValue_async(func_callback, obj_context)
    {   this._getAttr_async('currentValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CURRENTVALUE_INVALID : Math.round(json_val/6553.6) / 10);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the recorded minimal value observed.
     * 
     * @param newval : a floating point number corresponding to the recorded minimal value observed
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YTemperature_set_lowestValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('lowestValue',rest_val);
    }

    /**
     * Returns the minimal value observed.
     * 
     * @return a floating point number corresponding to the minimal value observed
     * 
     * On failure, throws an exception or returns Y_LOWESTVALUE_INVALID.
     */
    function YTemperature_get_lowestValue()
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
    function YTemperature_get_lowestValue_async(func_callback, obj_context)
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YTemperature_set_highestValue(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('highestValue',rest_val);
    }

    /**
     * Returns the maximal value observed.
     * 
     * @return a floating point number corresponding to the maximal value observed
     * 
     * On failure, throws an exception or returns Y_HIGHESTVALUE_INVALID.
     */
    function YTemperature_get_highestValue()
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
    function YTemperature_get_highestValue_async(func_callback, obj_context)
    {   this._getAttr_async('highestValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_HIGHESTVALUE_INVALID : Math.round(json_val/6553.6) / 10);
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
    function YTemperature_get_currentRawValue()
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
    function YTemperature_get_currentRawValue_async(func_callback, obj_context)
    {   this._getAttr_async('currentRawValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CURRENTRAWVALUE_INVALID : json_val/65536.0);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YTemperature_get_calibrationParam()
    {   var json_val = this._getAttr('calibrationParam');
        return (json_val == null ? Y_CALIBRATIONPARAM_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YTemperature_get_calibrationParam_async(func_callback, obj_context)
    {   this._getAttr_async('calibrationParam',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALIBRATIONPARAM_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YTemperature_set_calibrationParam(newval)
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YTemperature_calibrateFromPoints(floatArr_rawValues,floatArr_refValues)
    {   var rest_val;
        rest_val = this._encodeCalibrationPoints(floatArr_rawValues,floatArr_refValues);
        return this._setAttr('calibrationParam',rest_val);
    }

    function YTemperature_loadCalibrationPoints(floatArrRef_rawValues,floatArrRef_refValues)
    {
        return this._decodeCalibrationPoints(floatArrRef_rawValues,floatArrRef_refValues);
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the values, which is not always the same as the actual precision of the sensor.
     * 
     * @return a floating point number corresponding to the resolution of the measured values
     * 
     * On failure, throws an exception or returns Y_RESOLUTION_INVALID.
     */
    function YTemperature_get_resolution()
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
    function YTemperature_get_resolution_async(func_callback, obj_context)
    {   this._getAttr_async('resolution',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RESOLUTION_INVALID : (json_val > 100 ? 1.0 / Math.round(65536.0/json_val) : 0.001 / Math.round(67.0/json_val)));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the temperature sensor type.
     * 
     * @return a value among Y_SENSORTYPE_DIGITAL, Y_SENSORTYPE_TYPE_K, Y_SENSORTYPE_TYPE_E,
     * Y_SENSORTYPE_TYPE_J, Y_SENSORTYPE_TYPE_N, Y_SENSORTYPE_TYPE_R, Y_SENSORTYPE_TYPE_S,
     * Y_SENSORTYPE_TYPE_T, Y_SENSORTYPE_PT100_4WIRES, Y_SENSORTYPE_PT100_3WIRES and
     * Y_SENSORTYPE_PT100_2WIRES corresponding to the temperature sensor type
     * 
     * On failure, throws an exception or returns Y_SENSORTYPE_INVALID.
     */
    function YTemperature_get_sensorType()
    {   var json_val = this._getAttr('sensorType');
        return (json_val == null ? Y_SENSORTYPE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the temperature sensor type.
     * 
     * @return a value among Y_SENSORTYPE_DIGITAL, Y_SENSORTYPE_TYPE_K, Y_SENSORTYPE_TYPE_E,
     * Y_SENSORTYPE_TYPE_J, Y_SENSORTYPE_TYPE_N, Y_SENSORTYPE_TYPE_R, Y_SENSORTYPE_TYPE_S,
     * Y_SENSORTYPE_TYPE_T, Y_SENSORTYPE_PT100_4WIRES, Y_SENSORTYPE_PT100_3WIRES and
     * Y_SENSORTYPE_PT100_2WIRES corresponding to the temperature sensor type
     * 
     * On failure, throws an exception or returns Y_SENSORTYPE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YTemperature_get_sensorType_async(func_callback, obj_context)
    {   this._getAttr_async('sensorType',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SENSORTYPE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Modify the temperature sensor type.  This function is used to
     * to define the type of thermocouple (K,E...) used with the device.
     * This will have no effect if module is using a digital sensor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a value among Y_SENSORTYPE_DIGITAL, Y_SENSORTYPE_TYPE_K, Y_SENSORTYPE_TYPE_E,
     * Y_SENSORTYPE_TYPE_J, Y_SENSORTYPE_TYPE_N, Y_SENSORTYPE_TYPE_R, Y_SENSORTYPE_TYPE_S,
     * Y_SENSORTYPE_TYPE_T, Y_SENSORTYPE_PT100_4WIRES, Y_SENSORTYPE_PT100_3WIRES and Y_SENSORTYPE_PT100_2WIRES
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YTemperature_set_sensorType(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('sensorType',rest_val);
    }

    /**
     * Continues the enumeration of temperature sensors started using yFirstTemperature().
     * 
     * @return a pointer to a YTemperature object, corresponding to
     *         a temperature sensor currently online, or a null pointer
     *         if there are no more temperature sensors to enumerate.
     */
    function YTemperature_nextTemperature()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YTemperature.FindTemperature(next_hwid);
    }

    /**
     * Retrieves a temperature sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the temperature sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTemperature.isOnline() to test if the temperature sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a temperature sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the temperature sensor
     * 
     * @return a YTemperature object allowing you to drive the temperature sensor.
     */
    function YTemperature_FindTemperature(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Temperature', str_func);
        if(obj_func) return obj_func;
        return new YTemperature(str_func);
    }

    /**
     * Starts the enumeration of temperature sensors currently accessible.
     * Use the method YTemperature.nextTemperature() to iterate on
     * next temperature sensors.
     * 
     * @return a pointer to a YTemperature object, corresponding to
     *         the first temperature sensor currently online, or a null pointer
     *         if there are none.
     */
    function YTemperature_FirstTemperature()
    {
        var next_hwid = YAPI.getFirstHardwareId('Temperature');
        if(next_hwid == null) return null;
        return YTemperature.FindTemperature(next_hwid);
    }

    //--- (end of YTemperature implementation)

    function _YTemperature(str_func)
    {
        //--- (YTemperature constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Temperature', str_func);
        
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
        this.SENSORTYPE_DIGITAL              = 0;
        this.SENSORTYPE_TYPE_K               = 1;
        this.SENSORTYPE_TYPE_E               = 2;
        this.SENSORTYPE_TYPE_J               = 3;
        this.SENSORTYPE_TYPE_N               = 4;
        this.SENSORTYPE_TYPE_R               = 5;
        this.SENSORTYPE_TYPE_S               = 6;
        this.SENSORTYPE_TYPE_T               = 7;
        this.SENSORTYPE_PT100_4WIRES         = 8;
        this.SENSORTYPE_PT100_3WIRES         = 9;
        this.SENSORTYPE_PT100_2WIRES         = 10;
        this.SENSORTYPE_INVALID              = -1;
        this._calibrationOffset              = -32767;
        this.get_logicalName                 = YTemperature_get_logicalName;
        this.logicalName                     = YTemperature_get_logicalName;
        this.get_logicalName_async           = YTemperature_get_logicalName_async;
        this.logicalName_async               = YTemperature_get_logicalName_async;
        this.set_logicalName                 = YTemperature_set_logicalName;
        this.setLogicalName                  = YTemperature_set_logicalName;
        this.get_advertisedValue             = YTemperature_get_advertisedValue;
        this.advertisedValue                 = YTemperature_get_advertisedValue;
        this.get_advertisedValue_async       = YTemperature_get_advertisedValue_async;
        this.advertisedValue_async           = YTemperature_get_advertisedValue_async;
        this.get_unit                        = YTemperature_get_unit;
        this.unit                            = YTemperature_get_unit;
        this.get_unit_async                  = YTemperature_get_unit_async;
        this.unit_async                      = YTemperature_get_unit_async;
        this.get_currentValue                = YTemperature_get_currentValue;
        this.currentValue                    = YTemperature_get_currentValue;
        this.get_currentValue_async          = YTemperature_get_currentValue_async;
        this.currentValue_async              = YTemperature_get_currentValue_async;
        this.set_lowestValue                 = YTemperature_set_lowestValue;
        this.setLowestValue                  = YTemperature_set_lowestValue;
        this.get_lowestValue                 = YTemperature_get_lowestValue;
        this.lowestValue                     = YTemperature_get_lowestValue;
        this.get_lowestValue_async           = YTemperature_get_lowestValue_async;
        this.lowestValue_async               = YTemperature_get_lowestValue_async;
        this.set_highestValue                = YTemperature_set_highestValue;
        this.setHighestValue                 = YTemperature_set_highestValue;
        this.get_highestValue                = YTemperature_get_highestValue;
        this.highestValue                    = YTemperature_get_highestValue;
        this.get_highestValue_async          = YTemperature_get_highestValue_async;
        this.highestValue_async              = YTemperature_get_highestValue_async;
        this.get_currentRawValue             = YTemperature_get_currentRawValue;
        this.currentRawValue                 = YTemperature_get_currentRawValue;
        this.get_currentRawValue_async       = YTemperature_get_currentRawValue_async;
        this.currentRawValue_async           = YTemperature_get_currentRawValue_async;
        this.get_calibrationParam            = YTemperature_get_calibrationParam;
        this.calibrationParam                = YTemperature_get_calibrationParam;
        this.get_calibrationParam_async      = YTemperature_get_calibrationParam_async;
        this.calibrationParam_async          = YTemperature_get_calibrationParam_async;
        this.set_calibrationParam            = YTemperature_set_calibrationParam;
        this.setCalibrationParam             = YTemperature_set_calibrationParam;
        this.calibrateFromPoints             = YTemperature_calibrateFromPoints;
        this.loadCalibrationPoints           = YTemperature_loadCalibrationPoints;
        this.get_resolution                  = YTemperature_get_resolution;
        this.resolution                      = YTemperature_get_resolution;
        this.get_resolution_async            = YTemperature_get_resolution_async;
        this.resolution_async                = YTemperature_get_resolution_async;
        this.get_sensorType                  = YTemperature_get_sensorType;
        this.sensorType                      = YTemperature_get_sensorType;
        this.get_sensorType_async            = YTemperature_get_sensorType_async;
        this.sensorType_async                = YTemperature_get_sensorType_async;
        this.set_sensorType                  = YTemperature_set_sensorType;
        this.setSensorType                   = YTemperature_set_sensorType;
        this.nextTemperature                 = YTemperature_nextTemperature;
        //--- (end of YTemperature constructor)
    }

    YTemperature = _YTemperature;
    YTemperature.FindTemperature  = YTemperature_FindTemperature;
    YTemperature.FirstTemperature = YTemperature_FirstTemperature;
})();

//--- (Temperature functions)

/**
 * Retrieves a temperature sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the temperature sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YTemperature.isOnline() to test if the temperature sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a temperature sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the temperature sensor
 * 
 * @return a YTemperature object allowing you to drive the temperature sensor.
 */
function yFindTemperature(str_func)
{
    return YTemperature.FindTemperature(str_func);
}

/**
 * Starts the enumeration of temperature sensors currently accessible.
 * Use the method YTemperature.nextTemperature() to iterate on
 * next temperature sensors.
 * 
 * @return a pointer to a YTemperature object, corresponding to
 *         the first temperature sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstTemperature()
{
    return YTemperature.FirstTemperature();
}

//--- (end of Temperature functions)
