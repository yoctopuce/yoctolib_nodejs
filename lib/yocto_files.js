/*********************************************************************
 *
 * $Id: yocto_files.js 12326 2013-08-13 15:52:20Z mvuilleu $
 *
 * Implements yFindFiles(), the high-level API for Files functions
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

//--- (generated code: YFiles definitions)
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_FILESCOUNT_INVALID            = -1;
var Y_FREESPACE_INVALID             = -1;
//--- (end of generated code: YFiles definitions)

//--- (generated code: YFileRecord definitions)
//--- (end of generated code: YFileRecord definitions)

/**
 * YFileRecord Class: description of a file on the device filesystem
 */
var YFileRecord; // definition below
(function()
{

    //--- (generated code: YFileRecord implementation)

    function YFileRecord_get_name()
    {
        return this._name;
    }

    function YFileRecord_get_size()
    {
        return this._size;
    }

    function YFileRecord_get_crc()
    {
        return this._crc;
    }

    function YFileRecord_name()
    {
        return this._name;
    }

    function YFileRecord_size()
    {
        return this._size;
    }

    function YFileRecord_crc()
    {
        return this._crc;
    }

    //--- (end of generated code: YFileRecord implementation)

    function _YFileRecord(str_json)
    {
        var loadval = JSON.parse(str_json);
        this._name = loadval.name;
        this._size = loadval.size;
        this._crc  = loadval.crc;
        
        // public
        //--- (generated code: YFileRecord constructor)
        // public
        this.get_name                        = YFileRecord_get_name;
        this.name                            = YFileRecord_get_name;
        this.get_size                        = YFileRecord_get_size;
        this.size                            = YFileRecord_get_size;
        this.get_crc                         = YFileRecord_get_crc;
        this.crc                             = YFileRecord_get_crc;
        this.name                            = YFileRecord_name;
        this.size                            = YFileRecord_size;
        this.crc                             = YFileRecord_crc;
        //--- (end of generated code: YFileRecord constructor)
    }

    YFileRecord = _YFileRecord;
})();




/**
 * YFiles Class: Files function interface
 * 
 * The filesystem interface makes it possible to store files
 * on some devices, for instance to design a custom web UI
 * (for networked devices) or to add fonts (on display
 * devices).
 */
var YFiles; // definition below
(function()
{
    //--- (generated code: YFiles implementation)

    /**
     * Returns the logical name of the filesystem.
     * 
     * @return a string corresponding to the logical name of the filesystem
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YFiles_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the filesystem.
     * 
     * @return a string corresponding to the logical name of the filesystem
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YFiles_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the filesystem. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the filesystem
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YFiles_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the filesystem (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the filesystem (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YFiles_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the filesystem (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the filesystem (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YFiles_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the number of files currently loaded in the filesystem.
     * 
     * @return an integer corresponding to the number of files currently loaded in the filesystem
     * 
     * On failure, throws an exception or returns Y_FILESCOUNT_INVALID.
     */
    function YFiles_get_filesCount()
    {   var json_val = this._getAttr('filesCount');
        return (json_val == null ? Y_FILESCOUNT_INVALID : parseInt(json_val));
    }

    /**
     * Returns the number of files currently loaded in the filesystem.
     * 
     * @return an integer corresponding to the number of files currently loaded in the filesystem
     * 
     * On failure, throws an exception or returns Y_FILESCOUNT_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YFiles_get_filesCount_async(func_callback, obj_context)
    {   this._getAttr_async('filesCount',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_FILESCOUNT_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the free space for uploading new files to the filesystem, in bytes.
     * 
     * @return an integer corresponding to the free space for uploading new files to the filesystem, in bytes
     * 
     * On failure, throws an exception or returns Y_FREESPACE_INVALID.
     */
    function YFiles_get_freeSpace()
    {   var json_val = this._getAttr('freeSpace');
        return (json_val == null ? Y_FREESPACE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the free space for uploading new files to the filesystem, in bytes.
     * 
     * @return an integer corresponding to the free space for uploading new files to the filesystem, in bytes
     * 
     * On failure, throws an exception or returns Y_FREESPACE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YFiles_get_freeSpace_async(func_callback, obj_context)
    {   this._getAttr_async('freeSpace',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_FREESPACE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YFiles_sendCommand(str_command)
    {
        var url; // type: str;
        url =  "files.json?a="+str_command;
        return this._download(url);
        
    }

    /**
     * Reinitializes the filesystem to its clean, unfragmented, empty state.
     * All files previously uploaded are permanently lost.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YFiles_format_fs()
    {
        var json; // type: bin;
        var res; // type: str;
        json = this.sendCommand("format"); 
        res  = this._json_get_key(json, "res");
        if (!(res == "ok")) return this._throw( YAPI_IO_ERROR, "format failed", YAPI_IO_ERROR);
        return YAPI_SUCCESS;
        
    }

    /**
     * Returns a list of YFileRecord objects that describe files currently loaded
     * in the filesystem.
     * 
     * @param pattern : an optional filter pattern, using star and question marks
     *         as wildcards. When an empty pattern is provided, all file records
     *         are returned.
     * 
     * @return a list of YFileRecord objects, containing the file path
     *         and name, byte size and 32-bit CRC of the file content.
     * 
     * On failure, throws an exception or returns an empty list.
     */
    function YFiles_get_list(str_pattern)
    {
        var json; // type: bin;
        var list = new Array();
        var res = new Array();
        json = this.sendCommand("dir&f="+str_pattern);
        list = this._json_get_array(json);
        for(IDX in list) { res.push(new YFileRecord(list[IDX])); };
        return res;
        
    }

    /**
     * Downloads the requested file and returns a binary buffer with its content.
     * 
     * @param pathname : path and name of the new file to load
     * 
     * @return a binary buffer with the file content
     * 
     * On failure, throws an exception or returns an empty content.
     */
    function YFiles_download(str_pathname)
    {
        return this._download(str_pathname);
        
    }

    /**
     * Uploads a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     * 
     * @param pathname : path and name of the new file to create
     * @param content : binary buffer with the content to set
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YFiles_upload(str_pathname,bin_content)
    {
        return this._upload(str_pathname,bin_content);
        
    }

    /**
     * Deletes a file, given by its full path name, from the filesystem.
     * Because of filesystem fragmentation, deleting a file may not always
     * free up the whole space used by the file. However, rewriting a file
     * with the same path name will always reuse any space not freed previously.
     * If you need to ensure that no space is taken by previously deleted files,
     * you can use format_fs to fully reinitialize the filesystem.
     * 
     * @param pathname : path and name of the file to remove.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YFiles_remove(str_pathname)
    {
        var json; // type: bin;
        var res; // type: str;
        json = this.sendCommand("del&f="+str_pathname); 
        res  = this._json_get_key(json, "res");
        if (!(res == "ok")) return this._throw( YAPI_IO_ERROR, "unable to remove file", YAPI_IO_ERROR);
        return YAPI_SUCCESS;
        
    }

    /**
     * Continues the enumeration of filesystems started using yFirstFiles().
     * 
     * @return a pointer to a YFiles object, corresponding to
     *         a filesystem currently online, or a null pointer
     *         if there are no more filesystems to enumerate.
     */
    function YFiles_nextFiles()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YFiles.FindFiles(next_hwid);
    }

    /**
     * Retrieves a filesystem for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the filesystem is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFiles.isOnline() to test if the filesystem is
     * indeed online at a given time. In case of ambiguity when looking for
     * a filesystem by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the filesystem
     * 
     * @return a YFiles object allowing you to drive the filesystem.
     */
    function YFiles_FindFiles(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Files', str_func);
        if(obj_func) return obj_func;
        return new YFiles(str_func);
    }

    /**
     * Starts the enumeration of filesystems currently accessible.
     * Use the method YFiles.nextFiles() to iterate on
     * next filesystems.
     * 
     * @return a pointer to a YFiles object, corresponding to
     *         the first filesystem currently online, or a null pointer
     *         if there are none.
     */
    function YFiles_FirstFiles()
    {
        var next_hwid = YAPI.getFirstHardwareId('Files');
        if(next_hwid == null) return null;
        return YFiles.FindFiles(next_hwid);
    }

    //--- (end of generated code: YFiles implementation)

    function _YFiles(str_func)
    {
        //--- (generated code: YFiles constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Files', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.FILESCOUNT_INVALID              = -1;
        this.FREESPACE_INVALID               = -1;
        this.get_logicalName                 = YFiles_get_logicalName;
        this.logicalName                     = YFiles_get_logicalName;
        this.get_logicalName_async           = YFiles_get_logicalName_async;
        this.logicalName_async               = YFiles_get_logicalName_async;
        this.set_logicalName                 = YFiles_set_logicalName;
        this.setLogicalName                  = YFiles_set_logicalName;
        this.get_advertisedValue             = YFiles_get_advertisedValue;
        this.advertisedValue                 = YFiles_get_advertisedValue;
        this.get_advertisedValue_async       = YFiles_get_advertisedValue_async;
        this.advertisedValue_async           = YFiles_get_advertisedValue_async;
        this.get_filesCount                  = YFiles_get_filesCount;
        this.filesCount                      = YFiles_get_filesCount;
        this.get_filesCount_async            = YFiles_get_filesCount_async;
        this.filesCount_async                = YFiles_get_filesCount_async;
        this.get_freeSpace                   = YFiles_get_freeSpace;
        this.freeSpace                       = YFiles_get_freeSpace;
        this.get_freeSpace_async             = YFiles_get_freeSpace_async;
        this.freeSpace_async                 = YFiles_get_freeSpace_async;
        this.sendCommand                     = YFiles_sendCommand;
        this.format_fs                       = YFiles_format_fs;
        this.get_list                        = YFiles_get_list;
        this.list                            = YFiles_get_list;
        this.download                        = YFiles_download;
        this.upload                          = YFiles_upload;
        this.remove                          = YFiles_remove;
        this.nextFiles                       = YFiles_nextFiles;
        //--- (end of generated code: YFiles constructor)
    }

    YFiles = _YFiles;
    YFiles.FindFiles  = YFiles_FindFiles;
    YFiles.FirstFiles = YFiles_FirstFiles;
})();

//--- (generated code: Files functions)

/**
 * Retrieves a filesystem for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the filesystem is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YFiles.isOnline() to test if the filesystem is
 * indeed online at a given time. In case of ambiguity when looking for
 * a filesystem by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the filesystem
 * 
 * @return a YFiles object allowing you to drive the filesystem.
 */
function yFindFiles(str_func)
{
    return YFiles.FindFiles(str_func);
}

/**
 * Starts the enumeration of filesystems currently accessible.
 * Use the method YFiles.nextFiles() to iterate on
 * next filesystems.
 * 
 * @return a pointer to a YFiles object, corresponding to
 *         the first filesystem currently online, or a null pointer
 *         if there are none.
 */
function yFirstFiles()
{
    return YFiles.FirstFiles();
}

//--- (end of generated code: Files functions)
