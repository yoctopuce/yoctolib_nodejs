/*********************************************************************
 *
 * $Id: pic24config.php 12656 2013-09-07 15:12:26Z mvuilleu $
 *
 * Implements yFindTimestamp(), the high-level API for Timestamp functions
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
//--- (YTimestamp definitions)
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_STAMP_INVALID                 = -1;
//--- (end of YTimestamp definitions)

/**
 * YTimestamp Class: Timestamp Interface
 * 
 * 
 */
var YTimestamp; // definition below
(function()
{
    //--- (YTimestamp implementation)

    /**
     * Returns the logical name of $THEFUNCTION$.
     * 
     * @return a string corresponding to the logical name of $THEFUNCTION$
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YTimestamp_get_logicalName()
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
    function YTimestamp_get_logicalName_async(func_callback, obj_context)
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
    function YTimestamp_set_logicalName(newval)
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
    function YTimestamp_get_advertisedValue()
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
    function YTimestamp_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the final timestamp of the last period.
     * 
     * @return an integer corresponding to the final timestamp of the last period
     * 
     * On failure, throws an exception or returns Y_STAMP_INVALID.
     */
    function YTimestamp_get_stamp()
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
    function YTimestamp_get_stamp_async(func_callback, obj_context)
    {   this._getAttr_async('stamp',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_STAMP_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Continues the enumeration of $FUNCTIONS$ started using yFirstTimestamp().
     * 
     * @return a pointer to a YTimestamp object, corresponding to
     *         $AFUNCTION$ currently online, or a null pointer
     *         if there are no more $FUNCTIONS$ to enumerate.
     */
    function YTimestamp_nextTimestamp()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YTimestamp.FindTimestamp(next_hwid);
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
     * Use the method YTimestamp.isOnline() to test if $THEFUNCTION$ is
     * indeed online at a given time. In case of ambiguity when looking for
     * $AFUNCTION$ by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes $THEFUNCTION$
     * 
     * @return a YTimestamp object allowing you to drive $THEFUNCTION$.
     */
    function YTimestamp_FindTimestamp(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Timestamp', str_func);
        if(obj_func) return obj_func;
        return new YTimestamp(str_func);
    }

    /**
     * Starts the enumeration of $FUNCTIONS$ currently accessible.
     * Use the method YTimestamp.nextTimestamp() to iterate on
     * next $FUNCTIONS$.
     * 
     * @return a pointer to a YTimestamp object, corresponding to
     *         $THEFIRSTFUNCTION$ currently online, or a null pointer
     *         if there are none.
     */
    function YTimestamp_FirstTimestamp()
    {
        var next_hwid = YAPI.getFirstHardwareId('Timestamp');
        if(next_hwid == null) return null;
        return YTimestamp.FindTimestamp(next_hwid);
    }

    //--- (end of YTimestamp implementation)

    function _YTimestamp(str_func)
    {
        //--- (YTimestamp constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Timestamp', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.STAMP_INVALID                   = -1;
        this.get_logicalName                 = YTimestamp_get_logicalName;
        this.logicalName                     = YTimestamp_get_logicalName;
        this.get_logicalName_async           = YTimestamp_get_logicalName_async;
        this.logicalName_async               = YTimestamp_get_logicalName_async;
        this.set_logicalName                 = YTimestamp_set_logicalName;
        this.setLogicalName                  = YTimestamp_set_logicalName;
        this.get_advertisedValue             = YTimestamp_get_advertisedValue;
        this.advertisedValue                 = YTimestamp_get_advertisedValue;
        this.get_advertisedValue_async       = YTimestamp_get_advertisedValue_async;
        this.advertisedValue_async           = YTimestamp_get_advertisedValue_async;
        this.get_stamp                       = YTimestamp_get_stamp;
        this.stamp                           = YTimestamp_get_stamp;
        this.get_stamp_async                 = YTimestamp_get_stamp_async;
        this.stamp_async                     = YTimestamp_get_stamp_async;
        this.nextTimestamp                   = YTimestamp_nextTimestamp;
        //--- (end of YTimestamp constructor)
    }

    YTimestamp = _YTimestamp;
    YTimestamp.FindTimestamp  = YTimestamp_FindTimestamp;
    YTimestamp.FirstTimestamp = YTimestamp_FirstTimestamp;
})();

//--- (Timestamp functions)

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
 * Use the method YTimestamp.isOnline() to test if $THEFUNCTION$ is
 * indeed online at a given time. In case of ambiguity when looking for
 * $AFUNCTION$ by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes $THEFUNCTION$
 * 
 * @return a YTimestamp object allowing you to drive $THEFUNCTION$.
 */
function yFindTimestamp(str_func)
{
    return YTimestamp.FindTimestamp(str_func);
}

/**
 * Starts the enumeration of $FUNCTIONS$ currently accessible.
 * Use the method YTimestamp.nextTimestamp() to iterate on
 * next $FUNCTIONS$.
 * 
 * @return a pointer to a YTimestamp object, corresponding to
 *         $THEFIRSTFUNCTION$ currently online, or a null pointer
 *         if there are none.
 */
function yFirstTimestamp()
{
    return YTimestamp.FirstTimestamp();
}

//--- (end of Timestamp functions)
