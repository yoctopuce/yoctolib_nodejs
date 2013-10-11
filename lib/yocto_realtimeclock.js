/*********************************************************************
 *
 * $Id: yocto_realtimeclock.js 13065 2013-10-10 16:04:55Z mvuilleu $
 *
 * Implements yFindRealTimeClock(), the high-level API for RealTimeClock functions
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
//--- (YRealTimeClock definitions)
var Y_TIMESET_FALSE                 = 0;
var Y_TIMESET_TRUE                  = 1;
var Y_TIMESET_INVALID               = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_UNIXTIME_INVALID              = -1;
var Y_DATETIME_INVALID              = "!INVALID!";
var Y_UTCOFFSET_INVALID             = Number.NEGATIVE_INFINITY;
//--- (end of YRealTimeClock definitions)

/**
 * YRealTimeClock Class: Real Time Clock function interface
 * 
 * The RealTimeClock function maintains and provides current date and time, even accross power cut
 * lasting several days. It is the base for automated wake-up functions provided by the WakeUpScheduler.
 * The current time may represent a local time as well as an UTC time, but no automatic time change
 * will occur to account for daylight saving time.
 */
var YRealTimeClock; // definition below
(function()
{
    //--- (YRealTimeClock implementation)

    /**
     * Returns the logical name of the clock.
     * 
     * @return a string corresponding to the logical name of the clock
     * 
     * On failure, throws an exception or returns YRealTimeClock.LOGICALNAME_INVALID.
     */
    function YRealTimeClock_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Gets the logical name of the clock.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRealTimeClock object that invoked the callback
     *         - the result:a string corresponding to the logical name of the clo
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YRealTimeClock_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the clock. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the clock
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRealTimeClock_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the clock (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the clock (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YRealTimeClock.ADVERTISEDVALUE_INVALID.
     */
    function YRealTimeClock_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Gets the current value of the clock (no more than 6 characters).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRealTimeClock object that invoked the callback
     *         - the result:a string corresponding to the current value of the clock (no more than 6 character
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YRealTimeClock_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current time in Unix format (number of elapsed seconds since Jan 1st, 1970).
     * 
     * @return an integer corresponding to the current time in Unix format (number of elapsed seconds
     * since Jan 1st, 1970)
     * 
     * On failure, throws an exception or returns YRealTimeClock.UNIXTIME_INVALID.
     */
    function YRealTimeClock_get_unixTime()
    {   var json_val = this._getAttr('unixTime');
        return (json_val == null ? Y_UNIXTIME_INVALID : parseInt(json_val));
    }

    /**
     * Gets the current time in Unix format (number of elapsed seconds since Jan 1st, 1970).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRealTimeClock object that invoked the callback
     *         - the result:an integer corresponding to the current time in Unix format (number of elapsed seconds
     *         since Jan 1st, 197
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_UNIXTIME_INVALID.
     */
    function YRealTimeClock_get_unixTime_async(func_callback, obj_context)
    {   this._getAttr_async('unixTime',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_UNIXTIME_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the current time. Time is specifid in Unix format (number of elapsed seconds since Jan 1st, 1970).
     * If current UTC time is known, utcOffset will be automatically adjusted for the new specified time.
     * 
     * @param newval : an integer corresponding to the current time
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRealTimeClock_set_unixTime(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('unixTime',rest_val);
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss"
     * 
     * @return a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     * 
     * On failure, throws an exception or returns YRealTimeClock.DATETIME_INVALID.
     */
    function YRealTimeClock_get_dateTime()
    {   var json_val = this._getAttr('dateTime');
        return (json_val == null ? Y_DATETIME_INVALID : json_val);
    }

    /**
     * Gets the current time in the form "YYYY/MM/DD hh:mm:ss"
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRealTimeClock object that invoked the callback
     *         - the result:a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:s
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_DATETIME_INVALID.
     */
    function YRealTimeClock_get_dateTime_async(func_callback, obj_context)
    {   this._getAttr_async('dateTime',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_DATETIME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     * 
     * @return an integer corresponding to the number of seconds between current time and UTC time (time zone)
     * 
     * On failure, throws an exception or returns YRealTimeClock.UTCOFFSET_INVALID.
     */
    function YRealTimeClock_get_utcOffset()
    {   var json_val = this._getAttr('utcOffset');
        return (json_val == null ? Y_UTCOFFSET_INVALID : parseInt(json_val));
    }

    /**
     * Gets the number of seconds between current time and UTC time (time zone).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRealTimeClock object that invoked the callback
     *         - the result:an integer corresponding to the number of seconds between current time and UTC time (time zon
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_UTCOFFSET_INVALID.
     */
    function YRealTimeClock_get_utcOffset_async(func_callback, obj_context)
    {   this._getAttr_async('utcOffset',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_UTCOFFSET_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * If current UTC time is known, the current time will automatically be updated according to the
     * selected time zone.
     * 
     * @param newval : an integer corresponding to the number of seconds between current time and UTC time (time zone)
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRealTimeClock_set_utcOffset(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('utcOffset',rest_val);
    }

    /**
     * Returns true if the clock has been set, and false otherwise.
     * 
     * @return either YRealTimeClock.TIMESET_FALSE or YRealTimeClock.TIMESET_TRUE, according to true if
     * the clock has been set, and false otherwise
     * 
     * On failure, throws an exception or returns YRealTimeClock.TIMESET_INVALID.
     */
    function YRealTimeClock_get_timeSet()
    {   var json_val = this._getAttr('timeSet');
        return (json_val == null ? Y_TIMESET_INVALID : parseInt(json_val));
    }

    /**
     * Gets true if the clock has been set, and false otherwise.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRealTimeClock object that invoked the callback
     *         - the result:either Y_TIMESET_FALSE or Y_TIMESET_TRUE, according to true if the clock has been set,
     *         and false otherwi
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_TIMESET_INVALID.
     */
    function YRealTimeClock_get_timeSet_async(func_callback, obj_context)
    {   this._getAttr_async('timeSet',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_TIMESET_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Continues the enumeration of clocks started using yFirstRealTimeClock().
     * 
     * @return a pointer to a YRealTimeClock object, corresponding to
     *         a clock currently online, or a null pointer
     *         if there are no more clocks to enumerate.
     */
    function YRealTimeClock_nextRealTimeClock()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YRealTimeClock.FindRealTimeClock(next_hwid);
    }

    /**
     * Retrieves a clock for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the clock is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRealTimeClock.isOnline() to test if the clock is
     * indeed online at a given time. In case of ambiguity when looking for
     * a clock by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the clock
     * 
     * @return a YRealTimeClock object allowing you to drive the clock.
     */
    function YRealTimeClock_FindRealTimeClock(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('RealTimeClock', str_func);
        if(obj_func) return obj_func;
        return new YRealTimeClock(str_func);
    }

    /**
     * Starts the enumeration of clocks currently accessible.
     * Use the method YRealTimeClock.nextRealTimeClock() to iterate on
     * next clocks.
     * 
     * @return a pointer to a YRealTimeClock object, corresponding to
     *         the first clock currently online, or a null pointer
     *         if there are none.
     */
    function YRealTimeClock_FirstRealTimeClock()
    {
        var next_hwid = YAPI.getFirstHardwareId('RealTimeClock');
        if(next_hwid == null) return null;
        return YRealTimeClock.FindRealTimeClock(next_hwid);
    }

    //--- (end of YRealTimeClock implementation)

    function _YRealTimeClock(str_func)
    {
        //--- (YRealTimeClock constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'RealTimeClock', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.UNIXTIME_INVALID                = -1;
        this.DATETIME_INVALID                = "!INVALID!";
        this.UTCOFFSET_INVALID               = Number.NEGATIVE_INFINITY;
        this.TIMESET_FALSE                   = 0;
        this.TIMESET_TRUE                    = 1;
        this.TIMESET_INVALID                 = -1;
        this.get_logicalName                 = YRealTimeClock_get_logicalName;
        this.logicalName                     = YRealTimeClock_get_logicalName;
        this.get_logicalName_async           = YRealTimeClock_get_logicalName_async;
        this.logicalName_async               = YRealTimeClock_get_logicalName_async;
        this.set_logicalName                 = YRealTimeClock_set_logicalName;
        this.setLogicalName                  = YRealTimeClock_set_logicalName;
        this.get_advertisedValue             = YRealTimeClock_get_advertisedValue;
        this.advertisedValue                 = YRealTimeClock_get_advertisedValue;
        this.get_advertisedValue_async       = YRealTimeClock_get_advertisedValue_async;
        this.advertisedValue_async           = YRealTimeClock_get_advertisedValue_async;
        this.get_unixTime                    = YRealTimeClock_get_unixTime;
        this.unixTime                        = YRealTimeClock_get_unixTime;
        this.get_unixTime_async              = YRealTimeClock_get_unixTime_async;
        this.unixTime_async                  = YRealTimeClock_get_unixTime_async;
        this.set_unixTime                    = YRealTimeClock_set_unixTime;
        this.setUnixTime                     = YRealTimeClock_set_unixTime;
        this.get_dateTime                    = YRealTimeClock_get_dateTime;
        this.dateTime                        = YRealTimeClock_get_dateTime;
        this.get_dateTime_async              = YRealTimeClock_get_dateTime_async;
        this.dateTime_async                  = YRealTimeClock_get_dateTime_async;
        this.get_utcOffset                   = YRealTimeClock_get_utcOffset;
        this.utcOffset                       = YRealTimeClock_get_utcOffset;
        this.get_utcOffset_async             = YRealTimeClock_get_utcOffset_async;
        this.utcOffset_async                 = YRealTimeClock_get_utcOffset_async;
        this.set_utcOffset                   = YRealTimeClock_set_utcOffset;
        this.setUtcOffset                    = YRealTimeClock_set_utcOffset;
        this.get_timeSet                     = YRealTimeClock_get_timeSet;
        this.timeSet                         = YRealTimeClock_get_timeSet;
        this.get_timeSet_async               = YRealTimeClock_get_timeSet_async;
        this.timeSet_async                   = YRealTimeClock_get_timeSet_async;
        this.nextRealTimeClock               = YRealTimeClock_nextRealTimeClock;
        //--- (end of YRealTimeClock constructor)
    }

    YRealTimeClock = _YRealTimeClock;
    YRealTimeClock.LOGICALNAME_INVALID             = "!INVALID!";
    YRealTimeClock.ADVERTISEDVALUE_INVALID         = "!INVALID!";
    YRealTimeClock.UNIXTIME_INVALID                = -1;
    YRealTimeClock.DATETIME_INVALID                = "!INVALID!";
    YRealTimeClock.UTCOFFSET_INVALID               = Number.NEGATIVE_INFINITY;
    YRealTimeClock.TIMESET_FALSE                   = 0;
    YRealTimeClock.TIMESET_TRUE                    = 1;
    YRealTimeClock.TIMESET_INVALID                 = -1;
    YRealTimeClock.FindRealTimeClock  = YRealTimeClock_FindRealTimeClock;
    YRealTimeClock.FirstRealTimeClock = YRealTimeClock_FirstRealTimeClock;
})();

//--- (RealTimeClock functions)

/**
 * Retrieves a clock for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the clock is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YRealTimeClock.isOnline() to test if the clock is
 * indeed online at a given time. In case of ambiguity when looking for
 * a clock by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the clock
 * 
 * @return a YRealTimeClock object allowing you to drive the clock.
 */
function yFindRealTimeClock(str_func)
{
    return YRealTimeClock.FindRealTimeClock(str_func);
}

/**
 * Starts the enumeration of clocks currently accessible.
 * Use the method YRealTimeClock.nextRealTimeClock() to iterate on
 * next clocks.
 * 
 * @return a pointer to a YRealTimeClock object, corresponding to
 *         the first clock currently online, or a null pointer
 *         if there are none.
 */
function yFirstRealTimeClock()
{
    return YRealTimeClock.FirstRealTimeClock();
}

//--- (end of RealTimeClock functions)
