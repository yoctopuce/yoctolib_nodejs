/*********************************************************************
 *
 * $Id: yocto_rangefinder.js 26996 2017-03-30 16:18:14Z seb $
 *
 * Implements the high-level API for RangeFinder functions
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

//--- (YRangeFinder return codes)
//--- (end of YRangeFinder return codes)
//--- (YRangeFinder definitions)
var Y_RANGEFINDERMODE_DEFAULT       = 0;
var Y_RANGEFINDERMODE_LONG_RANGE    = 1;
var Y_RANGEFINDERMODE_HIGH_ACCURACY = 2;
var Y_RANGEFINDERMODE_HIGH_SPEED    = 3;
var Y_RANGEFINDERMODE_INVALID       = -1;
var Y_HARDWARECALIBRATION_INVALID   = YAPI_INVALID_STRING;
var Y_CURRENTTEMPERATURE_INVALID    = YAPI_INVALID_DOUBLE;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YRangeFinder definitions)

//--- (YRangeFinder class start)
/**
 * YRangeFinder Class: RangeFinder function interface
 *
 * The Yoctopuce class YRangeFinder allows you to use and configure Yoctopuce range finder
 * sensors. It inherits from the YSensor class the core functions to read measurements,
 * register callback functions, access the autonomous datalogger.
 * This class adds the ability to easily perform a one-point linear calibration
 * to compensate the effect of a glass or filter placed in front of the sensor.
 */
//--- (end of YRangeFinder class start)

var YRangeFinder; // definition below
(function()
{
    function _YRangeFinder(str_func)
    {
        //--- (YRangeFinder constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'RangeFinder';

        this._rangeFinderMode                = Y_RANGEFINDERMODE_INVALID;  // RangeFinderMode
        this._hardwareCalibration            = Y_HARDWARECALIBRATION_INVALID; // RangeFinderCalib
        this._currentTemperature             = Y_CURRENTTEMPERATURE_INVALID; // MeasureVal
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YRangeFinder constructor)
    }

    //--- (YRangeFinder implementation)

    function YRangeFinder_parseAttr(name, val, _super)
    {
        switch(name) {
        case "rangeFinderMode":
            this._rangeFinderMode = parseInt(val);
            return 1;
        case "hardwareCalibration":
            this._hardwareCalibration = val;
            return 1;
        case "currentTemperature":
            this._currentTemperature = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the measuring unit for the measured range. That unit is a string.
     * String value can be " or mm. Any other value is ignored.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the rangeFinder function, a
     * unit system change will probably break it.
     *
     * @param newval : a string corresponding to the measuring unit for the measured range
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRangeFinder_set_unit(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('unit',rest_val);
    }

    /**
     * Returns the range finder running mode. The rangefinder running mode
     * allows you to put priority on precision, speed or maximum range.
     *
     * @return a value among YRangeFinder.RANGEFINDERMODE_DEFAULT, YRangeFinder.RANGEFINDERMODE_LONG_RANGE,
     * YRangeFinder.RANGEFINDERMODE_HIGH_ACCURACY and YRangeFinder.RANGEFINDERMODE_HIGH_SPEED
     * corresponding to the range finder running mode
     *
     * On failure, throws an exception or returns YRangeFinder.RANGEFINDERMODE_INVALID.
     */
    function YRangeFinder_get_rangeFinderMode()
    {
        var res;                    // enumRANGEFINDERMODE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RANGEFINDERMODE_INVALID;
            }
        }
        res = this._rangeFinderMode;
        return res;
    }

    /**
     * Gets the range finder running mode. The rangefinder running mode
     * allows you to put priority on precision, speed or maximum range.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRangeFinder object that invoked the callback
     *         - the result:a value among Y_RANGEFINDERMODE_DEFAULT, Y_RANGEFINDERMODE_LONG_RANGE,
     *         Y_RANGEFINDERMODE_HIGH_ACCURACY and Y_RANGEFINDERMODE_HIGH_SPEED corresponding to the range finder running mode
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_RANGEFINDERMODE_INVALID.
     */
    function YRangeFinder_get_rangeFinderMode_async(callback,context)
    {
        var res;                    // enumRANGEFINDERMODE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RANGEFINDERMODE_INVALID);
            } else {
                callback(context, obj, obj._rangeFinderMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the rangefinder running mode, allowing you to put priority on
     * precision, speed or maximum range.
     *
     * @param newval : a value among YRangeFinder.RANGEFINDERMODE_DEFAULT,
     * YRangeFinder.RANGEFINDERMODE_LONG_RANGE, YRangeFinder.RANGEFINDERMODE_HIGH_ACCURACY and
     * YRangeFinder.RANGEFINDERMODE_HIGH_SPEED corresponding to the rangefinder running mode, allowing you
     * to put priority on
     *         precision, speed or maximum range
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YRangeFinder_set_rangeFinderMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('rangeFinderMode',rest_val);
    }

    function YRangeFinder_get_hardwareCalibration()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_HARDWARECALIBRATION_INVALID;
            }
        }
        res = this._hardwareCalibration;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRangeFinder object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YRangeFinder_get_hardwareCalibration_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_HARDWARECALIBRATION_INVALID);
            } else {
                callback(context, obj, obj._hardwareCalibration);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YRangeFinder_set_hardwareCalibration(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('hardwareCalibration',rest_val);
    }

    /**
     * Returns the current sensor temperature, as a floating point number.
     *
     * @return a floating point number corresponding to the current sensor temperature, as a floating point number
     *
     * On failure, throws an exception or returns YRangeFinder.CURRENTTEMPERATURE_INVALID.
     */
    function YRangeFinder_get_currentTemperature()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTTEMPERATURE_INVALID;
            }
        }
        res = this._currentTemperature;
        return res;
    }

    /**
     * Gets the current sensor temperature, as a floating point number.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRangeFinder object that invoked the callback
     *         - the result:a floating point number corresponding to the current sensor temperature, as a floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CURRENTTEMPERATURE_INVALID.
     */
    function YRangeFinder_get_currentTemperature_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTTEMPERATURE_INVALID);
            } else {
                callback(context, obj, obj._currentTemperature);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YRangeFinder_get_command()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRangeFinder object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YRangeFinder_get_command_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_COMMAND_INVALID);
            } else {
                callback(context, obj, obj._command);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YRangeFinder_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a range finder for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the range finder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRangeFinder.isOnline() to test if the range finder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a range finder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the range finder
     *
     * @return a YRangeFinder object allowing you to drive the range finder.
     */
    function YRangeFinder_FindRangeFinder(func)                 // class method
    {
        var obj;                    // YRangeFinder;
        obj = YFunction._FindFromCache("RangeFinder", func);
        if (obj == null) {
            obj = new YRangeFinder(func);
            YFunction._AddToCache("RangeFinder", func, obj);
        }
        return obj;
    }

    /**
     * Returns the temperature at the time when the latest calibration was performed.
     * This function can be used to determine if a new calibration for ambient temperature
     * is required.
     *
     * @return a temperature, as a floating point number.
     *         On failure, throws an exception or return YAPI.INVALID_DOUBLE.
     */
    function YRangeFinder_get_hardwareCalibrationTemperature()
    {
        var hwcal;                  // string;
        hwcal = this.get_hardwareCalibration();
        if (!((hwcal).substr(0, 1) == "@")) {
            return YAPI_INVALID_DOUBLE;
        }
        return YAPI._atoi((hwcal).substr(1, (hwcal).length));
    }

    /**
     * Triggers a sensor calibration according to the current ambient temperature. That
     * calibration process needs no physical interaction with the sensor. It is performed
     * automatically at device startup, but it is recommended to start it again when the
     * temperature delta since the latest calibration exceeds 8°C.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YRangeFinder_triggerTemperatureCalibration()
    {
        return this.set_command("T");
    }

    /**
     * Triggers the photon detector hardware calibration.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YRangeFinder_triggerSpadCalibration()
    {
        return this.set_command("S");
    }

    /**
     * Triggers the hardware offset calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YRangeFinder_triggerOffsetCalibration(targetDist)
    {
        var distmm;                 // int;
        if (this.get_unit() == "\"") {
            distmm = Math.round(targetDist * 25.4);
        } else {
            distmm = Math.round(targetDist);
        }
        return this.set_command("O"+String(Math.round(distmm)));
    }

    /**
     * Triggers the hardware cross-talk calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YRangeFinder_triggerXTalkCalibration(targetDist)
    {
        var distmm;                 // int;
        if (this.get_unit() == "\"") {
            distmm = Math.round(targetDist * 25.4);
        } else {
            distmm = Math.round(targetDist);
        }
        return this.set_command("X"+String(Math.round(distmm)));
    }

    /**
     * Cancels the effect of previous hardware calibration procedures to compensate
     * for cover glass, and restores factory settings.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YRangeFinder_cancelCoverGlassCalibrations()
    {
        return this.set_hardwareCalibration("");
    }

    /**
     * Continues the enumeration of range finders started using yFirstRangeFinder().
     *
     * @return a pointer to a YRangeFinder object, corresponding to
     *         a range finder currently online, or a null pointer
     *         if there are no more range finders to enumerate.
     */
    function YRangeFinder_nextRangeFinder()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YRangeFinder.FindRangeFinder(next_hwid);
    }

    /**
     * Starts the enumeration of range finders currently accessible.
     * Use the method YRangeFinder.nextRangeFinder() to iterate on
     * next range finders.
     *
     * @return a pointer to a YRangeFinder object, corresponding to
     *         the first range finder currently online, or a null pointer
     *         if there are none.
     */
    function YRangeFinder_FirstRangeFinder()
    {
        var next_hwid = YAPI.getFirstHardwareId('RangeFinder');
        if(next_hwid == null) return null;
        return YRangeFinder.FindRangeFinder(next_hwid);
    }

    //--- (end of YRangeFinder implementation)

    //--- (YRangeFinder initialization)
    YRangeFinder = YSensor._Subclass(_YRangeFinder, {
        // Constants
        RANGEFINDERMODE_DEFAULT     : 0,
        RANGEFINDERMODE_LONG_RANGE  : 1,
        RANGEFINDERMODE_HIGH_ACCURACY : 2,
        RANGEFINDERMODE_HIGH_SPEED  : 3,
        RANGEFINDERMODE_INVALID     : -1,
        HARDWARECALIBRATION_INVALID : YAPI_INVALID_STRING,
        CURRENTTEMPERATURE_INVALID  : YAPI_INVALID_DOUBLE,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindRangeFinder             : YRangeFinder_FindRangeFinder,
        FirstRangeFinder            : YRangeFinder_FirstRangeFinder
    }, {
        // Methods
        set_unit                    : YRangeFinder_set_unit,
        setUnit                     : YRangeFinder_set_unit,
        get_rangeFinderMode         : YRangeFinder_get_rangeFinderMode,
        rangeFinderMode             : YRangeFinder_get_rangeFinderMode,
        get_rangeFinderMode_async   : YRangeFinder_get_rangeFinderMode_async,
        rangeFinderMode_async       : YRangeFinder_get_rangeFinderMode_async,
        set_rangeFinderMode         : YRangeFinder_set_rangeFinderMode,
        setRangeFinderMode          : YRangeFinder_set_rangeFinderMode,
        get_hardwareCalibration     : YRangeFinder_get_hardwareCalibration,
        hardwareCalibration         : YRangeFinder_get_hardwareCalibration,
        get_hardwareCalibration_async : YRangeFinder_get_hardwareCalibration_async,
        hardwareCalibration_async   : YRangeFinder_get_hardwareCalibration_async,
        set_hardwareCalibration     : YRangeFinder_set_hardwareCalibration,
        setHardwareCalibration      : YRangeFinder_set_hardwareCalibration,
        get_currentTemperature      : YRangeFinder_get_currentTemperature,
        currentTemperature          : YRangeFinder_get_currentTemperature,
        get_currentTemperature_async : YRangeFinder_get_currentTemperature_async,
        currentTemperature_async    : YRangeFinder_get_currentTemperature_async,
        get_command                 : YRangeFinder_get_command,
        command                     : YRangeFinder_get_command,
        get_command_async           : YRangeFinder_get_command_async,
        command_async               : YRangeFinder_get_command_async,
        set_command                 : YRangeFinder_set_command,
        setCommand                  : YRangeFinder_set_command,
        get_hardwareCalibrationTemperature : YRangeFinder_get_hardwareCalibrationTemperature,
        hardwareCalibrationTemperature : YRangeFinder_get_hardwareCalibrationTemperature,
        triggerTemperatureCalibration : YRangeFinder_triggerTemperatureCalibration,
        triggerSpadCalibration      : YRangeFinder_triggerSpadCalibration,
        triggerOffsetCalibration    : YRangeFinder_triggerOffsetCalibration,
        triggerXTalkCalibration     : YRangeFinder_triggerXTalkCalibration,
        cancelCoverGlassCalibrations : YRangeFinder_cancelCoverGlassCalibrations,
        nextRangeFinder             : YRangeFinder_nextRangeFinder,
        _parseAttr                  : YRangeFinder_parseAttr
    });
    //--- (end of YRangeFinder initialization)
})();

//--- (RangeFinder functions)

/**
 * Retrieves a range finder for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the range finder is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YRangeFinder.isOnline() to test if the range finder is
 * indeed online at a given time. In case of ambiguity when looking for
 * a range finder by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the range finder
 *
 * @return a YRangeFinder object allowing you to drive the range finder.
 */
function yFindRangeFinder(func)
{
    return YRangeFinder.FindRangeFinder(func);
}

/**
 * Starts the enumeration of range finders currently accessible.
 * Use the method YRangeFinder.nextRangeFinder() to iterate on
 * next range finders.
 *
 * @return a pointer to a YRangeFinder object, corresponding to
 *         the first range finder currently online, or a null pointer
 *         if there are none.
 */
function yFirstRangeFinder()
{
    return YRangeFinder.FirstRangeFinder();
}

//--- (end of RangeFinder functions)
