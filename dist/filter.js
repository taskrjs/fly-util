"use strict";

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = filter;

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _flatten = require("./flatten");

var _ = (0, _debug2["default"])("fly:filter");
/**
  Filter fly-* plugins from a package dependencies.
  @param {Object} package.json
  @param {Function} load handler
  @param {[String]} blacklisted plugins
  @return {[String]} list of fly plugins
*/

function filter(pkg, load) {
  var blacklist = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  _("filter fly-* plugins");
  return !pkg ? [] : (0, _flatten.flatten)(["dependencies", "devDependencies", "peerDependencies"].filter(function (key) {
    return key in pkg;
  }).map(function (dep) {
    return _Object$keys(pkg[dep]);
  })).filter(function (dep) {
    return (/^fly-[-\w]+/g.test(dep)
    );
  }).filter(function (dep) {
    return ! ~["fly-util"].concat(blacklist).indexOf(dep);
  }).reduce(function (prev, next) {
    return prev.concat(load(next));
  }, []);
}