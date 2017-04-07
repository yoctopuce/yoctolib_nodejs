/*********************************************************************
 *
 * $Id: yocto_currentloopoutput.js 27114 2017-04-06 22:22:28Z seb $
 *
 * Implements the high-level API for CurrentLoopOutput functions
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

//--- (YCurrentLoopOutput return codes)
//--- (end of YCurrentLoopOutput return codes)
//--- (YCurrentLoopOutput definitions)
var Y_LOOPPOWER_NOPWR               = 0;
var Y_LOOPPOWER_LOWPWR              = 1;
var Y_LOOPPOWER_POWEROK             = 2;
var Y_LOOPPOWER_INVALID             = -1;
var Y_CURRENT_INVALID               = YAPI_INVALID_DOUBLE;
var Y_CURRENTTRANSITION_INVALID     = YAPI_INVALID_STRING;
var Y_CURRENTATSTARTUP_INVALID      = YAPI_INVALID_DOUBLE;
//--- (end of YCurrentLoopOutput definitions)

//--- (YCurrentLoopOutput class start)
/**
 * YCurrentLoopOutput Class: CurrentLoopOutput function interface
 *
 * The Yoctopuce application programming interface allows you to change the value of the 4-20mA
 * output as well as to know the current loop state.
 */
//--- (end of YCurrentLoopOutput class start)

var YCurrentLoopOutput; // definition below
(function()
{
    function _YCurrentLoopOutput(str_func)
    {
        //--- (YCurrentLoopOutput constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'CurrentLoopOutput';

        this._current                        = Y_CURRENT_INVALID;          // MeasureVal
        this._currentTransition              = Y_CURRENTTRANSITION_INVALID; // AnyFloatTransition
        this._currentAtStartUp               = Y_CURRENTATSTARTUP_INVALID; // MeasureVal
        this._loopPower                      = Y_LOOPPOWER_INVALID;        // LoopPwrState
        //--- (end of YCurrentLoopOutput constructor)
    }

    //--- (YCurrentLoopOutput implementation)

    function YCurrentLoopOutput_parseAttr(name, val, _super)
    {
        switch(name) {
        case "current":
            this._current = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "currentTransition":
            this._currentTransition = val;
            return 1;
        case "currentAtStartUp":
            this._currentAtStartUp = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case "loopPower":
            this._loopPower = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Changes the current loop, the valid range is from 3 to 21mA. If the loop is
     * not propely powered, the  target current is not reached and
     * loopPower is set to LOWPWR.
     *
     * @param newval : a floating point number corresponding to the current loop, the valid range is from 3 to 21mA
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCurrentLoopOutput_set_current(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('current',rest_val);
    }

    /**
     * Returns the loop current set point in mA.
     *
     * @return a floating point number corresponding to the loop current set point in mA
     *
     * On failure, throws an exception or returns YCurrentLoopOutput.CURRENT_INVALID.
     */
    function YCurrentLoopOutput_get_current()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENT_INVALID;
            }
        }
        res = this._current;
        return res;
    }

    /**
     * Gets the loop current set point in mA.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCurrentLoopOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the loop current set point in mA
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CURRENT_INVALID.
     */
    function YCurrentLoopOutput_get_current_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENT_INVALID);
            } else {
                callback(context, obj, obj._current);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YCurrentLoopOutput_get_currentTransition()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTTRANSITION_INVALID;
            }
        }
        res = this._currentTransition;
        return res;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCurrentLoopOutput object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YCurrentLoopOutput_get_currentTransition_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTTRANSITION_INVALID);
            } else {
                callback(context, obj, obj._currentTransition);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YCurrentLoopOutput_set_currentTransition(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('currentTransition',rest_val);
    }

    /**
     * Changes the loop current at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the loop current at device start up
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCurrentLoopOutput_set_currentAtStartUp(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return this._setAttr('currentAtStartUp',rest_val);
    }

    /**
     * Returns the current in the loop at device startup, in mA.
     *
     * @return a floating point number corresponding to the current in the loop at device startup, in mA
     *
     * On failure, throws an exception or returns YCurrentLoopOutput.CURRENTATSTARTUP_INVALID.
     */
    function YCurrentLoopOutput_get_currentAtStartUp()
    {
        var res;                    // double;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTATSTARTUP_INVALID;
            }
        }
        res = this._currentAtStartUp;
        return res;
    }

    /**
     * Gets the current in the loop at device startup, in mA.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCurrentLoopOutput object that invoked the callback
     *         - the result:a floating point number corresponding to the current in the loop at device startup, in mA
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CURRENTATSTARTUP_INVALID.
     */
    function YCurrentLoopOutput_get_currentAtStartUp_async(callback,context)
    {
        var res;                    // double;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTATSTARTUP_INVALID);
            } else {
                callback(context, obj, obj._currentAtStartUp);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the loop powerstate.  POWEROK: the loop
     * is powered. NOPWR: the loop in not powered. LOWPWR: the loop is not
     * powered enough to maintain the current required (insufficient voltage).
     *
     * @return a value among YCurrentLoopOutput.LOOPPOWER_NOPWR, YCurrentLoopOutput.LOOPPOWER_LOWPWR and
     * YCurrentLoopOutput.LOOPPOWER_POWEROK corresponding to the loop powerstate
     *
     * On failure, throws an exception or returns YCurrentLoopOutput.LOOPPOWER_INVALID.
     */
    function YCurrentLoopOutput_get_loopPower()
    {
        var res;                    // enumLOOPPWRSTATE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LOOPPOWER_INVALID;
            }
        }
        res = this._loopPower;
        return res;
    }

    /**
     * Gets the loop powerstate.  POWEROK: the loop
     * is powered. NOPWR: the loop in not powered. LOWPWR: the loop is not
     * powered enough to maintain the current required (insufficient voltage).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCurrentLoopOutput object that invoked the callback
     *         - the result:a value among Y_LOOPPOWER_NOPWR, Y_LOOPPOWER_LOWPWR and Y_LOOPPOWER_POWEROK
     *         corresponding to the loop powerstate
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_LOOPPOWER_INVALID.
     */
    function YCurrentLoopOutput_get_loopPower_async(callback,context)
    {
        var res;                    // enumLOOPPWRSTATE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LOOPPOWER_INVALID);
            } else {
                callback(context, obj, obj._loopPower);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a 4-20mA output for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the 4-20mA output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrentLoopOutput.isOnline() to test if the 4-20mA output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a 4-20mA output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the 4-20mA output
     *
     * @return a YCurrentLoopOutput object allowing you to drive the 4-20mA output.
     */
    function YCurrentLoopOutput_FindCurrentLoopOutput(func)     // class method
    {
        var obj;                    // YCurrentLoopOutput;
        obj = YFunction._FindFromCache("CurrentLoopOutput", func);
        if (obj == null) {
            obj = new YCurrentLoopOutput(func);
            YFunction._AddToCache("CurrentLoopOutput", func, obj);
        }
        return obj;
    }

    /**
     * Performs a smooth transistion of current flowing in the loop. Any current explicit
     * change cancels any ongoing transition process.
     *
     * @param mA_target   : new current value at the end of the transition
     *         (floating-point number, representing the transition duration in mA)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI.SUCCESS when the call succeeds.
     */
    function YCurrentLoopOutput_currentMove(mA_target,ms_duration)
    {
        var newval;                 // str;
        if (mA_target < 3.0) {
            mA_target  = 3.0;
        }
        if (mA_target > 21.0) {
            mA_target = 21.0;
        }
        newval = ""+String(Math.round(Math.round(mA_target*1000)))+":"+String(Math.round(ms_duration));
        
        return this.set_currentTransition(newval);
    }

    /**
     * Continues the enumeration of 4-20mA outputs started using yFirstCurrentLoopOutput().
     *
     * @return a pointer to a YCurrentLoopOutput object, corresponding to
     *         a 4-20mA output currently online, or a null pointer
     *         if there are no more 4-20mA outputs to enumerate.
     */
    function YCurrentLoopOutput_nextCurrentLoopOutput()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YCurrentLoopOutput.FindCurrentLoopOutput(next_hwid);
    }

    /**
     * Starts the enumeration of 4-20mA outputs currently accessible.
     * Use the method YCurrentLoopOutput.nextCurrentLoopOutput() to iterate on
     * next 4-20mA outputs.
     *
     * @return a pointer to a YCurrentLoopOutput object, corresponding to
     *         the first 4-20mA output currently online, or a null pointer
     *         if there are none.
     */
    function YCurrentLoopOutput_FirstCurrentLoopOutput()
    {
        var next_hwid = YAPI.getFirstHardwareId('CurrentLoopOutput');
        if(next_hwid == null) return null;
        return YCurrentLoopOutput.FindCurrentLoopOutput(next_hwid);
    }

    //--- (end of YCurrentLoopOutput implementation)

    //--- (YCurrentLoopOutput initialization)
    YCurrentLoopOutput = YFunction._Subclass(_YCurrentLoopOutput, {
        // Constants
        CURRENT_INVALID             : YAPI_INVALID_DOUBLE,
        CURRENTTRANSITION_INVALID   : YAPI_INVALID_STRING,
        CURRENTATSTARTUP_INVALID    : YAPI_INVALID_DOUBLE,
        LOOPPOWER_NOPWR             : 0,
        LOOPPOWER_LOWPWR            : 1,
        LOOPPOWER_POWEROK           : 2,
        LOOPPOWER_INVALID           : -1
    }, {
        // Class methods
        FindCurrentLoopOutput       : YCurrentLoopOutput_FindCurrentLoopOutput,
        FirstCurrentLoopOutput      : YCurrentLoopOutput_FirstCurrentLoopOutput
    }, {
        // Methods
        set_current                 : YCurrentLoopOutput_set_current,
        setCurrent                  : YCurrentLoopOutput_set_current,
        get_current                 : YCurrentLoopOutput_get_current,
        current                     : YCurrentLoopOutput_get_current,
        get_current_async           : YCurrentLoopOutput_get_current_async,
        current_async               : YCurrentLoopOutput_get_current_async,
        get_currentTransition       : YCurrentLoopOutput_get_currentTransition,
        currentTransition           : YCurrentLoopOutput_get_currentTransition,
        get_currentTransition_async : YCurrentLoopOutput_get_currentTransition_async,
        currentTransition_async     : YCurrentLoopOutput_get_currentTransition_async,
        set_currentTransition       : YCurrentLoopOutput_set_currentTransition,
        setCurrentTransition        : YCurrentLoopOutput_set_currentTransition,
        set_currentAtStartUp        : YCurrentLoopOutput_set_currentAtStartUp,
        setCurrentAtStartUp         : YCurrentLoopOutput_set_currentAtStartUp,
        get_currentAtStartUp        : YCurrentLoopOutput_get_currentAtStartUp,
        currentAtStartUp            : YCurrentLoopOutput_get_currentAtStartUp,
        get_currentAtStartUp_async  : YCurrentLoopOutput_get_currentAtStartUp_async,
        currentAtStartUp_async      : YCurrentLoopOutput_get_currentAtStartUp_async,
        get_loopPower               : YCurrentLoopOutput_get_loopPower,
        loopPower                   : YCurrentLoopOutput_get_loopPower,
        get_loopPower_async         : YCurrentLoopOutput_get_loopPower_async,
        loopPower_async             : YCurrentLoopOutput_get_loopPower_async,
        currentMove                 : YCurrentLoopOutput_currentMove,
        nextCurrentLoopOutput       : YCurrentLoopOutput_nextCurrentLoopOutput,
        _parseAttr                  : YCurrentLoopOutput_parseAttr
    });
    //--- (end of YCurrentLoopOutput initialization)
})();

//--- (CurrentLoopOutput functions)

/**
 * Retrieves a 4-20mA output for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the 4-20mA output is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YCurrentLoopOutput.isOnline() to test if the 4-20mA output is
 * indeed online at a given time. In case of ambiguity when looking for
 * a 4-20mA output by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the 4-20mA output
 *
 * @return a YCurrentLoopOutput object allowing you to drive the 4-20mA output.
 */
function yFindCurrentLoopOutput(func)
{
    return YCurrentLoopOutput.FindCurrentLoopOutput(func);
}

/**
 * Starts the enumeration of 4-20mA outputs currently accessible.
 * Use the method YCurrentLoopOutput.nextCurrentLoopOutput() to iterate on
 * next 4-20mA outputs.
 *
 * @return a pointer to a YCurrentLoopOutput object, corresponding to
 *         the first 4-20mA output currently online, or a null pointer
 *         if there are none.
 */
function yFirstCurrentLoopOutput()
{
    return YCurrentLoopOutput.FirstCurrentLoopOutput();
}

//--- (end of CurrentLoopOutput functions)
