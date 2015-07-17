"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPath = findPath;
var marked0$0 = [findPath, resolve].map(_regeneratorRuntime.mark);

var _mzFs = require("mz/fs");

var _mzFs2 = _interopRequireDefault(_mzFs);

var _path = require("path");

var _interpret = require("interpret");

/**
 * Find a Flyfile in path. If path is a directory find the first Flyfile
 * by extension. Flyfiles can be written in any language supported in
 * interpret/jsVariants.
 * @param {String} file or path to the Flyfile
 * @param {[String]} list of alternative Flyfile names
 * @return {String} path to the Flyfile
 */

function findPath(path) {
  var names = arguments[1] === undefined ? ["Flyfile", "Flypath"] : arguments[1];
  var root;
  return _regeneratorRuntime.wrap(function findPath$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        root = (0, _path.join)(process.cwd(), path);
        context$1$0.t0 = require;
        context$1$0.next = 4;
        return _mzFs2["default"].stat(path);

      case 4:
        if (!context$1$0.sent.isDirectory()) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 7;
        return resolve(match(names.concat(names.map(function (name) {
          return name.toLowerCase();
        })).map(function (name) {
          return (0, _path.join)(root, name);
        }), _Object$keys(_interpret.jsVariants)));

      case 7:
        context$1$0.t1 = context$1$0.sent;
        context$1$0.next = 11;
        break;

      case 10:
        context$1$0.t1 = root;

      case 11:
        context$1$0.t2 = context$1$0.t1;
        return context$1$0.abrupt("return", hook(context$1$0.t0, context$1$0.t2));

      case 13:
      case "end":
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

/**
 * Hook a require function to allow loading files written in ES6, ES7,
 * CoffeeScript, etc., to be automatically transpiled on the fly.
 * @param {Function} require function to load selected module
 * @param {String} path to Flyfile
 * @return {String} path to Flyfile
 */
function hook(require, path) {
  var js = _interpret.jsVariants["." + (path.split(".").slice(1).join(".") || "js")];
  if (Array.isArray(js)) {
    (function reduce(modules) {
      if (modules.length === 0) return;
      try {
        require(modules[0].module ? modules[0].module : modules[0])({ stage: 0 });
      } catch (_) {
        reduce(modules.slice(1));
      }
    })(js);
  } else if (js) {
    require(js);
  }
  return path;
}

/**
 * Find the first existing file in files.
 * @param {[String]} list of files to search
 * @return {String} path of an existing file
 */
function resolve(files) {
  return _regeneratorRuntime.wrap(function resolve$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(files.length === 0)) {
          context$1$0.next = 2;
          break;
        }

        throw { code: "ENOENT" };

      case 2:
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _mzFs2["default"].stat(files[0]);

      case 5:
        if (!context$1$0.sent) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt("return", files[0]);

      case 7:
        context$1$0.next = 14;
        break;

      case 9:
        context$1$0.prev = 9;
        context$1$0.t0 = context$1$0["catch"](2);
        context$1$0.next = 13;
        return resolve(files.slice(1));

      case 13:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 14:
      case "end":
        return context$1$0.stop();
    }
  }, marked0$0[1], this, [[2, 9]]);
}

/**
 * Match files and extensions.
 * @param {[String]} list of files
 * @param {[String]} list of extensions
 * @return {Array} Product of matched ${files}${extensions}
 */
function match(files, exts) {
  return files.length === 1 ? exts.map(function (ext) {
    return "" + files[0] + ext;
  }) : match([files[0]], exts).concat(match(files.slice(1), exts));
}