/*********************************************************************
 *
 * $Id: yocto_bluetoothlink.js 26673 2017-02-28 13:44:08Z seb $
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
var Y_MUTE_FALSE                    = 0;
var Y_MUTE_TRUE                     = 1;
var Y_MUTE_INVALID                  = -1;
var Y_LINKSTATE_DOWN                = 0;
var Y_LINKSTATE_FREE                = 1;
var Y_LINKSTATE_SEARCH              = 2;
var Y_LINKSTATE_EXISTS              = 3;
var Y_LINKSTATE_LINKED              = 4;
var Y_LINKSTATE_PLAY                = 5;
var Y_LINKSTATE_INVALID             = -1;
var Y_OWNADDRESS_INVALID            = YAPI_INVALID_STRING;
var Y_PAIRINGPIN_INVALID            = YAPI_INVALID_STRING;
var Y_REMOTEADDRESS_INVALID         = YAPI_INVALID_STRING;
var Y_REMOTENAME_INVALID            = YAPI_INVALID_STRING;
var Y_PREAMPLIFIER_INVALID          = YAPI_INVALID_UINT;
var Y_VOLUME_INVALID                = YAPI_INVALID_UINT;
var Y_LINKQUALITY_INVALID           = YAPI_INVALID_UINT;
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
        this._remoteName                     = Y_REMOTENAME_INVALID;       // Text
        this._mute                           = Y_MUTE_INVALID;             // Bool
        this._preAmplifier                   = Y_PREAMPLIFIER_INVALID;     // Percent
        this._volume                         = Y_VOLUME_INVALID;           // Percent
        this._linkState                      = Y_LINKSTATE_INVALID;        // BtState
        this._linkQuality                    = Y_LINKQUALITY_INVALID;      // Percent
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
        case "remoteName":
            this._remoteName = val;
            return 1;
        case "mute":
            this._mute = parseInt(val);
            return 1;
        case "preAmplifier":
            this._preAmplifier = parseInt(val);
            return 1;
        case "volume":
            this._volume = parseInt(val);
            return 1;
        case "linkState":
            this._linkState = parseInt(val);
            return 1;
        case "linkQuality":
            this._linkQuality = parseInt(val);
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
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_OWNADDRESS_INVALID;
            }
        }
        res = this._ownAddress;
        return res;
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
        var res;                    // string;
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
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PAIRINGPIN_INVALID;
            }
        }
        res = this._pairingPin;
        return res;
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
        var res;                    // string;
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
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_REMOTEADDRESS_INVALID;
            }
        }
        res = this._remoteAddress;
        return res;
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
        var res;                    // string;
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
     * Returns the bluetooth name the remote device, if found on the bluetooth network.
     *
     * @return a string corresponding to the bluetooth name the remote device, if found on the bluetooth network
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTENAME_INVALID.
     */
    function YBluetoothLink_get_remoteName()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_REMOTENAME_INVALID;
            }
        }
        res = this._remoteName;
        return res;
    }

    /**
     * Gets the bluetooth name the remote device, if found on the bluetooth network.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:a string corresponding to the bluetooth name the remote device, if found on the bluetooth network
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_REMOTENAME_INVALID.
     */
    function YBluetoothLink_get_remoteName_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_REMOTENAME_INVALID);
            } else {
                callback(context, obj, obj._remoteName);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the state of the mute function.
     *
     * @return either YBluetoothLink.MUTE_FALSE or YBluetoothLink.MUTE_TRUE, according to the state of the
     * mute function
     *
     * On failure, throws an exception or returns YBluetoothLink.MUTE_INVALID.
     */
    function YBluetoothLink_get_mute()
    {
        var res;                    // enumBOOL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MUTE_INVALID;
            }
        }
        res = this._mute;
        return res;
    }

    /**
     * Gets the state of the mute function.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:either Y_MUTE_FALSE or Y_MUTE_TRUE, according to the state of the mute function
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_MUTE_INVALID.
     */
    function YBluetoothLink_get_mute_async(callback,context)
    {
        var res;                    // enumBOOL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MUTE_INVALID);
            } else {
                callback(context, obj, obj._mute);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval : either YBluetoothLink.MUTE_FALSE or YBluetoothLink.MUTE_TRUE, according to the
     * state of the mute function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBluetoothLink_set_mute(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('mute',rest_val);
    }

    /**
     * Returns the audio pre-amplifier volume, in per cents.
     *
     * @return an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.PREAMPLIFIER_INVALID.
     */
    function YBluetoothLink_get_preAmplifier()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PREAMPLIFIER_INVALID;
            }
        }
        res = this._preAmplifier;
        return res;
    }

    /**
     * Gets the audio pre-amplifier volume, in per cents.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:an integer corresponding to the audio pre-amplifier volume, in per cents
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PREAMPLIFIER_INVALID.
     */
    function YBluetoothLink_get_preAmplifier_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PREAMPLIFIER_INVALID);
            } else {
                callback(context, obj, obj._preAmplifier);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the audio pre-amplifier volume, in per cents.
     *
     * @param newval : an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBluetoothLink_set_preAmplifier(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('preAmplifier',rest_val);
    }

    /**
     * Returns the connected headset volume, in per cents.
     *
     * @return an integer corresponding to the connected headset volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.VOLUME_INVALID.
     */
    function YBluetoothLink_get_volume()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLUME_INVALID;
            }
        }
        res = this._volume;
        return res;
    }

    /**
     * Gets the connected headset volume, in per cents.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:an integer corresponding to the connected headset volume, in per cents
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_VOLUME_INVALID.
     */
    function YBluetoothLink_get_volume_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLUME_INVALID);
            } else {
                callback(context, obj, obj._volume);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the connected headset volume, in per cents.
     *
     * @param newval : an integer corresponding to the connected headset volume, in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YBluetoothLink_set_volume(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('volume',rest_val);
    }

    /**
     * Returns the bluetooth link state.
     *
     * @return a value among YBluetoothLink.LINKSTATE_DOWN, YBluetoothLink.LINKSTATE_FREE,
     * YBluetoothLink.LINKSTATE_SEARCH, YBluetoothLink.LINKSTATE_EXISTS, YBluetoothLink.LINKSTATE_LINKED
     * and YBluetoothLink.LINKSTATE_PLAY corresponding to the bluetooth link state
     *
     * On failure, throws an exception or returns YBluetoothLink.LINKSTATE_INVALID.
     */
    function YBluetoothLink_get_linkState()
    {
        var res;                    // enumBTSTATE;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LINKSTATE_INVALID;
            }
        }
        res = this._linkState;
        return res;
    }

    /**
     * Gets the bluetooth link state.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:a value among Y_LINKSTATE_DOWN, Y_LINKSTATE_FREE, Y_LINKSTATE_SEARCH,
     *         Y_LINKSTATE_EXISTS, Y_LINKSTATE_LINKED and Y_LINKSTATE_PLAY corresponding to the bluetooth link state
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_LINKSTATE_INVALID.
     */
    function YBluetoothLink_get_linkState_async(callback,context)
    {
        var res;                    // enumBTSTATE;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LINKSTATE_INVALID);
            } else {
                callback(context, obj, obj._linkState);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the bluetooth receiver signal strength, in pourcents, or 0 if no connection is established.
     *
     * @return an integer corresponding to the bluetooth receiver signal strength, in pourcents, or 0 if
     * no connection is established
     *
     * On failure, throws an exception or returns YBluetoothLink.LINKQUALITY_INVALID.
     */
    function YBluetoothLink_get_linkQuality()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LINKQUALITY_INVALID;
            }
        }
        res = this._linkQuality;
        return res;
    }

    /**
     * Gets the bluetooth receiver signal strength, in pourcents, or 0 if no connection is established.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:an integer corresponding to the bluetooth receiver signal strength, in pourcents, or 0
     *         if no connection is established
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_LINKQUALITY_INVALID.
     */
    function YBluetoothLink_get_linkQuality_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LINKQUALITY_INVALID);
            } else {
                callback(context, obj, obj._linkQuality);
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
     *         - the YBluetoothLink object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YBluetoothLink_get_command_async(callback,context)
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
        REMOTENAME_INVALID          : YAPI_INVALID_STRING,
        MUTE_FALSE                  : 0,
        MUTE_TRUE                   : 1,
        MUTE_INVALID                : -1,
        PREAMPLIFIER_INVALID        : YAPI_INVALID_UINT,
        VOLUME_INVALID              : YAPI_INVALID_UINT,
        LINKSTATE_DOWN              : 0,
        LINKSTATE_FREE              : 1,
        LINKSTATE_SEARCH            : 2,
        LINKSTATE_EXISTS            : 3,
        LINKSTATE_LINKED            : 4,
        LINKSTATE_PLAY              : 5,
        LINKSTATE_INVALID           : -1,
        LINKQUALITY_INVALID         : YAPI_INVALID_UINT,
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
        get_remoteName              : YBluetoothLink_get_remoteName,
        remoteName                  : YBluetoothLink_get_remoteName,
        get_remoteName_async        : YBluetoothLink_get_remoteName_async,
        remoteName_async            : YBluetoothLink_get_remoteName_async,
        get_mute                    : YBluetoothLink_get_mute,
        mute                        : YBluetoothLink_get_mute,
        get_mute_async              : YBluetoothLink_get_mute_async,
        mute_async                  : YBluetoothLink_get_mute_async,
        set_mute                    : YBluetoothLink_set_mute,
        setMute                     : YBluetoothLink_set_mute,
        get_preAmplifier            : YBluetoothLink_get_preAmplifier,
        preAmplifier                : YBluetoothLink_get_preAmplifier,
        get_preAmplifier_async      : YBluetoothLink_get_preAmplifier_async,
        preAmplifier_async          : YBluetoothLink_get_preAmplifier_async,
        set_preAmplifier            : YBluetoothLink_set_preAmplifier,
        setPreAmplifier             : YBluetoothLink_set_preAmplifier,
        get_volume                  : YBluetoothLink_get_volume,
        volume                      : YBluetoothLink_get_volume,
        get_volume_async            : YBluetoothLink_get_volume_async,
        volume_async                : YBluetoothLink_get_volume_async,
        set_volume                  : YBluetoothLink_set_volume,
        setVolume                   : YBluetoothLink_set_volume,
        get_linkState               : YBluetoothLink_get_linkState,
        linkState                   : YBluetoothLink_get_linkState,
        get_linkState_async         : YBluetoothLink_get_linkState_async,
        linkState_async             : YBluetoothLink_get_linkState_async,
        get_linkQuality             : YBluetoothLink_get_linkQuality,
        linkQuality                 : YBluetoothLink_get_linkQuality,
        get_linkQuality_async       : YBluetoothLink_get_linkQuality_async,
        linkQuality_async           : YBluetoothLink_get_linkQuality_async,
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
