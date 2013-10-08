/*********************************************************************
 *
 * $Id: pic24config.php 12656 2013-09-07 15:12:26Z mvuilleu $
 *
 * Implements yFindAvgPeriodStart(), the high-level API for AvgPeriodStart functions
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
//--- (YAvgPeriodStart definitions)
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_PERIOD_INVALID                = -1;
var Y_STAMP_INVALID                 = -1;
//--- (end of YAvgPeriodStart definitions)

/**
 * YAvgPeriodStart Class: AvgPeriodStart Interface
 * 
 * The device can work on user-specified averaging periods.
 */
var YAvgPeriodStart; // definition below
(function()
{
    //--- (YAvgPeriodStart implementation)

    /**
     * Returns the logical name of $THEFUNCTION$.
     * 
     * @return a string corresponding to the logical name of $THEFUNCTION$
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YAvgPeriodStart_get_logicalName()
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
    function YAvgPeriodStart_get_logicalName_async(func_callback, obj_context)
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
    function YAvgPeriodStart_set_logicalName(newval)
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
    function YAvgPeriodStart_get_advertisedValue()
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
    function YAvgPeriodStart_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the averaging period duration, in seconds.
     * 
     * @return an integer corresponding to the averaging period duration, in seconds
     * 
     * On failure, throws an exception or returns Y_PERIOD_INVALID.
     */
    function YAvgPeriodStart_get_period()
    {   var json_val = this._getAttr('period');
        return (json_val == null ? Y_PERIOD_INVALID : parseInt(json_val));
    }

    /**
     * Returns the averaging period duration, in seconds.
     * 
     * @return an integer corresponding to the averaging period duration, in seconds
     * 
     * On failure, throws an exception or returns Y_PERIOD_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAvgPeriodStart_get_period_async(func_callback, obj_context)
    {   this._getAttr_async('period',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PERIOD_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the averaging period duration, in seconds.
     * 
     * @param newval : an integer corresponding to the averaging period duration, in seconds
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YAvgPeriodStart_set_period(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('period',rest_val);
    }

    /**
     * Returns the final timestamp of the last period.
     * 
     * @return an integer corresponding to the final timestamp of the last period
     * 
     * On failure, throws an exception or returns Y_STAMP_INVALID.
     */
    function YAvgPeriodStart_get_stamp()
    {   var json_val = this._getAttr('stamp');
        return (json_val == null ? Y_STAMP_INVALID : parseInt(json_val));
    }

    /**
     * Returns the final timestamp of the last period.
     * 
     * @return an integer corresponding to the final timestamp of the last period
     * 
     * On failure, throws an exception or returns Y_STAMP_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YAvgPeriodStart_get_stamp_async(func_callback, obj_context)
    {   this._getAttr_async('stamp',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_STAMP_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Continues the enumeration of $FUNCTIONS$ started using yFirstAvgPeriodStart().
     * 
     * @return a pointer to a YAvgPeriodStart object, corresponding to
     *         $AFUNCTION$ currently online, or a null pointer
     *         if there are no more $FUNCTIONS$ to enumerate.
     */
    function YAvgPeriodStart_nextAvgPeriodStart()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YAvgPeriodStart.FindAvgPeriodStart(next_hwid);
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
     * Use the method YAvgPeriodStart.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes $THEFUNCTION$
     * 
     * @return a YAvgPeriodStart object allowing you to drive $THEFUNCTION$.
     */
    function YAvgPeriodStart_FindAvgPeriodStart(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('AvgPeriodStart', str_func);
        if(obj_func) return obj_func;
        return new YAvgPeriodStart(str_func);
    }

    /**
     * Starts the enumeration of $FUNCTIONS$ currently accessible.
     * Use the method YAvgPeriodStart.nextAvgPeriodStart() to iterate on
     * next $FUNCTIONS$.
     * 
     * @return a pointer to a YAvgPeriodStart object, corresponding to
     *         $THEFIRSTFUNCTION$ currently online, or a null pointer
     *         if there are none.
     */
    function YAvgPeriodStart_FirstAvgPeriodStart()
    {
        var next_hwid = YAPI.getFirstHardwareId('AvgPeriodStart');
        if(next_hwid == null) return null;
        return YAvgPeriodStart.FindAvgPeriodStart(next_hwid);
    }

    //--- (end of YAvgPeriodStart implementation)

    function _YAvgPeriodStart(str_func)
    {
        //--- (YAvgPeriodStart constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'AvgPeriodStart', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.PERIOD_INVALID                  = -1;
        this.STAMP_INVALID                   = -1;
        this.get_logicalName                 = YAvgPeriodStart_get_logicalName;
        this.logicalName                     = YAvgPeriodStart_get_logicalName;
        this.get_logicalName_async           = YAvgPeriodStart_get_logicalName_async;
        this.logicalName_async               = YAvgPeriodStart_get_logicalName_async;
        this.set_logicalName                 = YAvgPeriodStart_set_logicalName;
        this.setLogicalName                  = YAvgPeriodStart_set_logicalName;
        this.get_advertisedValue             = YAvgPeriodStart_get_advertisedValue;
        this.advertisedValue                 = YAvgPeriodStart_get_advertisedValue;
        this.get_advertisedValue_async       = YAvgPeriodStart_get_advertisedValue_async;
        this.advertisedValue_async           = YAvgPeriodStart_get_advertisedValue_async;
        this.get_period                      = YAvgPeriodStart_get_period;
        this.period                          = YAvgPeriodStart_get_period;
        this.get_period_async                = YAvgPeriodStart_get_period_async;
        this.period_async                    = YAvgPeriodStart_get_period_async;
        this.set_period                      = YAvgPeriodStart_set_period;
        this.setPeriod                       = YAvgPeriodStart_set_period;
        this.get_stamp                       = YAvgPeriodStart_get_stamp;
        this.stamp                           = YAvgPeriodStart_get_stamp;
        this.get_stamp_async                 = YAvgPeriodStart_get_stamp_async;
        this.stamp_async                     = YAvgPeriodStart_get_stamp_async;
        this.nextAvgPeriodStart              = YAvgPeriodStart_nextAvgPeriodStart;
        //--- (end of YAvgPeriodStart constructor)
    }

    YAvgPeriodStart = _YAvgPeriodStart;
    YAvgPeriodStart.FindAvgPeriodStart  = YAvgPeriodStart_FindAvgPeriodStart;
    YAvgPeriodStart.FirstAvgPeriodStart = YAvgPeriodStart_FirstAvgPeriodStart;
})();

//--- (AvgPeriodStart functions)

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
 * Use the method YAvgPeriodStart.isOnline() to test if $THEFUNCTION$ is
 * indeed online at a given time. In case of ambiguity when looking for
 * $AFUNCTION$ by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes $THEFUNCTION$
 * 
 * @return a YAvgPeriodStart object allowing you to drive $THEFUNCTION$.
 */
function yFindAvgPeriodStart(str_func)
{
    return YAvgPeriodStart.FindAvgPeriodStart(str_func);
}

/**
 * Starts the enumeration of $FUNCTIONS$ currently accessible.
 * Use the method YAvgPeriodStart.nextAvgPeriodStart() to iterate on
 * next $FUNCTIONS$.
 * 
 * @return a pointer to a YAvgPeriodStart object, corresponding to
 *         $THEFIRSTFUNCTION$ currently online, or a null pointer
 *         if there are none.
 */
function yFirstAvgPeriodStart()
{
    return YAvgPeriodStart.FirstAvgPeriodStart();
}

//--- (end of AvgPeriodStart functions)
