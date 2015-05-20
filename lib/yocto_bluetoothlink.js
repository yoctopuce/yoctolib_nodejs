/*********************************************************************
 *
 * $Id: yocto_bluetoothlink.js 20326 2015-05-12 15:35:18Z seb $
 *
 * Implements the high-level API for BluetoothLink functions
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

//--- (YBluetoothLink return codes)
//--- (end of YBluetoothLink return codes)
//--- (YBluetoothLink definitions)
var Y_OWNADDRESS_INVALID            = YAPI_INVALID_STRING;
var Y_PAIRINGPIN_INVALID            = YAPI_INVALID_STRING;
var Y_REMOTEADDRESS_INVALID         = YAPI_INVALID_STRING;
var Y_MESSAGE_INVALID               = YAPI_INVALID_STRING;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YBluetoothLink definitions)

//--- (YBluetoothLink class start)
/**
 * YBluetoothLink Class: BluetoothLink function interface
 *
 * BluetoothLink function provides control over bluetooth link
 * and status for devices that are bluetooth-enabled.
 */
//--- (end of YBluetoothLink class start)

var YBluetoothLink; // definition below
(function()
{
    function _YBluetoothLink(str_func)
    {
        //--- (YBluetoothLink constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'BluetoothLink';

        this._ownAddress                     = Y_OWNADDRESS_INVALID;       // MACAddress
        this._pairingPin                     = Y_PAIRINGPIN_INVALID;       // Text
        this._remoteAddress                  = Y_REMOTEADDRESS_INVALID;    // MACAddress
        this._message                        = Y_MESSAGE_INVALID;          // Text
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YBluetoothLink constructor)
    }

    //--- (YBluetoothLink implementation)

    function YBluetoothLink_parseAttr(name, val, _super)
    {
        switch(name) {
        case "ownAddress":
            this._ownAddress = val;
            return 1;
        case "pairingPin":
            this._pairingPin = val;
            return 1;
        case "remoteAddress":
            this._remoteAddress = val;
            return 1;
        case "message":
            this._message = val;
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the MAC-48 address of the bluetooth interface, which is unique on the bluetooth network.
     *
     * @return a string corresponding to the MAC-48 address of the bluetooth interface, which is unique on
     * the bluetooth network
     *
     * On failure, throws an exception or returns YBluetoothLink.OWNADDRESS_INVALID.
     */
    function YBluetoothLink_get_ownAddress()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_OWNADDRESS_INVALID;
            }
        }
        return this._ownAddress;
    }

    /**
     * Gets the MAC-48 address of the bluetooth interface, which is unique on the bluetooth network.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:a string corresponding to the MAC-48 address of the bluetooth interface, which is
     *         unique on the bluetooth network
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_OWNADDRESS_INVALID.
     */
    function YBluetoothLink_get_ownAddress_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_OWNADDRESS_INVALID);
            } else {
                callback(context, obj, obj._ownAddress);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @return a string corresponding to an opaque string if a PIN code has been configured in the device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     *
     * On failure, throws an exception or returns YBluetoothLink.PAIRINGPIN_INVALID.
     */
    function YBluetoothLink_get_pairingPin()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PAIRINGPIN_INVALID;
            }
        }
        return this._pairingPin;
    }

    /**
     * Gets an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:a string corresponding to an opaque string if a PIN code has been configured in the
     *         device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PAIRINGPIN_INVALID.
     */
    function YBluetoothLink_get_pairingPin_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PAIRINGPIN_INVALID);
            } else {
                callback(context, obj, obj._pairingPin);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the PIN code used by the module for bluetooth pairing.
     * Remember to call the saveToFlash() method of the module to save the
     * new value in the device flash.
     *
     * @param newval : a string corresponding to the PIN code used by the module for bluetooth pairing
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBluetoothLink_set_pairingPin(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('pairingPin',rest_val);
    }

    /**
     * Returns the MAC-48 address of the remote device to connect to.
     *
     * @return a string corresponding to the MAC-48 address of the remote device to connect to
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTEADDRESS_INVALID.
     */
    function YBluetoothLink_get_remoteAddress()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_REMOTEADDRESS_INVALID;
            }
        }
        return this._remoteAddress;
    }

    /**
     * Gets the MAC-48 address of the remote device to connect to.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:a string corresponding to the MAC-48 address of the remote device to connect to
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_REMOTEADDRESS_INVALID.
     */
    function YBluetoothLink_get_remoteAddress_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_REMOTEADDRESS_INVALID);
            } else {
                callback(context, obj, obj._remoteAddress);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the MAC-48 address defining which remote device to connect to.
     *
     * @param newval : a string corresponding to the MAC-48 address defining which remote device to connect to
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBluetoothLink_set_remoteAddress(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('remoteAddress',rest_val);
    }

    /**
     * Returns the latest status message from the bluetooth interface.
     *
     * @return a string corresponding to the latest status message from the bluetooth interface
     *
     * On failure, throws an exception or returns YBluetoothLink.MESSAGE_INVALID.
     */
    function YBluetoothLink_get_message()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MESSAGE_INVALID;
            }
        }
        return this._message;
    }

    /**
     * Gets the latest status message from the bluetooth interface.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:a string corresponding to the latest status message from the bluetooth interface
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_MESSAGE_INVALID.
     */
    function YBluetoothLink_get_message_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MESSAGE_INVALID);
            } else {
                callback(context, obj, obj._message);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YBluetoothLink_get_command()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_COMMAND_INVALID;
            }
        }
        return this._command;
    }

    /**
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YBluetoothLink_get_command_async(callback,context)
    {
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

    function YBluetoothLink_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a cellular interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the cellular interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBluetoothLink.isOnline() to test if the cellular interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a cellular interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the cellular interface
     *
     * @return a YBluetoothLink object allowing you to drive the cellular interface.
     */
    function YBluetoothLink_FindBluetoothLink(func)             // class method
    {
        var obj;                    // YBluetoothLink;
        obj = YFunction._FindFromCache("BluetoothLink", func);
        if (obj == null) {
            obj = new YBluetoothLink(func);
            YFunction._AddToCache("BluetoothLink", func, obj);
        }
        return obj;
    }

    /**
     * Attempt to connect to the previously selected remote device.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBluetoothLink_connect()
    {
        return this.set_command("C");
    }

    /**
     * Disconnect from the previously selected remote device.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBluetoothLink_disconnect()
    {
        return this.set_command("D");
    }

    /**
     * Continues the enumeration of cellular interfaces started using yFirstBluetoothLink().
     *
     * @return a pointer to a YBluetoothLink object, corresponding to
     *         a cellular interface currently online, or a null pointer
     *         if there are no more cellular interfaces to enumerate.
     */
    function YBluetoothLink_nextBluetoothLink()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YBluetoothLink.FindBluetoothLink(next_hwid);
    }

    /**
     * Starts the enumeration of cellular interfaces currently accessible.
     * Use the method YBluetoothLink.nextBluetoothLink() to iterate on
     * next cellular interfaces.
     *
     * @return a pointer to a YBluetoothLink object, corresponding to
     *         the first cellular interface currently online, or a null pointer
     *         if there are none.
     */
    function YBluetoothLink_FirstBluetoothLink()
    {
        var next_hwid = YAPI.getFirstHardwareId('BluetoothLink');
        if(next_hwid == null) return null;
        return YBluetoothLink.FindBluetoothLink(next_hwid);
    }

    //--- (end of YBluetoothLink implementation)

    //--- (YBluetoothLink initialization)
    YBluetoothLink = YFunction._Subclass(_YBluetoothLink, {
        // Constants
        OWNADDRESS_INVALID          : YAPI_INVALID_STRING,
        PAIRINGPIN_INVALID          : YAPI_INVALID_STRING,
        REMOTEADDRESS_INVALID       : YAPI_INVALID_STRING,
        MESSAGE_INVALID             : YAPI_INVALID_STRING,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindBluetoothLink           : YBluetoothLink_FindBluetoothLink,
        FirstBluetoothLink          : YBluetoothLink_FirstBluetoothLink
    }, {
        // Methods
        get_ownAddress              : YBluetoothLink_get_ownAddress,
        ownAddress                  : YBluetoothLink_get_ownAddress,
        get_ownAddress_async        : YBluetoothLink_get_ownAddress_async,
        ownAddress_async            : YBluetoothLink_get_ownAddress_async,
        get_pairingPin              : YBluetoothLink_get_pairingPin,
        pairingPin                  : YBluetoothLink_get_pairingPin,
        get_pairingPin_async        : YBluetoothLink_get_pairingPin_async,
        pairingPin_async            : YBluetoothLink_get_pairingPin_async,
        set_pairingPin              : YBluetoothLink_set_pairingPin,
        setPairingPin               : YBluetoothLink_set_pairingPin,
        get_remoteAddress           : YBluetoothLink_get_remoteAddress,
        remoteAddress               : YBluetoothLink_get_remoteAddress,
        get_remoteAddress_async     : YBluetoothLink_get_remoteAddress_async,
        remoteAddress_async         : YBluetoothLink_get_remoteAddress_async,
        set_remoteAddress           : YBluetoothLink_set_remoteAddress,
        setRemoteAddress            : YBluetoothLink_set_remoteAddress,
        get_message                 : YBluetoothLink_get_message,
        message                     : YBluetoothLink_get_message,
        get_message_async           : YBluetoothLink_get_message_async,
        message_async               : YBluetoothLink_get_message_async,
        get_command                 : YBluetoothLink_get_command,
        command                     : YBluetoothLink_get_command,
        get_command_async           : YBluetoothLink_get_command_async,
        command_async               : YBluetoothLink_get_command_async,
        set_command                 : YBluetoothLink_set_command,
        setCommand                  : YBluetoothLink_set_command,
        connect                     : YBluetoothLink_connect,
        disconnect                  : YBluetoothLink_disconnect,
        nextBluetoothLink           : YBluetoothLink_nextBluetoothLink,
        _parseAttr                  : YBluetoothLink_parseAttr
    });
    //--- (end of YBluetoothLink initialization)
})();

//--- (BluetoothLink functions)

/**
 * Retrieves a cellular interface for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the cellular interface is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YBluetoothLink.isOnline() to test if the cellular interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a cellular interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the cellular interface
 *
 * @return a YBluetoothLink object allowing you to drive the cellular interface.
 */
function yFindBluetoothLink(func)
{
    return YBluetoothLink.FindBluetoothLink(func);
}

/**
 * Starts the enumeration of cellular interfaces currently accessible.
 * Use the method YBluetoothLink.nextBluetoothLink() to iterate on
 * next cellular interfaces.
 *
 * @return a pointer to a YBluetoothLink object, corresponding to
 *         the first cellular interface currently online, or a null pointer
 *         if there are none.
 */
function yFirstBluetoothLink()
{
    return YBluetoothLink.FirstBluetoothLink();
}

//--- (end of BluetoothLink functions)
