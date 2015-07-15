/**
 * Promisify a function with a callback.
 * @param {Function} async function of the form (value, options, cb)
 * @return {Function} new function that returns a promise
 */
"use strict";

var _Promise = require("babel-runtime/core-js/promise")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defer = defer;

function defer(asyncFunc) {
  return function (value, options) {
    return new _Promise(function (resolve, reject) {
      var cb = function cb(err, value) {
        return err ? reject(err) : resolve(value);
      };
      asyncFunc(value, options || cb, options && cb);
    });
  };
}