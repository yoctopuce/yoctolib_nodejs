/*********************************************************************
 *
 * $Id: yocto_daisychain.js 26673 2017-02-28 13:44:08Z seb $
 *
 * Implements the high-level API for DaisyChain functions
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

//--- (YDaisyChain return codes)
//--- (end of YDaisyChain return codes)
//--- (YDaisyChain definitions)
var Y_DAISYSTATE_READY              = 0;
var Y_DAISYSTATE_IS_CHILD           = 1;
var Y_DAISYSTATE_FIRMWARE_MISMATCH  = 2;
var Y_DAISYSTATE_CHILD_MISSING      = 3;
var Y_DAISYSTATE_CHILD_LOST         = 4;
var Y_DAISYSTATE_INVALID            = -1;
var Y_CHILDCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_REQUIREDCHILDCOUNT_INVALID    = YAPI_INVALID_UINT;
//--- (end of YDaisyChain definitions)

//--- (YDaisyChain class start)
/**
 * YDaisyChain Class: DaisyChain function interface
 *
 * The YDaisyChain interface can be used to verify that devices that
 * are daisy-chained directly from device to device, without a hub,
 * are detected properly.
 */
//--- (end of YDaisyChain class start)

var YDaisyChain; // definition below
(function()
{
    function _YDaisyChain(str_func)
    {
        //--- (YDaisyChain constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'DaisyChain';

        this._daisyState                     = Y_DAISYSTATE_INVALID;       // DaisyState
        this._childCount                     = Y_CHILDCOUNT_INVALID;       // UInt31
        this._requiredChildCount             = Y_REQUIREDCHILDCOUNT_INVALID; // UInt31
        //--- (end of YDaisyChain constructor)
    }

    //--- (YDaisyChain implementation)

    function YDaisyChain_parseAttr(name, val, _super)
    {
        switch(name) {
        case "daisyState":
            this._daisyState = parseInt(val);
            return 1;
        case "childCount":
            this._childCount = parseInt(val);
            return 1;
        case "requiredChildCount":
            this._requiredChildCount = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the state of the daisy-link between modules.
     *
     * @return a value among YDaisyChain.DAISYSTATE_READY, YDaisyChain.DAISYSTATE_IS_CHILD,
     * YDaisyChain.DAISYSTATE_FIRMWARE_MISMATCH, YDaisyChain.DAISYSTATE_CHILD_MISSING and
     * YDaisyChain.DAISYSTATE_CHILD_LOST corresponding to the state of the daisy-link between modules
     *
     * On failure, throws an exception or returns YDaisyChain.DAISYSTATE_INVALID.
     */
    function YDaisyChain_get_daisyState()
    {
        var res;                    // enumDAISYSTATE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DAISYSTATE_INVALID;
            }
        }
        res = this._daisyState;
        return res;
    }

    /**
     * Gets the state of the daisy-link between modules.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDaisyChain object that invoked the callback
     *         - the result:a value among Y_DAISYSTATE_READY, Y_DAISYSTATE_IS_CHILD,
     *         Y_DAISYSTATE_FIRMWARE_MISMATCH, Y_DAISYSTATE_CHILD_MISSING and Y_DAISYSTATE_CHILD_LOST
     *         corresponding to the state of the daisy-link between modules
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_DAISYSTATE_INVALID.
     */
    function YDaisyChain_get_daisyState_async(callback,context)
    {
        var res;                    // enumDAISYSTATE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DAISYSTATE_INVALID);
            } else {
                callback(context, obj, obj._daisyState);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of child nodes currently detected.
     *
     * @return an integer corresponding to the number of child nodes currently detected
     *
     * On failure, throws an exception or returns YDaisyChain.CHILDCOUNT_INVALID.
     */
    function YDaisyChain_get_childCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CHILDCOUNT_INVALID;
            }
        }
        res = this._childCount;
        return res;
    }

    /**
     * Gets the number of child nodes currently detected.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDaisyChain object that invoked the callback
     *         - the result:an integer corresponding to the number of child nodes currently detected
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CHILDCOUNT_INVALID.
     */
    function YDaisyChain_get_childCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CHILDCOUNT_INVALID);
            } else {
                callback(context, obj, obj._childCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of child nodes expected in normal conditions.
     *
     * @return an integer corresponding to the number of child nodes expected in normal conditions
     *
     * On failure, throws an exception or returns YDaisyChain.REQUIREDCHILDCOUNT_INVALID.
     */
    function YDaisyChain_get_requiredChildCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_REQUIREDCHILDCOUNT_INVALID;
            }
        }
        res = this._requiredChildCount;
        return res;
    }

    /**
     * Gets the number of child nodes expected in normal conditions.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDaisyChain object that invoked the callback
     *         - the result:an integer corresponding to the number of child nodes expected in normal conditions
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_REQUIREDCHILDCOUNT_INVALID.
     */
    function YDaisyChain_get_requiredChildCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_REQUIREDCHILDCOUNT_INVALID);
            } else {
                callback(context, obj, obj._requiredChildCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the number of child nodes expected in normal conditions.
     * If the value is zero, no check is performed. If it is non-zero, the number
     * child nodes is checked on startup and the status will change to error if
     * the count does not match.
     *
     * @param newval : an integer corresponding to the number of child nodes expected in normal conditions
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YDaisyChain_set_requiredChildCount(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('requiredChildCount',rest_val);
    }

    /**
     * Retrieves a module chain for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the module chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDaisyChain.isOnline() to test if the module chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the module chain
     *
     * @return a YDaisyChain object allowing you to drive the module chain.
     */
    function YDaisyChain_FindDaisyChain(func)                   // class method
    {
        var obj;                    // YDaisyChain;
        obj = YFunction._FindFromCache("DaisyChain", func);
        if (obj == null) {
            obj = new YDaisyChain(func);
            YFunction._AddToCache("DaisyChain", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of module chains started using yFirstDaisyChain().
     *
     * @return a pointer to a YDaisyChain object, corresponding to
     *         a module chain currently online, or a null pointer
     *         if there are no more module chains to enumerate.
     */
    function YDaisyChain_nextDaisyChain()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YDaisyChain.FindDaisyChain(next_hwid);
    }

    /**
     * Starts the enumeration of module chains currently accessible.
     * Use the method YDaisyChain.nextDaisyChain() to iterate on
     * next module chains.
     *
     * @return a pointer to a YDaisyChain object, corresponding to
     *         the first module chain currently online, or a null pointer
     *         if there are none.
     */
    function YDaisyChain_FirstDaisyChain()
    {
        var next_hwid = YAPI.getFirstHardwareId('DaisyChain');
        if(next_hwid == null) return null;
        return YDaisyChain.FindDaisyChain(next_hwid);
    }

    //--- (end of YDaisyChain implementation)

    //--- (YDaisyChain initialization)
    YDaisyChain = YFunction._Subclass(_YDaisyChain, {
        // Constants
        DAISYSTATE_READY            : 0,
        DAISYSTATE_IS_CHILD         : 1,
        DAISYSTATE_FIRMWARE_MISMATCH : 2,
        DAISYSTATE_CHILD_MISSING    : 3,
        DAISYSTATE_CHILD_LOST       : 4,
        DAISYSTATE_INVALID          : -1,
        CHILDCOUNT_INVALID          : YAPI_INVALID_UINT,
        REQUIREDCHILDCOUNT_INVALID  : YAPI_INVALID_UINT
    }, {
        // Class methods
        FindDaisyChain              : YDaisyChain_FindDaisyChain,
        FirstDaisyChain             : YDaisyChain_FirstDaisyChain
    }, {
        // Methods
        get_daisyState              : YDaisyChain_get_daisyState,
        daisyState                  : YDaisyChain_get_daisyState,
        get_daisyState_async        : YDaisyChain_get_daisyState_async,
        daisyState_async            : YDaisyChain_get_daisyState_async,
        get_childCount              : YDaisyChain_get_childCount,
        childCount                  : YDaisyChain_get_childCount,
        get_childCount_async        : YDaisyChain_get_childCount_async,
        childCount_async            : YDaisyChain_get_childCount_async,
        get_requiredChildCount      : YDaisyChain_get_requiredChildCount,
        requiredChildCount          : YDaisyChain_get_requiredChildCount,
        get_requiredChildCount_async : YDaisyChain_get_requiredChildCount_async,
        requiredChildCount_async    : YDaisyChain_get_requiredChildCount_async,
        set_requiredChildCount      : YDaisyChain_set_requiredChildCount,
        setRequiredChildCount       : YDaisyChain_set_requiredChildCount,
        nextDaisyChain              : YDaisyChain_nextDaisyChain,
        _parseAttr                  : YDaisyChain_parseAttr
    });
    //--- (end of YDaisyChain initialization)
})();

//--- (DaisyChain functions)

/**
 * Retrieves a module chain for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the module chain is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDaisyChain.isOnline() to test if the module chain is
 * indeed online at a given time. In case of ambiguity when looking for
 * a module chain by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the module chain
 *
 * @return a YDaisyChain object allowing you to drive the module chain.
 */
function yFindDaisyChain(func)
{
    return YDaisyChain.FindDaisyChain(func);
}

/**
 * Starts the enumeration of module chains currently accessible.
 * Use the method YDaisyChain.nextDaisyChain() to iterate on
 * next module chains.
 *
 * @return a pointer to a YDaisyChain object, corresponding to
 *         the first module chain currently online, or a null pointer
 *         if there are none.
 */
function yFirstDaisyChain()
{
    return YDaisyChain.FirstDaisyChain();
}

//--- (end of DaisyChain functions)
