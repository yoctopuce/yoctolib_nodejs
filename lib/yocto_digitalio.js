/*********************************************************************
 *
 * $Id: pic24config.php 13012 2013-10-07 13:56:46Z mvuilleu $
 *
 * Implements yFindDigitalIO(), the high-level API for DigitalIO functions
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
//--- (YDigitalIO definitions)
var Y_OUTPUTVOLTAGE_USB_5V          = 0;
var Y_OUTPUTVOLTAGE_USB_3V          = 1;
var Y_OUTPUTVOLTAGE_EXT_V           = 2;
var Y_OUTPUTVOLTAGE_INVALID         = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_PORTSTATE_INVALID             = -1;
var Y_PORTDIRECTION_INVALID         = -1;
var Y_PORTOPENDRAIN_INVALID         = -1;
var Y_PORTPOLARITY_INVALID          = -1;
var Y_PORTSIZE_INVALID              = -1;
var Y_COMMAND_INVALID               = "!INVALID!";
//--- (end of YDigitalIO definitions)

/**
 * YDigitalIO Class: Digital IO function interface
 * 
 * The Yoctopuce application programming interface allows you to switch the state of each
 * bit of the I/O port. You can switch all bits at once, or one by one. The library
 * can also automatically generate short pulses of a determined duration. Electrical behavior
 * of each I/O can be modified (open drain and reverse polarity).
 */
var YDigitalIO; // definition below
(function()
{
    //--- (YDigitalIO implementation)

    /**
     * Returns the logical name of the digital IO port.
     * 
     * @return a string corresponding to the logical name of the digital IO port
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YDigitalIO_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the digital IO port.
     * 
     * @return a string corresponding to the logical name of the digital IO port
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDigitalIO_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the digital IO port. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the digital IO port
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the digital IO port (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the digital IO port (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YDigitalIO_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the digital IO port (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the digital IO port (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDigitalIO_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the digital IO port state: bit 0 represents input 0, and so on.
     * 
     * @return an integer corresponding to the digital IO port state: bit 0 represents input 0, and so on
     * 
     * On failure, throws an exception or returns Y_PORTSTATE_INVALID.
     */
    function YDigitalIO_get_portState()
    {   var json_val = this._getAttr('portState');
        return (json_val == null ? Y_PORTSTATE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the digital IO port state: bit 0 represents input 0, and so on.
     * 
     * @return an integer corresponding to the digital IO port state: bit 0 represents input 0, and so on
     * 
     * On failure, throws an exception or returns Y_PORTSTATE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDigitalIO_get_portState_async(func_callback, obj_context)
    {   this._getAttr_async('portState',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PORTSTATE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the digital IO port state: bit 0 represents input 0, and so on. This function has no effect
     * on bits configured as input in portDirection.
     * 
     * @param newval : an integer corresponding to the digital IO port state: bit 0 represents input 0, and so on
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_portState(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('portState',rest_val);
    }

    /**
     * Returns the IO direction of all bits of the port: 0 makes a bit an input, 1 makes it an output.
     * 
     * @return an integer corresponding to the IO direction of all bits of the port: 0 makes a bit an
     * input, 1 makes it an output
     * 
     * On failure, throws an exception or returns Y_PORTDIRECTION_INVALID.
     */
    function YDigitalIO_get_portDirection()
    {   var json_val = this._getAttr('portDirection');
        return (json_val == null ? Y_PORTDIRECTION_INVALID : parseInt(json_val));
    }

    /**
     * Returns the IO direction of all bits of the port: 0 makes a bit an input, 1 makes it an output.
     * 
     * @return an integer corresponding to the IO direction of all bits of the port: 0 makes a bit an
     * input, 1 makes it an output
     * 
     * On failure, throws an exception or returns Y_PORTDIRECTION_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDigitalIO_get_portDirection_async(func_callback, obj_context)
    {   this._getAttr_async('portDirection',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PORTDIRECTION_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the IO direction of all bits of the port: 0 makes a bit an input, 1 makes it an output.
     * Remember to call the saveToFlash() method  to make sure the setting is kept after a reboot.
     * 
     * @param newval : an integer corresponding to the IO direction of all bits of the port: 0 makes a bit
     * an input, 1 makes it an output
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_portDirection(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('portDirection',rest_val);
    }

    /**
     * Returns the electrical interface for each bit of the port. For each bit set to 0  the matching I/O
     * works in the regular,
     * intuitive way, for each bit set to 1, the I/O works in reverse mode.
     * 
     * @return an integer corresponding to the electrical interface for each bit of the port
     * 
     * On failure, throws an exception or returns Y_PORTOPENDRAIN_INVALID.
     */
    function YDigitalIO_get_portOpenDrain()
    {   var json_val = this._getAttr('portOpenDrain');
        return (json_val == null ? Y_PORTOPENDRAIN_INVALID : parseInt(json_val));
    }

    /**
     * Returns the electrical interface for each bit of the port. For each bit set to 0  the matching I/O
     * works in the regular,
     * intuitive way, for each bit set to 1, the I/O works in reverse mode.
     * 
     * @return an integer corresponding to the electrical interface for each bit of the port
     * 
     * On failure, throws an exception or returns Y_PORTOPENDRAIN_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDigitalIO_get_portOpenDrain_async(func_callback, obj_context)
    {   this._getAttr_async('portOpenDrain',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PORTOPENDRAIN_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the electrical interface for each bit of the port. 0 makes a bit a regular input/output, 1 makes
     * it an open-drain (open-collector) input/output. Remember to call the
     * saveToFlash() method  to make sure the setting is kept after a reboot.
     * 
     * @param newval : an integer corresponding to the electrical interface for each bit of the port
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_portOpenDrain(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('portOpenDrain',rest_val);
    }

    /**
     * Returns the polarity of all the bits of the port.  For each bit set to 0, the matching I/O works the regular,
     * intuitive way; for each bit set to 1, the I/O works in reverse mode.
     * 
     * @return an integer corresponding to the polarity of all the bits of the port
     * 
     * On failure, throws an exception or returns Y_PORTPOLARITY_INVALID.
     */
    function YDigitalIO_get_portPolarity()
    {   var json_val = this._getAttr('portPolarity');
        return (json_val == null ? Y_PORTPOLARITY_INVALID : parseInt(json_val));
    }

    /**
     * Returns the polarity of all the bits of the port.  For each bit set to 0, the matching I/O works the regular,
     * intuitive way; for each bit set to 1, the I/O works in reverse mode.
     * 
     * @return an integer corresponding to the polarity of all the bits of the port
     * 
     * On failure, throws an exception or returns Y_PORTPOLARITY_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDigitalIO_get_portPolarity_async(func_callback, obj_context)
    {   this._getAttr_async('portPolarity',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PORTPOLARITY_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the polarity of all the bits of the port: 0 makes a bit an input, 1 makes it an output.
     * Remember to call the saveToFlash() method  to make sure the setting will be kept after a reboot.
     * 
     * @param newval : an integer corresponding to the polarity of all the bits of the port: 0 makes a bit
     * an input, 1 makes it an output
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_portPolarity(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('portPolarity',rest_val);
    }

    /**
     * Returns the number of bits implemented in the I/O port.
     * 
     * @return an integer corresponding to the number of bits implemented in the I/O port
     * 
     * On failure, throws an exception or returns Y_PORTSIZE_INVALID.
     */
    function YDigitalIO_get_portSize()
    {   var json_val = this._getAttr('portSize');
        return (json_val == null ? Y_PORTSIZE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the number of bits implemented in the I/O port.
     * 
     * @return an integer corresponding to the number of bits implemented in the I/O port
     * 
     * On failure, throws an exception or returns Y_PORTSIZE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDigitalIO_get_portSize_async(func_callback, obj_context)
    {   this._getAttr_async('portSize',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PORTSIZE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the voltage source used to drive output bits.
     * 
     * @return a value among Y_OUTPUTVOLTAGE_USB_5V, Y_OUTPUTVOLTAGE_USB_3V and Y_OUTPUTVOLTAGE_EXT_V
     * corresponding to the voltage source used to drive output bits
     * 
     * On failure, throws an exception or returns Y_OUTPUTVOLTAGE_INVALID.
     */
    function YDigitalIO_get_outputVoltage()
    {   var json_val = this._getAttr('outputVoltage');
        return (json_val == null ? Y_OUTPUTVOLTAGE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the voltage source used to drive output bits.
     * 
     * @return a value among Y_OUTPUTVOLTAGE_USB_5V, Y_OUTPUTVOLTAGE_USB_3V and Y_OUTPUTVOLTAGE_EXT_V
     * corresponding to the voltage source used to drive output bits
     * 
     * On failure, throws an exception or returns Y_OUTPUTVOLTAGE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDigitalIO_get_outputVoltage_async(func_callback, obj_context)
    {   this._getAttr_async('outputVoltage',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_OUTPUTVOLTAGE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the voltage source used to drive output bits.
     * Remember to call the saveToFlash() method  to make sure the setting is kept after a reboot.
     * 
     * @param newval : a value among Y_OUTPUTVOLTAGE_USB_5V, Y_OUTPUTVOLTAGE_USB_3V and
     * Y_OUTPUTVOLTAGE_EXT_V corresponding to the voltage source used to drive output bits
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_outputVoltage(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('outputVoltage',rest_val);
    }

    function YDigitalIO_get_command()
    {   var json_val = this._getAttr('command');
        return (json_val == null ? Y_COMMAND_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YDigitalIO_get_command_async(func_callback, obj_context)
    {   this._getAttr_async('command',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_COMMAND_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YDigitalIO_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Sets a single bit of the I/O port.
     * 
     * @param bitno: the bit number; lowest bit has index 0
     * @param bitval: the value of the bit (1 or 0)
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_bitState(int_bitno,int_bitval)
    {
        if (!(int_bitval >= 0)) return this._throw( YAPI_INVALID_ARGUMENT, "invalid bitval", YAPI_INVALID_ARGUMENT);
        if (!(int_bitval <= 1)) return this._throw( YAPI_INVALID_ARGUMENT, "invalid bitval", YAPI_INVALID_ARGUMENT);
        return this.set_command(""+String.fromCharCode(82+bitval)+""+String(Math.round( bitno))); 
        
    }

    /**
     * Returns the value of a single bit of the I/O port.
     * 
     * @param bitno: the bit number; lowest bit has index 0
     * 
     * @return the bit value (0 or 1)
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_get_bitState(int_bitno)
    {
        var portVal; // type: int;
        portVal = this.get_portState();
        return ((((portVal) >> (int_bitno))) & (1));
        
    }

    /**
     * Reverts a single bit of the I/O port.
     * 
     * @param bitno: the bit number; lowest bit has index 0
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_toggle_bitState(int_bitno)
    {
        return this.set_command("T"+String(Math.round( bitno))); 
        
    }

    /**
     * Changes  the direction of a single bit from the I/O port.
     * 
     * @param bitno: the bit number; lowest bit has index 0
     * @param bitdirection: direction to set, 0 makes the bit an input, 1 makes it an output.
     *         Remember to call the   saveToFlash() method to make sure the setting is kept after a reboot.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_bitDirection(int_bitno,int_bitdirection)
    {
        if (!(int_bitdirection >= 0)) return this._throw( YAPI_INVALID_ARGUMENT, "invalid direction", YAPI_INVALID_ARGUMENT);
        if (!(int_bitdirection <= 1)) return this._throw( YAPI_INVALID_ARGUMENT, "invalid direction", YAPI_INVALID_ARGUMENT);
        return this.set_command(""+String.fromCharCode(73+6*bitdirection)+""+String(Math.round( bitno))); 
        
    }

    /**
     * Returns the direction of a single bit from the I/O port (0 means the bit is an input, 1  an output).
     * 
     * @param bitno: the bit number; lowest bit has index 0
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_get_bitDirection(int_bitno)
    {
        var portDir; // type: int;
        portDir = this.get_portDirection();
        return ((((portDir) >> (int_bitno))) & (1));
        
    }

    /**
     * Changes the polarity of a single bit from the I/O port.
     * 
     * @param bitno: the bit number; lowest bit has index 0.
     * @param bitpolarity: polarity to set, 0 makes the I/O work in regular mode, 1 makes the I/O  works
     * in reverse mode.
     *         Remember to call the   saveToFlash() method to make sure the setting is kept after a reboot.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_bitPolarity(int_bitno,int_bitpolarity)
    {
        if (!(int_bitpolarity >= 0)) return this._throw( YAPI_INVALID_ARGUMENT, "invalid bitpolarity", YAPI_INVALID_ARGUMENT);
        if (!(int_bitpolarity <= 1)) return this._throw( YAPI_INVALID_ARGUMENT, "invalid bitpolarity", YAPI_INVALID_ARGUMENT);
        return this.set_command(""+String.fromCharCode(110+4*int_bitpolarity)+""+String(Math.round( bitno))); 
        
    }

    /**
     * Returns the polarity of a single bit from the I/O port (0 means the I/O works in regular mode, 1
     * means the I/O  works in reverse mode).
     * 
     * @param bitno: the bit number; lowest bit has index 0
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_get_bitPolarity(int_bitno)
    {
        var portPol; // type: int;
        portPol = this.get_portPolarity();
        return ((((portPol) >> (int_bitno))) & (1));
        
    }

    /**
     * Changes  the electrical interface of a single bit from the I/O port.
     * 
     * @param bitno: the bit number; lowest bit has index 0
     * @param opendrain: value to set, 0 makes a bit a regular input/output, 1 makes
     *         it an open-drain (open-collector) input/output. Remember to call the
     *         saveToFlash() method to make sure the setting is kept after a reboot.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_bitOpenDrain(int_bitno,int_opendrain)
    {
        if (!(int_opendrain >= 0)) return this._throw( YAPI_INVALID_ARGUMENT, "invalid state", YAPI_INVALID_ARGUMENT);
        if (!(int_opendrain <= 1)) return this._throw( YAPI_INVALID_ARGUMENT, "invalid state", YAPI_INVALID_ARGUMENT);
        return this.set_command(""+String.fromCharCode(100-32*opendrain)+""+String(Math.round( bitno))); 
        
    }

    /**
     * Returns the type of electrical interface of a single bit from the I/O port. (0 means the bit is an
     * input, 1  an output).
     * 
     * @param bitno: the bit number; lowest bit has index 0
     * 
     * @return   0 means the a bit is a regular input/output, 1 means the bit is an open-drain
     * (open-collector) input/output.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_get_bitOpenDrain(int_bitno)
    {
        var portOpenDrain; // type: int;
        portOpenDrain = this.get_portOpenDrain();
        return ((((portOpenDrain) >> (int_bitno))) & (1));
        
    }

    /**
     * Starts a pulse with a specific duration: the  specified bit goes up
     * and automatically down after the given duration
     * 
     * @param bitno: the bit number; lowest bit has index 0
     * @param ms_duration: pulse duration in ms, note that your device might have a
     *         resolution larger than 1 ms.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_pulse(int_bitno,int_ms_duration)
    {
        return this.set_command("Z"+String(Math.round( bitno))+",0,"+String(Math.round(int_ms_duration))); 
        
    }

    /**
     * Schedules a pulse with a specific duration: the  specified bit goes up
     * and automatically down after the given duration
     * 
     * @param bitno: the bit number; lowest bit has index 0
     * @param ms_delay : waiting time before the pulse, in millisecondes
     * @param ms_duration: pulse duration in ms, note that your device might have a
     *         resolution larger than 1 ms.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDigitalIO_set_delayedPulse(int_bitno,int_ms_delay,int_ms_duration)
    {
        return this.set_command("Z"+String(Math.round(int_bitno))+","+String(Math.round(int_ms_delay))+","+String(Math.round(int_ms_duration))); 
        
    }

    /**
     * Continues the enumeration of digital IO ports started using yFirstDigitalIO().
     * 
     * @return a pointer to a YDigitalIO object, corresponding to
     *         a digital IO port currently online, or a null pointer
     *         if there are no more digital IO ports to enumerate.
     */
    function YDigitalIO_nextDigitalIO()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YDigitalIO.FindDigitalIO(next_hwid);
    }

    /**
     * Retrieves a digital IO port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the digital IO port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDigitalIO.isOnline() to test if the digital IO port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a digital IO port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the digital IO port
     * 
     * @return a YDigitalIO object allowing you to drive the digital IO port.
     */
    function YDigitalIO_FindDigitalIO(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('DigitalIO', str_func);
        if(obj_func) return obj_func;
        return new YDigitalIO(str_func);
    }

    /**
     * Starts the enumeration of digital IO ports currently accessible.
     * Use the method YDigitalIO.nextDigitalIO() to iterate on
     * next digital IO ports.
     * 
     * @return a pointer to a YDigitalIO object, corresponding to
     *         the first digital IO port currently online, or a null pointer
     *         if there are none.
     */
    function YDigitalIO_FirstDigitalIO()
    {
        var next_hwid = YAPI.getFirstHardwareId('DigitalIO');
        if(next_hwid == null) return null;
        return YDigitalIO.FindDigitalIO(next_hwid);
    }

    //--- (end of YDigitalIO implementation)

    function _YDigitalIO(str_func)
    {
        //--- (YDigitalIO constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'DigitalIO', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.PORTSTATE_INVALID               = -1;
        this.PORTDIRECTION_INVALID           = -1;
        this.PORTOPENDRAIN_INVALID           = -1;
        this.PORTPOLARITY_INVALID            = -1;
        this.PORTSIZE_INVALID                = -1;
        this.OUTPUTVOLTAGE_USB_5V            = 0;
        this.OUTPUTVOLTAGE_USB_3V            = 1;
        this.OUTPUTVOLTAGE_EXT_V             = 2;
        this.OUTPUTVOLTAGE_INVALID           = -1;
        this.COMMAND_INVALID                 = "!INVALID!";
        this.get_logicalName                 = YDigitalIO_get_logicalName;
        this.logicalName                     = YDigitalIO_get_logicalName;
        this.get_logicalName_async           = YDigitalIO_get_logicalName_async;
        this.logicalName_async               = YDigitalIO_get_logicalName_async;
        this.set_logicalName                 = YDigitalIO_set_logicalName;
        this.setLogicalName                  = YDigitalIO_set_logicalName;
        this.get_advertisedValue             = YDigitalIO_get_advertisedValue;
        this.advertisedValue                 = YDigitalIO_get_advertisedValue;
        this.get_advertisedValue_async       = YDigitalIO_get_advertisedValue_async;
        this.advertisedValue_async           = YDigitalIO_get_advertisedValue_async;
        this.get_portState                   = YDigitalIO_get_portState;
        this.portState                       = YDigitalIO_get_portState;
        this.get_portState_async             = YDigitalIO_get_portState_async;
        this.portState_async                 = YDigitalIO_get_portState_async;
        this.set_portState                   = YDigitalIO_set_portState;
        this.setPortState                    = YDigitalIO_set_portState;
        this.get_portDirection               = YDigitalIO_get_portDirection;
        this.portDirection                   = YDigitalIO_get_portDirection;
        this.get_portDirection_async         = YDigitalIO_get_portDirection_async;
        this.portDirection_async             = YDigitalIO_get_portDirection_async;
        this.set_portDirection               = YDigitalIO_set_portDirection;
        this.setPortDirection                = YDigitalIO_set_portDirection;
        this.get_portOpenDrain               = YDigitalIO_get_portOpenDrain;
        this.portOpenDrain                   = YDigitalIO_get_portOpenDrain;
        this.get_portOpenDrain_async         = YDigitalIO_get_portOpenDrain_async;
        this.portOpenDrain_async             = YDigitalIO_get_portOpenDrain_async;
        this.set_portOpenDrain               = YDigitalIO_set_portOpenDrain;
        this.setPortOpenDrain                = YDigitalIO_set_portOpenDrain;
        this.get_portPolarity                = YDigitalIO_get_portPolarity;
        this.portPolarity                    = YDigitalIO_get_portPolarity;
        this.get_portPolarity_async          = YDigitalIO_get_portPolarity_async;
        this.portPolarity_async              = YDigitalIO_get_portPolarity_async;
        this.set_portPolarity                = YDigitalIO_set_portPolarity;
        this.setPortPolarity                 = YDigitalIO_set_portPolarity;
        this.get_portSize                    = YDigitalIO_get_portSize;
        this.portSize                        = YDigitalIO_get_portSize;
        this.get_portSize_async              = YDigitalIO_get_portSize_async;
        this.portSize_async                  = YDigitalIO_get_portSize_async;
        this.get_outputVoltage               = YDigitalIO_get_outputVoltage;
        this.outputVoltage                   = YDigitalIO_get_outputVoltage;
        this.get_outputVoltage_async         = YDigitalIO_get_outputVoltage_async;
        this.outputVoltage_async             = YDigitalIO_get_outputVoltage_async;
        this.set_outputVoltage               = YDigitalIO_set_outputVoltage;
        this.setOutputVoltage                = YDigitalIO_set_outputVoltage;
        this.get_command                     = YDigitalIO_get_command;
        this.command                         = YDigitalIO_get_command;
        this.get_command_async               = YDigitalIO_get_command_async;
        this.command_async                   = YDigitalIO_get_command_async;
        this.set_command                     = YDigitalIO_set_command;
        this.setCommand                      = YDigitalIO_set_command;
        this.set_bitState                    = YDigitalIO_set_bitState;
        this.setBitState                     = YDigitalIO_set_bitState;
        this.get_bitState                    = YDigitalIO_get_bitState;
        this.bitState                        = YDigitalIO_get_bitState;
        this.toggle_bitState                 = YDigitalIO_toggle_bitState;
        this.set_bitDirection                = YDigitalIO_set_bitDirection;
        this.setBitDirection                 = YDigitalIO_set_bitDirection;
        this.get_bitDirection                = YDigitalIO_get_bitDirection;
        this.bitDirection                    = YDigitalIO_get_bitDirection;
        this.set_bitPolarity                 = YDigitalIO_set_bitPolarity;
        this.setBitPolarity                  = YDigitalIO_set_bitPolarity;
        this.get_bitPolarity                 = YDigitalIO_get_bitPolarity;
        this.bitPolarity                     = YDigitalIO_get_bitPolarity;
        this.set_bitOpenDrain                = YDigitalIO_set_bitOpenDrain;
        this.setBitOpenDrain                 = YDigitalIO_set_bitOpenDrain;
        this.get_bitOpenDrain                = YDigitalIO_get_bitOpenDrain;
        this.bitOpenDrain                    = YDigitalIO_get_bitOpenDrain;
        this.set_pulse                       = YDigitalIO_set_pulse;
        this.setPulse                        = YDigitalIO_set_pulse;
        this.set_delayedPulse                = YDigitalIO_set_delayedPulse;
        this.setDelayedPulse                 = YDigitalIO_set_delayedPulse;
        this.nextDigitalIO                   = YDigitalIO_nextDigitalIO;
        //--- (end of YDigitalIO constructor)
    }

    YDigitalIO = _YDigitalIO;
    YDigitalIO.FindDigitalIO  = YDigitalIO_FindDigitalIO;
    YDigitalIO.FirstDigitalIO = YDigitalIO_FirstDigitalIO;
})();

//--- (DigitalIO functions)

/**
 * Retrieves a digital IO port for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the digital IO port is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDigitalIO.isOnline() to test if the digital IO port is
 * indeed online at a given time. In case of ambiguity when looking for
 * a digital IO port by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the digital IO port
 * 
 * @return a YDigitalIO object allowing you to drive the digital IO port.
 */
function yFindDigitalIO(str_func)
{
    return YDigitalIO.FindDigitalIO(str_func);
}

/**
 * Starts the enumeration of digital IO ports currently accessible.
 * Use the method YDigitalIO.nextDigitalIO() to iterate on
 * next digital IO ports.
 * 
 * @return a pointer to a YDigitalIO object, corresponding to
 *         the first digital IO port currently online, or a null pointer
 *         if there are none.
 */
function yFirstDigitalIO()
{
    return YDigitalIO.FirstDigitalIO();
}

//--- (end of DigitalIO functions)
