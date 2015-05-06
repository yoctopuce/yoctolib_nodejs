/*********************************************************************/
 *
 * Y O C T O P U C E    L I B R A R Y    f o r    N o d e . j s
 *
 * - - - - - - - - - - - License information: - - - - - - - - - - -
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

Content of this package:
------------------------
doc/                 HTML interactive help files describing the library
example/             Directory with sample code for each device
lib/                 Source code of the library (in Javascript)
FILES.txt            List of files contained in this archive
RELEASE.txt          Release notes
index.js             Node.js entry point to load the library
package.json         npm's package file

This library is published as a 'npm' package. To install our node package you
have two option:

1: Install it directly form npm with the command "npm install yoctolib". You do
   not need to download the zip file from our web site. npm take care of
   everything. Note: if you want to install is globally you can add the "-g"
   option.

2: Install it form our web site. You need to download and extract the
   YoctoLib.nodejs.19938.zip file and extract it. Then you have to install
   it with the command "npm install -g path_to_the yotolib"


Where path_to_yoctolib is the path where you have unziped the package. You can
then import the library to your project with

    var yoctolib = require('yoctolib');


In order to use the Javascript library, you will probably need to download
as well the VirtualHub software for your OS (unless you intend to connect
directly to a YoctoHub-Ethernet or a YoctoHub-Wireless).

For more details, refer to the documentation specific to each product, which
includes sample code with explanations, and a programming reference manual.
In case of trouble, contact support@yoctopuce.com

Have fun !

Credits:
    Thanks to @mrose17 of @TheThingSystem for bootstrapping this library
    and sharing his Node.js expertise.

P.S.:
    If you are interested in direct access to USB devices from node.js
    without using the VirtualHub, Tom Greasley has started a work to
    compile our low-level C library directly into node.js. This is however
    still work in progress, and not yet fully supported as this library
    is. More details on https://github.com/schlafsack/node-yoctopuce




