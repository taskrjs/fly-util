"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = watch;

var _chokidar = require("chokidar");

/**
  chokidar.watch wrapper.
  @param {Array:String} globs to watch
  @param {Object} chokidar options
  @return {chokidar.FSWatcher}
*/

var _chokidar2 = _interopRequireDefault(_chokidar);

function watch(globs, options) {
  return _chokidar2["default"].watch(globs, options);
}