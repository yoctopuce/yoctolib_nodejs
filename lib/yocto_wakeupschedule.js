/*********************************************************************
 *
 * $Id: yocto_wakeupschedule.js 13052 2013-10-10 14:33:45Z mvuilleu $
 *
 * Implements yFindWakeUpSchedule(), the high-level API for WakeUpSchedule functions
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
//--- (YWakeUpSchedule definitions)
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_MINUTESA_INVALID              = -1;
var Y_MINUTESB_INVALID              = -1;
var Y_HOURS_INVALID                 = -1;
var Y_WEEKDAYS_INVALID              = -1;
var Y_MONTHDAYS_INVALID             = -1;
var Y_MONTHS_INVALID                = -1;
var Y_NEXTOCCURENCE_INVALID         = -1;
//--- (end of YWakeUpSchedule definitions)

/**
 * YWakeUpSchedule Class: WakeUpSchedule function interface
 * 
 * The WakeUpSchedule function implements a wakeup condition. The wakeup time is
 * specified as a set of months and/or days and/or hours and/or minutes when the
 * wakeup should happen.
 */
var YWakeUpSchedule; // definition below
(function()
{
    //--- (YWakeUpSchedule implementation)

    /**
     * Returns the logical name of the wakeup schedule.
     * 
     * @return a string corresponding to the logical name of the wakeup schedule
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.LOGICALNAME_INVALID.
     */
    function YWakeUpSchedule_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the wakeup schedule.
     * 
     * @return a string corresponding to the logical name of the wakeup schedule
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpSchedule_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the wakeup schedule. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the wakeup schedule
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpSchedule_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the wakeup schedule (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the wakeup schedule (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.ADVERTISEDVALUE_INVALID.
     */
    function YWakeUpSchedule_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the wakeup schedule (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the wakeup schedule (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpSchedule_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the minutes 00-29 of each hour scheduled for wakeup.
     * 
     * @return an integer corresponding to the minutes 00-29 of each hour scheduled for wakeup
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.MINUTESA_INVALID.
     */
    function YWakeUpSchedule_get_minutesA()
    {   var json_val = this._getAttr('minutesA');
        return (json_val == null ? Y_MINUTESA_INVALID : parseInt(json_val));
    }

    /**
     * Returns the minutes 00-29 of each hour scheduled for wakeup.
     * 
     * @return an integer corresponding to the minutes 00-29 of each hour scheduled for wakeup
     * 
     * On failure, throws an exception or returns Y_MINUTESA_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpSchedule_get_minutesA_async(func_callback, obj_context)
    {   this._getAttr_async('minutesA',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_MINUTESA_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the minutes 00-29 when a wakeup must take place.
     * 
     * @param newval : an integer corresponding to the minutes 00-29 when a wakeup must take place
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpSchedule_set_minutesA(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('minutesA',rest_val);
    }

    /**
     * Returns the minutes 30-59 of each hour scheduled for wakeup.
     * 
     * @return an integer corresponding to the minutes 30-59 of each hour scheduled for wakeup
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.MINUTESB_INVALID.
     */
    function YWakeUpSchedule_get_minutesB()
    {   var json_val = this._getAttr('minutesB');
        return (json_val == null ? Y_MINUTESB_INVALID : parseInt(json_val));
    }

    /**
     * Returns the minutes 30-59 of each hour scheduled for wakeup.
     * 
     * @return an integer corresponding to the minutes 30-59 of each hour scheduled for wakeup
     * 
     * On failure, throws an exception or returns Y_MINUTESB_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpSchedule_get_minutesB_async(func_callback, obj_context)
    {   this._getAttr_async('minutesB',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_MINUTESB_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the minutes 30-59 when a wake up must take place.
     * 
     * @param newval : an integer corresponding to the minutes 30-59 when a wake up must take place
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpSchedule_set_minutesB(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('minutesB',rest_val);
    }

    /**
     * Returns the hours scheduled for wakeup.
     * 
     * @return an integer corresponding to the hours scheduled for wakeup
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.HOURS_INVALID.
     */
    function YWakeUpSchedule_get_hours()
    {   var json_val = this._getAttr('hours');
        return (json_val == null ? Y_HOURS_INVALID : parseInt(json_val));
    }

    /**
     * Returns the hours scheduled for wakeup.
     * 
     * @return an integer corresponding to the hours scheduled for wakeup
     * 
     * On failure, throws an exception or returns Y_HOURS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpSchedule_get_hours_async(func_callback, obj_context)
    {   this._getAttr_async('hours',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_HOURS_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the hours when a wakeup must take place.
     * 
     * @param newval : an integer corresponding to the hours when a wakeup must take place
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpSchedule_set_hours(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('hours',rest_val);
    }

    /**
     * Returns the days of week scheduled for wakeup.
     * 
     * @return an integer corresponding to the days of week scheduled for wakeup
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.WEEKDAYS_INVALID.
     */
    function YWakeUpSchedule_get_weekDays()
    {   var json_val = this._getAttr('weekDays');
        return (json_val == null ? Y_WEEKDAYS_INVALID : parseInt(json_val));
    }

    /**
     * Returns the days of week scheduled for wakeup.
     * 
     * @return an integer corresponding to the days of week scheduled for wakeup
     * 
     * On failure, throws an exception or returns Y_WEEKDAYS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpSchedule_get_weekDays_async(func_callback, obj_context)
    {   this._getAttr_async('weekDays',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_WEEKDAYS_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the days of the week when a wakeup must take place.
     * 
     * @param newval : an integer corresponding to the days of the week when a wakeup must take place
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpSchedule_set_weekDays(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('weekDays',rest_val);
    }

    /**
     * Returns the days of week scheduled for wakeup.
     * 
     * @return an integer corresponding to the days of week scheduled for wakeup
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.MONTHDAYS_INVALID.
     */
    function YWakeUpSchedule_get_monthDays()
    {   var json_val = this._getAttr('monthDays');
        return (json_val == null ? Y_MONTHDAYS_INVALID : parseInt(json_val));
    }

    /**
     * Returns the days of week scheduled for wakeup.
     * 
     * @return an integer corresponding to the days of week scheduled for wakeup
     * 
     * On failure, throws an exception or returns Y_MONTHDAYS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpSchedule_get_monthDays_async(func_callback, obj_context)
    {   this._getAttr_async('monthDays',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_MONTHDAYS_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the days of the week when a wakeup must take place.
     * 
     * @param newval : an integer corresponding to the days of the week when a wakeup must take place
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpSchedule_set_monthDays(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('monthDays',rest_val);
    }

    /**
     * Returns the days of week scheduled for wakeup.
     * 
     * @return an integer corresponding to the days of week scheduled for wakeup
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.MONTHS_INVALID.
     */
    function YWakeUpSchedule_get_months()
    {   var json_val = this._getAttr('months');
        return (json_val == null ? Y_MONTHS_INVALID : parseInt(json_val));
    }

    /**
     * Returns the days of week scheduled for wakeup.
     * 
     * @return an integer corresponding to the days of week scheduled for wakeup
     * 
     * On failure, throws an exception or returns Y_MONTHS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpSchedule_get_months_async(func_callback, obj_context)
    {   this._getAttr_async('months',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_MONTHS_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the days of the week when a wakeup must take place.
     * 
     * @param newval : an integer corresponding to the days of the week when a wakeup must take place
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpSchedule_set_months(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('months',rest_val);
    }

    /**
     * Returns the date/time (seconds) of the next wakeup occurence
     * 
     * @return an integer corresponding to the date/time (seconds) of the next wakeup occurence
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.NEXTOCCURENCE_INVALID.
     */
    function YWakeUpSchedule_get_nextOccurence()
    {   var json_val = this._getAttr('nextOccurence');
        return (json_val == null ? Y_NEXTOCCURENCE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the date/time (seconds) of the next wakeup occurence
     * 
     * @return an integer corresponding to the date/time (seconds) of the next wakeup occurence
     * 
     * On failure, throws an exception or returns Y_NEXTOCCURENCE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YWakeUpSchedule_get_nextOccurence_async(func_callback, obj_context)
    {   this._getAttr_async('nextOccurence',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_NEXTOCCURENCE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns all the minutes of each hour that are scheduled for wakeup.
     */
    function YWakeUpSchedule_get_minutes()
    {
        var res; // type: long;
        res = this.get_minutesB();
        res = res << 30;
        res = res + this.get_minutesA();
        return res;
        
    }

    /**
     * Changes all the minutes where a wake up must take place.
     * 
     * @param bitmap : Minutes 00-59 of each hour scheduled for wakeup.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpSchedule_set_minutes(long_bitmap)
    {
        this.set_minutesA(long_bitmap & 0x3fffffff);
        long_bitmap = long_bitmap >> 30;
        return this.set_minutesB(long_bitmap & 0x3fffffff);
        
    }

    /**
     * Continues the enumeration of wakeup schedules started using yFirstWakeUpSchedule().
     * 
     * @return a pointer to a YWakeUpSchedule object, corresponding to
     *         a wakeup schedule currently online, or a null pointer
     *         if there are no more wakeup schedules to enumerate.
     */
    function YWakeUpSchedule_nextWakeUpSchedule()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpSchedule(next_hwid);
    }

    /**
     * Retrieves a wakeup schedule for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the wakeup schedule is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpSchedule.isOnline() to test if the wakeup schedule is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wakeup schedule by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the wakeup schedule
     * 
     * @return a YWakeUpSchedule object allowing you to drive the wakeup schedule.
     */
    function YWakeUpSchedule_FindWakeUpSchedule(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('WakeUpSchedule', str_func);
        if(obj_func) return obj_func;
        return new YWakeUpSchedule(str_func);
    }

    /**
     * Starts the enumeration of wakeup schedules currently accessible.
     * Use the method YWakeUpSchedule.nextWakeUpSchedule() to iterate on
     * next wakeup schedules.
     * 
     * @return a pointer to a YWakeUpSchedule object, corresponding to
     *         the first wakeup schedule currently online, or a null pointer
     *         if there are none.
     */
    function YWakeUpSchedule_FirstWakeUpSchedule()
    {
        var next_hwid = YAPI.getFirstHardwareId('WakeUpSchedule');
        if(next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpSchedule(next_hwid);
    }

    //--- (end of YWakeUpSchedule implementation)

    function _YWakeUpSchedule(str_func)
    {
        //--- (YWakeUpSchedule constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'WakeUpSchedule', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.MINUTESA_INVALID                = -1;
        this.MINUTESB_INVALID                = -1;
        this.HOURS_INVALID                   = -1;
        this.WEEKDAYS_INVALID                = -1;
        this.MONTHDAYS_INVALID               = -1;
        this.MONTHS_INVALID                  = -1;
        this.NEXTOCCURENCE_INVALID           = -1;
        this.get_logicalName                 = YWakeUpSchedule_get_logicalName;
        this.logicalName                     = YWakeUpSchedule_get_logicalName;
        this.get_logicalName_async           = YWakeUpSchedule_get_logicalName_async;
        this.logicalName_async               = YWakeUpSchedule_get_logicalName_async;
        this.set_logicalName                 = YWakeUpSchedule_set_logicalName;
        this.setLogicalName                  = YWakeUpSchedule_set_logicalName;
        this.get_advertisedValue             = YWakeUpSchedule_get_advertisedValue;
        this.advertisedValue                 = YWakeUpSchedule_get_advertisedValue;
        this.get_advertisedValue_async       = YWakeUpSchedule_get_advertisedValue_async;
        this.advertisedValue_async           = YWakeUpSchedule_get_advertisedValue_async;
        this.get_minutesA                    = YWakeUpSchedule_get_minutesA;
        this.minutesA                        = YWakeUpSchedule_get_minutesA;
        this.get_minutesA_async              = YWakeUpSchedule_get_minutesA_async;
        this.minutesA_async                  = YWakeUpSchedule_get_minutesA_async;
        this.set_minutesA                    = YWakeUpSchedule_set_minutesA;
        this.setMinutesA                     = YWakeUpSchedule_set_minutesA;
        this.get_minutesB                    = YWakeUpSchedule_get_minutesB;
        this.minutesB                        = YWakeUpSchedule_get_minutesB;
        this.get_minutesB_async              = YWakeUpSchedule_get_minutesB_async;
        this.minutesB_async                  = YWakeUpSchedule_get_minutesB_async;
        this.set_minutesB                    = YWakeUpSchedule_set_minutesB;
        this.setMinutesB                     = YWakeUpSchedule_set_minutesB;
        this.get_hours                       = YWakeUpSchedule_get_hours;
        this.hours                           = YWakeUpSchedule_get_hours;
        this.get_hours_async                 = YWakeUpSchedule_get_hours_async;
        this.hours_async                     = YWakeUpSchedule_get_hours_async;
        this.set_hours                       = YWakeUpSchedule_set_hours;
        this.setHours                        = YWakeUpSchedule_set_hours;
        this.get_weekDays                    = YWakeUpSchedule_get_weekDays;
        this.weekDays                        = YWakeUpSchedule_get_weekDays;
        this.get_weekDays_async              = YWakeUpSchedule_get_weekDays_async;
        this.weekDays_async                  = YWakeUpSchedule_get_weekDays_async;
        this.set_weekDays                    = YWakeUpSchedule_set_weekDays;
        this.setWeekDays                     = YWakeUpSchedule_set_weekDays;
        this.get_monthDays                   = YWakeUpSchedule_get_monthDays;
        this.monthDays                       = YWakeUpSchedule_get_monthDays;
        this.get_monthDays_async             = YWakeUpSchedule_get_monthDays_async;
        this.monthDays_async                 = YWakeUpSchedule_get_monthDays_async;
        this.set_monthDays                   = YWakeUpSchedule_set_monthDays;
        this.setMonthDays                    = YWakeUpSchedule_set_monthDays;
        this.get_months                      = YWakeUpSchedule_get_months;
        this.months                          = YWakeUpSchedule_get_months;
        this.get_months_async                = YWakeUpSchedule_get_months_async;
        this.months_async                    = YWakeUpSchedule_get_months_async;
        this.set_months                      = YWakeUpSchedule_set_months;
        this.setMonths                       = YWakeUpSchedule_set_months;
        this.get_nextOccurence               = YWakeUpSchedule_get_nextOccurence;
        this.nextOccurence                   = YWakeUpSchedule_get_nextOccurence;
        this.get_nextOccurence_async         = YWakeUpSchedule_get_nextOccurence_async;
        this.nextOccurence_async             = YWakeUpSchedule_get_nextOccurence_async;
        this.get_minutes                     = YWakeUpSchedule_get_minutes;
        this.minutes                         = YWakeUpSchedule_get_minutes;
        this.set_minutes                     = YWakeUpSchedule_set_minutes;
        this.setMinutes                      = YWakeUpSchedule_set_minutes;
        this.nextWakeUpSchedule              = YWakeUpSchedule_nextWakeUpSchedule;
        //--- (end of YWakeUpSchedule constructor)
    }

    YWakeUpSchedule = _YWakeUpSchedule;
    YWakeUpSchedule.FindWakeUpSchedule  = YWakeUpSchedule_FindWakeUpSchedule;
    YWakeUpSchedule.FirstWakeUpSchedule = YWakeUpSchedule_FirstWakeUpSchedule;
})();

//--- (WakeUpSchedule functions)

/**
 * Retrieves a wakeup schedule for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the wakeup schedule is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YWakeUpSchedule.isOnline() to test if the wakeup schedule is
 * indeed online at a given time. In case of ambiguity when looking for
 * a wakeup schedule by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the wakeup schedule
 * 
 * @return a YWakeUpSchedule object allowing you to drive the wakeup schedule.
 */
function yFindWakeUpSchedule(str_func)
{
    return YWakeUpSchedule.FindWakeUpSchedule(str_func);
}

/**
 * Starts the enumeration of wakeup schedules currently accessible.
 * Use the method YWakeUpSchedule.nextWakeUpSchedule() to iterate on
 * next wakeup schedules.
 * 
 * @return a pointer to a YWakeUpSchedule object, corresponding to
 *         the first wakeup schedule currently online, or a null pointer
 *         if there are none.
 */
function yFirstWakeUpSchedule()
{
    return YWakeUpSchedule.FirstWakeUpSchedule();
}

//--- (end of WakeUpSchedule functions)
