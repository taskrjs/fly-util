"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bind = bind;

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _interpret = require("interpret");

var _ = (0, _debug2["default"])("fly:bind");
/**
  Register bind to node require to support on the fly compilation.
  Bind require to babel to support ES6 by default.
  @param {String} path to a flyfile
  @param {Options} options to function modules, e.g, babel
  @return {String} path
*/

function bind(path, options) {
  var module = reduce(_interpret.jsVariants["." + (path || "").split(".").slice(1).join(".")] || _interpret.jsVariants[".babel.js"]);
  if (module instanceof Function) module(options || { stage: 0 });
  return path;
}

/**
  Try require each module until we don't error.
  @param {String} module name
*/
function reduce(_x) {
  var _again = true;

  _function: while (_again) {
    var m = _x;
    _again = false;

    if (Array.isArray(m)) {
      try {
        var _module2 = m[0].module ? m[0].module : m[0];
        _("register bind %o", _module2);
        return require(_module2);
      } catch (_) {
        _x = m.slice(1);
        _again = true;
        continue _function;
      }
    } else {
      _x = [m];
      _again = true;
      continue _function;
    }
  }
}