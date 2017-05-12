/*********************************************************************
 *
 * $Id: yocto_multiaxiscontroller.js 27159 2017-04-07 21:21:06Z mvuilleu $
 *
 * Implements the high-level API for MultiAxisController functions
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

//--- (YMultiAxisController return codes)
//--- (end of YMultiAxisController return codes)
//--- (YMultiAxisController definitions)
var Y_GLOBALSTATE_ABSENT            = 0;
var Y_GLOBALSTATE_ALERT             = 1;
var Y_GLOBALSTATE_HI_Z              = 2;
var Y_GLOBALSTATE_STOP              = 3;
var Y_GLOBALSTATE_RUN               = 4;
var Y_GLOBALSTATE_BATCH             = 5;
var Y_GLOBALSTATE_INVALID           = -1;
var Y_NAXIS_INVALID                 = YAPI_INVALID_UINT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YMultiAxisController definitions)

//--- (YMultiAxisController class start)
/**
 * YMultiAxisController Class: MultiAxisController function interface
 *
 * The Yoctopuce application programming interface allows you to drive a stepper motor.
 */
//--- (end of YMultiAxisController class start)

var YMultiAxisController; // definition below
(function()
{
    function _YMultiAxisController(str_func)
    {
        //--- (YMultiAxisController constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'MultiAxisController';

        this._nAxis                          = Y_NAXIS_INVALID;            // UInt31
        this._globalState                    = Y_GLOBALSTATE_INVALID;      // StepperState
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YMultiAxisController constructor)
    }

    //--- (YMultiAxisController implementation)

    function YMultiAxisController_parseAttr(name, val, _super)
    {
        switch(name) {
        case "nAxis":
            this._nAxis = parseInt(val);
            return 1;
        case "globalState":
            this._globalState = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the number of synchronized controllers.
     *
     * @return an integer corresponding to the number of synchronized controllers
     *
     * On failure, throws an exception or returns YMultiAxisController.NAXIS_INVALID.
     */
    function YMultiAxisController_get_nAxis()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NAXIS_INVALID;
            }
        }
        res = this._nAxis;
        return res;
    }

    /**
     * Gets the number of synchronized controllers.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMultiAxisController object that invoked the callback
     *         - the result:an integer corresponding to the number of synchronized controllers
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_NAXIS_INVALID.
     */
    function YMultiAxisController_get_nAxis_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NAXIS_INVALID);
            } else {
                callback(context, obj, obj._nAxis);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the number of synchronized controllers.
     *
     * @param newval : an integer corresponding to the number of synchronized controllers
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YMultiAxisController_set_nAxis(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('nAxis',rest_val);
    }

    /**
     * Returns the stepper motor set overall state.
     *
     * @return a value among YMultiAxisController.GLOBALSTATE_ABSENT,
     * YMultiAxisController.GLOBALSTATE_ALERT, YMultiAxisController.GLOBALSTATE_HI_Z,
     * YMultiAxisController.GLOBALSTATE_STOP, YMultiAxisController.GLOBALSTATE_RUN and
     * YMultiAxisController.GLOBALSTATE_BATCH corresponding to the stepper motor set overall state
     *
     * On failure, throws an exception or returns YMultiAxisController.GLOBALSTATE_INVALID.
     */
    function YMultiAxisController_get_globalState()
    {
        var res;                    // enumSTEPPERSTATE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_GLOBALSTATE_INVALID;
            }
        }
        res = this._globalState;
        return res;
    }

    /**
     * Gets the stepper motor set overall state.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YMultiAxisController object that invoked the callback
     *         - the result:a value among Y_GLOBALSTATE_ABSENT, Y_GLOBALSTATE_ALERT, Y_GLOBALSTATE_HI_Z,
     *         Y_GLOBALSTATE_STOP, Y_GLOBALSTATE_RUN and Y_GLOBALSTATE_BATCH corresponding to the stepper motor
     *         set overall state
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_GLOBALSTATE_INVALID.
     */
    function YMultiAxisController_get_globalState_async(callback,context)
    {
        var res;                    // enumSTEPPERSTATE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_GLOBALSTATE_INVALID);
            } else {
                callback(context, obj, obj._globalState);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YMultiAxisController_get_command()
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
     *         - the YMultiAxisController object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YMultiAxisController_get_command_async(callback,context)
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

    function YMultiAxisController_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a multi-axis controller for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-axis controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiAxisController.isOnline() to test if the multi-axis controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-axis controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the multi-axis controller
     *
     * @return a YMultiAxisController object allowing you to drive the multi-axis controller.
     */
    function YMultiAxisController_FindMultiAxisController(func) // class method
    {
        var obj;                    // YMultiAxisController;
        obj = YFunction._FindFromCache("MultiAxisController", func);
        if (obj == null) {
            obj = new YMultiAxisController(func);
            YFunction._AddToCache("MultiAxisController", func, obj);
        }
        return obj;
    }

    function YMultiAxisController_sendCommand(command)
    {
        return this.set_command(command);
    }

    /**
     * Reinitialize all controllers and clear all alert flags.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YMultiAxisController_reset()
    {
        return this.sendCommand("Z");
    }

    /**
     * Starts all motors backward at the specified speeds, to search for the motor home position.
     *
     * @param speed : desired speed for all axis, in steps per second.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YMultiAxisController_findHomePosition(speed)
    {
        var cmd;                    // str;
        var i;                      // int;
        var ndim;                   // int;
        ndim = speed.length;
        cmd = "H"+String(Math.round(Math.round(1000*speed[0])));
        i = 1;
        while (i < ndim) {
            cmd = ""+cmd+","+String(Math.round(Math.round(1000*speed[i])));
            i = i + 1;
        }
        return this.sendCommand(cmd);
    }

    /**
     * Starts all motors synchronously to reach a given absolute position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param absPos : absolute position, measured in steps from each origin.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YMultiAxisController_moveTo(absPos)
    {
        var cmd;                    // str;
        var i;                      // int;
        var ndim;                   // int;
        ndim = absPos.length;
        cmd = "M"+String(Math.round(Math.round(16*absPos[0])));
        i = 1;
        while (i < ndim) {
            cmd = ""+cmd+","+String(Math.round(Math.round(16*absPos[i])));
            i = i + 1;
        }
        return this.sendCommand(cmd);
    }

    /**
     * Starts all motors synchronously to reach a given relative position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param relPos : relative position, measured in steps from the current position.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YMultiAxisController_moveRel(relPos)
    {
        var cmd;                    // str;
        var i;                      // int;
        var ndim;                   // int;
        ndim = relPos.length;
        cmd = "m"+String(Math.round(Math.round(16*relPos[0])));
        i = 1;
        while (i < ndim) {
            cmd = ""+cmd+","+String(Math.round(Math.round(16*relPos[i])));
            i = i + 1;
        }
        return this.sendCommand(cmd);
    }

    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs : wait time, specified in milliseconds.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YMultiAxisController_pause(waitMs)
    {
        return this.sendCommand("_"+String(Math.round(waitMs)));
    }

    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YMultiAxisController_emergencyStop()
    {
        return this.sendCommand("!");
    }

    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YMultiAxisController_abortAndBrake()
    {
        return this.sendCommand("B");
    }

    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    function YMultiAxisController_abortAndHiZ()
    {
        return this.sendCommand("z");
    }

    /**
     * Continues the enumeration of multi-axis controllers started using yFirstMultiAxisController().
     *
     * @return a pointer to a YMultiAxisController object, corresponding to
     *         a multi-axis controller currently online, or a null pointer
     *         if there are no more multi-axis controllers to enumerate.
     */
    function YMultiAxisController_nextMultiAxisController()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YMultiAxisController.FindMultiAxisController(next_hwid);
    }

    /**
     * Starts the enumeration of multi-axis controllers currently accessible.
     * Use the method YMultiAxisController.nextMultiAxisController() to iterate on
     * next multi-axis controllers.
     *
     * @return a pointer to a YMultiAxisController object, corresponding to
     *         the first multi-axis controller currently online, or a null pointer
     *         if there are none.
     */
    function YMultiAxisController_FirstMultiAxisController()
    {
        var next_hwid = YAPI.getFirstHardwareId('MultiAxisController');
        if(next_hwid == null) return null;
        return YMultiAxisController.FindMultiAxisController(next_hwid);
    }

    //--- (end of YMultiAxisController implementation)

    //--- (YMultiAxisController initialization)
    YMultiAxisController = YFunction._Subclass(_YMultiAxisController, {
        // Constants
        NAXIS_INVALID               : YAPI_INVALID_UINT,
        GLOBALSTATE_ABSENT          : 0,
        GLOBALSTATE_ALERT           : 1,
        GLOBALSTATE_HI_Z            : 2,
        GLOBALSTATE_STOP            : 3,
        GLOBALSTATE_RUN             : 4,
        GLOBALSTATE_BATCH           : 5,
        GLOBALSTATE_INVALID         : -1,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindMultiAxisController     : YMultiAxisController_FindMultiAxisController,
        FirstMultiAxisController    : YMultiAxisController_FirstMultiAxisController
    }, {
        // Methods
        get_nAxis                   : YMultiAxisController_get_nAxis,
        nAxis                       : YMultiAxisController_get_nAxis,
        get_nAxis_async             : YMultiAxisController_get_nAxis_async,
        nAxis_async                 : YMultiAxisController_get_nAxis_async,
        set_nAxis                   : YMultiAxisController_set_nAxis,
        setNAxis                    : YMultiAxisController_set_nAxis,
        get_globalState             : YMultiAxisController_get_globalState,
        globalState                 : YMultiAxisController_get_globalState,
        get_globalState_async       : YMultiAxisController_get_globalState_async,
        globalState_async           : YMultiAxisController_get_globalState_async,
        get_command                 : YMultiAxisController_get_command,
        command                     : YMultiAxisController_get_command,
        get_command_async           : YMultiAxisController_get_command_async,
        command_async               : YMultiAxisController_get_command_async,
        set_command                 : YMultiAxisController_set_command,
        setCommand                  : YMultiAxisController_set_command,
        sendCommand                 : YMultiAxisController_sendCommand,
        reset                       : YMultiAxisController_reset,
        findHomePosition            : YMultiAxisController_findHomePosition,
        moveTo                      : YMultiAxisController_moveTo,
        moveRel                     : YMultiAxisController_moveRel,
        pause                       : YMultiAxisController_pause,
        emergencyStop               : YMultiAxisController_emergencyStop,
        abortAndBrake               : YMultiAxisController_abortAndBrake,
        abortAndHiZ                 : YMultiAxisController_abortAndHiZ,
        nextMultiAxisController     : YMultiAxisController_nextMultiAxisController,
        _parseAttr                  : YMultiAxisController_parseAttr
    });
    //--- (end of YMultiAxisController initialization)
})();

//--- (MultiAxisController functions)

/**
 * Retrieves a multi-axis controller for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the multi-axis controller is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YMultiAxisController.isOnline() to test if the multi-axis controller is
 * indeed online at a given time. In case of ambiguity when looking for
 * a multi-axis controller by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the multi-axis controller
 *
 * @return a YMultiAxisController object allowing you to drive the multi-axis controller.
 */
function yFindMultiAxisController(func)
{
    return YMultiAxisController.FindMultiAxisController(func);
}

/**
 * Starts the enumeration of multi-axis controllers currently accessible.
 * Use the method YMultiAxisController.nextMultiAxisController() to iterate on
 * next multi-axis controllers.
 *
 * @return a pointer to a YMultiAxisController object, corresponding to
 *         the first multi-axis controller currently online, or a null pointer
 *         if there are none.
 */
function yFirstMultiAxisController()
{
    return YMultiAxisController.FirstMultiAxisController();
}

//--- (end of MultiAxisController functions)
