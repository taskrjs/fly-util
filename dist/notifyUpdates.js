"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notifyUpdates = notifyUpdates;

var _updateNotifier = require("update-notifier");

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

/**
 * update-notifier wrapper.
 * @param {Array} options
 */

function notifyUpdates(options) {
  (0, _updateNotifier2["default"])(options).notify();
}