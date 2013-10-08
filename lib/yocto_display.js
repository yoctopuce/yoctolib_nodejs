/*********************************************************************
 *
 * $Id: yocto_display.js 12326 2013-08-13 15:52:20Z mvuilleu $
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
var Y_POWERSTATE_OFF                = 0;
var Y_POWERSTATE_ON                 = 1;
var Y_POWERSTATE_INVALID            = -1;
var Y_ORIENTATION_LEFT              = 0;
var Y_ORIENTATION_UP                = 1;
var Y_ORIENTATION_RIGHT             = 2;
var Y_ORIENTATION_DOWN              = 3;
var Y_ORIENTATION_INVALID           = -1;
var Y_DISPLAYTYPE_MONO              = 0;
var Y_DISPLAYTYPE_GRAY              = 1;
var Y_DISPLAYTYPE_RGB               = 2;
var Y_DISPLAYTYPE_INVALID           = -1;
var Y_LOGICALNAME_INVALID           = "!INVALID!";
var Y_ADVERTISEDVALUE_INVALID       = "!INVALID!";
var Y_STARTUPSEQ_INVALID            = "!INVALID!";
var Y_BRIGHTNESS_INVALID            = -1;
var Y_DISPLAYWIDTH_INVALID          = -1;
var Y_DISPLAYHEIGHT_INVALID         = -1;
var Y_LAYERWIDTH_INVALID            = -1;
var Y_LAYERHEIGHT_INVALID           = -1;
var Y_LAYERCOUNT_INVALID            = -1;
var Y_COMMAND_INVALID               = "!INVALID!";
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

/**
 * YDisplayLayer Class: Image layer containing data to display
 * 
 * A DisplayLayer is an image layer containing objects to display
 * (bitmaps, text, etc.). The content will only be displayed when
 * the layer is active on the screen (and not masked by other
 * overlapping layers).
 */
var YDisplayLayer; // definition below
(function()
{
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
     * @return YAPI_SUCCESS if the call succeeds.
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
     * @return YAPI_SUCCESS if the call succeeds.
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
     * @param color: the desired pen color, as a 24-bit RGB value
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_selectColorPen(int_color)
    {
        return this.command_push("c"+("0000000"+(int_color).toString(16)).slice(-06));
    }

    /**
     * Selects the pen gray level for all subsequent drawing functions,
     * including text drawing. The gray level is provided as a number between
     * 0 (black) and 255 (white, or whichever the lighest color is).
     * For monochrome displays (without gray levels), any value
     * lower than 128 is rendered as black, and any value equal
     * or above to 128 is non-black.
     * 
     * @param graylevel: the desired gray level, from 0 to 255
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_selectGrayPen(int_graylevel)
    {
        return this.command_push("g"+String(Math.round(int_graylevel)));
    }

    /**
     * Selects an eraser instead of a pen for all subsequent drawing functions,
     * except for text drawing and bitmap copy functions. Any point drawn
     * using the eraser becomes transparent (as when the layer is empty),
     * showing the other layers beneath it.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
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
     * @param mode: <t>true</t> to enable antialiasing, <t>false</t> to
     *         disable it.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_setAntialiasingMode(bool_mode)
    {
        return this.command_push("a"+(bool_mode?"1":"0"));
    }

    /**
     * Draws a single pixel at the specified position.
     * 
     * @param x: the distance from left of layer, in pixels
     * @param y: the distance from top of layer, in pixels
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawPixel(int_x,int_y)
    {
        return this.command_flush("P"+String(Math.round(int_x))+","+String(Math.round(int_y)));
    }

    /**
     * Draws an empty rectangle at a specified position.
     * 
     * @param x1: the distance from left of layer to the left border of the rectangle, in pixels
     * @param y1: the distance from top of layer to the top border of the rectangle, in pixels
     * @param x2: the distance from left of layer to the right border of the rectangle, in pixels
     * @param y2: the distance from top of layer to the bottom border of the rectangle, in pixels
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawRect(int_x1,int_y1,int_x2,int_y2)
    {
        return this.command_flush("R"+String(Math.round(int_x1))+","+String(Math.round(int_y1))+","+String(Math.round(int_x2))+","+String(Math.round(int_y2)));
    }

    /**
     * Draws a filled rectangular bar at a specified position.
     * 
     * @param x1: the distance from left of layer to the left border of the rectangle, in pixels
     * @param y1: the distance from top of layer to the top border of the rectangle, in pixels
     * @param x2: the distance from left of layer to the right border of the rectangle, in pixels
     * @param y2: the distance from top of layer to the bottom border of the rectangle, in pixels
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawBar(int_x1,int_y1,int_x2,int_y2)
    {
        return this.command_flush("B"+String(Math.round(int_x1))+","+String(Math.round(int_y1))+","+String(Math.round(int_x2))+","+String(Math.round(int_y2)));
    }

    /**
     * Draws an empty circle at a specified position.
     * 
     * @param x: the distance from left of layer to the center of the circle, in pixels
     * @param y: the distance from top of layer to the center of the circle, in pixels
     * @param r: the radius of the circle, in pixels
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawCircle(int_x,int_y,int_r)
    {
        return this.command_flush("C"+String(Math.round(int_x))+","+String(Math.round(int_y))+","+String(Math.round(int_r)));
    }

    /**
     * Draws a filled disc at a given position.
     * 
     * @param x: the distance from left of layer to the center of the disc, in pixels
     * @param y: the distance from top of layer to the center of the disc, in pixels
     * @param r: the radius of the disc, in pixels
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawDisc(int_x,int_y,int_r)
    {
        return this.command_flush("D"+String(Math.round(int_x))+","+String(Math.round(int_y))+","+String(Math.round(int_r)));
    }

    /**
     * Selects a font to use for the next text drawing functions, by providing the name of the
     * font file. You can use a built-in font as well as a font file that you have previously
     * uploaded to the device built-in memory. If you experience problems selecting a font
     * file, check the device logs for any error message such as missing font file or bad font
     * file format.
     * 
     * @param fontname: the font file name
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_selectFont(str_fontname)
    {
        return this.command_push("&"+str_fontname+""+String.fromCharCode(27));
    }

    /**
     * Draws a text string at the specified position. The point of the text that is aligned
     * to the specified pixel position is called the anchor point, and can be chosen among
     * several options. Text is rendered from left to right, without implicit wrapping.
     * 
     * @param x: the distance from left of layer to the text ancor point, in pixels
     * @param y: the distance from top of layer to the text ancor point, in pixels
     * @param anchor: the text anchor point, chosen among the Y_ALIGN enumeration:
     *         Y_ALIGN_TOP_LEFT,    Y_ALIGN_CENTER_LEFT,    Y_ALIGN_BASELINE_LEFT,    Y_ALIGN_BOTTOM_LEFT,
     *         Y_ALIGN_TOP_CENTER,  Y_ALIGN_CENTER,         Y_ALIGN_BASELINE_CENTER,  Y_ALIGN_BOTTOM_CENTER,
     *         Y_ALIGN_TOP_DECIMAL, Y_ALIGN_CENTER_DECIMAL, Y_ALIGN_BASELINE_DECIMAL, Y_ALIGN_BOTTOM_DECIMAL,
     *         Y_ALIGN_TOP_RIGHT,   Y_ALIGN_CENTER_RIGHT,   Y_ALIGN_BASELINE_RIGHT,   Y_ALIGN_BOTTOM_RIGHT.
     * @param text: the text string to draw
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawText(int_x,int_y,enumAlign_anchor,str_text)
    {
        return this.command_flush("T"+String(Math.round(int_x))+","+String(Math.round(int_y))+","+String(enumAlign_anchor)+","+str_text+""+String.fromCharCode(27));
    }

    /**
     * Draws a GIF image at the specified position. The GIF image must have been previously
     * uploaded to the device built-in memory. If you experience problems using an image
     * file, check the device logs for any error message such as missing image file or bad
     * image file format.
     * 
     * @param x: the distance from left of layer to the left of the image, in pixels
     * @param y: the distance from top of layer to the top of the image, in pixels
     * @param imagename: the GIF file name
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawImage(int_x,int_y,str_imagename)
    {
        return this.command_flush("*"+String(Math.round(int_x))+","+String(Math.round(int_y))+","+str_imagename+""+String.fromCharCode(27));
        
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
     * @param x: the distance from left of layer to the left of the bitmap, in pixels
     * @param y: the distance from top of layer to the top of the bitmap, in pixels
     * @param w: the width of the bitmap, in pixels
     * @param bitmap: a binary object
     * @param bgcol: the background gray level to use for zero bits (0 = black,
     *         255 = white), or -1 to leave the pixels unchanged
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_drawBitmap(int_x,int_y,int_w,bin_bitmap,int_bgcol)
    {
        var destname; // type: str;
        destname = "layer"+String(Math.round(this._id))+":"+String(Math.round(int_w))+","+String(Math.round(int_bgcol))+"@"+String(Math.round(int_x))+","+String(Math.round(int_y));
        return this._display.upload(destname,bin_bitmap);
        
    }

    /**
     * Moves the drawing pointer of this layer to the specified position.
     * 
     * @param x: the distance from left of layer, in pixels
     * @param y: the distance from top of layer, in pixels
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_moveTo(int_x,int_y)
    {
        return this.command_push("@"+String(Math.round(int_x))+","+String(Math.round(int_y)));
    }

    /**
     * Draws a line from current drawing pointer position to the specified position.
     * The specified destination pixel is included in the line. The pointer position
     * is then moved to the end point of the line.
     * 
     * @param x: the distance from left of layer to the end point of the line, in pixels
     * @param y: the distance from top of layer to the end point of the line, in pixels
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_lineTo(int_x,int_y)
    {
        return this.command_flush("-"+String(Math.round(int_x))+","+String(Math.round(int_y)));
    }

    /**
     * Outputs a message in the console area, and advances the console pointer accordingly.
     * The console pointer position is automatically moved to the beginning
     * of the next line when a newline character is met, or when the right margin
     * is hit. When the new text to display extends below the lower margin, the
     * console area is automatically scrolled up.
     * 
     * @param text: the message to display
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_consoleOut(str_text)
    {
        return this.command_flush("!"+str_text+""+String.fromCharCode(27));
    }

    /**
     * Sets up display margins for the consoleOut function.
     * 
     * @param x1: the distance from left of layer to the left margin, in pixels
     * @param y1: the distance from top of layer to the top margin, in pixels
     * @param x2: the distance from left of layer to the right margin, in pixels
     * @param y2: the distance from top of layer to the bottom margin, in pixels
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_setConsoleMargins(int_x1,int_y1,int_x2,int_y2)
    {
        return this.command_push("m"+String(Math.round(int_x1))+","+String(Math.round(int_y1))+","+String(Math.round(int_x2))+","+String(Math.round(int_y2))); 
        
    }

    /**
     * Sets up the background color used by the clearConsole function and by
     * the console scrolling feature.
     * 
     * @param bgcol: the background gray level to use when scrolling (0 = black,
     *         255 = white), or -1 for transparent
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_setConsoleBackground(int_bgcol)
    {
        return this.command_push("b"+String(Math.round(int_bgcol))); 
        
    }

    /**
     * Sets up the wrapping behaviour used by the consoleOut function.
     * 
     * @param wordwrap: true to wrap only between words,
     *         false to wrap on the last column anyway.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_setConsoleWordWrap(bool_wordwrap)
    {
        return this.command_push("w"+(bool_wordwrap?"1":"0")); 
        
    }

    /**
     * Blanks the console area within console margins, and resets the console pointer
     * to the upper left corner of the console.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
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
     * @param x: the distance from left of display to the upper left corner of the layer
     * @param y: the distance from top of display to the upper left corner of the layer
     * @param scrollTime: number of milliseconds to use for smooth scrolling, or
     *         0 if the scrolling should be immediate.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplayLayer_setLayerPosition(int_x,int_y,int_scrollTime)
    {
        return this.command_flush("#"+String(Math.round(int_x))+","+String(Math.round(int_y))+","+String(Math.round(int_scrollTime))); 
        
    }

    /**
     * Hides the layer. The state of the layer is perserved but the layer is not displayed
     * on the screen until the next call to unhide(). Hiding the layer can positively
     * affect the drawing speed, since it postpones the rendering until all operations are
     * completed (double-buffering).
     * 
     * @return YAPI_SUCCESS if the call succeeds.
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
     * @return YAPI_SUCCESS if the call succeeds.
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
     * On failure, throws an exception or returns Y_DISPLAYWIDTH_INVALID.
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
     * On failure, throws an exception or returns Y_DISPLAYHEIGHT_INVALID.
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
     * On failure, throws an exception or returns Y_LAYERWIDTH_INVALID.
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
     * On failure, throws an exception or returns Y_LAYERHEIGHT_INVALID.
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

    function _YDisplayLayer(obj_parent, str_id)
    {
        this._display      = obj_parent;
        this._id           = str_id;
        this._cmdbuff      = '';
        this._hidden       = false;
        this.flush_now     = YDisplayLayer_flush_now;
        this.command_push  = YDisplayLayer_command_push;
        this.command_flush = YDisplayLayer_command_flush;
        //
        //--- (generated code: YDisplayLayer constructor)
        // public
        this.reset                           = YDisplayLayer_reset;
        this.clear                           = YDisplayLayer_clear;
        this.selectColorPen                  = YDisplayLayer_selectColorPen;
        this.selectGrayPen                   = YDisplayLayer_selectGrayPen;
        this.selectEraser                    = YDisplayLayer_selectEraser;
        this.setAntialiasingMode             = YDisplayLayer_setAntialiasingMode;
        this.drawPixel                       = YDisplayLayer_drawPixel;
        this.drawRect                        = YDisplayLayer_drawRect;
        this.drawBar                         = YDisplayLayer_drawBar;
        this.drawCircle                      = YDisplayLayer_drawCircle;
        this.drawDisc                        = YDisplayLayer_drawDisc;
        this.selectFont                      = YDisplayLayer_selectFont;
        this.drawText                        = YDisplayLayer_drawText;
        this.drawImage                       = YDisplayLayer_drawImage;
        this.drawBitmap                      = YDisplayLayer_drawBitmap;
        this.moveTo                          = YDisplayLayer_moveTo;
        this.lineTo                          = YDisplayLayer_lineTo;
        this.consoleOut                      = YDisplayLayer_consoleOut;
        this.setConsoleMargins               = YDisplayLayer_setConsoleMargins;
        this.setConsoleBackground            = YDisplayLayer_setConsoleBackground;
        this.setConsoleWordWrap              = YDisplayLayer_setConsoleWordWrap;
        this.clearConsole                    = YDisplayLayer_clearConsole;
        this.setLayerPosition                = YDisplayLayer_setLayerPosition;
        this.hide                            = YDisplayLayer_hide;
        this.unhide                          = YDisplayLayer_unhide;
        this.get_display                     = YDisplayLayer_get_display;
        this.display                         = YDisplayLayer_get_display;
        this.get_displayWidth                = YDisplayLayer_get_displayWidth;
        this.displayWidth                    = YDisplayLayer_get_displayWidth;
        this.get_displayHeight               = YDisplayLayer_get_displayHeight;
        this.displayHeight                   = YDisplayLayer_get_displayHeight;
        this.get_layerWidth                  = YDisplayLayer_get_layerWidth;
        this.layerWidth                      = YDisplayLayer_get_layerWidth;
        this.get_layerHeight                 = YDisplayLayer_get_layerHeight;
        this.layerHeight                     = YDisplayLayer_get_layerHeight;
        this.resetHiddenFlag                 = YDisplayLayer_resetHiddenFlag;
        //--- (end of generated code: YDisplayLayer constructor)
    }

    YDisplayLayer = _YDisplayLayer;
})();


/**
 * YDisplay Class: Display function interface
 * 
 * Yoctopuce display interface rocks. More details to come...
 */
var YDisplay; // definition below
(function()
{
    //--- (generated code: YDisplay implementation)

    /**
     * Returns the logical name of the display.
     * 
     * @return a string corresponding to the logical name of the display
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     */
    function YDisplay_get_logicalName()
    {   var json_val = this._getAttr('logicalName');
        return (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
    }

    /**
     * Returns the logical name of the display.
     * 
     * @return a string corresponding to the logical name of the display
     * 
     * On failure, throws an exception or returns Y_LOGICALNAME_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_logicalName_async(func_callback, obj_context)
    {   this._getAttr_async('logicalName',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LOGICALNAME_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the logical name of the display. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the logical name of the display
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_set_logicalName(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('logicalName',rest_val);
    }

    /**
     * Returns the current value of the display (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the display (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     */
    function YDisplay_get_advertisedValue()
    {   var json_val = this._getAttr('advertisedValue');
        return (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
    }

    /**
     * Returns the current value of the display (no more than 6 characters).
     * 
     * @return a string corresponding to the current value of the display (no more than 6 characters)
     * 
     * On failure, throws an exception or returns Y_ADVERTISEDVALUE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_advertisedValue_async(func_callback, obj_context)
    {   this._getAttr_async('advertisedValue',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ADVERTISEDVALUE_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the power state of the display.
     * 
     * @return either Y_POWERSTATE_OFF or Y_POWERSTATE_ON, according to the power state of the display
     * 
     * On failure, throws an exception or returns Y_POWERSTATE_INVALID.
     */
    function YDisplay_get_powerState()
    {   var json_val = this._getAttr('powerState');
        return (json_val == null ? Y_POWERSTATE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the power state of the display.
     * 
     * @return either Y_POWERSTATE_OFF or Y_POWERSTATE_ON, according to the power state of the display
     * 
     * On failure, throws an exception or returns Y_POWERSTATE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_powerState_async(func_callback, obj_context)
    {   this._getAttr_async('powerState',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_POWERSTATE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the power state of the display.
     * 
     * @param newval : either Y_POWERSTATE_OFF or Y_POWERSTATE_ON, according to the power state of the display
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_set_powerState(newval)
    {   var rest_val;
        rest_val = String(newval);
        return this._setAttr('powerState',rest_val);
    }

    /**
     * Returns the name of the sequence to play when the displayed is powered on.
     * 
     * @return a string corresponding to the name of the sequence to play when the displayed is powered on
     * 
     * On failure, throws an exception or returns Y_STARTUPSEQ_INVALID.
     */
    function YDisplay_get_startupSeq()
    {   var json_val = this._getAttr('startupSeq');
        return (json_val == null ? Y_STARTUPSEQ_INVALID : json_val);
    }

    /**
     * Returns the name of the sequence to play when the displayed is powered on.
     * 
     * @return a string corresponding to the name of the sequence to play when the displayed is powered on
     * 
     * On failure, throws an exception or returns Y_STARTUPSEQ_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_startupSeq_async(func_callback, obj_context)
    {   this._getAttr_async('startupSeq',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_STARTUPSEQ_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the name of the sequence to play when the displayed is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : a string corresponding to the name of the sequence to play when the displayed is powered on
     * 
     * @return YAPI_SUCCESS if the call succeeds.
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
     * On failure, throws an exception or returns Y_BRIGHTNESS_INVALID.
     */
    function YDisplay_get_brightness()
    {   var json_val = this._getAttr('brightness');
        return (json_val == null ? Y_BRIGHTNESS_INVALID : parseInt(json_val));
    }

    /**
     * Returns the luminosity of the  module informative leds (from 0 to 100).
     * 
     * @return an integer corresponding to the luminosity of the  module informative leds (from 0 to 100)
     * 
     * On failure, throws an exception or returns Y_BRIGHTNESS_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_brightness_async(func_callback, obj_context)
    {   this._getAttr_async('brightness',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_BRIGHTNESS_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the brightness of the display. The parameter is a value between 0 and
     * 100. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     * 
     * @param newval : an integer corresponding to the brightness of the display
     * 
     * @return YAPI_SUCCESS if the call succeeds.
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
     * @return a value among Y_ORIENTATION_LEFT, Y_ORIENTATION_UP, Y_ORIENTATION_RIGHT and
     * Y_ORIENTATION_DOWN corresponding to the currently selected display orientation
     * 
     * On failure, throws an exception or returns Y_ORIENTATION_INVALID.
     */
    function YDisplay_get_orientation()
    {   var json_val = this._getAttr('orientation');
        return (json_val == null ? Y_ORIENTATION_INVALID : parseInt(json_val));
    }

    /**
     * Returns the currently selected display orientation.
     * 
     * @return a value among Y_ORIENTATION_LEFT, Y_ORIENTATION_UP, Y_ORIENTATION_RIGHT and
     * Y_ORIENTATION_DOWN corresponding to the currently selected display orientation
     * 
     * On failure, throws an exception or returns Y_ORIENTATION_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_orientation_async(func_callback, obj_context)
    {   this._getAttr_async('orientation',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_ORIENTATION_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Changes the display orientation. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     * 
     * @param newval : a value among Y_ORIENTATION_LEFT, Y_ORIENTATION_UP, Y_ORIENTATION_RIGHT and
     * Y_ORIENTATION_DOWN corresponding to the display orientation
     * 
     * @return YAPI_SUCCESS if the call succeeds.
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
     * On failure, throws an exception or returns Y_DISPLAYWIDTH_INVALID.
     */
    function YDisplay_get_displayWidth()
    {   var json_val = this._getAttr('displayWidth');
        return (json_val == null ? Y_DISPLAYWIDTH_INVALID : parseInt(json_val));
    }

    /**
     * Returns the display width, in pixels.
     * 
     * @return an integer corresponding to the display width, in pixels
     * 
     * On failure, throws an exception or returns Y_DISPLAYWIDTH_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_displayWidth_async(func_callback, obj_context)
    {   this._getAttr_async('displayWidth',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_DISPLAYWIDTH_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the display height, in pixels.
     * 
     * @return an integer corresponding to the display height, in pixels
     * 
     * On failure, throws an exception or returns Y_DISPLAYHEIGHT_INVALID.
     */
    function YDisplay_get_displayHeight()
    {   var json_val = this._getAttr('displayHeight');
        return (json_val == null ? Y_DISPLAYHEIGHT_INVALID : parseInt(json_val));
    }

    /**
     * Returns the display height, in pixels.
     * 
     * @return an integer corresponding to the display height, in pixels
     * 
     * On failure, throws an exception or returns Y_DISPLAYHEIGHT_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_displayHeight_async(func_callback, obj_context)
    {   this._getAttr_async('displayHeight',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_DISPLAYHEIGHT_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the display type: monochrome, gray levels or full color.
     * 
     * @return a value among Y_DISPLAYTYPE_MONO, Y_DISPLAYTYPE_GRAY and Y_DISPLAYTYPE_RGB corresponding to
     * the display type: monochrome, gray levels or full color
     * 
     * On failure, throws an exception or returns Y_DISPLAYTYPE_INVALID.
     */
    function YDisplay_get_displayType()
    {   var json_val = this._getFixedAttr('displayType');
        return (json_val == null ? Y_DISPLAYTYPE_INVALID : parseInt(json_val));
    }

    /**
     * Returns the display type: monochrome, gray levels or full color.
     * 
     * @return a value among Y_DISPLAYTYPE_MONO, Y_DISPLAYTYPE_GRAY and Y_DISPLAYTYPE_RGB corresponding to
     * the display type: monochrome, gray levels or full color
     * 
     * On failure, throws an exception or returns Y_DISPLAYTYPE_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_displayType_async(func_callback, obj_context)
    {   this._getAttr_async('displayType',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_DISPLAYTYPE_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     * 
     * @return an integer corresponding to the width of the layers to draw on, in pixels
     * 
     * On failure, throws an exception or returns Y_LAYERWIDTH_INVALID.
     */
    function YDisplay_get_layerWidth()
    {   var json_val = this._getFixedAttr('layerWidth');
        return (json_val == null ? Y_LAYERWIDTH_INVALID : parseInt(json_val));
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     * 
     * @return an integer corresponding to the width of the layers to draw on, in pixels
     * 
     * On failure, throws an exception or returns Y_LAYERWIDTH_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_layerWidth_async(func_callback, obj_context)
    {   this._getAttr_async('layerWidth',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LAYERWIDTH_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     * 
     * @return an integer corresponding to the height of the layers to draw on, in pixels
     * 
     * On failure, throws an exception or returns Y_LAYERHEIGHT_INVALID.
     */
    function YDisplay_get_layerHeight()
    {   var json_val = this._getFixedAttr('layerHeight');
        return (json_val == null ? Y_LAYERHEIGHT_INVALID : parseInt(json_val));
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     * 
     * @return an integer corresponding to the height of the layers to draw on, in pixels
     * 
     * On failure, throws an exception or returns Y_LAYERHEIGHT_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_layerHeight_async(func_callback, obj_context)
    {   this._getAttr_async('layerHeight',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LAYERHEIGHT_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    /**
     * Returns the number of available layers to draw on.
     * 
     * @return an integer corresponding to the number of available layers to draw on
     * 
     * On failure, throws an exception or returns Y_LAYERCOUNT_INVALID.
     */
    function YDisplay_get_layerCount()
    {   var json_val = this._getFixedAttr('layerCount');
        return (json_val == null ? Y_LAYERCOUNT_INVALID : parseInt(json_val));
    }

    /**
     * Returns the number of available layers to draw on.
     * 
     * @return an integer corresponding to the number of available layers to draw on
     * 
     * On failure, throws an exception or returns Y_LAYERCOUNT_INVALID.
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_layerCount_async(func_callback, obj_context)
    {   this._getAttr_async('layerCount',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_LAYERCOUNT_INVALID : parseInt(json_val));
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YDisplay_get_command()
    {   var json_val = this._getAttr('command');
        return (json_val == null ? Y_COMMAND_INVALID : json_val);
    }

    /**
     * Asynchronous version for poor old Firefox
     */
    function YDisplay_get_command_async(func_callback, obj_context)
    {   this._getAttr_async('command',
            function(ctx, obj, json_val) {
                var res =  (json_val == null ? Y_COMMAND_INVALID : json_val);
                ctx.cb(ctx.userctx, obj, res); },
            { cb:func_callback, userctx:obj_context });
    }

    function YDisplay_set_command(newval)
    {   var rest_val;
        rest_val = newval;
        return this._setAttr('command',rest_val);
    }

    /**
     * Clears the display screen and resets all display layers to their default state.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
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
     * @param brightness: the new screen brightness
     * @param duration: duration of the brightness transition, in milliseconds.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_fade(int_brightness,int_duration)
    {
        this.flushLayers(); 
        return this.sendCommand("+"+String(Math.round(int_brightness))+","+String(Math.round(int_duration))); 
        
    }

    /**
     * Starts to record all display commands into a sequence, for later replay.
     * The name used to store the sequence is specified when calling
     * saveSequence(), once the recording is complete.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_saveSequence(str_sequenceName)
    {
        this.flushLayers();
        this._recording = false; 
        this._upload(str_sequenceName, this._sequence);
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_playSequence(str_sequenceName)
    {
        this.flushLayers();
        return this.sendCommand("S"+str_sequenceName); 
        
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_pauseSequence(int_delay_ms)
    {
        this.flushLayers(); 
        return this.sendCommand("W"+String(Math.round(int_delay_ms))); 
        
    }

    /**
     * Stops immediately any ongoing sequence replay.
     * The display is left as is.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_upload(str_pathname,bin_content)
    {
        return this._upload(str_pathname,bin_content);
        
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_copyLayerContent(int_srcLayerId,int_dstLayerId)
    {
        this.flushLayers(); 
        return this.sendCommand("o"+String(Math.round(int_srcLayerId))+","+String(Math.round(int_dstLayerId))); 
        
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
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_swapLayerContent(int_layerIdA,int_layerIdB)
    {
        this.flushLayers(); 
        return this.sendCommand("E"+String(Math.round(int_layerIdA))+","+String(Math.round(int_layerIdB))); 
        
    }

    /**
     * Continues the enumeration of displays started using yFirstDisplay().
     * 
     * @return a pointer to a YDisplay object, corresponding to
     *         a display currently online, or a null pointer
     *         if there are no more displays to enumerate.
     */
    function YDisplay_nextDisplay()
    {   var next_hwid = YAPI.getNextHardwareId(this._className, this._func);
        if(next_hwid == null) return null;
        return YDisplay.FindDisplay(next_hwid);
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
    function YDisplay_FindDisplay(str_func)
    {
        if(str_func == undefined) return null;
        var obj_func = YAPI.getFunction('Display', str_func);
        if(obj_func) return obj_func;
        return new YDisplay(str_func);
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
    function YDisplay_get_displayLayer(int_layerId)
    {
        if (!this._allDisplayLayers) {
            var nb_display_layer = this.get_layerCount();
            this._allDisplayLayers = [];
            for(var i=0; i < nb_display_layer; i++) {
                this._allDisplayLayers[i] = new YDisplayLayer(this, ''+i);
            }
        }
        if(int_layerId < 0 || int_layerId >= this._allDisplayLayers.length) {
            throw new YAPI_Exception(YAPI.INVALID_ARGUMENT, "Invalid layerId");
        }
        return this._allDisplayLayers[int_layerId];
    }
    
    /**
     * Force a flush of all commands buffered by all layers.
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
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

    /**
     * Add a given command string to the currently recorded display sequence
     * 
     * @return YAPI_SUCCESS if the call succeeds.
     * 
     * On failure, throws an exception or returns a negative error code.
     */
    function YDisplay_sendCommand(str_cmd)
    {
        if(!this._recording) {
            // ignore call when there is no ongoing sequence
            return this.set_command(str_cmd);
        }
        this._sequence += str_cmd+"\n";
        return YAPI_SUCCESS;
    }    
    
    function _YDisplay(str_func)
    {
        //--- (generated code: YDisplay constructor)

        // inherit from YFunction (=== YAPI.newFunction)
        YAPI.newFunction.call(this, 'Display', str_func);
        
        // public
        this.LOGICALNAME_INVALID             = "!INVALID!";
        this.ADVERTISEDVALUE_INVALID         = "!INVALID!";
        this.POWERSTATE_OFF                  = 0;
        this.POWERSTATE_ON                   = 1;
        this.POWERSTATE_INVALID              = -1;
        this.STARTUPSEQ_INVALID              = "!INVALID!";
        this.BRIGHTNESS_INVALID              = -1;
        this.ORIENTATION_LEFT                = 0;
        this.ORIENTATION_UP                  = 1;
        this.ORIENTATION_RIGHT               = 2;
        this.ORIENTATION_DOWN                = 3;
        this.ORIENTATION_INVALID             = -1;
        this.DISPLAYWIDTH_INVALID            = -1;
        this.DISPLAYHEIGHT_INVALID           = -1;
        this.DISPLAYTYPE_MONO                = 0;
        this.DISPLAYTYPE_GRAY                = 1;
        this.DISPLAYTYPE_RGB                 = 2;
        this.DISPLAYTYPE_INVALID             = -1;
        this.LAYERWIDTH_INVALID              = -1;
        this.LAYERHEIGHT_INVALID             = -1;
        this.LAYERCOUNT_INVALID              = -1;
        this.COMMAND_INVALID                 = "!INVALID!";
        this.get_logicalName                 = YDisplay_get_logicalName;
        this.logicalName                     = YDisplay_get_logicalName;
        this.get_logicalName_async           = YDisplay_get_logicalName_async;
        this.logicalName_async               = YDisplay_get_logicalName_async;
        this.set_logicalName                 = YDisplay_set_logicalName;
        this.setLogicalName                  = YDisplay_set_logicalName;
        this.get_advertisedValue             = YDisplay_get_advertisedValue;
        this.advertisedValue                 = YDisplay_get_advertisedValue;
        this.get_advertisedValue_async       = YDisplay_get_advertisedValue_async;
        this.advertisedValue_async           = YDisplay_get_advertisedValue_async;
        this.get_powerState                  = YDisplay_get_powerState;
        this.powerState                      = YDisplay_get_powerState;
        this.get_powerState_async            = YDisplay_get_powerState_async;
        this.powerState_async                = YDisplay_get_powerState_async;
        this.set_powerState                  = YDisplay_set_powerState;
        this.setPowerState                   = YDisplay_set_powerState;
        this.get_startupSeq                  = YDisplay_get_startupSeq;
        this.startupSeq                      = YDisplay_get_startupSeq;
        this.get_startupSeq_async            = YDisplay_get_startupSeq_async;
        this.startupSeq_async                = YDisplay_get_startupSeq_async;
        this.set_startupSeq                  = YDisplay_set_startupSeq;
        this.setStartupSeq                   = YDisplay_set_startupSeq;
        this.get_brightness                  = YDisplay_get_brightness;
        this.brightness                      = YDisplay_get_brightness;
        this.get_brightness_async            = YDisplay_get_brightness_async;
        this.brightness_async                = YDisplay_get_brightness_async;
        this.set_brightness                  = YDisplay_set_brightness;
        this.setBrightness                   = YDisplay_set_brightness;
        this.get_orientation                 = YDisplay_get_orientation;
        this.orientation                     = YDisplay_get_orientation;
        this.get_orientation_async           = YDisplay_get_orientation_async;
        this.orientation_async               = YDisplay_get_orientation_async;
        this.set_orientation                 = YDisplay_set_orientation;
        this.setOrientation                  = YDisplay_set_orientation;
        this.get_displayWidth                = YDisplay_get_displayWidth;
        this.displayWidth                    = YDisplay_get_displayWidth;
        this.get_displayWidth_async          = YDisplay_get_displayWidth_async;
        this.displayWidth_async              = YDisplay_get_displayWidth_async;
        this.get_displayHeight               = YDisplay_get_displayHeight;
        this.displayHeight                   = YDisplay_get_displayHeight;
        this.get_displayHeight_async         = YDisplay_get_displayHeight_async;
        this.displayHeight_async             = YDisplay_get_displayHeight_async;
        this.get_displayType                 = YDisplay_get_displayType;
        this.displayType                     = YDisplay_get_displayType;
        this.get_displayType_async           = YDisplay_get_displayType_async;
        this.displayType_async               = YDisplay_get_displayType_async;
        this.get_layerWidth                  = YDisplay_get_layerWidth;
        this.layerWidth                      = YDisplay_get_layerWidth;
        this.get_layerWidth_async            = YDisplay_get_layerWidth_async;
        this.layerWidth_async                = YDisplay_get_layerWidth_async;
        this.get_layerHeight                 = YDisplay_get_layerHeight;
        this.layerHeight                     = YDisplay_get_layerHeight;
        this.get_layerHeight_async           = YDisplay_get_layerHeight_async;
        this.layerHeight_async               = YDisplay_get_layerHeight_async;
        this.get_layerCount                  = YDisplay_get_layerCount;
        this.layerCount                      = YDisplay_get_layerCount;
        this.get_layerCount_async            = YDisplay_get_layerCount_async;
        this.layerCount_async                = YDisplay_get_layerCount_async;
        this.get_command                     = YDisplay_get_command;
        this.command                         = YDisplay_get_command;
        this.get_command_async               = YDisplay_get_command_async;
        this.command_async                   = YDisplay_get_command_async;
        this.set_command                     = YDisplay_set_command;
        this.setCommand                      = YDisplay_set_command;
        this.resetAll                        = YDisplay_resetAll;
        this.fade                            = YDisplay_fade;
        this.newSequence                     = YDisplay_newSequence;
        this.saveSequence                    = YDisplay_saveSequence;
        this.playSequence                    = YDisplay_playSequence;
        this.pauseSequence                   = YDisplay_pauseSequence;
        this.stopSequence                    = YDisplay_stopSequence;
        this.upload                          = YDisplay_upload;
        this.copyLayerContent                = YDisplay_copyLayerContent;
        this.swapLayerContent                = YDisplay_swapLayerContent;
        this.nextDisplay                     = YDisplay_nextDisplay;
        //--- (end of generated code: YDisplay constructor)
        
        this.get_displayLayer                = YDisplay_get_displayLayer;
        this.flushLayers                     = YDisplay_flushLayers;
        this.resetHiddenLayerFlags           = YDisplay_resetHiddenLayerFlags;
        this.sendCommand                     = YDisplay_sendCommand;
        this._allDisplayLayers;
        this._sequence         = '';
        this._recording        = false;
    }

    YDisplay = _YDisplay;
    YDisplay.FindDisplay  = YDisplay_FindDisplay;
    YDisplay.FirstDisplay = YDisplay_FirstDisplay;
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
function yFindDisplay(str_func)
{
    return YDisplay.FindDisplay(str_func);
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


