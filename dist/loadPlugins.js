"use strict";

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPlugins = loadPlugins;

var _flatten = require("./flatten");

/**
  Find fly-* plugins listed in a package dependencies.
  Bind require to compile plugins on the fly automatically.
  @param {Object} package.json
  @param {Function} load handler
  @param {[String]} blacklisted plugins
  @param {Boolean} bind require
  @return {[String]} list of fly plugins
*/

function loadPlugins(pkg, load) {
  var blacklist = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
  var bind = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

  if (bind) require("babel/register")({
    stage: 0, only: [/fly-[-\w]+\/[-\w]+\./, /[fF]lyfile\.js/]
  });
  return pkg ? (0, _flatten.flatten)(["dependencies", "devDependencies", "peerDependencies"].filter(function (key) {
    return key in pkg;
  }).map(function (dep) {
    return _Object$keys(pkg[dep]);
  })).filter(function (dep) {
    return /^fly-[-\w]+/g.test(dep);
  }).filter(function (dep) {
    return ! ~["fly-util"].concat(blacklist).indexOf(dep);
  }).reduce(function (prev, next) {
    return prev.concat(load(next));
  }, []) : [];
}