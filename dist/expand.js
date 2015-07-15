"use strict";

var _Promise = require("babel-runtime/core-js/promise")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expand = expand;

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

/**
 * Promisified glob wrapper.
 * @param {String} pattern to match
 * @param {Object} options
 * @return {Promise}
 */

function expand(pattern, options) {
  return new _Promise(function (resolve, reject) {
    (0, _glob2["default"])(pattern, options, function (er, files) {
      return er ? reject(er) : resolve(files);
    });
  });
}