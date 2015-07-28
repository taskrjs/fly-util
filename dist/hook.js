"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hook = hook;

var _interpret = require("interpret");

/**
  Bind to node's require based in a file extension.
  Use babel by default.
  @param {String} path to Flyfile
  @return {String} path
*/

function hook(path) {
  var js = _interpret.jsVariants["." + (path.split(".").slice(1).join(".") || "js")] || _interpret.jsVariants[".babel.js"];
  if (Array.isArray(js)) {
    (function reduce(mod) {
      if (mod.length === 0) return;
      try {
        require(mod[0].module ? mod[0].module : mod[0])({ stage: 0 });
      } catch (_) {
        reduce(mod.slice(1));
      }
    })(js);
  } else if (js) {
    require(js);
  }
  return path;
}