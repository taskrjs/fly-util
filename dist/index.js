"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

var _Object$keys = require("babel-runtime/core-js/object/keys")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trace = trace;
exports.defer = defer;
exports.flatten = flatten;
exports.searchPlugins = searchPlugins;
exports.expand = expand;
exports.watch = watch;
exports.notifyUpdates = notifyUpdates;
exports.findFlypath = findFlypath;
var marked0$0 = [findFlypath].map(_regeneratorRuntime.mark);

var _mzFs = require("mz/fs");

var _mzFs2 = _interopRequireDefault(_mzFs);

var _clor = require("clor");

var _clor2 = _interopRequireDefault(_clor);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _prettyjson = require("prettyjson");

var _prettyjson2 = _interopRequireDefault(_prettyjson);

var _dateformat = require("dateformat");

var _dateformat2 = _interopRequireDefault(_dateformat);

var _chokidar = require("chokidar");

var _chokidar2 = _interopRequireDefault(_chokidar);

var _path = require("path");

var _interpret = require("interpret");

var _updateNotifier = require("update-notifier");

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

/**
 * Log/Error a message with a time stamp.
 */
var log = stamp.bind({ method: "log", color: "gray" });
exports.log = log;
var error = stamp.bind({ method: "error", color: "red" });

exports.error = error;
function stamp() {
  var date = (0, _dateformat2["default"])(new Date(), "HH:MM:ss");
  process.stdout.write("[" + _clor2["default"][this.color](date) + "] ");
  console[this.method].apply(console, arguments);
}

/**
 * Wrapper for prettyjson and other stack tracing improvements.
 * @param {Object} error object
 */

function trace(e) {
  error(_prettyjson2["default"].render(e).replace(/(\sFunction|\sObject)\./g, _clor2["default"].blue("$1") + ".").replace(/\((~?\/.*)\)/g, "(" + _clor2["default"].gray("$1") + ")").replace(/:([0-9]*):([0-9]*)/g, " " + _clor2["default"].yellow("$1") + ":" + _clor2["default"].yellow("$2")).replace(new RegExp(process.env.HOME, "g"), "~"));
}

/**
 * Promisify an async function.
 * @param {Function} async function to promisify
 * @return {Function} function that returns a promise
 */

function defer(asyncFunc) {
  return function (value) {
    return new _Promise(function (resolve, reject) {
      return asyncFunc(value, function (err, value) {
        return err ? reject(err) : resolve(value);
      });
    });
  };
}

/**
 * Flatten a nested array recursively.
 * @return [[a],[b],[c]] -> [a,b,c]
 */

function flatten(array) {
  return array.reduce(function (flat, next) {
    return flat.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}

/**
 * Search `fly-*` plugins listed in package.json dependencies.
 * @param {Package} project's package.json
 * @param {Array} blacklisted plugins
 * @return {Array} list of loadable fly deps
 */

function searchPlugins(pkg) {
  var blacklist = arguments[1] === undefined ? [] : arguments[1];

  if (!pkg) return [];
  return flatten(["dependencies", "devDependencies", "peerDependencies"].filter(function (key) {
    return key in pkg;
  }).map(function (dep) {
    return _Object$keys(pkg[dep]);
  })).filter(function (dep) {
    return /^fly-.+/g.test(dep);
  }).filter(function (dep) {
    return ! ~blacklist.indexOf(dep);
  });
}

/**
 * Return a promise that resolves to the expanded files from pattern.
 * @param pattern {String} Pattern to be matched
 * @param handler {Function} Function to run for each unwrapped glob promise.
 * @return {Promise}
 */

function expand(pattern, options) {
  return new _Promise(function (resolve, reject) {
    (0, _glob2["default"])(pattern, options, function (er, files) {
      return er ? reject(er) : resolve(files);
    });
  });
}

/**
 * Wrapper for chokidar.watch. Array of globs are flattened.
 * @param {Array:String} globs to watch
 * @param {Object} chokidar options
 * @return {chokidar.FSWatcher}
 */

function watch(globs, options) {
  return _chokidar2["default"].watch(flatten([globs]), options);
}

/**
 * Wrap update-notifier notify.
 * @param {Array} options
 */

function notifyUpdates(options) {
  (0, _updateNotifier2["default"])(options).notify();
}

/**
 * Resolve the Flyfile path. Check the file extension and attempt to load
 * every possible JavaScript variant if file is a directory.
 * @param String file or path to the Flyfile
 * @param String:Array Flyfile variant name
 * @return {String} path to the Flyfile
 */

function findFlypath(path) {
  var names = arguments[1] === undefined ? ["Flyfile", "Flypath"] : arguments[1];
  var marked1$0, root, hook, resolve, match;
  return _regeneratorRuntime.wrap(function findFlypath$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        match = function match(files, exts) {
          return files.length === 1 ? exts.map(function (ext) {
            return "" + files[0] + ext;
          }) : match([files[0]], exts).concat(match(files.slice(1), exts));
        };

        resolve = function resolve(files) {
          return _regeneratorRuntime.wrap(function resolve$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                if (!(files.length === 0)) {
                  context$2$0.next = 2;
                  break;
                }

                throw { code: "ENOENT" };

              case 2:
                context$2$0.prev = 2;
                context$2$0.next = 5;
                return _mzFs2["default"].stat(files[0]);

              case 5:
                if (!context$2$0.sent) {
                  context$2$0.next = 7;
                  break;
                }

                return context$2$0.abrupt("return", files[0]);

              case 7:
                context$2$0.next = 14;
                break;

              case 9:
                context$2$0.prev = 9;
                context$2$0.t0 = context$2$0["catch"](2);
                context$2$0.next = 13;
                return resolve(files.slice(1));

              case 13:
                return context$2$0.abrupt("return", context$2$0.sent);

              case 14:
              case "end":
                return context$2$0.stop();
            }
          }, marked1$0[0], this, [[2, 9]]);
        };

        hook = function hook(require, path) {
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
        };

        marked1$0 = [resolve].map(_regeneratorRuntime.mark);
        root = (0, _path.join)(process.cwd(), path);
        context$1$0.t0 = require;
        context$1$0.next = 8;
        return _mzFs2["default"].stat(path);

      case 8:
        if (!context$1$0.sent.isDirectory()) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 11;
        return resolve(match(names.concat(names.map(function (name) {
          return name.toLowerCase();
        })).map(function (name) {
          return (0, _path.join)(root, name);
        }), _Object$keys(_interpret.jsVariants)));

      case 11:
        context$1$0.t1 = context$1$0.sent;
        context$1$0.next = 15;
        break;

      case 14:
        context$1$0.t1 = root;

      case 15:
        context$1$0.t2 = context$1$0.t1;
        return context$1$0.abrupt("return", hook(context$1$0.t0, context$1$0.t2));

      case 17:
      case "end":
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

/**
 * Add require hook so that subsequent calls to require transform the
 * JavaScript source variant (ES7, CoffeeScript, etc.) in the fly.
 * @param {Function} require function to load selected module
 * @param {String} path to Flyfile
 * @return {String} path to Flyfile
 */

/**
 * Find the first existing file in files.
 * @param {Array:String} list of files to search
 * @return {String} path of an existing file
 */

/**
 * Match files and extensions.
 * @param {Array:String} List of files to match
 * @param {Array:String} List of extensions to match
 * @return {Array} Product of matched files * extensions
 */