/*********************************************************************
 *
 * $Id: yocto_display.js 16340 2014-05-30 10:41:54Z seb $
 *
 * Implements yFindDisplay(), the high-level API for Display functions
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

//--- (generated code: YDisplay definitions)
var Y_ENABLED_FALSE                 = 0;
var Y_ENABLED_TRUE                  = 1;
var Y_ENABLED_INVALID               = -1;
var Y_ORIENTATION_LEFT              = 0;
var Y_ORIENTATION_UP                = 1;
var Y_ORIENTATION_RIGHT             = 2;
var Y_ORIENTATION_DOWN              = 3;
var Y_ORIENTATION_INVALID           = -1;
var Y_DISPLAYTYPE_MONO              = 0;
var Y_DISPLAYTYPE_GRAY              = 1;
var Y_DISPLAYTYPE_RGB               = 2;
var Y_DISPLAYTYPE_INVALID           = -1;
var Y_STARTUPSEQ_INVALID            = YAPI_INVALID_STRING;
var Y_BRIGHTNESS_INVALID            = YAPI_INVALID_UINT;
var Y_DISPLAYWIDTH_INVALID          = YAPI_INVALID_UINT;
var Y_DISPLAYHEIGHT_INVALID         = YAPI_INVALID_UINT;
var Y_LAYERWIDTH_INVALID            = YAPI_INVALID_UINT;
var Y_LAYERHEIGHT_INVALID           = YAPI_INVALID_UINT;
var Y_LAYERCOUNT_INVALID            = YAPI_INVALID_UINT;
var Y_COMMAND_INVALID               = YAPI_INVALID_STRING;
//--- (end of generated code: YDisplay definitions)

//--- (generated code: YDisplayLayer definitions)
var Y_ALIGN_TOP_LEFT                = 0;
var Y_ALIGN_CENTER_LEFT             = 1;
var Y_ALIGN_BASELINE_LEFT           = 2;
var Y_ALIGN_BOTTOM_LEFT             = 3;
var Y_ALIGN_TOP_CENTER              = 4;
var Y_ALIGN_CENTER                  = 5;
var Y_ALIGN_BASELINE_CENTER         = 6;
var Y_ALIGN_BOTTOM_CENTER           = 7;
var Y_ALIGN_TOP_DECIMAL             = 8;
var Y_ALIGN_CENTER_DECIMAL          = 9;
var Y_ALIGN_BASELINE_DECIMAL        = 10;
var Y_ALIGN_BOTTOM_DECIMAL          = 11;
var Y_ALIGN_TOP_RIGHT               = 12;
var Y_ALIGN_CENTER_RIGHT            = 13;
var Y_ALIGN_BASELINE_RIGHT          = 14;
var Y_ALIGN_BOTTOM_RIGHT            = 15;
//--- (end of generated code: YDisplayLayer definitions)

//--- (generated code: YDisplayLayer class start)
/**
 * YDisplayLayer Class: DisplayLayer object interface
 * 
 * A DisplayLayer is an image layer containing objects to display
 * (bitmaps, text, etc.). The content is displayed only when
 * the layer is active on the screen (and not masked by other
 * overlapping layers).
 */
//--- (end of generated code: YDisplayLayer class start)

var YDisplayLayer; // definition below
(function()
{
    function _YDisplayLayer(obj_parent, str_id)
    {
        this._display      = obj_parent;
        this._id           = str_id;
        this._cmdbuff      = '';
        this._hidden       = false;
        //--- (generated code: YDisplayLayer constructor)
        //--- (end of generated code: YDisplayLayer constructor)
    }

    // internal function to flush any pending command for this layer
    function YDisplayLayer_flush_now() 
    {
        var res = YAPI_SUCCESS;
        if(this._cmdbuff != '') {
            res = this._display.sendCommand(this._cmdbuff);
            this._cmdbuff = '';
        }
        return res;
    }
    
    // internal function to buffer a command for this layer
    function YDisplayLayer_command_push(str_cmd)
    {
        var res = YAPI_SUCCESS;
        
        if(this._cmdbuff.length + str_cmd.length >= 100) {
            // force flush before, to prevent overflow
            res = this.flush_now();
        }
        if(this._cmdbuff == '') {
            // always prepend layer ID first
            this._cmdbuff = this._id;
        } 
        this._cmdbuff += str_cmd;
        return res;
    }

    // internal function to send a command for this layer
    function YDisplayLayer_command_flush(str_cmd)
    {
        var res = this.command_push(str_cmd);
        if(this._hidden) {
            return res;
        }
        return this.flush_now();
    }

    //--- (generated code: YDisplayLayer implementation)

    /**
     * Reverts the layer to its initial state (fully transparent, default settings).
     * Reinitializes the drawing pointer to the upper left position,
     * and selects the most visible pen color. If you only want to erase the layer
     * content, use the method clear() instead.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_reset()
    {
        this._hidden = false;
        return this.command_flush("X");
    }

    /**
     * Erases the whole content of the layer (makes it fully transparent).
     * This method does not change any other attribute of the layer.
     * To reinitialize the layer attributes to defaults settings, use the method
     * reset() instead.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_clear()
    {
        return this.command_flush("x");
    }

    /**
     * Selects the pen color for all subsequent drawing functions,
     * including text drawing. The pen color is provided as an RGB value.
     * For grayscale or monochrome displays, the value is
     * automatically converted to the proper range.
     * 
     * @param color : the desired pen color, as a 24-bit RGB value
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_selectColorPen(color)
    {
        return this.command_push("c"+("0000000"+(color).toString(16)).slice(-06));
    }

    /**
     * Selects the pen gray level for all subsequent drawing functions,
     * including text drawing. The gray level is provided as a number between
     * 0 (black) and 255 (white, or whichever the lighest color is).
     * For monochrome displays (without gray levels), any value
     * lower than 128 is rendered as black, and any value equal
     * or above to 128 is non-black.
     * 
     * @param graylevel : the desired gray level, from 0 to 255
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_selectGrayPen(graylevel)
    {
        return this.command_push("g"+String(Math.round(graylevel)));
    }

    /**
     * Selects an eraser instead of a pen for all subsequent drawing functions,
     * except for text drawing and bitmap copy functions. Any point drawn
     * using the eraser becomes transparent (as when the layer is empty),
     * showing the other layers beneath it.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_selectEraser()
    {
        return this.command_push("e");
    }

    /**
     * Enables or disables anti-aliasing for drawing oblique lines and circles.
     * Anti-aliasing provides a smoother aspect when looked from far enough,
     * but it can add fuzzyness when the display is looked from very close.
     * At the end of the day, it is your personal choice.
     * Anti-aliasing is enabled by default on grayscale and color displays,
     * but you can disable it if you prefer. This setting has no effect
     * on monochrome displays.
     * 
     * @param mode : <t>true</t> to enable antialiasing, <t>false</t> to
     *         disable it.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_setAntialiasingMode(mode)
    {
        return this.command_push("a"+(mode?"1":"0"));
    }

    /**
     * Draws a single pixel at the specified position.
     * 
     * @param x : the distance from left of layer, in pixels
     * @param y : the distance from top of layer, in pixels
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawPixel(x,y)
    {
        return this.command_flush("P"+String(Math.round(x))+","+String(Math.round(y)));
    }

    /**
     * Draws an empty rectangle at a specified position.
     * 
     * @param x1 : the distance from left of layer to the left border of the rectangle, in pixels
     * @param y1 : the distance from top of layer to the top border of the rectangle, in pixels
     * @param x2 : the distance from left of layer to the right border of the rectangle, in pixels
     * @param y2 : the distance from top of layer to the bottom border of the rectangle, in pixels
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawRect(x1,y1,x2,y2)
    {
        return this.command_flush("R"+String(Math.round(x1))+","+String(Math.round(y1))+","+String(Math.round(x2))+","+String(Math.round(y2)));
    }

    /**
     * Draws a filled rectangular bar at a specified position.
     * 
     * @param x1 : the distance from left of layer to the left border of the rectangle, in pixels
     * @param y1 : the distance from top of layer to the top border of the rectangle, in pixels
     * @param x2 : the distance from left of layer to the right border of the rectangle, in pixels
     * @param y2 : the distance from top of layer to the bottom border of the rectangle, in pixels
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawBar(x1,y1,x2,y2)
    {
        return this.command_flush("B"+String(Math.round(x1))+","+String(Math.round(y1))+","+String(Math.round(x2))+","+String(Math.round(y2)));
    }

    /**
     * Draws an empty circle at a specified position.
     * 
     * @param x : the distance from left of layer to the center of the circle, in pixels
     * @param y : the distance from top of layer to the center of the circle, in pixels
     * @param r : the radius of the circle, in pixels
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawCircle(x,y,r)
    {
        return this.command_flush("C"+String(Math.round(x))+","+String(Math.round(y))+","+String(Math.round(r)));
    }

    /**
     * Draws a filled disc at a given position.
     * 
     * @param x : the distance from left of layer to the center of the disc, in pixels
     * @param y : the distance from top of layer to the center of the disc, in pixels
     * @param r : the radius of the disc, in pixels
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawDisc(x,y,r)
    {
        return this.command_flush("D"+String(Math.round(x))+","+String(Math.round(y))+","+String(Math.round(r)));
    }

    /**
     * Selects a font to use for the next text drawing functions, by providing the name of the
     * font file. You can use a built-in font as well as a font file that you have previously
     * uploaded to the device built-in memory. If you experience problems selecting a font
     * file, check the device logs for any error message such as missing font file or bad font
     * file format.
     * 
     * @param fontname : the font file name
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_selectFont(fontname)
    {
        return this.command_push("&"+fontname+""+String.fromCharCode(27));
    }

    /**
     * Draws a text string at the specified position. The point of the text that is aligned
     * to the specified pixel position is called the anchor point, and can be chosen among
     * several options. Text is rendered from left to right, without implicit wrapping.
     * 
     * @param x : the distance from left of layer to the text anchor point, in pixels
     * @param y : the distance from top of layer to the text anchor point, in pixels
     * @param anchor : the text anchor point, chosen among the YDisplayLayer.ALIGN enumeration:
     *         YDisplayLayer.ALIGN_TOP_LEFT,    YDisplayLayer.ALIGN_CENTER_LEFT,   
     *         YDisplayLayer.ALIGN_BASELINE_LEFT,    YDisplayLayer.ALIGN_BOTTOM_LEFT,
     *         YDisplayLayer.ALIGN_TOP_CENTER,  YDisplayLayer.ALIGN_CENTER,        
     *         YDisplayLayer.ALIGN_BASELINE_CENTER,  YDisplayLayer.ALIGN_BOTTOM_CENTER,
     *         YDisplayLayer.ALIGN_TOP_DECIMAL, YDisplayLayer.ALIGN_CENTER_DECIMAL,
     *         YDisplayLayer.ALIGN_BASELINE_DECIMAL, YDisplayLayer.ALIGN_BOTTOM_DECIMAL,
     *         YDisplayLayer.ALIGN_TOP_RIGHT,   YDisplayLayer.ALIGN_CENTER_RIGHT,  
     *         YDisplayLayer.ALIGN_BASELINE_RIGHT,   YDisplayLayer.ALIGN_BOTTOM_RIGHT.
     * @param text : the text string to draw
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawText(x,y,anchor,text)
    {
        return this.command_flush("T"+String(Math.round(x))+","+String(Math.round(y))+","+String(anchor)+","+text+""+String.fromCharCode(27));
    }

    /**
     * Draws a GIF image at the specified position. The GIF image must have been previously
     * uploaded to the device built-in memory. If you experience problems using an image
     * file, check the device logs for any error message such as missing image file or bad
     * image file format.
     * 
     * @param x : the distance from left of layer to the left of the image, in pixels
     * @param y : the distance from top of layer to the top of the image, in pixels
     * @param imagename : the GIF file name
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawImage(x,y,imagename)
    {
        return this.command_flush("*"+String(Math.round(x))+","+String(Math.round(y))+","+imagename+""+String.fromCharCode(27));
    }

    /**
     * Draws a bitmap at the specified position. The bitmap is provided as a binary object,
     * where each pixel maps to a bit, from left to right and from top to bottom.
     * The most significant bit of each byte maps to the leftmost pixel, and the least
     * significant bit maps to the rightmost pixel. Bits set to 1 are drawn using the
     * layer selected pen color. Bits set to 0 are drawn using the specified background
     * gray level, unless -1 is specified, in which case they are not drawn at all
     * (as if transparent).
     * 
     * @param x : the distance from left of layer to the left of the bitmap, in pixels
     * @param y : the distance from top of layer to the top of the bitmap, in pixels
     * @param w : the width of the bitmap, in pixels
     * @param bitmap : a binary object
     * @param bgcol : the background gray level to use for zero bits (0 = black,
     *         255 = white), or -1 to leave the pixels unchanged
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawBitmap(x,y,w,bitmap,bgcol)
    {
        var destname;               // str;
        destname = "layer"+String(Math.round(this._id))+":"+String(Math.round(w))+","+String(Math.round(bgcol))+"@"+String(Math.round(x))+","+String(Math.round(y));
        return this._display.upload(destname,bitmap);
    }

    /**
     * Moves the drawing pointer of this layer to the specified position.
     * 
     * @param x : the distance from left of layer, in pixels
     * @param y : the distance from top of layer, in pixels
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_moveTo(x,y)
    {
        return this.command_push("@"+String(Math.round(x))+","+String(Math.round(y)));
    }

    /**
     * Draws a line from current drawing pointer position to the specified position.
     * The specified destination pixel is included in the line. The pointer position
     * is then moved to the end point of the line.
     * 
     * @param x : the distance from left of layer to the end point of the line, in pixels
     * @param y : the distance from top of layer to the end point of the line, in pixels
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_lineTo(x,y)
    {
        return this.command_flush("-"+String(Math.round(x))+","+String(Math.round(y)));
    }

    /**
     * Outputs a message in the console area, and advances the console pointer accordingly.
     * The console pointer position is automatically moved to the beginning
     * of the next line when a newline character is met, or when the right margin
     * is hit. When the new text to display extends below the lower margin, the
     * console area is automatically scrolled up.
     * 
     * @param text : the message to display
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_consoleOut(text)
    {
        return this.command_flush("!"+text+""+String.fromCharCode(27));
    }

    /**
     * Sets up display margins for the consoleOut function.
     * 
     * @param x1 : the distance from left of layer to the left margin, in pixels
     * @param y1 : the distance from top of layer to the top margin, in pixels
     * @param x2 : the distance from left of layer to the right margin, in pixels
     * @param y2 : the distance from top of layer to the bottom margin, in pixels
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_setConsoleMargins(x1,y1,x2,y2)
    {
        return this.command_push("m"+String(Math.round(x1))+","+String(Math.round(y1))+","+String(Math.round(x2))+","+String(Math.round(y2)));
    }

    /**
     * Sets up the background color used by the clearConsole function and by
     * the console scrolling feature.
     * 
     * @param bgcol : the background gray level to use when scrolling (0 = black,
     *         255 = white), or -1 for transparent
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_setConsoleBackground(bgcol)
    {
        return this.command_push("b"+String(Math.round(bgcol)));
    }

    /**
     * Sets up the wrapping behaviour used by the consoleOut function.
     * 
     * @param wordwrap : true to wrap only between words,
     *         false to wrap on the last column anyway.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_setConsoleWordWrap(wordwrap)
    {
        return this.command_push("w"+(wordwrap?"1":"0"));
    }

    /**
     * Blanks the console area within console margins, and resets the console pointer
     * to the upper left corner of the console.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_clearConsole()
    {
        return this.command_flush("^");
    }

    /**
     * Sets the position of the layer relative to the display upper left corner.
     * When smooth scrolling is used, the display offset of the layer is
     * automatically updated during the next milliseconds to animate the move of the layer.
     * 
     * @param x : the distance from left of display to the upper left corner of the layer
     * @param y : the distance from top of display to the upper left corner of the layer
     * @param scrollTime : number of milliseconds to use for smooth scrolling, or
     *         0 if the scrolling should be immediate.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_setLayerPosition(x,y,scrollTime)
    {
        return this.command_flush("#"+String(Math.round(x))+","+String(Math.round(y))+","+String(Math.round(scrollTime)));
    }

    /**
     * Hides the layer. The state of the layer is perserved but the layer is not displayed
     * on the screen until the next call to unhide(). Hiding the layer can positively
     * affect the drawing speed, since it postpones the rendering until all operations are
     * completed (double-buffering).
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_hide()
    {
        this.command_push("h");
        this._hidden = true;
        return this.flush_now();
    }

    /**
     * Shows the layer. Shows the layer again after a hide command.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_unhide()
    {
        this._hidden = false;
        return this.command_flush("s");
    }

    /**
     * Gets parent YDisplay. Returns the parent YDisplay object of the current YDisplayLayer.
     * 
     * @return an YDisplay object
     */
    function YDisplayLayer_get_display()
    {
        return this._display;
    }

    /**
     * Returns the display width, in pixels.
     * 
     * @return an integer corresponding to the display width, in pixels
     * 
     * On failure, throws an exception or returns YDisplayLayer.DISPLAYWIDTH_INVALID.
     */
    function YDisplayLayer_get_displayWidth()
    {
        return this._display.get_displayWidth();
    }

    /**
     * Returns the display height, in pixels.
     * 
     * @return an integer corresponding to the display height, in pixels
     * 
     * On failure, throws an exception or returns YDisplayLayer.DISPLAYHEIGHT_INVALID.
     */
    function YDisplayLayer_get_displayHeight()
    {
        return this._display.get_displayHeight();
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     * 
     * @return an integer corresponding to the width of the layers to draw on, in pixels
     * 
     * On failure, throws an exception or returns YDisplayLayer.LAYERWIDTH_INVALID.
     */
    function YDisplayLayer_get_layerWidth()
    {
        return this._display.get_layerWidth();
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     * 
     * @return an integer corresponding to the height of the layers to draw on, in pixels
     * 
     * On failure, throws an exception or returns YDisplayLayer.LAYERHEIGHT_INVALID.
     */
    function YDisplayLayer_get_layerHeight()
    {
        return this._display.get_layerHeight();
    }

    function YDisplayLayer_resetHiddenFlag()
    {
        this._hidden = false;
        return YAPI_SUCCESS;
    }

    //--- (end of generated code: YDisplayLayer implementation)

    //--- (generated code: YDisplayLayer initialization)
    YDisplayLayer = _YDisplayLayer;
    // Constants
    YDisplayLayer.ALIGN_TOP_LEFT                        = 0;
    YDisplayLayer.prototype.ALIGN_TOP_LEFT              = 0;
    YDisplayLayer.ALIGN_CENTER_LEFT                     = 1;
    YDisplayLayer.prototype.ALIGN_CENTER_LEFT           = 1;
    YDisplayLayer.ALIGN_BASELINE_LEFT                   = 2;
    YDisplayLayer.prototype.ALIGN_BASELINE_LEFT         = 2;
    YDisplayLayer.ALIGN_BOTTOM_LEFT                     = 3;
    YDisplayLayer.prototype.ALIGN_BOTTOM_LEFT           = 3;
    YDisplayLayer.ALIGN_TOP_CENTER                      = 4;
    YDisplayLayer.prototype.ALIGN_TOP_CENTER            = 4;
    YDisplayLayer.ALIGN_CENTER                          = 5;
    YDisplayLayer.prototype.ALIGN_CENTER                = 5;
    YDisplayLayer.ALIGN_BASELINE_CENTER                 = 6;
    YDisplayLayer.prototype.ALIGN_BASELINE_CENTER       = 6;
    YDisplayLayer.ALIGN_BOTTOM_CENTER                   = 7;
    YDisplayLayer.prototype.ALIGN_BOTTOM_CENTER         = 7;
    YDisplayLayer.ALIGN_TOP_DECIMAL                     = 8;
    YDisplayLayer.prototype.ALIGN_TOP_DECIMAL           = 8;
    YDisplayLayer.ALIGN_CENTER_DECIMAL                  = 9;
    YDisplayLayer.prototype.ALIGN_CENTER_DECIMAL        = 9;
    YDisplayLayer.ALIGN_BASELINE_DECIMAL                = 10;
    YDisplayLayer.prototype.ALIGN_BASELINE_DECIMAL      = 10;
    YDisplayLayer.ALIGN_BOTTOM_DECIMAL                  = 11;
    YDisplayLayer.prototype.ALIGN_BOTTOM_DECIMAL        = 11;
    YDisplayLayer.ALIGN_TOP_RIGHT                       = 12;
    YDisplayLayer.prototype.ALIGN_TOP_RIGHT             = 12;
    YDisplayLayer.ALIGN_CENTER_RIGHT                    = 13;
    YDisplayLayer.prototype.ALIGN_CENTER_RIGHT          = 13;
    YDisplayLayer.ALIGN_BASELINE_RIGHT                  = 14;
    YDisplayLayer.prototype.ALIGN_BASELINE_RIGHT        = 14;
    YDisplayLayer.ALIGN_BOTTOM_RIGHT                    = 15;
    YDisplayLayer.prototype.ALIGN_BOTTOM_RIGHT          = 15;
    // Methods
    YDisplayLayer.prototype.reset                       = YDisplayLayer_reset;
    YDisplayLayer.prototype.clear                       = YDisplayLayer_clear;
    YDisplayLayer.prototype.selectColorPen              = YDisplayLayer_selectColorPen;
    YDisplayLayer.prototype.selectGrayPen               = YDisplayLayer_selectGrayPen;
    YDisplayLayer.prototype.selectEraser                = YDisplayLayer_selectEraser;
    YDisplayLayer.prototype.setAntialiasingMode         = YDisplayLayer_setAntialiasingMode;
    YDisplayLayer.prototype.drawPixel                   = YDisplayLayer_drawPixel;
    YDisplayLayer.prototype.drawRect                    = YDisplayLayer_drawRect;
    YDisplayLayer.prototype.drawBar                     = YDisplayLayer_drawBar;
    YDisplayLayer.prototype.drawCircle                  = YDisplayLayer_drawCircle;
    YDisplayLayer.prototype.drawDisc                    = YDisplayLayer_drawDisc;
    YDisplayLayer.prototype.selectFont                  = YDisplayLayer_selectFont;
    YDisplayLayer.prototype.drawText                    = YDisplayLayer_drawText;
    YDisplayLayer.prototype.drawImage                   = YDisplayLayer_drawImage;
    YDisplayLayer.prototype.drawBitmap                  = YDisplayLayer_drawBitmap;
    YDisplayLayer.prototype.moveTo                      = YDisplayLayer_moveTo;
    YDisplayLayer.prototype.lineTo                      = YDisplayLayer_lineTo;
    YDisplayLayer.prototype.consoleOut                  = YDisplayLayer_consoleOut;
    YDisplayLayer.prototype.setConsoleMargins           = YDisplayLayer_setConsoleMargins;
    YDisplayLayer.prototype.setConsoleBackground        = YDisplayLayer_setConsoleBackground;
    YDisplayLayer.prototype.setConsoleWordWrap          = YDisplayLayer_setConsoleWordWrap;
    YDisplayLayer.prototype.clearConsole                = YDisplayLayer_clearConsole;
    YDisplayLayer.prototype.setLayerPosition            = YDisplayLayer_setLayerPosition;
    YDisplayLayer.prototype.hide                        = YDisplayLayer_hide;
    YDisplayLayer.prototype.unhide                      = YDisplayLayer_unhide;
    YDisplayLayer.prototype.get_display                 = YDisplayLayer_get_display;
    YDisplayLayer.prototype.display                     = YDisplayLayer_get_display;
    YDisplayLayer.prototype.get_displayWidth            = YDisplayLayer_get_displayWidth;
    YDisplayLayer.prototype.displayWidth                = YDisplayLayer_get_displayWidth;
    YDisplayLayer.prototype.get_displayHeight           = YDisplayLayer_get_displayHeight;
    YDisplayLayer.prototype.displayHeight               = YDisplayLayer_get_displayHeight;
    YDisplayLayer.prototype.get_layerWidth              = YDisplayLayer_get_layerWidth;
    YDisplayLayer.prototype.layerWidth                  = YDisplayLayer_get_layerWidth;
    YDisplayLayer.prototype.get_layerHeight             = YDisplayLayer_get_layerHeight;
    YDisplayLayer.prototype.layerHeight                 = YDisplayLayer_get_layerHeight;
    YDisplayLayer.prototype.resetHiddenFlag             = YDisplayLayer_resetHiddenFlag;
    //--- (end of generated code: YDisplayLayer initialization)
    YDisplayLayer.prototype.flush_now                   = YDisplayLayer_flush_now;
    YDisplayLayer.prototype.command_push                = YDisplayLayer_command_push;
    YDisplayLayer.prototype.command_flush               = YDisplayLayer_command_flush;
})();


//--- (generated code: YDisplay class start)
/**
 * YDisplay Class: Display function interface
 * 
 * Yoctopuce display interface has been designed to easily
 * show information and images. The device provides built-in
 * multi-layer rendering. Layers can be drawn offline, individually,
 * and freely moved on the display. It can also replay recorded
 * sequences (animations).
 */
//--- (end of generated code: YDisplay class start)

var YDisplay; // definition below
(function()
{
    function _YDisplay(str_func)
    {
        //--- (generated code: YDisplay constructor)
        // inherit from YFunction
        YFunction.call(this, str_func);
        this._className = 'Display';

        this._enabled                        = Y_ENABLED_INVALID;          // Bool
        this._startupSeq                     = Y_STARTUPSEQ_INVALID;       // Text
        this._brightness                     = Y_BRIGHTNESS_INVALID;       // Percent
        this._orientation                    = Y_ORIENTATION_INVALID;      // Orientation
        this._displayWidth                   = Y_DISPLAYWIDTH_INVALID;     // UInt31
        this._displayHeight                  = Y_DISPLAYHEIGHT_INVALID;    // UInt31
        this._displayType                    = Y_DISPLAYTYPE_INVALID;      // DisplayType
        this._layerWidth                     = Y_LAYERWIDTH_INVALID;       // UInt31
        this._layerHeight                    = Y_LAYERHEIGHT_INVALID;      // UInt31
        this._layerCount                     = Y_LAYERCOUNT_INVALID;       // UInt31
        this._command                        = Y_COMMAND_INVALID;          // Text
        //--- (end of generated code: YDisplay constructor)
        
        this._allDisplayLayers;
        this._sequence         = '';
        this._recording        = false;
    }

    //--- (generated code: YDisplay implementation)

    function YDisplay_parseAttr(name, val, _super)
    {
        switch(name) {
        case "enabled":
            this._enabled = parseInt(val);
            return 1;
        case "startupSeq":
            this._startupSeq = val;
            return 1;
        case "brightness":
            this._brightness = parseInt(val);
            return 1;
        case "orientation":
            this._orientation = parseInt(val);
            return 1;
        case "displayWidth":
            this._displayWidth = parseInt(val);
            return 1;
        case "displayHeight":
            this._displayHeight = parseInt(val);
            return 1;
        case "displayType":
            this._displayType = parseInt(val);
            return 1;
        case "layerWidth":
            this._layerWidth = parseInt(val);
            return 1;
        case "layerHeight":
            this._layerHeight = parseInt(val);
            return 1;
        case "layerCount":
            this._layerCount = parseInt(val);
            return 1;
        case "command":
            this._command = val;
            return 1;
        }
        return _super._parseAttr.call(this, name, val, _super._super);
    }

    /**
     * Returns true if the screen is powered, false otherwise.
     * 
     * @return either YDisplay.ENABLED_FALSE or YDisplay.ENABLED_TRUE, according to true if the screen is
     * powered, false otherwise
     * 
     * On failure, throws an exception or returns YDisplay.ENABLED_INVALID.
     */
    function YDisplay_get_enabled()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ENABLED_INVALID;
            }
        }
        return this._enabled;
    }

    /**
     * Gets true if the screen is powered, false otherwise.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDisplay object that invoked the callback
     *         - the result:either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to true if the screen is powered,
     *         false otherwise
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    function YDisplay_get_enabled_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ENABLED_INVALID);
            } else {
                callback(context, obj, obj._enabled);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the power state of the display.
     * 
     * @param newval : either YDisplay.ENABLED_FALSE or YDisplay.ENABLED_TRUE, according to the power
     * state of the display
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_set_enabled(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('enabled',rest_val);
    }

    /**
     * Returns the name of the sequence to play when the displayed is powered on.
     * 
     * @return a string corresponding to the name of the sequence to play when the displayed is powered on
     * 
     * On failure, throws an exception or returns YDisplay.STARTUPSEQ_INVALID.
     */
    function YDisplay_get_startupSeq()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_STARTUPSEQ_INVALID;
            }
        }
        return this._startupSeq;
    }

    /**
     * Gets the name of the sequence to play when the displayed is powered on.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDisplay object that invoked the callback
     *         - the result:a string corresponding to the name of the sequence to play when the displayed is powered on
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_STARTUPSEQ_INVALID.
     */
    function YDisplay_get_startupSeq_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_STARTUPSEQ_INVALID);
            } else {
                callback(context, obj, obj._startupSeq);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the name of the sequence to play when the displayed is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the name of the sequence to play when the displayed is powered on
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_set_startupSeq(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('startupSeq',rest_val);
    }

    /**
     * Returns the luminosity of the  module informative leds (from 0 to 100).
     * 
     * @return an integer corresponding to the luminosity of the  module informative leds (from 0 to 100)
     * 
     * On failure, throws an exception or returns YDisplay.BRIGHTNESS_INVALID.
     */
    function YDisplay_get_brightness()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_BRIGHTNESS_INVALID;
            }
        }
        return this._brightness;
    }

    /**
     * Gets the luminosity of the  module informative leds (from 0 to 100).
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDisplay object that invoked the callback
     *         - the result:an integer corresponding to the luminosity of the  module informative leds (from 0 to 100)
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_BRIGHTNESS_INVALID.
     */
    function YDisplay_get_brightness_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_BRIGHTNESS_INVALID);
            } else {
                callback(context, obj, obj._brightness);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the brightness of the display. The parameter is a value between 0 and
     * 100. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : an integer corresponding to the brightness of the display
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_set_brightness(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('brightness',rest_val);
    }

    /**
     * Returns the currently selected display orientation.
     * 
     * @return a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the currently selected
     * display orientation
     * 
     * On failure, throws an exception or returns YDisplay.ORIENTATION_INVALID.
     */
    function YDisplay_get_orientation()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_ORIENTATION_INVALID;
            }
        }
        return this._orientation;
    }

    /**
     * Gets the currently selected display orientation.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDisplay object that invoked the callback
     *         - the result:a value among Y_ORIENTATION_LEFT, Y_ORIENTATION_UP, Y_ORIENTATION_RIGHT and
     *         Y_ORIENTATION_DOWN corresponding to the currently selected display orientation
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_ORIENTATION_INVALID.
     */
    function YDisplay_get_orientation_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_ORIENTATION_INVALID);
            } else {
                callback(context, obj, obj._orientation);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Changes the display orientation. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     * 
     * @param newval : a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the display orientation
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_set_orientation(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('orientation',rest_val);
    }

    /**
     * Returns the display width, in pixels.
     * 
     * @return an integer corresponding to the display width, in pixels
     * 
     * On failure, throws an exception or returns YDisplay.DISPLAYWIDTH_INVALID.
     */
    function YDisplay_get_displayWidth()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DISPLAYWIDTH_INVALID;
            }
        }
        return this._displayWidth;
    }

    /**
     * Gets the display width, in pixels.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDisplay object that invoked the callback
     *         - the result:an integer corresponding to the display width, in pixels
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_DISPLAYWIDTH_INVALID.
     */
    function YDisplay_get_displayWidth_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DISPLAYWIDTH_INVALID);
            } else {
                callback(context, obj, obj._displayWidth);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the display height, in pixels.
     * 
     * @return an integer corresponding to the display height, in pixels
     * 
     * On failure, throws an exception or returns YDisplay.DISPLAYHEIGHT_INVALID.
     */
    function YDisplay_get_displayHeight()
    {
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DISPLAYHEIGHT_INVALID;
            }
        }
        return this._displayHeight;
    }

    /**
     * Gets the display height, in pixels.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDisplay object that invoked the callback
     *         - the result:an integer corresponding to the display height, in pixels
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_DISPLAYHEIGHT_INVALID.
     */
    function YDisplay_get_displayHeight_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DISPLAYHEIGHT_INVALID);
            } else {
                callback(context, obj, obj._displayHeight);
            }
        };
        if (this._cacheExpiration <= YAPI.GetTickCount()) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the display type: monochrome, gray levels or full color.
     * 
     * @return a value among YDisplay.DISPLAYTYPE_MONO, YDisplay.DISPLAYTYPE_GRAY and
     * YDisplay.DISPLAYTYPE_RGB corresponding to the display type: monochrome, gray levels or full color
     * 
     * On failure, throws an exception or returns YDisplay.DISPLAYTYPE_INVALID.
     */
    function YDisplay_get_displayType()
    {
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_DISPLAYTYPE_INVALID;
            }
        }
        return this._displayType;
    }

    /**
     * Gets the display type: monochrome, gray levels or full color.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDisplay object that invoked the callback
     *         - the result:a value among Y_DISPLAYTYPE_MONO, Y_DISPLAYTYPE_GRAY and Y_DISPLAYTYPE_RGB
     *         corresponding to the display type: monochrome, gray levels or full color
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_DISPLAYTYPE_INVALID.
     */
    function YDisplay_get_displayType_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_DISPLAYTYPE_INVALID);
            } else {
                callback(context, obj, obj._displayType);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     * 
     * @return an integer corresponding to the width of the layers to draw on, in pixels
     * 
     * On failure, throws an exception or returns YDisplay.LAYERWIDTH_INVALID.
     */
    function YDisplay_get_layerWidth()
    {
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LAYERWIDTH_INVALID;
            }
        }
        return this._layerWidth;
    }

    /**
     * Gets the width of the layers to draw on, in pixels.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDisplay object that invoked the callback
     *         - the result:an integer corresponding to the width of the layers to draw on, in pixels
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LAYERWIDTH_INVALID.
     */
    function YDisplay_get_layerWidth_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LAYERWIDTH_INVALID);
            } else {
                callback(context, obj, obj._layerWidth);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     * 
     * @return an integer corresponding to the height of the layers to draw on, in pixels
     * 
     * On failure, throws an exception or returns YDisplay.LAYERHEIGHT_INVALID.
     */
    function YDisplay_get_layerHeight()
    {
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LAYERHEIGHT_INVALID;
            }
        }
        return this._layerHeight;
    }

    /**
     * Gets the height of the layers to draw on, in pixels.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDisplay object that invoked the callback
     *         - the result:an integer corresponding to the height of the layers to draw on, in pixels
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LAYERHEIGHT_INVALID.
     */
    function YDisplay_get_layerHeight_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LAYERHEIGHT_INVALID);
            } else {
                callback(context, obj, obj._layerHeight);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    /**
     * Returns the number of available layers to draw on.
     * 
     * @return an integer corresponding to the number of available layers to draw on
     * 
     * On failure, throws an exception or returns YDisplay.LAYERCOUNT_INVALID.
     */
    function YDisplay_get_layerCount()
    {
        if (this._cacheExpiration == 0) {
            if (this.load(YAPI.defaultCacheValidity) != YAPI_SUCCESS) {
                return Y_LAYERCOUNT_INVALID;
            }
        }
        return this._layerCount;
    }

    /**
     * Gets the number of available layers to draw on.
     * 
     * @param callback : callback function that is invoked when the result is known.
     *         The callback function receives three arguments:
     *         - the user-specific context object
     *         - the YDisplay object that invoked the callback
     *         - the result:an integer corresponding to the number of available layers to draw on
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     * 
     * On failure, throws an exception or returns Y_LAYERCOUNT_INVALID.
     */
    function YDisplay_get_layerCount_async(callback,context)
    {
        var loadcb;                 // func;
        loadcb = function(ctx,obj,res) {
            if (res != YAPI_SUCCESS) {
                callback(context, obj, Y_LAYERCOUNT_INVALID);
            } else {
                callback(context, obj, obj._layerCount);
            }
        };
        if (this._cacheExpiration == 0) {
            this.load_async(YAPI.defaultCacheValidity,loadcb,null);
        } else {
            loadcb(null, this, YAPI_SUCCESS);
        }
    }

    function YDisplay_get_command()
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
     *         - the YDisplay object that invoked the callback
     *         - the result:
     * @param context : user-specific object that is passed as-is to the callback function
     * 
     * @return nothing: this is the asynchronous version, that uses a callback instead of a return value
     */
    function YDisplay_get_command_async(callback,context)
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

    function YDisplay_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a display for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     * 
     * This function does not require that the display is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDisplay.isOnline() to test if the display is
     * indeed online at a given time. In case of ambiguity when looking for
     * a display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     * 
     * @param func : a string that uniquely characterizes the display
     * 
     * @return a YDisplay object allowing you to drive the display.
     */
    function YDisplay_FindDisplay(func)                         // class method
    {
        var obj;                    // YDisplay;
        obj = YFunction._FindFromCache("Display", func);
        if (obj == null) {
            obj = new YDisplay(func);
            YFunction._AddToCache("Display", func, obj);
        }
        return obj;
    }

    /**
     * Clears the display screen and resets all display layers to their default state.
     * Using this function in a sequence will kill the sequence play-back. Don't use that
     * function to reset the display at sequence start-up.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_resetAll()
    {
        this.flushLayers();
        this.resetHiddenLayerFlags();
        return this.sendCommand("Z");
    }

    /**
     * Smoothly changes the brightness of the screen to produce a fade-in or fade-out
     * effect.
     * 
     * @param brightness : the new screen brightness
     * @param duration : duration of the brightness transition, in milliseconds.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_fade(brightness,duration)
    {
        this.flushLayers();
        return this.sendCommand("+"+String(Math.round(brightness))+","+String(Math.round(duration)));
    }

    /**
     * Starts to record all display commands into a sequence, for later replay.
     * The name used to store the sequence is specified when calling
     * saveSequence(), once the recording is complete.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_newSequence()
    {
        this.flushLayers();
        this._sequence = "";
        this._recording = true;
        return YAPI_SUCCESS;
    }

    /**
     * Stops recording display commands and saves the sequence into the specified
     * file on the display internal memory. The sequence can be later replayed
     * using playSequence().
     * 
     * @param sequenceName : the name of the newly created sequence
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_saveSequence(sequenceName)
    {
        this.flushLayers();
        this._recording = false;
        this._upload(sequenceName, new Buffer(this._sequence, YAPI.defaultEncoding));
        //We need to use YPRINTF("") for Objective-C
        this._sequence = "";
        return YAPI_SUCCESS;
    }

    /**
     * Replays a display sequence previously recorded using
     * newSequence() and saveSequence().
     * 
     * @param sequenceName : the name of the newly created sequence
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_playSequence(sequenceName)
    {
        this.flushLayers();
        return this.sendCommand("S"+sequenceName);
    }

    /**
     * Waits for a specified delay (in milliseconds) before playing next
     * commands in current sequence. This method can be used while
     * recording a display sequence, to insert a timed wait in the sequence
     * (without any immediate effect). It can also be used dynamically while
     * playing a pre-recorded sequence, to suspend or resume the execution of
     * the sequence. To cancel a delay, call the same method with a zero delay.
     * 
     * @param delay_ms : the duration to wait, in milliseconds
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_pauseSequence(delay_ms)
    {
        this.flushLayers();
        return this.sendCommand("W"+String(Math.round(delay_ms)));
    }

    /**
     * Stops immediately any ongoing sequence replay.
     * The display is left as is.
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_stopSequence()
    {
        this.flushLayers();
        return this.sendCommand("S");
    }

    /**
     * Uploads an arbitrary file (for instance a GIF file) to the display, to the
     * specified full path name. If a file already exists with the same path name,
     * its content is overwritten.
     * 
     * @param pathname : path and name of the new file to create
     * @param content : binary buffer with the content to set
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_upload(pathname,content)
    {
        return this._upload(pathname, content);
    }

    /**
     * Copies the whole content of a layer to another layer. The color and transparency
     * of all the pixels from the destination layer are set to match the source pixels.
     * This method only affects the displayed content, but does not change any
     * property of the layer object.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     * 
     * @param srcLayerId : the identifier of the source layer (a number in range 0..layerCount-1)
     * @param dstLayerId : the identifier of the destination layer (a number in range 0..layerCount-1)
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_copyLayerContent(srcLayerId,dstLayerId)
    {
        this.flushLayers();
        return this.sendCommand("o"+String(Math.round(srcLayerId))+","+String(Math.round(dstLayerId)));
    }

    /**
     * Swaps the whole content of two layers. The color and transparency of all the pixels from
     * the two layers are swapped. This method only affects the displayed content, but does
     * not change any property of the layer objects. In particular, the visibility of each
     * layer stays unchanged. When used between onae hidden layer and a visible layer,
     * this method makes it possible to easily implement double-buffering.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     * 
     * @param layerIdA : the first layer (a number in range 0..layerCount-1)
     * @param layerIdB : the second layer (a number in range 0..layerCount-1)
     * 
     * @return YAPI.SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_swapLayerContent(layerIdA,layerIdB)
    {
        this.flushLayers();
        return this.sendCommand("E"+String(Math.round(layerIdA))+","+String(Math.round(layerIdB)));
    }

    /**
     * Continues the enumeration of displays started using yFirstDisplay().
     * 
     * @return a pointer to a YDisplay object, corresponding to
     *         a display currently online, or a null pointer
     *         if there are no more displays to enumerate.
     */
    function YDisplay_nextDisplay()
    {   var resolve = YAPI.resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        var next_hwid = YAPI.getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YDisplay.FindDisplay(next_hwid);
    }

    /**
     * Starts the enumeration of displays currently accessible.
     * Use the method YDisplay.nextDisplay() to iterate on
     * next displays.
     * 
     * @return a pointer to a YDisplay object, corresponding to
     *         the first display currently online, or a null pointer
     *         if there are none.
     */
    function YDisplay_FirstDisplay()
    {
        var next_hwid = YAPI.getFirstHardwareId('Display');
        if(next_hwid == null) return null;
        return YDisplay.FindDisplay(next_hwid);
    }

    //--- (end of generated code: YDisplay implementation)

    /**
     * Returns a YDisplayLayer object that can be used to draw on the specified
     * layer. The content is displayed only when the layer is active on the
     * screen (and not masked by other overlapping layers).
     * 
     * @param layerId : the identifier of the layer (a number in range 0..layerCount-1)
     * 
     * @return an YDisplayLayer object
     * 
     * On failure, throws an exception or returns null.
     */
    function YDisplay_get_displayLayer(layerId)
    {
        if (!this._allDisplayLayers) {
            var nb_display_layer = this.get_layerCount();
            this._allDisplayLayers = [];
            for(var i=0; i < nb_display_layer; i++) {
                this._allDisplayLayers[i] = new YDisplayLayer(this, ''+i);
            }
        }
        if(layerId < 0 || layerId >= this._allDisplayLayers.length) {
            throw new YAPI_Exception(YAPI.INVALID_ARGUMENT, "Invalid layerId");
        }
        return this._allDisplayLayers[layerId];
    }
    
    function YDisplay_flushLayers()
    {
        if(this._allDisplayLayers) {
            for(var i = 0; i < this._allDisplayLayers.length; i++) {
                this._allDisplayLayers[i].flush_now();
            }
        }
        return YAPI_SUCCESS;
    }
    
    function YDisplay_resetHiddenLayerFlags()
    {
        if(this._allDisplayLayers) {
            for(var i = 0; i < this._allDisplayLayers.length; i++) {
                this._allDisplayLayers[i].resetHiddenFlag();
            }
        }
    }

    function YDisplay_sendCommand(cmd)
    {
        if(!this._recording) {
            // ignore call when there is no ongoing sequence
            return this.set_command(cmd);
        }
        this._sequence += cmd+"\n";
        return YAPI_SUCCESS;
    }    
    
    //--- (generated code: YDisplay initialization)
    YDisplay = YFunction._Subclass(_YDisplay, {
        // Constants
        ENABLED_FALSE               : 0,
        ENABLED_TRUE                : 1,
        ENABLED_INVALID             : -1,
        STARTUPSEQ_INVALID          : YAPI_INVALID_STRING,
        BRIGHTNESS_INVALID          : YAPI_INVALID_UINT,
        ORIENTATION_LEFT            : 0,
        ORIENTATION_UP              : 1,
        ORIENTATION_RIGHT           : 2,
        ORIENTATION_DOWN            : 3,
        ORIENTATION_INVALID         : -1,
        DISPLAYWIDTH_INVALID        : YAPI_INVALID_UINT,
        DISPLAYHEIGHT_INVALID       : YAPI_INVALID_UINT,
        DISPLAYTYPE_MONO            : 0,
        DISPLAYTYPE_GRAY            : 1,
        DISPLAYTYPE_RGB             : 2,
        DISPLAYTYPE_INVALID         : -1,
        LAYERWIDTH_INVALID          : YAPI_INVALID_UINT,
        LAYERHEIGHT_INVALID         : YAPI_INVALID_UINT,
        LAYERCOUNT_INVALID          : YAPI_INVALID_UINT,
        COMMAND_INVALID             : YAPI_INVALID_STRING
    }, {
        // Class methods
        FindDisplay                 : YDisplay_FindDisplay,
        FirstDisplay                : YDisplay_FirstDisplay
    }, {
        // Methods
        get_enabled                 : YDisplay_get_enabled,
        enabled                     : YDisplay_get_enabled,
        get_enabled_async           : YDisplay_get_enabled_async,
        enabled_async               : YDisplay_get_enabled_async,
        set_enabled                 : YDisplay_set_enabled,
        setEnabled                  : YDisplay_set_enabled,
        get_startupSeq              : YDisplay_get_startupSeq,
        startupSeq                  : YDisplay_get_startupSeq,
        get_startupSeq_async        : YDisplay_get_startupSeq_async,
        startupSeq_async            : YDisplay_get_startupSeq_async,
        set_startupSeq              : YDisplay_set_startupSeq,
        setStartupSeq               : YDisplay_set_startupSeq,
        get_brightness              : YDisplay_get_brightness,
        brightness                  : YDisplay_get_brightness,
        get_brightness_async        : YDisplay_get_brightness_async,
        brightness_async            : YDisplay_get_brightness_async,
        set_brightness              : YDisplay_set_brightness,
        setBrightness               : YDisplay_set_brightness,
        get_orientation             : YDisplay_get_orientation,
        orientation                 : YDisplay_get_orientation,
        get_orientation_async       : YDisplay_get_orientation_async,
        orientation_async           : YDisplay_get_orientation_async,
        set_orientation             : YDisplay_set_orientation,
        setOrientation              : YDisplay_set_orientation,
        get_displayWidth            : YDisplay_get_displayWidth,
        displayWidth                : YDisplay_get_displayWidth,
        get_displayWidth_async      : YDisplay_get_displayWidth_async,
        displayWidth_async          : YDisplay_get_displayWidth_async,
        get_displayHeight           : YDisplay_get_displayHeight,
        displayHeight               : YDisplay_get_displayHeight,
        get_displayHeight_async     : YDisplay_get_displayHeight_async,
        displayHeight_async         : YDisplay_get_displayHeight_async,
        get_displayType             : YDisplay_get_displayType,
        displayType                 : YDisplay_get_displayType,
        get_displayType_async       : YDisplay_get_displayType_async,
        displayType_async           : YDisplay_get_displayType_async,
        get_layerWidth              : YDisplay_get_layerWidth,
        layerWidth                  : YDisplay_get_layerWidth,
        get_layerWidth_async        : YDisplay_get_layerWidth_async,
        layerWidth_async            : YDisplay_get_layerWidth_async,
        get_layerHeight             : YDisplay_get_layerHeight,
        layerHeight                 : YDisplay_get_layerHeight,
        get_layerHeight_async       : YDisplay_get_layerHeight_async,
        layerHeight_async           : YDisplay_get_layerHeight_async,
        get_layerCount              : YDisplay_get_layerCount,
        layerCount                  : YDisplay_get_layerCount,
        get_layerCount_async        : YDisplay_get_layerCount_async,
        layerCount_async            : YDisplay_get_layerCount_async,
        get_command                 : YDisplay_get_command,
        command                     : YDisplay_get_command,
        get_command_async           : YDisplay_get_command_async,
        command_async               : YDisplay_get_command_async,
        set_command                 : YDisplay_set_command,
        setCommand                  : YDisplay_set_command,
        resetAll                    : YDisplay_resetAll,
        fade                        : YDisplay_fade,
        newSequence                 : YDisplay_newSequence,
        saveSequence                : YDisplay_saveSequence,
        playSequence                : YDisplay_playSequence,
        pauseSequence               : YDisplay_pauseSequence,
        stopSequence                : YDisplay_stopSequence,
        upload                      : YDisplay_upload,
        copyLayerContent            : YDisplay_copyLayerContent,
        swapLayerContent            : YDisplay_swapLayerContent,
        nextDisplay                 : YDisplay_nextDisplay,
        _parseAttr                  : YDisplay_parseAttr
    });
    //--- (end of generated code: YDisplay initialization)
    YDisplay.prototype.get_displayLayer        = YDisplay_get_displayLayer;
    YDisplay.prototype.flushLayers             = YDisplay_flushLayers;
    YDisplay.prototype.resetHiddenLayerFlags   = YDisplay_resetHiddenLayerFlags;
    YDisplay.prototype.sendCommand             = YDisplay_sendCommand;
})();

//--- (generated code: Display functions)

/**
 * Retrieves a display for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 * 
 * This function does not require that the display is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDisplay.isOnline() to test if the display is
 * indeed online at a given time. In case of ambiguity when looking for
 * a display by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 * 
 * @param func : a string that uniquely characterizes the display
 * 
 * @return a YDisplay object allowing you to drive the display.
 */
function yFindDisplay(func)
{
    return YDisplay.FindDisplay(func);
}

/**
 * Starts the enumeration of displays currently accessible.
 * Use the method YDisplay.nextDisplay() to iterate on
 * next displays.
 * 
 * @return a pointer to a YDisplay object, corresponding to
 *         the first display currently online, or a null pointer
 *         if there are none.
 */
function yFirstDisplay()
{
    return YDisplay.FirstDisplay();
}

//--- (end of generated code: Display functions)


