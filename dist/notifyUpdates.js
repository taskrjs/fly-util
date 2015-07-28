"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notifyUpdates = notifyUpdates;

var _updateNotifier = require("update-notifier");

/**
  update-notifier wrapper.
  @param {Array} options
*/

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

function notifyUpdates(options) {
  (0, _updateNotifier2["default"])(options).notify();
}