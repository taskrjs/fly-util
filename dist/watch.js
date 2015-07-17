"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chokidar = require("chokidar");

var _chokidar2 = _interopRequireDefault(_chokidar);

/**
 * chokidar.watch wrapper.
 * @param {Array:String} globs to watch
 * @param {Object} chokidar options
 * @return {chokidar.FSWatcher}
 */

exports["default"] = function (globs, options) {
  return _chokidar2["default"].watch(globs, options);
};

module.exports = exports["default"];