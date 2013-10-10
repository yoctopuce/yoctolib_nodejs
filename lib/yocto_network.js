/*********************************************************************
 *
 * $Id: yocto_network.js 13052 2013-10-10 14:33:45Z mvuilleu $
 *
 * Implements yFindNetwork(), the high-level API for Network functions
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
//--- (YNetwork definitions)
var Y_READINESS_DOWN                = 0;
var Y_READINESS_EXISTS              = 1;
var Y_READINESS_LINKED              = 2;
var Y_READINESS_LAN_OK              = 3;
var Y_READINESS_WWW_OK              = 4;
var Y_READINESS_INVALID             = -1;
var Y_DISCOVERABLE_FALSE            = 0;
var Y_DISCOVERABLE_TRUE             = 1;
var Y_DISCOVERABLE_INVALID          = -1;
var Y_CALLBACKMETHOD_POST           = 0;
var Y_CALLBACKMETHOD_GET            = 1;
var Y_CALLBACKMETHOD_PUT            = 2;
var Y_CALLBACKMETHOD_INVALID        = -1;
var Y_CALLBACKENCODING_FORM         = 0;
var Y_CALLBACKENCODING_JSON         = 1;
var Y_CALLBACKENCODING_JSON_ARRAY   = 2;
var Y_CALLBACKENCODING_CSV          = 3;
var Y_CALLBACKENCODING_YOCTO_API    = 4;
var Y_CALLBACKENCODING_INVALID      = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_MACADDRESS_INVALID            = "!INVALID!";
var Y_IPADDRESS_INVALID             = "!INVALID!";
var Y_SUBNETMASK_INVALID            = "!INVALID!";
var Y_ROUTER_INVALID                = "!INVALID!";
var Y_IPCONFIG_INVALID              = "!INVALID!";
var Y_PRIMARYDNS_INVALID            = "!INVALID!";
var Y_SECONDARYDNS_INVALID          = "!INVALID!";
var Y_USERPASSWORD_INVALID          = "!INVALID!";
var Y_ADMINPASSWORD_INVALID         = "!INVALID!";
var Y_WWWWATCHDOGDELAY_INVALID      = -1;
var Y_CALLBACKURL_INVALID           = "!INVALID!";
var Y_CALLBACKCREDENTIALS_INVALID   = "!INVALID!";
var Y_CALLBACKMINDELAY_INVALID      = -1;
var Y_CALLBACKMAXDELAY_INVALID      = -1;
var Y_POECURRENT_INVALID            = -1;
//--- (end of YNetwork definitions)

/**
 * YNetwork Class: Network function interface
 * 
 * YNetwork objects provide access to TCP/IP parameters of Yoctopuce
 * modules that include a built-in network interface.
 */
var YNetwork; // definition below
(function()
{
    //--- (YNetwork implementation)

    /**
     * Returns the logical name of the network interface, corresponding to the network name of the module.
     * 
     * @return a string corresponding to the logical name of the network interface, corresponding to the
     * network name of the module
     * 
     * On failure, throws an exception or returns YNetwork.LOGICALNAME_INVALID.
     */
    function YNetwork_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the network interface, corresponding to the network name of the module.
     * 
     * @return a string corresponding to the logical name of the network interface, corresponding to the
     * network name of the module
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the network interface, corresponding to the network name of the module.
     * You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the network interface, corresponding
     * to the network name of the module
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the network interface (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the network interface (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YNetwork.ADVERTISEDVALUE_INVALID.
     */
    function YNetwork_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the network interface (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the network interface (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the current established working mode of the network interface.
     * Level zero (DOWN_0) means that no hardware link has been detected. Either there is no signal
     * on the network cable, or the selected wireless access point cannot be detected.
     * Level 1 (LIVE_1) is reached when the network is detected, but is not yet connected.
     * For a wireless network, this shows that the requested SSID is present.
     * Level 2 (LINK_2) is reached when the hardware connection is established.
     * For a wired network connection, level 2 means that the cable is attached at both ends.
     * For a connection to a wireless access point, it shows that the security parameters
     * are properly configured. For an ad-hoc wireless connection, it means that there is
     * at least one other device connected on the ad-hoc network.
     * Level 3 (DHCP_3) is reached when an IP address has been obtained using DHCP.
     * Level 4 (DNS_4) is reached when the DNS server is reachable on the network.
     * Level 5 (WWW_5) is reached when global connectivity is demonstrated by properly loading the
     * current time from an NTP server.
     * 
     * @return a value among YNetwork.READINESS_DOWN, YNetwork.READINESS_EXISTS,
     * YNetwork.READINESS_LINKED, YNetwork.READINESS_LAN_OK and YNetwork.READINESS_WWW_OK corresponding to
     * the current established working mode of the network interface
     * 
     * On failure, throws an exception or returns YNetwork.READINESS_INVALID.
     */
    function YNetwork_get_readiness()
    {   var json_val = this._getAttr('readiness');
        return (json_val == null ? Y_READINESS_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current established working mode of the network interface.
     * Level zero (DOWN_0) means that no hardware link has been detected. Either there is no signal
     * on the network cable, or the selected wireless access point cannot be detected.
     * Level 1 (LIVE_1) is reached when the network is detected, but is not yet connected.
     * For a wireless network, this shows that the requested SSID is present.
     * Level 2 (LINK_2) is reached when the hardware connection is established.
     * For a wired network connection, level 2 means that the cable is attached at both ends.
     * For a connection to a wireless access point, it shows that the security parameters
     * are properly configured. For an ad-hoc wireless connection, it means that there is
     * at least one other device connected on the ad-hoc network.
     * Level 3 (DHCP_3) is reached when an IP address has been obtained using DHCP.
     * Level 4 (DNS_4) is reached when the DNS server is reachable on the network.
     * Level 5 (WWW_5) is reached when global connectivity is demonstrated by properly loading the
     * current time from an NTP server.
     * 
     * @return a value among Y_READINESS_DOWN, Y_READINESS_EXISTS, Y_READINESS_LINKED, Y_READINESS_LAN_OK
     * and Y_READINESS_WWW_OK corresponding to the current established working mode of the network interface
     * 
     * On failure, throws an exception or returns Y_READINESS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_readiness_async(func_callback, obj_context)
    {   this._getAttr_async('readiness',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_READINESS_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the MAC address of the network interface. The MAC address is also available on a sticker
     * on the module, in both numeric and barcode forms.
     * 
     * @return a string corresponding to the MAC address of the network interface
     * 
     * On failure, throws an exception or returns YNetwork.MACADDRESS_INVALID.
     */
    function YNetwork_get_macAddress()
    {   var json_val = this._getFixedAttr('macAddress');
        return (json_val == null ? Y_MACADDRESS_INVALID : json_val);
    }

    /**
     * Returns the MAC address of the network interface. The MAC address is also available on a sticker
     * on the module, in both numeric and barcode forms.
     * 
     * @return a string corresponding to the MAC address of the network interface
     * 
     * On failure, throws an exception or returns Y_MACADDRESS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_macAddress_async(func_callback, obj_context)
    {   this._getAttr_async('macAddress',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_MACADDRESS_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the IP address currently in use by the device. The address may have been configured
     * statically, or provided by a DHCP server.
     * 
     * @return a string corresponding to the IP address currently in use by the device
     * 
     * On failure, throws an exception or returns YNetwork.IPADDRESS_INVALID.
     */
    function YNetwork_get_ipAddress()
    {   var json_val = this._getAttr('ipAddress');
        return (json_val == null ? Y_IPADDRESS_INVALID : json_val);
    }

    /**
     * Returns the IP address currently in use by the device. The address may have been configured
     * statically, or provided by a DHCP server.
     * 
     * @return a string corresponding to the IP address currently in use by the device
     * 
     * On failure, throws an exception or returns Y_IPADDRESS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_ipAddress_async(func_callback, obj_context)
    {   this._getAttr_async('ipAddress',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_IPADDRESS_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the subnet mask currently used by the device.
     * 
     * @return a string corresponding to the subnet mask currently used by the device
     * 
     * On failure, throws an exception or returns YNetwork.SUBNETMASK_INVALID.
     */
    function YNetwork_get_subnetMask()
    {   var json_val = this._getAttr('subnetMask');
        return (json_val == null ? Y_SUBNETMASK_INVALID : json_val);
    }

    /**
     * Returns the subnet mask currently used by the device.
     * 
     * @return a string corresponding to the subnet mask currently used by the device
     * 
     * On failure, throws an exception or returns Y_SUBNETMASK_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_subnetMask_async(func_callback, obj_context)
    {   this._getAttr_async('subnetMask',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SUBNETMASK_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the IP address of the router on the device subnet (default gateway).
     * 
     * @return a string corresponding to the IP address of the router on the device subnet (default gateway)
     * 
     * On failure, throws an exception or returns YNetwork.ROUTER_INVALID.
     */
    function YNetwork_get_router()
    {   var json_val = this._getAttr('router');
        return (json_val == null ? Y_ROUTER_INVALID : json_val);
    }

    /**
     * Returns the IP address of the router on the device subnet (default gateway).
     * 
     * @return a string corresponding to the IP address of the router on the device subnet (default gateway)
     * 
     * On failure, throws an exception or returns Y_ROUTER_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_router_async(func_callback, obj_context)
    {   this._getAttr_async('router',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ROUTER_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YNetwork_get_ipConfig()
    {   var json_val = this._getAttr('ipConfig');
        return (json_val == null ? Y_IPCONFIG_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_ipConfig_async(func_callback, obj_context)
    {   this._getAttr_async('ipConfig',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_IPCONFIG_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YNetwork_set_ipConfig(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('ipConfig',rest_val);
    }

    /**
     * Changes the configuration of the network interface to enable the use of an
     * IP address received from a DHCP server. Until an address is received from a DHCP
     * server, the module uses the IP parameters specified to this function.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     * 
     * @param fallbackIpAddr : fallback IP address, to be used when no DHCP reply is received
     * @param fallbackSubnetMaskLen : fallback subnet mask length when no DHCP reply is received, as an
     *         integer (eg. 24 means 255.255.255.0)
     * @param fallbackRouter : fallback router IP address, to be used when no DHCP reply is received
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_useDHCP(str_fallbackIpAddr,int_fallbackSubnetMaskLen,str_fallbackRouter)
    {   var rest_val;
        rest_val = 'DHCP:'+str_fallbackIpAddr+'/'+int_fallbackSubnetMaskLen.toString()+'/'+str_fallbackRouter;
        return this._setAttr('ipConfig',rest_val);
    }

    /**
     * Changes the configuration of the network interface to use a static IP address.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     * 
     * @param ipAddress : device IP address
     * @param subnetMaskLen : subnet mask length, as an integer (eg. 24 means 255.255.255.0)
     * @param router : router IP address (default gateway)
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_useStaticIP(str_ipAddress,int_subnetMaskLen,str_router)
    {   var rest_val;
        rest_val = 'STATIC:'+str_ipAddress+'/'+int_subnetMaskLen.toString()+'/'+str_router;
        return this._setAttr('ipConfig',rest_val);
    }

    /**
     * Returns the IP address of the primary name server to be used by the module.
     * 
     * @return a string corresponding to the IP address of the primary name server to be used by the module
     * 
     * On failure, throws an exception or returns YNetwork.PRIMARYDNS_INVALID.
     */
    function YNetwork_get_primaryDNS()
    {   var json_val = this._getAttr('primaryDNS');
        return (json_val == null ? Y_PRIMARYDNS_INVALID : json_val);
    }

    /**
     * Returns the IP address of the primary name server to be used by the module.
     * 
     * @return a string corresponding to the IP address of the primary name server to be used by the module
     * 
     * On failure, throws an exception or returns Y_PRIMARYDNS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_primaryDNS_async(func_callback, obj_context)
    {   this._getAttr_async('primaryDNS',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_PRIMARYDNS_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the IP address of the primary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     * 
     * @param newval : a string corresponding to the IP address of the primary name server to be used by the module
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_primaryDNS(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('primaryDNS',rest_val);
    }

    /**
     * Returns the IP address of the secondary name server to be used by the module.
     * 
     * @return a string corresponding to the IP address of the secondary name server to be used by the module
     * 
     * On failure, throws an exception or returns YNetwork.SECONDARYDNS_INVALID.
     */
    function YNetwork_get_secondaryDNS()
    {   var json_val = this._getAttr('secondaryDNS');
        return (json_val == null ? Y_SECONDARYDNS_INVALID : json_val);
    }

    /**
     * Returns the IP address of the secondary name server to be used by the module.
     * 
     * @return a string corresponding to the IP address of the secondary name server to be used by the module
     * 
     * On failure, throws an exception or returns Y_SECONDARYDNS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_secondaryDNS_async(func_callback, obj_context)
    {   this._getAttr_async('secondaryDNS',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SECONDARYDNS_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the IP address of the secondary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     * 
     * @param newval : a string corresponding to the IP address of the secondary name server to be used by the module
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_secondaryDNS(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('secondaryDNS',rest_val);
    }

    /**
     * Returns a hash string if a password has been set for "user" user,
     * or an empty string otherwise.
     * 
     * @return a string corresponding to a hash string if a password has been set for "user" user,
     *         or an empty string otherwise
     * 
     * On failure, throws an exception or returns YNetwork.USERPASSWORD_INVALID.
     */
    function YNetwork_get_userPassword()
    {   var json_val = this._getAttr('userPassword');
        return (json_val == null ? Y_USERPASSWORD_INVALID : json_val);
    }

    /**
     * Returns a hash string if a password has been set for "user" user,
     * or an empty string otherwise.
     * 
     * @return a string corresponding to a hash string if a password has been set for "user" user,
     *         or an empty string otherwise
     * 
     * On failure, throws an exception or returns Y_USERPASSWORD_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_userPassword_async(func_callback, obj_context)
    {   this._getAttr_async('userPassword',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_USERPASSWORD_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the password for the "user" user. This password becomes instantly required
     * to perform any use of the module. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the password for the "user" user
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_userPassword(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('userPassword',rest_val);
    }

    /**
     * Returns a hash string if a password has been set for user "admin",
     * or an empty string otherwise.
     * 
     * @return a string corresponding to a hash string if a password has been set for user "admin",
     *         or an empty string otherwise
     * 
     * On failure, throws an exception or returns YNetwork.ADMINPASSWORD_INVALID.
     */
    function YNetwork_get_adminPassword()
    {   var json_val = this._getAttr('adminPassword');
        return (json_val == null ? Y_ADMINPASSWORD_INVALID : json_val);
    }

    /**
     * Returns a hash string if a password has been set for user "admin",
     * or an empty string otherwise.
     * 
     * @return a string corresponding to a hash string if a password has been set for user "admin",
     *         or an empty string otherwise
     * 
     * On failure, throws an exception or returns Y_ADMINPASSWORD_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_adminPassword_async(func_callback, obj_context)
    {   this._getAttr_async('adminPassword',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADMINPASSWORD_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the password for the "admin" user. This password becomes instantly required
     * to perform any change of the module state. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the password for the "admin" user
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_adminPassword(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('adminPassword',rest_val);
    }

    /**
     * Returns the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     * 
     * @return either YNetwork.DISCOVERABLE_FALSE or YNetwork.DISCOVERABLE_TRUE, according to the
     * activation state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     * 
     * On failure, throws an exception or returns YNetwork.DISCOVERABLE_INVALID.
     */
    function YNetwork_get_discoverable()
    {   var json_val = this._getAttr('discoverable');
        return (json_val == null ? Y_DISCOVERABLE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     * 
     * @return either Y_DISCOVERABLE_FALSE or Y_DISCOVERABLE_TRUE, according to the activation state of
     * the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     * 
     * On failure, throws an exception or returns Y_DISCOVERABLE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_discoverable_async(func_callback, obj_context)
    {   this._getAttr_async('discoverable',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_DISCOVERABLE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     * 
     * @param newval : either YNetwork.DISCOVERABLE_FALSE or YNetwork.DISCOVERABLE_TRUE, according to the
     * activation state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_discoverable(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('discoverable',rest_val);
    }

    /**
     * Returns the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss.
     * 
     * @return an integer corresponding to the allowed downtime of the WWW link (in seconds) before
     * triggering an automated
     *         reboot to try to recover Internet connectivity
     * 
     * On failure, throws an exception or returns YNetwork.WWWWATCHDOGDELAY_INVALID.
     */
    function YNetwork_get_wwwWatchdogDelay()
    {   var json_val = this._getAttr('wwwWatchdogDelay');
        return (json_val == null ? Y_WWWWATCHDOGDELAY_INVALID : parseInt(json_val));
    }

    /**
     * Returns the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss.
     * 
     * @return an integer corresponding to the allowed downtime of the WWW link (in seconds) before
     * triggering an automated
     *         reboot to try to recover Internet connectivity
     * 
     * On failure, throws an exception or returns Y_WWWWATCHDOGDELAY_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_wwwWatchdogDelay_async(func_callback, obj_context)
    {   this._getAttr_async('wwwWatchdogDelay',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_WWWWATCHDOGDELAY_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss. The smallest valid non-zero timeout is
     * 90 seconds.
     * 
     * @param newval : an integer corresponding to the allowed downtime of the WWW link (in seconds)
     * before triggering an automated
     *         reboot to try to recover Internet connectivity
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_wwwWatchdogDelay(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('wwwWatchdogDelay',rest_val);
    }

    /**
     * Returns the callback URL to notify of significant state changes.
     * 
     * @return a string corresponding to the callback URL to notify of significant state changes
     * 
     * On failure, throws an exception or returns YNetwork.CALLBACKURL_INVALID.
     */
    function YNetwork_get_callbackUrl()
    {   var json_val = this._getAttr('callbackUrl');
        return (json_val == null ? Y_CALLBACKURL_INVALID : json_val);
    }

    /**
     * Returns the callback URL to notify of significant state changes.
     * 
     * @return a string corresponding to the callback URL to notify of significant state changes
     * 
     * On failure, throws an exception or returns Y_CALLBACKURL_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_callbackUrl_async(func_callback, obj_context)
    {   this._getAttr_async('callbackUrl',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALLBACKURL_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the callback URL to notify significant state changes. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     * 
     * @param newval : a string corresponding to the callback URL to notify significant state changes
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackUrl(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('callbackUrl',rest_val);
    }

    /**
     * Returns the HTTP method used to notify callbacks for significant state changes.
     * 
     * @return a value among YNetwork.CALLBACKMETHOD_POST, YNetwork.CALLBACKMETHOD_GET and
     * YNetwork.CALLBACKMETHOD_PUT corresponding to the HTTP method used to notify callbacks for
     * significant state changes
     * 
     * On failure, throws an exception or returns YNetwork.CALLBACKMETHOD_INVALID.
     */
    function YNetwork_get_callbackMethod()
    {   var json_val = this._getAttr('callbackMethod');
        return (json_val == null ? Y_CALLBACKMETHOD_INVALID : parseInt(json_val));
    }

    /**
     * Returns the HTTP method used to notify callbacks for significant state changes.
     * 
     * @return a value among Y_CALLBACKMETHOD_POST, Y_CALLBACKMETHOD_GET and Y_CALLBACKMETHOD_PUT
     * corresponding to the HTTP method used to notify callbacks for significant state changes
     * 
     * On failure, throws an exception or returns Y_CALLBACKMETHOD_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_callbackMethod_async(func_callback, obj_context)
    {   this._getAttr_async('callbackMethod',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALLBACKMETHOD_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the HTTP method used to notify callbacks for significant state changes.
     * 
     * @param newval : a value among YNetwork.CALLBACKMETHOD_POST, YNetwork.CALLBACKMETHOD_GET and
     * YNetwork.CALLBACKMETHOD_PUT corresponding to the HTTP method used to notify callbacks for
     * significant state changes
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackMethod(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('callbackMethod',rest_val);
    }

    /**
     * Returns the encoding standard to use for representing notification values.
     * 
     * @return a value among YNetwork.CALLBACKENCODING_FORM, YNetwork.CALLBACKENCODING_JSON,
     * YNetwork.CALLBACKENCODING_JSON_ARRAY, YNetwork.CALLBACKENCODING_CSV and
     * YNetwork.CALLBACKENCODING_YOCTO_API corresponding to the encoding standard to use for representing
     * notification values
     * 
     * On failure, throws an exception or returns YNetwork.CALLBACKENCODING_INVALID.
     */
    function YNetwork_get_callbackEncoding()
    {   var json_val = this._getAttr('callbackEncoding');
        return (json_val == null ? Y_CALLBACKENCODING_INVALID : parseInt(json_val));
    }

    /**
     * Returns the encoding standard to use for representing notification values.
     * 
     * @return a value among Y_CALLBACKENCODING_FORM, Y_CALLBACKENCODING_JSON,
     * Y_CALLBACKENCODING_JSON_ARRAY, Y_CALLBACKENCODING_CSV and Y_CALLBACKENCODING_YOCTO_API
     * corresponding to the encoding standard to use for representing notification values
     * 
     * On failure, throws an exception or returns Y_CALLBACKENCODING_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_callbackEncoding_async(func_callback, obj_context)
    {   this._getAttr_async('callbackEncoding',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALLBACKENCODING_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the encoding standard to use for representing notification values.
     * 
     * @param newval : a value among YNetwork.CALLBACKENCODING_FORM, YNetwork.CALLBACKENCODING_JSON,
     * YNetwork.CALLBACKENCODING_JSON_ARRAY, YNetwork.CALLBACKENCODING_CSV and
     * YNetwork.CALLBACKENCODING_YOCTO_API corresponding to the encoding standard to use for representing
     * notification values
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackEncoding(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('callbackEncoding',rest_val);
    }

    /**
     * Returns a hashed version of the notification callback credentials if set,
     * or an empty string otherwise.
     * 
     * @return a string corresponding to a hashed version of the notification callback credentials if set,
     *         or an empty string otherwise
     * 
     * On failure, throws an exception or returns YNetwork.CALLBACKCREDENTIALS_INVALID.
     */
    function YNetwork_get_callbackCredentials()
    {   var json_val = this._getAttr('callbackCredentials');
        return (json_val == null ? Y_CALLBACKCREDENTIALS_INVALID : json_val);
    }

    /**
     * Returns a hashed version of the notification callback credentials if set,
     * or an empty string otherwise.
     * 
     * @return a string corresponding to a hashed version of the notification callback credentials if set,
     *         or an empty string otherwise
     * 
     * On failure, throws an exception or returns Y_CALLBACKCREDENTIALS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_callbackCredentials_async(func_callback, obj_context)
    {   this._getAttr_async('callbackCredentials',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALLBACKCREDENTIALS_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the credentials required to connect to the callback address. The credentials
     * must be provided as returned by function get_callbackCredentials,
     * in the form username:hash. The method used to compute the hash varies according
     * to the the authentication scheme implemented by the callback, For Basic authentication,
     * the hash is the MD5 of the string username:password. For Digest authentication,
     * the hash is the MD5 of the string username:realm:password. For a simpler
     * way to configure callback credentials, use function callbackLogin instead.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the credentials required to connect to the callback address
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackCredentials(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('callbackCredentials',rest_val);
    }

    /**
     * Connects to the notification callback and saves the credentials required to
     * log into it. The password is not stored into the module, only a hashed
     * copy of the credentials are saved. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     * 
     * @param username : username required to log to the callback
     * @param password : password required to log to the callback
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_callbackLogin(str_username,str_password)
    {   var rest_val;
        rest_val = str_username+':'+str_password;
        return this._setAttr('callbackCredentials',rest_val);
    }

    /**
     * Returns the minimum waiting time between two callback notifications, in seconds.
     * 
     * @return an integer corresponding to the minimum waiting time between two callback notifications, in seconds
     * 
     * On failure, throws an exception or returns YNetwork.CALLBACKMINDELAY_INVALID.
     */
    function YNetwork_get_callbackMinDelay()
    {   var json_val = this._getAttr('callbackMinDelay');
        return (json_val == null ? Y_CALLBACKMINDELAY_INVALID : parseInt(json_val));
    }

    /**
     * Returns the minimum waiting time between two callback notifications, in seconds.
     * 
     * @return an integer corresponding to the minimum waiting time between two callback notifications, in seconds
     * 
     * On failure, throws an exception or returns Y_CALLBACKMINDELAY_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_callbackMinDelay_async(func_callback, obj_context)
    {   this._getAttr_async('callbackMinDelay',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALLBACKMINDELAY_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the minimum waiting time between two callback notifications, in seconds.
     * 
     * @param newval : an integer corresponding to the minimum waiting time between two callback
     * notifications, in seconds
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackMinDelay(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('callbackMinDelay',rest_val);
    }

    /**
     * Returns the maximum waiting time between two callback notifications, in seconds.
     * 
     * @return an integer corresponding to the maximum waiting time between two callback notifications, in seconds
     * 
     * On failure, throws an exception or returns YNetwork.CALLBACKMAXDELAY_INVALID.
     */
    function YNetwork_get_callbackMaxDelay()
    {   var json_val = this._getAttr('callbackMaxDelay');
        return (json_val == null ? Y_CALLBACKMAXDELAY_INVALID : parseInt(json_val));
    }

    /**
     * Returns the maximum waiting time between two callback notifications, in seconds.
     * 
     * @return an integer corresponding to the maximum waiting time between two callback notifications, in seconds
     * 
     * On failure, throws an exception or returns Y_CALLBACKMAXDELAY_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_callbackMaxDelay_async(func_callback, obj_context)
    {   this._getAttr_async('callbackMaxDelay',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CALLBACKMAXDELAY_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the maximum waiting time between two callback notifications, in seconds.
     * 
     * @param newval : an integer corresponding to the maximum waiting time between two callback
     * notifications, in seconds
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YNetwork_set_callbackMaxDelay(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('callbackMaxDelay',rest_val);
    }

    /**
     * Returns the current consumed by the module from Power-over-Ethernet (PoE), in milli-amps.
     * The current consumption is measured after converting PoE source to 5 Volt, and should
     * never exceed 1800 mA.
     * 
     * @return an integer corresponding to the current consumed by the module from Power-over-Ethernet
     * (PoE), in milli-amps
     * 
     * On failure, throws an exception or returns YNetwork.POECURRENT_INVALID.
     */
    function YNetwork_get_poeCurrent()
    {   var json_val = this._getAttr('poeCurrent');
        return (json_val == null ? Y_POECURRENT_INVALID : parseInt(json_val));
    }

    /**
     * Returns the current consumed by the module from Power-over-Ethernet (PoE), in milli-amps.
     * The current consumption is measured after converting PoE source to 5 Volt, and should
     * never exceed 1800 mA.
     * 
     * @return an integer corresponding to the current consumed by the module from Power-over-Ethernet
     * (PoE), in milli-amps
     * 
     * On failure, throws an exception or returns Y_POECURRENT_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YNetwork_get_poeCurrent_async(func_callback, obj_context)
    {   this._getAttr_async('poeCurrent',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_POECURRENT_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Pings str_host to test the network connectivity. Sends four ICMP ECHO_REQUEST requests from the
     * module to the target str_host. This method returns a string with the result of the
     * 4 ICMP ECHO_REQUEST requests.
     * 
     * @param host : the hostname or the IP address of the target
     * 
     * @return a string with the result of the ping.
     */
    function YNetwork_ping(str_host)
    {
        var content; // type: bin;
        content = this._download("ping.txt?host="+str_host);
        return content;
        
    }

    /**
     * Continues the enumeration of network interfaces started using yFirstNetwork().
     * 
     * @return a pointer to a YNetwork object, corresponding to
     *         a network interface currently online, or a null pointer
     *         if there are no more network interfaces to enumerate.
     */
    function YNetwork_nextNetwork()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YNetwork.FindNetwork(next_hwid);
    }

    /**
     * Retrieves a network interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the network interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YNetwork.isOnline() to test if the network interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a network interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the network interface
     * 
     * @return a YNetwork object allowing you to drive the network interface.
     */
    function YNetwork_FindNetwork(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Network', str_func);
        if(obj_func) return obj_func;
        return new YNetwork(str_func);
    }

    /**
     * Starts the enumeration of network interfaces currently accessible.
     * Use the method YNetwork.nextNetwork() to iterate on
     * next network interfaces.
     * 
     * @return a pointer to a YNetwork object, corresponding to
     *         the first network interface currently online, or a null pointer
     *         if there are none.
     */
    function YNetwork_FirstNetwork()
    {
        var next_hwid = YAPI.getFirstHardwareId('Network');
        if(next_hwid == null) return null;
        return YNetwork.FindNetwork(next_hwid);
    }

    //--- (end of YNetwork implementation)

    function _YNetwork(str_func)
    {
        //--- (YNetwork constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Network', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.READINESS_DOWN                  = 0;
        this.READINESS_EXISTS                = 1;
        this.READINESS_LINKED                = 2;
        this.READINESS_LAN_OK                = 3;
        this.READINESS_WWW_OK                = 4;
        this.READINESS_INVALID               = -1;
        this.MACADDRESS_INVALID              = "!INVALID!";
        this.IPADDRESS_INVALID               = "!INVALID!";
        this.SUBNETMASK_INVALID              = "!INVALID!";
        this.ROUTER_INVALID                  = "!INVALID!";
        this.IPCONFIG_INVALID                = "!INVALID!";
        this.PRIMARYDNS_INVALID              = "!INVALID!";
        this.SECONDARYDNS_INVALID            = "!INVALID!";
        this.USERPASSWORD_INVALID            = "!INVALID!";
        this.ADMINPASSWORD_INVALID           = "!INVALID!";
        this.DISCOVERABLE_FALSE              = 0;
        this.DISCOVERABLE_TRUE               = 1;
        this.DISCOVERABLE_INVALID            = -1;
        this.WWWWATCHDOGDELAY_INVALID        = -1;
        this.CALLBACKURL_INVALID             = "!INVALID!";
        this.CALLBACKMETHOD_POST             = 0;
        this.CALLBACKMETHOD_GET              = 1;
        this.CALLBACKMETHOD_PUT              = 2;
        this.CALLBACKMETHOD_INVALID          = -1;
        this.CALLBACKENCODING_FORM           = 0;
        this.CALLBACKENCODING_JSON           = 1;
        this.CALLBACKENCODING_JSON_ARRAY     = 2;
        this.CALLBACKENCODING_CSV            = 3;
        this.CALLBACKENCODING_YOCTO_API      = 4;
        this.CALLBACKENCODING_INVALID        = -1;
        this.CALLBACKCREDENTIALS_INVALID     = "!INVALID!";
        this.CALLBACKMINDELAY_INVALID        = -1;
        this.CALLBACKMAXDELAY_INVALID        = -1;
        this.POECURRENT_INVALID              = -1;
        this.get_logicalName                 = YNetwork_get_logicalName;
        this.logicalName                     = YNetwork_get_logicalName;
        this.get_logicalName_async           = YNetwork_get_logicalName_async;
        this.logicalName_async               = YNetwork_get_logicalName_async;
        this.set_logicalName                 = YNetwork_set_logicalName;
        this.setLogicalName                  = YNetwork_set_logicalName;
        this.get_advertisedValue             = YNetwork_get_advertisedValue;
        this.advertisedValue                 = YNetwork_get_advertisedValue;
        this.get_advertisedValue_async       = YNetwork_get_advertisedValue_async;
        this.advertisedValue_async           = YNetwork_get_advertisedValue_async;
        this.get_readiness                   = YNetwork_get_readiness;
        this.readiness                       = YNetwork_get_readiness;
        this.get_readiness_async             = YNetwork_get_readiness_async;
        this.readiness_async                 = YNetwork_get_readiness_async;
        this.get_macAddress                  = YNetwork_get_macAddress;
        this.macAddress                      = YNetwork_get_macAddress;
        this.get_macAddress_async            = YNetwork_get_macAddress_async;
        this.macAddress_async                = YNetwork_get_macAddress_async;
        this.get_ipAddress                   = YNetwork_get_ipAddress;
        this.ipAddress                       = YNetwork_get_ipAddress;
        this.get_ipAddress_async             = YNetwork_get_ipAddress_async;
        this.ipAddress_async                 = YNetwork_get_ipAddress_async;
        this.get_subnetMask                  = YNetwork_get_subnetMask;
        this.subnetMask                      = YNetwork_get_subnetMask;
        this.get_subnetMask_async            = YNetwork_get_subnetMask_async;
        this.subnetMask_async                = YNetwork_get_subnetMask_async;
        this.get_router                      = YNetwork_get_router;
        this.router                          = YNetwork_get_router;
        this.get_router_async                = YNetwork_get_router_async;
        this.router_async                    = YNetwork_get_router_async;
        this.get_ipConfig                    = YNetwork_get_ipConfig;
        this.ipConfig                        = YNetwork_get_ipConfig;
        this.get_ipConfig_async              = YNetwork_get_ipConfig_async;
        this.ipConfig_async                  = YNetwork_get_ipConfig_async;
        this.set_ipConfig                    = YNetwork_set_ipConfig;
        this.setIpConfig                     = YNetwork_set_ipConfig;
        this.useDHCP                         = YNetwork_useDHCP;
        this.useStaticIP                     = YNetwork_useStaticIP;
        this.get_primaryDNS                  = YNetwork_get_primaryDNS;
        this.primaryDNS                      = YNetwork_get_primaryDNS;
        this.get_primaryDNS_async            = YNetwork_get_primaryDNS_async;
        this.primaryDNS_async                = YNetwork_get_primaryDNS_async;
        this.set_primaryDNS                  = YNetwork_set_primaryDNS;
        this.setPrimaryDNS                   = YNetwork_set_primaryDNS;
        this.get_secondaryDNS                = YNetwork_get_secondaryDNS;
        this.secondaryDNS                    = YNetwork_get_secondaryDNS;
        this.get_secondaryDNS_async          = YNetwork_get_secondaryDNS_async;
        this.secondaryDNS_async              = YNetwork_get_secondaryDNS_async;
        this.set_secondaryDNS                = YNetwork_set_secondaryDNS;
        this.setSecondaryDNS                 = YNetwork_set_secondaryDNS;
        this.get_userPassword                = YNetwork_get_userPassword;
        this.userPassword                    = YNetwork_get_userPassword;
        this.get_userPassword_async          = YNetwork_get_userPassword_async;
        this.userPassword_async              = YNetwork_get_userPassword_async;
        this.set_userPassword                = YNetwork_set_userPassword;
        this.setUserPassword                 = YNetwork_set_userPassword;
        this.get_adminPassword               = YNetwork_get_adminPassword;
        this.adminPassword                   = YNetwork_get_adminPassword;
        this.get_adminPassword_async         = YNetwork_get_adminPassword_async;
        this.adminPassword_async             = YNetwork_get_adminPassword_async;
        this.set_adminPassword               = YNetwork_set_adminPassword;
        this.setAdminPassword                = YNetwork_set_adminPassword;
        this.get_discoverable                = YNetwork_get_discoverable;
        this.discoverable                    = YNetwork_get_discoverable;
        this.get_discoverable_async          = YNetwork_get_discoverable_async;
        this.discoverable_async              = YNetwork_get_discoverable_async;
        this.set_discoverable                = YNetwork_set_discoverable;
        this.setDiscoverable                 = YNetwork_set_discoverable;
        this.get_wwwWatchdogDelay            = YNetwork_get_wwwWatchdogDelay;
        this.wwwWatchdogDelay                = YNetwork_get_wwwWatchdogDelay;
        this.get_wwwWatchdogDelay_async      = YNetwork_get_wwwWatchdogDelay_async;
        this.wwwWatchdogDelay_async          = YNetwork_get_wwwWatchdogDelay_async;
        this.set_wwwWatchdogDelay            = YNetwork_set_wwwWatchdogDelay;
        this.setWwwWatchdogDelay             = YNetwork_set_wwwWatchdogDelay;
        this.get_callbackUrl                 = YNetwork_get_callbackUrl;
        this.callbackUrl                     = YNetwork_get_callbackUrl;
        this.get_callbackUrl_async           = YNetwork_get_callbackUrl_async;
        this.callbackUrl_async               = YNetwork_get_callbackUrl_async;
        this.set_callbackUrl                 = YNetwork_set_callbackUrl;
        this.setCallbackUrl                  = YNetwork_set_callbackUrl;
        this.get_callbackMethod              = YNetwork_get_callbackMethod;
        this.callbackMethod                  = YNetwork_get_callbackMethod;
        this.get_callbackMethod_async        = YNetwork_get_callbackMethod_async;
        this.callbackMethod_async            = YNetwork_get_callbackMethod_async;
        this.set_callbackMethod              = YNetwork_set_callbackMethod;
        this.setCallbackMethod               = YNetwork_set_callbackMethod;
        this.get_callbackEncoding            = YNetwork_get_callbackEncoding;
        this.callbackEncoding                = YNetwork_get_callbackEncoding;
        this.get_callbackEncoding_async      = YNetwork_get_callbackEncoding_async;
        this.callbackEncoding_async          = YNetwork_get_callbackEncoding_async;
        this.set_callbackEncoding            = YNetwork_set_callbackEncoding;
        this.setCallbackEncoding             = YNetwork_set_callbackEncoding;
        this.get_callbackCredentials         = YNetwork_get_callbackCredentials;
        this.callbackCredentials             = YNetwork_get_callbackCredentials;
        this.get_callbackCredentials_async   = YNetwork_get_callbackCredentials_async;
        this.callbackCredentials_async       = YNetwork_get_callbackCredentials_async;
        this.set_callbackCredentials         = YNetwork_set_callbackCredentials;
        this.setCallbackCredentials          = YNetwork_set_callbackCredentials;
        this.callbackLogin                   = YNetwork_callbackLogin;
        this.get_callbackMinDelay            = YNetwork_get_callbackMinDelay;
        this.callbackMinDelay                = YNetwork_get_callbackMinDelay;
        this.get_callbackMinDelay_async      = YNetwork_get_callbackMinDelay_async;
        this.callbackMinDelay_async          = YNetwork_get_callbackMinDelay_async;
        this.set_callbackMinDelay            = YNetwork_set_callbackMinDelay;
        this.setCallbackMinDelay             = YNetwork_set_callbackMinDelay;
        this.get_callbackMaxDelay            = YNetwork_get_callbackMaxDelay;
        this.callbackMaxDelay                = YNetwork_get_callbackMaxDelay;
        this.get_callbackMaxDelay_async      = YNetwork_get_callbackMaxDelay_async;
        this.callbackMaxDelay_async          = YNetwork_get_callbackMaxDelay_async;
        this.set_callbackMaxDelay            = YNetwork_set_callbackMaxDelay;
        this.setCallbackMaxDelay             = YNetwork_set_callbackMaxDelay;
        this.get_poeCurrent                  = YNetwork_get_poeCurrent;
        this.poeCurrent                      = YNetwork_get_poeCurrent;
        this.get_poeCurrent_async            = YNetwork_get_poeCurrent_async;
        this.poeCurrent_async                = YNetwork_get_poeCurrent_async;
        this.ping                            = YNetwork_ping;
        this.nextNetwork                     = YNetwork_nextNetwork;
        //--- (end of YNetwork constructor)
    }

    YNetwork = _YNetwork;
    YNetwork.FindNetwork  = YNetwork_FindNetwork;
    YNetwork.FirstNetwork = YNetwork_FirstNetwork;
})();

//--- (Network functions)

/**
 * Retrieves a network interface for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the network interface is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YNetwork.isOnline() to test if the network interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a network interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the network interface
 * 
 * @return a YNetwork object allowing you to drive the network interface.
 */
function yFindNetwork(str_func)
{
    return YNetwork.FindNetwork(str_func);
}

/**
 * Starts the enumeration of network interfaces currently accessible.
 * Use the method YNetwork.nextNetwork() to iterate on
 * next network interfaces.
 * 
 * @return a pointer to a YNetwork object, corresponding to
 *         the first network interface currently online, or a null pointer
 *         if there are none.
 */
function yFirstNetwork()
{
    return YNetwork.FirstNetwork();
}

//--- (end of Network functions)
