/*********************************************************************
 *
 * $Id: pic24config.php 13012 2013-10-07 13:56:46Z mvuilleu $
 *
 * Implements yFindHubPort(), the high-level API for HubPort functions
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
//--- (YHubPort definitions)
var Y_ENABLED_FALSE                 = 0;
var Y_ENABLED_TRUE                  = 1;
var Y_ENABLED_INVALID               = -1;
var Y_PORTSTATE_OFF                 = 0;
var Y_PORTSTATE_OVRLD               = 1;
var Y_PORTSTATE_ON                  = 2;
var Y_PORTSTATE_RUN                 = 3;
var Y_PORTSTATE_PROG                = 4;
var Y_PORTSTATE_INVALID             = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_BAUDRATE_INVALID              = -1;
//--- (end of YHubPort definitions)

/**
 * YHubPort Class: Yocto-hub port interface
 * 
 * YHubPort objects provide control over the power supply for every
 * YoctoHub ports, and provide information about the device connected to it.
 * The logical name of a YHubPort is always automatically set to the
 * unique serial number of the Yoctopuce device connected to it.
 */
var YHubPort; // definition below
(function()
{
    //--- (YHubPort implementation)

    /**
     * Returns the logical name of the Yocto-hub port, which is always the serial number of the
     * connected module.
     * 
     * @return a string corresponding to the logical name of the Yocto-hub port, which is always the
     * serial number of the
     *         connected module
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YHubPort_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the Yocto-hub port, which is always the serial number of the
     * connected module.
     * 
     * @return a string corresponding to the logical name of the Yocto-hub port, which is always the
     * serial number of the
     *         connected module
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YHubPort_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * It is not possible to configure the logical name of a Yocto-hub port. The logical
     * name is automatically set to the serial number of the connected module.
     * 
     * @param newval : a string
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YHubPort_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the Yocto-hub port (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the Yocto-hub port (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YHubPort_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the Yocto-hub port (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the Yocto-hub port (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YHubPort_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns true if the Yocto-hub port is powered, false otherwise.
     * 
     * @return either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to true if the Yocto-hub port is
     * powered, false otherwise
     * 
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    function YHubPort_get_enabled()
    {   var json_val = this._getAttr('enabled');
        return (json_val == null ? Y_ENABLED_INVALID : parseInt(json_val));
    }

    /**
     * Returns true if the Yocto-hub port is powered, false otherwise.
     * 
     * @return either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to true if the Yocto-hub port is
     * powered, false otherwise
     * 
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YHubPort_get_enabled_async(func_callback, obj_context)
    {   this._getAttr_async('enabled',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ENABLED_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the activation of the Yocto-hub port. If the port is enabled, the
     * *      connected module is powered. Otherwise, port power is shut down.
     * 
     * @param newval : either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the activation of the Yocto-hub port
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YHubPort_set_enabled(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabled',rest_val);
    }

    /**
     * Returns the current state of the Yocto-hub port.
     * 
     * @return a value among Y_PORTSTATE_OFF, Y_PORTSTATE_OVRLD, Y_PORTSTATE_ON, Y_PORTSTATE_RUN and
     * Y_PORTSTATE_PROG corresponding to the current state of the Yocto-hub port
     * 
     * On failure, throws an exception or returns Y_PORTSTATE_INVALID.
     */
    function YHubPort_get_portState()
    {   var json_val = this._getAttr('portState');
        return (json_val == null ? Y_PORTSTATE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current state of the Yocto-hub port.
     * 
     * @return a value among Y_PORTSTATE_OFF, Y_PORTSTATE_OVRLD, Y_PORTSTATE_ON, Y_PORTSTATE_RUN and
     * Y_PORTSTATE_PROG corresponding to the current state of the Yocto-hub port
     * 
     * On failure, throws an exception or returns Y_PORTSTATE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YHubPort_get_portState_async(func_callback, obj_context)
    {   this._getAttr_async('portState',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PORTSTATE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current baud rate used by this Yocto-hub port, in kbps.
     * The default value is 1000 kbps, but a slower rate may be used if communication
     * problems are encountered.
     * 
     * @return an integer corresponding to the current baud rate used by this Yocto-hub port, in kbps
     * 
     * On failure, throws an exception or returns Y_BAUDRATE_INVALID.
     */
    function YHubPort_get_baudRate()
    {   var json_val = this._getAttr('baudRate');
        return (json_val == null ? Y_BAUDRATE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current baud rate used by this Yocto-hub port, in kbps.
     * The default value is 1000 kbps, but a slower rate may be used if communication
     * problems are encountered.
     * 
     * @return an integer corresponding to the current baud rate used by this Yocto-hub port, in kbps
     * 
     * On failure, throws an exception or returns Y_BAUDRATE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YHubPort_get_baudRate_async(func_callback, obj_context)
    {   this._getAttr_async('baudRate',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_BAUDRATE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Continues the enumeration of Yocto-hub ports started using yFirstHubPort().
     * 
     * @return a pointer to a YHubPort object, corresponding to
     *         a Yocto-hub port currently online, or a null pointer
     *         if there are no more Yocto-hub ports to enumerate.
     */
    function YHubPort_nextHubPort()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YHubPort.FindHubPort(next_hwid);
    }

    /**
     * Retrieves a Yocto-hub port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the Yocto-hub port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHubPort.isOnline() to test if the Yocto-hub port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Yocto-hub port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the Yocto-hub port
     * 
     * @return a YHubPort object allowing you to drive the Yocto-hub port.
     */
    function YHubPort_FindHubPort(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('HubPort', str_func);
        if(obj_func) return obj_func;
        return new YHubPort(str_func);
    }

    /**
     * Starts the enumeration of Yocto-hub ports currently accessible.
     * Use the method YHubPort.nextHubPort() to iterate on
     * next Yocto-hub ports.
     * 
     * @return a pointer to a YHubPort object, corresponding to
     *         the first Yocto-hub port currently online, or a null pointer
     *         if there are none.
     */
    function YHubPort_FirstHubPort()
    {
        var next_hwid = YAPI.getFirstHardwareId('HubPort');
        if(next_hwid == null) return null;
        return YHubPort.FindHubPort(next_hwid);
    }

    //--- (end of YHubPort implementation)

    function _YHubPort(str_func)
    {
        //--- (YHubPort constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'HubPort', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.ENABLED_FALSE                   = 0;
        this.ENABLED_TRUE                    = 1;
        this.ENABLED_INVALID                 = -1;
        this.PORTSTATE_OFF                   = 0;
        this.PORTSTATE_OVRLD                 = 1;
        this.PORTSTATE_ON                    = 2;
        this.PORTSTATE_RUN                   = 3;
        this.PORTSTATE_PROG                  = 4;
        this.PORTSTATE_INVALID               = -1;
        this.BAUDRATE_INVALID                = -1;
        this.get_logicalName                 = YHubPort_get_logicalName;
        this.logicalName                     = YHubPort_get_logicalName;
        this.get_logicalName_async           = YHubPort_get_logicalName_async;
        this.logicalName_async               = YHubPort_get_logicalName_async;
        this.set_logicalName                 = YHubPort_set_logicalName;
        this.setLogicalName                  = YHubPort_set_logicalName;
        this.get_advertisedValue             = YHubPort_get_advertisedValue;
        this.advertisedValue                 = YHubPort_get_advertisedValue;
        this.get_advertisedValue_async       = YHubPort_get_advertisedValue_async;
        this.advertisedValue_async           = YHubPort_get_advertisedValue_async;
        this.get_enabled                     = YHubPort_get_enabled;
        this.enabled                         = YHubPort_get_enabled;
        this.get_enabled_async               = YHubPort_get_enabled_async;
        this.enabled_async                   = YHubPort_get_enabled_async;
        this.set_enabled                     = YHubPort_set_enabled;
        this.setEnabled                      = YHubPort_set_enabled;
        this.get_portState                   = YHubPort_get_portState;
        this.portState                       = YHubPort_get_portState;
        this.get_portState_async             = YHubPort_get_portState_async;
        this.portState_async                 = YHubPort_get_portState_async;
        this.get_baudRate                    = YHubPort_get_baudRate;
        this.baudRate                        = YHubPort_get_baudRate;
        this.get_baudRate_async              = YHubPort_get_baudRate_async;
        this.baudRate_async                  = YHubPort_get_baudRate_async;
        this.nextHubPort                     = YHubPort_nextHubPort;
        //--- (end of YHubPort constructor)
    }

    YHubPort = _YHubPort;
    YHubPort.FindHubPort  = YHubPort_FindHubPort;
    YHubPort.FirstHubPort = YHubPort_FirstHubPort;
})();

//--- (HubPort functions)

/**
 * Retrieves a Yocto-hub port for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the Yocto-hub port is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YHubPort.isOnline() to test if the Yocto-hub port is
 * indeed online at a given time. In case of ambiguity when looking for
 * a Yocto-hub port by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the Yocto-hub port
 * 
 * @return a YHubPort object allowing you to drive the Yocto-hub port.
 */
function yFindHubPort(str_func)
{
    return YHubPort.FindHubPort(str_func);
}

/**
 * Starts the enumeration of Yocto-hub ports currently accessible.
 * Use the method YHubPort.nextHubPort() to iterate on
 * next Yocto-hub ports.
 * 
 * @return a pointer to a YHubPort object, corresponding to
 *         the first Yocto-hub port currently online, or a null pointer
 *         if there are none.
 */
function yFirstHubPort()
{
    return YHubPort.FirstHubPort();
}

//--- (end of HubPort functions)
