/*********************************************************************
 *
 * $Id: yocto_gyro.js 15402 2014-03-12 16:23:14Z mvuilleu $
 *
 * Implements the high-level API for Gyro functions
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

//--- (generated code: YQt return codes)
//--- (end of generated code: YQt return codes)
//--- (generated code: YQt definitions)
//--- (end of generated code: YQt definitions)

//--- (generated code: YGyro return codes)
//--- (end of generated code: YGyro return codes)
//--- (generated code: YGyro definitions)
var Y_XVALUE_INVALID                = YAPI_INVALID_DOUBLE;
var Y_YVALUE_INVALID                = YAPI_INVALID_DOUBLE;
var Y_ZVALUE_INVALID                = YAPI_INVALID_DOUBLE;
//--- (end of generated code: YGyro definitions)

//--- (generated code: YQt class start)
/**
 * YQt Class: Quaternion interface
 * 
 * The Yoctopuce API YQt class provides direct access to the Yocto3D attitude estimation
 * using a quaternion. It is usually not needed to use the YQt class directly, as the
 * YGyro class provides a more convenient higher-level interface.
 */
//--- (end of generated code: YQt class start)

var YQt; // definition below
(function()
{
    function _YQt(str_func)
    {
        //--- (generated code: YQt constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Qt';

        //--- (end of generated code: YQt constructor)
    }

    //--- (generated code: YQt implementation)

    /**
     * Retrieves a quaternion component for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the quaternion component is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQt.isOnline() to test if the quaternion component is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quaternion component by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the quaternion component
     * 
     * @return a YQt object allowing you to drive the quaternion component.
     */
    function YQt_FindQt(func)                                   // class method
    {
        var obj;                    // YQt;
        obj = YFunction._FindFromCache("Qt", func);
        if (obj == null) {
            obj = new YQt(func);
            YFunction._AddToCache("Qt", func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of quaternion components started using yFirstQt().
     * 
     * @return a pointer to a YQt object, corresponding to
     *         a quaternion component currently online, or a null pointer
     *         if there are no more quaternion components to enumerate.
     */
    function YQt_nextQt()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YQt.FindQt(next_hwid);
    }

    /**
     * Starts the enumeration of quaternion components currently accessible.
     * Use the method YQt.nextQt() to iterate on
     * next quaternion components.
     * 
     * @return a pointer to a YQt object, corresponding to
     *         the first quaternion component currently online, or a null pointer
     *         if there are none.
     */
    function YQt_FirstQt()
    {
        var next_hwid = YAPI.getFirstHardwareId('Qt');
        if(next_hwid == null) return null;
        return YQt.FindQt(next_hwid);
    }

    //--- (end of generated code: YQt implementation)

    //--- (generated code: YQt initialization)
    YQt = YSensor._Subclass(_YQt, {
    }, {
        // Class methods
        FindQt                      : YQt_FindQt,
        FirstQt                     : YQt_FirstQt
    }, {
        // Methods
        nextQt                      : YQt_nextQt
    });
    //--- (end of generated code: YQt initialization)
})();

//--- (generated code: Qt functions)

/**
 * Retrieves a quaternion component for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the quaternion component is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YQt.isOnline() to test if the quaternion component is
 * indeed online at a given time. In case of ambiguity when looking for
 * a quaternion component by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the quaternion component
 * 
 * @return a YQt object allowing you to drive the quaternion component.
 */
function yFindQt(func)
{
    return YQt.FindQt(func);
}

/**
 * Starts the enumeration of quaternion components currently accessible.
 * Use the method YQt.nextQt() to iterate on
 * next quaternion components.
 * 
 * @return a pointer to a YQt object, corresponding to
 *         the first quaternion component currently online, or a null pointer
 *         if there are none.
 */
function yFirstQt()
{
    return YQt.FirstQt();
}

//--- (end of generated code: Qt functions)

function yInternalGyroCallback(YQt_obj, str_value)
{
    var gyro = YQt_obj.get_userData();
    if(!gyro) return;
    var idx = parseInt(YQt_obj.get_functionId().slice(2));
    gyro._invokeGyroCallbacks(idx, parseInt(str_value));
}

//--- (generated code: YGyro class start)
/**
 * YGyro Class: Gyroscope function interface
 * 
 * The Yoctopuce application programming interface allows you to read an instant
 * measure of the sensor, as well as the minimal and maximal values observed.
 */
//--- (end of generated code: YGyro class start)

var YGyro; // definition below
(function()
{
    function _YGyro(str_func)
    {
        //--- (generated code: YGyro constructor)
        // inherit from YSensor
        YSensor.call(this, str_func);
        this._className = 'Gyro';

        this._xValue                         = Y_XVALUE_INVALID;           // Decimal
        this._yValue                         = Y_YVALUE_INVALID;           // Decimal
        this._zValue                         = Y_ZVALUE_INVALID;           // Decimal
        this._qt_stamp                       = 0;                          // int
        this._qt_w                           = null;                       // YQt
        this._qt_x                           = null;                       // YQt
        this._qt_y                           = null;                       // YQt
        this._qt_z                           = null;                       // YQt
        this._w                              = 0;                          // float
        this._x                              = 0;                          // float
        this._y                              = 0;                          // float
        this._z                              = 0;                          // float
        this._angles_stamp                   = 0;                          // int
        this._head                           = 0;                          // float
        this._pitch                          = 0;                          // float
        this._roll                           = 0;                          // float
        this._quatCallback                   = null;                       // YQuatCallback
        this._anglesCallback                 = null;                       // YAnglesCallback
        //--- (end of generated code: YGyro constructor)
    }

    //--- (generated code: YGyro implementation)

    function YGyro_parseAttr(name, val, _super)
    {
        switch(name) {
        case "xValue":
            this._xValue = val/65536;
            return 1;
        case "yValue":
            this._yValue = val/65536;
            return 1;
        case "zValue":
            this._zValue = val/65536;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns the angular velocity around the X axis of the device, as a floating point number.
     * 
     * @return a floating point number corresponding to the angular velocity around the X axis of the
     * device, as a floating point number
     * 
     * On failure, throws an exception or returns YGyro.XVALUE_INVALID.
     */
    function YGyro_get_xValue()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_XVALUE_INVALID;
            }
        }
        return this._xValue;
    }

    /**
     * Gets the angular velocity around the X axis of the device, as a floating point number.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGyro object that invoked the callback
     *         - the result:a floating point number corresponding to the angular velocity around the X axis of the
     *         device, as a floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_XVALUE_INVALID.
     */
    function YGyro_get_xValue_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_XVALUE_INVALID);
            } else {
                callback(context, obj, obj._xValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the angular velocity around the Y axis of the device, as a floating point number.
     * 
     * @return a floating point number corresponding to the angular velocity around the Y axis of the
     * device, as a floating point number
     * 
     * On failure, throws an exception or returns YGyro.YVALUE_INVALID.
     */
    function YGyro_get_yValue()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_YVALUE_INVALID;
            }
        }
        return this._yValue;
    }

    /**
     * Gets the angular velocity around the Y axis of the device, as a floating point number.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGyro object that invoked the callback
     *         - the result:a floating point number corresponding to the angular velocity around the Y axis of the
     *         device, as a floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_YVALUE_INVALID.
     */
    function YGyro_get_yValue_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_YVALUE_INVALID);
            } else {
                callback(context, obj, obj._yValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the angular velocity around the Z axis of the device, as a floating point number.
     * 
     * @return a floating point number corresponding to the angular velocity around the Z axis of the
     * device, as a floating point number
     * 
     * On failure, throws an exception or returns YGyro.ZVALUE_INVALID.
     */
    function YGyro_get_zValue()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ZVALUE_INVALID;
            }
        }
        return this._zValue;
    }

    /**
     * Gets the angular velocity around the Z axis of the device, as a floating point number.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YGyro object that invoked the callback
     *         - the result:a floating point number corresponding to the angular velocity around the Z axis of the
     *         device, as a floating point number
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ZVALUE_INVALID.
     */
    function YGyro_get_zValue_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ZVALUE_INVALID);
            } else {
                callback(context, obj, obj._zValue);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Retrieves a gyroscope for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the gyroscope is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGyro.isOnline() to test if the gyroscope is
     * indeed online at a given time. In case of ambiguity when looking for
     * a gyroscope by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the gyroscope
     * 
     * @return a YGyro object allowing you to drive the gyroscope.
     */
    function YGyro_FindGyro(func)                               // class method
    {
        var obj;                    // YGyro;
        obj = YFunction._FindFromCache("Gyro", func);
        if (obj == null) {
            obj = new YGyro(func);
            YFunction._AddToCache("Gyro", func, obj);
        }
        return obj;
    }

    function YGyro_loadQuaternion()
    {
        var now_stamp;              // int;
        var age_ms;                 // int;
        
        now_stamp = ((YAPI.GetTickCount()) & (0x7FFFFFFF));
        age_ms = (((now_stamp - this._qt_stamp)) & (0x7FFFFFFF));
        if ((age_ms >= 10) || (this._qt_stamp == 0)) {
            if (this.load(10) != YAPI_SUCCESS) {
                return YAPI_DEVICE_NOT_FOUND;
            }
            if (this._qt_stamp == 0) {
                this._qt_w = YQt.FindQt(""+this._serial+".qt1");
                this._qt_x = YQt.FindQt(""+this._serial+".qt2");
                this._qt_y = YQt.FindQt(""+this._serial+".qt3");
                this._qt_z = YQt.FindQt(""+this._serial+".qt4");
            }
            if (this._qt_w.load(9) != YAPI_SUCCESS) {
                return YAPI_DEVICE_NOT_FOUND;
            }
            if (this._qt_x.load(9) != YAPI_SUCCESS) {
                return YAPI_DEVICE_NOT_FOUND;
            }
            if (this._qt_y.load(9) != YAPI_SUCCESS) {
                return YAPI_DEVICE_NOT_FOUND;
            }
            if (this._qt_z.load(9) != YAPI_SUCCESS) {
                return YAPI_DEVICE_NOT_FOUND;
            }
            this._w = this._qt_w.get_currentValue();
            this._x = this._qt_x.get_currentValue();
            this._y = this._qt_y.get_currentValue();
            this._z = this._qt_z.get_currentValue();
            this._qt_stamp = now_stamp;
        }
        return YAPI_SUCCESS;
    }

    function YGyro_loadAngles()
    {
        var sqw;                    // float;
        var sqx;                    // float;
        var sqy;                    // float;
        var sqz;                    // float;
        var norm;                   // float;
        var delta;                  // float;
        // may throw an exception
        if (this._loadQuaternion() != YAPI_SUCCESS) {
            return YAPI_DEVICE_NOT_FOUND;
        }
        if (this._angles_stamp != this._qt_stamp) {
            sqw = this._w * this._w;
            sqx = this._x * this._x;
            sqy = this._y * this._y;
            sqz = this._z * this._z;
            norm = sqx + sqy + sqz + sqw;
            delta = this._y * this._w - this._x * this._z;
            if (delta > 0.499 * norm) {
                this._pitch = 90.0;
                this._head  = Math.round(2.0 * 1800.0/Math.PI * Math.atan2(this._x,this._w)) / 10.0;
            } else {
                if (delta < -0.499 * norm) {
                    this._pitch = -90.0;
                    this._head  = Math.round(-2.0 * 1800.0/Math.PI * Math.atan2(this._x,this._w)) / 10.0;
                } else {
                    this._roll  = Math.round(1800.0/Math.PI * Math.atan2(2.0 * (this._w * this._x + this._y * this._z),sqw - sqx - sqy + sqz)) / 10.0;
                    this._pitch = Math.round(1800.0/Math.PI * Math.asin(2.0 * delta / norm)) / 10.0;
                    this._head  = Math.round(1800.0/Math.PI * Math.atan2(2.0 * (this._x * this._y + this._z * this._w),sqw + sqx - sqy - sqz)) / 10.0;
                }
            }
            this._angles_stamp = this._qt_stamp;
        }
        return YAPI_SUCCESS;
    }

    /**
     * Returns the estimated roll angle, based on the integration of
     * gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     * The axis corresponding to the roll angle can be mapped to any
     * of the device X, Y or Z physical directions using methods of
     * the class YRefFrame.
     * 
     * @return a floating-point number corresponding to roll angle
     *         in degrees, between -180 and +180.
     */
    function YGyro_get_roll()
    {
        this._loadAngles();
        return this._roll;
    }

    /**
     * Returns the estimated pitch angle, based on the integration of
     * gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     * The axis corresponding to the pitch angle can be mapped to any
     * of the device X, Y or Z physical directions using methods of
     * the class YRefFrame.
     * 
     * @return a floating-point number corresponding to pitch angle
     *         in degrees, between -90 and +90.
     */
    function YGyro_get_pitch()
    {
        this._loadAngles();
        return this._pitch;
    }

    /**
     * Returns the estimated heading angle, based on the integration of
     * gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     * The axis corresponding to the heading can be mapped to any
     * of the device X, Y or Z physical directions using methods of
     * the class YRefFrame.
     * 
     * @return a floating-point number corresponding to heading
     *         in degrees, between 0 and 360.
     */
    function YGyro_get_heading()
    {
        this._loadAngles();
        return this._head;
    }

    /**
     * Returns the w component (real part) of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     * 
     * @return a floating-point number corresponding to the w
     *         component of the quaternion.
     */
    function YGyro_get_quaternionW()
    {
        this._loadQuaternion();
        return this._w;
    }

    /**
     * Returns the x component of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements. The x component is
     * mostly correlated with rotations on the roll axis.
     * 
     * @return a floating-point number corresponding to the x
     *         component of the quaternion.
     */
    function YGyro_get_quaternionX()
    {
        return this._x;
    }

    /**
     * Returns the y component of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements. The y component is
     * mostly correlated with rotations on the pitch axis.
     * 
     * @return a floating-point number corresponding to the y
     *         component of the quaternion.
     */
    function YGyro_get_quaternionY()
    {
        return this._y;
    }

    /**
     * Returns the x component of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements. The x component is
     * mostly correlated with changes of heading.
     * 
     * @return a floating-point number corresponding to the z
     *         component of the quaternion.
     */
    function YGyro_get_quaternionZ()
    {
        return this._z;
    }

    /**
     * Registers a callback function that will be invoked each time that the estimated
     * device orientation has changed. The call frequency is typically around 95Hz during a move.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered.
     * For good responsiveness, remember to call one of these two functions periodically.
     * To unregister a callback, pass a null pointer as argument.
     * 
     * @param callback : the callback function to invoke, or a null pointer.
     *         The callback function should take five arguments:
     *         the YGyro object of the turning device, and the floating
     *         point values of the four components w, x, y and z
     *         (as floating-point numbers).
     * @noreturn
     */
    function YGyro_registerQuaternionCallback(callback)
    {
        this._quatCallback = callback;
        if (callback != null) {
            if (this._loadQuaternion() != YAPI_SUCCESS) {
                return YAPI_DEVICE_NOT_FOUND;
            }
            this._qt_w.set_userData(this);
            this._qt_x.set_userData(this);
            this._qt_y.set_userData(this);
            this._qt_z.set_userData(this);
            this._qt_w.registerValueCallback(yInternalGyroCallback);
            this._qt_x.registerValueCallback(yInternalGyroCallback);
            this._qt_y.registerValueCallback(yInternalGyroCallback);
            this._qt_z.registerValueCallback(yInternalGyroCallback);
        } else {
            if (!(this._anglesCallback != null)) {
                this._qt_w.registerValueCallback(null);
                this._qt_x.registerValueCallback(null);
                this._qt_y.registerValueCallback(null);
                this._qt_z.registerValueCallback(null);
            }
        }
        return 0;
    }

    /**
     * Registers a callback function that will be invoked each time that the estimated
     * device orientation has changed. The call frequency is typically around 95Hz during a move.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered.
     * For good responsiveness, remember to call one of these two functions periodically.
     * To unregister a callback, pass a null pointer as argument.
     * 
     * @param callback : the callback function to invoke, or a null pointer.
     *         The callback function should take four arguments:
     *         the YGyro object of the turning device, and the floating
     *         point values of the three angles roll, pitch and heading
     *         in degrees (as floating-point numbers).
     * @noreturn
     */
    function YGyro_registerAnglesCallback(callback)
    {
        this._anglesCallback = callback;
        if (callback != null) {
            if (this._loadQuaternion() != YAPI_SUCCESS) {
                return YAPI_DEVICE_NOT_FOUND;
            }
            this._qt_w.set_userData(this);
            this._qt_x.set_userData(this);
            this._qt_y.set_userData(this);
            this._qt_z.set_userData(this);
            this._qt_w.registerValueCallback(yInternalGyroCallback);
            this._qt_x.registerValueCallback(yInternalGyroCallback);
            this._qt_y.registerValueCallback(yInternalGyroCallback);
            this._qt_z.registerValueCallback(yInternalGyroCallback);
        } else {
            if (!(this._quatCallback != null)) {
                this._qt_w.registerValueCallback(null);
                this._qt_x.registerValueCallback(null);
                this._qt_y.registerValueCallback(null);
                this._qt_z.registerValueCallback(null);
            }
        }
        return 0;
    }

    function YGyro_invokeGyroCallbacks(qtIndex,qtValue)
    {
        switch(qtIndex - 1) {
        case 0:
            this._w = qtValue;
            break;
        case 1:
            this._x = qtValue;
            break;
        case 2:
            this._y = qtValue;
            break;
        case 3:
            this._z = qtValue;
            break;
        }
        if (qtIndex < 4) {
            return 0;
        }
        this._qt_stamp = ((YAPI.GetTickCount()) & (0x7FFFFFFF));
        if (this._quatCallback != null) {
            this._quatCallback(this, this._w, this._x, this._y, this._z);
        }
        if (this._anglesCallback != null) {
            this._loadAngles();
            this._anglesCallback(this, this._roll, this._pitch, this._head);
        }
        return 0;
    }

    /**
     * Continues the enumeration of gyroscopes started using yFirstGyro().
     * 
     * @return a pointer to a YGyro object, corresponding to
     *         a gyroscope currently online, or a null pointer
     *         if there are no more gyroscopes to enumerate.
     */
    function YGyro_nextGyro()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YGyro.FindGyro(next_hwid);
    }

    /**
     * Starts the enumeration of gyroscopes currently accessible.
     * Use the method YGyro.nextGyro() to iterate on
     * next gyroscopes.
     * 
     * @return a pointer to a YGyro object, corresponding to
     *         the first gyro currently online, or a null pointer
     *         if there are none.
     */
    function YGyro_FirstGyro()
    {
        var next_hwid = YAPI.getFirstHardwareId('Gyro');
        if(next_hwid == null) return null;
        return YGyro.FindGyro(next_hwid);
    }

    //--- (end of generated code: YGyro implementation)

    //--- (generated code: YGyro initialization)
    YGyro = YSensor._Subclass(_YGyro, {
        // Constants
        XVALUE_INVALID              : YAPI_INVALID_DOUBLE,
        YVALUE_INVALID              : YAPI_INVALID_DOUBLE,
        ZVALUE_INVALID              : YAPI_INVALID_DOUBLE
    }, {
        // Class methods
        FindGyro                    : YGyro_FindGyro,
        FirstGyro                   : YGyro_FirstGyro
    }, {
        // Methods
        get_xValue                  : YGyro_get_xValue,
        xValue                      : YGyro_get_xValue,
        get_xValue_async            : YGyro_get_xValue_async,
        xValue_async                : YGyro_get_xValue_async,
        get_yValue                  : YGyro_get_yValue,
        yValue                      : YGyro_get_yValue,
        get_yValue_async            : YGyro_get_yValue_async,
        yValue_async                : YGyro_get_yValue_async,
        get_zValue                  : YGyro_get_zValue,
        zValue                      : YGyro_get_zValue,
        get_zValue_async            : YGyro_get_zValue_async,
        zValue_async                : YGyro_get_zValue_async,
        _loadQuaternion             : YGyro_loadQuaternion,
        _loadAngles                 : YGyro_loadAngles,
        get_roll                    : YGyro_get_roll,
        roll                        : YGyro_get_roll,
        get_pitch                   : YGyro_get_pitch,
        pitch                       : YGyro_get_pitch,
        get_heading                 : YGyro_get_heading,
        heading                     : YGyro_get_heading,
        get_quaternionW             : YGyro_get_quaternionW,
        quaternionW                 : YGyro_get_quaternionW,
        get_quaternionX             : YGyro_get_quaternionX,
        quaternionX                 : YGyro_get_quaternionX,
        get_quaternionY             : YGyro_get_quaternionY,
        quaternionY                 : YGyro_get_quaternionY,
        get_quaternionZ             : YGyro_get_quaternionZ,
        quaternionZ                 : YGyro_get_quaternionZ,
        registerQuaternionCallback  : YGyro_registerQuaternionCallback,
        registerAnglesCallback      : YGyro_registerAnglesCallback,
        _invokeGyroCallbacks        : YGyro_invokeGyroCallbacks,
        nextGyro                    : YGyro_nextGyro,
        _parseAttr                  : YGyro_parseAttr
    });
    //--- (end of generated code: YGyro initialization)
})();

//--- (generated code: Gyro functions)

/**
 * Retrieves a gyroscope for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the gyroscope is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YGyro.isOnline() to test if the gyroscope is
 * indeed online at a given time. In case of ambiguity when looking for
 * a gyroscope by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the gyroscope
 * 
 * @return a YGyro object allowing you to drive the gyroscope.
 */
function yFindGyro(func)
{
    return YGyro.FindGyro(func);
}

/**
 * Starts the enumeration of gyroscopes currently accessible.
 * Use the method YGyro.nextGyro() to iterate on
 * next gyroscopes.
 * 
 * @return a pointer to a YGyro object, corresponding to
 *         the first gyro currently online, or a null pointer
 *         if there are none.
 */
function yFirstGyro()
{
    return YGyro.FirstGyro();
}

//--- (end of generated code: Gyro functions)

