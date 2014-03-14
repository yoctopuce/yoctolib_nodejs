/*********************************************************************
 *
 * $Id: yocto_wireless.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements yFindWireless(), the high-level API for Wireless functions
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
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
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

//--- (generated code: YWireless definitions)
var Y_SECURITY_UNKNOWN              = 0;
var Y_SECURITY_OPEN                 = 1;
var Y_SECURITY_WEP                  = 2;
var Y_SECURITY_WPA                  = 3;
var Y_SECURITY_WPA2                 = 4;
var Y_SECURITY_INVALID              = -1;
var Y_LINKQUALITY_INVALID           = YAPI_INVALID_UINT;
var Y_SSID_INVALID                  = YAPI_INVALID_STRING;
var Y_CHANNEL_INVALID               = YAPI_INVALID_UINT;
var Y_MESSAGE_INVALID               = YAPI_INVALID_STRING;
var Y_WLANCONFIG_INVALID            = YAPI_INVALID_STRING;
//--- (end of generated code: YWireless definitions)

//--- (generated code: YWlanRecord definitions)
//--- (end of generated code: YWlanRecord definitions)

//--- (generated code: YWlanRecord class start)
/**
 * YWlanRecord Class: Description of a wireless network
 * 
 * 
 */
//--- (end of generated code: YWlanRecord class start)

var YWlanRecord; // definition below
(function()
{
    function _YWlanRecord(str_json)
    {       
        //--- (generated code: YWlanRecord constructor)
        this._ssid                           = "";                         // str
        this._channel                        = 0;                          // int
        this._sec                            = "";                         // str
        this._rssi                           = 0;                          // int
        //--- (end of generated code: YWlanRecord constructor)
        
        var loadval = JSON.parse(str_json);
        this._ssid    = loadval.ssid;
        this._channel = loadval.channel;
        this._sec     = loadval.sec;
        this._rssi    = loadval.rssi;
    }

    //--- (generated code: YWlanRecord implementation)

    function YWlanRecord_get_ssid()
    {
        return this._ssid;
    }

    function YWlanRecord_get_channel()
    {
        return this._channel;
    }

    function YWlanRecord_get_security()
    {
        return this._sec;
    }

    function YWlanRecord_get_linkQuality()
    {
        return this._rssi;
    }

    //--- (end of generated code: YWlanRecord implementation)

    //--- (generated code: YWlanRecord initialization)
    YWlanRecord = _YWlanRecord;
    // Methods
    YWlanRecord.prototype.get_ssid                    = YWlanRecord_get_ssid;
    YWlanRecord.prototype.ssid                        = YWlanRecord_get_ssid;
    YWlanRecord.prototype.get_channel                 = YWlanRecord_get_channel;
    YWlanRecord.prototype.channel                     = YWlanRecord_get_channel;
    YWlanRecord.prototype.get_security                = YWlanRecord_get_security;
    YWlanRecord.prototype.security                    = YWlanRecord_get_security;
    YWlanRecord.prototype.get_linkQuality             = YWlanRecord_get_linkQuality;
    YWlanRecord.prototype.linkQuality                 = YWlanRecord_get_linkQuality;
    //--- (end of generated code: YWlanRecord initialization)
})();


//--- (generated code: YWireless class start)
/**
 * YWireless Class: Wireless function interface
 * 
 * YWireless functions provides control over wireless network parameters
 * and status for devices that are wireless-enabled.
 */
//--- (end of generated code: YWireless class start)

var YWireless; // definition below
(function()
{
    function _YWireless(str_func)
    {
        //--- (generated code: YWireless constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Wireless';

        this._linkQuality                    = Y_LINKQUALITY_INVALID;      // Percent
        this._ssid                           = Y_SSID_INVALID;             // Text
        this._channel                        = Y_CHANNEL_INVALID;          // UInt31
        this._security                       = Y_SECURITY_INVALID;         // WLANSec
        this._message                        = Y_MESSAGE_INVALID;          // Text
        this._wlanConfig                     = Y_WLANCONFIG_INVALID;       // WLANConfig
        //--- (end of generated code: YWireless constructor)
    }

    //--- (generated code: YWireless implementation)

    function YWireless_parseAttr(name, val, _super)
    {
        switch(name) {
        case "linkQuality":
            this._linkQuality = parseInt(val);
            return 1;
        case "ssid":
            this._ssid = val;
            return 1;
        case "channel":
            this._channel = parseInt(val);
            return 1;
        case "security":
            this._security = parseInt(val);
            return 1;
        case "message":
            this._message = val;
            return 1;
        case "wlanConfig":
            this._wlanConfig = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the link quality, expressed in percent.
     * 
     * @return an integer corresponding to the link quality, expressed in percent
     * 
     * On failure, throws an exception or returns YWireless.LINKQUALITY_INVALID.
     */
    function YWireless_get_linkQuality()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LINKQUALITY_INVALID;
            }
        }
        return this._linkQuality;
    }

    /**
     * Gets the link quality, expressed in percent.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWireless object that invoked the callback
     *         - the result:an integer corresponding to the link quality, expressed in percent
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LINKQUALITY_INVALID.
     */
    function YWireless_get_linkQuality_async(callback,context)
    {
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

    /**
     * Returns the wireless network name (SSID).
     * 
     * @return a string corresponding to the wireless network name (SSID)
     * 
     * On failure, throws an exception or returns YWireless.SSID_INVALID.
     */
    function YWireless_get_ssid()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SSID_INVALID;
            }
        }
        return this._ssid;
    }

    /**
     * Gets the wireless network name (SSID).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWireless object that invoked the callback
     *         - the result:a string corresponding to the wireless network name (SSID)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_SSID_INVALID.
     */
    function YWireless_get_ssid_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SSID_INVALID);
            } else {
                callback(context, obj, obj._ssid);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the 802.11 channel currently used, or 0 when the selected network has not been found.
     * 
     * @return an integer corresponding to the 802.11 channel currently used, or 0 when the selected
     * network has not been found
     * 
     * On failure, throws an exception or returns YWireless.CHANNEL_INVALID.
     */
    function YWireless_get_channel()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CHANNEL_INVALID;
            }
        }
        return this._channel;
    }

    /**
     * Gets the 802.11 channel currently used, or 0 when the selected network has not been found.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWireless object that invoked the callback
     *         - the result:an integer corresponding to the 802.11 channel currently used, or 0 when the selected
     *         network has not been found
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_CHANNEL_INVALID.
     */
    function YWireless_get_channel_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CHANNEL_INVALID);
            } else {
                callback(context, obj, obj._channel);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the security algorithm used by the selected wireless network.
     * 
     * @return a value among YWireless.SECURITY_UNKNOWN, YWireless.SECURITY_OPEN, YWireless.SECURITY_WEP,
     * YWireless.SECURITY_WPA and YWireless.SECURITY_WPA2 corresponding to the security algorithm used by
     * the selected wireless network
     * 
     * On failure, throws an exception or returns YWireless.SECURITY_INVALID.
     */
    function YWireless_get_security()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SECURITY_INVALID;
            }
        }
        return this._security;
    }

    /**
     * Gets the security algorithm used by the selected wireless network.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWireless object that invoked the callback
     *         - the result:a value among Y_SECURITY_UNKNOWN, Y_SECURITY_OPEN, Y_SECURITY_WEP, Y_SECURITY_WPA and
     *         Y_SECURITY_WPA2 corresponding to the security algorithm used by the selected wireless network
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_SECURITY_INVALID.
     */
    function YWireless_get_security_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SECURITY_INVALID);
            } else {
                callback(context, obj, obj._security);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the latest status message from the wireless interface.
     * 
     * @return a string corresponding to the latest status message from the wireless interface
     * 
     * On failure, throws an exception or returns YWireless.MESSAGE_INVALID.
     */
    function YWireless_get_message()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MESSAGE_INVALID;
            }
        }
        return this._message;
    }

    /**
     * Gets the latest status message from the wireless interface.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWireless object that invoked the callback
     *         - the result:a string corresponding to the latest status message from the wireless interface
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_MESSAGE_INVALID.
     */
    function YWireless_get_message_async(callback,context)
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

    function YWireless_get_wlanConfig()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_WLANCONFIG_INVALID;
            }
        }
        return this._wlanConfig;
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YWireless object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YWireless_get_wlanConfig_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_WLANCONFIG_INVALID);
            } else {
                callback(context, obj, obj._wlanConfig);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YWireless_set_wlanConfig(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('wlanConfig',rest_val);
    }

    /**
     * Changes the configuration of the wireless lan interface to connect to an existing
     * access point (infrastructure mode).
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     * 
     * @param ssid : the name of the network to connect to
     * @param securityKey : the network key, as a character string
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWireless_joinNetwork(ssid,securityKey)
    {   var rest_val;
        rest_val = 'INFRA:'+ssid+'\\'+securityKey;
        return this._setAttr('wlanConfig',rest_val);
    }

    /**
     * Changes the configuration of the wireless lan interface to create an ad-hoc
     * wireless network, without using an access point. If a security key is specified,
     * the network is protected by WEP128, since WPA is not standardized for
     * ad-hoc networks.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     * 
     * @param ssid : the name of the network to connect to
     * @param securityKey : the network key, as a character string
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YWireless_adhocNetwork(ssid,securityKey)
    {   var rest_val;
        rest_val = 'ADHOC:'+ssid+'\\'+securityKey;
        return this._setAttr('wlanConfig',rest_val);
    }

    /**
     * Retrieves a wireless lan interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the wireless lan interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWireless.isOnline() to test if the wireless lan interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wireless lan interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the wireless lan interface
     * 
     * @return a YWireless object allowing you to drive the wireless lan interface.
     */
    function YWireless_FindWireless(func)                       // class method
    {
        var obj;                    // YWireless;
        obj = YFunction._FindFromCache("Wireless", func);
        if (obj == null) {
            obj = new YWireless(func);
            YFunction._AddToCache("Wireless", func, obj);
        }
        return obj;
    }

    /**
     * Returns a list of YWlanRecord objects that describe detected Wireless networks.
     * This list is not updated when the module is already connected to an acces point (infrastructure mode).
     * To force an update of this list, adhocNetwork() must be called to disconnect
     * the module from the current network. The returned list must be unallocated by the caller.
     * 
     * @return a list of YWlanRecord objects, containing the SSID, channel,
     *         link quality and the type of security of the wireless network.
     * 
     * On failure, throws an exception or returns an empty list.
     */
    function YWireless_get_detectedWlans()
    {
        var ii; // iterator
        var json;                   // bin;
        var wlanlist = [];          // strArr;
        var res = [];               // YWlanRecordArr;
        // may throw an exception
        json = this._download("wlan.json?by=name");
        wlanlist = this._json_get_array(json);
        res.length = 0;
        for (ii in wlanlist) {
            res.push(new YWlanRecord(wlanlist[ii]));
        }
        return res;
    }

    /**
     * Continues the enumeration of wireless lan interfaces started using yFirstWireless().
     * 
     * @return a pointer to a YWireless object, corresponding to
     *         a wireless lan interface currently online, or a null pointer
     *         if there are no more wireless lan interfaces to enumerate.
     */
    function YWireless_nextWireless()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YWireless.FindWireless(next_hwid);
    }

    /**
     * Starts the enumeration of wireless lan interfaces currently accessible.
     * Use the method YWireless.nextWireless() to iterate on
     * next wireless lan interfaces.
     * 
     * @return a pointer to a YWireless object, corresponding to
     *         the first wireless lan interface currently online, or a null pointer
     *         if there are none.
     */
    function YWireless_FirstWireless()
    {
        var next_hwid = YAPI.getFirstHardwareId('Wireless');
        if(next_hwid == null) return null;
        return YWireless.FindWireless(next_hwid);
    }

    //--- (end of generated code: YWireless implementation)

    //--- (generated code: YWireless initialization)
    YWireless = YFunction._Subclass(_YWireless, {
        // Constants
        LINKQUALITY_INVALID         : YAPI_INVALID_UINT,
        SSID_INVALID                : YAPI_INVALID_STRING,
        CHANNEL_INVALID             : YAPI_INVALID_UINT,
        SECURITY_UNKNOWN            : 0,
        SECURITY_OPEN               : 1,
        SECURITY_WEP                : 2,
        SECURITY_WPA                : 3,
        SECURITY_WPA2               : 4,
        SECURITY_INVALID            : -1,
        MESSAGE_INVALID             : YAPI_INVALID_STRING,
        WLANCONFIG_INVALID          : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindWireless                : YWireless_FindWireless,
        FirstWireless               : YWireless_FirstWireless
    }, {
        // Methods
        get_linkQuality             : YWireless_get_linkQuality,
        linkQuality                 : YWireless_get_linkQuality,
        get_linkQuality_async       : YWireless_get_linkQuality_async,
        linkQuality_async           : YWireless_get_linkQuality_async,
        get_ssid                    : YWireless_get_ssid,
        ssid                        : YWireless_get_ssid,
        get_ssid_async              : YWireless_get_ssid_async,
        ssid_async                  : YWireless_get_ssid_async,
        get_channel                 : YWireless_get_channel,
        channel                     : YWireless_get_channel,
        get_channel_async           : YWireless_get_channel_async,
        channel_async               : YWireless_get_channel_async,
        get_security                : YWireless_get_security,
        security                    : YWireless_get_security,
        get_security_async          : YWireless_get_security_async,
        security_async              : YWireless_get_security_async,
        get_message                 : YWireless_get_message,
        message                     : YWireless_get_message,
        get_message_async           : YWireless_get_message_async,
        message_async               : YWireless_get_message_async,
        get_wlanConfig              : YWireless_get_wlanConfig,
        wlanConfig                  : YWireless_get_wlanConfig,
        get_wlanConfig_async        : YWireless_get_wlanConfig_async,
        wlanConfig_async            : YWireless_get_wlanConfig_async,
        set_wlanConfig              : YWireless_set_wlanConfig,
        setWlanConfig               : YWireless_set_wlanConfig,
        joinNetwork                 : YWireless_joinNetwork,
        adhocNetwork                : YWireless_adhocNetwork,
        get_detectedWlans           : YWireless_get_detectedWlans,
        detectedWlans               : YWireless_get_detectedWlans,
        nextWireless                : YWireless_nextWireless,
        _parseAttr                  : YWireless_parseAttr
    });
    //--- (end of generated code: YWireless initialization)
})();

//--- (generated code: Wireless functions)

/**
 * Retrieves a wireless lan interface for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the wireless lan interface is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YWireless.isOnline() to test if the wireless lan interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a wireless lan interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the wireless lan interface
 * 
 * @return a YWireless object allowing you to drive the wireless lan interface.
 */
function yFindWireless(func)
{
    return YWireless.FindWireless(func);
}

/**
 * Starts the enumeration of wireless lan interfaces currently accessible.
 * Use the method YWireless.nextWireless() to iterate on
 * next wireless lan interfaces.
 * 
 * @return a pointer to a YWireless object, corresponding to
 *         the first wireless lan interface currently online, or a null pointer
 *         if there are none.
 */
function yFirstWireless()
{
    return YWireless.FirstWireless();
}

//--- (end of generated code: Wireless functions)
