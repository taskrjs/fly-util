"use strict";

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPlugins = findPlugins;

var _flatten = require("./flatten");

/**
 * Find `fly-*` plugins listed in package.json dependencies.
 * @param {Object} project's package.json
 * @param {[String]} blacklisted plugins
 * @return {[String]} list of fly deps that can be loaded
 */

function findPlugins(pkg) {
  var blacklist = arguments[1] === undefined ? [] : arguments[1];

  if (!pkg) return [];
  return (0, _flatten.flatten)(["dependencies", "devDependencies", "peerDependencies"].filter(function (key) {
    return key in pkg;
  }).map(function (dep) {
    return _Object$keys(pkg[dep]);
  })).filter(function (dep) {
    return /^fly-.+/g.test(dep);
  }).filter(function (dep) {
    return ! ~["fly-util"].concat(blacklist).indexOf(dep);
  });
}