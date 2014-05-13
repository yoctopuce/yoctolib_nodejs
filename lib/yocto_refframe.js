/*********************************************************************
 *
 * $Id: yocto_refframe.js 15998 2014-05-01 08:25:18Z seb $
 *
 * Implements the high-level API for RefFrame functions
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

//--- (YRefFrame return codes)
//--- (end of YRefFrame return codes)
//--- (YRefFrame definitions)
var Y_MOUNTPOSITION_BOTTOM          = 0;
var Y_MOUNTPOSITION_TOP             = 1;
var Y_MOUNTPOSITION_FRONT           = 2;
var Y_MOUNTPOSITION_RIGHT           = 3;
var Y_MOUNTPOSITION_REAR            = 4;
var Y_MOUNTPOSITION_LEFT            = 5;
var Y_MOUNTORIENTATION_TWELVE       = 0;
var Y_MOUNTORIENTATION_THREE        = 1;
var Y_MOUNTORIENTATION_SIX          = 2;
var Y_MOUNTORIENTATION_NINE         = 3;
var Y_MOUNTPOS_INVALID              = YAPI_INVALID_UINT;
var Y_BEARING_INVALID               = YAPI_INVALID_DOUBLE;
var Y_CALIBRATIONPARAM_INVALID      = YAPI_INVALID_STRING;
//--- (end of YRefFrame definitions)

//--- (YRefFrame class start)
/**
 * YRefFrame Class: Reference frame configuration
 * 
 * This class is used to setup the base orientation of the Yocto-3D, so that
 * the orientation functions, relative to the earth surface plane, use
 * the proper reference frame. The class also implements a tridimensional
 * sensor calibration process, which can compensate for local variations
 * of standard gravity and improve the precision of the tilt sensors.
 */
//--- (end of YRefFrame class start)

var YRefFrame; // definition below
(function()
{
    function _YRefFrame(str_func)
    {
        //--- (YRefFrame constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'RefFrame';

        this._mountPos                       = Y_MOUNTPOS_INVALID;         // UInt31
        this._bearing                        = Y_BEARING_INVALID;          // Decimal
        this._calibrationParam               = Y_CALIBRATIONPARAM_INVALID; // WordArray
        this._calibStage                     = 0;                          // int
        this._calibStageHint                 = "";                         // str
        this._calibStageProgress             = 0;                          // int
        this._calibProgress                  = 0;                          // int
        this._calibLogMsg                    = "";                         // str
        this._calibSavedParams               = "";                         // str
        this._calibCount                     = 0;                          // int
        this._calibInternalPos               = 0;                          // int
        this._calibPrevTick                  = 0;                          // int
        this._calibOrient                    = [];                         // intArr
        this._calibDataAccX                  = [];                         // floatArr
        this._calibDataAccY                  = [];                         // floatArr
        this._calibDataAccZ                  = [];                         // floatArr
        this._calibDataAcc                   = [];                         // floatArr
        this._calibAccXOfs                   = 0;                          // float
        this._calibAccYOfs                   = 0;                          // float
        this._calibAccZOfs                   = 0;                          // float
        this._calibAccXScale                 = 0;                          // float
        this._calibAccYScale                 = 0;                          // float
        this._calibAccZScale                 = 0;                          // float
        //--- (end of YRefFrame constructor)
    }

    //--- (YRefFrame implementation)

    function YRefFrame_parseAttr(name, val, _super)
    {
        switch(name) {
        case "mountPos":
            this._mountPos = parseInt(val);
            return 1;
        case "bearing":
            this._bearing = val/65536;
            return 1;
        case "calibrationParam":
            this._calibrationParam = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    function YRefFrame_get_mountPos()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_MOUNTPOS_INVALID;
            }
        }
        return this._mountPos;
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRefFrame object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YRefFrame_get_mountPos_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_MOUNTPOS_INVALID);
            } else {
                callback(context, obj, obj._mountPos);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YRefFrame_set_mountPos(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('mountPos',rest_val);
    }

    /**
     * Changes the reference bearing used by the compass. The relative bearing
     * indicated by the compass is the difference between the measured magnetic
     * heading and the reference bearing indicated here.
     * 
     * For instance, if you setup as reference bearing the value of the earth
     * magnetic declination, the compass will provide the orientation relative
     * to the geographic North.
     * 
     * Similarly, when the sensor is not mounted along the standard directions
     * because it has an additional yaw angle, you can set this angle in the reference
     * bearing so that the compass provides the expected natural direction.
     * 
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     * 
     * @param newval : a floating point number corresponding to the reference bearing used by the compass
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRefFrame_set_bearing(newval)
    {   var rest_val;
        rest_val = String(Math.round(newval*65536.0));
        return this._setAttr('bearing',rest_val);
    }

    /**
     * Returns the reference bearing used by the compass. The relative bearing
     * indicated by the compass is the difference between the measured magnetic
     * heading and the reference bearing indicated here.
     * 
     * @return a floating point number corresponding to the reference bearing used by the compass
     * 
     * On failure, throws an exception or returns YRefFrame.BEARING_INVALID.
     */
    function YRefFrame_get_bearing()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BEARING_INVALID;
            }
        }
        return this._bearing;
    }

    /**
     * Gets the reference bearing used by the compass. The relative bearing
     * indicated by the compass is the difference between the measured magnetic
     * heading and the reference bearing indicated here.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRefFrame object that invoked the callback
     *         - the result:a floating point number corresponding to the reference bearing used by the compass
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_BEARING_INVALID.
     */
    function YRefFrame_get_bearing_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BEARING_INVALID);
            } else {
                callback(context, obj, obj._bearing);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YRefFrame_get_calibrationParam()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_CALIBRATIONPARAM_INVALID;
            }
        }
        return this._calibrationParam;
    }

    /**
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YRefFrame object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YRefFrame_get_calibrationParam_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_CALIBRATIONPARAM_INVALID);
            } else {
                callback(context, obj, obj._calibrationParam);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YRefFrame_set_calibrationParam(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('calibrationParam',rest_val);
    }

    /**
     * Retrieves a reference frame for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the reference frame is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRefFrame.isOnline() to test if the reference frame is
     * indeed online at a given time. In case of ambiguity when looking for
     * a reference frame by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the reference frame
     * 
     * @return a YRefFrame object allowing you to drive the reference frame.
     */
    function YRefFrame_FindRefFrame(func)                       // class method
    {
        var obj;                    // YRefFrame;
        obj = YFunction._FindFromCache("RefFrame", func);
        if (obj == null) {
            obj = new YRefFrame(func);
            YFunction._AddToCache("RefFrame", func, obj);
        }
        return obj;
    }

    /**
     * Returns the installation position of the device, as configured
     * in order to define the reference frame for the compass and the
     * pitch/roll tilt sensors.
     * 
     * @return a value among the YRefFrame.MOUNTPOSITION enumeration
     *         (YRefFrame.MOUNTPOSITION_BOTTOM,   YRefFrame.MOUNTPOSITION_TOP,
     *         YRefFrame.MOUNTPOSITION_FRONT,    YRefFrame.MOUNTPOSITION_RIGHT,
     *         YRefFrame.MOUNTPOSITION_REAR,     YRefFrame.MOUNTPOSITION_LEFT),
     *         corresponding to the installation in a box, on one of the six faces.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRefFrame_get_mountPosition()
    {
        var pos;                    // int;
        pos = this.get_mountPos();
        return ((pos) >> (2));
    }

    /**
     * Returns the installation orientation of the device, as configured
     * in order to define the reference frame for the compass and the
     * pitch/roll tilt sensors.
     * 
     * @return a value among the enumeration YRefFrame.MOUNTORIENTATION
     *         (YRefFrame.MOUNTORIENTATION_TWELVE, YRefFrame.MOUNTORIENTATION_THREE,
     *         YRefFrame.MOUNTORIENTATION_SIX,     YRefFrame.MOUNTORIENTATION_NINE)
     *         corresponding to the orientation of the "X" arrow on the device,
     *         as on a clock dial seen from an observer in the center of the box.
     *         On the bottom face, the 12H orientation points to the front, while
     *         on the top face, the 12H orientation points to the rear.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRefFrame_get_mountOrientation()
    {
        var pos;                    // int;
        pos = this.get_mountPos();
        return ((pos) & (3));
    }

    /**
     * Changes the compass and tilt sensor frame of reference. The magnetic compass
     * and the tilt sensors (pitch and roll) naturally work in the plane
     * parallel to the earth surface. In case the device is not installed upright
     * and horizontally, you must select its reference orientation (parallel to
     * the earth surface) so that the measures are made relative to this position.
     * 
     * @param position : a value among the YRefFrame.MOUNTPOSITION enumeration
     *         (YRefFrame.MOUNTPOSITION_BOTTOM,   YRefFrame.MOUNTPOSITION_TOP,
     *         YRefFrame.MOUNTPOSITION_FRONT,    YRefFrame.MOUNTPOSITION_RIGHT,
     *         YRefFrame.MOUNTPOSITION_REAR,     YRefFrame.MOUNTPOSITION_LEFT),
     *         corresponding to the installation in a box, on one of the six faces.
     * @param orientation : a value among the enumeration YRefFrame.MOUNTORIENTATION
     *         (YRefFrame.MOUNTORIENTATION_TWELVE, YRefFrame.MOUNTORIENTATION_THREE,
     *         YRefFrame.MOUNTORIENTATION_SIX,     YRefFrame.MOUNTORIENTATION_NINE)
     *         corresponding to the orientation of the "X" arrow on the device,
     *         as on a clock dial seen from an observer in the center of the box.
     *         On the bottom face, the 12H orientation points to the front, while
     *         on the top face, the 12H orientation points to the rear.
     * 
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRefFrame_set_mountPosition(position,orientation)
    {
        var pos;                    // int;
        pos = ((position) << (2)) + orientation;
        return this.set_mountPos(pos);
    }

    function YRefFrame_calibSort(start,stopidx)
    {
        var idx;                    // int;
        var changed;                // int;
        var a;                      // float;
        var b;                      // float;
        var xa;                     // float;
        var xb;                     // float;
        
        // bubble sort is good since we will re-sort again after offset adjustment
        changed = 1;
        while (changed > 0) {
            changed = 0;
            a = this._calibDataAcc[start];
            idx = start + 1;
            while (idx < stopidx) {
                b = this._calibDataAcc[idx];
                if (a > b) {
                    this._calibDataAcc[ idx-1] = b;
                    this._calibDataAcc[ idx] = a;
                    xa = this._calibDataAccX[idx-1];
                    xb = this._calibDataAccX[idx];
                    this._calibDataAccX[ idx-1] = xb;
                    this._calibDataAccX[ idx] = xa;
                    xa = this._calibDataAccY[idx-1];
                    xb = this._calibDataAccY[idx];
                    this._calibDataAccY[ idx-1] = xb;
                    this._calibDataAccY[ idx] = xa;
                    xa = this._calibDataAccZ[idx-1];
                    xb = this._calibDataAccZ[idx];
                    this._calibDataAccZ[ idx-1] = xb;
                    this._calibDataAccZ[ idx] = xa;
                    changed = changed + 1;
                } else {
                    a = b;
                }
                idx = idx + 1;
            }
        }
        return 0;
    }

    /**
     * Initiates the sensors tridimensional calibration process.
     * This calibration is used at low level for inertial position estimation
     * and to enhance the precision of the tilt sensors.
     * 
     * After calling this method, the device should be moved according to the
     * instructions provided by method get_3DCalibrationHint,
     * and more3DCalibration should be invoked about 5 times per second.
     * The calibration procedure is completed when the method
     * get_3DCalibrationProgress returns 100. At this point,
     * the computed calibration parameters can be applied using method
     * save3DCalibration. The calibration process can be canceled
     * at any time using method cancel3DCalibration.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRefFrame_start3DCalibration()
    {
        if (!(this.isOnline())) {
            return YAPI_DEVICE_NOT_FOUND;
        }
        if (this._calibStage != 0) {
            this.cancel3DCalibration();
        }
        this._calibSavedParams = this.get_calibrationParam();
        this.set_calibrationParam("0");
        this._calibCount = 50;
        this._calibStage = 1;
        this._calibStageHint = "Set down the device on a steady horizontal surface";
        this._calibStageProgress = 0;
        this._calibProgress = 1;
        this._calibInternalPos = 0;
        this._calibPrevTick = ((YAPI.GetTickCount()) & (0x7FFFFFFF));
        this._calibOrient.length = 0;
        this._calibDataAccX.length = 0;
        this._calibDataAccY.length = 0;
        this._calibDataAccZ.length = 0;
        this._calibDataAcc.length = 0;
        return YAPI_SUCCESS;
    }

    /**
     * Continues the sensors tridimensional calibration process previously
     * initiated using method start3DCalibration.
     * This method should be called approximately 5 times per second, while
     * positioning the device according to the instructions provided by method
     * get_3DCalibrationHint. Note that the instructions change during
     * the calibration process.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRefFrame_more3DCalibration()
    {
        var currTick;               // int;
        var jsonData;               // bin;
        var xVal;                   // float;
        var yVal;                   // float;
        var zVal;                   // float;
        var xSq;                    // float;
        var ySq;                    // float;
        var zSq;                    // float;
        var norm;                   // float;
        var orient;                 // int;
        var idx;                    // int;
        var pos;                    // int;
        var err;                    // int;
        // make sure calibration has been started
        if (this._calibStage == 0) {
            return YAPI_INVALID_ARGUMENT;
        }
        if (this._calibProgress == 100) {
            return YAPI_SUCCESS;
        }
        
        // make sure we leave at least 160ms between samples
        currTick =  ((YAPI.GetTickCount()) & (0x7FFFFFFF));
        if (((currTick - this._calibPrevTick) & (0x7FFFFFFF)) < 160) {
            return YAPI_SUCCESS;
        }
        // load current accelerometer values, make sure we are on a straight angle
        // (default timeout to 0,5 sec without reading measure when out of range)
        this._calibStageHint = "Set down the device on a steady horizontal surface";
        this._calibPrevTick = ((currTick + 500) & (0x7FFFFFFF));
        jsonData = this._download("api/accelerometer.json");
        xVal = parseInt(this._json_get_key(jsonData, "xValue")) / 65536.0;
        yVal = parseInt(this._json_get_key(jsonData, "yValue")) / 65536.0;
        zVal = parseInt(this._json_get_key(jsonData, "zValue")) / 65536.0;
        xSq = xVal * xVal;
        if (xSq >= 0.04 && xSq < 0.64) {
            return YAPI_SUCCESS;
        }
        if (xSq >= 1.44) {
            return YAPI_SUCCESS;
        }
        ySq = yVal * yVal;
        if (ySq >= 0.04 && ySq < 0.64) {
            return YAPI_SUCCESS;
        }
        if (ySq >= 1.44) {
            return YAPI_SUCCESS;
        }
        zSq = zVal * zVal;
        if (zSq >= 0.04 && zSq < 0.64) {
            return YAPI_SUCCESS;
        }
        if (zSq >= 1.44) {
            return YAPI_SUCCESS;
        }
        norm = Math.sqrt(xSq + ySq + zSq);
        if (norm < 0.8 || norm > 1.2) {
            return YAPI_SUCCESS;
        }
        this._calibPrevTick = currTick;
        
        // Determine the device orientation index
        if (zSq > 0.5) {
            if (zVal > 0) {
                orient = 0;
            } else {
                orient = 1;
            }
        }
        if (xSq > 0.5) {
            if (xVal > 0) {
                orient = 2;
            } else {
                orient = 3;
            }
        }
        if (ySq > 0.5) {
            if (yVal > 0) {
                orient = 4;
            } else {
                orient = 5;
            }
        }
        
        // Discard measures that are not in the proper orientation
        if (this._calibStageProgress == 0) {
            idx = 0;
            err = 0;
            while (idx + 1 < this._calibStage) {
                if (this._calibOrient[idx] == orient) {
                    err = 1;
                }
                idx = idx + 1;
            }
            if (err != 0) {
                this._calibStageHint = "Turn the device on another face";
                return YAPI_SUCCESS;
            }
            this._calibOrient.push(orient);
        } else {
            if (orient != this._calibOrient[this._calibStage-1]) {
                this._calibStageHint = "Not yet done, please move back to the previous face";
                return YAPI_SUCCESS;
            }
        }
        
        // Save measure
        this._calibStageHint = "calibrating..";
        this._calibDataAccX.push(xVal);
        this._calibDataAccY.push(yVal);
        this._calibDataAccZ.push(zVal);
        this._calibDataAcc.push(norm);
        this._calibInternalPos = this._calibInternalPos + 1;
        this._calibProgress = 1 + 16 * (this._calibStage - 1) + parseInt((16 * this._calibInternalPos) / (this._calibCount));
        if (this._calibInternalPos < this._calibCount) {
            this._calibStageProgress = 1 + parseInt((99 * this._calibInternalPos) / (this._calibCount));
            return YAPI_SUCCESS;
        }
        
        // Stage done, compute preliminary result
        pos = (this._calibStage - 1) * this._calibCount;
        this._calibSort(pos, pos + this._calibCount);
        pos = pos + parseInt((this._calibCount) / (2));
        this._calibLogMsg = "Stage "+String(Math.round(this._calibStage))+": median is "+String(Math.round(Math.round(1000*this._calibDataAccX[pos])))+","+String(Math.round(Math.round(1000*this._calibDataAccY[pos])))+","+String(Math.round(Math.round(1000*this._calibDataAccZ[pos])));
        
        // move to next stage
        this._calibStage = this._calibStage + 1;
        if (this._calibStage < 7) {
            this._calibStageHint = "Turn the device on another face";
            this._calibPrevTick = ((currTick + 500) & (0x7FFFFFFF));
            this._calibStageProgress = 0;
            this._calibInternalPos = 0;
            return YAPI_SUCCESS;
        }
        // Data collection completed, compute accelerometer shift
        xVal = 0;
        yVal = 0;
        zVal = 0;
        idx = 0;
        while (idx < 6) {
            pos = idx * this._calibCount + parseInt((this._calibCount) / (2));
            orient = this._calibOrient[idx];
            if (orient == 0 || orient == 1) {
                zVal = zVal + this._calibDataAccZ[pos];
            }
            if (orient == 2 || orient == 3) {
                xVal = xVal + this._calibDataAccX[pos];
            }
            if (orient == 4 || orient == 5) {
                yVal = yVal + this._calibDataAccY[pos];
            }
            idx = idx + 1;
        }
        this._calibAccXOfs = xVal / 2.0;
        this._calibAccYOfs = yVal / 2.0;
        this._calibAccZOfs = zVal / 2.0;
        
        // Recompute all norms, taking into account the computed shift, and re-sort
        pos = 0;
        while (pos < this._calibDataAcc.length) {
            xVal = this._calibDataAccX[pos] - this._calibAccXOfs;
            yVal = this._calibDataAccY[pos] - this._calibAccYOfs;
            zVal = this._calibDataAccZ[pos] - this._calibAccZOfs;
            norm = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
            this._calibDataAcc[ pos] = norm;
            pos = pos + 1;
        }
        idx = 0;
        while (idx < 6) {
            pos = idx * this._calibCount;
            this._calibSort(pos, pos + this._calibCount);
            idx = idx + 1;
        }
        
        // Compute the scaling factor for each axis
        xVal = 0;
        yVal = 0;
        zVal = 0;
        idx = 0;
        while (idx < 6) {
            pos = idx * this._calibCount + parseInt((this._calibCount) / (2));
            orient = this._calibOrient[idx];
            if (orient == 0 || orient == 1) {
                zVal = zVal + this._calibDataAcc[pos];
            }
            if (orient == 2 || orient == 3) {
                xVal = xVal + this._calibDataAcc[pos];
            }
            if (orient == 4 || orient == 5) {
                yVal = yVal + this._calibDataAcc[pos];
            }
            idx = idx + 1;
        }
        this._calibAccXScale = xVal / 2.0;
        this._calibAccYScale = yVal / 2.0;
        this._calibAccZScale = zVal / 2.0;
        
        // Report completion
        this._calibProgress = 100;
        this._calibStageHint = "Calibration data ready for saving";
        return YAPI_SUCCESS;
    }

    /**
     * Returns instructions to proceed to the tridimensional calibration initiated with
     * method start3DCalibration.
     * 
     * @return a character string.
     */
    function YRefFrame_get_3DCalibrationHint()
    {
        return this._calibStageHint;
    }

    /**
     * Returns the global process indicator for the tridimensional calibration
     * initiated with method start3DCalibration.
     * 
     * @return an integer between 0 (not started) and 100 (stage completed).
     */
    function YRefFrame_get_3DCalibrationProgress()
    {
        return this._calibProgress;
    }

    /**
     * Returns index of the current stage of the calibration
     * initiated with method start3DCalibration.
     * 
     * @return an integer, growing each time a calibration stage is completed.
     */
    function YRefFrame_get_3DCalibrationStage()
    {
        return this._calibStage;
    }

    /**
     * Returns the process indicator for the current stage of the calibration
     * initiated with method start3DCalibration.
     * 
     * @return an integer between 0 (not started) and 100 (stage completed).
     */
    function YRefFrame_get_3DCalibrationStageProgress()
    {
        return this._calibStageProgress;
    }

    /**
     * Returns the latest log message from the calibration process.
     * When no new message is available, returns an empty string.
     * 
     * @return a character string.
     */
    function YRefFrame_get_3DCalibrationLogMsg()
    {
        var msg;                    // str;
        msg = this._calibLogMsg;
        this._calibLogMsg = "";
        return msg;
    }

    /**
     * Applies the sensors tridimensional calibration parameters that have just been computed.
     * Remember to call the saveToFlash()  method of the module if the changes
     * must be kept when the device is restarted.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRefFrame_save3DCalibration()
    {
        var shiftX;                 // int;
        var shiftY;                 // int;
        var shiftZ;                 // int;
        var scaleExp;               // int;
        var scaleX;                 // int;
        var scaleY;                 // int;
        var scaleZ;                 // int;
        var scaleLo;                // int;
        var scaleHi;                // int;
        var newcalib;               // str;
        if (this._calibProgress != 100) {
            return YAPI_INVALID_ARGUMENT;
        }
        
        // Compute integer values (correction unit is 732ug/count)
        shiftX = -Math.round(this._calibAccXOfs / 0.000732);
        if (shiftX < 0) {
            shiftX = shiftX + 65536;
        }
        shiftY = -Math.round(this._calibAccYOfs / 0.000732);
        if (shiftY < 0) {
            shiftY = shiftY + 65536;
        }
        shiftZ = -Math.round(this._calibAccZOfs / 0.000732);
        if (shiftZ < 0) {
            shiftZ = shiftZ + 65536;
        }
        scaleX = Math.round(2048.0 / this._calibAccXScale) - 2048;
        scaleY = Math.round(2048.0 / this._calibAccYScale) - 2048;
        scaleZ = Math.round(2048.0 / this._calibAccZScale) - 2048;
        if (scaleX < -2048 || scaleX >= 2048 || scaleY < -2048 || scaleY >= 2048 || scaleZ < -2048 || scaleZ >= 2048) {
            scaleExp = 3;
            if (scaleX < -1024 || scaleX >= 1024 || scaleY < -1024 || scaleY >= 1024 || scaleZ < -1024 || scaleZ >= 1024) {
                scaleExp = 2;
                if (scaleX < -512 || scaleX >= 512 || scaleY < -512 || scaleY >= 512 || scaleZ < -512 || scaleZ >= 512) {
                    scaleExp = 1;
                } else {
                    scaleExp = 0;
                }
            }
        }
        if (scaleExp > 0) {
            scaleX = ((scaleX) >> (scaleExp));
            scaleY = ((scaleY) >> (scaleExp));
            scaleZ = ((scaleZ) >> (scaleExp));
        }
        if (scaleX < 0) {
            scaleX = scaleX + 1024;
        }
        if (scaleY < 0) {
            scaleY = scaleY + 1024;
        }
        if (scaleZ < 0) {
            scaleZ = scaleZ + 1024;
        }
        scaleLo = ((((scaleY) & (15))) << (12)) + ((scaleX) << (2)) + scaleExp;
        scaleHi = ((scaleZ) << (6)) + ((scaleY) >> (4));
        
        // Save calibration parameters
        newcalib = "5,"+String(Math.round(shiftX))+","+String(Math.round(shiftY))+","+String(Math.round(shiftZ))+","+String(Math.round(scaleLo))+","+String(Math.round(scaleHi));
        this._calibStage = 0;
        return this.set_calibrationParam(newcalib);
    }

    /**
     * Aborts the sensors tridimensional calibration process et restores normal settings.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YRefFrame_cancel3DCalibration()
    {
        if (this._calibStage == 0) {
            return YAPI_SUCCESS;
        }
        // may throw an exception
        this._calibStage = 0;
        return this.set_calibrationParam(this._calibSavedParams);
    }

    /**
     * Continues the enumeration of reference frames started using yFirstRefFrame().
     * 
     * @return a pointer to a YRefFrame object, corresponding to
     *         a reference frame currently online, or a null pointer
     *         if there are no more reference frames to enumerate.
     */
    function YRefFrame_nextRefFrame()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YRefFrame.FindRefFrame(next_hwid);
    }

    /**
     * Starts the enumeration of reference frames currently accessible.
     * Use the method YRefFrame.nextRefFrame() to iterate on
     * next reference frames.
     * 
     * @return a pointer to a YRefFrame object, corresponding to
     *         the first reference frame currently online, or a null pointer
     *         if there are none.
     */
    function YRefFrame_FirstRefFrame()
    {
        var next_hwid = YAPI.getFirstHardwareId('RefFrame');
        if(next_hwid == null) return null;
        return YRefFrame.FindRefFrame(next_hwid);
    }

    //--- (end of YRefFrame implementation)

    //--- (YRefFrame initialization)
    YRefFrame = YFunction._Subclass(_YRefFrame, {
        // Constants
        MOUNTPOS_INVALID            : YAPI_INVALID_UINT,
        BEARING_INVALID             : YAPI_INVALID_DOUBLE,
        CALIBRATIONPARAM_INVALID    : YAPI_INVALID_STRING,
        MOUNTPOSITION_BOTTOM        : 0,
        MOUNTPOSITION_TOP           : 1,
        MOUNTPOSITION_FRONT         : 2,
        MOUNTPOSITION_RIGHT         : 3,
        MOUNTPOSITION_REAR          : 4,
        MOUNTPOSITION_LEFT          : 5,
        MOUNTORIENTATION_TWELVE     : 0,
        MOUNTORIENTATION_THREE      : 1,
        MOUNTORIENTATION_SIX        : 2,
        MOUNTORIENTATION_NINE       : 3
    }, {
        // Class methods
        FindRefFrame                : YRefFrame_FindRefFrame,
        FirstRefFrame               : YRefFrame_FirstRefFrame
    }, {
        // Methods
        get_mountPos                : YRefFrame_get_mountPos,
        mountPos                    : YRefFrame_get_mountPos,
        get_mountPos_async          : YRefFrame_get_mountPos_async,
        mountPos_async              : YRefFrame_get_mountPos_async,
        set_mountPos                : YRefFrame_set_mountPos,
        setMountPos                 : YRefFrame_set_mountPos,
        set_bearing                 : YRefFrame_set_bearing,
        setBearing                  : YRefFrame_set_bearing,
        get_bearing                 : YRefFrame_get_bearing,
        bearing                     : YRefFrame_get_bearing,
        get_bearing_async           : YRefFrame_get_bearing_async,
        bearing_async               : YRefFrame_get_bearing_async,
        get_calibrationParam        : YRefFrame_get_calibrationParam,
        calibrationParam            : YRefFrame_get_calibrationParam,
        get_calibrationParam_async  : YRefFrame_get_calibrationParam_async,
        calibrationParam_async      : YRefFrame_get_calibrationParam_async,
        set_calibrationParam        : YRefFrame_set_calibrationParam,
        setCalibrationParam         : YRefFrame_set_calibrationParam,
        get_mountPosition           : YRefFrame_get_mountPosition,
        mountPosition               : YRefFrame_get_mountPosition,
        get_mountOrientation        : YRefFrame_get_mountOrientation,
        mountOrientation            : YRefFrame_get_mountOrientation,
        set_mountPosition           : YRefFrame_set_mountPosition,
        setMountPosition            : YRefFrame_set_mountPosition,
        _calibSort                  : YRefFrame_calibSort,
        start3DCalibration          : YRefFrame_start3DCalibration,
        more3DCalibration           : YRefFrame_more3DCalibration,
        get_3DCalibrationHint       : YRefFrame_get_3DCalibrationHint,
        get_3DCalibrationProgress   : YRefFrame_get_3DCalibrationProgress,
        get_3DCalibrationStage      : YRefFrame_get_3DCalibrationStage,
        get_3DCalibrationStageProgress : YRefFrame_get_3DCalibrationStageProgress,
        get_3DCalibrationLogMsg     : YRefFrame_get_3DCalibrationLogMsg,
        save3DCalibration           : YRefFrame_save3DCalibration,
        cancel3DCalibration         : YRefFrame_cancel3DCalibration,
        nextRefFrame                : YRefFrame_nextRefFrame,
        _parseAttr                  : YRefFrame_parseAttr
    });
    //--- (end of YRefFrame initialization)
})();

//--- (RefFrame functions)

/**
 * Retrieves a reference frame for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the reference frame is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YRefFrame.isOnline() to test if the reference frame is
 * indeed online at a given time. In case of ambiguity when looking for
 * a reference frame by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the reference frame
 * 
 * @return a YRefFrame object allowing you to drive the reference frame.
 */
function yFindRefFrame(func)
{
    return YRefFrame.FindRefFrame(func);
}

/**
 * Starts the enumeration of reference frames currently accessible.
 * Use the method YRefFrame.nextRefFrame() to iterate on
 * next reference frames.
 * 
 * @return a pointer to a YRefFrame object, corresponding to
 *         the first reference frame currently online, or a null pointer
 *         if there are none.
 */
function yFirstRefFrame()
{
    return YRefFrame.FirstRefFrame();
}

//--- (end of RefFrame functions)
