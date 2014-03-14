/*********************************************************************
 *
 * $Id: yocto_datalogger.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements yFindDataLogger(), the high-level API for DataLogger functions
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

//--- (generated code: YDataLogger definitions)
var Y_RECORDING_OFF                 = 0;
var Y_RECORDING_ON                  = 1;
var Y_RECORDING_INVALID             = -1;
var Y_AUTOSTART_OFF                 = 0;
var Y_AUTOSTART_ON                  = 1;
var Y_AUTOSTART_INVALID             = -1;
var Y_CLEARHISTORY_FALSE            = 0;
var Y_CLEARHISTORY_TRUE             = 1;
var Y_CLEARHISTORY_INVALID          = -1;
var Y_CURRENTRUNINDEX_INVALID       = YAPI_INVALID_UINT;
var Y_TIMEUTC_INVALID               = YAPI_INVALID_LONG;
//--- (end of generated code: YDataLogger definitions)

var Y_DATA_INVALID                  = YAPI_INVALID_DOUBLE;
var Y_MINVALUE_INVALID              = YAPI_INVALID_DOUBLE;
var Y_AVERAGEVALUE_INVALID          = YAPI_INVALID_DOUBLE;
var Y_MAXVALUE_INVALID              = YAPI_INVALID_DOUBLE;

/**
 * YOldDataStream Class: Sequence of measured data, returned by the data logger
 * 
 * A data stream is a small collection of consecutive measures for a set
 * of sensors. A few properties are available directly from the object itself
 * (they are preloaded at instantiation time), while most other properties and
 * the actual data are loaded on demand when accessed for the first time.
 */
var YOldDataStream; // definition below
(function()
{
    // Internal function to preload all values into object
    //
    function YOldDataStream_loadStream()
    {
        var coldiv = null;
        var coltyp = null;
        var colscl = null;
        var colofs = null;
        var calhdl = null;
        var caltyp = null;
        var calpar = null;
        var calraw = null;
        var calref = null;
        var c, i;

        var loadval = this._dataLogger.getData(this._runNo, this._timeStamp);
        if(loadval == null) {
            return this._dataLogger.get_errorType();
        }
        if(loadval['time'] != null)     this._timeStamp = loadval['time'];
        if(loadval['UTC'] != null)      this._utcStamp  = loadval['UTC'];
        if(loadval['interval'] != null) this._interval  = loadval['interval'];
        if(loadval['nRows'] != null)    this._nRows     = loadval['nRows'];
        if(loadval['keys'] != null) {
            this._columnNames = loadval['keys'];
            if(this._nCols == 0) {
                this._nCols = this._columnNames.length;
            } else if(this._nCols != this._columnNames.length) {
                this._nCols = 0;
                return YAPI_IO_ERROR;
            }
        }
        if(loadval['div'] != null) {
            coldiv = loadval['div'];
            if(this._nCols == 0) {
                this._nCols = coldiv.length;
            } else if(this._nCols != coldiv.length) {
                this._nCols = 0;
                return YAPI_IO_ERROR;
            }
        }
        if(loadval['type'] != null) {
            coltyp = loadval['type'];
            if(this._nCols == 0) {
                this._nCols = coltyp.length;
            } else if(this._nCols != coltyp.length) {
                this._nCols = 0;
                return YAPI_IO_ERROR;
            }
        }
        if(loadval['scal'] != null) {
            colscl = loadval['scal'];
            colofs = [];
            if(this._nCols != colscl.length) {
                this._nCols = 0;
                return YAPI_IO_ERROR;
            }
            for(i = 0; i < colscl.length; i++) {
                colscl[i] /= 65536.0;
                colofs[i] = (coltyp[i] != 0 ? -32767 : 0);
            }
        } else {
            colscl = [];
            colofs = [];
            for(i = 0; i < coldiv.length; i++) {
                colscl[i] = 1.0 / coldiv[i];
                colofs[i] = (coltyp[i] != 0 ? -32767 : 0);
            }
        }
        if(loadval['cal'] != null) {
            calhdl = new Array(this._nCols);
            caltyp = new Array(this._nCols);
            calpar = new Array(this._nCols);
            calraw = new Array(this._nCols);
            calref = new Array(this._nCols);
            for(c = 0; c < this._nCols; c++) {
                var params = loadval['cal'][c];
                if(!params) continue;
                params = params.split(",");
                if(params.length < 11) continue;
                calhdl[c] = YAPI._getCalibrationHandler(params[0]);
                if(!calhdl[c]) continue;
                caltyp[c] = parseInt(params[0]);
                calpar[c] = new Array(params.length-1);
                calraw[c] = new Array(params.length>>1);
                calref[c] = new Array(params.length>>1);
                for(i = 1; i < params.length; i += 2) {
                    calpar[c][i-1] = parseInt(params[i]);
                    calpar[c][i]   = parseInt(params[i+1]);
                    if(caltyp[c] <= 10) {
                        calraw[c][i>>1] = (calpar[c][i-1] + colofs[c]) / coldiv[c];
                        calref[c][i>>1] = (calpar[c][i]   + colofs[c]) / coldiv[c];
                    } else {
                        calraw[c][i>>1] = YAPI._decimalToDouble(calpar[c][i-1]);
                        calref[c][i>>1] = YAPI._decimalToDouble(calpar[c][i]);
                    }
                }
            }
        }
        if(loadval['data'] != null) {
            if(this._nCols == 0 || coldiv == null || coltyp == null) {
                return YAPI_IO_ERROR;
            }
            this._values = [];
            var data = loadval['data'];
            if(typeof data == "string") {
                data = YAPI._decodeWords(data);
            }
            var dat = [];
            c = 0;
            for(var idx in data) {
                var val;
                if(coltyp[c] < 2) {
                    val = (data[idx] + colofs[c]) * colscl[c];
                } else {
                    val = YAPI._decimalToDouble(data[idx]-32767);
                }
                if(calhdl && calhdl[c]) {
                    // use post-calibration function
                    if(caltyp[c] <= 10) {
                        // linear calibration using unscaled value
                        val = calhdl[c]((data[idx] + colofs[c]) / coldiv[c], caltyp[c], calpar[c], calraw[c], calref[c]);
                    } else if(caltyp[c] > 20) {
                        // custom calibration using raw floating-point value stored by the datalogger
                        val = calhdl[c](val, caltyp[c], calpar[c], calraw[c], calref[c]);
                    }
                }
                dat.push(val);
                if(++c == this._nCols) {
                    this._values.push(dat);
                    dat = [];
                    c = 0;
                }
            }
        }
        return YAPI_SUCCESS;
    }

    /**
     * Returns the relative start time of the data stream, measured in seconds.
     * For recent firmwares, the value is relative to the present time,
     * which means the value is always negative.
     * If the device uses a firmware older than version 13000, value is
     * relative to the start of the time the device was powered on, and
     * is always positive.
     * If you need an absolute UTC timestamp, use get_startTimeUTC().
     * 
     * @return an unsigned number corresponding to the number of seconds
     *         between the start of the run and the beginning of this data
     *         stream.
     */
    function YOldDataStream_get_startTime()
    {
        return this._timeStamp;
    }

    /**
     * Returns the number of seconds elapsed between  two consecutive
     * rows of this data stream. By default, the data logger records one row
     * per second, but there might be alternative streams at lower resolution
     * created by summarizing the original stream for archiving purposes.
     * 
     * This method does not cause any access to the device, as the value
     * is preloaded in the object at instantiation time.
     * 
     * @return an unsigned number corresponding to a number of seconds.
     */
    function YOldDataStream_get_dataSamplesInterval()
    {
        if(this._interval == 0) this.loadStream();
        return this._interval;
    }

    // Data preloaded on object instantiation
    function _YOldDataStream(obj_parent, int_run, int_stamp, int_utc, int_itv)
    {
        // inherit from YDataStream
        YDataStream.call(this, obj_parent);
        
        this._dataLogger = obj_parent;
        this._runNo      = int_run;
        this._timeStamp  = int_stamp;
        this._utcStamp   = (int_utc == null ? -1 : int_utc);
        this._interval   = (int_itv == null ? 0 : int_itv);
        this._samplesPerHour = (this._interval == 0 ? 3600 : 3600 / this._interval);
        this._isClosed   = 1;
        this._minVal     = this.DATA_INVALID;
        this._avgVal     = this.DATA_INVALID;
        this._maxVal     = this.DATA_INVALID;
    }

    YOldDataStream = _YOldDataStream;
    // Methods
    YOldDataStream.prototype.loadStream              = YOldDataStream_loadStream;
    YOldDataStream.prototype.get_startTime           = YOldDataStream_get_startTime;
    YOldDataStream.prototype.startTime               = YOldDataStream_get_startTime;
    YOldDataStream.prototype.get_dataSamplesInterval = YOldDataStream_get_dataSamplesInterval;
    YOldDataStream.prototype.dataSamplesInterval     = YOldDataStream_get_dataSamplesInterval;
})();

//--- (generated code: YDataLogger class start)
/**
 * YDataLogger Class: DataLogger function interface
 * 
 * Yoctopuce sensors include a non-volatile memory capable of storing ongoing measured
 * data automatically, without requiring a permanent connection to a computer.
 * The DataLogger function controls the global parameters of the internal data
 * logger.
 */
//--- (end of generated code: YDataLogger class start)

var YDataLogger; // definition below
(function()
{
    // Internal function to retrieve datalogger memory
    //
    function YDataLogger_getData(runIdx, timeIdx)
    {
        var loadval;

        if(this.dataLoggerURL == undefined) {
            this.dataLoggerURL = '/logger.json';
        }

        // get the device serial number
        var devid = this.module().get_serialNumber();
        if(devid == Y_SERIALNUMBER_INVALID) {
            return null;
        }
        var httpreq = "GET "+this.dataLoggerURL;
        if(timeIdx) {
            httpreq += "?run="+runIdx+"&time="+timeIdx;
        }
        var yreq = YAPI.devRequest(devid, httpreq);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(yreq.errorMsg.indexOf('HTTP status 404') >= 0 && this.dataLoggerURL != '/dataLogger.json') {
                this.dataLoggerURL = '/dataLogger.json';
                return this.getData(runIdx, timeIdx);
            }
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }

        return JSON.parse(yreq.result, true);
    }

    /**
     * Builds a list of all data streams hold by the data logger (legacy method).
     * The caller must pass by reference an empty array to hold YDataStream
     * objects, and the function fills it with objects describing available
     * data sequences.
     * 
     * This is the old way to retrieve data from the DataLogger.
     * For new applications, you should rather use get_dataSets()
     * method, or call directly get_recordedData() on the
     * sensor object.
     * 
     * @param v : an array of YDataStream objects to be filled in
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_get_dataStreams(v)
    {
        var loadval = this.getData(null, null);
        if(loadval == null) {
            return this.get_errorType();
        }
        if(loadval.length == 0) {
            return YAPI_SUCCESS;
        }
        if(Array.isArray(loadval[0])) {
            // old datalogger format: [runIdx, timerel, utc, interval]
            for(var idx in loadval) {
                var arr = loadval[idx];
                if(arr.length < 4) {
                    _throw(YAPI_IO_ERROR, "Unexpected JSON reply format");
                    return YAPI_IO_ERROR;
                }
                v.push(new YOldDataStream(this,arr[0],arr[1],arr[2],arr[3]));
            }
        } else {
            // new datalogger format: {"id":"...","unit":"...","streams":["...",...]}
            var sets = this.parse_dataSets(JSON.stringify(loadval));
            for (var i = 0; i < sets.length; i++) { 
                var ds = sets[i].get_privateDataStreams();
                for (var si=0; si < ds.length; si++) { 
                    v.push(ds[si]);
                }
            }
        }
        return YAPI_SUCCESS;
    }


    //--- (generated code: YDataLogger implementation)

    function YDataLogger_parseAttr(name, val, _super)
    {
        switch(name) {
        case "currentRunIndex":
            this._currentRunIndex = parseInt(val);
            return 1;
        case "timeUTC":
            this._timeUTC = parseInt(val);
            return 1;
        case "recording":
            this._recording = parseInt(val);
            return 1;
        case "autoStart":
            this._autoStart = parseInt(val);
            return 1;
        case "clearHistory":
            this._clearHistory = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the current run number, corresponding to the number of times the module was
     * powered on with the dataLogger enabled at some point.
     * 
     * @return an integer corresponding to the current run number, corresponding to the number of times the module was
     *         powered on with the dataLogger enabled at some point
     * 
     * On failure, throws an exception or returns YDataLogger.CURRENTRUNINDEX_INVALID.
     */
    function YDataLogger_get_currentRunIndex()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CURRENTRUNINDEX_INVALID;
            }
        }
        return this._currentRunIndex;
    }

    /**
     * Gets the current run number, corresponding to the number of times the module was
     * powered on with the dataLogger enabled at some point.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:an integer corresponding to the current run number, corresponding to the number of
     *         times the module was
     *         powered on with the dataLogger enabled at some point
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_CURRENTRUNINDEX_INVALID.
     */
    function YDataLogger_get_currentRunIndex_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CURRENTRUNINDEX_INVALID);
            } else {
                callback(context, obj, obj._currentRunIndex);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the Unix timestamp for current UTC time, if known.
     * 
     * @return an integer corresponding to the Unix timestamp for current UTC time, if known
     * 
     * On failure, throws an exception or returns YDataLogger.TIMEUTC_INVALID.
     */
    function YDataLogger_get_timeUTC()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_TIMEUTC_INVALID;
            }
        }
        return this._timeUTC;
    }

    /**
     * Gets the Unix timestamp for current UTC time, if known.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:an integer corresponding to the Unix timestamp for current UTC time, if known
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_TIMEUTC_INVALID.
     */
    function YDataLogger_get_timeUTC_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_TIMEUTC_INVALID);
            } else {
                callback(context, obj, obj._timeUTC);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the current UTC time reference used for recorded data.
     * 
     * @param newval : an integer corresponding to the current UTC time reference used for recorded data
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_set_timeUTC(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('timeUTC',rest_val);
    }

    /**
     * Returns the current activation state of the data logger.
     * 
     * @return either YDataLogger.RECORDING_OFF or YDataLogger.RECORDING_ON, according to the current
     * activation state of the data logger
     * 
     * On failure, throws an exception or returns YDataLogger.RECORDING_INVALID.
     */
    function YDataLogger_get_recording()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_RECORDING_INVALID;
            }
        }
        return this._recording;
    }

    /**
     * Gets the current activation state of the data logger.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:either Y_RECORDING_OFF or Y_RECORDING_ON, according to the current activation state of
     *         the data logger
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_RECORDING_INVALID.
     */
    function YDataLogger_get_recording_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_RECORDING_INVALID);
            } else {
                callback(context, obj, obj._recording);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the activation state of the data logger to start/stop recording data.
     * 
     * @param newval : either YDataLogger.RECORDING_OFF or YDataLogger.RECORDING_ON, according to the
     * activation state of the data logger to start/stop recording data
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_set_recording(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('recording',rest_val);
    }

    /**
     * Returns the default activation state of the data logger on power up.
     * 
     * @return either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to the default
     * activation state of the data logger on power up
     * 
     * On failure, throws an exception or returns YDataLogger.AUTOSTART_INVALID.
     */
    function YDataLogger_get_autoStart()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_AUTOSTART_INVALID;
            }
        }
        return this._autoStart;
    }

    /**
     * Gets the default activation state of the data logger on power up.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:either Y_AUTOSTART_OFF or Y_AUTOSTART_ON, according to the default activation state of
     *         the data logger on power up
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_AUTOSTART_INVALID.
     */
    function YDataLogger_get_autoStart_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_AUTOSTART_INVALID);
            } else {
                callback(context, obj, obj._autoStart);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the default activation state of the data logger on power up.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to the
     * default activation state of the data logger on power up
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_set_autoStart(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('autoStart',rest_val);
    }

    function YDataLogger_get_clearHistory()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CLEARHISTORY_INVALID;
            }
        }
        return this._clearHistory;
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YDataLogger_get_clearHistory_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CLEARHISTORY_INVALID);
            } else {
                callback(context, obj, obj._clearHistory);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YDataLogger_set_clearHistory(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('clearHistory',rest_val);
    }

    /**
     * Retrieves a data logger for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the data logger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDataLogger.isOnline() to test if the data logger is
     * indeed online at a given time. In case of ambiguity when looking for
     * a data logger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the data logger
     * 
     * @return a YDataLogger object allowing you to drive the data logger.
     */
    function YDataLogger_FindDataLogger(func)                   // class method
    {
        var obj;                    // YDataLogger;
        obj = YFunction._FindFromCache("DataLogger", func);
        if (obj == null) {
            obj = new YDataLogger(func);
            YFunction._AddToCache("DataLogger", func, obj);
        }
        return obj;
    }

    /**
     * Clears the data logger memory and discards all recorded data streams.
     * This method also resets the current run index to zero.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_forgetAllDataStreams()
    {
        return this.set_clearHistory(Y_CLEARHISTORY_TRUE);
    }

    /**
     * Returns a list of YDataSet objects that can be used to retrieve
     * all measures stored by the data logger.
     * 
     * This function only works if the device uses a recent firmware,
     * as YDataSet objects are not supported by firmwares older than
     * version 13000.
     * 
     * @return a list of YDataSet object.
     * 
     * On failure, throws an exception or returns an empty list.
     */
    function YDataLogger_get_dataSets()
    {
        return this.parse_dataSets(this._download("logger.json"));
    }

    function YDataLogger_parse_dataSets(json)
    {
        var ii; // iterator
        var dslist = [];            // strArr;
        var res = [];               // YDataSetArr;
        // may throw an exception
        dslist = this._json_get_array(json);
        res.length = 0;
        for (ii in dslist) {
            res.push(new YDataSet(this, dslist[ii]));
        }
        return res;
    }

    /**
     * Continues the enumeration of data loggers started using yFirstDataLogger().
     * 
     * @return a pointer to a YDataLogger object, corresponding to
     *         a data logger currently online, or a null pointer
     *         if there are no more data loggers to enumerate.
     */
    function YDataLogger_nextDataLogger()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YDataLogger.FindDataLogger(next_hwid);
    }

    /**
     * Starts the enumeration of data loggers currently accessible.
     * Use the method YDataLogger.nextDataLogger() to iterate on
     * next data loggers.
     * 
     * @return a pointer to a YDataLogger object, corresponding to
     *         the first data logger currently online, or a null pointer
     *         if there are none.
     */
    function YDataLogger_FirstDataLogger()
    {
        var next_hwid = YAPI.getFirstHardwareId('DataLogger');
        if(next_hwid == null) return null;
        return YDataLogger.FindDataLogger(next_hwid);
    }

    //--- (end of generated code: YDataLogger implementation)

    function _YDataLogger(str_func)
    {
        //--- (generated code: YDataLogger constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'DataLogger';

        this._currentRunIndex                = Y_CURRENTRUNINDEX_INVALID;  // UInt31
        this._timeUTC                        = Y_TIMEUTC_INVALID;          // UTCTime
        this._recording                      = Y_RECORDING_INVALID;        // OnOff
        this._autoStart                      = Y_AUTOSTART_INVALID;        // OnOff
        this._clearHistory                   = Y_CLEARHISTORY_INVALID;     // Bool
        //--- (end of generated code: YDataLogger constructor)
        this.getData                         = YDataLogger_getData;
        this.get_dataStreams                 = YDataLogger_get_dataStreams;
        this.dataStreams                     = YDataLogger_get_dataStreams;
        
        this.DATA_INVALID                    = -Number.MAX_VALUE;    
    }

    //--- (generated code: YDataLogger initialization)
    YDataLogger = YFunction._Subclass(_YDataLogger, {
        // Constants
        CURRENTRUNINDEX_INVALID     : YAPI_INVALID_UINT,
        TIMEUTC_INVALID             : YAPI_INVALID_LONG,
        RECORDING_OFF               : 0,
        RECORDING_ON                : 1,
        RECORDING_INVALID           : -1,
        AUTOSTART_OFF               : 0,
        AUTOSTART_ON                : 1,
        AUTOSTART_INVALID           : -1,
        CLEARHISTORY_FALSE          : 0,
        CLEARHISTORY_TRUE           : 1,
        CLEARHISTORY_INVALID        : -1
    }, {
        // Class methods
        FindDataLogger              : YDataLogger_FindDataLogger,
        FirstDataLogger             : YDataLogger_FirstDataLogger
    }, {
        // Methods
        get_currentRunIndex         : YDataLogger_get_currentRunIndex,
        currentRunIndex             : YDataLogger_get_currentRunIndex,
        get_currentRunIndex_async   : YDataLogger_get_currentRunIndex_async,
        currentRunIndex_async       : YDataLogger_get_currentRunIndex_async,
        get_timeUTC                 : YDataLogger_get_timeUTC,
        timeUTC                     : YDataLogger_get_timeUTC,
        get_timeUTC_async           : YDataLogger_get_timeUTC_async,
        timeUTC_async               : YDataLogger_get_timeUTC_async,
        set_timeUTC                 : YDataLogger_set_timeUTC,
        setTimeUTC                  : YDataLogger_set_timeUTC,
        get_recording               : YDataLogger_get_recording,
        recording                   : YDataLogger_get_recording,
        get_recording_async         : YDataLogger_get_recording_async,
        recording_async             : YDataLogger_get_recording_async,
        set_recording               : YDataLogger_set_recording,
        setRecording                : YDataLogger_set_recording,
        get_autoStart               : YDataLogger_get_autoStart,
        autoStart                   : YDataLogger_get_autoStart,
        get_autoStart_async         : YDataLogger_get_autoStart_async,
        autoStart_async             : YDataLogger_get_autoStart_async,
        set_autoStart               : YDataLogger_set_autoStart,
        setAutoStart                : YDataLogger_set_autoStart,
        get_clearHistory            : YDataLogger_get_clearHistory,
        clearHistory                : YDataLogger_get_clearHistory,
        get_clearHistory_async      : YDataLogger_get_clearHistory_async,
        clearHistory_async          : YDataLogger_get_clearHistory_async,
        set_clearHistory            : YDataLogger_set_clearHistory,
        setClearHistory             : YDataLogger_set_clearHistory,
        forgetAllDataStreams        : YDataLogger_forgetAllDataStreams,
        get_dataSets                : YDataLogger_get_dataSets,
        dataSets                    : YDataLogger_get_dataSets,
        parse_dataSets              : YDataLogger_parse_dataSets,
        nextDataLogger              : YDataLogger_nextDataLogger,
        _parseAttr                  : YDataLogger_parseAttr
    });
    //--- (end of generated code: YDataLogger initialization)
})();

//--- (generated code: DataLogger functions)

/**
 * Retrieves a data logger for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the data logger is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDataLogger.isOnline() to test if the data logger is
 * indeed online at a given time. In case of ambiguity when looking for
 * a data logger by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the data logger
 * 
 * @return a YDataLogger object allowing you to drive the data logger.
 */
function yFindDataLogger(func)
{
    return YDataLogger.FindDataLogger(func);
}

/**
 * Starts the enumeration of data loggers currently accessible.
 * Use the method YDataLogger.nextDataLogger() to iterate on
 * next data loggers.
 * 
 * @return a pointer to a YDataLogger object, corresponding to
 *         the first data logger currently online, or a null pointer
 *         if there are none.
 */
function yFirstDataLogger()
{
    return YDataLogger.FirstDataLogger();
}

//--- (end of generated code: DataLogger functions)
