/*********************************************************************
 *
 * $Id: yocto_dualpower.js 13045 2013-10-09 20:11:49Z mvuilleu $
 *
 * Implements yFindDualPower(), the high-level API for DualPower functions
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
//--- (YDualPower definitions)
var Y_POWERSTATE_OFF                = 0;
var Y_POWERSTATE_FROM_USB           = 1;
var Y_POWERSTATE_FROM_EXT           = 2;
var Y_POWERSTATE_INVALID            = -1;
var Y_POWERCONTROL_AUTO             = 0;
var Y_POWERCONTROL_FROM_USB         = 1;
var Y_POWERCONTROL_FROM_EXT         = 2;
var Y_POWERCONTROL_OFF              = 3;
var Y_POWERCONTROL_INVALID          = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_EXTVOLTAGE_INVALID            = -1;
//--- (end of YDualPower definitions)

/**
 * YDualPower Class: External power supply control interface
 * 
 * Yoctopuce application programming interface allows you to control
 * the power source to use for module functions that require high current.
 * The module can also automatically disconnect the external power
 * when a voltage drop is observed on the external power source
 * (external battery running out of power).
 */
var YDualPower; // definition below
(function()
{
    //--- (YDualPower implementation)

    /**
     * Returns the logical name of the power control.
     * 
     * @return a string corresponding to the logical name of the power control
     * 
     * On failure, throws an exception or returns YDualPower.LOGICALNAME_INVALID.
     */
    function YDualPower_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the power control.
     * 
     * @return a string corresponding to the logical name of the power control
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDualPower_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the power control. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the power control
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDualPower_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the power control (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the power control (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YDualPower.ADVERTISEDVALUE_INVALID.
     */
    function YDualPower_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the power control (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the power control (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDualPower_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current power source for module functions that require lots of current.
     * 
     * @return a value among YDualPower.POWERSTATE_OFF, YDualPower.POWERSTATE_FROM_USB and
     * YDualPower.POWERSTATE_FROM_EXT corresponding to the current power source for module functions that
     * require lots of current
     * 
     * On failure, throws an exception or returns YDualPower.POWERSTATE_INVALID.
     */
    function YDualPower_get_powerState()
    {   var json_val = this._getAttr('powerState');
        return (json_val == null ? Y_POWERSTATE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current power source for module functions that require lots of current.
     * 
     * @return a value among Y_POWERSTATE_OFF, Y_POWERSTATE_FROM_USB and Y_POWERSTATE_FROM_EXT
     * corresponding to the current power source for module functions that require lots of current
     * 
     * On failure, throws an exception or returns Y_POWERSTATE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDualPower_get_powerState_async(func_callback, obj_context)
    {   this._getAttr_async('powerState',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_POWERSTATE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the selected power source for module functions that require lots of current.
     * 
     * @return a value among YDualPower.POWERCONTROL_AUTO, YDualPower.POWERCONTROL_FROM_USB,
     * YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF corresponding to the selected
     * power source for module functions that require lots of current
     * 
     * On failure, throws an exception or returns YDualPower.POWERCONTROL_INVALID.
     */
    function YDualPower_get_powerControl()
    {   var json_val = this._getAttr('powerControl');
        return (json_val == null ? Y_POWERCONTROL_INVALID : parseInt(json_val));
    }

    /**
     * Returns the selected power source for module functions that require lots of current.
     * 
     * @return a value among Y_POWERCONTROL_AUTO, Y_POWERCONTROL_FROM_USB, Y_POWERCONTROL_FROM_EXT and
     * Y_POWERCONTROL_OFF corresponding to the selected power source for module functions that require lots of current
     * 
     * On failure, throws an exception or returns Y_POWERCONTROL_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDualPower_get_powerControl_async(func_callback, obj_context)
    {   this._getAttr_async('powerControl',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_POWERCONTROL_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the selected power source for module functions that require lots of current.
     * 
     * @param newval : a value among YDualPower.POWERCONTROL_AUTO, YDualPower.POWERCONTROL_FROM_USB,
     * YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF corresponding to the selected
     * power source for module functions that require lots of current
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDualPower_set_powerControl(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('powerControl',rest_val);
    }

    /**
     * Returns the measured voltage on the external power source, in millivolts.
     * 
     * @return an integer corresponding to the measured voltage on the external power source, in millivolts
     * 
     * On failure, throws an exception or returns YDualPower.EXTVOLTAGE_INVALID.
     */
    function YDualPower_get_extVoltage()
    {   var json_val = this._getAttr('extVoltage');
        return (json_val == null ? Y_EXTVOLTAGE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the measured voltage on the external power source, in millivolts.
     * 
     * @return an integer corresponding to the measured voltage on the external power source, in millivolts
     * 
     * On failure, throws an exception or returns Y_EXTVOLTAGE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDualPower_get_extVoltage_async(func_callback, obj_context)
    {   this._getAttr_async('extVoltage',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_EXTVOLTAGE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Continues the enumeration of dual power controls started using yFirstDualPower().
     * 
     * @return a pointer to a YDualPower object, corresponding to
     *         a dual power control currently online, or a null pointer
     *         if there are no more dual power controls to enumerate.
     */
    function YDualPower_nextDualPower()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YDualPower.FindDualPower(next_hwid);
    }

    /**
     * Retrieves a dual power control for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the power control is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDualPower.isOnline() to test if the power control is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power control by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the power control
     * 
     * @return a YDualPower object allowing you to drive the power control.
     */
    function YDualPower_FindDualPower(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('DualPower', str_func);
        if(obj_func) return obj_func;
        return new YDualPower(str_func);
    }

    /**
     * Starts the enumeration of dual power controls currently accessible.
     * Use the method YDualPower.nextDualPower() to iterate on
     * next dual power controls.
     * 
     * @return a pointer to a YDualPower object, corresponding to
     *         the first dual power control currently online, or a null pointer
     *         if there are none.
     */
    function YDualPower_FirstDualPower()
    {
        var next_hwid = YAPI.getFirstHardwareId('DualPower');
        if(next_hwid == null) return null;
        return YDualPower.FindDualPower(next_hwid);
    }

    //--- (end of YDualPower implementation)

    function _YDualPower(str_func)
    {
        //--- (YDualPower constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'DualPower', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.POWERSTATE_OFF                  = 0;
        this.POWERSTATE_FROM_USB             = 1;
        this.POWERSTATE_FROM_EXT             = 2;
        this.POWERSTATE_INVALID              = -1;
        this.POWERCONTROL_AUTO               = 0;
        this.POWERCONTROL_FROM_USB           = 1;
        this.POWERCONTROL_FROM_EXT           = 2;
        this.POWERCONTROL_OFF                = 3;
        this.POWERCONTROL_INVALID            = -1;
        this.EXTVOLTAGE_INVALID              = -1;
        this.get_logicalName                 = YDualPower_get_logicalName;
        this.logicalName                     = YDualPower_get_logicalName;
        this.get_logicalName_async           = YDualPower_get_logicalName_async;
        this.logicalName_async               = YDualPower_get_logicalName_async;
        this.set_logicalName                 = YDualPower_set_logicalName;
        this.setLogicalName                  = YDualPower_set_logicalName;
        this.get_advertisedValue             = YDualPower_get_advertisedValue;
        this.advertisedValue                 = YDualPower_get_advertisedValue;
        this.get_advertisedValue_async       = YDualPower_get_advertisedValue_async;
        this.advertisedValue_async           = YDualPower_get_advertisedValue_async;
        this.get_powerState                  = YDualPower_get_powerState;
        this.powerState                      = YDualPower_get_powerState;
        this.get_powerState_async            = YDualPower_get_powerState_async;
        this.powerState_async                = YDualPower_get_powerState_async;
        this.get_powerControl                = YDualPower_get_powerControl;
        this.powerControl                    = YDualPower_get_powerControl;
        this.get_powerControl_async          = YDualPower_get_powerControl_async;
        this.powerControl_async              = YDualPower_get_powerControl_async;
        this.set_powerControl                = YDualPower_set_powerControl;
        this.setPowerControl                 = YDualPower_set_powerControl;
        this.get_extVoltage                  = YDualPower_get_extVoltage;
        this.extVoltage                      = YDualPower_get_extVoltage;
        this.get_extVoltage_async            = YDualPower_get_extVoltage_async;
        this.extVoltage_async                = YDualPower_get_extVoltage_async;
        this.nextDualPower                   = YDualPower_nextDualPower;
        //--- (end of YDualPower constructor)
    }

    YDualPower = _YDualPower;
    YDualPower.FindDualPower  = YDualPower_FindDualPower;
    YDualPower.FirstDualPower = YDualPower_FirstDualPower;
})();

//--- (DualPower functions)

/**
 * Retrieves a dual power control for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the power control is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDualPower.isOnline() to test if the power control is
 * indeed online at a given time. In case of ambiguity when looking for
 * a dual power control by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the power control
 * 
 * @return a YDualPower object allowing you to drive the power control.
 */
function yFindDualPower(str_func)
{
    return YDualPower.FindDualPower(str_func);
}

/**
 * Starts the enumeration of dual power controls currently accessible.
 * Use the method YDualPower.nextDualPower() to iterate on
 * next dual power controls.
 * 
 * @return a pointer to a YDualPower object, corresponding to
 *         the first dual power control currently online, or a null pointer
 *         if there are none.
 */
function yFirstDualPower()
{
    return YDualPower.FirstDualPower();
}

//--- (end of DualPower functions)
