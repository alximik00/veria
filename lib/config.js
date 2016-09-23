var deepmerge = require('deepmerge');

function try_require(name){
  /**
   * This is UGLY but since we're not allowed to require 'native_module'
   * this is the only way to test if a native module (or non-native module) exist.
   */
  try{
    return require(name);
  } catch(err){
    return {};
  }
}


var defaultSettings = require('../settings');
var local = try_require('../local_settings');


module.exports = deepmerge(defaultSettings, local);