/*********************************************************************
 *
 * $Id: yocto_colorledcluster.js 27114 2017-04-06 22:22:28Z seb $
 *
 * Implements the high-level API for ColorLedCluster functions
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

//--- (YColorLedCluster return codes)
//--- (end of YColorLedCluster return codes)
//--- (YColorLedCluster definitions)
var Y_ACTIVELEDCOUNT_INVALID        = YAPI_INVALID_UINT;
var Y_MAXLEDCOUNT_INVALID           = YAPI_INVALID_UINT;
var Y_BLINKSEQMAXCOUNT_INVALID      = YAPI_INVALID_UINT;
var Y_BLINKSEQMAXSIZE_INVALID       = YAPI_INVALID_UINT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of YColorLedCluster definitions)

//--- (YColorLedCluster class start)
/**
 * YColorLedCluster Class: ColorLedCluster function interface
 *
 * The Yoctopuce application programming interface
 * allows you to drive a color LED cluster. Unlike the ColorLed class, the ColorLedCluster
 * allows to handle several LEDs at one. Color changes can be done   using RGB coordinates as well as
 * HSL coordinates.
 * The module performs all conversions form RGB to HSL automatically. It is then
 * self-evident to turn on a LED with a given hue and to progressively vary its
 * saturation or lightness. If needed, you can find more information on the
 * difference between RGB and HSL in the section following this one.
 */
//--- (end of YColorLedCluster class start)

var YColorLedCluster; // definition below
(function()
{
    function _YColorLedCluster(str_func)
    {
        //--- (YColorLedCluster constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'ColorLedCluster';

        this._activeLedCount                 = Y_ACTIVELEDCOUNT_INVALID;   // UInt31
        this._maxLedCount                    = Y_MAXLEDCOUNT_INVALID;      // UInt31
        this._blinkSeqMaxCount               = Y_BLINKSEQMAXCOUNT_INVALID; // UInt31
        this._blinkSeqMaxSize                = Y_BLINKSEQMAXSIZE_INVALID;  // UInt31
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of YColorLedCluster constructor)
    }

    //--- (YColorLedCluster implementation)

    function YColorLedCluster_parseAttr(name, val, _super)
    {
        switch(name) {
        case "activeLedCount":
            this._activeLedCount = parseInt(val);
            return 1;
        case "maxLedCount":
            this._maxLedCount = parseInt(val);
            return 1;
        case "blinkSeqMaxCount":
            this._blinkSeqMaxCount = parseInt(val);
            return 1;
        case "blinkSeqMaxSize":
            this._blinkSeqMaxSize = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the number of LEDs currently handled by the device.
     *
     * @return an integer corresponding to the number of LEDs currently handled by the device
     *
     * On failure, throws an exception or returns YColorLedCluster.ACTIVELEDCOUNT_INVALID.
     */
    function YColorLedCluster_get_activeLedCount()
    {
        var res;                    // int;
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ACTIVELEDCOUNT_INVALID;
            }
        }
        res = this._activeLedCount;
        return res;
    }

    /**
     * Gets the number of LEDs currently handled by the device.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLedCluster object that invoked the callback
     *         - the result:an integer corresponding to the number of LEDs currently handled by the device
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_ACTIVELEDCOUNT_INVALID.
     */
    function YColorLedCluster_get_activeLedCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ACTIVELEDCOUNT_INVALID);
            } else {
                callback(context, obj, obj._activeLedCount);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the number of LEDs currently handled by the device.
     *
     * @param newval : an integer corresponding to the number of LEDs currently handled by the device
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_set_activeLedCount(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('activeLedCount',rest_val);
    }

    /**
     * Returns the maximum number of LEDs that the device can handle.
     *
     * @return an integer corresponding to the maximum number of LEDs that the device can handle
     *
     * On failure, throws an exception or returns YColorLedCluster.MAXLEDCOUNT_INVALID.
     */
    function YColorLedCluster_get_maxLedCount()
    {
        var res;                    // int;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MAXLEDCOUNT_INVALID;
            }
        }
        res = this._maxLedCount;
        return res;
    }

    /**
     * Gets the maximum number of LEDs that the device can handle.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLedCluster object that invoked the callback
     *         - the result:an integer corresponding to the maximum number of LEDs that the device can handle
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_MAXLEDCOUNT_INVALID.
     */
    function YColorLedCluster_get_maxLedCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MAXLEDCOUNT_INVALID);
            } else {
                callback(context, obj, obj._maxLedCount);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the maximum number of sequences that the device can handle.
     *
     * @return an integer corresponding to the maximum number of sequences that the device can handle
     *
     * On failure, throws an exception or returns YColorLedCluster.BLINKSEQMAXCOUNT_INVALID.
     */
    function YColorLedCluster_get_blinkSeqMaxCount()
    {
        var res;                    // int;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BLINKSEQMAXCOUNT_INVALID;
            }
        }
        res = this._blinkSeqMaxCount;
        return res;
    }

    /**
     * Gets the maximum number of sequences that the device can handle.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLedCluster object that invoked the callback
     *         - the result:an integer corresponding to the maximum number of sequences that the device can handle
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_BLINKSEQMAXCOUNT_INVALID.
     */
    function YColorLedCluster_get_blinkSeqMaxCount_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BLINKSEQMAXCOUNT_INVALID);
            } else {
                callback(context, obj, obj._blinkSeqMaxCount);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the maximum length of sequences.
     *
     * @return an integer corresponding to the maximum length of sequences
     *
     * On failure, throws an exception or returns YColorLedCluster.BLINKSEQMAXSIZE_INVALID.
     */
    function YColorLedCluster_get_blinkSeqMaxSize()
    {
        var res;                    // int;
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BLINKSEQMAXSIZE_INVALID;
            }
        }
        res = this._blinkSeqMaxSize;
        return res;
    }

    /**
     * Gets the maximum length of sequences.
     *
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YColorLedCluster object that invoked the callback
     *         - the result:an integer corresponding to the maximum length of sequences
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     *
     * On failure, throws an exception or returns Y_BLINKSEQMAXSIZE_INVALID.
     */
    function YColorLedCluster_get_blinkSeqMaxSize_async(callback,context)
    {
        var res;                    // int;
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BLINKSEQMAXSIZE_INVALID);
            } else {
                callback(context, obj, obj._blinkSeqMaxSize);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YColorLedCluster_get_command()
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
     *         - the YColorLedCluster object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     *
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YColorLedCluster_get_command_async(callback,context)
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

    function YColorLedCluster_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a RGB LED cluster for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED cluster is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLedCluster.isOnline() to test if the RGB LED cluster is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RGB LED cluster by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func : a string that uniquely characterizes the RGB LED cluster
     *
     * @return a YColorLedCluster object allowing you to drive the RGB LED cluster.
     */
    function YColorLedCluster_FindColorLedCluster(func)         // class method
    {
        var obj;                    // YColorLedCluster;
        obj = YFunction._FindFromCache("ColorLedCluster", func);
        if (obj == null) {
            obj = new YColorLedCluster(func);
            YFunction._AddToCache("ColorLedCluster", func, obj);
        }
        return obj;
    }

    function YColorLedCluster_sendCommand(command)
    {
        return this.set_command(command);
    }

    /**
     * Changes the current color of consecutve LEDs in the cluster, using a RGB color. Encoding is done as
     * follows: 0xRRGGBB.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue :  new color.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_set_rgbColor(ledIndex,count,rgbValue)
    {
        return this.sendCommand("SR"+String(Math.round(ledIndex))+","+String(Math.round(count))+","+(rgbValue).toString(16));
    }

    /**
     * Changes the  color at device startup of consecutve LEDs in the cluster, using a RGB color. Encoding
     * is done as follows: 0xRRGGBB.
     * Don't forget to call saveLedsConfigAtPowerOn() to make sure the modification is saved in the device
     * flash memory.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue :  new color.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_set_rgbColorAtPowerOn(ledIndex,count,rgbValue)
    {
        return this.sendCommand("SC"+String(Math.round(ledIndex))+","+String(Math.round(count))+","+(rgbValue).toString(16));
    }

    /**
     * Changes the current color of consecutive LEDs in the cluster, using a HSL color. Encoding is done
     * as follows: 0xHHSSLL.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param hslValue :  new color.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_set_hslColor(ledIndex,count,hslValue)
    {
        return this.sendCommand("SH"+String(Math.round(ledIndex))+","+String(Math.round(count))+","+(hslValue).toString(16));
    }

    /**
     * Allows you to modify the current color of a group of adjacent LEDs to another color, in a seamless and
     * autonomous manner. The transition is performed in the RGB space.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue :  new color (0xRRGGBB).
     * @param delay    :  transition duration in ms
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_rgb_move(ledIndex,count,rgbValue,delay)
    {
        return this.sendCommand("MR"+String(Math.round(ledIndex))+","+String(Math.round(count))+","+(rgbValue).toString(16)+","+String(Math.round(delay)));
    }

    /**
     * Allows you to modify the current color of a group of adjacent LEDs  to another color, in a seamless and
     * autonomous manner. The transition is performed in the HSL space. In HSL, hue is a circular
     * value (0..360°). There are always two paths to perform the transition: by increasing
     * or by decreasing the hue. The module selects the shortest transition.
     * If the difference is exactly 180°, the module selects the transition which increases
     * the hue.
     *
     * @param ledIndex :  index of the fisrt affected LED.
     * @param count    :  affected LED count.
     * @param hslValue :  new color (0xHHSSLL).
     * @param delay    :  transition duration in ms
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_hsl_move(ledIndex,count,hslValue,delay)
    {
        return this.sendCommand("MH"+String(Math.round(ledIndex))+","+String(Math.round(count))+","+(hslValue).toString(16)+","+String(Math.round(delay)));
    }

    /**
     * Adds an RGB transition to a sequence. A sequence is a transition list, which can
     * be executed in loop by a group of LEDs.  Sequences are persistent and are saved
     * in the device flash memory as soon as the saveBlinkSeq() method is called.
     *
     * @param seqIndex :  sequence index.
     * @param rgbValue :  target color (0xRRGGBB)
     * @param delay    :  transition duration in ms
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_addRgbMoveToBlinkSeq(seqIndex,rgbValue,delay)
    {
        return this.sendCommand("AR"+String(Math.round(seqIndex))+","+(rgbValue).toString(16)+","+String(Math.round(delay)));
    }

    /**
     * Adds an HSL transition to a sequence. A sequence is a transition list, which can
     * be executed in loop by an group of LEDs.  Sequences are persistant and are saved
     * in the device flash memory as soon as the saveBlinkSeq() method is called.
     *
     * @param seqIndex : sequence index.
     * @param hslValue : target color (0xHHSSLL)
     * @param delay    : transition duration in ms
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_addHslMoveToBlinkSeq(seqIndex,hslValue,delay)
    {
        return this.sendCommand("AH"+String(Math.round(seqIndex))+","+(hslValue).toString(16)+","+String(Math.round(delay)));
    }

    /**
     * Adds a mirror ending to a sequence. When the sequence will reach the end of the last
     * transition, its running speed will automatically be reversed so that the sequence plays
     * in the reverse direction, like in a mirror. After the first transition of the sequence
     * is played at the end of the reverse execution, the sequence starts again in
     * the initial direction.
     *
     * @param seqIndex : sequence index.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_addMirrorToBlinkSeq(seqIndex)
    {
        return this.sendCommand("AC"+String(Math.round(seqIndex))+",0,0");
    }

    /**
     * Links adjacent LEDs to a specific sequence. These LEDs start to execute
     * the sequence as soon as  startBlinkSeq is called. It is possible to add an offset
     * in the execution: that way we  can have several groups of LED executing the same
     * sequence, with a  temporal offset. A LED cannot be linked to more than one sequence.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex :  sequence index.
     * @param offset   :  execution offset in ms.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_linkLedToBlinkSeq(ledIndex,count,seqIndex,offset)
    {
        return this.sendCommand("LS"+String(Math.round(ledIndex))+","+String(Math.round(count))+","+String(Math.round(seqIndex))+","+String(Math.round(offset)));
    }

    /**
     * Links adjacent LEDs to a specific sequence at device poweron. Don't forget to configure
     * the sequence auto start flag as well and call saveLedsConfigAtPowerOn(). It is possible to add an offset
     * in the execution: that way we  can have several groups of LEDs executing the same
     * sequence, with a  temporal offset. A LED cannot be linked to more than one sequence.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex :  sequence index.
     * @param offset   :  execution offset in ms.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_linkLedToBlinkSeqAtPowerOn(ledIndex,count,seqIndex,offset)
    {
        return this.sendCommand("LO"+String(Math.round(ledIndex))+","+String(Math.round(count))+","+String(Math.round(seqIndex))+","+String(Math.round(offset)));
    }

    /**
     * Links adjacent LEDs to a specific sequence. These LED start to execute
     * the sequence as soon as  startBlinkSeq is called. This function automatically
     * introduces a shift between LEDs so that the specified number of sequence periods
     * appears on the group of LEDs (wave effect).
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex :  sequence index.
     * @param periods  :  number of periods to show on LEDs.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_linkLedToPeriodicBlinkSeq(ledIndex,count,seqIndex,periods)
    {
        return this.sendCommand("LP"+String(Math.round(ledIndex))+","+String(Math.round(count))+","+String(Math.round(seqIndex))+","+String(Math.round(periods)));
    }

    /**
     * Unlinks adjacent LEDs from a  sequence.
     *
     * @param ledIndex  :  index of the first affected LED.
     * @param count     :  affected LED count.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_unlinkLedFromBlinkSeq(ledIndex,count)
    {
        return this.sendCommand("US"+String(Math.round(ledIndex))+","+String(Math.round(count)));
    }

    /**
     * Starts a sequence execution: every LED linked to that sequence starts to
     * run it in a loop.
     *
     * @param seqIndex :  index of the sequence to start.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_startBlinkSeq(seqIndex)
    {
        return this.sendCommand("SS"+String(Math.round(seqIndex)));
    }

    /**
     * Stops a sequence execution. If started again, the execution
     * restarts from the beginning.
     *
     * @param seqIndex :  index of the sequence to stop.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_stopBlinkSeq(seqIndex)
    {
        return this.sendCommand("XS"+String(Math.round(seqIndex)));
    }

    /**
     * Stops a sequence execution and resets its contents. Leds linked to this
     * sequence are not automatically updated anymore.
     *
     * @param seqIndex :  index of the sequence to reset
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_resetBlinkSeq(seqIndex)
    {
        return this.sendCommand("ZS"+String(Math.round(seqIndex)));
    }

    /**
     * Configures a sequence to make it start automatically at device
     * startup. Don't forget to call saveBlinkSeq() to make sure the
     * modification is saved in the device flash memory.
     *
     * @param seqIndex :  index of the sequence to reset.
     * @param autostart : 0 to keep the sequence turned off and 1 to start it automatically.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_set_blinkSeqStateAtPowerOn(seqIndex,autostart)
    {
        return this.sendCommand("AS"+String(Math.round(seqIndex))+","+String(Math.round(autostart)));
    }

    /**
     * Changes the execution speed of a sequence. The natural execution speed is 1000 per
     * thousand. If you configure a slower speed, you can play the sequence in slow-motion.
     * If you set a negative speed, you can play the sequence in reverse direction.
     *
     * @param seqIndex :  index of the sequence to start.
     * @param speed :     sequence running speed (-1000...1000).
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_set_blinkSeqSpeed(seqIndex,speed)
    {
        return this.sendCommand("CS"+String(Math.round(seqIndex))+","+String(Math.round(speed)));
    }

    /**
     * Saves the LEDs power-on configuration. This includes the start-up color or
     * sequence binding for all LEDs. Warning: if some LEDs are linked to a sequence, the
     * method saveBlinkSeq() must also be called to save the sequence definition.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_saveLedsConfigAtPowerOn()
    {
        return this.sendCommand("WL");
    }

    function YColorLedCluster_saveLedsState()
    {
        return this.sendCommand("WL");
    }

    /**
     * Saves the definition of a sequence. Warning: only sequence steps and flags are saved.
     * to save the LEDs startup bindings, the method saveLedsConfigAtPowerOn()
     * must be called.
     *
     * @param seqIndex :  index of the sequence to start.
     *
     * @return YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_saveBlinkSeq(seqIndex)
    {
        return this.sendCommand("WS"+String(Math.round(seqIndex)));
    }

    /**
     * Sends a binary buffer to the LED RGB buffer, as is.
     * First three bytes are RGB components for LED specified as parameter, the
     * next three bytes for the next LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param buff : the binary buffer to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_set_rgbColorBuffer(ledIndex,buff)
    {
        return this._upload("rgb:0:"+String(Math.round(ledIndex)), buff);
    }

    /**
     * Sends 24bit RGB colors (provided as a list of integers) to the LED RGB buffer, as is.
     * The first number represents the RGB value of the LED specified as parameter, the second
     * number represents the RGB value of the next LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param rgbList : a list of 24bit RGB codes, in the form 0xRRGGBB
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_set_rgbColorArray(ledIndex,rgbList)
    {
        var listlen;                // int;
        var buff;                   // bin;
        var idx;                    // int;
        var rgb;                    // int;
        var res;                    // int;
        listlen = rgbList.length;
        buff = new Buffer(3*listlen);
        idx = 0;
        while (idx < listlen) {
            rgb = rgbList[idx];
            (buff).writeUInt8(((((rgb) >> (16))) & (255)), 3*idx);
            (buff).writeUInt8(((((rgb) >> (8))) & (255)), 3*idx+1);
            (buff).writeUInt8(((rgb) & (255)), 3*idx+2);
            idx = idx + 1;
        }
        
        res = this._upload("rgb:0:"+String(Math.round(ledIndex)), buff);
        return res;
    }

    /**
     * Sets up a smooth RGB color transition to the specified pixel-by-pixel list of RGB
     * color codes. The first color code represents the target RGB value of the first LED,
     * the next color code represents the target value of the next LED, etc.
     *
     * @param rgbList : a list of target 24bit RGB codes, in the form 0xRRGGBB
     * @param delay   : transition duration in ms
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_rgbArray_move(rgbList,delay)
    {
        var listlen;                // int;
        var buff;                   // bin;
        var idx;                    // int;
        var rgb;                    // int;
        var res;                    // int;
        listlen = rgbList.length;
        buff = new Buffer(3*listlen);
        idx = 0;
        while (idx < listlen) {
            rgb = rgbList[idx];
            (buff).writeUInt8(((((rgb) >> (16))) & (255)), 3*idx);
            (buff).writeUInt8(((((rgb) >> (8))) & (255)), 3*idx+1);
            (buff).writeUInt8(((rgb) & (255)), 3*idx+2);
            idx = idx + 1;
        }
        
        res = this._upload("rgb:"+String(Math.round(delay)), buff);
        return res;
    }

    /**
     * Sends a binary buffer to the LED HSL buffer, as is.
     * First three bytes are HSL components for the LED specified as parameter, the
     * next three bytes for the second LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param buff : the binary buffer to send
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_set_hslColorBuffer(ledIndex,buff)
    {
        return this._upload("hsl:0:"+String(Math.round(ledIndex)), buff);
    }

    /**
     * Sends 24bit HSL colors (provided as a list of integers) to the LED HSL buffer, as is.
     * The first number represents the HSL value of the LED specified as parameter, the second number represents
     * the HSL value of the second LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param hslList : a list of 24bit HSL codes, in the form 0xHHSSLL
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_set_hslColorArray(ledIndex,hslList)
    {
        var listlen;                // int;
        var buff;                   // bin;
        var idx;                    // int;
        var hsl;                    // int;
        var res;                    // int;
        listlen = hslList.length;
        buff = new Buffer(3*listlen);
        idx = 0;
        while (idx < listlen) {
            hsl = hslList[idx];
            (buff).writeUInt8(((((hsl) >> (16))) & (255)), 3*idx);
            (buff).writeUInt8(((((hsl) >> (8))) & (255)), 3*idx+1);
            (buff).writeUInt8(((hsl) & (255)), 3*idx+2);
            idx = idx + 1;
        }
        
        res = this._upload("hsl:0:"+String(Math.round(ledIndex)), buff);
        return res;
    }

    /**
     * Sets up a smooth HSL color transition to the specified pixel-by-pixel list of HSL
     * color codes. The first color code represents the target HSL value of the first LED,
     * the second color code represents the target value of the second LED, etc.
     *
     * @param hslList : a list of target 24bit HSL codes, in the form 0xHHSSLL
     * @param delay   : transition duration in ms
     *
     * @return YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    function YColorLedCluster_hslArray_move(hslList,delay)
    {
        var listlen;                // int;
        var buff;                   // bin;
        var idx;                    // int;
        var hsl;                    // int;
        var res;                    // int;
        listlen = hslList.length;
        buff = new Buffer(3*listlen);
        idx = 0;
        while (idx < listlen) {
            hsl = hslList[idx];
            (buff).writeUInt8(((((hsl) >> (16))) & (255)), 3*idx);
            (buff).writeUInt8(((((hsl) >> (8))) & (255)), 3*idx+1);
            (buff).writeUInt8(((hsl) & (255)), 3*idx+2);
            idx = idx + 1;
        }
        
        res = this._upload("hsl:"+String(Math.round(delay)), buff);
        return res;
    }

    /**
     * Returns a binary buffer with content from the LED RGB buffer, as is.
     * First three bytes are RGB components for the first LED in the interval,
     * the next three bytes for the second LED in the interval, etc.
     *
     * @param ledIndex : index of the first LED which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return a binary buffer with RGB components of selected LEDs.
     *
     * On failure, throws an exception or returns an empty binary buffer.
     */
    function YColorLedCluster_get_rgbColorBuffer(ledIndex,count)
    {
        return this._download("rgb.bin?typ=0&pos="+String(Math.round(3*ledIndex))+"&len="+String(Math.round(3*count)));
    }

    /**
     * Returns a list on 24bit RGB color values with the current colors displayed on
     * the RGB leds. The first number represents the RGB value of the first LED,
     * the second number represents the RGB value of the second LED, etc.
     *
     * @param ledIndex : index of the first LED which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return a list of 24bit color codes with RGB components of selected LEDs, as 0xRRGGBB.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YColorLedCluster_get_rgbColorArray(ledIndex,count)
    {
        var buff;                   // bin;
        var res = [];               // intArr;
        var idx;                    // int;
        var r;                      // int;
        var g;                      // int;
        var b;                      // int;
        
        buff = this._download("rgb.bin?typ=0&pos="+String(Math.round(3*ledIndex))+"&len="+String(Math.round(3*count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            r = (buff).readUInt8(3*idx);
            g = (buff).readUInt8(3*idx+1);
            b = (buff).readUInt8(3*idx+2);
            res.push(r*65536+g*256+b);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Returns a list on 24bit RGB color values with the RGB LEDs startup colors.
     * The first number represents the startup RGB value of the first LED,
     * the second number represents the RGB value of the second LED, etc.
     *
     * @param ledIndex : index of the first LED  which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return a list of 24bit color codes with RGB components of selected LEDs, as 0xRRGGBB.
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YColorLedCluster_get_rgbColorArrayAtPowerOn(ledIndex,count)
    {
        var buff;                   // bin;
        var res = [];               // intArr;
        var idx;                    // int;
        var r;                      // int;
        var g;                      // int;
        var b;                      // int;
        
        buff = this._download("rgb.bin?typ=4&pos="+String(Math.round(3*ledIndex))+"&len="+String(Math.round(3*count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            r = (buff).readUInt8(3*idx);
            g = (buff).readUInt8(3*idx+1);
            b = (buff).readUInt8(3*idx+2);
            res.push(r*65536+g*256+b);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Returns a list on sequence index for each RGB LED. The first number represents the
     * sequence index for the the first LED, the second number represents the sequence
     * index for the second LED, etc.
     *
     * @param ledIndex : index of the first LED which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return a list of integers with sequence index
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YColorLedCluster_get_linkedSeqArray(ledIndex,count)
    {
        var buff;                   // bin;
        var res = [];               // intArr;
        var idx;                    // int;
        var seq;                    // int;
        
        buff = this._download("rgb.bin?typ=1&pos="+String(Math.round(ledIndex))+"&len="+String(Math.round(count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            seq = (buff).readUInt8(idx);
            res.push(seq);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Returns a list on 32 bit signatures for specified blinking sequences.
     * Since blinking sequences cannot be read from the device, this can be used
     * to detect if a specific blinking sequence is already programmed.
     *
     * @param seqIndex : index of the first blinking sequence which should be returned
     * @param count    : number of blinking sequences which should be returned
     *
     * @return a list of 32 bit integer signatures
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YColorLedCluster_get_blinkSeqSignatures(seqIndex,count)
    {
        var buff;                   // bin;
        var res = [];               // intArr;
        var idx;                    // int;
        var hh;                     // int;
        var hl;                     // int;
        var lh;                     // int;
        var ll;                     // int;
        
        buff = this._download("rgb.bin?typ=2&pos="+String(Math.round(4*seqIndex))+"&len="+String(Math.round(4*count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            hh = (buff).readUInt8(4*idx);
            hl = (buff).readUInt8(4*idx+1);
            lh = (buff).readUInt8(4*idx+2);
            ll = (buff).readUInt8(4*idx+3);
            res.push(((hh) << (24))+((hl) << (16))+((lh) << (8))+ll);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Returns a list of integers with the current speed for specified blinking sequences.
     *
     * @param seqIndex : index of the first sequence speed which should be returned
     * @param count    : number of sequence speeds which should be returned
     *
     * @return a list of integers, 0 for sequences turned off and 1 for sequences running
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YColorLedCluster_get_blinkSeqStateSpeed(seqIndex,count)
    {
        var buff;                   // bin;
        var res = [];               // intArr;
        var idx;                    // int;
        var lh;                     // int;
        var ll;                     // int;
        
        buff = this._download("rgb.bin?typ=6&pos="+String(Math.round(seqIndex))+"&len="+String(Math.round(count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            lh = (buff).readUInt8(2*idx);
            ll = (buff).readUInt8(2*idx+1);
            res.push(((lh) << (8))+ll);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Returns a list of integers with the "auto-start at power on" flag state for specified blinking sequences.
     *
     * @param seqIndex : index of the first blinking sequence which should be returned
     * @param count    : number of blinking sequences which should be returned
     *
     * @return a list of integers, 0 for sequences turned off and 1 for sequences running
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YColorLedCluster_get_blinkSeqStateAtPowerOn(seqIndex,count)
    {
        var buff;                   // bin;
        var res = [];               // intArr;
        var idx;                    // int;
        var started;                // int;
        
        buff = this._download("rgb.bin?typ=5&pos="+String(Math.round(seqIndex))+"&len="+String(Math.round(count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            started = (buff).readUInt8(idx);
            res.push(started);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Returns a list of integers with the started state for specified blinking sequences.
     *
     * @param seqIndex : index of the first blinking sequence which should be returned
     * @param count    : number of blinking sequences which should be returned
     *
     * @return a list of integers, 0 for sequences turned off and 1 for sequences running
     *
     * On failure, throws an exception or returns an empty array.
     */
    function YColorLedCluster_get_blinkSeqState(seqIndex,count)
    {
        var buff;                   // bin;
        var res = [];               // intArr;
        var idx;                    // int;
        var started;                // int;
        
        buff = this._download("rgb.bin?typ=3&pos="+String(Math.round(seqIndex))+"&len="+String(Math.round(count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            started = (buff).readUInt8(idx);
            res.push(started);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Continues the enumeration of RGB LED clusters started using yFirstColorLedCluster().
     *
     * @return a pointer to a YColorLedCluster object, corresponding to
     *         a RGB LED cluster currently online, or a null pointer
     *         if there are no more RGB LED clusters to enumerate.
     */
    function YColorLedCluster_nextColorLedCluster()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YColorLedCluster.FindColorLedCluster(next_hwid);
    }

    /**
     * Starts the enumeration of RGB LED clusters currently accessible.
     * Use the method YColorLedCluster.nextColorLedCluster() to iterate on
     * next RGB LED clusters.
     *
     * @return a pointer to a YColorLedCluster object, corresponding to
     *         the first RGB LED cluster currently online, or a null pointer
     *         if there are none.
     */
    function YColorLedCluster_FirstColorLedCluster()
    {
        var next_hwid = YAPI.getFirstHardwareId('ColorLedCluster');
        if(next_hwid == null) return null;
        return YColorLedCluster.FindColorLedCluster(next_hwid);
    }

    //--- (end of YColorLedCluster implementation)

    //--- (YColorLedCluster initialization)
    YColorLedCluster = YFunction._Subclass(_YColorLedCluster, {
        // Constants
        ACTIVELEDCOUNT_INVALID      : YAPI_INVALID_UINT,
        MAXLEDCOUNT_INVALID         : YAPI_INVALID_UINT,
        BLINKSEQMAXCOUNT_INVALID    : YAPI_INVALID_UINT,
        BLINKSEQMAXSIZE_INVALID     : YAPI_INVALID_UINT,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindColorLedCluster         : YColorLedCluster_FindColorLedCluster,
        FirstColorLedCluster        : YColorLedCluster_FirstColorLedCluster
    }, {
        // Methods
        get_activeLedCount          : YColorLedCluster_get_activeLedCount,
        activeLedCount              : YColorLedCluster_get_activeLedCount,
        get_activeLedCount_async    : YColorLedCluster_get_activeLedCount_async,
        activeLedCount_async        : YColorLedCluster_get_activeLedCount_async,
        set_activeLedCount          : YColorLedCluster_set_activeLedCount,
        setActiveLedCount           : YColorLedCluster_set_activeLedCount,
        get_maxLedCount             : YColorLedCluster_get_maxLedCount,
        maxLedCount                 : YColorLedCluster_get_maxLedCount,
        get_maxLedCount_async       : YColorLedCluster_get_maxLedCount_async,
        maxLedCount_async           : YColorLedCluster_get_maxLedCount_async,
        get_blinkSeqMaxCount        : YColorLedCluster_get_blinkSeqMaxCount,
        blinkSeqMaxCount            : YColorLedCluster_get_blinkSeqMaxCount,
        get_blinkSeqMaxCount_async  : YColorLedCluster_get_blinkSeqMaxCount_async,
        blinkSeqMaxCount_async      : YColorLedCluster_get_blinkSeqMaxCount_async,
        get_blinkSeqMaxSize         : YColorLedCluster_get_blinkSeqMaxSize,
        blinkSeqMaxSize             : YColorLedCluster_get_blinkSeqMaxSize,
        get_blinkSeqMaxSize_async   : YColorLedCluster_get_blinkSeqMaxSize_async,
        blinkSeqMaxSize_async       : YColorLedCluster_get_blinkSeqMaxSize_async,
        get_command                 : YColorLedCluster_get_command,
        command                     : YColorLedCluster_get_command,
        get_command_async           : YColorLedCluster_get_command_async,
        command_async               : YColorLedCluster_get_command_async,
        set_command                 : YColorLedCluster_set_command,
        setCommand                  : YColorLedCluster_set_command,
        sendCommand                 : YColorLedCluster_sendCommand,
        set_rgbColor                : YColorLedCluster_set_rgbColor,
        setRgbColor                 : YColorLedCluster_set_rgbColor,
        set_rgbColorAtPowerOn       : YColorLedCluster_set_rgbColorAtPowerOn,
        setRgbColorAtPowerOn        : YColorLedCluster_set_rgbColorAtPowerOn,
        set_hslColor                : YColorLedCluster_set_hslColor,
        setHslColor                 : YColorLedCluster_set_hslColor,
        rgb_move                    : YColorLedCluster_rgb_move,
        hsl_move                    : YColorLedCluster_hsl_move,
        addRgbMoveToBlinkSeq        : YColorLedCluster_addRgbMoveToBlinkSeq,
        addHslMoveToBlinkSeq        : YColorLedCluster_addHslMoveToBlinkSeq,
        addMirrorToBlinkSeq         : YColorLedCluster_addMirrorToBlinkSeq,
        linkLedToBlinkSeq           : YColorLedCluster_linkLedToBlinkSeq,
        linkLedToBlinkSeqAtPowerOn  : YColorLedCluster_linkLedToBlinkSeqAtPowerOn,
        linkLedToPeriodicBlinkSeq   : YColorLedCluster_linkLedToPeriodicBlinkSeq,
        unlinkLedFromBlinkSeq       : YColorLedCluster_unlinkLedFromBlinkSeq,
        startBlinkSeq               : YColorLedCluster_startBlinkSeq,
        stopBlinkSeq                : YColorLedCluster_stopBlinkSeq,
        resetBlinkSeq               : YColorLedCluster_resetBlinkSeq,
        set_blinkSeqStateAtPowerOn  : YColorLedCluster_set_blinkSeqStateAtPowerOn,
        setBlinkSeqStateAtPowerOn   : YColorLedCluster_set_blinkSeqStateAtPowerOn,
        set_blinkSeqSpeed           : YColorLedCluster_set_blinkSeqSpeed,
        setBlinkSeqSpeed            : YColorLedCluster_set_blinkSeqSpeed,
        saveLedsConfigAtPowerOn     : YColorLedCluster_saveLedsConfigAtPowerOn,
        saveLedsState               : YColorLedCluster_saveLedsState,
        saveBlinkSeq                : YColorLedCluster_saveBlinkSeq,
        set_rgbColorBuffer          : YColorLedCluster_set_rgbColorBuffer,
        setRgbColorBuffer           : YColorLedCluster_set_rgbColorBuffer,
        set_rgbColorArray           : YColorLedCluster_set_rgbColorArray,
        setRgbColorArray            : YColorLedCluster_set_rgbColorArray,
        rgbArray_move               : YColorLedCluster_rgbArray_move,
        set_hslColorBuffer          : YColorLedCluster_set_hslColorBuffer,
        setHslColorBuffer           : YColorLedCluster_set_hslColorBuffer,
        set_hslColorArray           : YColorLedCluster_set_hslColorArray,
        setHslColorArray            : YColorLedCluster_set_hslColorArray,
        hslArray_move               : YColorLedCluster_hslArray_move,
        get_rgbColorBuffer          : YColorLedCluster_get_rgbColorBuffer,
        rgbColorBuffer              : YColorLedCluster_get_rgbColorBuffer,
        get_rgbColorArray           : YColorLedCluster_get_rgbColorArray,
        rgbColorArray               : YColorLedCluster_get_rgbColorArray,
        get_rgbColorArrayAtPowerOn  : YColorLedCluster_get_rgbColorArrayAtPowerOn,
        rgbColorArrayAtPowerOn      : YColorLedCluster_get_rgbColorArrayAtPowerOn,
        get_linkedSeqArray          : YColorLedCluster_get_linkedSeqArray,
        linkedSeqArray              : YColorLedCluster_get_linkedSeqArray,
        get_blinkSeqSignatures      : YColorLedCluster_get_blinkSeqSignatures,
        blinkSeqSignatures          : YColorLedCluster_get_blinkSeqSignatures,
        get_blinkSeqStateSpeed      : YColorLedCluster_get_blinkSeqStateSpeed,
        blinkSeqStateSpeed          : YColorLedCluster_get_blinkSeqStateSpeed,
        get_blinkSeqStateAtPowerOn  : YColorLedCluster_get_blinkSeqStateAtPowerOn,
        blinkSeqStateAtPowerOn      : YColorLedCluster_get_blinkSeqStateAtPowerOn,
        get_blinkSeqState           : YColorLedCluster_get_blinkSeqState,
        blinkSeqState               : YColorLedCluster_get_blinkSeqState,
        nextColorLedCluster         : YColorLedCluster_nextColorLedCluster,
        _parseAttr                  : YColorLedCluster_parseAttr
    });
    //--- (end of YColorLedCluster initialization)
})();

//--- (ColorLedCluster functions)

/**
 * Retrieves a RGB LED cluster for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the RGB LED cluster is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YColorLedCluster.isOnline() to test if the RGB LED cluster is
 * indeed online at a given time. In case of ambiguity when looking for
 * a RGB LED cluster by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func : a string that uniquely characterizes the RGB LED cluster
 *
 * @return a YColorLedCluster object allowing you to drive the RGB LED cluster.
 */
function yFindColorLedCluster(func)
{
    return YColorLedCluster.FindColorLedCluster(func);
}

/**
 * Starts the enumeration of RGB LED clusters currently accessible.
 * Use the method YColorLedCluster.nextColorLedCluster() to iterate on
 * next RGB LED clusters.
 *
 * @return a pointer to a YColorLedCluster object, corresponding to
 *         the first RGB LED cluster currently online, or a null pointer
 *         if there are none.
 */
function yFirstColorLedCluster()
{
    return YColorLedCluster.FirstColorLedCluster();
}

//--- (end of ColorLedCluster functions)
