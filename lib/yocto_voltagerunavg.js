/*********************************************************************
 *
 * $Id: pic24config.php 12656 2013-09-07 15:12:26Z mvuilleu $
 *
 * Implements yFindVoltageRunAvg(), the high-level API for VoltageRunAvg functions
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
//--- (YVoltageRunAvg definitions)
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_UNIT_INVALID                  = "!INVALID!";
var Y_RUNNINGAVERAGE_INVALID        = -Number.MAX_VALUE;
//--- (end of YVoltageRunAvg definitions)

/**
 * YVoltageRunAvg Class: VoltageRunAvg Interface
 * 
 * 
 */
var YVoltageRunAvg; // definition below
(function()
{
    //--- (YVoltageRunAvg implementation)

    /**
     * Returns the logical name of $THEFUNCTION$.
     * 
     * @return a string corresponding to the logical name of $THEFUNCTION$
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YVoltageRunAvg_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of $THEFUNCTION$.
     * 
     * @return a string corresponding to the logical name of $THEFUNCTION$
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVoltageRunAvg_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of $THEFUNCTION$. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of $THEFUNCTION$
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YVoltageRunAvg_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of $THEFUNCTION$ (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of $THEFUNCTION$ (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YVoltageRunAvg_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of $THEFUNCTION$ (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of $THEFUNCTION$ (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVoltageRunAvg_get_advertisedValue_async(func_callback, obj_context)
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
    function YVoltageRunAvg_get_unit()
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
    function YVoltageRunAvg_get_unit_async(func_callback, obj_context)
    {   this._getAttr_async('unit',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_UNIT_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the average voltage in Volts, as a floating point number.
     * 
     * @return a floating point number corresponding to the average voltage in Volts, as a floating point number
     * 
     * On failure, throws an exception or returns Y_RUNNINGAVERAGE_INVALID.
     */
    function YVoltageRunAvg_get_runningAverage()
    {   var json_val = this._getAttr('runningAverage');
        return (json_val == null ? Y_RUNNINGAVERAGE_INVALID : json_val/65536.0);
    }

    /**
     * Returns the average voltage in Volts, as a floating point number.
     * 
     * @return a floating point number corresponding to the average voltage in Volts, as a floating point number
     * 
     * On failure, throws an exception or returns Y_RUNNINGAVERAGE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YVoltageRunAvg_get_runningAverage_async(func_callback, obj_context)
    {   this._getAttr_async('runningAverage',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RUNNINGAVERAGE_INVALID : json_val/65536.0);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Continues the enumeration of $FUNCTIONS$ started using yFirstVoltageRunAvg().
     * 
     * @return a pointer to a YVoltageRunAvg object, corresponding to
     *         $AFUNCTION$ currently online, or a null pointer
     *         if there are no more $FUNCTIONS$ to enumerate.
     */
    function YVoltageRunAvg_nextVoltageRunAvg()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YVoltageRunAvg.FindVoltageRunAvg(next_hwid);
    }

    /**
     * Retrieves $AFUNCTION$ for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that $THEFUNCTION$ is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltageRunAvg.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes $THEFUNCTION$
     * 
     * @return a YVoltageRunAvg object allowing you to drive $THEFUNCTION$.
     */
    function YVoltageRunAvg_FindVoltageRunAvg(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('VoltageRunAvg', str_func);
        if(obj_func) return obj_func;
        return new YVoltageRunAvg(str_func);
    }

    /**
     * Starts the enumeration of $FUNCTIONS$ currently accessible.
     * Use the method YVoltageRunAvg.nextVoltageRunAvg() to iterate on
     * next $FUNCTIONS$.
     * 
     * @return a pointer to a YVoltageRunAvg object, corresponding to
     *         $THEFIRSTFUNCTION$ currently online, or a null pointer
     *         if there are none.
     */
    function YVoltageRunAvg_FirstVoltageRunAvg()
    {
        var next_hwid = YAPI.getFirstHardwareId('VoltageRunAvg');
        if(next_hwid == null) return null;
        return YVoltageRunAvg.FindVoltageRunAvg(next_hwid);
    }

    //--- (end of YVoltageRunAvg implementation)

    function _YVoltageRunAvg(str_func)
    {
        //--- (YVoltageRunAvg constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'VoltageRunAvg', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.UNIT_INVALID                    = "!INVALID!";
        this.RUNNINGAVERAGE_INVALID          = -Number.MAX_VALUE;
        this.get_logicalName                 = YVoltageRunAvg_get_logicalName;
        this.logicalName                     = YVoltageRunAvg_get_logicalName;
        this.get_logicalName_async           = YVoltageRunAvg_get_logicalName_async;
        this.logicalName_async               = YVoltageRunAvg_get_logicalName_async;
        this.set_logicalName                 = YVoltageRunAvg_set_logicalName;
        this.setLogicalName                  = YVoltageRunAvg_set_logicalName;
        this.get_advertisedValue             = YVoltageRunAvg_get_advertisedValue;
        this.advertisedValue                 = YVoltageRunAvg_get_advertisedValue;
        this.get_advertisedValue_async       = YVoltageRunAvg_get_advertisedValue_async;
        this.advertisedValue_async           = YVoltageRunAvg_get_advertisedValue_async;
        this.get_unit                        = YVoltageRunAvg_get_unit;
        this.unit                            = YVoltageRunAvg_get_unit;
        this.get_unit_async                  = YVoltageRunAvg_get_unit_async;
        this.unit_async                      = YVoltageRunAvg_get_unit_async;
        this.get_runningAverage              = YVoltageRunAvg_get_runningAverage;
        this.runningAverage                  = YVoltageRunAvg_get_runningAverage;
        this.get_runningAverage_async        = YVoltageRunAvg_get_runningAverage_async;
        this.runningAverage_async            = YVoltageRunAvg_get_runningAverage_async;
        this.nextVoltageRunAvg               = YVoltageRunAvg_nextVoltageRunAvg;
        //--- (end of YVoltageRunAvg constructor)
    }

    YVoltageRunAvg = _YVoltageRunAvg;
    YVoltageRunAvg.FindVoltageRunAvg  = YVoltageRunAvg_FindVoltageRunAvg;
    YVoltageRunAvg.FirstVoltageRunAvg = YVoltageRunAvg_FirstVoltageRunAvg;
})();

//--- (VoltageRunAvg functions)

/**
 * Retrieves $AFUNCTION$ for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that $THEFUNCTION$ is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YVoltageRunAvg.isOnline() to test if $THEFUNCTION$ is
 * indeed online at a given time. In case of ambiguity when looking for
 * $AFUNCTION$ by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes $THEFUNCTION$
 * 
 * @return a YVoltageRunAvg object allowing you to drive $THEFUNCTION$.
 */
function yFindVoltageRunAvg(str_func)
{
    return YVoltageRunAvg.FindVoltageRunAvg(str_func);
}

/**
 * Starts the enumeration of $FUNCTIONS$ currently accessible.
 * Use the method YVoltageRunAvg.nextVoltageRunAvg() to iterate on
 * next $FUNCTIONS$.
 * 
 * @return a pointer to a YVoltageRunAvg object, corresponding to
 *         $THEFIRSTFUNCTION$ currently online, or a null pointer
 *         if there are none.
 */
function yFirstVoltageRunAvg()
{
    return YVoltageRunAvg.FirstVoltageRunAvg();
}

//--- (end of VoltageRunAvg functions)