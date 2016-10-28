/*********************************************************************
 *
 * $Id: yocto_cellular.js 25609 2016-10-19 12:37:17Z seb $
 *
 * Implements the high-level API for Cellular functions
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

//--- (generated code: YCellRecord return codes)
//--- (end of generated code: YCellRecord return codes)
//--- (generated code: YCellRecord definitions)
//--- (end of generated code: YCellRecord definitions)

//--- (generated code: YCellRecord class start)
/**
 * YCellRecord Class: Description of a cellular antenna
 *
 *
 */
//--- (end of generated code: YCellRecord class start)

var YCellRecord; // definition below
(function()
{
    function _YCellRecord(int_mcc,int_mnc,int_lac,int_cellId,int_dbm,int_tad,str_oper)
    {
        //--- (generated code: YCellRecord constructor)
        this._oper                           = "";                         // str
        this._mcc                            = 0;                          // int
        this._mnc                            = 0;                          // int
        this._lac                            = 0;                          // int
        this._cid                            = 0;                          // int
        this._dbm                            = 0;                          // int
        this._tad                            = 0;                          // int
        //--- (end of generated code: YCellRecord constructor)
        this._oper = str_oper;
        this._mcc = int_mcc;
        this._mnc = int_mnc;
        this._lac = int_lac;
        this._cid = int_cellId;
        this._dbm = int_dbm;
        this._tad = int_tad;
    }

    //--- (generated code: YCellRecord implementation)

    function YCellRecord_get_cellOperator()
    {
        return this._oper;
    }

    function YCellRecord_get_mobileCountryCode()
    {
        return this._mcc;
    }

    function YCellRecord_get_mobileNetworkCode()
    {
        return this._mnc;
    }

    function YCellRecord_get_locationAreaCode()
    {
        return this._lac;
    }

    function YCellRecord_get_cellId()
    {
        return this._cid;
    }

    function YCellRecord_get_signalStrength()
    {
        return this._dbm;
    }

    function YCellRecord_get_timingAdvance()
    {
        return this._tad;
    }

    //--- (end of generated code: YCellRecord implementation)

    //--- (generated code: YCellRecord initialization)
    YCellRecord = _YCellRecord;
    // Methods
    YCellRecord.prototype.get_cellOperator            = YCellRecord_get_cellOperator;
    YCellRecord.prototype.cellOperator                = YCellRecord_get_cellOperator;
    YCellRecord.prototype.get_mobileCountryCode       = YCellRecord_get_mobileCountryCode;
    YCellRecord.prototype.mobileCountryCode           = YCellRecord_get_mobileCountryCode;
    YCellRecord.prototype.get_mobileNetworkCode       = YCellRecord_get_mobileNetworkCode;
    YCellRecord.prototype.mobileNetworkCode           = YCellRecord_get_mobileNetworkCode;
    YCellRecord.prototype.get_locationAreaCode        = YCellRecord_get_locationAreaCode;
    YCellRecord.prototype.locationAreaCode            = YCellRecord_get_locationAreaCode;
    YCellRecord.prototype.get_cellId                  = YCellRecord_get_cellId;
    YCellRecord.prototype.cellId                      = YCellRecord_get_cellId;
    YCellRecord.prototype.get_signalStrength          = YCellRecord_get_signalStrength;
    YCellRecord.prototype.signalStrength              = YCellRecord_get_signalStrength;
    YCellRecord.prototype.get_timingAdvance           = YCellRecord_get_timingAdvance;
    YCellRecord.prototype.timingAdvance               = YCellRecord_get_timingAdvance;
    //--- (end of generated code: YCellRecord initialization)
})();

//--- (generated code: CellRecord functions)
//--- (end of generated code: CellRecord functions)


//--- (generated code: YCellular return codes)
//--- (end of generated code: YCellular return codes)
//--- (generated code: YCellular definitions)
var Y_CELLTYPE_GPRS                 = 0;
var Y_CELLTYPE_EGPRS                = 1;
var Y_CELLTYPE_WCDMA                = 2;
var Y_CELLTYPE_HSDPA                = 3;
var Y_CELLTYPE_NONE                 = 4;
var Y_CELLTYPE_CDMA                 = 5;
var Y_CELLTYPE_INVALID              = -1;
var Y_AIRPLANEMODE_OFF              = 0;
var Y_AIRPLANEMODE_ON               = 1;
var Y_AIRPLANEMODE_INVALID          = -1;
var Y_ENABLEDATA_HOMENETWORK        = 0;
var Y_ENABLEDATA_ROAMING            = 1;
var Y_ENABLEDATA_NEVER              = 2;
var Y_ENABLEDATA_NEUTRALITY         = 3;
var Y_ENABLEDATA_INVALID            = -1;
var Y_LINKQUALITY_INVALID           = YAPI_INVALID_UINT;
var Y_CELLOPERATOR_INVALID          = YAPI_INVALID_STRING;
var Y_CELLIDENTIFIER_INVALID        = YAPI_INVALID_STRING;
var Y_IMSI_INVALID                  = YAPI_INVALID_STRING;
var Y_MESSAGE_INVALID               = YAPI_INVALID_STRING;
var Y_PIN_INVALID                   = YAPI_INVALID_STRING;
var Y_LOCKEDOPERATOR_INVALID        = YAPI_INVALID_STRING;
var Y_APN_INVALID                   = YAPI_INVALID_STRING;
var Y_APNSECRET_INVALID             = YAPI_INVALID_STRING;
var Y_PINGINTERVAL_INVALID          = YAPI_INVALID_UINT;
var Y_DATASENT_INVALID              = YAPI_INVALID_UINT;
var Y_DATARECEIVED_INVALID          = YAPI_INVALID_UINT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of generated code: YCellular definitions)

//--- (generated code: YCellular class start)
/**
 * YCellular Class: Cellular function interface
 *
 * YCellular functions provides control over cellular network parameters
 * and status for devices that are GSM-enabled.
 */
//--- (end of generated code: YCellular class start)

var YCellular; // definition below
(function()
{
    function _YCellular(str_func)
    {
        //--- (generated code: YCellular constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Cellular';

        this._linkQuality                    = Y_LINKQUALITY_INVALID;      // Percent
        this._cellOperator                   = Y_CELLOPERATOR_INVALID;     // Text
        this._cellIdentifier                 = Y_CELLIDENTIFIER_INVALID;   // Text
        this._cellType                       = Y_CELLTYPE_INVALID;         // CellType
        this._imsi                           = Y_IMSI_INVALID;             // IMSI
        this._message                        = Y_MESSAGE_INVALID;          // YFSText
        this._pin                            = Y_PIN_INVALID;              // PinPassword
        this._lockedOperator                 = Y_LOCKEDOPERATOR_INVALID;   // Text
        this._airplaneMode                   = Y_AIRPLANEMODE_INVALID;     // OnOff
        this._enableData                     = Y_ENABLEDATA_INVALID;       // ServiceScope
        this._apn                            = Y_APN_INVALID;              // Text
        this._apnSecret                      = Y_APNSECRET_INVALID;        // APNPassword
        this._pingInterval                   = Y_PINGINTERVAL_INVALID;     // UInt31
        this._dataSent                       = Y_DATASENT_INVALID;         // UInt31
        this._dataReceived                   = Y_DATARECEIVED_INVALID;     // UInt31
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of generated code: YCellular constructor)
    }

    //--- (generated code: YCellular implementation)

    function YCellular_parseAttr(name, val, _super)
    {
        switch(name) {
        case "linkQuality":
            this._linkQuality = parseInt(val);
            return 1;
        case "cellOperator":
            this._cellOperator = val;
            return 1;
        case "cellIdentifier":
            this._cellIdentifier = val;
            return 1;
        case "cellType":
            this._cellType = parseInt(val);
            return 1;
        case "imsi":
            this._imsi = val;
            return 1;
        case "message":
            this._message = val;
            return 1;
        case "pin":
            this._pin = val;
            return 1;
        case "lockedOperator":
            this._lockedOperator = val;
            return 1;
        case "airplaneMode":
            this._airplaneMode = parseInt(val);
            return 1;
        case "enableData":
            this._enableData = parseInt(val);
            return 1;
        case "apn":
            this._apn = val;
            return 1;
        case "apnSecret":
            this._apnSecret = val;
            return 1;
        case "pingInterval":
            this._pingInterval = parseInt(val);
            return 1;
        case "dataSent":
            this._dataSent = parseInt(val);
            return 1;
        case "dataReceived":
            this._dataReceived = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the link quality, expressed in percent.
     *
     * @return an integer corresponding to the link quality, expressed in percent
     *
     * On failure, throws an exception or returns YCellular.LINKQUALITY_INVALID.
     */
    function YCellular_get_linkQuality()
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
     *         - the YCellular object that invoked the callback
     *         - the result:an integer corresponding to the link quality, expressed in percent
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_LINKQUALITY_INVALID.
     */
    function YCellular_get_linkQuality_async(callback,context)
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
     * Returns the name of the cell operator currently in use.
     *
     * @return a string corresponding to the name of the cell operator currently in use
     *
     * On failure, throws an exception or returns YCellular.CELLOPERATOR_INVALID.
     */
    function YCellular_get_cellOperator()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CELLOPERATOR_INVALID;
            }
        }
        return this._cellOperator;
    }

    /**
     * Gets the name of the cell operator currently in use.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:a string corresponding to the name of the cell operator currently in use
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CELLOPERATOR_INVALID.
     */
    function YCellular_get_cellOperator_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CELLOPERATOR_INVALID);
            } else {
                callback(context, obj, obj._cellOperator);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the unique identifier of the cellular antenna in use: MCC, MNC, LAC and Cell ID.
     *
     * @return a string corresponding to the unique identifier of the cellular antenna in use: MCC, MNC,
     * LAC and Cell ID
     *
     * On failure, throws an exception or returns YCellular.CELLIDENTIFIER_INVALID.
     */
    function YCellular_get_cellIdentifier()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CELLIDENTIFIER_INVALID;
            }
        }
        return this._cellIdentifier;
    }

    /**
     * Gets the unique identifier of the cellular antenna in use: MCC, MNC, LAC and Cell ID.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:a string corresponding to the unique identifier of the cellular antenna in use: MCC,
     *         MNC, LAC and Cell ID
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CELLIDENTIFIER_INVALID.
     */
    function YCellular_get_cellIdentifier_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CELLIDENTIFIER_INVALID);
            } else {
                callback(context, obj, obj._cellIdentifier);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Active cellular connection type.
     *
     * @return a value among YCellular.CELLTYPE_GPRS, YCellular.CELLTYPE_EGPRS, YCellular.CELLTYPE_WCDMA,
     * YCellular.CELLTYPE_HSDPA, YCellular.CELLTYPE_NONE and YCellular.CELLTYPE_CDMA
     *
     * On failure, throws an exception or returns YCellular.CELLTYPE_INVALID.
     */
    function YCellular_get_cellType()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CELLTYPE_INVALID;
            }
        }
        return this._cellType;
    }

    /**
     * Active cellular connection type.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:a value among Y_CELLTYPE_GPRS, Y_CELLTYPE_EGPRS, Y_CELLTYPE_WCDMA, Y_CELLTYPE_HSDPA,
     *         Y_CELLTYPE_NONE and Y_CELLTYPE_CDMA
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CELLTYPE_INVALID.
     */
    function YCellular_get_cellType_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CELLTYPE_INVALID);
            } else {
                callback(context, obj, obj._cellType);
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
     * On failure, throws an exception or returns YCellular.IMSI_INVALID.
     */
    function YCellular_get_imsi()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_IMSI_INVALID;
            }
        }
        return this._imsi;
    }

    /**
     * Gets an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:a string corresponding to an opaque string if a PIN code has been configured in the
     *         device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_IMSI_INVALID.
     */
    function YCellular_get_imsi_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_IMSI_INVALID);
            } else {
                callback(context, obj, obj._imsi);
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
     * On failure, throws an exception or returns YCellular.MESSAGE_INVALID.
     */
    function YCellular_get_message()
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
     *         - the YCellular object that invoked the callback
     *         - the result:a string corresponding to the latest status message from the wireless interface
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_MESSAGE_INVALID.
     */
    function YCellular_get_message_async(callback,context)
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

    /**
     * Returns an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @return a string corresponding to an opaque string if a PIN code has been configured in the device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     *
     * On failure, throws an exception or returns YCellular.PIN_INVALID.
     */
    function YCellular_get_pin()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PIN_INVALID;
            }
        }
        return this._pin;
    }

    /**
     * Gets an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:a string corresponding to an opaque string if a PIN code has been configured in the
     *         device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PIN_INVALID.
     */
    function YCellular_get_pin_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PIN_INVALID);
            } else {
                callback(context, obj, obj._pin);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the PIN code used by the module to access the SIM card.
     * This function does not change the code on the SIM card itself, but only changes
     * the parameter used by the device to try to get access to it. If the SIM code
     * does not work immediately on first try, it will be automatically forgotten
     * and the message will be set to "Enter SIM PIN". The method should then be
     * invoked again with right correct PIN code. After three failed attempts in a row,
     * the message is changed to "Enter SIM PUK" and the SIM card PUK code must be
     * provided using method sendPUK.
     *
     * Remember to call the saveToFlash() method of the module to save the
     * new value in the device flash.
     *
     * @param newval : a string corresponding to the PIN code used by the module to access the SIM card
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCellular_set_pin(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('pin',rest_val);
    }

    /**
     * Returns the name of the only cell operator to use if automatic choice is disabled,
     * or an empty string if the SIM card will automatically choose among available
     * cell operators.
     *
     * @return a string corresponding to the name of the only cell operator to use if automatic choice is disabled,
     *         or an empty string if the SIM card will automatically choose among available
     *         cell operators
     *
     * On failure, throws an exception or returns YCellular.LOCKEDOPERATOR_INVALID.
     */
    function YCellular_get_lockedOperator()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LOCKEDOPERATOR_INVALID;
            }
        }
        return this._lockedOperator;
    }

    /**
     * Gets the name of the only cell operator to use if automatic choice is disabled,
     * or an empty string if the SIM card will automatically choose among available
     * cell operators.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:a string corresponding to the name of the only cell operator to use if automatic
     *         choice is disabled,
     *         or an empty string if the SIM card will automatically choose among available
     *         cell operators
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_LOCKEDOPERATOR_INVALID.
     */
    function YCellular_get_lockedOperator_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LOCKEDOPERATOR_INVALID);
            } else {
                callback(context, obj, obj._lockedOperator);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the name of the cell operator to be used. If the name is an empty
     * string, the choice will be made automatically based on the SIM card. Otherwise,
     * the selected operator is the only one that will be used.
     *
     * @param newval : a string corresponding to the name of the cell operator to be used
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCellular_set_lockedOperator(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('lockedOperator',rest_val);
    }

    /**
     * Returns true if the airplane mode is active (radio turned off).
     *
     * @return either YCellular.AIRPLANEMODE_OFF or YCellular.AIRPLANEMODE_ON, according to true if the
     * airplane mode is active (radio turned off)
     *
     * On failure, throws an exception or returns YCellular.AIRPLANEMODE_INVALID.
     */
    function YCellular_get_airplaneMode()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_AIRPLANEMODE_INVALID;
            }
        }
        return this._airplaneMode;
    }

    /**
     * Gets true if the airplane mode is active (radio turned off).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:either Y_AIRPLANEMODE_OFF or Y_AIRPLANEMODE_ON, according to true if the airplane mode
     *         is active (radio turned off)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_AIRPLANEMODE_INVALID.
     */
    function YCellular_get_airplaneMode_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_AIRPLANEMODE_INVALID);
            } else {
                callback(context, obj, obj._airplaneMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the activation state of airplane mode (radio turned off).
     *
     * @param newval : either YCellular.AIRPLANEMODE_OFF or YCellular.AIRPLANEMODE_ON, according to the
     * activation state of airplane mode (radio turned off)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCellular_set_airplaneMode(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('airplaneMode',rest_val);
    }

    /**
     * Returns the condition for enabling IP data services (GPRS).
     * When data services are disabled, SMS are the only mean of communication.
     *
     * @return a value among YCellular.ENABLEDATA_HOMENETWORK, YCellular.ENABLEDATA_ROAMING,
     * YCellular.ENABLEDATA_NEVER and YCellular.ENABLEDATA_NEUTRALITY corresponding to the condition for
     * enabling IP data services (GPRS)
     *
     * On failure, throws an exception or returns YCellular.ENABLEDATA_INVALID.
     */
    function YCellular_get_enableData()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ENABLEDATA_INVALID;
            }
        }
        return this._enableData;
    }

    /**
     * Gets the condition for enabling IP data services (GPRS).
     * When data services are disabled, SMS are the only mean of communication.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:a value among Y_ENABLEDATA_HOMENETWORK, Y_ENABLEDATA_ROAMING, Y_ENABLEDATA_NEVER and
     *         Y_ENABLEDATA_NEUTRALITY corresponding to the condition for enabling IP data services (GPRS)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_ENABLEDATA_INVALID.
     */
    function YCellular_get_enableData_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ENABLEDATA_INVALID);
            } else {
                callback(context, obj, obj._enableData);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the condition for enabling IP data services (GPRS).
     * The service can be either fully deactivated, or limited to the SIM home network,
     * or enabled for all partner networks (roaming). Caution: enabling data services
     * on roaming networks may cause prohibitive communication costs !
     *
     * When data services are disabled, SMS are the only mean of communication.
     *
     * @param newval : a value among YCellular.ENABLEDATA_HOMENETWORK, YCellular.ENABLEDATA_ROAMING,
     * YCellular.ENABLEDATA_NEVER and YCellular.ENABLEDATA_NEUTRALITY corresponding to the condition for
     * enabling IP data services (GPRS)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCellular_set_enableData(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enableData',rest_val);
    }

    /**
     * Returns the Access Point Name (APN) to be used, if needed.
     * When left blank, the APN suggested by the cell operator will be used.
     *
     * @return a string corresponding to the Access Point Name (APN) to be used, if needed
     *
     * On failure, throws an exception or returns YCellular.APN_INVALID.
     */
    function YCellular_get_apn()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_APN_INVALID;
            }
        }
        return this._apn;
    }

    /**
     * Gets the Access Point Name (APN) to be used, if needed.
     * When left blank, the APN suggested by the cell operator will be used.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:a string corresponding to the Access Point Name (APN) to be used, if needed
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_APN_INVALID.
     */
    function YCellular_get_apn_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_APN_INVALID);
            } else {
                callback(context, obj, obj._apn);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the Access Point Name (APN) to be used, if needed.
     * When left blank, the APN suggested by the cell operator will be used.
     *
     * @param newval : a string
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCellular_set_apn(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('apn',rest_val);
    }

    /**
     * Returns an opaque string if APN authentication parameters have been configured
     * in the device, or an empty string otherwise.
     * To configure these parameters, use set_apnAuth().
     *
     * @return a string corresponding to an opaque string if APN authentication parameters have been configured
     *         in the device, or an empty string otherwise
     *
     * On failure, throws an exception or returns YCellular.APNSECRET_INVALID.
     */
    function YCellular_get_apnSecret()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_APNSECRET_INVALID;
            }
        }
        return this._apnSecret;
    }

    /**
     * Gets an opaque string if APN authentication parameters have been configured
     * in the device, or an empty string otherwise.
     * To configure these parameters, use set_apnAuth().
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:a string corresponding to an opaque string if APN authentication parameters have been configured
     *         in the device, or an empty string otherwise
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_APNSECRET_INVALID.
     */
    function YCellular_get_apnSecret_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_APNSECRET_INVALID);
            } else {
                callback(context, obj, obj._apnSecret);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YCellular_set_apnSecret(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('apnSecret',rest_val);
    }

    /**
     * Returns the automated connectivity check interval, in seconds.
     *
     * @return an integer corresponding to the automated connectivity check interval, in seconds
     *
     * On failure, throws an exception or returns YCellular.PINGINTERVAL_INVALID.
     */
    function YCellular_get_pingInterval()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PINGINTERVAL_INVALID;
            }
        }
        return this._pingInterval;
    }

    /**
     * Gets the automated connectivity check interval, in seconds.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:an integer corresponding to the automated connectivity check interval, in seconds
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PINGINTERVAL_INVALID.
     */
    function YCellular_get_pingInterval_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PINGINTERVAL_INVALID);
            } else {
                callback(context, obj, obj._pingInterval);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the automated connectivity check interval, in seconds.
     *
     * @param newval : an integer corresponding to the automated connectivity check interval, in seconds
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCellular_set_pingInterval(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('pingInterval',rest_val);
    }

    /**
     * Returns the number of bytes sent so far.
     *
     * @return an integer corresponding to the number of bytes sent so far
     *
     * On failure, throws an exception or returns YCellular.DATASENT_INVALID.
     */
    function YCellular_get_dataSent()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DATASENT_INVALID;
            }
        }
        return this._dataSent;
    }

    /**
     * Gets the number of bytes sent so far.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:an integer corresponding to the number of bytes sent so far
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_DATASENT_INVALID.
     */
    function YCellular_get_dataSent_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DATASENT_INVALID);
            } else {
                callback(context, obj, obj._dataSent);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the value of the outgoing data counter.
     *
     * @param newval : an integer corresponding to the value of the outgoing data counter
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCellular_set_dataSent(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('dataSent',rest_val);
    }

    /**
     * Returns the number of bytes received so far.
     *
     * @return an integer corresponding to the number of bytes received so far
     *
     * On failure, throws an exception or returns YCellular.DATARECEIVED_INVALID.
     */
    function YCellular_get_dataReceived()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DATARECEIVED_INVALID;
            }
        }
        return this._dataReceived;
    }

    /**
     * Gets the number of bytes received so far.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YCellular object that invoked the callback
     *         - the result:an integer corresponding to the number of bytes received so far
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_DATARECEIVED_INVALID.
     */
    function YCellular_get_dataReceived_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DATARECEIVED_INVALID);
            } else {
                callback(context, obj, obj._dataReceived);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the value of the incoming data counter.
     *
     * @param newval : an integer corresponding to the value of the incoming data counter
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCellular_set_dataReceived(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('dataReceived',rest_val);
    }

    function YCellular_get_command()
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
     *         - the YCellular object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YCellular_get_command_async(callback,context)
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

    function YCellular_set_command(newval)
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
     * Use the method YCellular.isOnline() to test if the cellular interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a cellular interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the cellular interface
     *
     * @return a YCellular object allowing you to drive the cellular interface.
     */
    function YCellular_FindCellular(func)                       // class method
    {
        var obj;                    // YCellular;
        obj = YFunction._FindFromCache("Cellular", func);
        if (obj == null) {
            obj = new YCellular(func);
            YFunction._AddToCache("Cellular", func, obj);
        }
        return obj;
    }

    /**
     * Sends a PUK code to unlock the SIM card after three failed PIN code attempts, and
     * setup a new PIN into the SIM card. Only ten consecutives tentatives are permitted:
     * after that, the SIM card will be blocked permanently without any mean of recovery
     * to use it again. Note that after calling this method, you have usually to invoke
     * method set_pin() to tell the YoctoHub which PIN to use in the future.
     *
     * @param puk : the SIM PUK code
     * @param newPin : new PIN code to configure into the SIM card
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCellular_sendPUK(puk,newPin)
    {
        var gsmMsg;                 // str;
        gsmMsg = this.get_message();
        if (!((gsmMsg).substr(0, 13) == "Enter SIM PUK")) {
            return this._throw(YAPI_INVALID_ARGUMENT,"PUK not expected at this time",YAPI_INVALID_ARGUMENT);
        }
        if (newPin == "") {
            return this.set_command("AT+CPIN="+puk+",0000;+CLCK=SC,0,0000");
        }
        return this.set_command("AT+CPIN="+puk+","+newPin);
    }

    /**
     * Configure authentication parameters to connect to the APN. Both
     * PAP and CHAP authentication are supported.
     *
     * @param username : APN username
     * @param password : APN password
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCellular_set_apnAuth(username,password)
    {
        return this.set_apnSecret(""+username+","+password);
    }

    /**
     * Clear the transmitted data counters.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YCellular_clearDataCounters()
    {
        var retcode;                // int;
        // may throw an exception
        retcode = this.set_dataReceived(0);
        if (retcode != YAPI_SUCCESS) {
            return retcode;
        }
        retcode = this.set_dataSent(0);
        return retcode;
    }

    /**
     * Sends an AT command to the GSM module and returns the command output.
     * The command will only execute when the GSM module is in standard
     * command state, and should leave it in the exact same state.
     * Use this function with great care !
     *
     * @param cmd : the AT command to execute, like for instance: "+CCLK?".
     *
     * @return a string with the result of the commands. Empty lines are
     *         automatically removed from the output.
     */
    function YCellular_AT(cmd)
    {
        var chrPos;                 // int;
        var cmdLen;                 // int;
        var waitMore;               // int;
        var res;                    // str;
        var buff;                   // bin;
        var bufflen;                // int;
        var buffstr;                // str;
        var buffstrlen;             // int;
        var idx;                    // int;
        var suffixlen;              // int;
        // quote dangerous characters used in AT commands
        cmdLen = (cmd).length;
        chrPos = (cmd).indexOf("#");
        while (chrPos >= 0) {
            cmd = ""+(cmd).substr( 0, chrPos)+""+String.fromCharCode(37)+"23"+(cmd).substr( chrPos+1, cmdLen-chrPos-1);
            cmdLen = cmdLen + 2;
            chrPos = (cmd).indexOf("#");
        }
        chrPos = (cmd).indexOf("+");
        while (chrPos >= 0) {
            cmd = ""+(cmd).substr( 0, chrPos)+""+String.fromCharCode(37)+"2B"+(cmd).substr( chrPos+1, cmdLen-chrPos-1);
            cmdLen = cmdLen + 2;
            chrPos = (cmd).indexOf("+");
        }
        chrPos = (cmd).indexOf("=");
        while (chrPos >= 0) {
            cmd = ""+(cmd).substr( 0, chrPos)+""+String.fromCharCode(37)+"3D"+(cmd).substr( chrPos+1, cmdLen-chrPos-1);
            cmdLen = cmdLen + 2;
            chrPos = (cmd).indexOf("=");
        }
        cmd = "at.txt?cmd="+cmd;
        res = "";
        // max 2 minutes (each iteration may take up to 5 seconds if waiting)
        waitMore = 24;
        while (waitMore > 0) {
            buff = this._download(cmd);
            bufflen = (buff).length;
            buffstr = buff.toString(YAPI.defaultEncoding);
            buffstrlen = (buffstr).length;
            idx = bufflen - 1;
            while ((idx > 0) && ((buff).readUInt8(idx) != 64) && ((buff).readUInt8(idx) != 10) && ((buff).readUInt8(idx) != 13)) {
                idx = idx - 1;
            }
            if ((buff).readUInt8(idx) == 64) {
                suffixlen = bufflen - idx;
                cmd = "at.txt?cmd="+(buffstr).substr( buffstrlen - suffixlen, suffixlen);
                buffstr = (buffstr).substr( 0, buffstrlen - suffixlen);
                waitMore = waitMore - 1;
            } else {
                waitMore = 0;
            }
            res = ""+res+""+buffstr;
        }
        return res;
    }

    /**
     * Returns the list detected cell operators in the neighborhood.
     * This function will typically take between 30 seconds to 1 minute to
     * return. Note that any SIM card can usually only connect to specific
     * operators. All networks returned by this function might therefore
     * not be available for connection.
     *
     * @return a list of string (cell operator names).
     */
    function YCellular_get_availableOperators()
    {
        var cops;                   // str;
        var idx;                    // int;
        var slen;                   // int;
        var res = [];               // strArr;
        // may throw an exception
        cops = this._AT("+COPS=?");
        slen = (cops).length;
        res.length = 0;
        idx = (cops).indexOf("(");
        while (idx >= 0) {
            slen = slen - (idx+1);
            cops = (cops).substr( idx+1, slen);
            idx = (cops).indexOf("\"");
            if (idx > 0) {
                slen = slen - (idx+1);
                cops = (cops).substr( idx+1, slen);
                idx = (cops).indexOf("\"");
                if (idx > 0) {
                    res.push((cops).substr( 0, idx));
                }
            }
            idx = (cops).indexOf("(");
        }
        return res;
    }

    /**
     * Returns a list of nearby cellular antennas, as required for quick
     * geolocation of the device. The first cell listed is the serving
     * cell, and the next ones are the neighboor cells reported by the
     * serving cell.
     *
     * @return a list of YCellRecords.
     */
    function YCellular_quickCellSurvey()
    {
        var ii; // iterator
        var moni;                   // str;
        var recs = [];              // strArr;
        var llen;                   // int;
        var mccs;                   // str;
        var mcc;                    // int;
        var mncs;                   // str;
        var mnc;                    // int;
        var lac;                    // int;
        var cellId;                 // int;
        var dbms;                   // str;
        var dbm;                    // int;
        var tads;                   // str;
        var tad;                    // int;
        var oper;                   // str;
        var res = [];               // YCellRecordArr;
        // may throw an exception
        moni = this._AT("+CCED=0;#MONI=7;#MONI");
        mccs = (moni).substr(7, 3);
        if ((mccs).substr(0, 1) == "0") {
            mccs = (mccs).substr(1, 2);
        }
        if ((mccs).substr(0, 1) == "0") {
            mccs = (mccs).substr(1, 1);
        }
        mcc = YAPI._atoi(mccs);
        mncs = (moni).substr(11, 3);
        if ((mncs).substr(2, 1) == ",") {
            mncs = (mncs).substr(0, 2);
        }
        if ((mncs).substr(0, 1) == "0") {
            mncs = (mncs).substr(1, (mncs).length-1);
        }
        mnc = YAPI._atoi(mncs);
        recs = (moni).split('#');
        // process each line in turn
        res.length = 0;
        for (ii in recs) {
            if(ii=='indexOf') continue; // IE8 Don'tEnum bug
            llen = (recs[ii]).length - 2;
            if (llen >= 44) {
                if ((recs[ii]).substr(41, 3) == "dbm") {
                    lac = parseInt((recs[ii]).substr(16, 4), 16);
                    cellId = parseInt((recs[ii]).substr(23, 4), 16);
                    dbms = (recs[ii]).substr(37, 4);
                    if ((dbms).substr(0, 1) == " ") {
                        dbms = (dbms).substr(1, 3);
                    }
                    dbm = YAPI._atoi(dbms);
                    if (llen > 66) {
                        tads = (recs[ii]).substr(54, 2);
                        if ((tads).substr(0, 1) == " ") {
                            tads = (tads).substr(1, 3);
                        }
                        tad = YAPI._atoi(tads);
                        oper = (recs[ii]).substr(66, llen-66);
                    } else {
                        tad = -1;
                        oper = "";
                    }
                    if (lac < 65535) {
                        res.push(new YCellRecord(mcc, mnc, lac, cellId, dbm, tad, oper));
                    }
                }
            }
            ;;
        }
        return res;
    }

    /**
     * Continues the enumeration of cellular interfaces started using yFirstCellular().
     *
     * @return a pointer to a YCellular object, corresponding to
     *         a cellular interface currently online, or a null pointer
     *         if there are no more cellular interfaces to enumerate.
     */
    function YCellular_nextCellular()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YCellular.FindCellular(next_hwid);
    }

    /**
     * Starts the enumeration of cellular interfaces currently accessible.
     * Use the method YCellular.nextCellular() to iterate on
     * next cellular interfaces.
     *
     * @return a pointer to a YCellular object, corresponding to
     *         the first cellular interface currently online, or a null pointer
     *         if there are none.
     */
    function YCellular_FirstCellular()
    {
        var next_hwid = YAPI.getFirstHardwareId('Cellular');
        if(next_hwid == null) return null;
        return YCellular.FindCellular(next_hwid);
    }

    //--- (end of generated code: YCellular implementation)

    //--- (generated code: YCellular initialization)
    YCellular = YFunction._Subclass(_YCellular, {
        // Constants
        LINKQUALITY_INVALID         : YAPI_INVALID_UINT,
        CELLOPERATOR_INVALID        : YAPI_INVALID_STRING,
        CELLIDENTIFIER_INVALID      : YAPI_INVALID_STRING,
        CELLTYPE_GPRS               : 0,
        CELLTYPE_EGPRS              : 1,
        CELLTYPE_WCDMA              : 2,
        CELLTYPE_HSDPA              : 3,
        CELLTYPE_NONE               : 4,
        CELLTYPE_CDMA               : 5,
        CELLTYPE_INVALID            : -1,
        IMSI_INVALID                : YAPI_INVALID_STRING,
        MESSAGE_INVALID             : YAPI_INVALID_STRING,
        PIN_INVALID                 : YAPI_INVALID_STRING,
        LOCKEDOPERATOR_INVALID      : YAPI_INVALID_STRING,
        AIRPLANEMODE_OFF            : 0,
        AIRPLANEMODE_ON             : 1,
        AIRPLANEMODE_INVALID        : -1,
        ENABLEDATA_HOMENETWORK      : 0,
        ENABLEDATA_ROAMING          : 1,
        ENABLEDATA_NEVER            : 2,
        ENABLEDATA_NEUTRALITY       : 3,
        ENABLEDATA_INVALID          : -1,
        APN_INVALID                 : YAPI_INVALID_STRING,
        APNSECRET_INVALID           : YAPI_INVALID_STRING,
        PINGINTERVAL_INVALID        : YAPI_INVALID_UINT,
        DATASENT_INVALID            : YAPI_INVALID_UINT,
        DATARECEIVED_INVALID        : YAPI_INVALID_UINT,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindCellular                : YCellular_FindCellular,
        FirstCellular               : YCellular_FirstCellular
    }, {
        // Methods
        get_linkQuality             : YCellular_get_linkQuality,
        linkQuality                 : YCellular_get_linkQuality,
        get_linkQuality_async       : YCellular_get_linkQuality_async,
        linkQuality_async           : YCellular_get_linkQuality_async,
        get_cellOperator            : YCellular_get_cellOperator,
        cellOperator                : YCellular_get_cellOperator,
        get_cellOperator_async      : YCellular_get_cellOperator_async,
        cellOperator_async          : YCellular_get_cellOperator_async,
        get_cellIdentifier          : YCellular_get_cellIdentifier,
        cellIdentifier              : YCellular_get_cellIdentifier,
        get_cellIdentifier_async    : YCellular_get_cellIdentifier_async,
        cellIdentifier_async        : YCellular_get_cellIdentifier_async,
        get_cellType                : YCellular_get_cellType,
        cellType                    : YCellular_get_cellType,
        get_cellType_async          : YCellular_get_cellType_async,
        cellType_async              : YCellular_get_cellType_async,
        get_imsi                    : YCellular_get_imsi,
        imsi                        : YCellular_get_imsi,
        get_imsi_async              : YCellular_get_imsi_async,
        imsi_async                  : YCellular_get_imsi_async,
        get_message                 : YCellular_get_message,
        message                     : YCellular_get_message,
        get_message_async           : YCellular_get_message_async,
        message_async               : YCellular_get_message_async,
        get_pin                     : YCellular_get_pin,
        pin                         : YCellular_get_pin,
        get_pin_async               : YCellular_get_pin_async,
        pin_async                   : YCellular_get_pin_async,
        set_pin                     : YCellular_set_pin,
        setPin                      : YCellular_set_pin,
        get_lockedOperator          : YCellular_get_lockedOperator,
        lockedOperator              : YCellular_get_lockedOperator,
        get_lockedOperator_async    : YCellular_get_lockedOperator_async,
        lockedOperator_async        : YCellular_get_lockedOperator_async,
        set_lockedOperator          : YCellular_set_lockedOperator,
        setLockedOperator           : YCellular_set_lockedOperator,
        get_airplaneMode            : YCellular_get_airplaneMode,
        airplaneMode                : YCellular_get_airplaneMode,
        get_airplaneMode_async      : YCellular_get_airplaneMode_async,
        airplaneMode_async          : YCellular_get_airplaneMode_async,
        set_airplaneMode            : YCellular_set_airplaneMode,
        setAirplaneMode             : YCellular_set_airplaneMode,
        get_enableData              : YCellular_get_enableData,
        enableData                  : YCellular_get_enableData,
        get_enableData_async        : YCellular_get_enableData_async,
        enableData_async            : YCellular_get_enableData_async,
        set_enableData              : YCellular_set_enableData,
        setEnableData               : YCellular_set_enableData,
        get_apn                     : YCellular_get_apn,
        apn                         : YCellular_get_apn,
        get_apn_async               : YCellular_get_apn_async,
        apn_async                   : YCellular_get_apn_async,
        set_apn                     : YCellular_set_apn,
        setApn                      : YCellular_set_apn,
        get_apnSecret               : YCellular_get_apnSecret,
        apnSecret                   : YCellular_get_apnSecret,
        get_apnSecret_async         : YCellular_get_apnSecret_async,
        apnSecret_async             : YCellular_get_apnSecret_async,
        set_apnSecret               : YCellular_set_apnSecret,
        setApnSecret                : YCellular_set_apnSecret,
        get_pingInterval            : YCellular_get_pingInterval,
        pingInterval                : YCellular_get_pingInterval,
        get_pingInterval_async      : YCellular_get_pingInterval_async,
        pingInterval_async          : YCellular_get_pingInterval_async,
        set_pingInterval            : YCellular_set_pingInterval,
        setPingInterval             : YCellular_set_pingInterval,
        get_dataSent                : YCellular_get_dataSent,
        dataSent                    : YCellular_get_dataSent,
        get_dataSent_async          : YCellular_get_dataSent_async,
        dataSent_async              : YCellular_get_dataSent_async,
        set_dataSent                : YCellular_set_dataSent,
        setDataSent                 : YCellular_set_dataSent,
        get_dataReceived            : YCellular_get_dataReceived,
        dataReceived                : YCellular_get_dataReceived,
        get_dataReceived_async      : YCellular_get_dataReceived_async,
        dataReceived_async          : YCellular_get_dataReceived_async,
        set_dataReceived            : YCellular_set_dataReceived,
        setDataReceived             : YCellular_set_dataReceived,
        get_command                 : YCellular_get_command,
        command                     : YCellular_get_command,
        get_command_async           : YCellular_get_command_async,
        command_async               : YCellular_get_command_async,
        set_command                 : YCellular_set_command,
        setCommand                  : YCellular_set_command,
        sendPUK                     : YCellular_sendPUK,
        set_apnAuth                 : YCellular_set_apnAuth,
        setApnAuth                  : YCellular_set_apnAuth,
        clearDataCounters           : YCellular_clearDataCounters,
        _AT                         : YCellular_AT,
        get_availableOperators      : YCellular_get_availableOperators,
        availableOperators          : YCellular_get_availableOperators,
        quickCellSurvey             : YCellular_quickCellSurvey,
        nextCellular                : YCellular_nextCellular,
        _parseAttr                  : YCellular_parseAttr
    });
    //--- (end of generated code: YCellular initialization)
})();

//--- (generated code: Cellular functions)

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
 * Use the method YCellular.isOnline() to test if the cellular interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a cellular interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the cellular interface
 *
 * @return a YCellular object allowing you to drive the cellular interface.
 */
function yFindCellular(func)
{
    return YCellular.FindCellular(func);
}

/**
 * Starts the enumeration of cellular interfaces currently accessible.
 * Use the method YCellular.nextCellular() to iterate on
 * next cellular interfaces.
 *
 * @return a pointer to a YCellular object, corresponding to
 *         the first cellular interface currently online, or a null pointer
 *         if there are none.
 */
function yFirstCellular()
{
    return YCellular.FirstCellular();
}

//--- (end of generated code: Cellular functions)
