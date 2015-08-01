"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.error = error;
exports.alert = alert;
exports.stamp = stamp;
exports.trace = trace;

var _clor = require("clor");

var _clor2 = _interopRequireDefault(_clor);

var _dateformat = require("dateformat");

var _dateformat2 = _interopRequireDefault(_dateformat);

var _prettyjson = require("prettyjson");

/**
  Log utilities.
*/

var _prettyjson2 = _interopRequireDefault(_prettyjson);

function log() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  stamp.apply({ method: "log", color: "gray" }, args);
  return this;
}

function error() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  stamp.apply({ method: "error", color: "red" }, args);
  return this;
}

function alert() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  if (process.env.VERBOSE) stamp.apply({
    custom: "" + _clor2["default"].yellow.bold("%s"),
    method: "log",
    color: "yellow" }, args);
  return this;
}

/**
  Apply args to console[method] and add a date stamp.
  Bind `this` to an object with the following options
  @prop {Color String} date stamp color
  @prop {String} console method to use
  @prop {[String]} custom style to append to args
*/

function stamp() {
  var date = (0, _dateformat2["default"])(new Date(), "HH:MM:ss");
  process.stdout.write("[" + _clor2["default"][this.color](date) + "] ");

  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  console[this.method].apply(console, this.custom ? [this.custom].concat(args) : args);
}

/**
  prettyjson wrapper and stack tracer.
  @param {Object} error object
*/

function trace(e) {
  console.error(_prettyjson2["default"].render(e).replace(/(\sFunction|\sObject)\./g, _clor2["default"].blue("$1") + ".").replace(/\((~?\/.*)\)/g, "(" + _clor2["default"].gray("$1") + ")").replace(/:([0-9]*):([0-9]*)/g, " " + _clor2["default"].yellow("$1") + ":" + _clor2["default"].yellow("$2")).replace(new RegExp(process.env.HOME, "g"), "~"));
}