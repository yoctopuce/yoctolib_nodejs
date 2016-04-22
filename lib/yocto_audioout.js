/*********************************************************************
 *
 * $Id: yocto_audioout.js 23246 2016-02-23 14:49:01Z seb $
 *
 * Implements the high-level API for AudioOut functions
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

//--- (YAudioOut return codes)
//--- (end of YAudioOut return codes)
//--- (YAudioOut definitions)
var Y_MUTE_FALSE                    = 0;
var Y_MUTE_TRUE                     = 1;
var Y_MUTE_INVALID                  = -1;
var Y_VOLUME_INVALID                = YAPI_INVALID_UINT;
var Y_VOLUMERANGE_INVALID           = YAPI_INVALID_STRING;
var Y_SIGNAL_INVALID                = YAPI_INVALID_INT;
var Y_NOSIGNALFOR_INVALID           = YAPI_INVALID_INT;
//--- (end of YAudioOut definitions)

//--- (YAudioOut class start)
/**
 * YAudioOut Class: AudioOut function interface
 *
 * The Yoctopuce application programming interface allows you to configure the volume of the outout.
 */
//--- (end of YAudioOut class start)

var YAudioOut; // definition below
(function()
{
    function _YAudioOut(str_func)
    {
        //--- (YAudioOut constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'AudioOut';

        this._volume                         = Y_VOLUME_INVALID;           // Percent
        this._mute                           = Y_MUTE_INVALID;             // Bool
        this._volumeRange                    = Y_VOLUMERANGE_INVALID;      // ValueRange
        this._signal                         = Y_SIGNAL_INVALID;           // Int
        this._noSignalFor                    = Y_NOSIGNALFOR_INVALID;      // Int
        //--- (end of YAudioOut constructor)
    }

    //--- (YAudioOut implementation)

    function YAudioOut_parseAttr(name, val, _super)
    {
        switch(name) {
        case "volume":
            this._volume = parseInt(val);
            return 1;
        case "mute":
            this._mute = parseInt(val);
            return 1;
        case "volumeRange":
            this._volumeRange = val;
            return 1;
        case "signal":
            this._signal = parseInt(val);
            return 1;
        case "noSignalFor":
            this._noSignalFor = parseInt(val);
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns audio output volume, in per cents.
     *
     * @return an integer corresponding to audio output volume, in per cents
     *
     * On failure, throws an exception or returns YAudioOut.VOLUME_INVALID.
     */
    function YAudioOut_get_volume()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLUME_INVALID;
            }
        }
        return this._volume;
    }

    /**
     * Gets audio output volume, in per cents.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAudioOut object that invoked the callback
     *         - the result:an integer corresponding to audio output volume, in per cents
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_VOLUME_INVALID.
     */
    function YAudioOut_get_volume_async(callback,context)
    {
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
     * Changes audio output volume, in per cents.
     *
     * @param newval : an integer corresponding to audio output volume, in per cents
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YAudioOut_set_volume(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('volume',rest_val);
    }

    /**
     * Returns the state of the mute function.
     *
     * @return either YAudioOut.MUTE_FALSE or YAudioOut.MUTE_TRUE, according to the state of the mute function
     *
     * On failure, throws an exception or returns YAudioOut.MUTE_INVALID.
     */
    function YAudioOut_get_mute()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MUTE_INVALID;
            }
        }
        return this._mute;
    }

    /**
     * Gets the state of the mute function.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAudioOut object that invoked the callback
     *         - the result:either Y_MUTE_FALSE or Y_MUTE_TRUE, according to the state of the mute function
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_MUTE_INVALID.
     */
    function YAudioOut_get_mute_async(callback,context)
    {
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
     * @param newval : either YAudioOut.MUTE_FALSE or YAudioOut.MUTE_TRUE, according to the state of the mute function
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YAudioOut_set_mute(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('mute',rest_val);
    }

    /**
     * Returns the supported volume range. The low value of the
     * range corresponds to the minimal audible value. To
     * completely mute the sound, use set_mute()
     * instead of the set_volume().
     *
     * @return a string corresponding to the supported volume range
     *
     * On failure, throws an exception or returns YAudioOut.VOLUMERANGE_INVALID.
     */
    function YAudioOut_get_volumeRange()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_VOLUMERANGE_INVALID;
            }
        }
        return this._volumeRange;
    }

    /**
     * Gets the supported volume range. The low value of the
     * range corresponds to the minimal audible value. To
     * completely mute the sound, use set_mute()
     * instead of the set_volume().
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAudioOut object that invoked the callback
     *         - the result:a string corresponding to the supported volume range
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_VOLUMERANGE_INVALID.
     */
    function YAudioOut_get_volumeRange_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_VOLUMERANGE_INVALID);
            } else {
                callback(context, obj, obj._volumeRange);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the detected output current level.
     *
     * @return an integer corresponding to the detected output current level
     *
     * On failure, throws an exception or returns YAudioOut.SIGNAL_INVALID.
     */
    function YAudioOut_get_signal()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_SIGNAL_INVALID;
            }
        }
        return this._signal;
    }

    /**
     * Gets the detected output current level.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAudioOut object that invoked the callback
     *         - the result:an integer corresponding to the detected output current level
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_SIGNAL_INVALID.
     */
    function YAudioOut_get_signal_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_SIGNAL_INVALID);
            } else {
                callback(context, obj, obj._signal);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of seconds elapsed without detecting a signal.
     *
     * @return an integer corresponding to the number of seconds elapsed without detecting a signal
     *
     * On failure, throws an exception or returns YAudioOut.NOSIGNALFOR_INVALID.
     */
    function YAudioOut_get_noSignalFor()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_NOSIGNALFOR_INVALID;
            }
        }
        return this._noSignalFor;
    }

    /**
     * Gets the number of seconds elapsed without detecting a signal.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YAudioOut object that invoked the callback
     *         - the result:an integer corresponding to the number of seconds elapsed without detecting a signal
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_NOSIGNALFOR_INVALID.
     */
    function YAudioOut_get_noSignalFor_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_NOSIGNALFOR_INVALID);
            } else {
                callback(context, obj, obj._noSignalFor);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves an audio output for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the audio output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAudioOut.isOnline() to test if the audio output is
     * indeed online at a given time. In case of ambiguity when looking for
     * an audio output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the audio output
     *
     * @return a YAudioOut object allowing you to drive the audio output.
     */
    function YAudioOut_FindAudioOut(func)                       // class method
    {
        var obj;                    // YAudioOut;
        obj = YFunction._FindFromCache("AudioOut", func);
        if (obj == null) {
            obj = new YAudioOut(func);
            YFunction._AddToCache("AudioOut", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of audio outputs started using yFirstAudioOut().
     *
     * @return a pointer to a YAudioOut object, corresponding to
     *         an audio output currently online, or a null pointer
     *         if there are no more audio outputs to enumerate.
     */
    function YAudioOut_nextAudioOut()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAudioOut.FindAudioOut(next_hwid);
    }

    /**
     * Starts the enumeration of audio outputs currently accessible.
     * Use the method YAudioOut.nextAudioOut() to iterate on
     * next audio outputs.
     *
     * @return a pointer to a YAudioOut object, corresponding to
     *         the first audio output currently online, or a null pointer
     *         if there are none.
     */
    function YAudioOut_FirstAudioOut()
    {
        var next_hwid = YAPI.getFirstHardwareId('AudioOut');
        if(next_hwid == null) return null;
        return YAudioOut.FindAudioOut(next_hwid);
    }

    //--- (end of YAudioOut implementation)

    //--- (YAudioOut initialization)
    YAudioOut = YFunction._Subclass(_YAudioOut, {
        // Constants
        VOLUME_INVALID              : YAPI_INVALID_UINT,
        MUTE_FALSE                  : 0,
        MUTE_TRUE                   : 1,
        MUTE_INVALID                : -1,
        VOLUMERANGE_INVALID         : YAPI_INVALID_STRING,
        SIGNAL_INVALID              : YAPI_INVALID_INT,
        NOSIGNALFOR_INVALID         : YAPI_INVALID_INT
    }, {
        // Class methods
        FindAudioOut                : YAudioOut_FindAudioOut,
        FirstAudioOut               : YAudioOut_FirstAudioOut
    }, {
        // Methods
        get_volume                  : YAudioOut_get_volume,
        volume                      : YAudioOut_get_volume,
        get_volume_async            : YAudioOut_get_volume_async,
        volume_async                : YAudioOut_get_volume_async,
        set_volume                  : YAudioOut_set_volume,
        setVolume                   : YAudioOut_set_volume,
        get_mute                    : YAudioOut_get_mute,
        mute                        : YAudioOut_get_mute,
        get_mute_async              : YAudioOut_get_mute_async,
        mute_async                  : YAudioOut_get_mute_async,
        set_mute                    : YAudioOut_set_mute,
        setMute                     : YAudioOut_set_mute,
        get_volumeRange             : YAudioOut_get_volumeRange,
        volumeRange                 : YAudioOut_get_volumeRange,
        get_volumeRange_async       : YAudioOut_get_volumeRange_async,
        volumeRange_async           : YAudioOut_get_volumeRange_async,
        get_signal                  : YAudioOut_get_signal,
        signal                      : YAudioOut_get_signal,
        get_signal_async            : YAudioOut_get_signal_async,
        signal_async                : YAudioOut_get_signal_async,
        get_noSignalFor             : YAudioOut_get_noSignalFor,
        noSignalFor                 : YAudioOut_get_noSignalFor,
        get_noSignalFor_async       : YAudioOut_get_noSignalFor_async,
        noSignalFor_async           : YAudioOut_get_noSignalFor_async,
        nextAudioOut                : YAudioOut_nextAudioOut,
        _parseAttr                  : YAudioOut_parseAttr
    });
    //--- (end of YAudioOut initialization)
})();

//--- (AudioOut functions)

/**
 * Retrieves an audio output for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the audio output is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YAudioOut.isOnline() to test if the audio output is
 * indeed online at a given time. In case of ambiguity when looking for
 * an audio output by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the audio output
 *
 * @return a YAudioOut object allowing you to drive the audio output.
 */
function yFindAudioOut(func)
{
    return YAudioOut.FindAudioOut(func);
}

/**
 * Starts the enumeration of audio outputs currently accessible.
 * Use the method YAudioOut.nextAudioOut() to iterate on
 * next audio outputs.
 *
 * @return a pointer to a YAudioOut object, corresponding to
 *         the first audio output currently online, or a null pointer
 *         if there are none.
 */
function yFirstAudioOut()
{
    return YAudioOut.FirstAudioOut();
}

//--- (end of AudioOut functions)
