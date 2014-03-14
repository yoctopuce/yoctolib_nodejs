/* wrap the browser-side yoctolib_js library for node.js

   usage:

       var yapi = require('yoctolib');

       if (yapi.yRegisterHub('http://127.0.0.1:4444/') != yapi.YAPI_SUCCESS) ...

   note: this could load the library asynchronously, but there's only 30 files to load...

 */

var fs  = require('fs')
  , buffer = require('buffer')
  , vm  = require('vm')
  , xhr = require('xmlhttprequest')
  , crypto = require('crypto')
  ;

var api = { XMLHttpRequest : xhr.XMLHttpRequest
          , Buffer         : buffer.Buffer
          , console        : console
          , setTimeout     : setTimeout
          , crypto         : crypto
          }
  , includeSync = function(filename) {
      vm.runInNewContext(fs.readFileSync(filename).toString(), api, filename);
    }
  , dir = __dirname + '/lib'
  , files = fs.readdirSync(dir)
  , i = files.indexOf('yocto_api.js')
  ;

if (i !== -1) files.splice(i, 1);
includeSync(dir + '/yocto_api.js');
for (i = 0; i < files.length; i++) {
    if(files[i].substr(0,1) == '.') continue;
    includeSync(dir + '/' + files[i]);
}
module.exports = api;