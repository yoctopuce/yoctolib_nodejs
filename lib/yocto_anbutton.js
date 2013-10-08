/*********************************************************************
 *
 * $Id: pic24config.php 13012 2013-10-07 13:56:46Z mvuilleu $
 *
 * Implements yFindAnButton(), the high-level API for AnButton functions
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
//--- (YAnButton definitions)
var Y_ANALOGCALIBRATION_OFF         = 0;
var Y_ANALOGCALIBRATION_ON          = 1;
var Y_ANALOGCALIBRATION_INVALID     = -1;
var Y_ISPRESSED_FALSE               = 0;
var Y_ISPRESSED_TRUE                = 1;
var Y_ISPRESSED_INVALID             = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_CALIBRATEDVALUE_INVALID       = -1;
var Y_RAWVALUE_INVALID              = -1;
var Y_CALIBRATIONMAX_INVALID        = -1;
var Y_CALIBRATIONMIN_INVALID        = -1;
var Y_SENSITIVITY_INVALID           = -1;
var Y_LASTTIMEPRESSED_INVALID       = -1;
var Y_LASTTIMERELEASED_INVALID      = -1;
var Y_PULSECOUNTER_INVALID          = -1;
var Y_PULSETIMER_INVALID            = -1;
//--- (end of YAnButton definitions)

/**
 * YAnButton Class: AnButton function interface
 * 
 * 
 */
var YAnButton; // definition below
(function()
{
    //--- (YAnButton implementation)

    /**
     * Returns the logical name of the analog input.
     * 
     * @return a string corresponding to the logical name of the analog input
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YAnButton_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the analog input.
     * 
     * @return a string corresponding to the logical name of the analog input
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the analog input. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the analog input
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAnButton_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the analog input (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the analog input (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YAnButton_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the analog input (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the analog input (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current calibrated input value (between 0 and 1000, included).
     * 
     * @return an integer corresponding to the current calibrated input value (between 0 and 1000, included)
     * 
     * On failure, throws an exception or returns Y_CALIBRATEDVALUE_INVALID.
     */
    function YAnButton_get_calibratedValue()
    {   var json_val = this._getAttr('calibratedValue');
        return (json_val == null ? Y_CALIBRATEDVALUE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current calibrated input value (between 0 and 1000, included).
     * 
     * @return an integer corresponding to the current calibrated input value (between 0 and 1000, included)
     * 
     * On failure, throws an exception or returns Y_CALIBRATEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_calibratedValue_async(func_callback, obj_context)
    {   this._getAttr_async('calibratedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALIBRATEDVALUE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current measured input value as-is (between 0 and 4095, included).
     * 
     * @return an integer corresponding to the current measured input value as-is (between 0 and 4095, included)
     * 
     * On failure, throws an exception or returns Y_RAWVALUE_INVALID.
     */
    function YAnButton_get_rawValue()
    {   var json_val = this._getAttr('rawValue');
        return (json_val == null ? Y_RAWVALUE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current measured input value as-is (between 0 and 4095, included).
     * 
     * @return an integer corresponding to the current measured input value as-is (between 0 and 4095, included)
     * 
     * On failure, throws an exception or returns Y_RAWVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_rawValue_async(func_callback, obj_context)
    {   this._getAttr_async('rawValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RAWVALUE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Tells if a calibration process is currently ongoing.
     * 
     * @return either Y_ANALOGCALIBRATION_OFF or Y_ANALOGCALIBRATION_ON
     * 
     * On failure, throws an exception or returns Y_ANALOGCALIBRATION_INVALID.
     */
    function YAnButton_get_analogCalibration()
    {   var json_val = this._getAttr('analogCalibration');
        return (json_val == null ? Y_ANALOGCALIBRATION_INVALID : parseInt(json_val));
    }

    /**
     * Tells if a calibration process is currently ongoing.
     * 
     * @return either Y_ANALOGCALIBRATION_OFF or Y_ANALOGCALIBRATION_ON
     * 
     * On failure, throws an exception or returns Y_ANALOGCALIBRATION_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_analogCalibration_async(func_callback, obj_context)
    {   this._getAttr_async('analogCalibration',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ANALOGCALIBRATION_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Starts or stops the calibration process. Remember to call the saveToFlash()
     * method of the module at the end of the calibration if the modification must be kept.
     * 
     * @param newval : either Y_ANALOGCALIBRATION_OFF or Y_ANALOGCALIBRATION_ON
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAnButton_set_analogCalibration(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('analogCalibration',rest_val);
    }

    /**
     * Returns the maximal value measured during the calibration (between 0 and 4095, included).
     * 
     * @return an integer corresponding to the maximal value measured during the calibration (between 0
     * and 4095, included)
     * 
     * On failure, throws an exception or returns Y_CALIBRATIONMAX_INVALID.
     */
    function YAnButton_get_calibrationMax()
    {   var json_val = this._getAttr('calibrationMax');
        return (json_val == null ? Y_CALIBRATIONMAX_INVALID : parseInt(json_val));
    }

    /**
     * Returns the maximal value measured during the calibration (between 0 and 4095, included).
     * 
     * @return an integer corresponding to the maximal value measured during the calibration (between 0
     * and 4095, included)
     * 
     * On failure, throws an exception or returns Y_CALIBRATIONMAX_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_calibrationMax_async(func_callback, obj_context)
    {   this._getAttr_async('calibrationMax',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALIBRATIONMAX_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the maximal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     * 
     * @param newval : an integer corresponding to the maximal calibration value for the input (between 0
     * and 4095, included), without actually
     *         starting the automated calibration
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAnButton_set_calibrationMax(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('calibrationMax',rest_val);
    }

    /**
     * Returns the minimal value measured during the calibration (between 0 and 4095, included).
     * 
     * @return an integer corresponding to the minimal value measured during the calibration (between 0
     * and 4095, included)
     * 
     * On failure, throws an exception or returns Y_CALIBRATIONMIN_INVALID.
     */
    function YAnButton_get_calibrationMin()
    {   var json_val = this._getAttr('calibrationMin');
        return (json_val == null ? Y_CALIBRATIONMIN_INVALID : parseInt(json_val));
    }

    /**
     * Returns the minimal value measured during the calibration (between 0 and 4095, included).
     * 
     * @return an integer corresponding to the minimal value measured during the calibration (between 0
     * and 4095, included)
     * 
     * On failure, throws an exception or returns Y_CALIBRATIONMIN_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_calibrationMin_async(func_callback, obj_context)
    {   this._getAttr_async('calibrationMin',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALIBRATIONMIN_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the minimal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     * 
     * @param newval : an integer corresponding to the minimal calibration value for the input (between 0
     * and 4095, included), without actually
     *         starting the automated calibration
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAnButton_set_calibrationMin(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('calibrationMin',rest_val);
    }

    /**
     * Returns the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     * 
     * @return an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     * 
     * On failure, throws an exception or returns Y_SENSITIVITY_INVALID.
     */
    function YAnButton_get_sensitivity()
    {   var json_val = this._getAttr('sensitivity');
        return (json_val == null ? Y_SENSITIVITY_INVALID : parseInt(json_val));
    }

    /**
     * Returns the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     * 
     * @return an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     * 
     * On failure, throws an exception or returns Y_SENSITIVITY_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_sensitivity_async(func_callback, obj_context)
    {   this._getAttr_async('sensitivity',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SENSITIVITY_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     * The sensibility is used to filter variations around a fixed value, but does not preclude the
     * transmission of events when the input value evolves constantly in the same direction.
     * Special case: when the value 1000 is used, the callback will only be thrown when the logical state
     * of the input switches from pressed to released and back.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * 
     * @param newval : an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAnButton_set_sensitivity(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('sensitivity',rest_val);
    }

    /**
     * Returns true if the input (considered as binary) is active (closed contact), and false otherwise.
     * 
     * @return either Y_ISPRESSED_FALSE or Y_ISPRESSED_TRUE, according to true if the input (considered as
     * binary) is active (closed contact), and false otherwise
     * 
     * On failure, throws an exception or returns Y_ISPRESSED_INVALID.
     */
    function YAnButton_get_isPressed()
    {   var json_val = this._getAttr('isPressed');
        return (json_val == null ? Y_ISPRESSED_INVALID : parseInt(json_val));
    }

    /**
     * Returns true if the input (considered as binary) is active (closed contact), and false otherwise.
     * 
     * @return either Y_ISPRESSED_FALSE or Y_ISPRESSED_TRUE, according to true if the input (considered as
     * binary) is active (closed contact), and false otherwise
     * 
     * On failure, throws an exception or returns Y_ISPRESSED_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_isPressed_async(func_callback, obj_context)
    {   this._getAttr_async('isPressed',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ISPRESSED_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was pressed (the input contact transitionned from open to closed).
     * 
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was pressed (the input contact transitionned from open to closed)
     * 
     * On failure, throws an exception or returns Y_LASTTIMEPRESSED_INVALID.
     */
    function YAnButton_get_lastTimePressed()
    {   var json_val = this._getAttr('lastTimePressed');
        return (json_val == null ? Y_LASTTIMEPRESSED_INVALID : parseInt(json_val));
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was pressed (the input contact transitionned from open to closed).
     * 
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was pressed (the input contact transitionned from open to closed)
     * 
     * On failure, throws an exception or returns Y_LASTTIMEPRESSED_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_lastTimePressed_async(func_callback, obj_context)
    {   this._getAttr_async('lastTimePressed',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LASTTIMEPRESSED_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was released (the input contact transitionned from closed to open).
     * 
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was released (the input contact transitionned from closed to open)
     * 
     * On failure, throws an exception or returns Y_LASTTIMERELEASED_INVALID.
     */
    function YAnButton_get_lastTimeReleased()
    {   var json_val = this._getAttr('lastTimeReleased');
        return (json_val == null ? Y_LASTTIMERELEASED_INVALID : parseInt(json_val));
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was released (the input contact transitionned from closed to open).
     * 
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was released (the input contact transitionned from closed to open)
     * 
     * On failure, throws an exception or returns Y_LASTTIMERELEASED_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_lastTimeReleased_async(func_callback, obj_context)
    {   this._getAttr_async('lastTimeReleased',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LASTTIMERELEASED_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the pulse counter value
     * 
     * @return an integer corresponding to the pulse counter value
     * 
     * On failure, throws an exception or returns Y_PULSECOUNTER_INVALID.
     */
    function YAnButton_get_pulseCounter()
    {   var json_val = this._getAttr('pulseCounter');
        return (json_val == null ? Y_PULSECOUNTER_INVALID : parseInt(json_val));
    }

    /**
     * Returns the pulse counter value
     * 
     * @return an integer corresponding to the pulse counter value
     * 
     * On failure, throws an exception or returns Y_PULSECOUNTER_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_pulseCounter_async(func_callback, obj_context)
    {   this._getAttr_async('pulseCounter',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PULSECOUNTER_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YAnButton_set_pulseCounter(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pulseCounter',rest_val);
    }

    /**
     * Returns the pulse counter value as well as his timer
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAnButton_resetCounter()
    {   var rest_val;
        rest_val = '0';
        return this._setAttr('pulseCounter',rest_val);
    }

    /**
     * Returns the timer of the pulses counter (ms)
     * 
     * @return an integer corresponding to the timer of the pulses counter (ms)
     * 
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    function YAnButton_get_pulseTimer()
    {   var json_val = this._getAttr('pulseTimer');
        return (json_val == null ? Y_PULSETIMER_INVALID : parseInt(json_val));
    }

    /**
     * Returns the timer of the pulses counter (ms)
     * 
     * @return an integer corresponding to the timer of the pulses counter (ms)
     * 
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAnButton_get_pulseTimer_async(func_callback, obj_context)
    {   this._getAttr_async('pulseTimer',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PULSETIMER_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Continues the enumeration of analog inputs started using yFirstAnButton().
     * 
     * @return a pointer to a YAnButton object, corresponding to
     *         an analog input currently online, or a null pointer
     *         if there are no more analog inputs to enumerate.
     */
    function YAnButton_nextAnButton()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YAnButton.FindAnButton(next_hwid);
    }

    /**
     * Retrieves an analog input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the analog input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAnButton.isOnline() to test if the analog input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an analog input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the analog input
     * 
     * @return a YAnButton object allowing you to drive the analog input.
     */
    function YAnButton_FindAnButton(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('AnButton', str_func);
        if(obj_func) return obj_func;
        return new YAnButton(str_func);
    }

    /**
     * Starts the enumeration of analog inputs currently accessible.
     * Use the method YAnButton.nextAnButton() to iterate on
     * next analog inputs.
     * 
     * @return a pointer to a YAnButton object, corresponding to
     *         the first analog input currently online, or a null pointer
     *         if there are none.
     */
    function YAnButton_FirstAnButton()
    {
        var next_hwid = YAPI.getFirstHardwareId('AnButton');
        if(next_hwid == null) return null;
        return YAnButton.FindAnButton(next_hwid);
    }

    //--- (end of YAnButton implementation)

    function _YAnButton(str_func)
    {
        //--- (YAnButton constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'AnButton', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.CALIBRATEDVALUE_INVALID         = -1;
        this.RAWVALUE_INVALID                = -1;
        this.ANALOGCALIBRATION_OFF           = 0;
        this.ANALOGCALIBRATION_ON            = 1;
        this.ANALOGCALIBRATION_INVALID       = -1;
        this.CALIBRATIONMAX_INVALID          = -1;
        this.CALIBRATIONMIN_INVALID          = -1;
        this.SENSITIVITY_INVALID             = -1;
        this.ISPRESSED_FALSE                 = 0;
        this.ISPRESSED_TRUE                  = 1;
        this.ISPRESSED_INVALID               = -1;
        this.LASTTIMEPRESSED_INVALID         = -1;
        this.LASTTIMERELEASED_INVALID        = -1;
        this.PULSECOUNTER_INVALID            = -1;
        this.PULSETIMER_INVALID              = -1;
        this.get_logicalName                 = YAnButton_get_logicalName;
        this.logicalName                     = YAnButton_get_logicalName;
        this.get_logicalName_async           = YAnButton_get_logicalName_async;
        this.logicalName_async               = YAnButton_get_logicalName_async;
        this.set_logicalName                 = YAnButton_set_logicalName;
        this.setLogicalName                  = YAnButton_set_logicalName;
        this.get_advertisedValue             = YAnButton_get_advertisedValue;
        this.advertisedValue                 = YAnButton_get_advertisedValue;
        this.get_advertisedValue_async       = YAnButton_get_advertisedValue_async;
        this.advertisedValue_async           = YAnButton_get_advertisedValue_async;
        this.get_calibratedValue             = YAnButton_get_calibratedValue;
        this.calibratedValue                 = YAnButton_get_calibratedValue;
        this.get_calibratedValue_async       = YAnButton_get_calibratedValue_async;
        this.calibratedValue_async           = YAnButton_get_calibratedValue_async;
        this.get_rawValue                    = YAnButton_get_rawValue;
        this.rawValue                        = YAnButton_get_rawValue;
        this.get_rawValue_async              = YAnButton_get_rawValue_async;
        this.rawValue_async                  = YAnButton_get_rawValue_async;
        this.get_analogCalibration           = YAnButton_get_analogCalibration;
        this.analogCalibration               = YAnButton_get_analogCalibration;
        this.get_analogCalibration_async     = YAnButton_get_analogCalibration_async;
        this.analogCalibration_async         = YAnButton_get_analogCalibration_async;
        this.set_analogCalibration           = YAnButton_set_analogCalibration;
        this.setAnalogCalibration            = YAnButton_set_analogCalibration;
        this.get_calibrationMax              = YAnButton_get_calibrationMax;
        this.calibrationMax                  = YAnButton_get_calibrationMax;
        this.get_calibrationMax_async        = YAnButton_get_calibrationMax_async;
        this.calibrationMax_async            = YAnButton_get_calibrationMax_async;
        this.set_calibrationMax              = YAnButton_set_calibrationMax;
        this.setCalibrationMax               = YAnButton_set_calibrationMax;
        this.get_calibrationMin              = YAnButton_get_calibrationMin;
        this.calibrationMin                  = YAnButton_get_calibrationMin;
        this.get_calibrationMin_async        = YAnButton_get_calibrationMin_async;
        this.calibrationMin_async            = YAnButton_get_calibrationMin_async;
        this.set_calibrationMin              = YAnButton_set_calibrationMin;
        this.setCalibrationMin               = YAnButton_set_calibrationMin;
        this.get_sensitivity                 = YAnButton_get_sensitivity;
        this.sensitivity                     = YAnButton_get_sensitivity;
        this.get_sensitivity_async           = YAnButton_get_sensitivity_async;
        this.sensitivity_async               = YAnButton_get_sensitivity_async;
        this.set_sensitivity                 = YAnButton_set_sensitivity;
        this.setSensitivity                  = YAnButton_set_sensitivity;
        this.get_isPressed                   = YAnButton_get_isPressed;
        this.isPressed                       = YAnButton_get_isPressed;
        this.get_isPressed_async             = YAnButton_get_isPressed_async;
        this.isPressed_async                 = YAnButton_get_isPressed_async;
        this.get_lastTimePressed             = YAnButton_get_lastTimePressed;
        this.lastTimePressed                 = YAnButton_get_lastTimePressed;
        this.get_lastTimePressed_async       = YAnButton_get_lastTimePressed_async;
        this.lastTimePressed_async           = YAnButton_get_lastTimePressed_async;
        this.get_lastTimeReleased            = YAnButton_get_lastTimeReleased;
        this.lastTimeReleased                = YAnButton_get_lastTimeReleased;
        this.get_lastTimeReleased_async      = YAnButton_get_lastTimeReleased_async;
        this.lastTimeReleased_async          = YAnButton_get_lastTimeReleased_async;
        this.get_pulseCounter                = YAnButton_get_pulseCounter;
        this.pulseCounter                    = YAnButton_get_pulseCounter;
        this.get_pulseCounter_async          = YAnButton_get_pulseCounter_async;
        this.pulseCounter_async              = YAnButton_get_pulseCounter_async;
        this.set_pulseCounter                = YAnButton_set_pulseCounter;
        this.setPulseCounter                 = YAnButton_set_pulseCounter;
        this.resetCounter                    = YAnButton_resetCounter;
        this.get_pulseTimer                  = YAnButton_get_pulseTimer;
        this.pulseTimer                      = YAnButton_get_pulseTimer;
        this.get_pulseTimer_async            = YAnButton_get_pulseTimer_async;
        this.pulseTimer_async                = YAnButton_get_pulseTimer_async;
        this.nextAnButton                    = YAnButton_nextAnButton;
        //--- (end of YAnButton constructor)
    }

    YAnButton = _YAnButton;
    YAnButton.FindAnButton  = YAnButton_FindAnButton;
    YAnButton.FirstAnButton = YAnButton_FirstAnButton;
})();

//--- (AnButton functions)

/**
 * Retrieves an analog input for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the analog input is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YAnButton.isOnline() to test if the analog input is
 * indeed online at a given time. In case of ambiguity when looking for
 * an analog input by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the analog input
 * 
 * @return a YAnButton object allowing you to drive the analog input.
 */
function yFindAnButton(str_func)
{
    return YAnButton.FindAnButton(str_func);
}

/**
 * Starts the enumeration of analog inputs currently accessible.
 * Use the method YAnButton.nextAnButton() to iterate on
 * next analog inputs.
 * 
 * @return a pointer to a YAnButton object, corresponding to
 *         the first analog input currently online, or a null pointer
 *         if there are none.
 */
function yFirstAnButton()
{
    return YAnButton.FirstAnButton();
}

//--- (end of AnButton functions)
