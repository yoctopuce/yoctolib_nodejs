/*********************************************************************
 *
 * $Id: yocto_datalogger.js 13065 2013-10-10 16:04:55Z mvuilleu $
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
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_OLDESTRUNINDEX_INVALID        = -1;
var Y_CURRENTRUNINDEX_INVALID       = -1;
var Y_SAMPLINGINTERVAL_INVALID      = -1;
var Y_TIMEUTC_INVALID               = -1;
//--- (end of generated code: YDataLogger definitions)

var Y_DATA_INVALID                  = -Number.MAX_VALUE;
var Y_MINVALUE_INVALID              = -Number.MAX_VALUE;
var Y_AVERAGEVALUE_INVALID          = -Number.MAX_VALUE;
var Y_MAXVALUE_INVALID              = -Number.MAX_VALUE;

/**
 * YDataStream Class: Sequence of measured data, returned by the data logger
 * 
 * A data stream is a small collection of consecutive measures for a set
 * of sensors. A few properties are available directly from the object itself
 * (they are preloaded at instantiation time), while most other properties and
 * the actual data are loaded on demand when accessed for the first time.
 */
var YDataStream; // definition below
(function()
{
    // Internal function to preload all values into object
    //
    function YDataStream_loadStream()
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
            for(var i = 0; i < colscl.length; i++) {
                colscl[i] /= 65536.0;
                colofs[i] = (coltyp[i] != 0 ? -32767 : 0);
            }
        } else {
            colscl = [];
            colofs = [];
            for(var i = 0; i < coldiv.length; i++) {
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
            for(var c = 0; c < this._nCols; c++) {
                var params = loadval['cal'][c];
                if(!params) continue;
                params = params.split(",");
                if(params.length < 11) continue;
                calhdl[c] = YAPI.getCalibrationHandler(params[0]);
                if(!calhdl[c]) continue;
                caltyp[c] = parseInt(params[0]);
                calpar[c] = new Array(params.length-1);
                calraw[c] = new Array(params.length>>1);
                calref[c] = new Array(params.length>>1);
                for(var i = 1; i < params.length; i += 2) {
                    calpar[c][i-1] = parseInt(params[i]);
                    calpar[c][i]   = parseInt(params[i+1]);
                    if(caltyp[c] <= 10) {
                        calraw[c][i>>1] = (calpar[c][i-1] + colofs[c]) / coldiv[c];
                        calref[c][i>>1] = (calpar[c][i]   + colofs[c]) / coldiv[c];
                    } else {
                        calraw[c][i>>1] = YAPI.decimalToDouble(calpar[c][i-1]);
                        calref[c][i>>1] = YAPI.decimalToDouble(calpar[c][i]);
                    }
                }
            }
        }
        if(loadval['data'] != null) {
            if(this._nCols == 0 || coldiv == null || coltyp == null) {
                return YAPI_IO_ERROR;
            }
            this._values = [];
            data = loadval['data'];
            if(typeof data == "string") {
                var udata = [];
                for(var i = 0; i < data.length;) {
                    if(data[i] >= 'a') {
                        var srcpos = udata.length-1-(data.charCodeAt(i++)-97);
                        if(srcpos < 0) return YAPI_IO_ERROR;
                        udata.push(udata[srcpos]);
                    } else {
                        if(i+2 > data.length) return YAPI_IO_ERROR;
                        var val = (data.charCodeAt(i++) - 48);
                        val += (data.charCodeAt(i++) - 48) << 5;
                        if(data[i] == 'z') data[i] = '\\';
                        val += (data.charCodeAt(i++) - 48) << 10;
                        udata.push(val);
                    }
                }
                data = udata;
            }
            var dat = [];
            var c = 0;
            for(idx in data) {
                var val;
                if(coltyp[c] < 2) {
                    val = (data[idx] + colofs[c]) * colscl[c];
                } else {
                    val = YAPI.decimalToDouble(data[idx]-32767);
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
     * Returns the run index of the data stream. A run can be made of
     * multiple datastreams, for different time intervals.
     * 
     * This method does not cause any access to the device, as the value
     * is preloaded in the object at instantiation time.
     * 
     * @return an unsigned number corresponding to the run index.
     */
    function YDataStream_get_runIndex()
    {
        return this._runNo;
    }
    
    /**
     * Returns the start time of the data stream, relative to the beginning
     * of the run. If you need an absolute time, use get_startTimeUTC().
     * 
     * This method does not cause any access to the device, as the value
     * is preloaded in the object at instantiation time.
     * 
     * @return an unsigned number corresponding to the number of seconds
     *         between the start of the run and the beginning of this data
     *         stream.
     */
    function YDataStream_get_startTime()
    {
        return this._timeStamp;
    }

    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     * 
     * This method does not cause any access to the device, as the value
     * is preloaded in the object at instantiation time.
     * 
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    function YDataStream_get_startTimeUTC()
    {
        if(this._utcStamp == -1) this.loadStream();
        return this._utcStamp;
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
    function YDataStream_get_dataSamplesInterval()
    {
        if(this._interval == 0) this.loadStream();
        return this._interval;
    }

    /**
     * Returns the number of data rows present in this stream.
     * 
     * This method fetches the whole data stream from the device,
     * if not yet done.
     * 
     * @return an unsigned number corresponding to the number of rows.
     * 
     * On failure, throws an exception or returns zero.
     */
    function YDataStream_get_rowCount()
    {
        if(this._nRows == 0) this.loadStream();
        return this._nRows;
    }
    
    /**
     * Returns the number of data columns present in this stream.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     * 
     * This method fetches the whole data stream from the device,
     * if not yet done.
     * 
     * @return an unsigned number corresponding to the number of rows.
     * 
     * On failure, throws an exception or returns zero.
     */
    function YDataStream_get_columnCount()
    {
        if(this._nCols == 0) this.loadStream();
        return this._nCols;
    }

    /**
     * Returns the title (or meaning) of each data column present in this stream.
     * In most case, the title of the data column is the hardware identifier
     * of the sensor that produced the data. For archived streams created by
     * summarizing a high-resolution data stream, there can be a suffix appended
     * to the sensor identifier, such as _min for the minimum value, _avg for the
     * average value and _max for the maximal value.
     * 
     * This method fetches the whole data stream from the device,
     * if not yet done.
     * 
     * @return a list containing as many strings as there are columns in the
     *         data stream.
     * 
     * On failure, throws an exception or returns an empty array.
     */
    function YDataStream_get_columnNames()
    {
        if(this._columnNames.length == 0) this.loadStream();
        return this._columnNames;
    }

    /**
     * Returns the whole data set contained in the stream, as a bidimensional
     * table of numbers.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     * 
     * This method fetches the whole data stream from the device,
     * if not yet done.
     * 
     * @return a list containing as many elements as there are rows in the
     *         data stream. Each row itself is a list of floating-point
     *         numbers.
     * 
     * On failure, throws an exception or returns an empty array.
     */
    function YDataStream_get_dataRows()
    {
        if(this._values.length == 0) this.loadStream();
        return this._values;
    }
    
    /**
     * Returns a single measure from the data stream, specified by its
     * row and column index.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     * 
     * This method fetches the whole data stream from the device,
     * if not yet done.
     * 
     * @param row : row index
     * @param col : column index
     * 
     * @return a floating-point number
     * 
     * On failure, throws an exception or returns Y_DATA_INVALID.
     */
    function YDataStream_get_data(row, col)
    {
        if(this._values.length == 0) this.loadStream();
        if(row >= this._values.length) return Y_DATA_INVALID;
        if(col >= this._values[row].length) return Y_DATA_INVALID;
        return this._values[row][col];
    }

    // Data preloaded on object instantiation
    function _YDataStream(obj_parent, int_run, int_stamp, int_utc, int_itv)
    {
        this.DATA_INVALID = -Number.MAX_VALUE;

        this._dataLogger = obj_parent;
        this._runNo      = int_run;
        this._timeStamp  = int_stamp;
        this._utcStamp   = (int_utc == null ? -1 : int_utc);
        this._interval   = (int_itv == null ? 0 : int_itv);
        this._nRows      = 0;
        this._nCols      = 0;
        this._columnNames = [];
        this._values      = [];

        this.loadStream              = YDataStream_loadStream;
        this.get_runIndex            = YDataStream_get_runIndex;
        this.runIndex                = YDataStream_get_runIndex;
        this.get_startTime           = YDataStream_get_startTime;
        this.startTime               = YDataStream_get_startTime;
        this.get_startTimeUTC        = YDataStream_get_startTimeUTC;
        this.startTimeUTC            = YDataStream_get_startTimeUTC;
        this.get_dataSamplesInterval = YDataStream_get_dataSamplesInterval;
        this.dataSamplesInterval     = YDataStream_get_dataSamplesInterval;
        this.get_rowCount            = YDataStream_get_rowCount;
        this.rowCount                = YDataStream_get_rowCount;
        this.get_columnCount         = YDataStream_get_columnCount;
        this.columnCount             = YDataStream_get_columnCount;
        this.get_columnNames         = YDataStream_get_columnNames;
        this.columnNames             = YDataStream_get_columnNames;
        this.get_dataRows            = YDataStream_get_dataRows;
        this.dataRows                = YDataStream_get_dataRows;
        this.get_data                = YDataStream_get_data;
        this.data                    = YDataStream_get_data;
    }

    YDataStream = _YDataStream;
})();

/**
 * YDataRun Class: Sequence of measured data, stored by the data logger
 * 
 * A run is a continuous interval of time during which a module was powered on.
 * A data run provides easy access to all data collected during a given run,
 * providing on-the-fly resampling at the desired reporting rate.
 */
var YDataRun; // definition below
(function()
{
    // Internal function to preload all values into object
    //
    // Internal: Append a stream to the run
    //
    function YDataRun_addStream(obj_stream)
    {
        this._streams.push(obj_stream);
        if(this._startTimeUTC == 0) {
            if(obj_stream.get_startTimeUTC() > 0) {
                this._startTimeUTC = obj_stream.get_startTimeUTC() - obj_stream.get_startTime();
            }
        }
    }

    // Internal: Compute the total duration of the run, once all streams have been added
    //
    function YDataRun_finalize()
    {
        var last = this._streams[this._streams.length-1];
        this._duration = last.get_startTime() + last.get_rowCount() * last.get_dataSamplesInterval();
        this._isLive = (this._dataLogger.get_currentRunIndex() == this._runNo &&
                        this._dataLogger.get_recording() == Y_RECORDING_ON);
        if(this._isLive && this._startTimeUTC == 0) {
           this._startTimeUTC = yGetTickCount() - this._duration;
        }
        this._measureNames = this._dataLogger.get_measureNames();
        if(this._streams.length > 0) {
            this.set_valueInterval(this._streams[0].get_dataSamplesInterval());
        } else {
            this.set_valueInterval(60);
        }
    }

    // Internal: Update the run with any new data that may have appeared since the run was initially loaded
    //
    function YDataRun_refresh()
    {
        if(this._isLive) {
            var last = this._streams[this._streams.length-1];
            last.loadStream();
            this._duration = last.get_startTime() + last.get_rowCount() * last.get_dataSamplesInterval();
            if(yGetTickCount() > this._startTimeUTC + this._duration) {
                // check if new streams have appeared in between
                var newStreams = false;
                var streams = [];
                this._dataLogger.get_dataStreams(streams);
                var i;
                for(i = 0; i < streams.length; i++) {
                    if(streams[i].get_runIndex() == this._runNo && streams[i].get_startTime() > last.get_startTime()) {
                        this.addStream(streams[i]);
                        newStreams = true;
                    }
                }
                if(newStreams) this.finalize();
            }
            this._isLive = (this._dataLogger.get_recording() == Y_RECORDING_ON);
        }
    }

    // Internal: Mark a measure as unavailable
    //
    function YDataRun_invalidValue(int_pos)
    {
        for(k = 0; k < this._measureNames.length; k++) {
            var key = this._measureNames[k];
            this._minValues[key][int_pos] = Y_MINVALUE_INVALID;
            this._avgValues[key][int_pos] = Y_AVERAGEVALUE_INVALID;
            this._maxValues[key][int_pos] = Y_MAXVALUE_INVALID;
        }
    }

    // Internal: Compute the resampled measure values for a required position in run
    //
    function YDataRun_computeValues(int_pos)
    {
        // if there is no data stream, exit immediately
        if(this._streams.length == 0) {
            this.invalidValue(int_pos);
            return;
        }

        // search for the earliest stream with useful data for requested measure
        var nextAvail, startTime, row, k, i;
        var time = int_pos * this._browseInterval;
        var endtime = time + this._browseInterval;
        var prevMissing = int_pos + 1;
        var si = this._streams.length-1;
        var stream = this._streams[si];
        while(stream.get_startTime() > time && si > 0) {
            si--;
            stream = this._streams[si];
        }
        var streamInterval = stream.get_dataSamplesInterval();
        var thisAvail = Math.floor(stream.get_startTime() / this._browseInterval);
        var nextMissing = Math.ceil((stream.get_startTime() + stream.get_rowCount() * streamInterval) / this._browseInterval);
        if(nextMissing * this._browseInterval <= time && si < this._streams.length-1) {
            // we went back one step to much
            prevMissing = nextMissing;
            si++;
            stream = this._streams[si];
            streamInterval = stream.get_dataSamplesInterval();
            thisAvail = Math.floor(stream.get_startTime() / this._browseInterval);
            nextMissing = Math.ceil((stream.get_startTime() + stream.get_rowCount() * streamInterval) / this._browseInterval);
        } else {
            // nothing interesting before this stream
            if (stream.get_startTime() > time)
                prevMissing=0;
            else
                prevMissing = thisAvail-1;
        }
        if(si+1 >= this._streams.length) {
            nextAvail = int_pos+1;
        } else {
            var nextStream = this._streams[si+1];
            nextAvail = Math.floor(nextStream.get_startTime() / this._browseInterval);
        }
        // Check if we are looking for a missing measure
        if(int_pos >= prevMissing && int_pos < thisAvail) {
            for(int_pos = prevMissing; int_pos < thisAvail; int_pos++) this.invalidValue(int_pos);
            return;
        }
        if(int_pos >= nextMissing && int_pos < nextAvail) {
            for(int_pos = nextMissing; int_pos < nextAvail; int_pos++) this.invalidValue(int_pos);
            return;
        }
        // process all useful rows from the stream containing requested position, until completely processed
        if(prevMissing < thisAvail) {
            // stream is not a continuation, start with very beginning of stream
            row = 0;
            int_pos = thisAvail;
            startTime = stream.get_startTime();
        } else {
            // stream is a continuation, start at next interval boundary
            int_pos = Math.ceil(stream.get_startTime() / this._browseInterval);
            row = Math.round((int_pos * this._browseInterval - stream.get_startTime()) / streamInterval);
            startTime = stream.get_startTime() + row * streamInterval;
        }
        var stopAsap = false;
        var minCol = {};
        var avgCol = null;
        var maxCol = {};
        var minVal = {};
        var avgVal = {};
        var maxVal = {};
        var divisor = 0;
        var boundary = (int_pos+1) * this._browseInterval;
        var stopTime = Math.ceil((stream.get_startTime() + stream.get_rowCount() * stream.get_dataSamplesInterval()) / this._browseInterval) * this._browseInterval;
        while(startTime < stopTime) {
            var nextTime = startTime + streamInterval;
            if(avgCol == null) {
                var idx;
                var streamCols = stream.get_columnNames();
                avgCol = {};
                for(idx = 0; idx < streamCols.length; idx++) {
                    var colname = streamCols[idx];
                    if(colname.substr(colname.length-4, 1) == '_') {
                        var name = colname.slice(0, -4);
                        var suffix = name.slice(-3);
                        if(suffix == 'min') minCol[name] = idx;
                        else if(suffix == 'avg') avgCol[name] = idx;
                        else if(suffix == 'max') maxCol[name] = idx;
                    } else {
                        minCol[colname] = idx;
                        avgCol[colname] = idx;
                        maxCol[colname] = idx;
                    }
                }
            }
            if(divisor == 0) {
                if(boundary <= nextTime) {
                    while(boundary <= nextTime) {
                        for(k = 0; k < this._measureNames.length; k++) {
                            var key = this._measureNames[k];
                            this._minValues[key][int_pos] = stream.get_data(row, minCol[key]);
                            this._avgValues[key][int_pos] = stream.get_data(row, avgCol[key]);
                            this._maxValues[key][int_pos] = stream.get_data(row, maxCol[key]);
                        }
                        int_pos++;
                        boundary = (int_pos+1) * this._browseInterval;
                    }
                } else {
                    divisor = streamInterval;
                    for(k = 0; k < this._measureNames.length; k++) {
                        var key = this._measureNames[k];
                        minVal[key] = stream.get_data(row, minCol[key]);
                        avgVal[key] = stream.get_data(row, avgCol[key]) * streamInterval;
                        maxVal[key] = stream.get_data(row, maxCol[key]);
                    }
                }
            } else {
                divisor += streamInterval;
                for(k = 0; k < this._measureNames.length; k++) {
                    var key = this._measureNames[k];
                    minVal[key] = Math.min(minVal[key], stream.get_data(row, minCol[key]));
                    avgVal[key] += streamInterval * stream.get_data(row, avgCol[key]);
                    maxVal[key] = Math.max(maxVal[key], stream.get_data(row, maxCol[key]));
                }
                if(2*Math.abs(nextTime - boundary) <= streamInterval) {
                    for(k = 0; k < this._measureNames.length; k++) {
                        var key = this._measureNames[k];
                        this._minValues[key][int_pos] = minVal[key];
                        this._avgValues[key][int_pos] = avgVal[key] / divisor;
                        this._maxValues[key][int_pos] = maxVal[key];
                    }
                    divisor = 0;
                    int_pos++;
                    boundary = (int_pos+1) * this._browseInterval;
                    if(stopAsap) break;
                }
            }
            row++;
            if(row < stream.get_rowCount()) {
                startTime = nextTime;                
            } else {
                si++;
                if(si >= this._streams.length) break;
                stream = this._streams[si];
                startTime = stream.get_startTime();
                streamInterval = stream.get_dataSamplesInterval();
                row = 0;
                avgCol = null;
                stopAsap = true;
            }
        }
        if(divisor > 0) {
            // save partially computed value anyway
            for(k = 0; k < this._measureNames.length; k++) {
                var key = this._measureNames[k];
                this._minValues[key][int_pos] = minVal[key];
                this._avgValues[key][int_pos] = avgVal[key] / divisor;
                this._maxValues[key][int_pos] = maxVal[key];
            }
        }
    }

    /**
     * Returns the names of the measures recorded by the data logger.
     * In most case, the measure names match the hardware identifier
     * of the sensor that produced the data.
     * 
     * @return a list of strings (the measure names)
     * 
     * On failure, throws an exception or returns an empty array.
     */
    function YDataRun_get_measureNames()
    {
        return this._measureNames;
    }

    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     * 
     * This method does not cause any access to the device, as the value
     * is preloaded in the object at instantiation time.
     * 
     * @return an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    function YDataRun_get_startTimeUTC()
    {
        return this._startTimeUTC;
    }

    /**
     * Returns the duration (in seconds) of the data run.
     * When the datalogger is actively recording and the specified run is the current
     * run, calling this method reloads last sequence(s) from device to make sure
     * it includes the latest recorded data.
     * 
     * @return an unsigned number corresponding to the number of seconds
     *         between the beginning of the run (when the module was powered up)
     *         and the last recorded measure.
     */
    function YDataRun_get_duration()
    {
        if(this._isLive) this.refresh();
        return this._duration;
    }

    /**
     * Returns the number of seconds covered by each value in this run.
     * By default, the value interval is set to the coarsest data rate
     * archived in the data logger flash for this run. The value interval
     * can however be configured at will to a different rate when desired.
     * 
     * @return an unsigned number corresponding to a number of seconds covered
     *         by each data sample in the Run.
     */
    function YDataRun_get_valueInterval()
    {
        return this._browseInterval;
    }

    /**
     * Changes the number of seconds covered by each value in this run.
     * By default, the value interval is set to the coarsest data rate
     * archived in the data logger flash for this run. The value interval
     * can however be configured at will to a different rate when desired.
     * 
     * @param valueInterval : an integer number of seconds.
     * 
     * @return nothing
     */
    function YDataRun_set_valueInterval(int_valueInterval)
    {
        var last = this._streams[this._streams.length-1];
        var names = last.get_columnNames();
        this._minValues = {};
        this._avgValues = {};
        this._maxValues = {};
        var i;
        for(i = 0; i < names.length; i++) {
            var name = names[i];
            if(name.substr(name.length-4, 1) == '_') {
                name = name.slice(0, -4);
            }
            if(this._minValues[name] == undefined) {
                this._minValues[name] = [];
                this._avgValues[name] = [];
                this._maxValues[name] = [];
            }
        }
        this._browseInterval = int_valueInterval;
    }

    /**
     * Returns the number of values accessible in this run, given the selected data
     * samples interval.
     * When the datalogger is actively recording and the specified run is the current
     * run, calling this method reloads last sequence(s) from device to make sure
     * it includes the latest recorded data.
     * 
     * @return an unsigned number corresponding to the run duration divided by the
     *         samples interval.
     */
    function YDataRun_get_valueCount()
    {
        if(this._isLive) this.refresh();
        return Math.ceil(this._duration / this._browseInterval);
    }
    
    /**
     * Returns the minimal value of the measure observed at the specified time
     * period.
     * 
     * @param measureName : the name of the desired measure (one of the names
     *         returned by get_measureNames)
     * @param pos : the position index, between 0 and the value returned by
     *         get_valueCount
     * 
     * @return a floating point number (the minimal value)
     * 
     * On failure, throws an exception or returns Y_MINVALUE_INVALID.
     */
    function YDataRun_get_minValue(str_measureName, int_pos)
    {
        if(this._minValues[str_measureName][int_pos] == undefined) this.computeValues(int_pos);
        return this._minValues[str_measureName][int_pos];
    }

    /**
     * Returns the average value of the measure observed at the specified time
     * period.
     * 
     * @param measureName : the name of the desired measure (one of the names
     *         returned by get_measureNames)
     * @param pos : the position index, between 0 and the value returned by
     *         get_valueCount
     * 
     * @return a floating point number (the average value)
     * 
     * On failure, throws an exception or returns Y_AVERAGEVALUE_INVALID.
     */
    function YDataRun_get_averageValue(str_measureName, int_pos)
    {
        if(this._avgValues[str_measureName][int_pos] == undefined) this.computeValues(int_pos);
        return this._avgValues[str_measureName][int_pos];
    }

    /**
     * Returns the maximal value of the measure observed at the specified time
     * period.
     * 
     * @param measureName : the name of the desired measure (one of the names
     *         returned by get_measureNames)
     * @param pos : the position index, between 0 and the value returned by
     *         get_valueCount
     * 
     * @return a floating point number (the maximal value)
     * 
     * On failure, throws an exception or returns Y_MAXVALUE_INVALID.
     */
    function YDataRun_get_maxValue(str_measureName, int_pos)
    {
        if(this._maxValues[str_measureName][int_pos] == undefined) this.computeValues(int_pos);
        return this._maxValues[str_measureName][int_pos];
    }

    // Data preloaded on object instantiation
    function _YDataRun(obj_parent, int_run)
    {
        this.MINVALUE_INVALID     = -Number.MAX_VALUE;
        this.AVERAGEVALUE_INVALID = -Number.MAX_VALUE;
        this.MAXVALUE_INVALID     = -Number.MAX_VALUE;

        this._dataLogger     = obj_parent;
        this._runNo          = int_run;
        this._streams        = [];
        this._measureNames   = [];
        this._browseInterval = 60;
        this._startTimeUTC   = 0;
        this._duration       = 0;
        this._isLive         = false;
        this._minValues      = {};
        this._avgValues      = {};
        this._maxValues      = {};

        this.addStream               = YDataRun_addStream;
        this.finalize                = YDataRun_finalize;
        this.refresh                 = YDataRun_refresh;
        this.invalidValue            = YDataRun_invalidValue;
        this.computeValues           = YDataRun_computeValues;

        this.get_measureNames        = YDataRun_get_measureNames;
        this.measureNames            = YDataRun_get_measureNames;
        this.get_startTimeUTC        = YDataRun_get_startTimeUTC;
        this.startTimeUTC            = YDataRun_get_startTimeUTC;
        this.get_duration            = YDataRun_get_duration;
        this.duration                = YDataRun_get_duration;
        this.get_valueInterval       = YDataRun_get_valueInterval;
        this.valueInterval           = YDataRun_get_valueInterval;
        this.set_valueInterval       = YDataRun_set_valueInterval;
        this.setValueInterval        = YDataRun_set_valueInterval;
        this.get_valueCount          = YDataRun_get_valueCount;
        this.valueCount              = YDataRun_get_valueCount;        
        this.get_minValue            = YDataRun_get_minValue;
        this.minValue                = YDataRun_get_minValue;
        this.get_averageValue        = YDataRun_get_averageValue;
        this.averageValue            = YDataRun_get_averageValue;
        this.get_maxValue            = YDataRun_get_maxValue;
        this.maxValue                = YDataRun_get_maxValue;
    }

    YDataRun = _YDataRun;
})();

/**
 * YDataLogger Class: DataLogger function interface
 * 
 * Yoctopuce sensors include a non-volatile memory capable of storing ongoing measured
 * data automatically, without requiring a permanent connection to a computer.
 * The Yoctopuce application programming interface includes fonctions to control
 * the functioning of this internal data logger.
 * Since the sensors do not include a battery, they don't have an absolute time
 * reference. Therefore, measures are simply indexed by the absolute run number
 * and time relative to the start of the run. Every new power up starts a new run.
 * It is however possible to setup an absolute UTC time by software at a given time,
 * so that the data logger keeps track of it until next time it is powered off.
 */
var yFindDataLogger; // definition below
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
        devid = this.module().get_serialNumber();
        if(devid == Y_SERIALNUMBER_INVALID) {
            return null;
        }
        httpreq = "GET "+this.dataLoggerURL;
        if(timeIdx) {
            httpreq += "?run="+runIdx+"&time="+timeIdx;
        }
        yreq = yAPI.devRequest(devid, httpreq);
        if(yreq.errorType != YAPI_SUCCESS) {
            if(yreq.errorMsg.indexOf('HTTP status 404') >= 0 && this.dataLoggerURL != '/dataLogger.json') {
                this.dataLoggerURL = '/dataLogger.json';
                return this.getData(runIdx, timeIdx);
            }
            return this._throw(yreq.errorType, yreq.errorMsg, null);
        }

        return JSON.parse(yreq.result, true);
    }

    // Internal function to preload the list of all runs, for high-level functions
    //
    function YDataLogger_loadRuns()
    {
        this._measureNames = [];
        this._dataRuns = [];
        this._liveRun = this.get_currentRunIndex();

        // preload stream list
        var streams = [];
        var res = this.get_dataStreams(streams);
        if(res != YAPI_SUCCESS) return res;

        // sort streams into runs
        var i;
        for(i = 0; i < streams.length; i++) {
            var runIdx = streams[i].get_runIndex();
            if(this._dataRuns[runIdx] == undefined) {
                this._dataRuns[runIdx] = new YDataRun(this, runIdx);
            }
            this._dataRuns[runIdx].addStream(streams[i]);
        }

        // finalize computation of data in each run
        var names = streams[streams.length-1].get_columnNames();
        this._measureNames = [];
        for(i = 0; i < names.length; i++) {
            if(names[i].slice(-4,-3) != '_') {
                this._measureNames.push(names[i]);
            } else if(names[i].slice(-4) == '_min') {
                this._measureNames.push(names[i].slice(0,-4));
            }
        }
        for(i = 0; i < this._dataRuns.length; i++) {
            this._dataRuns[i].finalize();
        }
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
     * Returns the names of the measures recorded by the data logger.
     * In most case, the measure names match the hardware identifier
     * of the sensor that produced the data.
     * 
     * @return a list of strings (the measure names)
     * 
     * On failure, throws an exception or returns an empty array.
     */
    function YDataLogger_get_measureNames()
    {
        return this._measureNames;
    }

    /**
     * Returns a data run object holding all measured data for a given
     * period during which the module was turned on (a run). This object can then
     * be used to retrieve measures (min, average and max) at a desired data rate.
     * 
     * @param runIdx : the index of the desired run
     * 
     * @return an YDataRun object
     * 
     * On failure, throws an exception or returns null.
     */
    function YDataLogger_get_dataRun(int_runIdx)
    {
        if(this._dataRuns == undefined || int_runIdx > this._liveRun) this.loadRuns();        
        if(this._dataRuns[int_runIdx] == undefined) return null;
        return this._dataRuns[int_runIdx];
    }

    /**
     * Builds a list of all data streams hold by the data logger.
     * The caller must pass by reference an empty array to hold YDataStream
     * objects, and the function fills it with objects describing available
     * data sequences.
     * 
     * @param v : an array of YDataStream objects to be filled in
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_get_dataStreams(arr_v)
    {
        var loadval = this.getData(null, null);
        if(loadval == null) {
            return this.get_errorType();
        }
        for(idx in loadval) {
            var arr = loadval[idx];
            if(arr.length < 4) {
                _throw(YAPI_IO_ERROR, "Unexpected JSON reply format");
                return YAPI_IO_ERROR;
            }
            arr_v.push(new YDataStream(this,arr[0],arr[1],arr[2],arr[3]));
        }    
        return YAPI_SUCCESS;
    }


    //--- (generated code: YDataLogger implementation)

    /**
     * Returns the logical name of the data logger.
     * 
     * @return a string corresponding to the logical name of the data logger
     * 
     * On failure, throws an exception or returns YDataLogger.LOGICALNAME_INVALID.
     */
    function YDataLogger_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Gets the logical name of the data logger.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:a string corresponding to the logical name of the data logg
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YDataLogger_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the data logger. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the data logger
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDataLogger_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the data logger (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the data logger (no more than 6 characters)
     * 
     * On failure, throws an exception or returns YDataLogger.ADVERTISEDVALUE_INVALID.
     */
    function YDataLogger_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Gets the current value of the data logger (no more than 6 characters).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:a string corresponding to the current value of the data logger (no more than 6 character
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YDataLogger_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the index of the oldest run for which the non-volatile memory still holds recorded data.
     * 
     * @return an integer corresponding to the index of the oldest run for which the non-volatile memory
     * still holds recorded data
     * 
     * On failure, throws an exception or returns YDataLogger.OLDESTRUNINDEX_INVALID.
     */
    function YDataLogger_get_oldestRunIndex()
    {   var json_val = this._getAttr('oldestRunIndex');
        return (json_val == null ? Y_OLDESTRUNINDEX_INVALID : parseInt(json_val));
    }

    /**
     * Gets the index of the oldest run for which the non-volatile memory still holds recorded data.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:an integer corresponding to the index of the oldest run for which the non-volatile
     *         memory still holds recorded da
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_OLDESTRUNINDEX_INVALID.
     */
    function YDataLogger_get_oldestRunIndex_async(func_callback, obj_context)
    {   this._getAttr_async('oldestRunIndex',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_OLDESTRUNINDEX_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
    {   var json_val = this._getAttr('currentRunIndex');
        return (json_val == null ? Y_CURRENTRUNINDEX_INVALID : parseInt(json_val));
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
     *         powered on with the dataLogger enabled at some poi
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_CURRENTRUNINDEX_INVALID.
     */
    function YDataLogger_get_currentRunIndex_async(func_callback, obj_context)
    {   this._getAttr_async('currentRunIndex',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CURRENTRUNINDEX_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YDataLogger_get_samplingInterval()
    {   var json_val = this._getAttr('samplingInterval');
        return (json_val == null ? Y_SAMPLINGINTERVAL_INVALID : parseInt(json_val));
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
    function YDataLogger_get_samplingInterval_async(func_callback, obj_context)
    {   this._getAttr_async('samplingInterval',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_SAMPLINGINTERVAL_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the Unix timestamp for current UTC time, if known.
     * 
     * @return an integer corresponding to the Unix timestamp for current UTC time, if known
     * 
     * On failure, throws an exception or returns YDataLogger.TIMEUTC_INVALID.
     */
    function YDataLogger_get_timeUTC()
    {   var json_val = this._getAttr('timeUTC');
        return (json_val == null ? Y_TIMEUTC_INVALID : parseInt(json_val));
    }

    /**
     * Gets the Unix timestamp for current UTC time, if known.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:an integer corresponding to the Unix timestamp for current UTC time, if kno
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_TIMEUTC_INVALID.
     */
    function YDataLogger_get_timeUTC_async(func_callback, obj_context)
    {   this._getAttr_async('timeUTC',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_TIMEUTC_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
    {   var json_val = this._getAttr('recording');
        return (json_val == null ? Y_RECORDING_INVALID : parseInt(json_val));
    }

    /**
     * Gets the current activation state of the data logger.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:either Y_RECORDING_OFF or Y_RECORDING_ON, according to the current activation state of
     *         the data logg
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_RECORDING_INVALID.
     */
    function YDataLogger_get_recording_async(func_callback, obj_context)
    {   this._getAttr_async('recording',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_RECORDING_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
    {   var json_val = this._getAttr('autoStart');
        return (json_val == null ? Y_AUTOSTART_INVALID : parseInt(json_val));
    }

    /**
     * Gets the default activation state of the data logger on power up.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDataLogger object that invoked the callback
     *         - the result:either Y_AUTOSTART_OFF or Y_AUTOSTART_ON, according to the default activation state of
     *         the data logger on power
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_AUTOSTART_INVALID.
     */
    function YDataLogger_get_autoStart_async(func_callback, obj_context)
    {   this._getAttr_async('autoStart',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_AUTOSTART_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
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
    {   var json_val = this._getAttr('clearHistory');
        return (json_val == null ? Y_CLEARHISTORY_INVALID : parseInt(json_val));
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
    function YDataLogger_get_clearHistory_async(func_callback, obj_context)
    {   this._getAttr_async('clearHistory',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_CLEARHISTORY_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YDataLogger_set_clearHistory(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('clearHistory',rest_val);
    }

    /**
     * Continues the enumeration of data loggers started using yFirstDataLogger().
     * 
     * @return a pointer to a YDataLogger object, corresponding to
     *         a data logger currently online, or a null pointer
     *         if there are no more data loggers to enumerate.
     */
    function YDataLogger_nextDataLogger()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YDataLogger.FindDataLogger(next_hwid);
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
    function YDataLogger_FindDataLogger(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('DataLogger', str_func);
        if(obj_func) return obj_func;
        return new YDataLogger(str_func);
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

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'DataLogger', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.OLDESTRUNINDEX_INVALID          = -1;
        this.CURRENTRUNINDEX_INVALID         = -1;
        this.SAMPLINGINTERVAL_INVALID        = -1;
        this.TIMEUTC_INVALID                 = -1;
        this.RECORDING_OFF                   = 0;
        this.RECORDING_ON                    = 1;
        this.RECORDING_INVALID               = -1;
        this.AUTOSTART_OFF                   = 0;
        this.AUTOSTART_ON                    = 1;
        this.AUTOSTART_INVALID               = -1;
        this.CLEARHISTORY_FALSE              = 0;
        this.CLEARHISTORY_TRUE               = 1;
        this.CLEARHISTORY_INVALID            = -1;
        this.get_logicalName                 = YDataLogger_get_logicalName;
        this.logicalName                     = YDataLogger_get_logicalName;
        this.get_logicalName_async           = YDataLogger_get_logicalName_async;
        this.logicalName_async               = YDataLogger_get_logicalName_async;
        this.set_logicalName                 = YDataLogger_set_logicalName;
        this.setLogicalName                  = YDataLogger_set_logicalName;
        this.get_advertisedValue             = YDataLogger_get_advertisedValue;
        this.advertisedValue                 = YDataLogger_get_advertisedValue;
        this.get_advertisedValue_async       = YDataLogger_get_advertisedValue_async;
        this.advertisedValue_async           = YDataLogger_get_advertisedValue_async;
        this.get_oldestRunIndex              = YDataLogger_get_oldestRunIndex;
        this.oldestRunIndex                  = YDataLogger_get_oldestRunIndex;
        this.get_oldestRunIndex_async        = YDataLogger_get_oldestRunIndex_async;
        this.oldestRunIndex_async            = YDataLogger_get_oldestRunIndex_async;
        this.get_currentRunIndex             = YDataLogger_get_currentRunIndex;
        this.currentRunIndex                 = YDataLogger_get_currentRunIndex;
        this.get_currentRunIndex_async       = YDataLogger_get_currentRunIndex_async;
        this.currentRunIndex_async           = YDataLogger_get_currentRunIndex_async;
        this.get_samplingInterval            = YDataLogger_get_samplingInterval;
        this.samplingInterval                = YDataLogger_get_samplingInterval;
        this.get_samplingInterval_async      = YDataLogger_get_samplingInterval_async;
        this.samplingInterval_async          = YDataLogger_get_samplingInterval_async;
        this.get_timeUTC                     = YDataLogger_get_timeUTC;
        this.timeUTC                         = YDataLogger_get_timeUTC;
        this.get_timeUTC_async               = YDataLogger_get_timeUTC_async;
        this.timeUTC_async                   = YDataLogger_get_timeUTC_async;
        this.set_timeUTC                     = YDataLogger_set_timeUTC;
        this.setTimeUTC                      = YDataLogger_set_timeUTC;
        this.get_recording                   = YDataLogger_get_recording;
        this.recording                       = YDataLogger_get_recording;
        this.get_recording_async             = YDataLogger_get_recording_async;
        this.recording_async                 = YDataLogger_get_recording_async;
        this.set_recording                   = YDataLogger_set_recording;
        this.setRecording                    = YDataLogger_set_recording;
        this.get_autoStart                   = YDataLogger_get_autoStart;
        this.autoStart                       = YDataLogger_get_autoStart;
        this.get_autoStart_async             = YDataLogger_get_autoStart_async;
        this.autoStart_async                 = YDataLogger_get_autoStart_async;
        this.set_autoStart                   = YDataLogger_set_autoStart;
        this.setAutoStart                    = YDataLogger_set_autoStart;
        this.get_clearHistory                = YDataLogger_get_clearHistory;
        this.clearHistory                    = YDataLogger_get_clearHistory;
        this.get_clearHistory_async          = YDataLogger_get_clearHistory_async;
        this.clearHistory_async              = YDataLogger_get_clearHistory_async;
        this.set_clearHistory                = YDataLogger_set_clearHistory;
        this.setClearHistory                 = YDataLogger_set_clearHistory;
        this.nextDataLogger                  = YDataLogger_nextDataLogger;
        //--- (end of generated code: YDataLogger constructor)
        this.getData                         = YDataLogger_getData;
        this.loadRuns                        = YDataLogger_loadRuns;
        this.forgetAllDataStreams            = YDataLogger_forgetAllDataStreams
        this.get_measureNames                = YDataLogger_get_measureNames;
        this.measureNames                    = YDataLogger_get_measureNames;
        this.get_dataRun                     = YDataLogger_get_dataRun;
        this.dataRun                         = YDataLogger_get_dataRun;
        this.get_dataStreams                 = YDataLogger_get_dataStreams;
        this.dataStreams                     = YDataLogger_get_dataStreams;
    }

    YDataLogger = _YDataLogger;
    YDataLogger.FindDataLogger  = YDataLogger_FindDataLogger;
    YDataLogger.FirstDataLogger = YDataLogger_FirstDataLogger;
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
function yFindDataLogger(str_func)
{
    return YDataLogger.FindDataLogger(str_func);
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
