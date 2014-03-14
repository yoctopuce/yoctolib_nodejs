/*********************************************************************
 *
 * $Id: yocto_wakeupschedule.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements the high-level API for WakeUpSchedule functions
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

//--- (YWakeUpSchedule return codes)
//--- (end of YWakeUpSchedule return codes)
//--- (YWakeUpSchedule definitions)
var Y_MINUTESA_INVALID              = YAPI_INVALID_UINT;
var Y_MINUTESB_INVALID              = YAPI_INVALID_UINT;
var Y_HOURS_INVALID                 = YAPI_INVALID_UINT;
var Y_WEEKDAYS_INVALID              = YAPI_INVALID_UINT;
var Y_MONTHDAYS_INVALID             = YAPI_INVALID_UINT;
var Y_MONTHS_INVALID                = YAPI_INVALID_UINT;
var Y_NEXTOCCURENCE_INVALID         = YAPI_INVALID_LONG;
//--- (end of YWakeUpSchedule definitions)

//--- (YWakeUpSchedule class start)
/**
 * YWakeUpSchedule Class: WakeUpSchedule function interface
 * 
 * The WakeUpSchedule function implements a wake up condition. The wake up time is
 * specified as a set of months and/or days and/or hours and/or minutes when the
 * wake up should happen.
 */
//--- (end of YWakeUpSchedule class start)

var YWakeUpSchedule; // definition below
(function()
{
    function _YWakeUpSchedule(str_func)
    {
        //--- (YWakeUpSchedule constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'WakeUpSchedule';

        this._minutesA                       = Y_MINUTESA_INVALID;         // MinOfHalfHourBits
        this._minutesB                       = Y_MINUTESB_INVALID;         // MinOfHalfHourBits
        this._hours                          = Y_HOURS_INVALID;            // HoursOfDayBits
        this._weekDays                       = Y_WEEKDAYS_INVALID;         // DaysOfWeekBits
        this._monthDays                      = Y_MONTHDAYS_INVALID;        // DaysOfMonthBits
        this._months                         = Y_MONTHS_INVALID;           // MonthsOfYearBits
        this._nextOccurence                  = Y_NEXTOCCURENCE_INVALID;    // UTCTime
        //--- (end of YWakeUpSchedule constructor)
    }

    //--- (YWakeUpSchedule implementation)

    function YWakeUpSchedule_parseAttr(name, val, _super)
    {
        switch(name) {
        case "minutesA":
            this._minutesA = parseInt(val);
            return 1;
        case "minutesB":
            this._minutesB = parseInt(val);
            return 1;
        case "hours":
            this._hours = parseInt(val);
            return 1;
        case "weekDays":
            this._weekDays = parseInt(val);
            return 1;
        case "monthDays":
            this._monthDays = parseInt(val);
            return 1;
        case "months":
            this._months = parseInt(val);
            return 1;
        case "nextOccurence":
            this._nextOccurence = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the minutes in the 00-29 interval of each hour scheduled for wake up.
     * 
     * @return an integer corresponding to the minutes in the 00-29 interval of each hour scheduled for wake up
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.MINUTESA_INVALID.
     */
    function YWakeUpSchedule_get_minutesA()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MINUTESA_INVALID;
            }
        }
        return this._minutesA;
    }

    /**
     * Gets the minutes in the 00-29 interval of each hour scheduled for wake up.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpSchedule object that invoked the callback
     *         - the result:an integer corresponding to the minutes in the 00-29 interval of each hour scheduled for wake up
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_MINUTESA_INVALID.
     */
    function YWakeUpSchedule_get_minutesA_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MINUTESA_INVALID);
            } else {
                callback(context, obj, obj._minutesA);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the minutes in the 00-29 interval when a wake up must take place.
     * 
     * @param newval : an integer corresponding to the minutes in the 00-29 interval when a wake up must take place
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
     * Returns the minutes in the 30-59 intervalof each hour scheduled for wake up.
     * 
     * @return an integer corresponding to the minutes in the 30-59 intervalof each hour scheduled for wake up
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.MINUTESB_INVALID.
     */
    function YWakeUpSchedule_get_minutesB()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MINUTESB_INVALID;
            }
        }
        return this._minutesB;
    }

    /**
     * Gets the minutes in the 30-59 intervalof each hour scheduled for wake up.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpSchedule object that invoked the callback
     *         - the result:an integer corresponding to the minutes in the 30-59 intervalof each hour scheduled for wake up
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_MINUTESB_INVALID.
     */
    function YWakeUpSchedule_get_minutesB_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MINUTESB_INVALID);
            } else {
                callback(context, obj, obj._minutesB);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the minutes in the 30-59 interval when a wake up must take place.
     * 
     * @param newval : an integer corresponding to the minutes in the 30-59 interval when a wake up must take place
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
     * Returns the hours scheduled for wake up.
     * 
     * @return an integer corresponding to the hours scheduled for wake up
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.HOURS_INVALID.
     */
    function YWakeUpSchedule_get_hours()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_HOURS_INVALID;
            }
        }
        return this._hours;
    }

    /**
     * Gets the hours scheduled for wake up.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpSchedule object that invoked the callback
     *         - the result:an integer corresponding to the hours scheduled for wake up
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_HOURS_INVALID.
     */
    function YWakeUpSchedule_get_hours_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_HOURS_INVALID);
            } else {
                callback(context, obj, obj._hours);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the hours when a wake up must take place.
     * 
     * @param newval : an integer corresponding to the hours when a wake up must take place
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
     * Returns the days of the week scheduled for wake up.
     * 
     * @return an integer corresponding to the days of the week scheduled for wake up
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.WEEKDAYS_INVALID.
     */
    function YWakeUpSchedule_get_weekDays()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_WEEKDAYS_INVALID;
            }
        }
        return this._weekDays;
    }

    /**
     * Gets the days of the week scheduled for wake up.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpSchedule object that invoked the callback
     *         - the result:an integer corresponding to the days of the week scheduled for wake up
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_WEEKDAYS_INVALID.
     */
    function YWakeUpSchedule_get_weekDays_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_WEEKDAYS_INVALID);
            } else {
                callback(context, obj, obj._weekDays);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the days of the week when a wake up must take place.
     * 
     * @param newval : an integer corresponding to the days of the week when a wake up must take place
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
     * Returns the days of the month scheduled for wake up.
     * 
     * @return an integer corresponding to the days of the month scheduled for wake up
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.MONTHDAYS_INVALID.
     */
    function YWakeUpSchedule_get_monthDays()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MONTHDAYS_INVALID;
            }
        }
        return this._monthDays;
    }

    /**
     * Gets the days of the month scheduled for wake up.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpSchedule object that invoked the callback
     *         - the result:an integer corresponding to the days of the month scheduled for wake up
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_MONTHDAYS_INVALID.
     */
    function YWakeUpSchedule_get_monthDays_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MONTHDAYS_INVALID);
            } else {
                callback(context, obj, obj._monthDays);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the days of the month when a wake up must take place.
     * 
     * @param newval : an integer corresponding to the days of the month when a wake up must take place
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
     * Returns the months scheduled for wake up.
     * 
     * @return an integer corresponding to the months scheduled for wake up
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.MONTHS_INVALID.
     */
    function YWakeUpSchedule_get_months()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MONTHS_INVALID;
            }
        }
        return this._months;
    }

    /**
     * Gets the months scheduled for wake up.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpSchedule object that invoked the callback
     *         - the result:an integer corresponding to the months scheduled for wake up
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_MONTHS_INVALID.
     */
    function YWakeUpSchedule_get_months_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MONTHS_INVALID);
            } else {
                callback(context, obj, obj._months);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the months when a wake up must take place.
     * 
     * @param newval : an integer corresponding to the months when a wake up must take place
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
     * Returns the date/time (seconds) of the next wake up occurence
     * 
     * @return an integer corresponding to the date/time (seconds) of the next wake up occurence
     * 
     * On failure, throws an exception or returns YWakeUpSchedule.NEXTOCCURENCE_INVALID.
     */
    function YWakeUpSchedule_get_nextOccurence()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NEXTOCCURENCE_INVALID;
            }
        }
        return this._nextOccurence;
    }

    /**
     * Gets the date/time (seconds) of the next wake up occurence
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWakeUpSchedule object that invoked the callback
     *         - the result:an integer corresponding to the date/time (seconds) of the next wake up occurence
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_NEXTOCCURENCE_INVALID.
     */
    function YWakeUpSchedule_get_nextOccurence_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NEXTOCCURENCE_INVALID);
            } else {
                callback(context, obj, obj._nextOccurence);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a wake up schedule for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the wake up schedule is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpSchedule.isOnline() to test if the wake up schedule is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wake up schedule by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the wake up schedule
     * 
     * @return a YWakeUpSchedule object allowing you to drive the wake up schedule.
     */
    function YWakeUpSchedule_FindWakeUpSchedule(func)           // class method
    {
        var obj;                    // YWakeUpSchedule;
        obj = YFunction._FindFromCache("WakeUpSchedule", func);
        if (obj == null) {
            obj = new YWakeUpSchedule(func);
            YFunction._AddToCache("WakeUpSchedule", func, obj);
        }
        return obj;
    }

    /**
     * Returns all the minutes of each hour that are scheduled for wake up.
     */
    function YWakeUpSchedule_get_minutes()
    {
        var res;                    // long;
        // may throw an exception
        res = this.get_minutesB();
        res = ((res) << (30));
        res = res + this.get_minutesA();
        return res;
    }

    /**
     * Changes all the minutes where a wake up must take place.
     * 
     * @param bitmap : Minutes 00-59 of each hour scheduled for wake up.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWakeUpSchedule_set_minutes(bitmap)
    {
        this.set_minutesA(((bitmap) & (0x3fffffff)));
        bitmap = ((bitmap) >> (30));
        return this.set_minutesB(((bitmap) & (0x3fffffff)));
    }

    /**
     * Continues the enumeration of wake up schedules started using yFirstWakeUpSchedule().
     * 
     * @return a pointer to a YWakeUpSchedule object, corresponding to
     *         a wake up schedule currently online, or a null pointer
     *         if there are no more wake up schedules to enumerate.
     */
    function YWakeUpSchedule_nextWakeUpSchedule()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpSchedule(next_hwid);
    }

    /**
     * Starts the enumeration of wake up schedules currently accessible.
     * Use the method YWakeUpSchedule.nextWakeUpSchedule() to iterate on
     * next wake up schedules.
     * 
     * @return a pointer to a YWakeUpSchedule object, corresponding to
     *         the first wake up schedule currently online, or a null pointer
     *         if there are none.
     */
    function YWakeUpSchedule_FirstWakeUpSchedule()
    {
        var next_hwid = YAPI.getFirstHardwareId('WakeUpSchedule');
        if(next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpSchedule(next_hwid);
    }

    //--- (end of YWakeUpSchedule implementation)

    //--- (YWakeUpSchedule initialization)
    YWakeUpSchedule = YFunction._Subclass(_YWakeUpSchedule, {
        // Constants
        MINUTESA_INVALID            : YAPI_INVALID_UINT,
        MINUTESB_INVALID            : YAPI_INVALID_UINT,
        HOURS_INVALID               : YAPI_INVALID_UINT,
        WEEKDAYS_INVALID            : YAPI_INVALID_UINT,
        MONTHDAYS_INVALID           : YAPI_INVALID_UINT,
        MONTHS_INVALID              : YAPI_INVALID_UINT,
        NEXTOCCURENCE_INVALID       : YAPI_INVALID_LONG
    }, {
        // Class methods
        FindWakeUpSchedule          : YWakeUpSchedule_FindWakeUpSchedule,
        FirstWakeUpSchedule         : YWakeUpSchedule_FirstWakeUpSchedule
    }, {
        // Methods
        get_minutesA                : YWakeUpSchedule_get_minutesA,
        minutesA                    : YWakeUpSchedule_get_minutesA,
        get_minutesA_async          : YWakeUpSchedule_get_minutesA_async,
        minutesA_async              : YWakeUpSchedule_get_minutesA_async,
        set_minutesA                : YWakeUpSchedule_set_minutesA,
        setMinutesA                 : YWakeUpSchedule_set_minutesA,
        get_minutesB                : YWakeUpSchedule_get_minutesB,
        minutesB                    : YWakeUpSchedule_get_minutesB,
        get_minutesB_async          : YWakeUpSchedule_get_minutesB_async,
        minutesB_async              : YWakeUpSchedule_get_minutesB_async,
        set_minutesB                : YWakeUpSchedule_set_minutesB,
        setMinutesB                 : YWakeUpSchedule_set_minutesB,
        get_hours                   : YWakeUpSchedule_get_hours,
        hours                       : YWakeUpSchedule_get_hours,
        get_hours_async             : YWakeUpSchedule_get_hours_async,
        hours_async                 : YWakeUpSchedule_get_hours_async,
        set_hours                   : YWakeUpSchedule_set_hours,
        setHours                    : YWakeUpSchedule_set_hours,
        get_weekDays                : YWakeUpSchedule_get_weekDays,
        weekDays                    : YWakeUpSchedule_get_weekDays,
        get_weekDays_async          : YWakeUpSchedule_get_weekDays_async,
        weekDays_async              : YWakeUpSchedule_get_weekDays_async,
        set_weekDays                : YWakeUpSchedule_set_weekDays,
        setWeekDays                 : YWakeUpSchedule_set_weekDays,
        get_monthDays               : YWakeUpSchedule_get_monthDays,
        monthDays                   : YWakeUpSchedule_get_monthDays,
        get_monthDays_async         : YWakeUpSchedule_get_monthDays_async,
        monthDays_async             : YWakeUpSchedule_get_monthDays_async,
        set_monthDays               : YWakeUpSchedule_set_monthDays,
        setMonthDays                : YWakeUpSchedule_set_monthDays,
        get_months                  : YWakeUpSchedule_get_months,
        months                      : YWakeUpSchedule_get_months,
        get_months_async            : YWakeUpSchedule_get_months_async,
        months_async                : YWakeUpSchedule_get_months_async,
        set_months                  : YWakeUpSchedule_set_months,
        setMonths                   : YWakeUpSchedule_set_months,
        get_nextOccurence           : YWakeUpSchedule_get_nextOccurence,
        nextOccurence               : YWakeUpSchedule_get_nextOccurence,
        get_nextOccurence_async     : YWakeUpSchedule_get_nextOccurence_async,
        nextOccurence_async         : YWakeUpSchedule_get_nextOccurence_async,
        get_minutes                 : YWakeUpSchedule_get_minutes,
        minutes                     : YWakeUpSchedule_get_minutes,
        set_minutes                 : YWakeUpSchedule_set_minutes,
        setMinutes                  : YWakeUpSchedule_set_minutes,
        nextWakeUpSchedule          : YWakeUpSchedule_nextWakeUpSchedule,
        _parseAttr                  : YWakeUpSchedule_parseAttr
    });
    //--- (end of YWakeUpSchedule initialization)
})();

//--- (WakeUpSchedule functions)

/**
 * Retrieves a wake up schedule for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the wake up schedule is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YWakeUpSchedule.isOnline() to test if the wake up schedule is
 * indeed online at a given time. In case of ambiguity when looking for
 * a wake up schedule by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the wake up schedule
 * 
 * @return a YWakeUpSchedule object allowing you to drive the wake up schedule.
 */
function yFindWakeUpSchedule(func)
{
    return YWakeUpSchedule.FindWakeUpSchedule(func);
}

/**
 * Starts the enumeration of wake up schedules currently accessible.
 * Use the method YWakeUpSchedule.nextWakeUpSchedule() to iterate on
 * next wake up schedules.
 * 
 * @return a pointer to a YWakeUpSchedule object, corresponding to
 *         the first wake up schedule currently online, or a null pointer
 *         if there are none.
 */
function yFirstWakeUpSchedule()
{
    return YWakeUpSchedule.FirstWakeUpSchedule();
}

//--- (end of WakeUpSchedule functions)
