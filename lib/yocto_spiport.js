/*********************************************************************
 *
 * $Id: yocto_spiport.js 27114 2017-04-06 22:22:28Z seb $
 *
 * Implements the high-level API for SpiPort functions
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

//--- (YSpiPort return codes)
//--- (end of YSpiPort return codes)
//--- (YSpiPort definitions)
var Y_VOLTAGELEVEL_OFF              = 0;
var Y_VOLTAGELEVEL_TTL3V            = 1;
var Y_VOLTAGELEVEL_TTL3VR           = 2;
var Y_VOLTAGELEVEL_TTL5V            = 3;
var Y_VOLTAGELEVEL_TTL5VR           = 4;
var Y_VOLTAGELEVEL_RS232            = 5;
var Y_VOLTAGELEVEL_RS485            = 6;
var Y_VOLTAGELEVEL_INVALID          = -1;
var Y_SSPOLARITY_ACTIVE_LOW         = 0;
var Y_SSPOLARITY_ACTIVE_HIGH        = 1;
var Y_SSPOLARITY_INVALID            = -1;
var Y_SHITFTSAMPLING_OFF            = 0;
var Y_SHITFTSAMPLING_ON             = 1;
var Y_SHITFTSAMPLING_INVALID        = -1;
var Y_RXCOUNT_INVALID               = YAPI_INVALID_UINT;
var Y_TXCOUNT_INVALID               = YAPI_INVALID_UINT;
var Y_ERRCOUNT_INVALID              = YAPI_INVALID_UINT;
var Y_RXMSGCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_TXMSGCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_LASTMSG_INVALID               = YAPI_INVALID_STRING;
var Y_CURRENTJOB_INVALID            = YAPI_INVALID_STRING;
var Y_STARTUPJOB_INVALID            = YAPI_INVALID_STRING;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
var Y_PROTOCOL_INVALID              = YAPI_INVALID_STRING;
var Y_SPIMODE_INVALID               = YAPI_INVALID_STRING;
//--- (end of YSpiPort definitions)

//--- (YSpiPort class start)
/**
 * YSpiPort Class: SPI Port function interface
 *
 * The SpiPort function interface allows you to fully drive a Yoctopuce
 * SPI port, to send and receive data, and to configure communication
 * parameters (baud rate, bit count, parity, flow control and protocol).
 * Note that Yoctopuce SPI ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of YSpiPort class start)

var YSpiPort; // definition below
(function()
{
    function _YSpiPort(str_func)
    {
        //--- (YSpiPort constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'SpiPort';

        this._rxCount                        = Y_RXCOUNT_INVALID;          // UInt31
        this._txCount                        = Y_TXCOUNT_INVALID;          // UInt31
        this._errCount                       = Y_ERRCOUNT_INVALID;         // UInt31
        this._rxMsgCount                     = Y_RXMSGCOUNT_INVALID;       // UInt31
        this._txMsgCount                     = Y_TXMSGCOUNT_INVALID;       // UInt31
        this._lastMsg                        = Y_LASTMSG_INVALID;          // Text
        this._currentJob                     = Y_CURRENTJOB_INVALID;       // Text
        this._startupJob                     = Y_STARTUPJOB_INVALID;       // Text
        this._command                        = Y_COMMAND_INVALID;          // Text
        this._voltageLevel                   = Y_VOLTAGELEVEL_INVALID;     // SerialVoltageLevel
        this._protocol                       = Y_PROTOCOL_INVALID;         // Protocol
        this._spiMode                        = Y_SPIMODE_INVALID;          // SpiMode
        this._ssPolarity                     = Y_SSPOLARITY_INVALID;       // Polarity
        this._shitftSampling                 = Y_SHITFTSAMPLING_INVALID;   // OnOff
        this._rxptr                          = 0;                          // int
        this._rxbuff                         = new Buffer(0);              // bin
        this._rxbuffptr                      = 0;                          // int
        //--- (end of YSpiPort constructor)
    }

    //--- (YSpiPort implementation)

    function YSpiPort_parseAttr(name, val, _super)
    {
        switch(name) {
        case "rxCount":
            this._rxCount = parseInt(val);
            return 1;
        case "txCount":
            this._txCount = parseInt(val);
            return 1;
        case "errCount":
            this._errCount = parseInt(val);
            return 1;
        case "rxMsgCount":
            this._rxMsgCount = parseInt(val);
            return 1;
        case "txMsgCount":
            this._txMsgCount = parseInt(val);
            return 1;
        case "lastMsg":
            this._lastMsg = val;
            return 1;
        case "currentJob":
            this._currentJob = val;
            return 1;
        case "startupJob":
            this._startupJob = val;
            return 1;
        case "command":
            this._command = val;
            return 1;
        case "voltageLevel":
            this._voltageLevel = parseInt(val);
            return 1;
        case "protocol":
            this._protocol = val;
            return 1;
        case "spiMode":
            this._spiMode = val;
            return 1;
        case "ssPolarity":
            this._ssPolarity = parseInt(val);
            return 1;
        case "shitftSampling":
            this._shitftSampling = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YSpiPort.RXCOUNT_INVALID.
     */
    function YSpiPort_get_rxCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RXCOUNT_INVALID;
            }
        }
        res = this._rxCount;
        return res;
    }

    /**
     * Gets the total number of bytes received since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of bytes received since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_RXCOUNT_INVALID.
     */
    function YSpiPort_get_rxCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RXCOUNT_INVALID);
            } else {
                callback(context, obj, obj._rxCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of bytes transmitted since last reset.
     *
     * @return an integer corresponding to the total number of bytes transmitted since last reset
     *
     * On failure, throws an exception or returns YSpiPort.TXCOUNT_INVALID.
     */
    function YSpiPort_get_txCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TXCOUNT_INVALID;
            }
        }
        res = this._txCount;
        return res;
    }

    /**
     * Gets the total number of bytes transmitted since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of bytes transmitted since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_TXCOUNT_INVALID.
     */
    function YSpiPort_get_txCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TXCOUNT_INVALID);
            } else {
                callback(context, obj, obj._txCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of communication errors detected since last reset.
     *
     * @return an integer corresponding to the total number of communication errors detected since last reset
     *
     * On failure, throws an exception or returns YSpiPort.ERRCOUNT_INVALID.
     */
    function YSpiPort_get_errCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ERRCOUNT_INVALID;
            }
        }
        res = this._errCount;
        return res;
    }

    /**
     * Gets the total number of communication errors detected since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of communication errors detected since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_ERRCOUNT_INVALID.
     */
    function YSpiPort_get_errCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ERRCOUNT_INVALID);
            } else {
                callback(context, obj, obj._errCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of messages received since last reset.
     *
     * @return an integer corresponding to the total number of messages received since last reset
     *
     * On failure, throws an exception or returns YSpiPort.RXMSGCOUNT_INVALID.
     */
    function YSpiPort_get_rxMsgCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RXMSGCOUNT_INVALID;
            }
        }
        res = this._rxMsgCount;
        return res;
    }

    /**
     * Gets the total number of messages received since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of messages received since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_RXMSGCOUNT_INVALID.
     */
    function YSpiPort_get_rxMsgCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RXMSGCOUNT_INVALID);
            } else {
                callback(context, obj, obj._rxMsgCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the total number of messages send since last reset.
     *
     * @return an integer corresponding to the total number of messages send since last reset
     *
     * On failure, throws an exception or returns YSpiPort.TXMSGCOUNT_INVALID.
     */
    function YSpiPort_get_txMsgCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TXMSGCOUNT_INVALID;
            }
        }
        res = this._txMsgCount;
        return res;
    }

    /**
     * Gets the total number of messages send since last reset.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:an integer corresponding to the total number of messages send since last reset
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_TXMSGCOUNT_INVALID.
     */
    function YSpiPort_get_txMsgCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TXMSGCOUNT_INVALID);
            } else {
                callback(context, obj, obj._txMsgCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the latest message fully received (for Line and Frame protocols).
     *
     * @return a string corresponding to the latest message fully received (for Line and Frame protocols)
     *
     * On failure, throws an exception or returns YSpiPort.LASTMSG_INVALID.
     */
    function YSpiPort_get_lastMsg()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LASTMSG_INVALID;
            }
        }
        res = this._lastMsg;
        return res;
    }

    /**
     * Gets the latest message fully received (for Line and Frame protocols).
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:a string corresponding to the latest message fully received (for Line and Frame protocols)
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_LASTMSG_INVALID.
     */
    function YSpiPort_get_lastMsg_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LASTMSG_INVALID);
            } else {
                callback(context, obj, obj._lastMsg);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the name of the job file currently in use.
     *
     * @return a string corresponding to the name of the job file currently in use
     *
     * On failure, throws an exception or returns YSpiPort.CURRENTJOB_INVALID.
     */
    function YSpiPort_get_currentJob()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTJOB_INVALID;
            }
        }
        res = this._currentJob;
        return res;
    }

    /**
     * Gets the name of the job file currently in use.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:a string corresponding to the name of the job file currently in use
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_CURRENTJOB_INVALID.
     */
    function YSpiPort_get_currentJob_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTJOB_INVALID);
            } else {
                callback(context, obj, obj._currentJob);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the job to use when the device is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_set_currentJob(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('currentJob',rest_val);
    }

    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns YSpiPort.STARTUPJOB_INVALID.
     */
    function YSpiPort_get_startupJob()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_STARTUPJOB_INVALID;
            }
        }
        res = this._startupJob;
        return res;
    }

    /**
     * Gets the job file to use when the device is powered on.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:a string corresponding to the job file to use when the device is powered on
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_STARTUPJOB_INVALID.
     */
    function YSpiPort_get_startupJob_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_STARTUPJOB_INVALID);
            } else {
                callback(context, obj, obj._startupJob);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the job to use when the device is powered on
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_set_startupJob(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('startupJob',rest_val);
    }

    function YSpiPort_get_command()
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
     *         - the YSpiPort object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YSpiPort_get_command_async(callback,context)
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

    function YSpiPort_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Returns the voltage level used on the serial line.
     *
     * @return a value among YSpiPort.VOLTAGELEVEL_OFF, YSpiPort.VOLTAGELEVEL_TTL3V,
     * YSpiPort.VOLTAGELEVEL_TTL3VR, YSpiPort.VOLTAGELEVEL_TTL5V, YSpiPort.VOLTAGELEVEL_TTL5VR,
     * YSpiPort.VOLTAGELEVEL_RS232 and YSpiPort.VOLTAGELEVEL_RS485 corresponding to the voltage level used
     * on the serial line
     *
     * On failure, throws an exception or returns YSpiPort.VOLTAGELEVEL_INVALID.
     */
    function YSpiPort_get_voltageLevel()
    {
        var res;                    // enumSERIALVOLTAGELEVEL;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLTAGELEVEL_INVALID;
            }
        }
        res = this._voltageLevel;
        return res;
    }

    /**
     * Gets the voltage level used on the serial line.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:a value among Y_VOLTAGELEVEL_OFF, Y_VOLTAGELEVEL_TTL3V, Y_VOLTAGELEVEL_TTL3VR,
     *         Y_VOLTAGELEVEL_TTL5V, Y_VOLTAGELEVEL_TTL5VR, Y_VOLTAGELEVEL_RS232 and Y_VOLTAGELEVEL_RS485
     *         corresponding to the voltage level used on the serial line
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_VOLTAGELEVEL_INVALID.
     */
    function YSpiPort_get_voltageLevel_async(callback,context)
    {
        var res;                    // enumSERIALVOLTAGELEVEL;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLTAGELEVEL_INVALID);
            } else {
                callback(context, obj, obj._voltageLevel);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the voltage type used on the serial line. Valid
     * values  will depend on the Yoctopuce device model featuring
     * the serial port feature.  Check your device documentation
     * to find out which values are valid for that specific model.
     * Trying to set an invalid value will have no effect.
     *
     * @param newval : a value among YSpiPort.VOLTAGELEVEL_OFF, YSpiPort.VOLTAGELEVEL_TTL3V,
     * YSpiPort.VOLTAGELEVEL_TTL3VR, YSpiPort.VOLTAGELEVEL_TTL5V, YSpiPort.VOLTAGELEVEL_TTL5VR,
     * YSpiPort.VOLTAGELEVEL_RS232 and YSpiPort.VOLTAGELEVEL_RS485 corresponding to the voltage type used
     * on the serial line
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_set_voltageLevel(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('voltageLevel',rest_val);
    }

    /**
     * Returns the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @return a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns YSpiPort.PROTOCOL_INVALID.
     */
    function YSpiPort_get_protocol()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_PROTOCOL_INVALID;
            }
        }
        res = this._protocol;
        return res;
    }

    /**
     * Gets the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:a string corresponding to the type of protocol used over the serial line, as a string
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_PROTOCOL_INVALID.
     */
    function YSpiPort_get_protocol_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_PROTOCOL_INVALID);
            } else {
                callback(context, obj, obj._protocol);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the type of protocol used over the serial line.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each bytes sent.
     *
     * @param newval : a string corresponding to the type of protocol used over the serial line
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_set_protocol(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('protocol',rest_val);
    }

    /**
     * Returns the SPI port communication parameters, as a string such as
     * "125000,0,msb". The string includes the baud rate, the SPI mode (between
     * 0 and 3) and the bit order.
     *
     * @return a string corresponding to the SPI port communication parameters, as a string such as
     *         "125000,0,msb"
     *
     * On failure, throws an exception or returns YSpiPort.SPIMODE_INVALID.
     */
    function YSpiPort_get_spiMode()
    {
        var res;                    // string;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SPIMODE_INVALID;
            }
        }
        res = this._spiMode;
        return res;
    }

    /**
     * Gets the SPI port communication parameters, as a string such as
     * "125000,0,msb". The string includes the baud rate, the SPI mode (between
     * 0 and 3) and the bit order.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:a string corresponding to the SPI port communication parameters, as a string such as
     *         "125000,0,msb"
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_SPIMODE_INVALID.
     */
    function YSpiPort_get_spiMode_async(callback,context)
    {
        var res;                    // string;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SPIMODE_INVALID);
            } else {
                callback(context, obj, obj._spiMode);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the SPI port communication parameters, with a string such as
     * "125000,0,msb". The string includes the baud rate, the SPI mode (between
     * 0 and 3) and the bit order.
     *
     * @param newval : a string corresponding to the SPI port communication parameters, with a string such as
     *         "125000,0,msb"
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_set_spiMode(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('spiMode',rest_val);
    }

    /**
     * Returns the SS line polarity.
     *
     * @return either YSpiPort.SSPOLARITY_ACTIVE_LOW or YSpiPort.SSPOLARITY_ACTIVE_HIGH, according to the
     * SS line polarity
     *
     * On failure, throws an exception or returns YSpiPort.SSPOLARITY_INVALID.
     */
    function YSpiPort_get_ssPolarity()
    {
        var res;                    // enumPOLARITY;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SSPOLARITY_INVALID;
            }
        }
        res = this._ssPolarity;
        return res;
    }

    /**
     * Gets the SS line polarity.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:either Y_SSPOLARITY_ACTIVE_LOW or Y_SSPOLARITY_ACTIVE_HIGH, according to the SS line polarity
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_SSPOLARITY_INVALID.
     */
    function YSpiPort_get_ssPolarity_async(callback,context)
    {
        var res;                    // enumPOLARITY;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SSPOLARITY_INVALID);
            } else {
                callback(context, obj, obj._ssPolarity);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the SS line polarity.
     *
     * @param newval : either YSpiPort.SSPOLARITY_ACTIVE_LOW or YSpiPort.SSPOLARITY_ACTIVE_HIGH, according
     * to the SS line polarity
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_set_ssPolarity(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('ssPolarity',rest_val);
    }

    /**
     * Returns true when the SDI line phase is shifted with regards to the SDO line.
     *
     * @return either YSpiPort.SHITFTSAMPLING_OFF or YSpiPort.SHITFTSAMPLING_ON, according to true when
     * the SDI line phase is shifted with regards to the SDO line
     *
     * On failure, throws an exception or returns YSpiPort.SHITFTSAMPLING_INVALID.
     */
    function YSpiPort_get_shitftSampling()
    {
        var res;                    // enumONOFF;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SHITFTSAMPLING_INVALID;
            }
        }
        res = this._shitftSampling;
        return res;
    }

    /**
     * Gets true when the SDI line phase is shifted with regards to the SDO line.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YSpiPort object that invoked the callback
     *         - the result:either Y_SHITFTSAMPLING_OFF or Y_SHITFTSAMPLING_ON, according to true when the SDI
     *         line phase is shifted with regards to the SDO line
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_SHITFTSAMPLING_INVALID.
     */
    function YSpiPort_get_shitftSampling_async(callback,context)
    {
        var res;                    // enumONOFF;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SHITFTSAMPLING_INVALID);
            } else {
                callback(context, obj, obj._shitftSampling);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the SDI line sampling shift. When disabled, SDI line is
     * sampled in the middle of data output time. When enabled, SDI line is
     * samples at the end of data output time.
     *
     * @param newval : either YSpiPort.SHITFTSAMPLING_OFF or YSpiPort.SHITFTSAMPLING_ON, according to the
     * SDI line sampling shift
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_set_shitftSampling(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('shitftSampling',rest_val);
    }

    /**
     * Retrieves a SPI port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the SPI port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSpiPort.isOnline() to test if the SPI port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a SPI port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the SPI port
     *
     * @return a YSpiPort object allowing you to drive the SPI port.
     */
    function YSpiPort_FindSpiPort(func)                         // class method
    {
        var obj;                    // YSpiPort;
        obj = YFunction._FindFromCache("SpiPort", func);
        if (obj == null) {
            obj = new YSpiPort(func);
            YFunction._AddToCache("SpiPort", func, obj);
        }
        return obj;
    }

    function YSpiPort_sendCommand(text)
    {
        return this.set_command(text);
    }

    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_reset()
    {
        this._rxptr = 0;
        this._rxbuffptr = 0;
        this._rxbuff = new Buffer(0);
        
        return this.sendCommand("Z");
    }

    /**
     * Sends a single byte to the serial port.
     *
     * @param code : the byte to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_writeByte(code)
    {
        return this.sendCommand("$"+('00'+(code).toString(16)).slice(-2));
    }

    /**
     * Sends an ASCII string to the serial port, as is.
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_writeStr(text)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var ch;                     // int;
        buff = new Buffer(text, YAPI.defaultEncoding);
        bufflen = (buff).length;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = (buff).readUInt8(idx);
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                } else {
                    ch = 0;
                }
            }
            if (idx >= bufflen) {
                return this.sendCommand("+"+text);
            }
        }
        // send string using file upload
        return this._upload("txdata", buff);
    }

    /**
     * Sends a binary buffer to the serial port, as is.
     *
     * @param buff : the binary buffer to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_writeBin(buff)
    {
        return this._upload("txdata", buff);
    }

    /**
     * Sends a byte sequence (provided as a list of bytes) to the serial port.
     *
     * @param byteList : a list of byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_writeArray(byteList)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var hexb;                   // int;
        var res;                    // int;
        bufflen = byteList.length;
        buff = new Buffer(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = byteList[idx];
            (buff).writeUInt8(hexb, idx);
            idx = idx + 1;
        }
        
        res = this._upload("txdata", buff);
        return res;
    }

    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the serial port.
     *
     * @param hexString : a string of hexadecimal byte codes
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_writeHex(hexString)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var hexb;                   // int;
        var res;                    // int;
        bufflen = (hexString).length;
        if (bufflen < 100) {
            return this.sendCommand("$"+hexString);
        }
        bufflen = ((bufflen) >> (1));
        buff = new Buffer(bufflen);
        idx = 0;
        while (idx < bufflen) {
            hexb = parseInt((hexString).substr( 2 * idx, 2), 16);
            (buff).writeUInt8(hexb, idx);
            idx = idx + 1;
        }
        
        res = this._upload("txdata", buff);
        return res;
    }

    /**
     * Sends an ASCII string to the serial port, followed by a line break (CR LF).
     *
     * @param text : the text string to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_writeLine(text)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var idx;                    // int;
        var ch;                     // int;
        buff = new Buffer(""+text+"\r\n", YAPI.defaultEncoding);
        bufflen = (buff).length-2;
        if (bufflen < 100) {
            // if string is pure text, we can send it as a simple command (faster)
            ch = 0x20;
            idx = 0;
            while ((idx < bufflen) && (ch != 0)) {
                ch = (buff).readUInt8(idx);
                if ((ch >= 0x20) && (ch < 0x7f)) {
                    idx = idx + 1;
                } else {
                    ch = 0;
                }
            }
            if (idx >= bufflen) {
                return this.sendCommand("!"+text);
            }
        }
        // send string using file upload
        return this._upload("txdata", buff);
    }

    /**
     * Reads one byte from the receive buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer,
     * or if there is no data available yet, the function returns YAPI.NO_MORE_DATA.
     *
     * @return the next byte
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_readByte()
    {
        var currpos;                // int;
        var reqlen;                 // int;
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var res;                    // int;
        
        // first check if we have the requested character in the look-ahead buffer
        bufflen = (this._rxbuff).length;
        if ((this._rxptr >= this._rxbuffptr) && (this._rxptr < this._rxbuffptr+bufflen)) {
            res = (this._rxbuff).readUInt8(this._rxptr-this._rxbuffptr);
            this._rxptr = this._rxptr + 1;
            return res;
        }
        
        // try to preload more than one byte to speed-up byte-per-byte access
        currpos = this._rxptr;
        reqlen = 1024;
        buff = this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos+bufflen) {
            res = (buff).readUInt8(0);
            this._rxptr = currpos+1;
            this._rxbuffptr = currpos;
            this._rxbuff = buff;
            return res;
        }
        // mixed bidirectional data, retry with a smaller block
        this._rxptr = currpos;
        reqlen = 16;
        buff = this.readBin(reqlen);
        bufflen = (buff).length;
        if (this._rxptr == currpos+bufflen) {
            res = (buff).readUInt8(0);
            this._rxptr = currpos+1;
            this._rxbuffptr = currpos;
            this._rxbuff = buff;
            return res;
        }
        // still mixed, need to process character by character
        this._rxptr = currpos;
        
        
        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len=1");
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).readUInt8(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).readUInt8(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        if (bufflen == 0) {
            return YAPI_NO_MORE_DATA;
        }
        res = (buff).readUInt8(0);
        return res;
    }

    /**
     * Reads data from the receive buffer as a string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of characters to read
     *
     * @return a string with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_readStr(nChars)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var res;                    // str;
        if (nChars > 65535) {
            nChars = 65535;
        }
        
        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).readUInt8(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).readUInt8(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = (buff.toString(YAPI.defaultEncoding)).substr( 0, bufflen);
        return res;
    }

    /**
     * Reads data from the receive buffer as a binary buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of bytes to read
     *
     * @return a binary object with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_readBin(nChars)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var idx;                    // int;
        var res;                    // bin;
        if (nChars > 65535) {
            nChars = 65535;
        }
        
        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).readUInt8(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).readUInt8(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = new Buffer(bufflen);
        idx = 0;
        while (idx < bufflen) {
            (res).writeUInt8((buff).readUInt8(idx), idx);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a list of bytes, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars : the maximum number of bytes to read
     *
     * @return a sequence of bytes with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_readArray(nChars)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var idx;                    // int;
        var b;                      // int;
        var res = [];               // intArr;
        if (nChars > 65535) {
            nChars = 65535;
        }
        
        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nChars)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).readUInt8(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).readUInt8(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res.length = 0;
        idx = 0;
        while (idx < bufflen) {
            b = (buff).readUInt8(idx);
            res.push(b);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a hexadecimal string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nBytes : the maximum number of bytes to read
     *
     * @return a string with receive buffer contents, encoded in hexadecimal
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_readHex(nBytes)
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var mult;                   // int;
        var endpos;                 // int;
        var ofs;                    // int;
        var res;                    // str;
        if (nBytes > 65535) {
            nBytes = 65535;
        }
        
        buff = this._download("rxdata.bin?pos="+String(Math.round(this._rxptr))+"&len="+String(Math.round(nBytes)));
        bufflen = (buff).length - 1;
        endpos = 0;
        mult = 1;
        while ((bufflen > 0) && ((buff).readUInt8(bufflen) != 64)) {
            endpos = endpos + mult * ((buff).readUInt8(bufflen) - 48);
            mult = mult * 10;
            bufflen = bufflen - 1;
        }
        this._rxptr = endpos;
        res = "";
        ofs = 0;
        while (ofs + 3 < bufflen) {
            res = ""+res+""+('00'+((buff).readUInt8(ofs)).toString(16)).slice(-2)+""+('00'+((buff).readUInt8(ofs + 1)).toString(16)).slice(-2)+""+('00'+((buff).readUInt8(ofs + 2)).toString(16)).slice(-2)+""+('00'+((buff).readUInt8(ofs + 3)).toString(16)).slice(-2);
            ofs = ofs + 4;
        }
        while (ofs < bufflen) {
            res = ""+res+""+('00'+((buff).readUInt8(ofs)).toString(16)).slice(-2);
            ofs = ofs + 1;
        }
        return res;
    }

    /**
     * Reads a single line (or message) from the receive buffer, starting at current stream position.
     * This function is intended to be used when the serial port is configured for a message protocol,
     * such as 'Line' mode or frame protocols.
     *
     * If data at current stream position is not available anymore in the receive buffer,
     * the function returns the oldest available line and moves the stream position just after.
     * If no new full line is received, the function returns an empty line.
     *
     * @return a string with a single line of text
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_readLine()
    {
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res;                    // str;
        
        url = "rxmsg.json?pos="+String(Math.round(this._rxptr))+"&len=1&maxw=1";
        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return "";
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        if (msglen == 0) {
            return "";
        }
        res = this._json_get_string(new Buffer(msgarr[0], YAPI.defaultEncoding));
        return res;
    }

    /**
     * Searches for incoming messages in the serial port receive buffer matching a given pattern,
     * starting at current position. This function will only compare and return printable characters
     * in the message strings. Binary protocols are handled as hexadecimal strings.
     *
     * The search returns all messages matching the expression provided as argument in the buffer.
     * If no matching message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param pattern : a limited regular expression describing the expected message format,
     *         or an empty string if all messages should be returned (no filtering).
     *         When using binary protocols, the format applies to the hexadecimal
     *         representation of the message.
     * @param maxWait : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return an array of strings containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSpiPort_readMessages(pattern,maxWait)
    {
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res = [];               // strArr;
        var idx;                    // int;
        
        url = "rxmsg.json?pos="+String(Math.round(this._rxptr))+"&maxw="+String(Math.round(maxWait))+"&pat="+pattern;
        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return res;
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        idx = 0;
        while (idx < msglen) {
            res.push(this._json_get_string(new Buffer(msgarr[idx], YAPI.defaultEncoding)));
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Changes the current internal stream position to the specified value. This function
     * does not affect the device, it only changes the value stored in the API object
     * for the next read operations.
     *
     * @param absPos : the absolute position index for next read operations.
     *
     * @return nothing.
     */
    function YSpiPort_read_seek(absPos)
    {
        this._rxptr = absPos;
        return YAPI_SUCCESS;
    }

    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return the absolute position index for next read operations.
     */
    function YSpiPort_read_tell()
    {
        return this._rxptr;
    }

    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return the number of bytes available to read
     */
    function YSpiPort_read_avail()
    {
        var buff;                   // bin;
        var bufflen;                // int;
        var res;                    // int;
        
        buff = this._download("rxcnt.bin?pos="+String(Math.round(this._rxptr)));
        bufflen = (buff).length - 1;
        while ((bufflen > 0) && ((buff).readUInt8(bufflen) != 64)) {
            bufflen = bufflen - 1;
        }
        res = YAPI._atoi((buff.toString(YAPI.defaultEncoding)).substr( 0, bufflen));
        return res;
    }

    /**
     * Sends a text line query to the serial port, and reads the reply, if any.
     * This function is intended to be used when the serial port is configured for 'Line' protocol.
     *
     * @param query : the line query to send (without CR/LF)
     * @param maxWait : the maximum number of milliseconds to wait for a reply.
     *
     * @return the next text line received after sending the text query, as a string.
     *         Additional lines can be obtained by calling readLine or readMessages.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YSpiPort_queryLine(query,maxWait)
    {
        var url;                    // str;
        var msgbin;                 // bin;
        var msgarr = [];            // strArr;
        var msglen;                 // int;
        var res;                    // str;
        
        url = "rxmsg.json?len=1&maxw="+String(Math.round(maxWait))+"&cmd=!"+query;
        msgbin = this._download(url);
        msgarr = this._json_get_array(msgbin);
        msglen = msgarr.length;
        if (msglen == 0) {
            return "";
        }
        // last element of array is the new position
        msglen = msglen - 1;
        this._rxptr = YAPI._atoi(msgarr[msglen]);
        if (msglen == 0) {
            return "";
        }
        res = this._json_get_string(new Buffer(msgarr[0], YAPI.defaultEncoding));
        return res;
    }

    /**
     * Saves the job definition string (JSON data) into a job file.
     * The job file can be later enabled using selectJob().
     *
     * @param jobfile : name of the job file to save on the device filesystem
     * @param jsonDef : a string containing a JSON definition of the job
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_uploadJob(jobfile,jsonDef)
    {
        this._upload(jobfile, new Buffer(jsonDef, YAPI.defaultEncoding));
        return YAPI_SUCCESS;
    }

    /**
     * Load and start processing the specified job file. The file must have
     * been previously created using the user interface or uploaded on the
     * device filesystem using the uploadJob() function.
     *
     * @param jobfile : name of the job file (on the device filesystem)
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_selectJob(jobfile)
    {
        return this.set_currentJob(jobfile);
    }

    /**
     * Manually sets the state of the SS line. This function has no effect when
     * the SS line is handled automatically.
     *
     * @param val : 1 to turn SS active, 0 to release SS.
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YSpiPort_set_SS(val)
    {
        return this.sendCommand("S"+String(Math.round(val)));
    }

    /**
     * Continues the enumeration of SPI ports started using yFirstSpiPort().
     *
     * @return a pointer to a YSpiPort object, corresponding to
     *         a SPI port currently online, or a null pointer
     *         if there are no more SPI ports to enumerate.
     */
    function YSpiPort_nextSpiPort()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YSpiPort.FindSpiPort(next_hwid);
    }

    /**
     * Starts the enumeration of SPI ports currently accessible.
     * Use the method YSpiPort.nextSpiPort() to iterate on
     * next SPI ports.
     *
     * @return a pointer to a YSpiPort object, corresponding to
     *         the first SPI port currently online, or a null pointer
     *         if there are none.
     */
    function YSpiPort_FirstSpiPort()
    {
        var next_hwid = YAPI.getFirstHardwareId('SpiPort');
        if(next_hwid == null) return null;
        return YSpiPort.FindSpiPort(next_hwid);
    }

    //--- (end of YSpiPort implementation)

    //--- (YSpiPort initialization)
    YSpiPort = YFunction._Subclass(_YSpiPort, {
        // Constants
        RXCOUNT_INVALID             : YAPI_INVALID_UINT,
        TXCOUNT_INVALID             : YAPI_INVALID_UINT,
        ERRCOUNT_INVALID            : YAPI_INVALID_UINT,
        RXMSGCOUNT_INVALID          : YAPI_INVALID_UINT,
        TXMSGCOUNT_INVALID          : YAPI_INVALID_UINT,
        LASTMSG_INVALID             : YAPI_INVALID_STRING,
        CURRENTJOB_INVALID          : YAPI_INVALID_STRING,
        STARTUPJOB_INVALID          : YAPI_INVALID_STRING,
        COMMAND_INVALID             : YAPI_INVALID_STRING,
        VOLTAGELEVEL_OFF            : 0,
        VOLTAGELEVEL_TTL3V          : 1,
        VOLTAGELEVEL_TTL3VR         : 2,
        VOLTAGELEVEL_TTL5V          : 3,
        VOLTAGELEVEL_TTL5VR         : 4,
        VOLTAGELEVEL_RS232          : 5,
        VOLTAGELEVEL_RS485          : 6,
        VOLTAGELEVEL_INVALID        : -1,
        PROTOCOL_INVALID            : YAPI_INVALID_STRING,
        SPIMODE_INVALID             : YAPI_INVALID_STRING,
        SSPOLARITY_ACTIVE_LOW       : 0,
        SSPOLARITY_ACTIVE_HIGH      : 1,
        SSPOLARITY_INVALID          : -1,
        SHITFTSAMPLING_OFF          : 0,
        SHITFTSAMPLING_ON           : 1,
        SHITFTSAMPLING_INVALID      : -1
    }, {
        // Class methods
        FindSpiPort                 : YSpiPort_FindSpiPort,
        FirstSpiPort                : YSpiPort_FirstSpiPort
    }, {
        // Methods
        get_rxCount                 : YSpiPort_get_rxCount,
        rxCount                     : YSpiPort_get_rxCount,
        get_rxCount_async           : YSpiPort_get_rxCount_async,
        rxCount_async               : YSpiPort_get_rxCount_async,
        get_txCount                 : YSpiPort_get_txCount,
        txCount                     : YSpiPort_get_txCount,
        get_txCount_async           : YSpiPort_get_txCount_async,
        txCount_async               : YSpiPort_get_txCount_async,
        get_errCount                : YSpiPort_get_errCount,
        errCount                    : YSpiPort_get_errCount,
        get_errCount_async          : YSpiPort_get_errCount_async,
        errCount_async              : YSpiPort_get_errCount_async,
        get_rxMsgCount              : YSpiPort_get_rxMsgCount,
        rxMsgCount                  : YSpiPort_get_rxMsgCount,
        get_rxMsgCount_async        : YSpiPort_get_rxMsgCount_async,
        rxMsgCount_async            : YSpiPort_get_rxMsgCount_async,
        get_txMsgCount              : YSpiPort_get_txMsgCount,
        txMsgCount                  : YSpiPort_get_txMsgCount,
        get_txMsgCount_async        : YSpiPort_get_txMsgCount_async,
        txMsgCount_async            : YSpiPort_get_txMsgCount_async,
        get_lastMsg                 : YSpiPort_get_lastMsg,
        lastMsg                     : YSpiPort_get_lastMsg,
        get_lastMsg_async           : YSpiPort_get_lastMsg_async,
        lastMsg_async               : YSpiPort_get_lastMsg_async,
        get_currentJob              : YSpiPort_get_currentJob,
        currentJob                  : YSpiPort_get_currentJob,
        get_currentJob_async        : YSpiPort_get_currentJob_async,
        currentJob_async            : YSpiPort_get_currentJob_async,
        set_currentJob              : YSpiPort_set_currentJob,
        setCurrentJob               : YSpiPort_set_currentJob,
        get_startupJob              : YSpiPort_get_startupJob,
        startupJob                  : YSpiPort_get_startupJob,
        get_startupJob_async        : YSpiPort_get_startupJob_async,
        startupJob_async            : YSpiPort_get_startupJob_async,
        set_startupJob              : YSpiPort_set_startupJob,
        setStartupJob               : YSpiPort_set_startupJob,
        get_command                 : YSpiPort_get_command,
        command                     : YSpiPort_get_command,
        get_command_async           : YSpiPort_get_command_async,
        command_async               : YSpiPort_get_command_async,
        set_command                 : YSpiPort_set_command,
        setCommand                  : YSpiPort_set_command,
        get_voltageLevel            : YSpiPort_get_voltageLevel,
        voltageLevel                : YSpiPort_get_voltageLevel,
        get_voltageLevel_async      : YSpiPort_get_voltageLevel_async,
        voltageLevel_async          : YSpiPort_get_voltageLevel_async,
        set_voltageLevel            : YSpiPort_set_voltageLevel,
        setVoltageLevel             : YSpiPort_set_voltageLevel,
        get_protocol                : YSpiPort_get_protocol,
        protocol                    : YSpiPort_get_protocol,
        get_protocol_async          : YSpiPort_get_protocol_async,
        protocol_async              : YSpiPort_get_protocol_async,
        set_protocol                : YSpiPort_set_protocol,
        setProtocol                 : YSpiPort_set_protocol,
        get_spiMode                 : YSpiPort_get_spiMode,
        spiMode                     : YSpiPort_get_spiMode,
        get_spiMode_async           : YSpiPort_get_spiMode_async,
        spiMode_async               : YSpiPort_get_spiMode_async,
        set_spiMode                 : YSpiPort_set_spiMode,
        setSpiMode                  : YSpiPort_set_spiMode,
        get_ssPolarity              : YSpiPort_get_ssPolarity,
        ssPolarity                  : YSpiPort_get_ssPolarity,
        get_ssPolarity_async        : YSpiPort_get_ssPolarity_async,
        ssPolarity_async            : YSpiPort_get_ssPolarity_async,
        set_ssPolarity              : YSpiPort_set_ssPolarity,
        setSsPolarity               : YSpiPort_set_ssPolarity,
        get_shitftSampling          : YSpiPort_get_shitftSampling,
        shitftSampling              : YSpiPort_get_shitftSampling,
        get_shitftSampling_async    : YSpiPort_get_shitftSampling_async,
        shitftSampling_async        : YSpiPort_get_shitftSampling_async,
        set_shitftSampling          : YSpiPort_set_shitftSampling,
        setShitftSampling           : YSpiPort_set_shitftSampling,
        sendCommand                 : YSpiPort_sendCommand,
        reset                       : YSpiPort_reset,
        writeByte                   : YSpiPort_writeByte,
        writeStr                    : YSpiPort_writeStr,
        writeBin                    : YSpiPort_writeBin,
        writeArray                  : YSpiPort_writeArray,
        writeHex                    : YSpiPort_writeHex,
        writeLine                   : YSpiPort_writeLine,
        readByte                    : YSpiPort_readByte,
        readStr                     : YSpiPort_readStr,
        readBin                     : YSpiPort_readBin,
        readArray                   : YSpiPort_readArray,
        readHex                     : YSpiPort_readHex,
        readLine                    : YSpiPort_readLine,
        readMessages                : YSpiPort_readMessages,
        read_seek                   : YSpiPort_read_seek,
        read_tell                   : YSpiPort_read_tell,
        read_avail                  : YSpiPort_read_avail,
        queryLine                   : YSpiPort_queryLine,
        uploadJob                   : YSpiPort_uploadJob,
        selectJob                   : YSpiPort_selectJob,
        set_SS                      : YSpiPort_set_SS,
        setSS                       : YSpiPort_set_SS,
        nextSpiPort                 : YSpiPort_nextSpiPort,
        _parseAttr                  : YSpiPort_parseAttr
    });
    //--- (end of YSpiPort initialization)
})();

//--- (SpiPort functions)

/**
 * Retrieves a SPI port for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the SPI port is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSpiPort.isOnline() to test if the SPI port is
 * indeed online at a given time. In case of ambiguity when looking for
 * a SPI port by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the SPI port
 *
 * @return a YSpiPort object allowing you to drive the SPI port.
 */
function yFindSpiPort(func)
{
    return YSpiPort.FindSpiPort(func);
}

/**
 * Starts the enumeration of SPI ports currently accessible.
 * Use the method YSpiPort.nextSpiPort() to iterate on
 * next SPI ports.
 *
 * @return a pointer to a YSpiPort object, corresponding to
 *         the first SPI port currently online, or a null pointer
 *         if there are none.
 */
function yFirstSpiPort()
{
    return YSpiPort.FirstSpiPort();
}

//--- (end of SpiPort functions)
